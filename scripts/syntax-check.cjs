#!/usr/bin/env node
/** Syntax-check every .js in the extension as an ES module. Zero deps. */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = __dirname.replace(/\/scripts$/, "");
const jsFiles = [];
(function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        if (e.name === "node_modules" || e.name === ".git") continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith(".js")) jsFiles.push(p);
    }
})(root);

let bad = 0;
for (const f of jsFiles) {
    const src = fs.readFileSync(f, "utf8");
    try {
        // New-expression parse via node's module syntax check on stdin.
        execFileSync(process.execPath, ["--input-type=module", "--check"],
            { input: src, stdio: ["pipe", "pipe", "pipe"] });
    } catch (err) {
        bad++;
        console.error("FAIL:", path.relative(root, f));
        console.error(err.stderr ? err.stderr.toString().trim() : err.message);
    }
}
console.log(`${jsFiles.length - bad}/${jsFiles.length} JS files parse OK`);
process.exit(bad ? 1 : 0);
