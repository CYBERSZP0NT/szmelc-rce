#!/usr/bin/env python3
"""
Szmelc-RCE reference native-messaging host (local bridge).

Speaks Chrome's native-messaging framing (4-byte little-endian length prefix +
UTF-8 JSON) on stdio. What it does out of the box:

  * {type:"ping"}         -> {type:"pong"}          (required by the extension)
  * {type:"get_status"}   -> {type:"status_response", computer_name:,
                              mcp_connected: true}
                              and announces {"type":"mcp_connected"} so the
                              extension marks the native peer as live
  * {type:"tool_response"} -> correlated back to whoever requested the call
                              (RCE_HOST_SERVE client) via tool_use_id

Driving the browser (the whole point — replace handle_execute_tool() to
script it yourself):

  RCE_HOST_SERVE=ws://127.0.0.1:8766   host LISTENS as a WebSocket server.
      Any client connects and sends {"method":"execute_tool","params":
      {"tool":"left_click","args":{"coordinate":[10,10]},"tabId":1}} (or a full
      {"type":"tool_request",...} envelope); the host wraps it as a
      {"type":"tool_request"} frame for the extension over stdio, awaits the
      matching {"type":"tool_response"} and relays it to the client. Timeout
      per call: RCE_HOST_TIMEOUT seconds (default 120).

  RCE_BRIDGE_WS=ws://localhost:8765    (optional, legacy) when a raw
      {"type":"tool_request"} arrives on stdin, forward its embedded
      execute_tool call to this WebSocket bridge instead of answering locally.

A tool_request arriving on stdin without any backend configured gets a
structured "not wired up" response — useful as a smoke test:
    printf '<len><json>' | python3 rce_host.py   (see test/nativehost.test.mjs)
"""
import asyncio
import json
import os
import queue
import struct
import sys
import threading
import uuid
from urllib.parse import urlparse

HAS_WS = False
try:
    import websockets  # optional: pip install websockets
    HAS_WS = True
except ImportError:
    pass

SERVE_URL = os.environ.get("RCE_HOST_SERVE", "").strip()
BRIDGE_URL = os.environ.get("RCE_BRIDGE_WS", "").strip()
TOOL_TIMEOUT = float(os.environ.get("RCE_HOST_TIMEOUT", "120"))

_IO_LOCK = threading.Lock()


def send(obj):
    data = json.dumps(obj).encode("utf-8")
    header = struct.pack("<I", len(data))
    with _IO_LOCK:
        sys.stdout.buffer.write(header + data)
        sys.stdout.buffer.flush()


def recv():
    header = sys.stdin.buffer.read(4)
    if len(header) < 4:
        return None
    (length,) = struct.unpack("<I", header)
    if length <= 0:
        return None
    body = sys.stdin.buffer.read(length)
    if len(body) < length:
        return None
    return json.loads(body.decode("utf-8"))


def log(*a):
    # Native hosts must keep stdout for protocol data — log to stderr.
    print("[rce-host]", *a, file=sys.stderr, flush=True)


def _text_result(payload) -> dict:
    """MCP-style content block wrapper (extension sends the same shape back)."""
    return {"content": [{"type": "text", "text": json.dumps(payload, ensure_ascii=False)}]}


# tool_use_id -> SimpleQueue of tool_response envelopes
_PENDING = {}
_PENDING_LOCK = threading.Lock()


def deliver_response(e):
    """Route an extension tool_response to its waiter (RCE_HOST_SERVE)."""
    tid = e.get("tool_use_id") or e.get("request_id")
    with _PENDING_LOCK:
        q = _PENDING.pop(tid, None) if tid else None
    if q is None:
        log("tool_response (unsolicited):", json.dumps(e)[:200])
        return
    q.put(e)


async def forward_ws(bridge_url, method, params):
    """Forward one tool call to a WebSocket bridge, await its reply."""
    async with websockets.connect(bridge_url) as ws:
        await ws.send(json.dumps({"method": method, "params": params}))
        reply = json.loads(await ws.recv())
        return reply


def handle_execute_tool(e, params):
    tool_use_id = e.get("tool_use_id") or params.get("tool_use_id")
    method = e.get("method")
    if method != "execute_tool":
        return _text_result({"ok": False, "error": f"unexpected method {method}"})

    payload = params if isinstance(params, dict) else {}
    tool = payload.get("tool", "?")
    args = payload.get("args", {})
    log("execute_tool", tool, json.dumps(args)[:200])

    if BRIDGE_URL and HAS_WS:
        try:
            result = asyncio.run(forward_ws(BRIDGE_URL, "execute_tool", payload))
            return _text_result(result)
        except Exception as err:  # noqa: BLE001
            return _text_result({"ok": False, "error": str(err)})

    # Default: no backend configured — return a structured "not wired" answer.
    return _text_result({
        "ok": False,
        "error": "rce_host.py has no backend (set RCE_HOST_SERVE or edit handle_execute_tool)",
        "echo": {"tool": tool, "args": args},
    })


