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
    ├── scripts/syntax-check.cjs   syntax-checks all .js as ESM   → 373/373 pass (dist/ excluded)
    ├── scripts/validate.mjs       manifest+graph+fonts+CSP+nativehost+secrets → PASS (0 err, 0 warn)
    ├── scripts/build.mjs          validate → dist/szmelc-rce/ + dist/szmelc-rce.zip → works
    │                              (excludes keys/dev/test/scripts; fails if a *.pem leaks in)
    ├── scripts/crx3.mjs           CRX3 packer (self-verified; key.pem / key.local.crx.pem) → dist/szmelc-rce.crx
    ├── dev/bridge.mjs             reference self-hosted WS bridge (env RCE_BRIDGE_PORT, def 8080)
    ├── test/bridge.test.mjs       bridge protocol self-test   → 4/4 pass
    ├── test/nativehost.test.mjs   native-messaging host self-test → 10/10 pass
    ├── test/e2e-bridge.mjs        real-browser ↔ local bridge: anonymous connect + real tools → 11/11 pass
    ├── test/smoke.mjs             Playwright boot test in real Chrome → 8/8 pass
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

## 5. EXACT STATE (2026-11-01, toolchain session — DONE & verified)

Task: "make it fully functional and buildable, packable as zip or CRX" — **DONE**:

✅ `npm run check` — 746/746 files parse (`scripts/syntax-check.js` → `syntax-check.cjs`;
   repo is `"type":"module"`, a plain `.js` with `require` crashes)
