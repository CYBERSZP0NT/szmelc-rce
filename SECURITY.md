# Security Policy

## Reporting a vulnerability

Szmelc-RCE is a browser remote-control extension: a successful attacker can
read pages, click, type, and exfiltrate data. Please report vulnerabilities
privately via [GitHub Security Advisories](https://github.com/CYBERSZP0NT/szmelc-rce/security/advisories/new)
instead of opening a public issue.

## Known incident: CRX signing key committed to git history

The initial fork commits (≤ `ace249b`, 2026-11) contained
`key.local.crx.pem` — the private key used by `scripts/crx3.mjs` to sign
`dist/szmelc-rce.crx`. It is **untracked** since commit `2ba3055` but still
present in git **history**, and the repository is public.

Impact: anyone with the key can build CRX packages that Chrome attributes to
the key-derived extension id `jjkjjnpppmdojnfhlaeabnegfmpohbpd`. This matters
only if you distribute CRX files signed with that key (drag-and-drop CRX
installs). Unpacked (`Load unpacked`) installs and the manifest-pinned id
`fcoeoabgfenejglbffodgkkbkcdhcgfn` are **not** affected.

Remediation for anyone distributing CRX builds:

```sh
rm key.local.crx.pem      # discard the leaked key
npm run crx               # generates a fresh key → new stable CRX id
# update native-host/manifest.json allowed_origins if you pinned the old id
```

Optionally rewrite history to drop the blob
(`git filter-repo --path key.local.crx.pem --invert-paths` + force push) —
coordinated with all clones — but rotating the key is sufficient and simpler.

`npm run validate` fails while any `*.pem`/`.key` file is git-tracked, and
`npm run build` hard-fails if key-like files end up in `dist/`.

## Deployment guidance

- The extension grants the bridge full browser-control capability. Only point
  `bridgeUrl` at servers you control; prefer `wss://` for anything non-local.
- `bridgeAnonymous` (default on) sends a random device UUID as the identity
  token — it authenticates nothing. Use your own OAuth (`authorizeUrl` /
  `tokenUrl` / `oauthClientId`) or a bridge-side secret check for real auth.
- Managed org policy (`forceLoginOrgUUID` via `managed_schema.json`) always
  overrides the anonymous fallback.
