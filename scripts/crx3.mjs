#!/usr/bin/env node
/**
 * Szmelc-RCE — CRX3 packager (no Chrome required).
 *
 * Packs dist/szmelc-rce/ into a valid CRX3 archive (.crx) that Chrome accepts
 * (Chrome ≥73 format, per Chromium `crx_file_format.proto`):
 *
 *   "Cr24" (4 B) | u32le version=3 (4 B) | u32le header_len (4 B)
 *   | protobuf CrxFileHeader (header_len B) | zip archive
 *
 * CrxFileHeader carries, as `sha256_with_rsa` proof(s):
 *   { public_key: SPKI-DER of the signing key, signature: sig }
 * and `signed_header_data` = protobuf SignedData { crx_id = sha256(pub_key)[0..16] }.
 * The signature is RSA-SHA256 over:
 *   "CRX3 SignedData\x00" + u32le(len(signed_header_data))
 *   + signed_header_data + zip
 *
 * The extension ID is the mpdecimal (a–p) form of that crx_id, so the manifest
 * "key" field MUST be the SPKI base64 of the signing key. This script keeps them
 * consistent automatically:
 *
 *   - signing key: --key <pem> | $CRX_KEY | ./key.pem | ./key.local.crx.pem
 *   - no key file  → a 2048-bit key is generated into ./key.local.crx.pem
 *     (kept on disk so repeat builds yield a STABLE id) and the dist
 *     manifest.json "key" is patched to match (source manifest untouched).
 *
 * Usage:
 *   npm run build
 *   npm run crx                      # → dist/szmelc-rce.crx
 *   node scripts/crx3.mjs --key k.pem --out my-ext.crx
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist", "szmelc-rce");
const ZIP = path.join(ROOT, "dist", "szmelc-rce.zip");

const args = process.argv.slice(2);
const arg = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

if (!fs.existsSync(DIST)) { console.error("dist/szmelc-rce/ not found — run `npm run build` first"); process.exit(2); }

// ---- signing key ----------------------------------------------------------
let keyPath = arg("--key") || process.env.CRX_KEY;
if (!keyPath) {
    for (const c of [path.join(ROOT, "key.pem"), path.join(ROOT, "key.local.crx.pem")]) {
        if (fs.existsSync(c)) { keyPath = c; break; }
    }
}
let generatedKey = false;
if (!keyPath) {
    keyPath = path.join(ROOT, "key.local.crx.pem");
    const { privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    fs.writeFileSync(keyPath, privateKey, { mode: 0o600 });
    generatedKey = true;
}
if (!fs.existsSync(keyPath)) { console.error(`key file not found: ${keyPath}`); process.exit(2); }

const pem = fs.readFileSync(keyPath, "utf8");
const privateKey = crypto.createPrivateKey(pem);
const pubDer = crypto.createPublicKey(privateKey).export({ type: "spki", format: "der" });
const pubB64 = pubDer.toString("base64");
const crxId = crypto.createHash("sha256").update(pubDer).digest().subarray(0, 16);
const extId = [...crxId].map((b) => "abcdefghijklmnop"[b >> 4] + "abcdefghijklmnop"[b & 15]).join("");

// ---- manifest key consistency (reporting only; dist/ is not modified) ------
const manifestPath = path.join(DIST, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const patched = manifest.key !== pubB64;

// ---- zip -------------------------------------------------------------------
// If the signing key differs from the manifest key, the CRX is packed from a
// TEMP COPY with its manifest "key" patched (Chrome derives the extension id
// from that key; it must match the proof). dist/ itself is left untouched so
// `--load-extension=dist/szmelc-rce` keeps using the manifest's original key.
let zipBytes;
let patchCopy = null;
const zipDir = (dir) => {
    const tmp = path.join(ROOT, "dist", ".szmelc-rce-rezip.zip");
    fs.rmSync(tmp, { force: true });
    const r = spawnSync("python3", ["-m", "zipfile", "-c", tmp, "."], { cwd: dir });
    if (r.status !== 0) {
        if (patchCopy) fs.rmSync(patchCopy, { recursive: true, force: true });
        console.error("python3 (or zip) unavailable to package");
        process.exit(2);
    }
    const bytes = fs.readFileSync(tmp);
    fs.rmSync(tmp, { force: true });
    return bytes;
};

if (patched) {
    patchCopy = path.join(ROOT, "dist", ".szmelc-rce-crx-patch");
    fs.rmSync(patchCopy, { recursive: true, force: true });
    fs.cpSync(DIST, patchCopy, { recursive: true });
    const m2 = path.join(patchCopy, "manifest.json");
    const man2 = JSON.parse(fs.readFileSync(m2, "utf8"));
    man2.key = pubB64;
    fs.writeFileSync(m2, JSON.stringify(man2, null, 2) + "\n");
    zipBytes = zipDir(patchCopy);
    fs.rmSync(patchCopy, { recursive: true, force: true });
    patchCopy = null;
} else {
    if (fs.existsSync(ZIP)) zipBytes = fs.readFileSync(ZIP);
    else zipBytes = zipDir(DIST);
}

// ---- protobuf (tiny encoder: fields are simple length-delimited) -----------
const u32 = (n) => {
    const out = [];
    while (n >= 0x80) { out.push((n & 0x7f) | 0x80); n >>>= 7; }
    out.push(n);
    return Buffer.from(out);
};
// CRX3 container/sig-input lengths are fixed 4-octet little-endian (per proto).
const u32le = (n) => { const b = Buffer.alloc(4); b.writeUInt32LE(n); return b; };
const tag = (field, wire = 2) => u32((field << 3) | wire);
const ld = (field, bytes) => Buffer.concat([tag(field), u32(bytes.length), bytes]);

const signedHeaderData = ld(1, crxId);            // SignedData { crx_id }
const sigInput = Buffer.concat([
    Buffer.from("CRX3 SignedData\x00"),
    u32le(signedHeaderData.length),
    signedHeaderData,
    zipBytes,
]);
const signature = crypto.createSign("sha256").update(sigInput).sign(privateKey);
const rsaProof = Buffer.concat([ld(1, pubDer), ld(2, signature)]);   // AsymmetricKeyProof
const header = Buffer.concat([ld(2, rsaProof), ld(10000, signedHeaderData)]); // CrxFileHeader

const crx = Buffer.concat([
    Buffer.from("Cr24"),
    u32le(3),
    u32le(header.length),
    header,
    zipBytes,
]);

// ---- self-verify (parse + check signature & crx_id consistency) ------------
{
    const h = Buffer.from(crx.subarray(4 + 4 + 4, 4 + 4 + 4 + crx.readUInt32LE(8)));
    const p = Buffer.from(crx.subarray(4 + 4 + 4 + h.length));
    const ok = crypto.createVerify("sha256")
        .update(Buffer.from("CRX3 SignedData\x00"))
        .update(u32le(signedHeaderData.length))
        .update(signedHeaderData)
        .update(p)
        .verify(crypto.createPublicKey(privateKey), signature);
    if (!ok || !p.equals(zipBytes)) { console.error("self-verify FAILED"); process.exit(2); }
}

const outPath = path.resolve(ROOT, arg("--out") || path.join(ROOT, "dist", "szmelc-rce.crx"));
fs.writeFileSync(outPath, crx);

console.log("\x1b[1m\x1b[36m== crx3\x1b[0m");
console.log(`  \x1b[32m✓\x1b[0m self-verify (parse + RSA-SHA256 + crx_id)`);
console.log(`  \x1b[32m✓\x1b[0m CRX3 written: ${path.relative(ROOT, outPath)} (${(crx.length / 1048576).toFixed(1)} MB)`);
console.log(`  key            : ${path.relative(ROOT, keyPath)}${generatedKey ? "  (generated — kept for stable future builds)" : ""}`);
console.log(`  extension id   : ${extId}${patched ? "  (CRX packed with this key; unpacked dist/ keeps the manifest's original id)" : ""}`);
console.log(`  install        : chrome://extensions → Developer mode → drag dist/szmelc-rce.crx\n                        (or: chrome --load-extension=./dist/szmelc-rce for unpacked dev mode)`);
if (generatedKey) {
    console.log(`\n  NOTE: a fresh key was generated, so the extension ID is ${extId} (not the\n` +
        `  upstream-pinned id). Native-host allowed_origins and the OAuth redirect\n` +
        `  URI reference the old id — see README "CRX signing" for the trade-off.`);
}
