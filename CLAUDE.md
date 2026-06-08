@AGENTS.md

# Salyers Construction — project status & resume

Rebuild of the approved Webflow site (sdg-salyers.webflow.io) on the spidercraft
stack. Plan: `~/.claude/plans/https-sdg-salyers-webflow-io-this-websit-quizzical-crayon.md`

## Working with Ian
Beginner coder — explain plainly, work in **small verified batches**, gate every
commit on green `tsc`+`eslint`+`next build`, deploy, then let him test on the live
URL before the next batch. Ask before big/irreversible decisions. **Accuracy is
priority #1 — never fabricate company/spec/credential data; surface gaps.**

## Deploy = PREBUILT only (plain `vercel deploy` jams on this account)
```
vercel build --prod --yes
vercel deploy --prebuilt --prod --yes --archive=tgz --scope ianciamarra-4639s-projects
```
GitHub: `SDGLabz/salyers-construction` (PUBLIC). Live: https://salyers-construction.vercel.app

## Brand (re-skinned from the Webflow site)
Pine-green primary `#1f6b4a`, ink `#0f2c24`, electric-green accent `#3beb64`
(dark-band / fill ONLY — fails on white; use `#0f7a35` for accent text on light),
warm off-white surfaces, Lato + IBM Plex Mono. Tokens live in `app/globals.css`
(`@theme` + `:root`).

## Status — Batch 0 (scaffold) DONE
Cloned the BBR scaffold; stripped its data/pages/catalog; re-skinned tokens + chrome
(nav, footer, mobile menu = Salyers; 24/7 emergency CTA removed; primary CTA =
"Request a Bid"). Homepage shell + 10 interior pages (seismic, coatings, about,
certifications, service-area, contact, projects, faq, privacy, terms) as
real-but-minimal pages. Build green; 11 routes + sitemap + robots. The BBR quote
wizard still exists in `lib/components/` (re-mapped in B3, not yet wired).

## ▶ Next batches
B1 data model (lib/catalog types + hand-authored `data/*.json`) · B2 pull real images
via Webflow MCP (site id `6a0372a06b38f56e1c302ecb`) · B3 quote wizard (4 paths:
bid / drawings / coatings-sample / inquiry) + `api/quote` Resend + `/contact` launcher ·
B4 home · B5 seismic · B6 coatings · B7 about+certs · B8 service-area + projects ·
B9 faq/legal/search/JSON-LD · B10 QA + launch prep.

## Gotchas
- Next 16: route `params` is async (`await params`).
- Interior pages = `app/(site)/` route group (shared chrome); homepage `app/page.tsx`
  has its own chrome.
- `lib/site.ts` `SITE_URL` → swap to the real domain at launch.
- GateGuard hook denies the FIRST write to each file and allows the retry (expected).
- Launch-gated (need Ian/Nick): `RESEND_API_KEY` + a verified sending domain; real
  project photos/case studies; confirm cert wording (Tyfo applicator, Polymer Nation
  "trained"); full privacy/terms + counsel review; production domain → flip SITE_URL.
