#!/usr/bin/env node
/**
 * Szmelc-RCE — native messaging host self-test (no browser needed).
 *
 * Spawns native-host/rce_host.py and speaks Chrome's native-messaging
 * framing (4-byte LE length + JSON) on its stdio, asserting:
 *   1. ping            -> pong
 *   2. get_status      -> status_response (+ mcp_connected announcement)
 *   3. tool_request    -> tool_response with a structured result/error
 *   4. RCE_HOST_SERVE  -> a WS client's execute_tool is relayed to the
 *      extension (simulated on the host's stdin) and the tool_response is
 *      correlated by tool_use_id and sent back to the client
 */
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { WebSocketServer, WebSocket } from "ws";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = path.join(ROOT, "native-host", "rce_host.py");
// Pick a genuinely free port (pid-modulo can collide with other processes).
const PORT = process.env.RCE_TEST_PORT2 || await new Promise((res) => {
    const srv = net.createServer();
    srv.listen(0, "127.0.0.1", () => { const p = srv.address().port; srv.close(() => res(p)); });
});
const SERVE = `ws://127.0.0.1:${PORT}`;

let pass = 0, fail = 0;
const assert = (c, l) => {
    c ? (pass++, console.log("  \x1b[32m✓\x1b[0m " + l))
      : (fail++, console.log("  \x1b[31m✗\x1b[0m " + l));
};

// ---- spawn host ------------------------------------------------------------
const child = spawn("python3", [HOST], {
    env: { ...process.env, RCE_HOST_SERVE: SERVE, PYTHONUNBUFFERED: "1" },
    stdio: ["pipe", "pipe", "pipe"],
});
const stderr = [];
child.stderr.on("data", (d) => stderr.push(String(d)));
child.on("exit", (c, s) => { if (!done) { assert(false, `host exited early (${c}/${s})`); finish(); } });

const frame = (o) => {
    const data = Buffer.from(JSON.stringify(o), "utf8");
    const h = Buffer.alloc(4);
    h.writeUInt32LE(data.length);
    return Buffer.concat([h, data]);
};
const waiters = [];
child.stdout.on("data", (chunk) => {
    // accumulate; frames may straddle chunk boundaries
    hostBuf = Buffer.concat([hostBuf, chunk]);
    while (hostBuf.length >= 4) {
        const len = hostBuf.readUInt32LE(0);
        if (hostBuf.length < 4 + len) break;
        const body = hostBuf.subarray(4, 4 + len);
        hostBuf = hostBuf.subarray(4 + len);
        try { const m = JSON.parse(body.toString()); waiters.forEach((w) => w(m)); }
        catch (e) { assert(false, "unparseable host frame: " + e.message); }
    }
});
let hostBuf = Buffer.alloc(0);
child.stdin.write(frame({ type: "ping" })); // start reading early

function expect(pred, timeout = 5000) {
    return new Promise((res) => {
        const w = (m) => { if (pred(m)) { done: remove(); res(m); } };
        const remove = () => { const i = waiters.indexOf(w); if (i >= 0) waiters.splice(i, 1); clearTimeout(t); };
        waiters.push(w);
        const t = setTimeout(() => { remove(); res(null); }, timeout);
    });
}

let done = false;
function finish() {
    if (done) return;
    done = true;
    console.log("\n  \x1b[1mnative host test:\x1b[0m " + (fail ? "\x1b[31mFAIL\x1b[0m" : "\x1b[32mPASS\x1b[0m") + ` (pass=${pass} fail=${fail})`);
    if (fail && stderr.length) console.log("  [host stderr]\n" + stderr.join("").trim().split("\n").slice(-8).map((l) => "    " + l).join("\n"));
    try { child.kill("SIGKILL"); } catch {}
    setTimeout(() => process.exit(fail ? 1 : 0), 150);
}

// ---- 1. ping -> pong -------------------------------------------------------
{
    const m = await expect((m) => m.type === "pong");
    assert(m?.type === "pong", "ping -> pong");
}

// ---- 2. get_status -> status_response (+ mcp_connected) --------------------
{
    // Register both waiters BEFORE writing: both frames can arrive in one chunk.
    const pStatus = expect((m) => m.type === "status_response");
    const pConnected = expect((m) => m.type === "mcp_connected");
    child.stdin.write(frame({ type: "get_status" }));
    const m = await pStatus;
    assert(m?.mcp_connected === true, "get_status -> status_response (mcp_connected=true)");
    const m2 = await pConnected;
    assert(m2?.type === "mcp_connected", "mcp_connected announced to the extension");
}

// ---- 3. tool_request (no backend) -> structured tool_response --------------
{
    const tid = crypto.randomUUID();
    child.stdin.write(frame({ type: "tool_request", method: "execute_tool", tool_use_id: tid,
        params: { tool: "left_click", args: { coordinate: [10, 20] } } }));
    const m = await expect((m) => m.type === "tool_response" && m.tool_use_id === tid);
    assert(!!m, "tool_request -> tool_response (correlated by tool_use_id)");
    const blob = JSON.stringify(m?.result ?? m?.error ?? {});
    assert(/left_click/.test(blob), "response echoes the attempted tool");
}

// ---- 4. RCE_HOST_SERVE: WS client -> extension -> back ---------------------
{
    // Fake "agent client" connects to the host's serve port (retry until the
    // background server thread is up).
    let ws;
    for (let i = 0; i < 20; i++) {
        try {
            ws = await new Promise((res, rej) => {
                const w = new WebSocket(SERVE);
                w.on("open", () => res(w));
                w.on("error", (e) => { w.close(); rej(e); });
                setTimeout(() => rej(new Error("connect timeout")), 800);
            });
            break;
        } catch { await new Promise((r) => setTimeout(r, 250)); }
    }
    if (!ws) {
        assert(false, "serve: WS client could not connect");
        finish();
    } else {

    const tid = crypto.randomUUID();
    ws.send(JSON.stringify({ method: "execute_tool", params: { tool: "screenshot", args: { fullPage: true }, tabId: 7 } }));

    // The host must wrap this as a tool_request frame for the extension...
    const req = await expect((m) => m.type === "tool_request" && m.params?.tool === "screenshot");
    assert(!!req, "serve: client call relayed as tool_request frame");
    assert(typeof req?.params?.tool_use_id === "string", "serve: tool_use_id assigned (params.tool_use_id — read by the extension)");

    // ...simulate the extension executing it and replying over the port...
    const replyTid = req?.tool_use_id || req?.params?.tool_use_id;
    child.stdin.write(frame({ type: "tool_response", tool_use_id: replyTid,
        result: { content: [{ type: "text", text: "shot-by-fake-extension" }] } }));

    // ...and the WS client must get the correlated response.
    const resp = await new Promise((res) => {
        const t = setTimeout(() => res(null), 5000);
        ws.on("message", (b) => { clearTimeout(t); res(JSON.parse(b.toString())); });
    });
    assert(resp?.type === "tool_response" && resp?.tool_use_id === replyTid, "serve: tool_response relayed back to client");
    assert(/shot-by-fake-extension/.test(JSON.stringify(resp?.result ?? {})), "serve: result content intact");

    // ping/pong round-trip on the serve socket
    const pong = await new Promise((res) => {
        ws.send(JSON.stringify({ type: "ping" }));
        const t = setTimeout(() => res(null), 3000);
        ws.on("message", (b) => { clearTimeout(t); res(JSON.parse(b.toString())); });
    });
    assert(pong?.type === "pong", "serve: ping -> pong");

    ws.close();
    }
}

finish();
