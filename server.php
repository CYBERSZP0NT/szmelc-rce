#!/usr/bin/env php
<?php
/**
 * Szmelc-RCE — server.php: static resolver & control-bridge server (single file, no deps).
 *
 * Two modes, chosen automatically:
 *
 * 1) STATIC RESOLVER (web SAPI: `php -S 0.0.0.0:9000 server.php` or PHP-FPM)
 *    Serves the extension build / any files under the script's directory
 *    (or RCE_STATIC_ROOT) with correct MIME types — so you can drop this file
 *    next to dist/ on any PHP host and serve the unpacked extension, .crx and
 *    .zip for download/update. Path-traversal safe.
 *      GET /<path>            -> that file (404 JSON if missing)
 *      GET /?file=<relpath>   -> same, for hosts without URL rewriting
 *      GET /health            -> {"ok":true}
 *
 * 2) BRIDGE DAEMON (CLI: `php server.php --serve [--port 8081] [--host 127.0.0.1]`)
 *    The PHP counterpart of backend/server.mjs: extensions connect with
 *    WebSocket (pure-PHP RFC 6455 — no ext-sockets needed), agents use the
 *    same HTTP API. Single stream_select loop, no extensions required.
 *      extension: ws://host:port/chrome/<userId>   (connect -> paired, ping/pong)
 *      agent:     GET  /devices                    (discovery)
 *                 GET  /chrome/<userId>/devices
 *                 POST /chrome/<userId>/tools      {tool, args, tabId?, device_id?, timeoutMs?}
 *                 GET  /health
 *                 ws://host:port/agent/<userId>    (tool_call push channel)
 *
 * Environment (both modes): RCE_API_TOKEN (agent auth; unset = open),
 * RCE_TOOL_TIMEOUT_MS (default 120000), RCE_PERMISSIONS (auto|deny, default auto),
 * RCE_STATIC_ROOT (resolver docroot, default the script's directory).
 */

declare(strict_types=1);

error_reporting(E_ALL & ~E_DEPRECATED);
ini_set('display_errors', '0');

// ----------------------------------------------------------------- shared ---
const WS_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

function json_out($body, int $code = 200): string
{
    return "HTTP/1.1 {$code} " . reason($code) . "\r\n"
        . "Content-Type: application/json\r\n"
        . "Content-Length: " . strlen(json_encode($body)) . "\r\n"
        . "Connection: close\r\n\r\n" . json_encode($body);
}

function reason(int $code): string
{
    return [200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden',
            404 => 'Not Found', 405 => 'Method Not Allowed', 413 => 'Payload Too Large',
            504 => 'Gateway Timeout'][$code] ?? 'Status';
}

function mime_of(string $file): string
{
    static $map = [
        'html' => 'text/html; charset=utf-8', 'htm' => 'text/html; charset=utf-8',
        'css' => 'text/css; charset=utf-8', 'js' => 'text/javascript; charset=utf-8',
        'mjs' => 'text/javascript; charset=utf-8', 'json' => 'application/json',
        'map' => 'application/json', 'webmanifest' => 'application/manifest+json',
        'svg' => 'image/svg+xml', 'png' => 'image/png', 'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg', 'gif' => 'image/gif', 'webp' => 'image/webp',
        'ico' => 'image/x-icon', 'woff' => 'font/woff', 'woff2' => 'font/woff2',
        'ttf' => 'font/ttf', 'otf' => 'font/otf', 'eot' => 'application/vnd.ms-fontobject',
        'mp3' => 'audio/mpeg', 'wav' => 'audio/wav', 'ogg' => 'audio/ogg',
        'crx' => 'application/x-chrome-extension', 'zip' => 'application/zip',
        'xml' => 'application/xml', 'txt' => 'text/plain; charset=utf-8',
        'md' => 'text/markdown; charset=utf-8', 'wasm' => 'application/wasm',
        'pdf' => 'application/pdf',
    ];
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    return $map[$ext] ?? 'application/octet-stream';
}

