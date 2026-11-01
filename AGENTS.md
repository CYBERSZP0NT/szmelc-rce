# AGENTS.md — Szmelc-RCE (working briefing)

> Read this first. It is the complete state of the project + exactly where we stopped.
> No external history needed.

## 1. What this is

**Szmelc-RCE** ("Szmelc-INC Remote Control Extension") — a fork of the commercial
**"Claude in Chrome" extension (v1.0.104, CRX v3)** extracted from a `.crx` container,
beautifully reformatted, rebranded (anthropic → `Szmelc-INC`/`szmelc-inc`,
claude → `Agent`/`agent`), de-hardwired (all endpoints behind a runtime config module),
and currently being turned into a **fully functional, buildable, testable, self-hostable,
open-source extension**. The user's VPS is **`https://szmelc.com`** (the default for
all endpoints). Goal: "integrable with anything locally, fully local & self-hosted".

The user explicitly wanted: beautified source → backup → rebrand → config-driven
endpoints in options.html → open-source kit. That is ALL DONE and verified.
The current task ("make it fully functional and buildable") is ~90% done; see §5.

## 2. Directory layout

```
/home/silverx/Projects-5/LLM/EXTENSIONS/
├── fcoeoabgfenejglbffodgkkbkcdhcgfn_1.ca0fff…bb69a    # original CRX (Claude in Chrome 1.0.104)
├── claude-chrome-extension/                           # PRISTINE original extract (minified, untouched)
├── backup/
│   ├── szmelc-rce-prepared-20261101.tar.gz           # beautified, before any mutations
│   └── szmelc-rce-final-20261101.tar.gz              # final rebranded state (pre-toolchain)
└── szmelc-rce/                                        # ★ THE PROJECT (git repo, 2 commits each)
    ├── manifest.json          MV3, name "Szmelc-RCE" v1.0.0, key kept (see §9), CSP cleaned
    ├── service-worker-loader.js   imports ./assets/szmelc-config.js THEN the worker
    ├── options.html               has Szmelc-RCE config panel injected (assets/szmelc-options-config.js)
    ├── assets/                    400+ beautified files (Vite production bundles, hashed names)
    ├── i18n/ sounds/ public/      (public/ contains only offscreen.html)
    ├── native-host/               reference native-messaging host: rce_host.py (py3, stdio framing),
    │                              manifest.json (com.szmelc.rce_browser), install.sh
    ├── scripts/syntax-check.js    (CJS!) syntax-checks all .js as ESM   → 374/374 pass
    ├── scripts/validate.mjs       manifest+graph+fonts+CSP+nativehost   → PASS (0 err, 0 warn)
    ├── scripts/build.mjs          validate → dist/szmelc-rce/ + dist/szmelc-rce.zip → works
    ├── dev/bridge.mjs             reference self-hosted WS bridge (env RCE_BRIDGE_PORT, def 8080)
    ├── test/bridge.test.mjs       bridge protocol self-test   → 1 assertion failing (see §5)
    ├── test/smoke.mjs             Playwright boot test in real Chrome → NOT RUN YET
    ├── README.md LICENSE package.json package-lock.json .gitignore pack.sh
    ├── dev/shots/                 demo bridge saves screenshots here
```

### Key bundles (beautified; line counts)
| File | Role |
|---|---|
| `assets/service-worker.ts-DAVE5h6d.js` (~4.2k) | bridge WS connect/reconnect, pairing crypto (ECDH P-256, sealed AES channel "szmelc-local-pairing/v1"), native messaging, message routing, **SZMELC_CONFIG_APPLIED reload listener** |
| `assets/mcpPermissions-DIAg91MW.js` (~31k) | **CDP client** (chrome.debugger attach/sendCommand, focus emulation, JS-dialog handling), toolset executors (left_click, type, screenshot, browser_batch…), permission/allowed-domain gating, bundled API client SDK |
| `assets/SavedPromptsService-CxvgAL-B.js` (~10.8k, prettier) | core: **config builder `L()`/`d()`**, OAuth client, bootstrap API, event logging, tool dispatch |
| `assets/sidepanel-B4nnM6E4.js` (~92.6k, prettier) | embedded web-app React UI |

