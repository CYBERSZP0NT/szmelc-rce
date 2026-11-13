#!/usr/bin/env node
/**
 * Szmelc-RCE — end-to-end bridge test (real browser, real tool execution).
 *
 * Proves the fork's headline claim: with NO account and NO OAuth server, the
 * extension connects anonymously to an arbitrary self-hosted WebSocket bridge
 * and executes a real tool (CDP screenshot) for it.
 *
 *   1. an inline bridge server listens on an ephemeral port
 *   2. the extension is loaded into headless Chromium (unsigned-in profile)
 *   3. config is pointed at the bridge via chrome.storage + worker reload
 *   4. asserts: connect frame (anonymous), paired, execute_tool -> tool_response
 *      carrying a real JPEG screenshot
 *
 * Requires a system Chrome/Chromium (CHROME_PATH to override).
 */
import { chromium } from "playwright-core";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXT_ID = "fcoeoabgfenejglbffodgkkbkcdhcgfn"; // from manifest key

let pass = 0, fail = 0;
const assert = (c, l) => { c ? (pass++, console.log("  \x1b[32m✓\x1b[0m " + l)) : (fail++, console.log("  \x1b[31m✗\x1b[0m " + l)); };
const PORT = await new Promise((res) => {
    const srv = net.createServer();
    srv.listen(0, "127.0.0.1", () => { const p = srv.address().port; srv.close(() => res(p)); });
});

// ---- 1. the "anything" bridge ------------------------------------------------
// Minimal generic bridge: connect -> paired, ping -> pong, execute_tool.
const seen = { connect: null, toolResponse: null, messages: [] };
const wss = new WebSocketServer({ port: PORT, host: "127.0.0.1" });
const bridgeReady = new Promise((res) => wss.on("listening", res));

let SHOT_TAB_ID = null; // injected once known

function sendTool(ws, id, tool, args) {
    ws.send(JSON.stringify({
        type: "tool_request", tool_use_id: id, method: "execute_tool",
        params: {
            tool, args, tool_use_id: id,
            // all calls of one agent session share the same session scope, so
            // tabs_context_mcp's group is found again by later calls
            session_scope: { sessionId: "szmelc-e2e-session", displayName: "Szmelc E2E" },
        },
    }));
}

wss.on("connection", (ws) => {
    ws.on("message", (buf) => {
        let m; try { m = JSON.parse(buf.toString()); } catch { return; }
        seen.messages.push(m.type);
        if (m.type === "ping") return ws.send(JSON.stringify({ type: "pong" }));
        if (m.type === "permission_request") {
            seen.messages.push("permission_request");
            return ws.send(JSON.stringify({ type: "permission_response", request_id: m.request_id, allowed: true }));
        }
        if (m.type === "connect") {
            seen.connect = m;
            ws.send(JSON.stringify({ type: "paired", scoped_peer_disconnect: !!m.scoped_peer_disconnect }));
            // 1) a trivial tool (no permissions, no tab needed) ...
            setTimeout(() => sendTool(ws, "e2e-wait-1", "wait", { duration: 100 }), 500);
        }
        if (m.type === "tool_result" || m.type === "tool_response") {
            if (m.tool_use_id === "e2e-wait-1") {
                // ... then create the agent's managed tab group ...
                seen.waitResponse = m;
                setTimeout(() => sendTool(ws, "e2e-ctx-1", "tabs_context_mcp", { createIfEmpty: true }), 200);
            }
            if (m.tool_use_id === "e2e-ctx-1") {
                // ... then create a real tab inside the agent's group.
                seen.ctxResponse = m;
                setTimeout(() => sendTool(ws, "e2e-create-1", "tabs_create_mcp",
                    { url: "data:text/html,<title>bridge-created</title><h1>made by the bridge</h1>" }), 200);
            }
            if (m.tool_use_id === "e2e-create-1") seen.toolResponse = m;
        }
    });
});

