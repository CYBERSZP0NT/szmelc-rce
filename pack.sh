#!/usr/bin/env bash
# Pack Szmelc-RCE into a .zip (a .crx is a zip with a signature header).
# For the common self-hosted workflow, "load unpacked" is preferred; but a
# plain zip also works for distribution/side-loading on some Chromium builds.
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-szmelc-rce.zip}"
rm -f "$OUT"
zip -r -X "$OUT" . \
  -x '*.git/*' -x "$OUT" '*.DS_Store' >/dev/null
echo "Packed -> $OUT ($(du -h "$OUT" | cut -f1))"
echo "Install via chrome://extensions -> Load unpacked (this folder) is simplest."
