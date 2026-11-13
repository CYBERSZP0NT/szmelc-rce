# Szmelc-RCE

**Szmelc-INC Remote Control Extension** — an open-source, self-hostable browser
remote-control extension for Chrome (Manifest V3).

Szmelc-RCE turns your browser into a fully scriptable "dumb terminal": a bridge
server (yours, on your VPS or LAN) receives high-level **tool calls** (click,
type, scroll, screenshot, navigate…), forwards them to this extension, and the
extension executes them locally via the
[Chrome DevTools Protocol](https://developer.chrome.com/docs/devtools/protocol/)
(`chrome.debugger`) and returns results (screenshots, page state, console,
network events) back over the wire.

---

## Architecture

```
                 ┌────────────────────────────────────────────┐
                 │  szmelc-rce (this Chrome extension)        │
                 │                                            │
 bridge WS ◄─────┤  service worker ── tool executor ── CDP    │
 ws://localhost  │      ▲                    (chrome.debugger)│
 native host ◄───┤      │                                     │
 (Desktop/CLI)   │  pairing/crypto  permissions & allowed-domains
                 └────────────────────────────────────────────┘
```

Two independent control planes deliver the same `execute_tool` protocol:

| Path | Transport | Typical consumer |
|------|-----------|------------------|
| **Remote bridge** | `wss://<bridgeUrl>/chrome/<userId>` WebSocket | Any server you host (agent, orchestrator, MCP server) |
| **Local bridge** | `ws://localhost:8765` WebSocket, or **native messaging** hosts (`com.szmelc.rce_browser`, `com.szmelc.rce_code`) | A desktop app / CLI on the same machine |

**No account required.** By default (`bridgeAnonymous` on) the extension
connects to *any* bridge — remote or local — as an anonymous device (device
UUID as userId/token) when you are not signed in. If you sign in (your own
OAuth server or the built-in one), authenticated credentials take precedence.

Tool vocabulary (from the bundled toolset; run `tabs_context_mcp` first to
get a working tab): `navigate`, `computer` (`action: screenshot/click/type/...`),
`left_click`, `double_click`, `right_click`, `hover`, `left_click_drag`,
`type`, `key`, `scroll`, `scroll_to`, `form_input`, `find`, `read_page`,
`get_page_text`, `wait`, plus `browser_batch` (an atomic list of sub-actions)
and tab orchestration (`tabs_context_mcp`, `tabs_create_mcp`, `tabs_select`,
`tabs_close_mcp`).

### Bridge protocol (remote path)

The extension connects and identifies:

```json
{ "type": "connect", "client_type": "chrome-extension",
  "device_id": "...", "display_name": "...", "oauth_token": "<id or device uuid>" }
```

The bridge answers `{"type":"paired"}` or `{"type":"waiting"}`. Afterwards the
bridge sends tool calls — both of these frame styles work:

**Hosted protocol** (what the upstream hosted bridge speaks):

```json
{ "type": "tool_call", "tool_use_id": "<id>", "tool": "left_click",
  "args": { "coordinate": [x, y] }, "tabId": 12, "client_type": "bridge" }
```

**Generic envelope** (the fork additionally accepts this over the socket):

```json
{ "type": "tool_request", "tool_use_id": "<id>", "method": "execute_tool",
  "params": { "tool": "left_click", "args": { "coordinate": [x, y] } } }
```

The extension replies with `{"type":"tool_result","tool_use_id":...}`
frames carrying MCP-style content blocks (`content: [...]` on success,
`error`/`is_error` on failure). Tools that manage tabs need a session context
first: call `tabs_context_mcp` with `{ "createIfEmpty": true }` and reuse the
same `session_scope` (`{sessionId, displayName}`) on subsequent calls. Tools
that need user approval emit `{"type":"permission_request", "request_id", ...}`
frames — answer `{"type":"permission_response","request_id":...,"allowed":true|false}`.
Pings (`{"type":"ping"}`) must be answered with `{"type":"pong"}`; sockets
without a pong for ~90 s are dropped and reconnected automatically.

> A minimal bridge only needs `connect → paired → tool_call → tool_result`.
> `dev/bridge.mjs` is a working reference; `test/e2e-bridge.mjs` exercises the
> full round-trip against a real browser.

### Native messaging (local path, self-contained)

The extension talks to native hosts registered as
`com.szmelc.rce_browser` and `com.szmelc.rce_code`
(names editable in the config, options page). A working reference host is in
[`native-host/`](./native-host). Messages are `{"type":"ping"}` /
`{"type":"status_response",...}` / `{"type":"tool_request",...}` envelopes —
any process you write in any language can drive the browser.

The reference host can also **expose a WebSocket drive port** so anything that
speaks HTTP upgrade can control the browser through it:

```sh
RCE_HOST_SERVE=ws://127.0.0.1:8766 python3 rce_host.py
# any WS client: {"method":"execute_tool","params":{"tool":"screenshot",...}}
#              -> tool_response envelope correlated by tool_use_id
```
(optional `websockets` pip package; see `test/nativehost.test.mjs` for the
exact round-trip)

---

## Installation (dev / self-hosted)

1. `chrome://extensions` → enable **Developer mode** → **Load unpacked** →
   select this folder.
2. Open **options** (right-click toolbar icon → options). The
   **"Szmelc-RCE Configuration"** section lets you change *every* endpoint at
   runtime (saved to `chrome.storage.local`):

   | Field | Default | Meaning |
   |-------|---------|---------|
   | `webUrl` | `https://szmelc.com` | Bootstrap API, OAuth pages, embedded web app |
   | `apiBaseUrl` | `https://szmelc.com` | REST API base (MCP client, event logging) |
   | `wsApiBaseUrl` | `wss://szmelc.com` | WebSocket API base |
   | `bridgeUrl` | `wss://szmelc.com` | **The remote-control bridge you host** |
   | `bridgeAnonymous` | on | Connect signed-out as an anonymous device (no OAuth needed) |
   | `localBridge` / `localBridgeUrl` | off / `ws://localhost:8765` | Prefer a local bridge |
   | `authorizeUrl` / `tokenUrl` / `revokeUrl` / `oauthClientId` | built-in | Point at your OAuth server |
   | `nativeHosts` | `com.szmelc.rce_browser`, `com.szmelc.rce_code` | Native messaging host names |

   Saving restarts the extension worker so all modules re-read the config.

3. (optional) Grant `nativeMessaging` in options when you want the local
   bridge, and install a host script (see below).

> **Note on CSP:** `manifest.json` `connect-src` allows the bare schemes
> `https: http: wss: ws:` — so **any** bridge/API host works with no manifest
> edits (note: scheme sources, not `host://*` wildcards — Chrome's extension
> service worker does not honour `ws://*`-style wildcards, but it does honour
> bare scheme sources). Scripts are still locked to `'self'`; only outbound
> connections are open, because every endpoint is user-configured.

## Build, test & CRX

All from the repo root:

```sh
npm install
npm run check      # syntax-check every JS file (ESM)
npm run validate   # manifest refs, asset graph, fonts, CSP, native host, secrets
npm run build      # validate → dist/szmelc-rce/ + dist/szmelc-rce.zip
npm run crx        # → dist/szmelc-rce.crx (real CRX3, self-verified)
node test/bridge.test.mjs     # bridge protocol self-test (no browser)
node test/nativehost.test.mjs # native-messaging host self-test (no browser)
node test/smoke.mjs           # Playwright boot test in system Chrome (CHROME_PATH=… to override)
node test/e2e-bridge.mjs      # real browser ↔ local bridge: anonymous connect + real tools
npm run test:all
npm run start:bridge  # reference self-hosted WS bridge on :8080 (RCE_BRIDGE_PORT=…)
```

Install, three ways:

- **Unpacked (dev):** `chrome://extensions` → Developer mode → *Load unpacked*
  → `dist/szmelc-rce` (or the repo root — identical code, no build needed).
- **CRX:** drag `dist/szmelc-rce.crx` into `chrome://extensions` (Developer
  mode).
- **Zip:** `./pack.sh my-szmelc-rce.zip` and side-load / share.

### CRX signing & the extension id

`npm run crx` signs with (first match wins): `--key k.pem` → `$CRX_KEY` →
`./key.pem` → `./key.local.crx.pem` (auto-generated on first run, kept on disk
so repeat builds keep a **stable id**).

> **Keys never leave your machine.** Signing keys are git-ignored
> (`.gitignore` `*.pem`) and `npm run build` refuses to ship any `*.pem` /
> `.crx` inside `dist/`. The historically committed `key.local.crx.pem` was
> **rotated on 2026-11-13** (leaked key deleted, fresh key generated — see
> [SECURITY.md](./SECURITY.md)); CRX installs now resolve to the extension id
> `aikmpdfmhcddahdfoeiooaihhdcfmjak`. On old clones run
> `git rm --cached key.local.crx.pem` if still tracked — `npm run validate`
> fails while a key file is tracked.

- Chrome derives the CRX id from the manifest `key` field. If that key
  doesn't match your signing key, the packer builds the CRX from a temp copy
  with the matching key (unpacked `dist/` is left untouched, keeping the
  manifest's original id `fcoeoabgfenejglbffodgkkbkcdhcgfn`).
- The upstream-pinned id is referenced by `native-host/manifest.json`
  (`allowed_origins`) and the OAuth redirect URI. To use the original id in a
  CRX too, you'd need the *private* key that matches the manifest `key` —
  otherwise accept the new id and update `native-host/manifest.json` to match.

The packer's output is verified against Chromium's
[`crx_file_format.proto`](https://source.chromium.org/chromium/chromium/src/+/main:extensions/common/crx_file_format.proto) —
self-check plus `crx3-verify` (from `crx3-utils`) both pass.

### Native host (Linux example)

```sh
cp native-host/manifest.json ~/.config/google-chrome/NativeMessagingHosts/
cp native-host/rce_host.py  ~/.local/state/rce/
python3 native-host/install.sh   # adjusts paths, registers the host
```

The host needs its name in the extension's `nativeHosts` list (default
`com.szmelc.rce_browser`) and the `nativeMessaging` permission granted.

---

## Rebranding notes (fork → Szmelc-RCE)

Everything the original vendor shipped that was hardwired is now either
config-driven or renamed:

- `api.anthropic.com` / `wss://...` → **`https://szmelc.com`, `wss://szmelc.com`** (configurable)
- hosted bridge `wss://bridge.*` → **your `bridgeUrl`** (configurable)
- OAuth endpoints / client → configurable
- native host names, `User-Agent`/`x-client-*` headers, event prefixes,
  storage keys, i18n strings, page titles, fonts → `szmelc*` / `agent*`
  (`Anthropic→Szmelc-INC`, `Claude→Agent`)
- Google store `update_url` and the uninstall survey URL removed

Remaining vendor-hosted strings (third-party MCP endpoints like
`*.googleapis.com`, library doc URLs in comments) are inert.

## Project layout

```
manifest.json            MV3 manifest (CSP, permissions, content scripts)
service-worker-loader.js imports the config module, then the worker
assets/
  szmelc-config.js       ★ central config module (all endpoints)
  szmelc-options-config.js  options-page configuration UI
  service-worker.ts-*.js    bridge WS + pairing/crypto + native messaging
  mcpPermissions-*.js       CDP client + toolset + permissions (big)
  SavedPromptsService-*.js  core: auth, bootstrap API, tool dispatch
  sidepanel-*.js            embedded web-app UI (React bundle)
  content-script / accessibility-tree / cursor-motion / agent-visual-indicator
native-host/             reference native messaging host (Python, no deps)
scripts/syntax-check.cjs ESM syntax check for every .js (npm run check)
scripts/validate.mjs     manifest/graph/font/CSP/native-host validator
scripts/build.mjs        validate → dist/ + zip
scripts/crx3.mjs         CRX3 packer (self-verified, key management)
dev/bridge.mjs           reference self-hosted WS bridge (demo scenario)
test/                    bridge protocol test, native-host test, Playwright smoke test
pack.sh                  pack dist/ as a .zip
```

## License & provenance

Forked from the "Claude in Chrome" extension (v1.0.104), extracted from its
CRX container, beautified and rebranded to Szmelc-RCE. MIT — see
[LICENSE](./LICENSE) (applies to this fork; the original code is © its
respective owners).

Third-party code bundled in `assets/`:

- `gif.js` / `gif.worker.js` — [gif.js](https://github.com/jnordberg/gif.js)
  by Johan Nordberg, **MIT License** (GIF encoding in the offscreen document).
- The remaining `assets/*.js` are the upstream extension's own bundled build
  output (React, Shiki, mermaid, etc. — each under its own upstream license),
  carried over verbatim with this fork's config/branding patches.
