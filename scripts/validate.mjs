#!/usr/bin/env node
/**
 * Szmelc-RCE — static validator.
 *
 * Checks (no browser needed):
 *   1. manifest.json is valid JSON, MV3, and every file it references exists
 *   2. the JS module/asset graph resolves (static + dynamic import, and
 *      chrome.runtime.getURL) for every .js file
 *   3. every @font-face / woff2 reference points at a real file
 *   4. CSP connect-src / host_permissions sanity
 *   5. native-host manifest + install script are present and consistent
 *
 * Exit 0 = clean, 1 = problems (each printed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warns = [];
const ok = (m) => console.log("  \x1b[32m✓\x1b[0m " + m);
const bad = (m) => { errors.push(m); console.log("  \x1b[31m✗\x1b[0m " + m); };
const warn = (m) => { warns.push(m); console.log("  \x1b[33m!\x1b[0m " + m); };

function* walk(dir, exts = null) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name === "node_modules" || e.name === ".git" || e.name === "dist") continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) yield* walk(p, exts);
        else if (!exts || exts.some((x) => e.name.endsWith(x))) yield p;
    }
}

function rel(p) { return path.relative(ROOT, p); }

// ---------------------------------------------------------------- manifest --
console.log("\n[1/5] manifest.json");
let manifest = null;
try {
    manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "manifest.json"), "utf8"));
    ok("manifest.json parses");
} catch (err) {
    bad("manifest.json invalid: " + err.message);
}
if (manifest) {
    const need = ["manifest_version", "name", "version", "background", "content_scripts"];
    for (const k of need) if (manifest[k] === undefined) bad(`manifest missing key: ${k}`);
    if (manifest.manifest_version !== 3) warn("manifest_version is not 3: " + manifest.manifest_version);

    const fileRefs = [];
    if (manifest.background?.service_worker) fileRefs.push(manifest.background.service_worker);
    for (const v of Object.values(manifest.icons || {})) fileRefs.push(v);
    if (manifest.options_page) fileRefs.push(manifest.options_page);
    if (manifest.developer?.icons) fileRefs.push(...manifest.developer.icons);
    for (const cs of manifest.content_scripts || []) (cs.js || []).forEach((j) => fileRefs.push(j));
    for (const w of manifest.web_accessible_resources || []) (w.resources || []).forEach((r) => fileRefs.push(r));
    if (manifest.side_panel?.default_path) fileRefs.push(manifest.side_panel.default_path);
    let missingRefs = 0;
    for (const r of [...new Set(fileRefs)]) {
        if (!fs.existsSync(path.join(ROOT, r))) { bad(`manifest references missing file: ${r}`); missingRefs++; }
    }
    if (!missingRefs) ok(`manifest file refs resolve (${new Set(fileRefs).size} unique)`);

    // name/version are shown in chrome://extensions
    if (manifest.name) ok(`name="${manifest.name}" version="${manifest.version}"`);

    // key present -> stable extension id (needed for OAuth redirect + native allowed_origins)
    if (manifest.key) ok("public `key` present (stable extension id)");
    else warn("no `key` in manifest: id will be derived from path on first load");

    if (manifest.update_url) warn(`update_url present (${manifest.update_url}) - will poll Google for updates`);
}

// ------------------------------------------------------------------ graph ---
console.log("\n[2/5] module / asset graph");
function extCandidates(baseFile, ref) {
    // returns absolute candidate paths to test, or [] if not a local asset ref
    if (!ref) return [];
    if (ref.startsWith("chrome-extension:")) return [];
    if (ref.startsWith("/_favicon/") || ref.startsWith("/api/")) return [];
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(ref)) return []; // external scheme
    if (ref.startsWith("/") || ref.startsWith("./") || ref.startsWith("../")) {
        const base = ref.startsWith("/") ? ROOT : path.dirname(baseFile);
        return [path.resolve(base, ref)];
    }
    // bare path that looks like an extension-root asset (chrome.runtime.getURL)
    const top = ref.split("/")[0];
    if ((["assets", "sounds", "public", "i18n", "_metadata", "_locales"].includes(top)) && ref.includes("/")) {
        return [path.resolve(ROOT, ref)];
    }
    return []; // bare ESM module specifier (not a file)
}
let refsChecked = 0;
const pattern = /(?:from\s*|import\s*\(\s*|getURL\s*\(\s*|new\s+URL\s*\(\s*)["']([^"']+)["']/g;
let graphBad = 0;
for (const f of walk(ROOT, [".js"])) {
    const s = fs.readFileSync(f, "utf8");
    pattern.lastIndex = 0;
    let m;
    while ((m = pattern.exec(s))) {
        const ref = m[1];
        const candidates = extCandidates(f, ref);
        if (!candidates.length) continue; // not a local asset ref (scheme/external)
        refsChecked++;
        const resolved = candidates.some((c) => fs.existsSync(c));
        if (!resolved) { bad(`unresolved ref in ${rel(f)}: "${ref}"`); graphBad++; }
    }
}
if (!graphBad) ok(`all ${refsChecked} local asset refs resolve`);

// ------------------------------------------------------------------ fonts --
console.log("\n[3/5] fonts");
const woff2 = new Set();
for (const f of walk(ROOT, [".woff2"])) woff2.add(path.basename(f));
let fontBad = 0;
for (const f of walk(ROOT, [".css", ".js"])) {
    const s = fs.readFileSync(f, "utf8");
    for (const mm of s.matchAll(/([A-Za-z0-9][\w./-]*\.woff2)/g)) {
        const name = path.basename(mm[1]);
        if (!woff2.has(name)) { bad(`font referenced but missing: ${name} (in ${rel(f)})`); fontBad++; }
    }
}
if (!fontBad) ok(`all ${woff2.size} woff2 fonts present and referenced`);

// -------------------------------------------------------------------- CSP --
console.log("\n[4/5] CSP / permissions");
if (manifest?.content_security_policy?.extension_pages) {
    const csp = manifest.content_security_policy.extension_pages;
    if (/sentry|datadog|claudeusercontent|anthropic/i.test(csp)) warn("CSP still references original-vendor hosts");
    else ok("CSP clean of original-vendor telemetry hosts");
    if (!/script-src\s+'self'/.test(csp)) warn("CSP script-src does not lock to 'self'");
}

// -------------------------------------------------------------- native host -
console.log("\n[5/6] native-host/");
const nh = path.join(ROOT, "native-host");
for (const req of ["manifest.json", "rce_host.py", "install.sh"]) {
    fs.existsSync(path.join(nh, req)) ? ok(`native-host/${req}`) : bad(`native-host missing: ${req}`);
}
try {
    const nm = JSON.parse(fs.readFileSync(path.join(nh, "manifest.json"), "utf8"));
    if (nm.name) ok(`native host name: ${nm.name}`);
    if (!/chrome-extension:\/\/[a-p]{32}\//.test(JSON.stringify(nm.allowed_origins || [])))
        warn("native-host allowed_origins: check the extension id (must match your loaded id)");
} catch (e) { bad("native-host/manifest.json invalid: " + e.message); }

// ------------------------------------------------- open-source hygiene (git) -
console.log("\n[6/6] secrets / open-source hygiene");
try {
    const { execFileSync } = await import("node:child_process");
    const tracked = execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" })
        .split("\n").filter(Boolean);
    const keys = tracked.filter((f) => /\.(pem|key|p12|pfx)$/i.test(f));
    if (keys.length) keys.forEach((k) => bad(`private key file tracked in git: ${k} (git rm --cached it; rotate if it ever leaked)`));
    else ok("no private key files tracked in git");
} catch (e) {
    // not a git checkout — nothing to check
    ok("git check skipped (not a repository)");
}

// ------------------------------------------------------------------ summary  -
console.log("\n" + "─".repeat(48));
console.log(`  \x1b[1mvalidate:\x1b[0m ${errors.length ? "\x1b[31mFAIL\x1b[0m" : "\x1b[32mPASS\x1b[0m"}  (errors=${errors.length}, warnings=${warns.length}, graph-refs=${refsChecked})`);
if (errors.length) { console.error("\nerrors:"); errors.forEach((e) => console.error("  - " + e)); }
process.exit(errors.length ? 1 : 0);
