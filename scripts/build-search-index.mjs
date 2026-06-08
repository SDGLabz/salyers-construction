// Build a LEAN client search index from data/ -> public/search-index.json.
//
// The site-wide ⌘K search (Fuse.js) loads this file lazily on first open. It is
// intentionally small: only the fields needed to match + display + link a
// result — never the full product records (those are huge HTML blobs).
//
// Re-run whenever data/ changes:  node scripts/build-search-index.mjs
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "data");
const PUB = path.join(ROOT, "public");
const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));

const products = read("products.json");
const applications = read("applications.json");
const industries = read("industries.json");
const certifications = read("certifications.json");
const purposes = read("product-purposes.json");
const areas = read("application-areas.json");
const series = read("product-series.json");
const caseStudies = read("case-studies.json");

const nameBySlug = (arr) => Object.fromEntries(arr.map((x) => [x.slug, x.name]));
const purposeName = nameBySlug(purposes);
const areaName = nameBySlug(areas);
const seriesName = nameBySlug(series);
const certText = Object.fromEntries(
  certifications.map((c) => [c.slug, [c.name, c.fullName].filter(Boolean).join(" ")]),
);

const stripHtml = (s) => (s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const lookup = (slugs, map) => (slugs || []).map((s) => map[s]).filter(Boolean);

// ── Synonym / intent map ──
// Maps common problem-language queries to the product/area terms they should match.
// Added to keyword fields so Fuse catches them without a manual thesaurus.
const SYNONYMS = {
  "leak": "leak sealing pipe repair emergency containment",
  "rust": "corrosion corrosion protection metal repair",
  "corrosion": "rust oxidation metal loss protective coating erosion-corrosion",
  "wear": "erosion abrasion worn cavitation",
  "floor": "flooring screed anti-slip resurfacing epoxy floor coating",
  "tank": "tank lining containment vessel storage chemical resistance",
  "pipe": "pipeline piping pipe repair composite wrap leak sealing",
  "pump": "pump impeller casing cavitation erosion rebuild",
  "heat exchanger": "tube sheet exchanger cooling water condenser",
  "marine": "ship offshore ballast hull vessel deck",
  "concrete": "concrete repair screed resurfacing spall crack",
  "chemical": "chemical resistance acid alkali immersion",
  "cold repair": "no hot work cold-applied in-situ in situ",
  "emergency": "emergency leak live leak 24/7 urgent",
  "food": "food contact FDA USDA hygienic washdown",
  "water": "potable water NSF drinking water wastewater",
  "coating": "protective coating lining barrier immersion",
  "composite": "composite wrap repair reinforcement",
};

const records = [];

// Products — the core, fully linkable to detail pages. Keywords pull in the
// human names of the product's purposes/application-areas/certifications so a
// problem-based query ("corrosion under insulation", "potable water") matches.
for (const p of products) {
  const basekw = [
    p.skuFnNumber,
    p.productSubtitle,
    p.taglineHeadline,
    stripHtml(p.shortDescription),
    p.series ? seriesName[p.series] : null,
    ...lookup(p.productPurposes, purposeName),
    ...lookup(p.applicationAreasReference2, areaName),
    ...lookup(p.certifications2, certText),
  ]
    .filter(Boolean)
    .join(" ");

  // Expand synonyms
  const expandedParts = [basekw];
  for (const [trigger, expansion] of Object.entries(SYNONYMS)) {
    if (basekw.toLowerCase().includes(trigger)) {
      expandedParts.push(expansion);
    }
  }
  const kw = expandedParts.join(" ");

  records.push({
    type: "product",
    title: p.name,
    sub: p.productSubtitle || (p.series && seriesName[p.series]) || p.skuFnNumber || "Product",
    href: `/products/${p.slug}`,
    kw,
  });
}

// Applications — link to their real pages
for (const a of applications) {
  records.push({
    type: "application",
    title: a.nameLong || a.name,
    sub: "Application",
    href: `/applications/${a.slug}`,
    kw: a.name || "",
  });
}

// Industries — link to real pages
for (const i of industries) {
  records.push({
    type: "industry",
    title: i.nameLong || i.name,
    sub: "Industry",
    href: `/industries/${i.slug}`,
    kw: i.descriptionShort || "",
  });
}

// Certifications — link to approvals page anchors
for (const c of certifications) {
  records.push({
    type: "certification",
    title: c.name,
    sub: c.fullName || "Certification",
    href: `/approvals#${c.slug}`,
    kw: [c.fullName, c.certifyingBody].filter(Boolean).join(" "),
  });
}

// Case studies — link to detail pages
for (const cs of caseStudies) {
  records.push({
    type: "case-study",
    title: cs.title,
    sub: `${cs.industry} — Case Study`,
    href: `/case-studies/${cs.slug}`,
    kw: [cs.industry, ...(cs.tags || []), cs.summary?.slice(0, 120)].filter(Boolean).join(" "),
  });
}

fs.mkdirSync(PUB, { recursive: true });
const out = path.join(PUB, "search-index.json");
fs.writeFileSync(out, JSON.stringify(records));
const byType = records.reduce((a, r) => ((a[r.type] = (a[r.type] || 0) + 1), a), {});
const kb = (fs.statSync(out).size / 1024).toFixed(1);
console.log(`Search index: ${records.length} records (${kb} KB) -> public/search-index.json`);
console.log(byType);