def wrap_tool_request(e, params):
    """Normalise a client call into the envelope the extension expects."""
    method = e.get("method", "execute_tool")
    tid = e.get("tool_use_id") or (params or {}).get("tool_use_id") or uuid.uuid4().hex
    params = dict(params or {})
    params["tool_use_id"] = tid
    return {"type": "tool_request", "method": method, "params": params}, tid


async def serve_client(ws):
    """RCE_HOST_SERVE: relay one client's calls to the extension over stdio."""
    peer = getattr(ws, "remote_address", "?")
    log("serve: client connected", peer)
    loop = asyncio.get_running_loop()
    try:
        async for raw in ws:
            try:
                m = json.loads(raw)
            except Exception:
                await ws.send(json.dumps({"ok": False, "error": "invalid JSON"}))
                continue
            if m.get("type") == "ping" or m.get("method") == "ping":
                await ws.send(json.dumps({"type": "pong"}))
                continue
            params = m.get("params") or {}
            frame, tid = wrap_tool_request(m, params)
            q = queue.SimpleQueue()

            def waiter(q=q):
                # Blocks in a worker thread until the stdin reader routes the
                # extension's tool_response into this queue (or timeout).
                try:
                    return q.get(timeout=TOOL_TIMEOUT)
                except Exception:
                    return None

            with _PENDING_LOCK:
                _PENDING[tid] = q
            send(frame)
            log("serve: tool_request ->", frame["params"].get("tool"), "id=", tid)
            try:
                resp = await loop.run_in_executor(None, waiter)
            except Exception as err:  # noqa: BLE001
                resp = None
                log("serve error:", err)
            with _PENDING_LOCK:
                _PENDING.pop(tid, None)
            if resp is None:
                await ws.send(json.dumps({
                    "type": "tool_response", "tool_use_id": tid,
                    "error": {"content": [{"type": "text",
                                           "text": f"timeout after {TOOL_TIMEOUT}s"}]},
                }))
            else:
                await ws.send(json.dumps(resp))
            log("serve: tool_response for", tid)
    except Exception as err:  # noqa: BLE001
        log("serve: client error", err)
    log("serve: client gone", peer)


def serve_thread():
    """Run the RCE_HOST_SERVE WebSocket server in a background thread."""
    u = urlparse(SERVE_URL)
    host = u.hostname or "127.0.0.1"
    port = u.port or 8766

    async def _main():
        async with websockets.serve(serve_client, host, port):
            log("serve: listening on ws://%s:%d" % (host, port))
            await asyncio.Future()  # run forever

    asyncio.run(_main())


def handle(e):
    t = e.get("type")
    if t == "ping":
        send({"type": "pong"})
    elif t == "get_status":
        send({"type": "status_response",
              "computer_name": os.uname().nodename if hasattr(os, "uname") else "rce",
              "mcp_connected": True})
        # Let the extension mark the native peer as connected.
        send({"type": "mcp_connected"})
    elif t == "tool_response":
        deliver_response(e)
    elif t == "tool_request":
        # Inbound from the extension side (rare): answer inline.
        resp = handle_execute_tool(e, e.get("params") or {})
        send({"type": "tool_response",
              "tool_use_id": e.get("tool_use_id"),
              "request_id": uuid.uuid4().hex,
              "result": resp})
    else:
        log("unhandled message type:", t)


def main():
    log("starting (websockets=%s, RCE_HOST_SERVE=%s, RCE_BRIDGE_WS=%s)" % (
        HAS_WS, SERVE_URL or "-", BRIDGE_URL or "-"))
    if SERVE_URL:
        if not HAS_WS:
            log("RCE_HOST_SERVE needs the 'websockets' package: pip install websockets")
        else:
            threading.Thread(target=serve_thread, daemon=True).start()
    while True:
        try:
            e = recv()
        except Exception as err:  # noqa: BLE001
            log("recv error:", err)
            break
        if e is None:
            break
        try:
            handle(e)
        except Exception as err:  # noqa: BLE001
            log("handle error:", err)
    log("exiting")


if __name__ == "__main__":
    main()
