# Szmelc-RCE — remote backend (`szmelc.com`)

The production control bridge that the extension connects to. Agents drive
connected browsers over plain **HTTP** (or WebSocket) — no SDK, no protocol
library, just `curl`. Zero dependencies beyond [`ws`](https://github.com/websockets/ws);
state is in-memory (single process, no database).

```
extension (Chrome)                      szmelc.com backend                 agent (you)
────────────────────          ───────────────────────────────          ────────────
wss://szmelc.com/chrome/<id> ◄──────────────► presence + routing ◄──────► POST /chrome/<id>/tools
   connect → paired              (this server)             ──────────►   GET /devices
   ping/pong keepalive                                     ◄──────────   ws /agent/<id>
   tool_call → tool_result
```

## Run

```sh
npm install                     # ws
node backend/server.mjs         # listens on :8080 (PORT / HOST to override)
npm run start:backend           # same
node test/backend.test.mjs      # self-test, no browser  (14/14)
node test/e2e-backend.mjs       # real browser ↔ backend ↔ HTTP API (CHROME_PATH if needed)
```

## API

| Method & path | Body | Effect |
|---|---|---|
| `GET /health` | — | liveness |
| `GET /devices` | — | **discovery** — every connected browser across all users (the anonymous extension dials `/chrome/<deviceUuid>`, so agents learn the userId here) |
| `GET /chrome/<userId>/devices` | — | presence for one user |
| `POST /chrome/<userId>/tools` | `{tool, args, tabId?, device_id?, timeoutMs?, session_scope?, permission_mode?}` | execute one tool; HTTP response = the extension's `tool_result` envelope; `404` no browser, `504` timeout |
| `WS /agent/<userId>` | frames below | push-style agent channel |
| `WS /chrome/<userId>` | — | **extensions connect here** |

Agent WS frames (same as the hosted protocol):

```
→ {"type":"tool_call","tool_use_id":"…","tool":"tabs_context_mcp","args":{…}}
→ {"type":"tool_request","method":"execute_tool","params":{"tool":…,"args":…}}   (also accepted)
← {"type":"tool_result","tool_use_id":"…", content|error|result}
→ {"type":"list_devices"}   ← {"type":"devices","devices":[…]}
```

### Example: drive a browser with curl

```sh
# 1. discover connected browsers
curl -s https://szmelc.com/devices | jq
# → {"devices":[{"userId":"63cc…","device_id":"63cc…","extension_version":"1.0.0",…}]}

U=63cc6706-2dac-4f70-a236-5a8c0caf9382

# 2. create the agent's managed tab group, then a tab inside it
curl -s -X POST https://szmelc.com/chrome/$U/tools \
     -H 'Content-Type: application/json' \
     -d '{"tool":"tabs_context_mcp","args":{"createIfEmpty":true}}' | jq

curl -s -X POST https://szmelc.com/chrome/$U/tools \
     -H 'Content-Type: application/json' \
     -d '{"tool":"tabs_create_mcp","args":{"url":"https://example.com"}}' | jq
```

Most tab tools need the group tab id — take `"currentTabId"` / `"tabId"` from
the `tabs_context_mcp` response and pass it as `"tabId"`.

## Configuration (environment)

| Variable | Default | Meaning |
|---|---|---|
| `PORT` / `HOST` | `8080` / `0.0.0.0` | listen address |
| `RCE_API_TOKEN` | *(unset = open)* | required `Authorization: Bearer <token>` for agent HTTP/WS. **Set this on any public host.** |
| `RCE_EXTENSION_TOKENS` | *(unset = accept any)* | comma-separated allowlist of `oauth_token` values extensions must present (matches the extension's anonymous device-uuid mode; issue real tokens for real auth) |
| `RCE_PERMISSIONS` | `auto` | answer for extension `permission_request` frames: `auto` (approve) or `deny` |
| `RCE_TOOL_TIMEOUT_MS` | `120000` | default per-call timeout |

## Deploying on szmelc.com (HTTPS/WSS)

Terminate TLS in front; the server speaks plain HTTP/WS:

**nginx**

```nginx
server {
    listen 443 ssl;
    server_name szmelc.com;
    # ssl_certificate …; ssl_certificate_key …;

    location ~ ^/(chrome|agent)/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 1h;          # WS keepalive
    }
    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

**systemd** (`/etc/systemd/system/szmelc-rce-backend.service`)

```ini
[Unit]
Description=Szmelc-RCE backend
After=network-online.target

[Service]
User=szmelc
WorkingDirectory=/opt/szmelc-rce
Environment=PORT=8080
Environment=RCE_API_TOKEN=change-me
Environment=RCE_PERMISSIONS=deny
ExecStart=/usr/bin/node backend/server.mjs
Restart=always

[Install]
WantedBy=multi-user.target
```

Then in the extension options set **Control bridge (WebSocket)** to
`wss://szmelc.com` — the extension dials `wss://szmelc.com/chrome/<deviceUuid>`
and appears in `GET /devices`.

> Extension note: `connect-src` in the manifest already allows any `wss:` host
> (bare scheme sources), so no manifest edit is needed for your own domain.

## Security notes

- This server gives whoever calls it **full browser control** of every
  connected extension. Set `RCE_API_TOKEN`, keep the port firewalled, and
  prefer `RCE_PERMISSIONS=deny` unless you reviewed the flow.
- In anonymous mode the "identity" is a self-claimed random UUID — it
  authenticates nothing. Set `RCE_EXTENSION_TOKENS` + sign-in for real auth.
- The server holds no state beyond live sockets; restart = clean slate.
