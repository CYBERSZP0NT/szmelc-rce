#!/usr/bin/env node
/**
 * Szmelc-RCE — bridge protocol self-test (no browser needed).
 *
 * Spawns dev/bridge.mjs on an ephemeral port, speaks the extension side of the
 * wire protocol to it, and asserts the core round-trips:
 *   connect -> paired,  ping -> pong,  bridge -> execute_tool
 * and that a screenshot response gets persisted under dev/shots/.
 */
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import WebSocket from "ws";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Pick a genuinely free port (pid-modulo can collide with other processes).
const PORT = process.env.RCE_TEST_PORT || await new Promise((res) => {
    const srv = net.createServer();
    srv.listen(0, "127.0.0.1", () => { const p = srv.address().port; srv.close(() => res(p)); });
});
const SHOTS = path.join(ROOT, "dev", "shots");
fs.rmSync(SHOTS, { recursive: true, force: true });
fs.mkdirSync(SHOTS, { recursive: true });

let pass = 0, fail = 0;
const blines = [];
const assert = (cond, label) => {
    cond ? (pass++, console.log("  \x1b[32m✓\x1b[0m " + label))
         : (fail++, console.log("  \x1b[31m✗\x1b[0m " + label));
};

const child = spawn(process.execPath, [path.join(ROOT, "dev", "bridge.mjs")], {
    env: { ...process.env, RCE_BRIDGE_PORT: String(PORT) },
    stdio: ["ignore", "pipe", "inherit"],
});
child.stdout.on("data", (d) => { blines.push(String(d)); });
child.on("exit", (c) => { console.log("  [bridge out]" ); blines.forEach(l => console.log("    " + l.trim().slice(0, 160))); if (!finished) { console.error("  bridge exited", c); assert(false, "bridge exited prematurely (code " + c + ")"); finish(); } });

let ws, finished = false;
const mToolIsCall = (m) => m && (m.type === "tool_call" && !!m.tool || m.type === "tool_request" && m.method === "execute_tool");
function cleanup(code) {
    try { ws?.close(); } catch {}
    child.kill("SIGKILL");
}
function finish() {
    if (finished) return;
    finished = true;
    console.log("\n  \x1b[1mbridge test:\x1b[0m " + (fail ? "\x1b[31mFAIL\x1b[0m" : "\x1b[32mPASS\x1b[0m") + ` (pass=${pass} fail=${fail})`);
    cleanup(fail ? 1 : 0);
    setTimeout(() => process.exit(fail ? 1 : 0), 150);
}

// wait for the bridge to report it's listening
await new Promise((res) => {
    const t = setTimeout(() => { console.error("  bridge did not start"); finish(); }, 8000);
    child.stdout.on("data", (d) => { if (/listening on/.test(String(d))) { clearTimeout(t); res(); } });
});
if (finished) process.exit(1);

ws = new WebSocket(`ws://127.0.0.1:${PORT}/chrome/test-user-123`);
const send = (o) => ws.send(JSON.stringify(o));
let gotPaired = false, gotPong = false, gotToolReq = null, checked = false;

ws.on("open", () => {
    send({ type: "connect", client_type: "chrome-extension", device_id: "dev-test", oauth_token: "test" });
    setTimeout(() => send({ type: "ping" }), 250);
});
ws.on("message", (b) => {
    let m; try { m = JSON.parse(b.toString()); } catch { return; }
    if (m.type === "paired") gotPaired = true;
    if (m.type === "pong") gotPong = true;
    if (m.type === "tool_call" || m.type === "tool_request") {
        gotToolReq = m;
        // The extension replies with tool_result frames; the reference bridge
        // also accepts the generic tool_response envelope.
        send({ type: "tool_result", tool_use_id: m.tool_use_id,
            result: { content: [{ type: "image", source: { type: "base64",
                data: "data:image/jpeg;base64," + Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0xff, 0xd9]).toString("base64") } }] } });
    }
    if (gotPaired && gotPong && gotToolReq && !checked) { checked = true; checkScreenshot(); }
});

function checkScreenshot() {
    assert(gotPaired, "connect -> paired");
    assert(gotPong, "ping -> pong");
    assert(mToolIsCall(gotToolReq), "bridge -> tool_call (execute_tool)");
    // SHOTS was wiped at test start and only the bridge writes into it → any
    // entry means the round-tripped tool_response image was persisted.
    const poll = (tries) => {
        const now = fs.existsSync(SHOTS) ? fs.readdirSync(SHOTS) : [];
        if (now.length >= 1) { assert(true, `screenshot persisted (${now.join(",")})`); return finish(); }
        if (tries <= 0) { assert(false, "screenshot persisted (dir empty)"); return finish(); }
        setTimeout(() => poll(tries - 1), 200);
    };
    setTimeout(() => poll(10), 150);
}

setTimeout(() => { if (!finished) { assert(false, "timed out"); finish(); } }, 8000);