## 3. How the extension works (boiled down)

- The LLM runs **server-side (your VPS / any MCP/agent you connect)**. The browser is a
  "dumb terminal": it receives `execute_tool` JSON (click/type/scroll/screenshot/…) over
  one of 3 control planes and executes via **CDP (`chrome.debugger`) on per-tab attach**.
- **Remote path**: SW opens `wss://<bridgeUrl>/chrome/<userId>`, sends
  `{type:"connect", client_type:"chrome-extension", device_id, oauth_token…}`, bridge
  answers `"paired"`/`"waiting"`, then `tool_request`/`tool_response` (MCP-style
  `result.content`), ping/pong keepalive (pong timeout ~90s → reconnect).
- **Local path**: native messaging hosts `com.szmelc.rce_browser` /
  `com.szmelc.rce_code` (or a local WS `ws://localhost:8765` when "local bridge" is on).
- **claude.ai→szmelc.com iframe bridge**: side panel embeds the web app; tool calls via
  `chrome.runtime.sendMessage` (`CIC_IFRAME_TOOL_CALL`-style) — same executor.
- Permission layer gates per-action by host (allowed_domains/once-approved/denied).

## 4. The config system (the de-hardwiring)

`assets/szmelc-config.js` (loaded FIRST by the SW and injected in `<head>` of every page
before the original module scripts):

- `globalThis.__SZMELC_CFG` — synchronous merged config (defaults + persisted).
- `globalThis.__SZMELC_DEFAULTS`, `globalThis.SZMELC` (manager: `init/applySync/save/reset`,
  storage key `"szmelcRceConfig"` in `storage.local` + `storage.session` mirror).
- Defaults: `webUrl/apiBaseUrl = https://szmelc.com`, `wsApiBaseUrl = wss://szmelc.com`,
  `bridgeUrl = wss://szmelc.com`, `localBridge = false`, `localBridgeUrl = ws://localhost:8765`,
  `authorizeUrl/tokenUrl/revokeUrl/oauthClientId = ""` (empty → built-in upstream values),
  `nativeHosts = [com.szmelc.rce_browser, com.szmelc.rce_code]`.

**Every formerly-hardwired call site reads it**, all tagged with a
`// Szmelc-RCE:` comment (grep for it):
- `SavedPromptsService` `d()` builder → `L()` returns config-driven `apiBaseUrl`,
  `wsApiBaseUrl`, `webUrl`, `bridgeUrl`, `bridgeLocalUrl`, `localBridge`, merged OAuth.
- SW bridge endpoint selection (`rn()`), local-bridge gating (`an()`), reconnect delay.
- `mcpPermissions`: page origin + voice WS (`ld()`), URL-safety check host, API-SDK
  `baseURL` default, `customBaseURL` comparison; `sidepanel` `uy()`.
- SW native-host list from config; SW reloads itself on `"SZMELC_CONFIG_APPLIED"` message.

**options.html UI**: `assets/szmelc-options-config.js` prepends a
`#szmelc-rce-config-section` panel (all fields + `localBridge` checkbox + nativeHosts
textarea + Save/Reset/JSON buttons). Save → `storage.local` → SW auto-reloads.

## 5. EXACT STATE AT STOP (pick up here)

Task: "make it into a fully functional (and buildable) extension". Done so far & verified:
✅ `npm install` (devDeps: `ws`, `playwright-core`; `node_modules` present)
✅ `node scripts/validate.mjs` → **PASS** (manifest 9 file-refs; **990 asset refs** resolve;
   26 woff2 fonts; CSP clean; native-host files)
