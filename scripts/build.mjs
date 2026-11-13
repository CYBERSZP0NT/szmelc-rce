#!/usr/bin/env node
/**
 * Szmelc-RCE — build.
 *   1. validate (manifest + graph + fonts + CSP + native-host)
 *   2. emit a clean, load-unpacked-ready folder at dist/szmelc-rce/
 *   3. package it as dist/szmelc-rce.zip  (distribution / update_url payload)
 *
 * The shipped code is the (beautified) production bundle — this fork does not
 * carry the original TS source, so "build" = verify + assemble + package.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const OUT = path.join(DIST, "szmelc-rce");
const ZIP = path.join(DIST, "szmelc-rce.zip");

const IGNORED_DIRS = new Set(["node_modules", ".git", "dist", "dev", "scripts", "test"]);
const IGNORED_FILES = new Set(["package.json", "package-lock.json", ".gitignore", "AGENTS.md"]);
// Private signing keys must never ship inside a build artifact.
const IGNORED_SUFFIXES = [".pem", ".crx", ".log"];
const STEP = (s) => console.log(`\n\x1b[1m\x1b[36m== ${s}\x1b[0m`);

STEP("build[1/3] validate");
const v = spawnSync(process.execPath, [path.join(ROOT, "scripts", "validate.mjs")], { stdio: "inherit" });
if (v.status !== 0) { console.error("\n\x1b[31mBuild aborted by validator.\x1b[0m"); process.exit(v.status); }

function copyDir(src, dst) {
    fs.mkdirSync(dst, { recursive: true });
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
        if (IGNORED_DIRS.has(e.name)) continue;
        if (IGNORED_SUFFIXES.some((s) => e.name.endsWith(s))) continue;
        if (e.name.endsWith(".log") || (["szmelc-rce.zip"].includes(e.name) && dst === OUT)) continue;
        const s = path.join(src, e.name);
        const d = path.join(dst, e.name);
        const isTopIgnoredFile = IGNORED_FILES.has(e.name) && dst === OUT;
        if (isTopIgnoredFile) continue;
        if (e.isDirectory()) copyDir(s, d);
        else fs.copyFileSync(s, d);
    }
}

STEP("build[2/3] assemble dist/");
fs.rmSync(OUT, { recursive: true, force: true });
copyDir(ROOT, OUT);
let n = 0;
for (const e of fs.readdirSync(OUT)) n++;
ok(`dist/szmelc-rce/ assembled (${n} top-level entries)`);

// Guard: no private keys / dev-only artifacts may end up in the build output.
const leaked = [];
(function scan(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) scan(p);
        else if (IGNORED_SUFFIXES.some((s) => e.name.endsWith(s))) leaked.push(path.relative(OUT, p));
    }
})(OUT);
if (leaked.length) {
    console.error("\n\x1b[31mBuild aborted: private/key-like files leaked into dist:\x1b[0m");
    leaked.forEach((f) => console.error("  - " + f));
    process.exit(1);
}
ok("no signing keys or dev artifacts in dist/");

STEP("build[3/3] package zip");
if (fs.existsSync(ZIP)) fs.rmSync(ZIP);
let used = "";
let py = spawnSync("python3", ["-m", "zipfile", "-c", ZIP, "."], { cwd: OUT });
if (py.status === 0) used = "python3 zipfile";
else {
    // fallback: stored (uncompressed) zip via system `zip`
    const z = spawnSync("zip", ["-r", "-q", ZIP, "."], { cwd: OUT });
    if (z.status === 0) used = "zip";
    else { console.error("no python3/zip available to package"); }
}
ok(`dist/szmelc-rce.zip written via ${used}`);

function ok(m) { console.log("  \x1b[32m✓\x1b[0m " + m); }

console.log("\n" + "─".repeat(48));
console.log(`\x1b[32m\x1b[1mBuild complete.\x1b[0m`);
console.log(`  load-unpacked : ${OUT}`);
console.log(`  zip           : ${ZIP}`);
console.log(`  extension id  : fcoeoabgfenejglbffodgkkbkcdhcgfn  (from manifest key)`);
console.log("\nNext: chrome://extensions -> Developer mode -> Load unpacked -> pick the dist folder,\n      or install via your update_url. Open options.html to change endpoints.\n");
