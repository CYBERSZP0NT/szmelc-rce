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
 *    bridge    ->  {type:"tool_call", tool_use_id, tool, args, tabId?}
 *    extension ->  {type:"tool_result", tool_use_id, content|result|error}
 *
 *    ...or the generic envelope (also accepted by the extension):
 *    bridge    ->  {type:"tool_request", method:"execute_tool",
 *                    params:{tool, args, tabId?, tool_use_id}, tool_use_id}
 *    extension ->  {type:"tool_result", tool_use_id, ...}
 *
 * Run it, then in the extension set  bridgeUrl = ws://127.0.0.1:8080
 * (options.html). No account needed: the extension connects anonymously by
 * default (config bridgeAnonymous = true).
 *
 * Endpoints
 *   /chrome/<userId>   remote bridge (userId = account uuid or device uuid)
 *
 * Demo behaviour (replace with your agent):
 *   - waits for the extension to connect,
 *   - drives one scripted scenario: create the agent tab group, open a page
 *     in it — real tools, real browser work,
 *   - saves screenshots under dev/shots/ when tools return images.
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
    // Hosted-protocol frame (the extension also accepts the generic
    // {"type":"tool_request","method":"execute_tool",...} envelope).
    socket.send(JSON.stringify({
        type: "tool_call",
        tool_use_id: id,
        tool: payload.tool,
        args: payload.args ?? {},
        ...payload.tabId !== undefined && { tabId: payload.tabId },
        client_type: "bridge",
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
    { tool: "tabs_context_mcp", args: { createIfEmpty: true } },
    { tool: "tabs_create_mcp", args: { url: "data:text/html,<title>Szmelc-RCE</title><h1 style='font-family:sans-serif'>Remote control works 🎉</h1><p>page created by the bridge</p>" } },
];

function run(scenario, send, tabId) {
    let i = 0;
    const next = () => {
        if (i >= scenario.length) {
            log("scenario complete — the extension executed all steps");
            return;
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
        if (m.type === "tool_result" || m.type === "tool_response") {
            // The extension replies with {"type":"tool_result", ...} frames
            // (hosted protocol); tool_response is the generic-envelope reply.
            const content = m.result?.content ?? m.error?.content ?? m.content;
            log("tool_result:", JSON.stringify(content ?? {}).slice(0, 200));
            saveIfJpeg(content);
        }
    });
    ws.on("close", (c) => log("closed", c));
});
