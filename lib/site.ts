// Canonical site URL for metadata, canonical tags, sitemap, and JSON-LD.
// Production domain — live as of the 2026-06 DNS cutover to Vercel.
// Uses the www form because Vercel serves www as the primary domain
// (apex salyersgc.com 308-redirects to www) — keeps the sitemap/canonical
// URLs matching the URLs that actually return 200.
export const SITE_URL = "https://www.salyersgc.com";
export const SITE_NAME = "Salyers Construction";

/**
 * Build an SEO <title> that stays within the ~65-character limit crawlers flag
 * as "too long". Appends the fullest brand suffix that still fits, falling back
 * to a short brand tag, and only truncates the core text as a last resort.
 *   seoTitle("Seismic FRP Retrofit California")  → "… | Salyers Construction"
 */
export function seoTitle(
  core: string,
  suffix: string = SITE_NAME,
  max: number = 64,
): string {
  core = core.replace(/\s+/g, " ").trim();
  const full = `${core} | ${suffix}`;
  if (full.length <= max) return full;
  const short = `${core} | Salyers`;
  if (short.length <= max) return short;
  if (core.length <= max) return core;
  return core.slice(0, max - 1).replace(/\s+\S*$/, "").trim() + "…";
}