✅ `node scripts/build.mjs` → dist/szmelc-rce/ + dist/szmelc-rce.zip built
✅ `dev/bridge.mjs` manually verified E2E (log shows `saved screenshot -> dev/shots/…`)
❌ **`test/bridge.test.mjs` — 1 failing assertion, fix precisely known:**
   The `checkScreenshot()` fn has a race: it snapshots dir listings (`snap`) *after* the
   bridge already wrote the file, so the new-file diff is always empty. **Fix**: delete the
   `snap` logic; SHOTS dir is `rm -rf`'d at test start and only the bridge writes there, so
   just poll `fs.readdirSync(SHOTS).length >= 1` for ~2s. Replace with:
   ```js
   function checkScreenshot() {
       assert(gotPaired, "connect -> paired");
       assert(gotPong, "ping -> pong");
       assert(gotToolReq?.method === "execute_tool", "bridge -> execute_tool (tool_request)");
       const poll = (tries) => {
           const now = fs.existsSync(SHOTS) ? fs.readdirSync(SHOTS) : [];
           if (now.length >= 1) { assert(true, `screenshot persisted (${now.join(",")})`); return finish(); }
           if (tries <= 0) { assert(false, "screenshot persisted (dir empty)"); return finish(); }
           setTimeout(() => poll(tries - 1), 200);
       };
       setTimeout(() => poll(10), 150);
   }
   ```
   (Also: `let gotPaired… snap` → drop `snap`.) Test file also has debug blines logging —
   fine to keep or trim, up to you.
❌ **`test/smoke.mjs` (Playwright) — never executed.** Loads ext with real Chrome
   (`--load-extension` + `--headless=new`), asserts: SW boots, `__SZMELC_CFG.bridgeUrl ===
   "wss://szmelc.com"`, options panel renders with defaults, pairing.html loads. Run it,
   debug if any of the three fails; env has `/usr/bin/google-chrome`, `DISPLAY=:1`, no xvfb
   (system Chrome handles headless itself).
⚠️ **Latent bug**: `package.json` now has `"type": "module"` but
   `scripts/syntax-check.js` is **CJS (`require`)** → `npm run check` will crash.
   Fix: rename to `syntax-check.cjs` (update package.json script) or convert to ESM.
⚠️ **Uncommitted work**: git has 2 commits only; `M manifest.json M package.json` plus
   untracked `dev/ test/ scripts/build.mjs scripts/validate.mjs package-lock.json`.
   Commit everything once tests are green.

### Next steps, in order
1. Fix `test/bridge.test.mjs` as above → `node test/bridge.test.mjs` green.
2. Fix syntax-check .cjs/module issue → `npm run check` and validate both green.
3. `node test/smoke.mjs` → make green (likely small issues; read `[diag]` output it prints).
4. `npm run test:all`.
5. git add + commit ("toolchain: validate/build/bridge + tests").
6. Refresh `backup/` tarball of final state.
7. Optional polish (user-visible): `icon-128.png` still the Claude logo (make a Szmelc
   mark if desired); `dev/bridge.mjs` SCENARIO tool name `"tab_new"` is a GUESS — the real
   tool registry names live in `mcpPermissions` (grep `"tab_` / the `Ae` allow-set /
   `Vt`/`Wc` arrays: known real names: left_click, right_click, double_click, triple_click,
   middle_click, type, key, wait, scroll, hover, left_click_drag, zoom, scroll_to,
   form_input, screenshot, browser_batch). Verify before claiming E2E demo works.
8. Bigger open item for the user: wire their own MCP server / agent to the bridge
   protocol, or via native host (`native-host/rce_host.py` `handle_execute_tool()` is the
   integration point). Also `oauth_callback.html` is referenced by the upstream OAuth
   default but is **absent from the upstream extract too** — leave as-is (upstream state).

## 6. Commands (all from `szmelc-rce/`)

```sh
npm run check          # syntax-check all .js as ESM (broken until §5 fix applied)
node scripts/validate.mjs
node scripts/build.mjs # → dist/szmelc-rce/ + dist/szmelc-rce.zip
npm run start:bridge   # reference self-hosted bridge on :8080 (RCE_BRIDGE_PORT=…)
node test/bridge.test.mjs
node test/smoke.mjs    # CHROME_PATH override if needed
npm run test:all
```
Install the extension: `chrome://extensions` → Developer mode → Load unpacked →
`dist/szmelc-rce` (or the project root — the build is just validate+assemble; code is
the same). Options page → "Szmelc-RCE Configuration" to change endpoints at runtime.

## 7. Gotchas (learned the hard way)

