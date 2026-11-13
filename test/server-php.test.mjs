#!/usr/bin/env node
/**
 * Szmelc-RCE — server.php self-test (bridge daemon + static resolver).
 *
 * Bridge daemon (`php server.php --serve`):
 *   1. /health
 *   2. extension connect -> paired; discovery GET /devices
 *   3. POST /chrome/<u>/tools -> tool_call frame -> tool_result -> HTTP 200
 *   4. timeout -> 504
 *   5. unknown user -> 404
 *   6. agent WS /agent/<u> relay
 *   7. token instance: 401 without / 200 with Bearer
 * Static resolver (`php -S host:port server.php`):
 *   8. existing file served with MIME, ?file= fallback, /health JSON
 *   9. 404 for missing paths, PHP sources blocked, traversal blocked
 */
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocket } from "ws";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SERVER = path.join(ROOT, "server.php");

let pass = 0, fail = 0;
const assert = (c, l) => { c ? (pass++, console.log("  \x1b[32m✓\x1b[0m " + l)) : (fail++, console.log("  \x1b[31m✗\x1b[0m " + l)); };

const freePort = () => new Promise((res) => {
    const srv = net.createServer();
    srv.listen(0, "127.0.0.1", () => { const p = srv.address().port; srv.close(() => res(p)); });
});

const httpJson = async (port, method, p, body, headers = {}) => {
    const r = await fetch(`http://127.0.0.1:${port}${p}`, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
    });
    const text = await r.text();
    let parsed;
    try { parsed = JSON.parse(text); } catch { parsed = text; }
    return { status: r.status, text, body: parsed };
};

function fakeExtension(port, userId, onFrame, deviceId = "fake-device-1") {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/chrome/${userId}`);
    const send = (o) => ws.send(JSON.stringify(o));
    ws.on("open", () => send({
        type: "connect", client_type: "chrome-extension",
        device_id: deviceId, oauth_token: "anon-uuid", extension_version: "1.0.0",
    }));
    ws.on("message", (b) => {
        let m; try { m = JSON.parse(b.toString()); } catch { return; }
        onFrame(m, send);
    });
    const ready = new Promise((res) => ws.on("open", () => setTimeout(res, 200)));
    return { ws, send, ready };
}

// ---- bridge daemon (open mode) ----------------------------------------------
const PORT = await freePort();
const daemon = spawn("php", [SERVER, "--serve", "--port", String(PORT), "--host", "127.0.0.1"],
    { stdio: ["ignore", "pipe", "pipe"] });
const dlog = [];
daemon.stdout.on("data", (d) => dlog.push(String(d).trim()));
daemon.stderr.on("data", (d) => dlog.push(String(d).trim()));
await new Promise((res) => {
    const out = (d) => { if (/listening on/.test(String(d))) res(); };
    daemon.stdout.on("data", out); daemon.stderr.on("data", out);
    setTimeout(res, 3000);
});

// 1. health
{
    const r = await httpJson(PORT, "GET", "/health");
    assert(r.status === 200 && r.body?.ok === true && r.body?.mode === "bridge-daemon", "/health ok (bridge-daemon mode)");
}

// 2-3. presence + tool round-trip
{
    const r0 = await httpJson(PORT, "GET", "/chrome/alice/devices");
    assert(r0.status === 200 && r0.body?.devices?.length === 0, "devices empty before extension connects");

    let gotToolCall = null;
    const ext = fakeExtension(PORT, "alice", (m, send) => {
        if (m.type === "tool_call") {
            gotToolCall = m;
            send({ type: "tool_result", tool_use_id: m.tool_use_id,
                content: [{ type: "text", text: `ran ${m.tool}` }] });
        }
    });
    await ext.ready;

    const r1 = await httpJson(PORT, "GET", "/devices");
    assert(r1.body?.devices?.length === 1 && r1.body.devices[0].device_id === "fake-device-1",
        "GET /devices lists the connected extension");

    const r2 = await httpJson(PORT, "POST", "/chrome/alice/tools",
        { tool: "left_click", args: { coordinate: [10, 20] }, tabId: 7 });
    assert(r2.status === 200 && /ran left_click/.test(JSON.stringify(r2.body)),
        "POST /tools -> tool_call -> tool_result -> HTTP 200");
    assert(gotToolCall?.tool === "left_click" && gotToolCall?.tabId === 7
        && typeof gotToolCall?.tool_use_id === "string", "extension received a proper tool_call frame");

    // 4. timeout -> 504
    const slow = fakeExtension(PORT, "alice", () => {}, "slow-device");
    await slow.ready;
    const t0 = Date.now();
    const r3 = await httpJson(PORT, "POST", "/chrome/alice/tools",
        { tool: "wait", args: {}, device_id: "slow-device", timeoutMs: 1000 });
    assert(r3.status === 504 && Date.now() - t0 >= 900, "tool timeout -> 504");
    slow.ws.close();

    // 5. unknown user -> 404
    const r4 = await httpJson(PORT, "POST", "/chrome/bob/tools", { tool: "x" });
    assert(r4.status === 404, "unknown user -> 404 no browser");
    ext.ws.close();
}

// 6. agent WS relay
{
    const ext = fakeExtension(PORT, "dave", (m, send) => {
        if (m.type === "tool_call") {
            send({ type: "tool_result", tool_use_id: m.tool_use_id,
                content: [{ type: "text", text: "php-ws-relay-ok" }] });
        }
    });
    await ext.ready;
    const agent = new WebSocket(`ws://127.0.0.1:${PORT}/agent/dave`);
    await new Promise((res, rej) => { agent.on("open", res); agent.on("error", rej); });
    const result = await new Promise((res) => {
        agent.on("message", (b) => { const m = JSON.parse(b.toString()); if (m.type === "tool_result") res(m); });
        agent.send(JSON.stringify({ type: "tool_request", method: "execute_tool", params: { tool: "navigate", args: {} } }));
        setTimeout(() => res(null), 8000);
    });
    assert(!!result && /php-ws-relay-ok/.test(JSON.stringify(result)), "agent WS relay: tool_request -> tool_result");
    agent.close();
    ext.ws.close();
}