// ------------------------------------------------------------ static mode ---
function static_resolver(): void
{
    $root = realpath(getenv('RCE_STATIC_ROOT') ?: __DIR__) ?: __DIR__;
    $uri = $_SERVER['REQUEST_URI'] ?? '/';

    if (preg_match('#^/health$#i', $uri)) {
        header('Content-Type: application/json');
        echo json_encode(['ok' => true, 'mode' => 'static-resolver']);
        return;
    }

    // ?file=<relpath> fallback for hosts without URL rewriting
    $rel = isset($_GET['file']) ? (string)$_GET['file'] : rawurldecode(parse_url($uri, PHP_URL_PATH) ?: '/');
    $rel = ltrim(str_replace('\\', '/', $rel), '/');

    header('X-Content-Type-Options: nosniff');

    if ($rel === '' || $rel === 'server.php' || str_contains($rel, '..')) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'not found']);
        return;
    }

    $file = realpath($root . '/' . $rel);
    if ($file === false || !is_file($file) || !str_starts_with($file, $root . DIRECTORY_SEPARATOR)) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'not found']);
        return;
    }

    // never serve PHP sources from the static resolver
    if (preg_match('/\.(php|phtml|ini|log)$/i', $file)) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'forbidden']);
        return;
    }

    // updates (manifest.json / .crx / .zip) must never be cached
    $noCache = (bool)preg_match('/\.(json|crx|zip|xml)$/i', $file);
    header('Content-Type: ' . mime_of($file));
    header('Content-Length: ' . (string)filesize($file));
    header('Cache-Control: ' . ($noCache ? 'no-cache' : 'public, max-age=3600'));
    readfile($file);
}

// ------------------------------------------------------------- ws plumbing ---
/** Decode RFC 6455 frames from $buf (by reference); returns [opcode, payload][] */
function ws_decode(string &$buf): array
{
    $frames = [];
    while (strlen($buf) >= 2) {
        $b0 = ord($buf[0]);
        $b1 = ord($buf[1]);
        $fin = ($b0 & 0x80) !== 0;
        $opcode = $b0 & 0x0f;
        $masked = ($b1 & 0x80) !== 0;
        $len = $b1 & 0x7f;
        $off = 2;
        if ($len === 126) {
            if (strlen($buf) < $off + 2) return $frames;
            $len = unpack('n', substr($buf, $off, 2))[1];
            $off += 2;
        } elseif ($len === 127) {
            if (strlen($buf) < $off + 8) return $frames;
            $len = unpack('J', substr($buf, $off, 8))[1]; // 64-bit big-endian (64-bit PHP)
            $off += 8;
        }
        if ($masked) {
            if (strlen($buf) < $off + 4) return $frames;
            $mask = substr($buf, $off, 4);
            $off += 4;
        }
        if (strlen($buf) < $off + $len) return $frames; // wait for the rest
        $payload = substr($buf, $off, $len);
        if ($masked) {
            for ($i = 0; $i < $len; $i++) $payload[$i] = $payload[$i] ^ $mask[$i % 4];
        }
        $buf = substr($buf, $off + $len);
        if (!$fin && $opcode === 0) { $frames[] = [0, $payload]; continue; } // treat continuation as text chunk
        $frames[] = [$opcode, $payload];
        if ($opcode === 8) break; // close
    }
    return $frames;
}

function ws_encode(int $opcode, string $payload = ''): string
{
    $len = strlen($payload);
    $head = chr(0x80 | $opcode); // FIN + opcode
    if ($len < 126) $head .= chr($len);
    elseif ($len < 65536) $head .= chr(126) . pack('n', $len);
    else $head .= chr(127) . pack('J', $len);
    return $head . $payload;
}

function ws_send($conn, int $opcode, string $payload = ''): bool
{
    $data = ws_encode($opcode, $payload);
    return write_all($conn, $data);
}

function write_all($conn, string $data): bool
{
    $total = strlen($data);
    $written = 0;
    while ($written < $total) {
        $n = @fwrite($conn, substr($data, $written));
        if ($n === false || $n === 0) return false;
        $written += $n;
    }
    return true;
}

