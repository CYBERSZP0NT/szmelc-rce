#!/usr/bin/env node
/**
 * Szmelc-RCE — remote backend for szmelc.com (self-hosted control bridge).
 *
 * The production counterpart of dev/bridge.mjs: extensions connect over
 * WebSocket, agents drive them over HTTP and/or WebSocket. Zero state, zero
 * dependencies (the `ws` library is vendored in backend/vendor/ws).
 *
 *   extension  wss://szmelc.com/chrome/<userId>   (behind your TLS proxy)
 *   agent      POST /chrome/<userId>/tools        {tool, args, tabId?, ...}
 *   agent      GET  /chrome/<userId>/devices      presence
 *   agent      ws://…/agent/<userId>              same frames as the hosted
 *                                                 protocol, push-style
 *
 * Wire protocol (extension side — see test/e2e-bridge.mjs for proof):
 *   ext  -> {type:"connect", client_type:"chrome-extension", device_id,
 *            os_platform?, extension_version?, display_name?, oauth_token,
 *            scoped_peer_disconnect:true}
 *   bkd  -> {type:"paired", scoped_peer_disconnect:true}
 *   ext <-> {type:"ping"} / {type:"pong"}
 *   bkd  -> {type:"tool_call", tool_use_id, tool, args, tabId?, client_type,
 *            target_device_id?, session_scope?, permission_mode?}
 *   ext  -> {type:"tool_result", tool_use_id, content|error|result, ...}
 *   ext  -> {type:"permission_request", request_id, ...}
 *   bkd  -> {type:"permission_response", request_id, allowed}   (policy-based)
 *
 * Agent-side HTTP replies are the extension's tool_result envelope verbatim.
 *
 * Environment:
 *   PORT                     listen port                (default 8080)
 *   HOST                     bind address               (default 0.0.0.0)
 *   RCE_API_TOKEN            required Bearer token for agent HTTP/WS;
 *                            unset = open (fine for localhost / VPN, never
 *                            for a public host)
 *   RCE_EXTENSION_TOKENS     comma-separated allowlist of oauth_token values
 *                            extensions must present; unset = accept any
 *                            (matches the extension's anonymous device-uuid
 *                            mode; put real tokens here once you issue them)
 *   RCE_PERMISSIONS          auto | deny                (default auto)
 *                            what to answer when the extension sends a
 *                            permission_request
 *   RCE_TOOL_TIMEOUT_MS      default per-call timeout   (default 120000)
 */
import http from "node:http";
import crypto from "node:crypto";
// ws is vendored (MIT, backend/vendor/ws) so the backend runs with zero
// `npm install` — see backend/vendor/ws/LICENSE. Falls back to a regular
// `ws` install if the vendored copy is absent (e.g. distro packaging).
const { WebSocketServer, WebSocket } = await (async () => {
    try {
        const m = await import("./vendor/ws/index.js");
        if (m.default?.WebSocketServer) return m.default;
    } catch { /* vendored copy absent */ }
    const m = await import("ws");
    return m.default?.WebSocketServer ? m.default : m;
})();

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "0.0.0.0";
const API_TOKEN = process.env.RCE_API_TOKEN || "";
const EXTENSION_TOKENS = (process.env.RCE_EXTENSION_TOKENS || "")
    .split(",").map((s) => s.trim()).filter(Boolean);
const PERMISSION_POLICY = (process.env.RCE_PERMISSIONS || "auto").toLowerCase();
const TOOL_TIMEOUT_MS = Number(process.env.RCE_TOOL_TIMEOUT_MS || 120000);

const log = (...a) => console.log(new Date().toISOString(), "[backend]", ...a);

// userId -> Map<deviceId, {ws, device_id, display_name, extension_version, os_platform, connectedAt, alive}>
/** @type {Map<string, Map<string, any>>} */
const users = new Map();
// tool_use_id -> {resolve, timer, userId, deviceId}
/** @type {Map<string, {resolve:Function,timer:NodeJS.Timeout,userId:string,deviceId:string}>} */
const pending = new Map();