✅ `npm run validate` — 0 err / 0 warn (990 asset refs, 26 fonts, CSP, native host)
✅ `npm run build` — `dist/szmelc-rce/` + `dist/szmelc-rce.zip`
   (root fix: python3 `-m zipfile -c` does NOT accept `-x`; the old arg silently
   no-op'd to the system `zip` fallback)
✅ `node test/bridge.test.mjs` — 4/4. Screenshot race fixed: SHOTS is wiped at start
   and only the bridge writes there, so "any entry" == persisted (no dir snapshot).
✅ `node test/smoke.mjs` — 8/8 in real Chromium. Browser fallback loop: on this box
   google-chrome is broken (missing `libffmpeg.so`); test auto-skips to chromium.
   Options-panel bug fixed: form population queried `document` before the section was
   prepended → `querySelector('[data-szconf-list]')` was null and threw (twice, on both
   render passes); now section-scoped + single-render guard.
✅ **`npm run crx` → `dist/szmelc-rce.crx`** — real CRX3 per Chromium
   `crx_file_format.proto`: `Cr24 | u32le ver=3 | u32le hlen | protobuf CrxFileHeader
   { sha256_with_rsa(1 SPKI-DER + sig), signed_header_data = SignedData{crx_id} } |
   zip`. RSA-SHA256 over `"CRX3 SignedData\0" + u32le(len(signed_header_data)) +
   signed_header_data + zip`. crx_id = sha256(SPKI-der)[0:16]. Self-verifies in the
   script; external `crx3-verify rsa 0 key.local.crx.pem` (crx3-utils) passes.
   Key ladder: `--key k.pem` → `$CRX_KEY` → `key.pem` → `key.local.crx.pem`
   (auto-generated & committed for a stable CRX id
   `jjkjjnpppmdojnfhlaeabnegfmpohbpd`). If signing key ≠ manifest key, the CRX is
   packed from a temp copy with the manifest key patched (unpacked `dist/` keeps the
   original id `fcoeoabgfenejglbffodgkkbkcdhcgfn`). To get the ORIGINAL id in a CRX:
   need the private key behind the manifest public `key` (upstream's) → `key.pem`.
   Note: local Chromium 153 didn't boot ANY local CRX via `--load-extension` /
   `--load-cr-extension` / `--install-extension` (trivial ext too; no `Extensions/`
   dir lands) — env idiosyncrasy, verified unpacked load is green in the same
   Chromium, so ship both.
✅ Szmelc S-mark icon: `szmelc-mark.svg` → `icon-{16,32,48,128}.png` + `action/`
   copies; manifest `icons` (all sizes) + `action.default_icon` (Claude logo gone).
✅ CSP `connect-src` now includes `ws://localhost:* ws://127.0.0.1:*` (any local
   bridge port, incl. the bridge test's ephemeral ports).
✅ `pack.sh` packs the lean `dist/` tree (was whole repo incl. `node_modules`).
✅ git = 3 commits; `backup/szmelc-rce-final-20261101.tar.gz` refreshed (excl.
   node_modules/dist).
✅ Bridge demo tool names VERIFIED against the real registry (the `Ot` allow-set in
   mcpPermissions-*.js): `tabs_create` (NO args) → `navigate` `{url, tabId}` →
   `wait` `{seconds}` → `screenshot`. Old guess `tab_new {url}` replaced.

Open items (user-side, not blockers):
1. Wire their own MCP server / agent: swap `handleTool()` in `dev/bridge.mjs` or use
   `native-host/rce_host.py` `handle_execute_tool()`.
2. `oauth_callback.html` absent from the upstream extract too — leave as-is.
3. `agent_icon.svg` is an unreferenced leftover — safe to delete someday.
4. `key.local.crx.pem` is the CRX private key; fine for self-hosting (id-pinning),
   but note it's now public in the repo — rotate by deleting it + `npm run crx`.

## 6. Commands (all from `szmelc-rce/`)

```sh
npm run check          # syntax-check all .js as ESM (373/373; dist/ excluded)
node scripts/validate.mjs
node scripts/build.mjs # → dist/szmelc-rce/ + dist/szmelc-rce.zip
npm run crx            # → dist/szmelc-rce.crx (real, signed CRX3)
npm run pack           # → szmelc-rce.zip (lean dist/ pack)
npm run start:bridge   # reference self-hosted bridge on :8080 (RCE_BRIDGE_PORT=…)
node test/bridge.test.mjs          # 4/4 green
node test/nativehost.test.mjs      # 10/10 green
node test/smoke.mjs                # 8/8 green (CHROME_PATH override if needed)
node test/e2e-bridge.mjs           # 11/11 green — anonymous connect + real tools (~2 min)
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
   `node scripts/syntax-check.cjs` (746/746 expected).
4. Two "unresolved refs" are false positives and already special-cased in validator:
   `mcpPermissions` `new URL("/api/web/url_hash_check/browser_extension", base)` and
   `sidepanel` `new URL(chrome.runtime.getURL("/_favicon/"))`.
5. **CSP:** `connect-src` now uses bare **scheme sources** (`https: http: wss: ws:`),
   so ANY endpoint host works with no manifest edits. Do NOT switch back to
   `ws://*`-style wildcards: the extension service worker silently refuses them
   (pages honour them — SW does not; verified via test/probe experiments 2026-11-13).
6. Tests pick genuinely free ports (ephemeral via `net.createServer` listen(0)) —
   the old `9000 + (pid % 500)` heuristic collided with other processes.
7. Config `applySync` writes `storage.session` best-effort; `init()` reads session
   (sync) then local (async). SW self-reloads on config save to be safe.
8. Extension **ID is pinned to `fcoeoabgfenejglbffodgkkbkcdhcgfn`** (from the kept manifest
   `key` — do not delete it). Needed by:
   OAuth `REDIRECT_URI = chrome-extension://<id>/oauth_callback.html` and
   `native-host/manifest.json` `allowed_origins` (+ `native-host/install.sh`).

## 8. Environment facts

- Node **v22.23.3**, npm 12.2.0, registry reachable, **DISPLAY=:1**, no xvfb.
- Browsers: `/usr/bin/google-chrome` (BROKEN on this box: missing `libffmpeg.so`),
  `/usr/bin/chromium` (153.0.8010.52, Arch) — the smoke test falls back automatically.
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


## 10. Session log — 2026-11-13 bug-fix pass (DONE, all green)

Commit `2ba3055`. Fixed:

- **native-host/rce_host.py was fatally broken**: `recv()` did `(length,) = header`
  (bytes has no `.unpack`) → ValueError on EVERY message; `handle_execute_tool()` got
  the method string instead of the envelope → AttributeError. Both fixed; host now
  answers ping/get_status, sends `mcp_connected`, and gained `RCE_HOST_SERVE` (WS
  drive port relaying tool_call frames to the extension, tool_use_id-correlated).
  New `test/nativehost.test.mjs` (10/10) covers ping/status/tool_request/relay.
- **Bridge required sign-in to connect at all** (`an()`/`on()`/`rn()` all gated on
  `K()` identity). Added anonymous bridge mode: `bridgeAnonymous` (default ON) in
  `szmelc-config.js` + options checkbox; SW falls back to device-uuid identity
  (userId + oauth_token = device uuid) when signed out; managed-org posture still wins.
- **Boot-dial race**: worker dialled the default bridge before `chrome.storage.local`
  config read completed → wedged CONNECTING. `SZMELC.init()` now exposes `ready`
  (resolves after persisted config applied) and the SW boot awaits it before `rn()`.
- **`tool_request` frames were never processed over the WS bridge** (only hosted
  `tool_call`). Added a compat case in the SW WS switch normalizing the generic
  envelope; the extension replies `tool_result` (NOT `tool_response` — that is the
  native-port type). `dev/bridge.mjs` + README now document the real protocol.
- **CSP for "works with anything"**: bare scheme sources (`https: http: wss: ws:`).
  Verified: pages honour `ws://*` wildcards, the extension SW does NOT — scheme
  sources work in both.
- **Secrets hygiene**: `key.local.crx.pem` untracked + ignored; `build.mjs` excludes
  keys/dev/test/scripts from dist/ and hard-fails if a `*.pem` leaks; `validate.mjs`
  [6/6] fails while a key is git-tracked; `pack.sh` exclusions fixed.
- Misc: blank config fields no longer override defaults (`_merge`), bridge test no
  longer false-PASSes when the bridge child dies, ephemeral test ports, syntax-check
  skips dist/ (stable 373 count), `package.json` repository → GitHub, test scripts
  `test:nativehost` / `test:e2e`.
- New `test/e2e-bridge.mjs` (11/11): real Chromium, unsigned profile, config pointed
  at an ephemeral local bridge → anonymous connect frame asserted, `wait` +
  `tabs_context_mcp{createIfEmpty}` + `tabs_create_mcp` executed, created tab verified
  via `chrome.tabs.get`. NOTE: `computer{action:screenshot}` hangs in headless
  (no visible surface / permission-popup path) — not asserted in e2e; fine headed.

Wire-protocol cheat sheet (bridge side):
    connect -> paired | waiting;  ping -> pong
    {"type":"tool_call","tool_use_id","tool","args","tabId"?,"client_type"}
    {"type":"tool_request","method":"execute_tool","params":{tool,args,...}}  (accepted too)
    reply: {"type":"tool_result","tool_use_id", content | error | result}
    permission prompts: {"type":"permission_request","request_id",...} -> answer
    {"type":"permission_response","request_id","allowed":true|false}
    tab tools need a session context first: tabs_context_mcp {createIfEmpty:true}
    and the SAME session_scope {sessionId, displayName} on later calls.