/** Parse an HTTP request out of $buf (by reference). null = incomplete. */
function http_parse(string &$buf): ?array
{
    $pos = strpos($buf, "\r\n\r\n");
    if ($pos === false) return null;
    $head = substr($buf, 0, $pos);
    $lines = explode("\r\n", $head);
    $req = explode(' ', array_shift($lines) ?? '');
    if (count($req) < 3) { $buf = ''; return ['method' => '', 'path' => '/', 'headers' => [], 'body' => '', 'bad' => true]; }
    $headers = [];
    foreach ($lines as $line) {
        if (str_contains($line, ':')) {
            [$k, $v] = explode(':', $line, 2);
            $headers[strtolower(trim($k))] = trim($v);
        }
    }
    $bodyLen = (int)($headers['content-length'] ?? 0);
    if ($bodyLen > (1 << 20)) { $buf = ''; return ['method' => '', 'path' => '/', 'headers' => $headers, 'body' => '', 'bad' => true]; }
    if (strlen($buf) < $pos + 4 + $bodyLen) return null;
    $body = substr($buf, $pos + 4, $bodyLen);
    $buf = substr($buf, $pos + 4 + $bodyLen);
    $path = rawurldecode(parse_url($req[1], PHP_URL_PATH) ?: '/');
    return ['method' => strtoupper($req[0]), 'path' => $path, 'headers' => $headers, 'body' => $body, 'bad' => false];
}

