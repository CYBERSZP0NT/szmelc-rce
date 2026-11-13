#!/usr/bin/env node
/**
 * Szmelc-RCE — backend self-test (no browser needed).
 *
 * Spawns backend/server.mjs and asserts the full agent↔backend↔extension
 * round-trips over real sockets:
 *   1. /health
 *   2. presence: /chrome/<u>/devices before & after an extension connects
 *   3. POST /chrome/<u>/tools -> tool_call frame on the extension socket ->
 *      tool_result -> HTTP response carries the result envelope
 *   4. device targeting (device_id routing)
 *   5. timeout -> HTTP 504
 *   6. no browser -> HTTP 404
 *   7. agent WS /agent/<u> relay (tool_request -> tool_result)
 *   8. agent auth enforced when RCE_API_TOKEN is set
 */
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocket } from "ws";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SERVER = path.join(ROOT, "backend", "server.mjs");

let pass = 0, fail = 0;
const assert = (c, l) => { c ? (pass++, console.log("  \x1b[32m✓\x1b[0m " + l)) : (fail++, console.log("  \x1b[31m✗\x1b[0m " + l)); };

const freePort = () => new Promise((res) => {
    const srv = net.createServer();
    srv.listen(0, "127.0.0.1", () => { const p = srv.address().port; srv.close(() => res(p)); });
});

function startBackend(env = {}) {
    const port = net.createServer; // noop to keep linters quiet
    return freePort().then((PORT) => new Promise((res) => {
        const child = spawn(process.execPath, [SERVER], {
            env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1", ...env },
            stdio: ["ignore", "pipe", "pipe"],
        });
        child.stderr.on("data", (d) => process.env.DEBUG_BACKEND && process.stderr.write(d));
        const out = (d) => { if (/listening on/.test(String(d))) res({ child, PORT }); };
        child.stdout.on("data", out);
        child.stderr.on("data", out);
    }));
}

const httpJson = async (port, method, p, body, headers = {}) => {
    const r = await fetch(`http://127.0.0.1:${port}${p}`, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
    });
    return { status: r.status, body: await r.json().catch(() => ({})) };
};

