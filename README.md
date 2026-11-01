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

Tool vocabulary (from the bundled toolset): `left_click`, `double_click`,
`triple_click`, `right_click`, `hover`, `left_click_drag`, `type`, `key`,
`scroll`, `zoom`, `screenshot`, `wait`, `scroll_to`, `form_input`, plus
`browser_batch` (an atomic list of sub-actions) and tab orchestration
(create/close/focus tabs in a managed tab-group).

### Bridge protocol (remote path)

The extension connects and identifies:

```json
{ "type": "connect", "client_type": "chrome-extension",
  "device_id": "...", "display_name": "...", "oauth_token": "<id>" }
```

The bridge answers `{"type":"paired"}` or `{"type":"waiting"}`. Afterwards the
bridge may send JSON tool invocations such as:

```json
{ "method": "execute_tool",
  "params": { "tool": "left_click", "args": { "coordinate": [x, y] }, "tabId": 12 } }
```

The extension replies with `tool_response` frames containing MCP-style
content blocks. Pings (`{"type":"ping"}`) must be answered; sockets without a
pong for ~90 s are dropped and reconnected automatically.

> The protocol is a superset-compatible fork of the original hosted protocol;
> a minimal bridge only needs `connect → paired → execute_tool →
> tool_response`. See `bridge/` (TODO: reference of the full message list is
> in `assets/service-worker.ts-*.js`, search for `case "`).

### Native messaging (local path, self-contained)

The extension talks to native hosts registered as
`com.szmelc.rce_browser` and `com.szmelc.rce_code`
(names editable in the config, options page). A working reference host is in
[`native-host/`](./native-host). Messages are `{"type":"ping"}` /
`{"type":"status_response",...}` / `{"type":"tool_request",...}` envelopes —
any process you write in any language can drive the browser.

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
   | `localBridge` / `localBridgeUrl` | off / `ws://localhost:8765` | Prefer a local bridge |
   | `authorizeUrl` / `tokenUrl` / `revokeUrl` / `oauthClientId` | built-in | Point at your OAuth server |
   | `nativeHosts` | `com.szmelc.rce_browser`, `com.szmelc.rce_code` | Native messaging host names |

   Saving restarts the extension worker so all modules re-read the config.

3. (optional) Grant `nativeMessaging` in options when you want the local
   bridge, and install a host script (see below).

> **Note on `chrome://`/CSP:** `manifest.json` `connect-src` currently allows
> `szmelc.com` + `localhost:8765`. If you self-host the bridge on another
> hostname or port, add it to `content_security_policy` (Chrome requires all
> `connect-src` targets to be declared in the manifest).

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
pack.sh                  pack the folder as a .zip/.crx container
```

## License & provenance

Forked from the "Claude in Chrome" extension (v1.0.104), extracted from its
CRX container, beautified and rebranded to Szmelc-RCE. MIT — see
[LICENSE](./LICENSE) (applies to this fork; the original code is © its
respective owners).