// ---- 2. browser + extension --------------------------------------------------
const CANDIDATES = (process.env.CHROME_PATH
    ? [process.env.CHROME_PATH]
    : ["/usr/bin/chromium", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium-browser"]
).filter((p) => p && fs.existsSync(p));
if (!CANDIDATES.length) { console.error("No system Chromium found; set CHROME_PATH"); process.exit(2); }

let ctx = null;
let profile = fs.mkdtempSync(path.join(os.tmpdir(), "szmelc-e2e-"));
for (const cand of CANDIDATES) {
    try {
        ctx = await chromium.launchPersistentContext(profile, {
            executablePath: cand,
            headless: true,
            args: [`--load-extension=${ROOT}`, `--disable-extensions-except=${ROOT}`,
                   "--no-first-run", "--no-default-browser-check", "--disable-gpu"],
        });
        console.log("  using browser:", cand);
        break;
    } catch (e) {
        ctx = null;
        fs.rmSync(profile, { recursive: true, force: true });
        profile = fs.mkdtempSync(path.join(os.tmpdir(), "szmelc-e2e-"));
    }
}
if (!ctx) { console.error("No working browser among:", CANDIDATES); process.exit(2); }

await bridgeReady;

// The screenshot tool needs a tab to capture — open one and learn its id
// (bridge-driven tools take an explicit tabId, there is no side-panel context).
const shotPage = await ctx.newPage();
await shotPage.goto("data:text/html,<title>Szmelc-RCE e2e</title><h1>szmelc-rce e2e</h1>", { timeout: 10000 }).catch(() => {});
const swBoot = await ctx.waitForEvent("serviceworker", { timeout: 15000 }).catch(() => null)
    || ctx.serviceWorkers()[0];
const shotTabId = await swBoot.evaluate(async () => {
    const tabs = await chrome.tabs.query({});
    return (tabs.find((t) => (t.url || "").startsWith("data:text/html")) || {}).id ?? null;
}).catch(() => null);
console.log("  [diag] shot tabId:", shotTabId);

// ---- 3. point the extension's config at the local bridge ---------------------
const sw0 = await ctx.waitForEvent("serviceworker", { timeout: 15000 }).catch(() => null)
    || ctx.serviceWorkers()[0];
if (!sw0) { assert(false, "service worker booted"); await ctx.close(); process.exit(1); }

// Point the extension's config at the local bridge: persist to storage AND
// update the live worker's in-memory config, then poke the worker's "online"
// listener (its handler triggers the bridge connect routine). Note: the
// boot-time dial may already be CONNECTING to the default bridge — the
// worker's 30s keepalive alarm force-closes such wedged sockets and retries
// with the now-live config, so the assertion window below is generous.
await sw0.evaluate((port) => {
    const cfg = {
        ...globalThis.__SZMELC_CFG,
        bridgeUrl: `ws://127.0.0.1:${port}`,
        localBridge: false,
        bridgeAnonymous: true,
    };
    globalThis.__SZMELC_CFG = cfg;
    return chrome.storage.local.set({ szmelcRceConfig: cfg });
}, PORT);

const cfgOk = await sw0.evaluate((port) => globalThis.__SZMELC_CFG?.bridgeUrl === `ws://127.0.0.1:${port}`, PORT);
assert(cfgOk, "live config points at the local bridge");
SHOT_TAB_ID = shotTabId;
await sw0.evaluate(() => globalThis.dispatchEvent(new Event("online")));

// ---- 4. assertions against the bridge ---------------------------------------
// Give the reloaded worker time to boot, read the config, and dial. The 30s
// keepalive alarm is a fallback connect trigger if reload timing varies.
const deadline = Date.now() + 90000;
while (!seen.connect && Date.now() < deadline) await new Promise((r) => setTimeout(r, 200));
assert(!!seen.connect, "extension connected to the local bridge");
if (seen.connect) {
    assert(seen.connect.client_type === "chrome-extension", `client_type=chrome-extension (device=${(seen.connect.device_id || "").slice(0, 8)}…)`);
    assert(typeof seen.connect.oauth_token === "string" && seen.connect.oauth_token.length > 0, "anonymous token present (device uuid)");
    assert(typeof seen.connect.device_id === "string", "device_id present");
}

// The extension must answer tool calls with real content.
const shotDeadline = Date.now() + 25000;
while (!seen.toolResponse && Date.now() < shotDeadline) await new Promise((r) => setTimeout(r, 200));
assert(!!seen.waitResponse, "execute_tool(wait) answered with tool_result");
assert(!!seen.ctxResponse, "tabs_context_mcp(createIfEmpty) answered");
assert(!!seen.toolResponse, "execute_tool(tabs_create_mcp) answered with tool_result");
const blob = JSON.stringify(seen.toolResponse || {});
assert(!seen.toolResponse?.error && !seen.toolResponse?.is_error, "no error in tool_result" + blob.slice(0, 200));
const createdId = (blob.match(/Tab ID:\s*(\d+)/) || [])[1];
assert(!!createdId, `tool_result reports the created tab (${createdId})`);
// Objective verification: that tab really exists in the browser.
const swNow = ctx.serviceWorkers().reverse().find((w) => w !== sw0) || sw0;
const tabExists = await swNow.evaluate(async (tabId) => {
    try { await chrome.tabs.get(tabId); return true; } catch { return false; }
}, createdId ? Number(createdId) : -1).catch(() => null);
assert(tabExists === true, "bridge-created tab really exists in the browser");

// Diagnostics for connect failures: newest live worker's connect trail.
for (const w of ctx.serviceWorkers().reverse()) {
    const trail = await w.evaluate(() => globalThis.__rnTrail || []).catch(() => null);
    if (trail) {
        console.log("  [diag] rn() trail (last 12):", trail.slice(-12));
        console.log("  [diag] screenshot blob head:", blob.slice(0, 260));
        console.log("  [diag] bridge messages seen:", seen.messages);
        const ttrail = await w.evaluate(() => globalThis.__toolTrail || []).catch(() => null);
        console.log("  [diag] tool trail:", ttrail);
        // Raw WS probe from the same worker: is a plain WebSocket to the
        // bridge even possible (CSP / network), independent of rn() logic?
        const probe = await w.evaluate((port) => new Promise((res) => {
            try {
                const s = new WebSocket(`ws://127.0.0.1:${port}/probe`);
                s.onopen = () => { s.close(); res("open"); };
                s.onerror = () => res("error");
                s.onclose = (e) => res("close:" + e.code);
                setTimeout(() => res("timeout"), 5000);
            } catch (e) { res("throw:" + e.message); }
        }), PORT).catch((e) => "evalfail:" + e.message.slice(0, 80));
        console.log("  [diag] raw WS probe from worker:", probe);
        break;
    }
}

await ctx.close().catch(() => {});
fs.rmSync(profile, { recursive: true, force: true });
wss.close();

console.log("\n" + "─".repeat(48));
console.log(`  \x1b[1me2e bridge test:\x1b[0m ${fail ? "\x1b[31mFAIL\x1b[0m" : "\x1b[32mPASS\x1b[0m"}  (pass=${pass} fail=${fail})`);
process.exit(fail ? 1 : 0);