1. **js-beautify mangles nested template literals** in two bundles
   (`sidepanel-B4nnM6E4.js`, `SavedPromptsService-CxvgAL-B.js`) — those two were redone
   with `prettier --parser babel`. If you ever re-beautify, use prettier for them.
2. Node syntax-check ESM **only via stdin**: `node --input-type=module --check < f.js`
   (`--input-type=module` with a file arg throws).
3. Mass text replacement created **illegal identifiers** (`szmelc-inc` in code → fixed to
   `szmelc_inc`/`SzmelcINC` in identifier contexts). After ANY find/replace: run
   `node scripts/syntax-check.js` (374/374 expected).
4. Two "unresolved refs" are false positives and already special-cased in validator:
   `mcpPermissions` `new URL("/api/web/url_hash_check/browser_extension", base)` and
   `sidepanel` `new URL(chrome.runtime.getURL("/_favicon/"))`.
5. **Chrome requires new `connect-src` hosts in the manifest CSP** (static per-extension;
   a runtime-changed endpoint on a brand-new host/port needs a manifest edit + reload).
   Currently allowed: self, `https://szmelc.com`, `wss://szmelc.com`,
   `wss://szmelc-staging.com`, `ws://127.0.0.1:8765`, `ws://localhost:8765`.
6. `pkill -f bridge.mjs` in the same shell command as a running test can SIGTERM the
   pipeline (exit 143) — separate the calls; the test uses port `9000 + (pid % 500)`
   precisely to avoid EADDRINUSE.
7. Config `applySync` writes `storage.session` best-effort; `init()` reads session
   (sync) then local (async). SW self-reloads on config save to be safe.
8. Extension **ID is pinned to `fcoeoabgfenejglbffodgkkbkcdhcgfn`** (from the kept manifest
   `key` — do not delete it). Needed by:
   OAuth `REDIRECT_URI = chrome-extension://<id>/oauth_callback.html` and
   `native-host/manifest.json` `allowed_origins` (+ `native-host/install.sh`).

## 8. Environment facts

- Node **v22.23.3**, npm 12.2.0, registry reachable, **DISPLAY=:1**, no xvfb.
- Browsers: `/usr/bin/google-chrome`, `/usr/bin/chromium` (153.0.8010.52, Arch).
  Playwright cache exists (`~/.cache/ms-playwright`) but smoke test deliberately uses
  system Chrome (`--load-extension` needs the full browser, not headless_shell).
- Python 3.14.7 (for `python3 -m zipfile` in build.mjs and the native host).
- User's VPS: **https://szmelc.com** (make it the default everywhere).

## 9. Rebrand map (what was substituted)

- names/strings: `Anthropic→Szmelc-INC`, `anthropic→szmelc-inc` (identifiers:
  `szmelc_inc`/`SzmelcINC`), `Claude→Agent`, `claude→agent`, `CLAUDE→AGENT`,
  `ANTHROPIC_*→SZMELC_*` (env vars), event prefix `claude_chrome→szmelc_rce`.
- hosts: `claude.ai→szmelc.com`, `api.anthropic.com→szmelc.com`,
  `platform.claude.com→szmelc.com`, `clau.de→szmelc.com`,
  `wss://bridge.claudeusercontent.com→wss://szmelc.com`,
  `bridge-staging→wss://szmelc-staging.com`, `preview.claude.ai→preview.szmelc.com`.
- protocol: `claude-local-pairing/v1→szmelc-local-pairing/v1`.
- native hosts: `com.anthropic.claude_browser_extension→com.szmelc.rce_browser`,
  `com.anthropic.claude_code_browser_extension→com.szmelc.rce_code`.
- fonts: `Anthropic{Sans,Mono,Serif}*.woff2→Szmelc*.woff2`, `anthropicons→szmelcicons`
  (files renamed, @font-face refs updated, KaTeX fonts untouched).
- removed: store `update_url`, uninstall-survey URL (docs.google.com form), Sentry/Datadog
  CSP entries, `git-hash.txt`. `claude_icon.svg→agent_icon.svg`.
- ZERO `anthropic|claude` occurrences remain in any text file (validated by grep).