// fake extension: connect, answer pings, route frames to a handler
function fakeExtension(port, userId, onFrame, deviceId = "fake-device-1") {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/chrome/${userId}`);
    const sent = [];
    const send = (o) => { sent.push(o.type); ws.send(JSON.stringify(o)); };
    ws.on("open", () => send({
        type: "connect", client_type: "chrome-extension",
        device_id: deviceId, oauth_token: "anon-uuid",
        extension_version: "1.0.0", scoped_peer_disconnect: true,
    }));
    ws.on("message", (b) => {
        let m; try { m = JSON.parse(b.toString()); } catch { return; }
        if (m.type === "ping") return send({ type: "pong" });
        onFrame(m, send);
    });
    const ready = new Promise((res) => ws.on("open", () => setTimeout(res, 150)));
    return { ws, send, sent, ready };
}

// ---- instance 1: open mode --------------------------------------------------
const { child, PORT } = await startBackend();

// 1. health
{
    const r = await httpJson(PORT, "GET", "/health");
    assert(r.status === 200 && r.body.ok === true, "/health ok");
}

// 2. presence
{
    const r0 = await httpJson(PORT, "GET", "/chrome/alice/devices");
    assert(r0.status === 200 && r0.body.devices.length === 0, "devices empty before extension connects");

    let gotToolCall = null;
    const ext = fakeExtension(PORT, "alice", (m, send) => {
        if (m.type === "tool_call") {
            gotToolCall = m;
            send({ type: "tool_result", tool_use_id: m.tool_use_id,
                content: [{ type: "text", text: `ran ${m.tool}` }] });
        }
    });
    await ext.ready;

    const r1 = await httpJson(PORT, "GET", "/chrome/alice/devices");
    assert(r1.body.devices?.length === 1 && r1.body.devices[0].device_id === "fake-device-1",
        "devices lists the connected extension");

    // 3. POST tools -> round-trip
    const r2 = await httpJson(PORT, "POST", "/chrome/alice/tools",
        { tool: "left_click", args: { coordinate: [10, 20] }, tabId: 7 });
    assert(r2.status === 200, `POST /tools -> 200 (got ${r2.status}: ${JSON.stringify(r2.body).slice(0, 80)})`);
    assert(/ran left_click/.test(JSON.stringify(r2.body)), "HTTP response carries the tool_result content");
    assert(gotToolCall?.tool === "left_click" && gotToolCall?.args?.coordinate?.[0] === 10
        && gotToolCall?.tabId === 7 && typeof gotToolCall?.tool_use_id === "string",
        "extension received a proper tool_call frame");

    // 5. timeout -> 504
    const slow = fakeExtension(PORT, "alice", () => { /* never replies */ });
    await slow.ready;
    const t0 = Date.now();
    const r3 = await httpJson(PORT, "POST", "/chrome/alice/tools",
        { tool: "wait", args: {}, timeoutMs: 1000 });
    assert(r3.status === 504 && Date.now() - t0 >= 900, "tool timeout -> 504");
    slow.ws.close();

    // 6. no browser -> 404
    const r4 = await httpJson(PORT, "POST", "/chrome/bob/tools", { tool: "wait", args: {} });
    assert(r4.status === 404, "unknown user -> 404 no browser");
    ext.ws.close();
}

// 4. device targeting with two devices
{
    const d1 = fakeExtension(PORT, "carol", () => {}); // silent
    await d1.ready;
    let hit = "";
    const d2 = fakeExtension(PORT, "carol", (m, send) => {
        hit = m.tool;
        send({ type: "tool_result", tool_use_id: m.tool_use_id, content: [{ type: "text", text: "from d2" }] });
    }, "carol-device-2");
    await d2.ready;
    const r = await httpJson(PORT, "POST", "/chrome/carol/tools",
        { tool: "get_page_text", args: {}, device_id: "carol-device-2" });
    assert(r.status === 200 && hit === "get_page_text",
        "device targeting: call routed to the targeted device (other device silent)");
    d1.ws.close(); d2.ws.close();
}

// 7. agent WS relay
{
    let gotToolCall = null;
    const ext = fakeExtension(PORT, "dave", (m, send) => {
        if (m.type === "tool_call") {
            gotToolCall = m;
            send({ type: "tool_result", tool_use_id: m.tool_use_id,
                content: [{ type: "text", text: "ws-relay-ok" }] });
        }
    });
    await ext.ready;
    const agent = new WebSocket(`ws://127.0.0.1:${PORT}/agent/dave`);
    await new Promise((res, rej) => { agent.on("open", res); agent.on("error", rej); });
    const result = await new Promise((res) => {
        agent.on("message", (b) => { const m = JSON.parse(b.toString()); if (m.type === "tool_result") res(m); });
        agent.send(JSON.stringify({ type: "tool_request", method: "execute_tool",
            params: { tool: "navigate", args: { url: "https://example.com" } } }));
        setTimeout(() => res(null), 8000);
    });
    assert(!!result && /ws-relay-ok/.test(JSON.stringify(result)), "agent WS relay: tool_request -> tool_result");
    assert(gotToolCall?.tool === "navigate", "agent WS relay: extension got the tool_call");
    agent.close();
    ext.ws.close();
}

child.kill("SIGKILL");

// ---- instance 2: token enforcement ------------------------------------------
{
    const { child: c2, PORT: P2 } = await startBackend({ RCE_API_TOKEN: "sekrit" });
    const noAuth = await httpJson(P2, "GET", "/chrome/alice/devices");
    assert(noAuth.status === 401, "agent HTTP without token -> 401");
    const withAuth = await httpJson(P2, "GET", "/chrome/alice/devices",
        undefined, { Authorization: "Bearer sekrit" });
    assert(withAuth.status === 200, "agent HTTP with token -> 200");

    const wsDenied = new WebSocket(`ws://127.0.0.1:${P2}/agent/alice`);
    const wsDeniedResult = await new Promise((res) => {
        wsDenied.on("open", () => res("open"));
        wsDenied.on("error", () => res("error"));
        wsDenied.on("close", (code) => res(`close:${code}`));
        setTimeout(() => res("timeout"), 3000);
    });
    assert(wsDeniedResult !== "open", `agent WS without token rejected (${wsDeniedResult})`);
    c2.kill("SIGKILL");
}

console.log("\n" + "─".repeat(48));
console.log(`  \x1b[1mbackend test:\x1b[0m ${fail ? "\x1b[31mFAIL\x1b[0m" : "\x1b[32mPASS\x1b[0m"}  (pass=${pass} fail=${fail})`);
process.exit(fail ? 1 : 0);
