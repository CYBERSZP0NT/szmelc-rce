#!/usr/bin/env node
/**
 * Szmelc-RCE — extension boot smoke test (real browser).
 *
 * Loads the extension into headless-new Chromium and asserts the fork is
 * genuinely functional, not just parseable:
 *   1. the service worker boots and the config module is live
 *      (globalThis.__SZMELC_CFG defaults → wss://szmelc.com)
 *   2. options.html renders the "Szmelc-RCE Configuration" panel with live
 *      default values
 *   3. pairing.html loads (the local-pairing UI)
 *
 * No assertion is made on outbound network (szmelc.com may be absent in CI);
 * network errors are logged, not fatal.
 */
import { chromium } from "playwright-core";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXT_ID = "fcoeoabgfenejglbffodgkkbkcdhcgfn"; // from manifest key
const CANDIDATES = (process.env.CHROME_PATH
    ? [process.env.CHROME_PATH]
    : ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser"]
).filter((p) => p && existsSync(p));

let pass = 0, fail = 0;
const assert = (c, l) => { c ? (pass++, console.log("  \x1b[32m✓\x1b[0m " + l)) : (fail++, console.log("  \x1b[31m✗\x1b[0m " + l)); };

if (!CANDIDATES.length) { console.error("No system Chromium found; set CHROME_PATH"); process.exit(2); }

const profile0 = path.join(os.tmpdir());
let profile = mkdtempSync(path.join(profile0, "szmelc-rce-"));
const consoleErrors = [];
let pageErrors = [];
let netErrors = 0;

const launchArgs = () => [
    `--load-extension=${ROOT}`,
    `--disable-extensions-except=${ROOT}`,
    "--headless=new",
    "--no-first-run", "--no-default-browser-check", "--disable-gpu",
];

// Walk the candidate browsers: a distro's google-chrome can be a broken
// wrapper (missing shared libs); chromium on the same box usually works.
let ctx = null, CHROME = null;
for (const cand of CANDIDATES) {
    console.log("  trying browser:", cand);
    try {
        ctx = await chromium.launchPersistentContext(profile, {
            executablePath: cand,
            headless: true,
            channel: undefined,
            args: launchArgs(),
        });
        CHROME = cand;
        break;
    } catch (e) {
        console.log("  [skip]", (String(e.message).match(/.*(?:error|cannot|failed|spawn).*/i) || [e.message])[0].slice(0, 140));
        rmSync(profile, { recursive: true, force: true });
        profile = mkdtempSync(path.join(profile0, "szmelc-rce-"));
    }
}
if (!ctx) { console.error("No working browser among:", CANDIDATES); process.exit(2); }
console.log("  using browser:", CHROME);
ctx.on("requestfailed", () => netErrors++);

const results = { cfg: null, optionsPanel: false, pairingLoaded: false, swVersion: null };

// ---- 1. service worker + config module ---------------------------------
const sw = await ctx.waitForEvent("serviceworker", { timeout: 15000 }).catch(() => ctx.serviceWorkers()[0] || null);
if (sw) {
    try {
        results.cfg = await sw.evaluate(() => globalThis.__SZMELC_CFG);
        results.swVersion = await sw.evaluate(() => chrome?.runtime?.getManifest?.().version);
        const ver = await sw.evaluate(() => globalThis.SZMELC?.DEFAULTS?.bridgeUrl);
        assert(!!results.cfg && typeof results.cfg.bridgeUrl === "string", "service worker boots + config module live");
        assert(results.cfg?.bridgeUrl === "wss://szmelc.com", `default bridgeUrl = ${results.cfg?.bridgeUrl}`);
        assert(results.cfg?.nativeHosts?.[0] === "com.szmelc.rce_browser", "native host names rebranded");
        assert(ver === "wss://szmelc.com", "SZMELC.DEFAULTS exposed globally");
    } catch (e) {
        assert(false, "SW eval failed: " + e.message);
    }
} else {
    assert(false, "no service worker detected");
}

// ---- 2. options page config panel --------------------------------------
const opt = await ctx.newPage();
opt.on("pageerror", (e) => pageErrors.push(String(e?.message || e)));
opt.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160)); });
await opt.goto(`chrome-extension://${EXT_ID}/options.html`, { waitUntil: "domcontentloaded", timeout: 20000 }).catch(() => {});
await opt.waitForSelector("#szmelc-rce-config-section", { timeout: 15000 }).catch(() => {});
results.optionsPanel = await opt.$("#szmelc-rce-config-section") ? true : false;
assert(results.optionsPanel, "options.html renders Szmelc-RCE Configuration panel");
if (results.optionsPanel) {
    const bridgeVal = await opt.$eval('[data-szconf="bridgeUrl"]', (el) => el.value).catch(() => "");
    assert(bridgeVal === "wss://szmelc.com", `options panel default bridgeUrl = ${JSON.stringify(bridgeVal)}`);
    const titles = await opt.$eval("#szmelc-rce-config-section h2", (el) => el.textContent).catch(() => "");
    assert(/Szmelc-RCE Configuration/.test(titles), "panel title rebranded");
}

// ---- 3. pairing page ----------------------------------------------------
const pair = await ctx.newPage();
await pair.goto(`chrome-extension://${EXT_ID}/pairing.html`, { waitUntil: "domcontentloaded", timeout: 20000 }).catch(() => {});
const pairLoaded = await pair.title().catch(() => "");
results.pairingLoaded = /Connect|Pairing|Szmelc|Browser/i.test(pairLoaded);
assert(results.pairingLoaded, `pairing.html loads (title="${pairLoaded}")`);

// ---- diagnostics --------------------------------------------------------
console.log("\n  [diag] net errors (non-fatal):", netErrors);
if (pageErrors.length) console.log("  [diag] pageerrors:", pageErrors.slice(0, 5));
if (consoleErrors.length) console.log("  [diag] console errors:", consoleErrors.slice(0, 5));

await ctx.close().catch(() => {});
rmSync(profile, { recursive: true, force: true });

console.log("\n" + "─".repeat(48));
console.log(`  \x1b[1mboot smoke test:\x1b[0m ${fail ? "\x1b[31mFAIL\x1b[0m" : "\x1b[32mPASS\x1b[0m"}  (pass=${pass} fail=${fail})`);
console.log(`  cfg=${JSON.stringify(results.cfg ?? null).slice(0, 120)}`);
process.exit(fail ? 1 : 0);