const newId = () => crypto.randomUUID();

// ---------------------------------------------------------------- devices --
function registerDevice(userId, device, ws) {
    let map = users.get(userId);
    if (!map) users.set(userId, (map = new Map()));
    const prev = map.get(device.device_id);
    if (prev && prev.ws !== ws) { // same device re-connecting (e.g. reload)
        try { prev.ws.close(4001, "replaced"); } catch {}
    }
    map.set(device.device_id, device);
    log(`ext connected: user=${userId} device=${device.device_id} v=${device.extension_version || "?"}`);
}

function dropDevice(userId, deviceId, ws) {
    const map = users.get(userId);
    if (!map) return;
    const dev = map.get(deviceId);
    if (dev && dev.ws === ws) {
        map.delete(deviceId);
        log(`ext disconnected: user=${userId} device=${deviceId}`);
        if (map.size === 0) users.delete(userId);
    }
}

function pickDevice(userId, deviceId) {
    const map = users.get(userId);
    if (!map || map.size === 0) return null;
    if (deviceId) {
        const dev = map.get(deviceId);
        return dev ? { dev, deviceId } : null;
    }
    // no explicit target: most recently connected device wins
    let best = null, bestT = -1;
    for (const [id, dev] of map) {
        if (dev.connectedAt > bestT) { bestT = dev.connectedAt; best = { dev, deviceId: id }; }
    }
    return best;
}

function sendTo(ws, obj) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(obj));
        return true;
    }
    return false;
}

// ------------------------------------------------------------ tool routing --
function executeTool(userId, req) {
    const toolUseId = req.tool_use_id || newId();
    const target = pickDevice(userId, req.device_id);
    if (!target) {
        return Promise.reject(Object.assign(new Error("no browser connected for this user"), { code: 404 }));
    }
    const { dev, deviceId } = target;

    return new Promise((resolve, reject) => {
        const timeoutMs = Math.max(1000, Number(req.timeoutMs) || TOOL_TIMEOUT_MS);
        const timer = setTimeout(() => {
            pending.delete(toolUseId);
            reject(Object.assign(new Error(`tool timeout after ${timeoutMs}ms (tool_use_id=${toolUseId})`), { code: 504 }));
        }, timeoutMs);
        pending.set(toolUseId, { resolve, timer, userId, deviceId });

        const frame = {
            type: "tool_call",
            tool_use_id: toolUseId,
            tool: req.tool,
            args: req.args ?? {},
            client_type: req.client_type || "bridge",
        };
        if (req.tabId !== undefined) frame.tabId = req.tabId;
        if (req.session_scope) frame.session_scope = req.session_scope;
        if (req.permission_mode) frame.permission_mode = req.permission_mode;
        if (req.allowed_domains) frame.allowed_domains = req.allowed_domains;
        if (req.handle_permission_prompts !== undefined) frame.handle_permission_prompts = req.handle_permission_prompts;
        // Explicit device targeting: the extension ignores frames meant for
        // another device (target_device_id check in its tool_call handler).
        if (req.device_id) frame.target_device_id = deviceId;
        if (!sendTo(dev.ws, frame)) {
            clearTimeout(timer);
            pending.delete(toolUseId);
            reject(Object.assign(new Error("browser socket closed while dispatching"), { code: 502 }));
        }
        log(`tool_call -> user=${userId} device=${deviceId} tool=${req.tool} id=${toolUseId}`);
    });
}

function resolveToolResult(userId, m) {
    const id = m.tool_use_id;
    const p = id && pending.get(id);
    if (!p) {
        log(`tool_result without pending call: user=${userId} id=${id ?? "?"}`);
        return;
    }
    clearTimeout(p.timer);
    pending.delete(id);
    log(`tool_result <- user=${userId} id=${id}`);
    p.resolve(m);
}

