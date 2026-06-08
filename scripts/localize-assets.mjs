// Localize Webflow CDN assets into Vercel Blob.
//
// Reads every asset URL referenced in migration/raw (the canonical Webflow
// export — order-independent, always holds the original cdn.prod.website-files.com
// URLs), downloads each file, and uploads it to our public Blob store under a
// stable, deterministic pathname. Builds migration/asset-map.json mapping the
// original Webflow URL -> the public Blob URL. The transform then rewrites
// data/*.json using that map, so the site no longer depends on Webflow's CDN.
//
// Idempotent: URLs already in the manifest are skipped, so re-runs only fill
// gaps. Stable pathnames (addRandomSuffix:false) mean a forced re-upload
// overwrites in place rather than duplicating.
//
// Run (token comes from .env.local, created by `vercel blob create-store`):
//   node --env-file=.env.local scripts/localize-assets.mjs            # full run
//   node --env-file=.env.local scripts/localize-assets.mjs --sample   # 2 of each type (smoke test)
//   node --env-file=.env.local scripts/localize-assets.mjs --limit 50 # first N only
//   node --env-file=.env.local scripts/localize-assets.mjs --force    # re-upload even if mapped
import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { put } from "@vercel/blob";

const exec = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, "migration/raw");
const MANIFEST = path.join(ROOT, "migration/asset-map.json");

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN. Run with: node --env-file=.env.local scripts/localize-assets.mjs");
  process.exit(1);
}

// --- args ---
const argv = process.argv.slice(2);
const FORCE = argv.includes("--force");
const SAMPLE = argv.includes("--sample");
const limitArg = argv.find((a) => a.startsWith("--limit"));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1] ?? argv[argv.indexOf(limitArg) + 1], 10) : null;

const CONCURRENCY = 6; // well under Hobby's 15 advanced-ops/sec Blob limit
const MIME = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp",
  avif: "image/avif", gif: "image/gif", svg: "image/svg+xml", pdf: "application/pdf",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- collect every Webflow CDN asset URL from migration/raw ---
// Generic: matches URLs in asset-object `url` fields AND bare URLs embedded in
// Link/PlainText/RichText strings (e.g. industry brochure PDFs on a different
// Webflow bucket), so nothing referencing Webflow is left behind.
const urls = new Set();
const CDN_URL_RE = /https?:\/\/[^\s"'<>\\]*website-files\.com[^\s"'<>\\]*/gi;
const walk = (o) => {
  if (o == null) return;
  if (typeof o === "string") {
    const m = o.match(CDN_URL_RE);
    if (m) m.forEach((u) => urls.add(u));
    return;
  }
  if (Array.isArray(o)) return o.forEach(walk);
  if (typeof o === "object") {
    for (const [k, v] of Object.entries(o)) {
      // asset objects use a `url` field — capture it whole (URLs may contain
      // literal spaces, which the regex would truncate). Other fields may hold
      // bare URLs in prose/links — scan those with the regex.
      if (k === "url" && typeof v === "string" && v.includes("website-files.com")) urls.add(v.trim());
      else walk(v);
    }
  }
};
const walkDir = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(p);
    else if (e.name.endsWith(".json")) walk(JSON.parse(fs.readFileSync(p, "utf8")));
  }
};
walkDir(RAW);

const extOf = (url) => {
  const m = url.split("?")[0].match(/\.([a-z0-9]{2,5})$/i);
  return m ? m[1].toLowerCase() : "";
};

// stable, collision-free pathname: the Webflow filename already starts with a
// unique 24-hex asset id, so sanitizing it keeps uniqueness.
const blobPath = (url) => {
  const base = new URL(url).pathname.split("/").pop();
  const clean = base.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return "cms/" + clean;
};

// --- choose work set ---
let all = [...urls];
if (SAMPLE) {
  const pick = (test, n) => all.filter(test).slice(0, n);
  all = [
    ...pick((u) => /\.(jpe?g)$/i.test(u.split("?")[0]), 2),
    ...pick((u) => /\.png$/i.test(u.split("?")[0]), 1),
    ...pick((u) => /\.webp$/i.test(u.split("?")[0]), 1),
    ...pick((u) => /\.svg$/i.test(u.split("?")[0]), 2),
    ...pick((u) => /\.pdf$/i.test(u.split("?")[0]), 2),
  ];
} else if (LIMIT) {
  all = all.slice(0, LIMIT);
}

// --- load existing manifest (resume) ---
let manifest = {};
if (fs.existsSync(MANIFEST)) manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const saveManifest = () => fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

const byExt = all.reduce((acc, u) => ((acc[extOf(u) || "?"] = (acc[extOf(u) || "?"] || 0) + 1), acc), {});
console.log(`Found ${urls.size} unique Webflow assets in migration/raw.`);
console.log(`Work set this run: ${all.length}`, JSON.stringify(byExt));
console.log(`Already mapped: ${all.filter((u) => manifest[u]).length}${FORCE ? " (ignored — --force)" : " (will skip)"}\n`);

const todo = all.filter((u) => FORCE || !manifest[u]);
if (!todo.length) {
  console.log("Nothing to upload — manifest already complete for this set.");
  process.exit(0);
}

// --- download + upload with retry ---
async function withRetry(fn, label, tries = 4) {
  let last;
  for (let a = 0; a < tries; a++) {
    try { return await fn(); }
    catch (e) { last = e; await sleep(600 * (a + 1) * (a + 1)); }
  }
  throw new Error(`${label}: ${last && last.message ? last.message : last}`);
}

let done = 0, failed = 0;
const failures = [];
async function handle(url) {
  const ext = extOf(url);
  const contentType = MIME[ext] || "application/octet-stream";
  const pathname = blobPath(url);
  try {
    const buf = await withRetry(async () => {
      // Encode only literal spaces (curl rejects them as malformed). Don't use
      // encodeURI — it re-encodes the % in already-encoded URLs (%20 -> %2520 -> 403).
      const fetchUrl = url.replace(/ /g, "%20");
      const { stdout } = await exec("curl", ["-fsSL", "--max-time", "120", fetchUrl], {
        encoding: "buffer", maxBuffer: 256 * 1024 * 1024,
      });
      if (!stdout || stdout.length === 0) throw new Error("empty download");
      return stdout;
    }, "download");
    const res = await withRetry(
      () => put(pathname, buf, { access: "public", addRandomSuffix: false, contentType, token: TOKEN }),
      "upload",
    );
    manifest[url] = res.url;
    done++;
    if (done % 25 === 0) { saveManifest(); console.log(`  …${done}/${todo.length} uploaded`); }
  } catch (e) {
    failed++;
    failures.push({ url, error: String(e.message || e) });
  }
}

// --- bounded concurrency pool ---
let cursor = 0;
async function worker() {
  while (cursor < todo.length) {
    const u = todo[cursor++];
    await handle(u);
  }
}
console.log(`Uploading ${todo.length} assets at concurrency ${CONCURRENCY}…`);
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, todo.length) }, worker));
saveManifest();

console.log(`\nDone. Uploaded ${done}, failed ${failed}. Manifest now has ${Object.keys(manifest).length} entries -> ${path.relative(ROOT, MANIFEST)}`);
if (failed) {
  console.log("\nFAILURES (re-run to retry — they are not in the manifest):");
  for (const f of failures.slice(0, 30)) console.log(`  ${f.url}\n    ${f.error}`);
  if (failures.length > 30) console.log(`  …and ${failures.length - 30} more`);
  process.exit(1);
}