daemon.kill("SIGTERM");

// ---- bridge daemon (token mode) ----------------------------------------------
{
    const P = await freePort();
    const d2 = spawn("php", [SERVER, "--serve", "--port", String(P), "--host", "127.0.0.1"],
        { env: { ...process.env, RCE_API_TOKEN: "sekrit" }, stdio: ["ignore", "ignore", "ignore"] });
    await new Promise((res) => setTimeout(res, 800));
    const noAuth = await httpJson(P, "GET", "/chrome/alice/devices");
    assert(noAuth.status === 401, "agent HTTP without token -> 401");
    const withAuth = await httpJson(P, "GET", "/chrome/alice/devices", undefined, { Authorization: "Bearer sekrit" });
    assert(withAuth.status === 200, "agent HTTP with token -> 200");

    const wsDenied = new WebSocket(`ws://127.0.0.1:${P}/agent/alice`);
    const wsDeniedResult = await new Promise((res) => {
        wsDenied.on("open", () => res("open"));
        wsDenied.on("error", () => res("error"));
        wsDenied.on("close", (code) => res(`close:${code}`));
        setTimeout(() => res("timeout"), 3000);
    });
    assert(wsDeniedResult !== "open", `agent WS without token rejected (${wsDeniedResult})`);
    d2.kill("SIGTERM");
}

// ---- static resolver -----------------------------------------------------------
{
    const P = await freePort();
    const phpServer = spawn("php", ["-S", `127.0.0.1:${P}`, SERVER], { cwd: ROOT, stdio: ["ignore", "ignore", "pipe"] });
    await new Promise((res) => setTimeout(res, 1000));

    const raw = async (p, headers = {}) => {
        const r = await fetch(`http://127.0.0.1:${P}${p}`, { headers, signal: AbortSignal.timeout(8000) });
        return { status: r.status, ctype: r.headers.get("content-type") || "", text: await r.text() };
    };

    const readme = await raw("/README.md");
    assert(readme.status === 200 && /markdown/.test(readme.ctype) && /Szmelc-RCE/.test(readme.text),
        "static resolver serves existing files with correct MIME");

    const viaQuery = await raw("/?file=backend/README.md");
    assert(viaQuery.status === 200 && /backend/.test(viaQuery.text), "?file= fallback works (URL-rewrite-less hosts)");

    const health = await raw("/health");
    assert(health.status === 200 && /static-resolver/.test(health.text), "/health reports static-resolver mode");

    const missing = await raw("/definitely-not-here.bin");
    assert(missing.status === 404, "missing file -> 404");

    const phpSrc = await raw("/server.php");
    // under `php -S` the router runs for existing .php files too; under FPM the
    // resolver's own guard answers. Either way: never 200, never source text.
    assert(phpSrc.status !== 200 && !phpSrc.text.includes("<?php"),
        "PHP sources are never served as source");

    const trav = await raw("/..%2F..%2Fetc%2Fpasswd");
    assert(trav.status === 404, "path traversal blocked");

    phpServer.kill("SIGTERM");
}

console.log("\n" + "─".repeat(48));
console.log(`  \x1b[1mserver.php test:\x1b[0m ${fail ? "\x1b[31mFAIL\x1b[0m" : "\x1b[32mPASS\x1b[0m"}  (pass=${pass} fail=${fail})`);
if (fail && dlog.length) console.log("  [daemon log]\n   " + dlog.slice(-10).join("\n   "));
process.exit(fail ? 1 : 0);