// ------------------------------------------------------------ bridge daemon ---
function bridge_daemon(array $argv): void
{
    $host = '0.0.0.0';
    $port = (int)(getenv('PORT') ?: 8081);
    foreach ($argv as $i => $a) {
        if ($a === '--port') $port = (int)($argv[$i + 1] ?? $port);
        if ($a === '--host') $host = (string)($argv[$i + 1] ?? $host);
    }
    $apiToken = getenv('RCE_API_TOKEN') ?: '';
    $permPolicy = strtolower(getenv('RCE_PERMISSIONS') ?: 'auto');
    $toolTimeoutMs = max(1000, (int)(getenv('RCE_TOOL_TIMEOUT_MS') ?: 120000));

    echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php] listening on tcp://{$host}:{$port}\n";
    echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php]  extensions: ws://{$host}:{$port}/chrome/<userId>\n";
    echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php]  agents    : GET /devices | POST /chrome/<u>/tools | ws /agent/<u>\n";
    echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php]  auth      : ", $apiToken ? 'Bearer token required' : 'OPEN (set RCE_API_TOKEN for public hosts)', "; permissions={$permPolicy}\n";

    $server = @stream_socket_server("tcp://{$host}:{$port}", $errno, $errstr);
    if (!$server) { fwrite(STDERR, "listen failed: {$errstr}\n"); exit(1); }
    stream_set_blocking($server, false);

    // connKey => ['kind'=>ws|agentws, 'userId'=>, 'role'=>extension|agent,
    //             'deviceId'=>, 'buf'=>'', 'isAlive'=>bool]
    /** @var array<string, array> $conns */
    $conns = [];
    // userId => [deviceId => ['conn'=>connKey, 'connectedAt'=>int, 'display_name'=>, 'extension_version'=>]]
    $users = [];
    // tool_use_id => ['agentConn'=>connKey|null, 'agentUserId'=>, 'userId'=>, 'deviceId'=>, 'deadline'=>float]
    $pending = [];
    $lastHeartbeat = microtime(true);

    $authorized = function (array $headers) use ($apiToken): bool {
        if ($apiToken === '') return true;
        return ($headers['authorization'] ?? '') === 'Bearer ' . $apiToken;
    };

    $pickDevice = function (string $userId, ?string $deviceId) use (&$users): ?string {
        if (!isset($users[$userId]) || $users[$userId] === []) return null;
        if ($deviceId !== null && isset($users[$userId][$deviceId])) return $deviceId;
        if ($deviceId !== null) return null;
        $best = null; $bestT = -1;
        foreach ($users[$userId] as $id => $dev) {
            if ($dev['connectedAt'] > $bestT) { $bestT = $dev['connectedAt']; $best = $id; }
        }
        return $best;
    };

    $connSend = function (int $connKey, array $frame) use (&$conns): bool {
        if (!isset($conns[$connKey])) return false;
        $conn = $conns[$connKey]['conn'];
        return ws_send($conn, 1, json_encode($frame));
    };

    $closeConn = function (int $connKey, int $code = 1000, string $reason = '') use (&$conns): void {
        if (!isset($conns[$connKey])) return;
        if ($conns[$connKey]['kind'] === 'ws') {
            @ws_send($conns[$connKey]['conn'], 8, pack('n', $code) . $reason);
        }
        @fclose($conns[$connKey]['conn']);
        unset($conns[$connKey]);
    };

    // ---------------- handler closures (use &$conns/&$users/&$pending) -------
    $handleHttp = function (int $connKey, array $req) use (&$conns, &$users, &$pending, $authorized, $pickDevice, $connSend, $closeConn, $toolTimeoutMs, $apiToken): void {
        ['method' => $method, 'path' => $path, 'headers' => $headers] = $req;
        $conn = $conns[$connKey]['conn'];
        $send = function ($body, int $code = 200) use ($conn): void {
            write_all($conn, json_out($body, $code));
        };

        if ($path === '/health') { $send(['ok' => true, 'mode' => 'bridge-daemon', 'users' => count($users)]); $closeConn($connKey); return; }

        if (!$authorized($headers)) { $send(['error' => 'unauthorized'], 401); $closeConn($connKey); return; }

        // discovery across users
        if ($method === 'GET' && $path === '/devices') {
            $out = [];
            foreach ($users as $u => $devs) {
                foreach ($devs as $id => $d) {
                    $out[] = ['userId' => $u, 'device_id' => $id, 'display_name' => $d['display_name'],
                              'extension_version' => $d['extension_version'], 'connected_ms' => (int)((microtime(true) - $d['connectedAt']) * 1000)];
                }
            }
            $send(['devices' => $out]); $closeConn($connKey); return;
        }

        if (preg_match('#^/chrome/([^/]+)/devices$#', $path, $mm) && $method === 'GET') {
            $u = $mm[1]; $out = [];
            foreach ($users[$u] ?? [] as $id => $d) {
                $out[] = ['userId' => $u, 'device_id' => $id, 'display_name' => $d['display_name'],
                          'extension_version' => $d['extension_version'], 'connected_ms' => (int)((microtime(true) - $d['connectedAt']) * 1000)];
            }
            $send(['devices' => $out]); $closeConn($connKey); return;
        }

        if (preg_match('#^/chrome/([^/]+)/tools$#', $path, $mm) && $method === 'POST') {
            $u = $mm[1];
            $body = json_decode($req['body'] ?: '{}', true);
            if (!is_array($body) || empty($body['tool'])) { $send(['error' => 'missing tool'], 400); $closeConn($connKey); return; }
            $devId = $pickDevice($u, isset($body['device_id']) ? (string)$body['device_id'] : null);
            if ($devId === null) { $send(['error' => 'no browser connected for this user'], 404); $closeConn($connKey); return; }

            $toolUseId = $body['tool_use_id'] ?? bin2hex(random_bytes(16));
            $frame = ['type' => 'tool_call', 'tool_use_id' => $toolUseId, 'tool' => $body['tool'],
                      'args' => $body['args'] ?? [], 'client_type' => $body['client_type'] ?? 'bridge'];
            if (isset($body['tabId'])) $frame['tabId'] = $body['tabId'];
            if (isset($body['session_scope'])) $frame['session_scope'] = $body['session_scope'];
            if (isset($body['permission_mode'])) $frame['permission_mode'] = $body['permission_mode'];
            if (isset($body['allowed_domains'])) $frame['allowed_domains'] = $body['allowed_domains'];
            $frame['target_device_id'] = $devId;

            if (!$connSend($users[$u][$devId]['conn'], $frame)) {
                $send(['error' => 'browser socket closed while dispatching'], 502); $closeConn($connKey); return;
            }
            $timeoutMs = max(1000, (int)($body['timeoutMs'] ?? $toolTimeoutMs));
            // Park the HTTP connection until the tool_result arrives.
            $conns[$connKey]['parked'] = true;
            $pending[$toolUseId] = ['agentConn' => $connKey, 'agentKind' => 'http', 'userId' => $u,
                                    'deviceId' => $devId, 'deadline' => microtime(true) + $timeoutMs / 1000];
            return; // response written later by resolvePending()
        }

        $send(['error' => 'not found'], 404); $closeConn($connKey);
    };

    $resolvePending = function (string $userId, array $m) use (&$pending, &$conns, $closeConn): void {
        $id = $m['tool_use_id'] ?? null;
        if (!$id || !isset($pending[$id])) return;
        $p = $pending[$id];
        unset($pending[$id]);
        if ($p['agentKind'] === 'agentws') {
            if (isset($conns[$p['agentConn']])) ws_send($conns[$p['agentConn']]['conn'], 1, json_encode($m));
            return;
        }
        if (isset($conns[$p['agentConn']])) {
            write_all($conns[$p['agentConn']]['conn'], json_out($m, 200));
            $closeConn($p['agentConn']);
        }
    };

    $denyPending = function (int $connKey) use (&$pending, $closeConn): void {
        foreach ($pending as $id => $p) {
            if ($p['agentConn'] === $connKey) {
                unset($pending[$id]);
                if ($p['agentKind'] === 'http' && isset($conns[$connKey])) {
                    write_all($conns[$connKey]['conn'], json_out(['error' => 'browser disconnected while executing'], 502));
                }
                $closeConn($connKey);
            }
        }
    };

    // ---------------- main loop ---------------------------------------------
    while (true) {
        $read = [$server];
        foreach ($conns as $c) $read[] = $c['conn'];
        $write = null; $except = null;
        if (@stream_select($read, $write, $except, 1) === false) break;

        // accept
        while (($new = @stream_socket_accept($server, 0)) !== false) {
            stream_set_blocking($new, false);
            $key = (int)$new;
            $conns[$key] = ['conn' => $new, 'kind' => 'http', 'role' => null, 'userId' => null,
                            'deviceId' => null, 'buf' => '', 'isAlive' => true, 'parked' => false];
        }

        // readable connections
        foreach ($read as $conn) {
            $key = (int)$conn;
            if ($key === (int)$server || !isset($conns[$key])) continue;
            $c = &$conns[$key];
            $chunk = @fread($conn, 65536);
            if ($chunk === '' || $chunk === false) {
                // peer closed
                if ($c['role'] === 'extension' && $c['userId'] !== null && isset($users[$c['userId']][$c['deviceId']])) {
                    unset($users[$c['userId']][$c['deviceId']]);
                    if (($users[$c['userId']] ?? []) === []) unset($users[$c['userId']]);
                    echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php] ext disconnected: user={$c['userId']} device={$c['deviceId']}\n";
                }
                $denyPending($key);
                $closeConn($key);
                unset($c);
                continue;
            }
            $c['buf'] .= $chunk;
            $c['isAlive'] = true;

            if ($c['kind'] === 'http') {
                // maybe a WS upgrade?
                if (preg_match('/\bupgrade:\s*websocket\b/i', $c['buf']) && preg_match('/\bsec-websocket-key:\s*(\S+)/i', $c['buf'], $km)) {
                    $req = http_parse($c['buf']);
                    if ($req === null) { unset($c); continue; }
                    $isAgent = str_starts_with($req['path'], '/agent/');
                    $isExt = str_starts_with($req['path'], '/chrome/');
                    if (!$isAgent && !$isExt) { write_all($conn, json_out(['error' => 'not found'], 404)); $closeConn($key); unset($c); continue; }
                    if ($isAgent && !$authorized($req['headers'])) { write_all($conn, "HTTP/1.1 401 Unauthorized\r\n\r\n"); $closeConn($key); unset($c); continue; }
                    $accept = base64_encode(openssl_digest($km[1] . WS_GUID, 'sha1', true));
                    $ok = write_all($conn, "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: {$accept}\r\n\r\n");
                    if (!$ok) { $closeConn($key); unset($c); continue; }
                    $c['kind'] = 'ws';
                    $c['role'] = $isAgent ? 'agent' : 'extension';
                    $c['userId'] = trim(substr($req['path'], strrpos($req['path'], '/') + 1));
                    echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php] ws {$c['role']} open: user={$c['userId']}\n";
                } else {
                    $req = http_parse($c['buf']);
                    if ($req === null) { unset($c); continue; }
                    if (!empty($req['bad'])) { write_all($conn, json_out(['error' => 'bad request'], 400)); $closeConn($key); unset($c); continue; }
                    $handleHttp($key, $req);
                    unset($c);
                    continue;
                }
            }

            // WS frames
            if ($c['kind'] === 'ws') {
                foreach (ws_decode($c['buf']) as [$opcode, $payload]) {
                    if ($opcode === 8) { // close
                        if ($c['role'] === 'extension' && $c['userId'] !== null && isset($users[$c['userId']][$c['deviceId']])) {
                            unset($users[$c['userId']][$c['deviceId']]);
                            if (($users[$c['userId']] ?? []) === []) unset($users[$c['userId']]);
                        }
                        $denyPending($key);
                        $closeConn($key);
                        break 2;
                    }
                    if ($opcode === 9) { ws_send($conn, 10, $payload); continue; }          // ping -> pong
                    if ($opcode === 10) { continue; }                                       // pong
                    if ($opcode !== 1 && $opcode !== 0 && $opcode !== 2) continue;          // only text/binary/cont
                    $m = json_decode($payload, true);
                    if (!is_array($m)) continue;

                    if ($c['role'] === 'extension') {
                        if (($m['type'] ?? '') === 'connect') {
                            $c['deviceId'] = (string)($m['device_id'] ?? bin2hex(random_bytes(16)));
                            $c['userId'] = $c['userId'] ?? 'anon';
                            $users[$c['userId']] ??= [];
                            // same device reconnecting replaces the old socket
                            if (isset($users[$c['userId']][$c['deviceId']]) && $users[$c['userId']][$c['deviceId']]['conn'] !== $key) {
                                $oldKey = $users[$c['userId']][$c['deviceId']]['conn'];
                                if (isset($conns[$oldKey])) $closeConn($oldKey, 4001, 'replaced');
                            }
                            $users[$c['userId']][$c['deviceId']] = ['conn' => $key, 'connectedAt' => microtime(true),
                                'display_name' => $m['display_name'] ?? null, 'extension_version' => $m['extension_version'] ?? null];
                            ws_send($conn, 1, json_encode(['type' => 'paired', 'scoped_peer_disconnect' => (bool)($m['scoped_peer_disconnect'] ?? false)]));
                            echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php] ext connected: user={$c['userId']} device={$c['deviceId']} v=", ($m['extension_version'] ?? '?'), "\n";
                            continue;
                        }
                        if (($m['type'] ?? '') === 'pong') continue;
                        if (($m['type'] ?? '') === 'tool_result' || ($m['type'] ?? '') === 'tool_response') {
                            echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php] tool_result <- user={$c['userId']} id=", ($m['tool_use_id'] ?? '?'), "\n";
                            $resolvePending($c['userId'], $m);
                            continue;
                        }
                        if (($m['type'] ?? '') === 'permission_request') {
                            $allowed = $permPolicy === 'auto';
                            echo gmdate('Y-m-d\TH:i:s\Z'), " [backend-php] permission_request user={$c['userId']} policy={$permPolicy} -> allowed=", var_export($allowed, true), "\n";
                            ws_send($conn, 1, json_encode(['type' => 'permission_response', 'request_id' => $m['request_id'] ?? null, 'allowed' => $allowed]));
                            continue;
                        }
                        continue; // notifications & anything else: ignored
                    }

                    // ---- agent ws ----
                    if (($m['type'] ?? '') === 'ping') { ws_send($conn, 1, json_encode(['type' => 'pong'])); continue; }
                    if (($m['type'] ?? '') === 'list_devices') {
                        $out = [];
                        foreach ($users as $u => $devs) foreach ($devs as $id => $d) {
                            $out[] = ['userId' => $u, 'device_id' => $id, 'extension_version' => $d['extension_version']];
                        }
                        ws_send($conn, 1, json_encode(['type' => 'devices', 'devices' => $out]));
                        continue;
                    }
                    if (($m['type'] ?? '') === 'tool_call' || ($m['type'] ?? '') === 'tool_request') {
                        $req = $m['type'] === 'tool_request' ? array_merge($m['params'] ?? [], ['tool_use_id' => $m['tool_use_id'] ?? ($m['params']['tool_use_id'] ?? null)]) : $m;
                        $toolUseId = $req['tool_use_id'] ?? bin2hex(random_bytes(16));
                        $devId = $pickDevice($c['userId'], isset($req['device_id']) ? (string)$req['device_id'] : null);
                        if ($devId === null) {
                            ws_send($conn, 1, json_encode(['type' => 'tool_result', 'tool_use_id' => $toolUseId,
                                'error' => ['content' => [['type' => 'text', 'text' => 'no browser connected for this user']]]]));
                            continue;
                        }
                        $frame = ['type' => 'tool_call', 'tool_use_id' => $toolUseId, 'tool' => $req['tool'],
                                  'args' => $req['args'] ?? [], 'client_type' => $req['client_type'] ?? 'bridge',
                                  'target_device_id' => $devId];
                        foreach (['tabId', 'session_scope', 'permission_mode', 'allowed_domains', 'handle_permission_prompts'] as $k) {
                            if (isset($req[$k])) $frame[$k] = $req[$k];
                        }
                        $connSend($users[$c['userId']][$devId]['conn'], $frame);
                        $pending[$toolUseId] = ['agentConn' => $key, 'agentKind' => 'agentws', 'userId' => $c['userId'],
                                                'deviceId' => $devId, 'deadline' => microtime(true) + $toolTimeoutMs / 1000];
                        continue;
                    }
                    if (($m['type'] ?? '') === 'tool_result' || ($m['type'] ?? '') === 'tool_response') { $resolvePending($c['userId'], $m); continue; }
                }
            }
            unset($c);
        }

        // deadlines + heartbeat
        $now = microtime(true);
        foreach ($pending as $id => $p) {
            if ($now >= $p['deadline']) {
                unset($pending[$id]);
                if ($p['agentKind'] === 'http') {
                    if (isset($conns[$p['agentConn']])) {
                        write_all($conns[$p['agentConn']]['conn'], json_out(['error' => "tool timeout after {$toolTimeoutMs}ms (tool_use_id={$id})"], 504));
                        $closeConn($p['agentConn']);
                    }
                } elseif (isset($conns[$p['agentConn']])) {
                    ws_send($conns[$p['agentConn']]['conn'], 1, json_encode(['type' => 'tool_result', 'tool_use_id' => $id,
                        'error' => ['content' => [['type' => 'text', 'text' => "tool timeout after {$toolTimeoutMs}ms"]]]]));
                }
            }
        }
        if ($now - $lastHeartbeat >= 20) {
            $lastHeartbeat = $now;
            foreach ($conns as $key => $c) {
                if ($c['kind'] !== 'ws') continue;
                if (!$c['isAlive']) { $denyPending($key); $closeConn($key); continue; }
                $c['isAlive'] = false;
                if (!ws_send($c['conn'], 9)) $closeConn($key);
            }
        }
    }
}

// -------------------------------------------------------------------- main ---
$isCli = PHP_SAPI === 'cli';
if ($isCli && in_array('--serve', $argv ?? [], true)) {
    bridge_daemon($argv);
} else {
    static_resolver();
}
