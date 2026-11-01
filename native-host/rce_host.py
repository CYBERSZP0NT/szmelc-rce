#!/usr/bin/env python3
"""
Szmelc-RCE reference native-messaging host (local bridge).

Speaks Chrome's native-messaging framing (4-byte little-endian length prefix +
UTF-8 JSON) on stdio. What it does out of the box:

  * {type:"ping"}         -> {type:"pong"}          (required by the extension)
  * {type:"get_status"}   -> {type:"status_response", computer_name:,
                              mcp_connected: true}
  * {type:"tool_request"} -> {type:"tool_response", ...} by dispatching the
                             embedded {method:"execute_tool", params:{...}} to
                             one of two backends, configured via env:
                               RCE_BRIDGE_WS  (e.g. ws://localhost:8765)  ->
                                 forwards the tool call to a local WebSocket
                                 bridge and relays its answer
                               (nothing set) -> logs the call and returns a
                                 "not wired up" response

Wire it to your own agent / MCP server by replacing handle_execute_tool().
"""
import json
import os
import sys
import threading
import uuid

HAS_WS = False
try:
    import websockets  # optional: pip install websockets
    HAS_WS = True
except ImportError:
    pass


def send(obj):
    data = json.dumps(obj).encode("utf-8")
    header = len(data).to_bytes(4, "little")
    sys.stdout.buffer.write(header + data)
    sys.stdout.buffer.flush()


def recv():
    header = sys.stdin.buffer.read(4)
    if len(header) < 4:
        return None
    (length,) = header.unpack("<I") if hasattr(header, "unpack") else header
    return json.loads(sys.stdin.buffer.read(length))


def log(*a):
    # Native hosts must keep stdout for protocol data — log to stderr.
    print("[rce-host]", *a, file=sys.stderr)


async def forward_ws(bridge_url, method, params):
    """Forward one tool call to a local WebSocket bridge, await its reply."""
    async with websockets.connect(bridge_url) as ws:
        await ws.send(json.dumps({"method": method, "params": params}))
        reply = json.loads(await ws.recv())
        return reply


def handle_execute_tool(e, params):
    tool_use_id = e.get("tool_use_id") or e.get("params", {}).get("tool_use_id")
    method = e.get("method")
    if method != "execute_tool":
        return {"content": json.dumps({"ok": False, "error": f"unexpected method {method}"})}

    payload = params if isinstance(params, dict) else {}
    tool = payload.get("tool", "?")
    args = payload.get("args", {})
    log("execute_tool", tool, json.dumps(args)[:200])

    bridge = os.environ.get("RCE_BRIDGE_WS")
    if bridge and HAS_WS:
        try:
            import asyncio
            result = asyncio.run(forward_ws(bridge, "execute_tool", payload))
            return {"content": json.dumps(result, ensure_ascii=False)}
        except Exception as err:  # noqa: BLE001
            return {"content": json.dumps({"ok": False, "error": str(err)})}

    # Default: no bridge configured — return a structured "not wired" answer.
    return {
        "content": json.dumps({
            "ok": False,
            "error": "rce_host.py has no backend (set RCE_BRIDGE_WS or edit handle_execute_tool)",
            "echo": {"tool": tool, "args": args},
        })
    }


def handle(e):
    t = e.get("type")
    if t == "ping":
        send({"type": "pong"})
    elif t == "get_status":
        send({"type": "status_response",
              "computer_name": os.uname().nodename if hasattr(os, "uname") else "rce",
              "mcp_connected": True})
    elif t == "tool_request":
        resp = handle_execute_tool(e.get("method"), e.get("params"))
        send({"type": "tool_response",
              "tool_use_id": e.get("tool_use_id"),
              "request_id": uuid.uuid4().hex,
              "result": resp})
    else:
        log("unhandled message type:", t)


def main():
    log("starting (websockets=%s, RCE_BRIDGE_WS=%s)" % (
        HAS_WS, os.environ.get("RCE_BRIDGE_WS")))
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
