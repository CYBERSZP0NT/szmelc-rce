#!/usr/bin/env bash
# Pack Szmelc-RCE into a .zip for distribution / side-loading.
# Uses the clean build tree in dist/ when present (run `npm run build` first),
# otherwise packs the project root minus dev-only directories.
set -euo pipefail
cd "$(dirname "$0")"
OUT="$1"
[ -n "$OUT" ] || OUT="szmelc-rce.zip"
# remember if OUT was absolute; work with a repo-relative name
ABS=""
case "$OUT" in
    /*) ABS=1; OUT="pack-out-$$.zip" ;;
esac
rm -f "$OUT"
if [ -d dist/szmelc-rce ]; then
    ( cd dist/szmelc-rce && zip -r -X "../$OUT" . ) >/dev/null
    mv -f "dist/$OUT" "$OUT"
else
    echo "(dist/ not found — packing project root; run \`npm run build\` for a leaner zip)"
    zip -r -X "$OUT" . \
      -x "*.git*" "$OUT" "*.DS_Store" "node_modules/*" \
         "dev/*" "test/*" "scripts/*" "dist/*" \
         "*.pem" "*.crx" "*.log" "AGENTS.md" >/dev/null
fi
if [ -n "$ABS" ]; then mkdir -p "$(dirname "$1")"; mv -f "$OUT" "$1"; OUT="$1"; fi
echo "Packed -> $OUT ($(du -h "$OUT" | cut -f1))"
echo "Install via chrome://extensions -> Load unpacked (this folder) is simplest."