function handlePermissionRequest(userId, m) {
    const allowed = PERMISSION_POLICY === "auto";
    log(`permission_request user=${userId} id=${m.request_id} policy=${PERMISSION_POLICY} -> allowed=${allowed}`);
    const target = pickDevice(userId);
    if (target) {
        sendTo(target.dev.ws, {
            type: "permission_response",
            request_id: m.request_id,
            allowed,
        });
    }
}

// ----------------------------------------------------------------- ws srv --
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws, req, kind, userId) => {
    ws.isAlive = true;
    ws.on("pong", () => { ws.isAlive = true; });

    if (kind === "agent") {
        log(`agent ws connected: user=${userId}`);
        ws.on("message", (buf) => {
            let m; try { m = JSON.parse(buf.toString()); } catch { return; }
            if (m.type === "ping") return sendTo(ws, { type: "pong" });
            if (m.type === "tool_call" || m.type === "tool_request") {
                const req = m.type === "tool_request"
                    ? { ...(m.params || {}), tool_use_id: m.tool_use_id || m.params?.tool_use_id }
                    : m;
                executeTool(userId, req)
                    .then((result) => sendTo(ws, result))
                    .catch((err) => sendTo(ws, {
                        type: "tool_result",
                        tool_use_id: req.tool_use_id || newId(),
                        error: { content: [{ type: "text", text: err.message }] },
                    }));
                return;
            }
            if (m.type === "tool_result" || m.type === "tool_response") {
                return resolveToolResult(userId, m);
            }
            if (m.type === "list_devices") {
                return sendTo(ws, { type: "devices", devices: listDevices(userId) });
            }
        });
        ws.on("close", () => log(`agent ws closed: user=${userId}`));
        return;
    }

    // ---- extension side ----------------------------------------------------
    let userIdBound = userId;
    let deviceId = null;
    ws.on("message", (buf) => {
        let m; try { m = JSON.parse(buf.toString()); } catch { return; }
        if (m.type === "ping") return sendTo(ws, { type: "pong" });
        if (m.type === "connect") {
            if (EXTENSION_TOKENS.length && !EXTENSION_TOKENS.includes(String(m.oauth_token))) {
                log(`ext rejected: user=${userId} bad token`);
                ws.close(4003, "bad oauth_token");
                return;
            }
            deviceId = String(m.device_id || newId());
            registerDevice(userIdBound, {
                ws,
                device_id: deviceId,
                display_name: m.display_name,
                extension_version: m.extension_version,
                os_platform: m.os_platform,
                connectedAt: Date.now(),
            }, ws);
            sendTo(ws, { type: "paired", scoped_peer_disconnect: !!m.scoped_peer_disconnect });
            return;
        }
        if (m.type === "tool_result" || m.type === "tool_response") return resolveToolResult(userIdBound, m);
        if (m.type === "permission_request") return handlePermissionRequest(userIdBound, m);
        // notifications & anything else: logged and ignored
        log(`ext frame (unhandled): user=${userIdBound} type=${m.type}`);
    });
    ws.on("close", () => {
        if (deviceId) dropDevice(userIdBound, deviceId, ws);
    });
});

// heartbeat: kill dead sockets (extension reconnects on its own)
const HEARTBEAT = setInterval(() => {
    for (const [, map] of users) {
        for (const [, dev] of map) {
            if (dev.ws.readyState !== WebSocket.OPEN) continue;
            if (!dev.ws.isAlive) { try { dev.ws.terminate(); } catch {} continue; }
            dev.ws.isAlive = false;
            dev.ws.ping();
        }
    }
}, 20000);
wss.on("close", () => clearInterval(HEARTBEAT));

// ----------------------------------------------------------------- http ----
function deviceInfo(userId, d) {
    return {
        userId,
        device_id: d.device_id,
        display_name: d.display_name,
        extension_version: d.extension_version,
        os_platform: d.os_platform,
        connected_ms: Date.now() - d.connectedAt,
    };
}

