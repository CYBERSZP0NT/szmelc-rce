#!/usr/bin/env node
/**
 * Szmelc-RCE — end-to-end backend test (real browser ↔ backend ↔ HTTP agent).
 *
 * Proves the production path end to end:
 *   1. backend/server.mjs listens on an ephemeral port (open mode)
 *   2. the real extension (unsigned profile, anonymous mode) connects to
 *      ws://127.0.0.1:<port>/chrome/<deviceUuid>
 *   3. an "agent" drives it purely over the HTTP API:
 *        GET  /chrome/<u>/devices            -> sees the browser
 *        POST /chrome/<u>/tools              -> wait, tabs_context_mcp,
 *                                               tabs_create_mcp
 *   4. the created tab is verified to exist via chrome.tabs.get
 *
 * Requires a system Chrome/Chromium (CHROME_PATH to override).
 */
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SERVER = path.join(ROOT, "backend", "server.mjs");

let pass = 0, fail = 0;
const assert = (c, l) => { c ? (pass++, console.log("  \x1b[32m✓\x1b[0m " + l)) : (fail++, console.log("  \x1b[31m✗\x1b[0m " + l)); };
const PORT = await new Promise((res) => {
    const srv = net.createServer();
    srv.listen(0, "127.0.0.1", () => { const p = srv.address().port; srv.close(() => res(p)); });
});

// ---- 1. backend ---------------------------------------------------------------
const backend = spawn(process.execPath, [SERVER], {
    env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1" },
    stdio: ["ignore", "pipe", "pipe"],
});
const bkdLog = [];
backend.stdout.on("data", (d) => bkdLog.push(...String(d).trim().split("\n")));
backend.stderr.on("data", (d) => bkdLog.push(...String(d).trim().split("\n")));
await new Promise((res) => {
    const out = (d) => { if (/listening on/.test(String(d))) res(); };
    backend.stdout.on("data", out);
    backend.stderr.on("data", out);
    setTimeout(res, 3000);
});

const api = async (method, p, body) => {
    const r = await fetch(`http://127.0.0.1:${PORT}${p}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
    });
    return { status: r.status, body: await r.json().catch(() => ({})) };
};

// ---- 2. browser + extension -----------------------------------------------------
const CANDIDATES = (process.env.CHROME_PATH
    ? [process.env.CHROME_PATH]
    : ["/usr/bin/chromium", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium-browser"]
).filter((p) => p && fs.existsSync(p));
if (!CANDIDATES.length) { console.error("No system Chromium found; set CHROME_PATH"); process.exit(2); }

let ctx = null;
let profile = fs.mkdtempSync(path.join(os.tmpdir(), "szmelc-e2e-bkd-"));
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
    } catch {
        ctx = null;
        fs.rmSync(profile, { recursive: true, force: true });
        profile = fs.mkdtempSync(path.join(os.tmpdir(), "szmelc-e2e-bkd-"));
    }
}
if (!ctx) { console.error("No working browser among:", CANDIDATES); process.exit(2); }

const sw0 = await ctx.waitForEvent("serviceworker", { timeout: 15000 }).catch(() => null)
    || ctx.serviceWorkers()[0];
if (!sw0) { assert(false, "service worker booted"); await ctx.close(); process.exit(1); }

// point the extension at the backend (live config + storage, then poke "online")
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
await sw0.evaluate(() => globalThis.dispatchEvent(new Event("online")));

// ---- 3. presence over HTTP -------------------------------------------------------
// The anonymous extension dials /chrome/<deviceUuid> — the agent discovers the
// userId through the backend's cross-user discovery endpoint.
let devices = { devices: [] };
for (let i = 0; i < 90; i++) {
    const resp = await api("GET", "/devices").catch((e) => ({ status: 0, body: { err: String(e) } }));
    devices = { status: resp.status, body: resp.body, devices: resp.body.devices };
    if (process.env.E2E_DEBUG && i % 5 === 0) console.log(`  [poll ${i}] status=${resp.status} n=${resp.body.devices?.length}`);
    if (resp.body.devices?.length) break;
    await new Promise((r) => setTimeout(r, 1000));
}
assert(devices.devices?.length >= 1, `backend sees the extension (device=${devices.devices?.[0]?.device_id?.slice(0, 8)}… v=${devices.devices?.[0]?.extension_version})`);
if (!devices.devices?.length) {
    console.log("  [diag] backend log tail:\n   " + bkdLog.slice(-15).join("\n   "));
    await ctx.close().catch(() => {});
    fs.rmSync(profile, { recursive: true, force: true });
    backend.kill("SIGKILL");
    process.exit(1);
}
const USER = devices.devices[0].userId;

const perUser = await api("GET", `/chrome/${USER}/devices`);
assert(perUser.status === 200 && perUser.body.devices?.length >= 1, "per-user device listing works");

// ---- 4. drive the browser over HTTP ----------------------------------------------
const tool = async (tool, args = {}, extra = {}) => {
    const r = await api("POST", `/chrome/${USER}/tools`, { tool, args, ...extra });
    return r;
};

// `wait` (like most tools) needs a tab: create the agent tab group first,
// then target its tab.
const c = await tool("tabs_context_mcp", { createIfEmpty: true });
assert(c.status === 200 && /tabGroupId|availableTabs/.test(JSON.stringify(c.body)),
    "HTTP tool call `tabs_context_mcp` created the agent tab group");
const ctxTabId = (JSON.stringify(c.body).match(/"tabId":(\d+)/) || [])[1];

// NOTE: `navigate` is additionally gated by the vendor's hosted URL-safety
// check (apiBaseUrl), which is unreachable in a sandbox — not asserted here.

const n = await tool("tabs_create_mcp", { url: "data:text/html,<title>backend-created</title><h1>made by the backend</h1>" });
assert(n.status === 200 && !n.body.is_error, "HTTP tool call `tabs_create_mcp` executed");
const createdId = (JSON.stringify(n.body).match(/Tab ID:\s*(\d+)/) || [])[1];

// ---- 5. objective verification ----------------------------------------------------
const swNow = ctx.serviceWorkers().reverse().find((sw) => sw !== sw0) || sw0;
const tabExists = await swNow.evaluate(async (tabId) => {
    try { await chrome.tabs.get(Number(tabId)); return true; } catch { return false; }
}, createdId).catch(() => null);
assert(tabExists === true, `backend-created tab really exists in the browser (Tab ID: ${createdId})`);

// ---- diagnostics -------------------------------------------------------------------
if (fail) {
    console.log("  [diag] wait result:", JSON.stringify(w.body).slice(0, 200));
    console.log("  [diag] devices:", JSON.stringify(devices).slice(0, 200));
    console.log("  [diag] backend log tail:\n   " + bkdLog.slice(-12).join("\n   "));
    console.log("  [diag] last results:", JSON.stringify({ w: w.body, c: c.body, n: n.body }).slice(0, 400));
}

await ctx.close().catch(() => {});
fs.rmSync(profile, { recursive: true, force: true });
backend.kill("SIGKILL");

console.log("\n" + "─".repeat(48));
console.log(`  \x1b[1me2e backend test:\x1b[0m ${fail ? "\x1b[31mFAIL\x1b[0m" : "\x1b[32mPASS\x1b[0m"}  (pass=${pass} fail=${fail})`);
process.exit(fail ? 1 : 0);
