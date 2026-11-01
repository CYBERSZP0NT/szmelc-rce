#!/usr/bin/env node
/**
 * Szmelc-RCE — reference self-hosted control bridge.
 *
 * This is a drop-in replacement for the hosted `wss://bridge...` service.
 * It speaks the extension's remote-control wire protocol:
 *
 *    extension -> {type:"connect", client_type:"chrome-extension", ...}
 *    bridge    -> {type:"paired"}                       (or {type:"waiting"})
 *    extension <-> {type:"ping"}                         (keepalive)
 *    bridge    ->  {type:"tool_request", method:"execute_tool",
 *                    params:{tool, args, tabId?, tool_use_id}, tool_use_id}
 *    extension ->  {type:"tool_response", tool_use_id, result:{content:[...]}}
 *
 * Run it, then in the extension set  bridgeUrl = wss://<this-host>:8080
 * (options.html) and be signed in — or enable "local bridge" with
 * localBridgeUrl = ws://127.0.0.1:8765 for the always-on local path.
 *
 * Endpoints
 *   /chrome/<userId>   remote bridge (connect with oauth_token / account id)
 *
 * Demo behaviour (replace handleTool() with your agent):
 *   - waits for the extension to connect,
 *   - drives one scripted scenario: open a data: page, screenshot it,
 *   - saves screenshots under dev/shots/ and prints them.
 */
import { WebSocketServer } from "ws";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHOTS = path.join(ROOT, "dev", "shots");
const PORT = Number(process.env.RCE_BRIDGE_PORT || 8080);
const log = (...a) => console.log("[bridge]", ...a);

fs.mkdirSync(SHOTS, { recursive: true });

function replyTool(socket, id, payload) {
    socket.send(JSON.stringify({
        type: "tool_request",
        tool_use_id: id,
        method: "execute_tool",
        params: { tool: payload.tool, args: payload.args ?? {}, tabId: payload.tabId, tool_use_id: id },
    }));
}

const sendFor = (ws) => (step) => replyTool(ws, crypto.randomUUID(), { ...step, tabId: step.tabId });

function saveIfJpeg(content) {
    // The extension returns MCP-style content blocks. A screenshot shows up as a
    // base64 data URL somewhere in the response; persist it for the demo.
    const blob = typeof content === "string" ? content : JSON.stringify(content);
    const m = blob.match(/data:image\/(?:jpeg|png);base64,([A-Za-z0-9+/=]+)/);
    if (m) {
        const f = path.join(SHOTS, `shot-${Date.now()}.jpg`);
        fs.writeFileSync(f, Buffer.from(m[1], "base64"));
        log("saved screenshot ->", path.relative(ROOT, f));
        return true;
    }
    return false;
}

// A tiny "agent": a list of (tool, args) steps. Replace with your LLM loop.
const SCENARIO = [
    { tool: "tab_new", args: { url: "data:text/html,<title>Szmelc-RCE</title><h1 style='font-family:sans-serif'>Remote control works 🎉</h1><p>screenshot captured by the bridge</p>" } },
];

function run(scenario, send, tabId) {
    let i = 0;
    const next = () => {
        if (i >= scenario.length) {
            log("scenario complete -> sending screenshot");
            return send({ tool: "screenshot", args: { fullPage: false }, tabId });
        }
        send(scenario[i++]);
        setTimeout(next, 1500);
    };
    next();
}

const wss = new WebSocketServer({ port: PORT, host: "127.0.0.1" });
wss.on("listening", () => log(`listening on ws://127.0.0.1:${PORT}/chrome/<userId>`));

wss.on("connection", (ws, req) => {
    const userId = req.url?.split("/").filter(Boolean).pop() || "anon";
    log("open", req.url, "userId=", userId);
    let started = false;
    ws.on("message", (buf) => {
        let m; try { m = JSON.parse(buf.toString()); } catch { return; }
        if (m.type === "ping") return ws.send(JSON.stringify({ type: "pong" }));
        if (m.type === "connect") {
            log("extend connected: client_type=", m.client_type, "device=", m.device_id);
            ws.send(JSON.stringify({ type: "paired", scoped_peer_disconnect: !!m.scoped_peer_disconnect }));
            setTimeout(() => { if (!started) { started = true; run(SCENARIO, sendFor(ws), m.tabId); } }, 1500);
            return;
        }
        if (m.type === "tool_response") {
            const content = m.result?.content ?? m.error?.content;
            log("tool_response:", JSON.stringify(content ?? {}).slice(0, 200));
            saveIfJpeg(content);
        }
    });
    ws.on("close", (c) => log("closed", c));
});
