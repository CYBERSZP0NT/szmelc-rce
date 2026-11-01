#!/usr/bin/env bash
# Register the reference native-messaging host for Chrome/Chromium.
# Usage: bash native-host/install.sh            (default: user profile)
#        bash native-host/install.sh --code     (registers com.szmelc.rce_code)
set -euo pipefail
cd "$(dirname "$0")"

NAME="com.szmelc.rce_browser"
[ "${1:-}" = "--code" ] && NAME="com.szmelc.rce_code"

EXT_ID="fcoeoabgfenejglbffodgkkbkcdhcgfn"
HERE="$(pwd)"
DEST_BIN="$HOME/.local/state/szmelc-rce/rce_host.py"
HOSTS_DIR=""
case "$(readlink -f "$(command -v google-chrome||echo)" 2>/dev/null || true)" in
  *microsoft*) HOSTS_DIR="$HOME/.config/microsoft-edge/NativeMessagingHosts";;
esac
[ -z "$HOSTS_DIR" ] && \
  for c in /opt/google/chrome /usr/bin/google-chrome /usr/bin/chromium /snap/bin/chromium; do
    [ -e "$c" ] && HOSTS_DIR="$HOME/.config/google-chrome/NativeMessagingHosts" && break
  done
[ -z "$HOSTS_DIR" ] && { echo "Could not find a Chrome profile dir; set HOSTS_DIR manually." >&2; exit 1; }

mkdir -p "$HOME/.local/state/szmelc-rce"
cp rce_host.py "$DEST_BIN"
chmod +x "$DEST_BIN"

mkdir -p "$HOSTS_DIR"
cat > "$HOSTS_DIR/$NAME.json" <<EOF
{
    "name": "$NAME",
    "description": "Szmelc-RCE native-messaging host",
    "path": "$DEST_BIN",
    "type": "stdio",
    "allowed_origins": [ "chrome-extension://$EXT_ID/" ]
}
EOF
chown "$(id -u):$(id -g)" "$HOSTS_DIR/$NAME.json" 2>/dev/null || true

echo "Installed host '$NAME' -> $DEST_BIN"
echo "Manifest written to $HOSTS_DIR/$NAME.json"
echo ""
echo "Next: options.html -> enable nativeMessaging permission -> Szmelc-RCE"
echo "Config is already using nativeHosts = ['com.szmelc.rce_browser', 'com.szmelc.rce_code']."