function listDevices(userId) {
    const map = users.get(userId);
    if (!map) return [];
    return [...map.values()].map((d) => deviceInfo(userId, d));
}

function listAllDevices() {
    const out = [];
    for (const [userId, map] of users) for (const d of map.values()) out.push(deviceInfo(userId, d));
    return out;
}

function authorized(req) {
    if (!API_TOKEN) return true; // open mode (documented: localhost/VPN only)
    const auth = req.headers.authorization || "";
    return auth === `Bearer ${API_TOKEN}`;
}

function json(res, code, body) {
    const data = JSON.stringify(body);
    res.writeHead(code, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) });
    res.end(data);
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];
        req.on("data", (c) => {
            size += c.length;
            if (size > 1 << 20) { reject(Object.assign(new Error("body too large"), { code: 413 })); req.destroy(); return; }
            chunks.push(c);
        });
        req.on("end", () => {
            if (!chunks.length) return resolve({});
            try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
            catch { reject(Object.assign(new Error("invalid JSON body"), { code: 400 })); }
        });
        req.on("error", reject);
    });
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://x");
    const parts = url.pathname.split("/").filter(Boolean);
    try {
        if (url.pathname === "/health") return json(res, 200, { ok: true, users: users.size });
        if (!authorized(req)) return json(res, 401, { error: "unauthorized" });

        // GET /devices  -> discovery: every connected browser across all users.
        // In anonymous mode the extension dials /chrome/<deviceUuid>, so agents
        // discover the userId here instead of guessing it.
        if (req.method === "GET" && url.pathname === "/devices") {
            return json(res, 200, { devices: listAllDevices() });
        }

        // GET /chrome/<userId>/devices
        if (req.method === "GET" && parts[0] === "chrome" && parts[2] === "devices") {
            return json(res, 200, { devices: listDevices(parts[1]) });
        }

        // POST /chrome/<userId>/tools   {tool, args, tabId?, device_id?, timeoutMs?, ...}
        if (req.method === "POST" && parts[0] === "chrome" && parts[2] === "tools") {
            const body = await readBody(req);
            if (!body.tool) return json(res, 400, { error: "missing tool" });
            try {
                const result = await executeTool(parts[1], body);
                return json(res, 200, result);
            } catch (err) {
                return json(res, err.code || 500, { error: err.message });
            }
        }

        return json(res, 404, { error: "not found" });
    } catch (err) {
        return json(res, err.code || 500, { error: err.message });
    }
});

server.on("upgrade", (req, socket, head) => {
    const url = new URL(req.url, "http://x");
    const parts = url.pathname.split("/").filter(Boolean);
    let kind = null, userId = null;
    // /chrome/<userId>  -> extension,  /agent/<userId> -> agent ws
    if (parts[0] === "chrome" && parts[1]) { kind = "extension"; userId = decodeURIComponent(parts[1]); }
    if (parts[0] === "agent" && parts[1]) {
        if (!authorized(req)) { socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n"); return socket.destroy(); }
        kind = "agent"; userId = decodeURIComponent(parts[1]);
    }
    if (!kind) { socket.write("HTTP/1.1 404 Not Found\r\n\r\n"); return socket.destroy(); }
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req, kind, userId));
});

server.listen(PORT, HOST, () => {
    log(`listening on http://${HOST}:${PORT}`);
    log(`  extensions : ws://${HOST}:${PORT}/chrome/<userId>`);
    log(`  agents     : POST /chrome/<userId>/tools | GET /chrome/<userId>/devices | ws /agent/<userId>`);
    log(API_TOKEN ? "agent auth: Bearer token required" : "agent auth: OPEN (set RCE_API_TOKEN for public hosts)");
    log(`permissions policy: ${PERMISSION_POLICY}`);
});
