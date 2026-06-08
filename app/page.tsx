import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/lib/components/site-chrome";
import { PageHero } from "@/lib/components/page-hero";
import { getFrpTypes, getSectors, getMarketBySlug } from "@/lib/catalog";
import { CONTACT } from "@/lib/contact";
import { SITE_URL, seoTitle } from "@/lib/site";
import "./home.css";

export const metadata: Metadata = {
  title: seoTitle("Seismic FRP Retrofit & Industrial Coatings California"),
  description:
    "Salyers Construction is a California B1 general contractor (#960653, since 2011) for seismic FRP retrofit and industrial epoxy coatings statewide — Sacramento, the Bay Area, Los Angeles, and San Diego. Installed from engineer-of-record drawings.",
};

// Arrow glyph reused on links/CTAs.
function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Match each FRP type to a real structural photo + accurate alt text.
const FRP_PHOTO: Record<string, { src: string; alt: string }> = {
  "column-jacketing": {
    src: "/images/jobs/job-8292.jpg",
    alt: "Carbon fiber fabric wrapped around a reinforced concrete column for seismic confinement",
  },
  "shear-strengthening": {
    src: "/images/jobs/job-8288.jpg",
    alt: "FRP fabric bonded to a concrete beam web to add shear capacity",
  },
  "flexural-strengthening": {
    src: "/images/jobs/job-5700.jpg",
    alt: "Externally bonded fiber reinforced polymer on the underside of a concrete deck",
  },
  "beam-column-joints": {
    src: "/images/jobs/job-8293.jpg",
    alt: "Bidirectional FRP fabric and anchorage at a concrete beam-column joint",
  },
};

export default function HomePage() {
  const frpTypes = getFrpTypes();
  // The four FRP capabilities called out in the spec (in display order).
  const frpFour = ["column-jacketing", "shear-strengthening", "flexural-strengthening", "beam-column-joints"]
    .map((slug) => frpTypes.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const sectors = getSectors();
  // Coating markets mixed into the "Who we serve" photo grid.
  const coatingMarkets = ["food-beverage", "manufacturing", "automotive"]
    .map((slug) => getMarketBySlug(slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#org`,
    name: CONTACT.legalName,
    legalName: CONTACT.legalName,
    url: SITE_URL,
    telephone: "+1-530-557-7770",
    email: CONTACT.email,
    foundingDate: "2011",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      postalCode: CONTACT.postalCode,
      addressCountry: "US",
    },
    areaServed: { "@type": "State", name: "California" },
    knowsAbout: [
      "Seismic FRP retrofit",
      "Carbon fiber strengthening",
      "Industrial epoxy floor coatings",
      "Resinous flooring",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "CSLB B1 #960653",
    },
    slogan: "Engineered to strengthen. Built to spec.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main id="main" className="site-main" tabIndex={-1}>
        {/* (1) HERO — structural photo dimmed behind */}
        <PageHero
          image="/images/jobs/courthouse-merced.jpg"
          eyebrow="California B1 General Contractor · #960653 · Since 2011"
          title={
            <>
              Engineered to <em>strengthen</em>. Built to spec.
            </>
          }
          lead="Seismic FRP retrofit and industrial coatings, statewide California. We install Henkel and LOCTITE Tyfo composite systems and American-made resinous floors from engineer-of-record drawings — on commercial, industrial, multifamily, and infrastructure assets."
        >
          <Link href="/contact" className="btn btn-primary">
            Request a Bid
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Send Drawings
          </Link>
        </PageHero>

        {/* (2) REAL-CREDENTIALS STRIP */}
        <section className="sec" aria-label="Credentials">
          <div className="wrap">
            <div className="cred-strip">
              <div className="cred-item">
                <b>Since 2011</b>
                <span>Building across California</span>
              </div>
              <div className="cred-item">
                <b>CA B1 #960653</b>
                <span>Licensed general contractor</span>
              </div>
              <div className="cred-item">
                <b>Statewide California</b>
                <span>NorCal primary, statewide for the right job</span>
              </div>
              <div className="cred-item">
                <b>Seismic FRP + Coatings</b>
                <span>Two lines, one engineering standard</span>
              </div>
              <div className="cred-item">
                <b>1–2 business days</b>
                <span>Written, itemized bids back fast</span>
              </div>
            </div>
          </div>
        </section>

        {/* (3) TWO LINES OF WORK — featured service cards */}
        <section className="sec sec--cream" aria-labelledby="svc-h">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">Explore what we do</div>
              <h2 id="svc-h">Two lines of work. One engineering standard.</h2>
              <p className="lede">
                Drawings, spec, install. Engineering in front, hands behind it —
                structural strengthening with externally bonded fiber, and
                industrial resinous floors, both installed to a certified spec
                and documented at handover.
              </p>
            </div>
            <div className="hx-svc">
              <Link href="/seismic" className="hx-svc-card">
                <div className="hx-svc-media">
                  <Image
                    src="/images/jobs/job-5693.jpg"
                    alt="Crew bonding carbon fiber fabric to a reinforced concrete structure during a seismic retrofit"
                    fill
                    sizes="(max-width: 860px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="hx-svc-body">
                  <span className="eyebrow">Seismic FRP</span>
                  <h3>Seismic Retrofitting &amp; FRP Strengthening</h3>
                  <p>
                    Carbon and glass fabric, structurally bonded — column
                    jacketing, shear and flexural strengthening, beam-column
                    joints, masonry retrofit, and infrastructure, installed from
                    EOR drawings to the Henkel and LOCTITE Tyfo system.
                  </p>
                  <span className="hx-svc-go">
                    Explore seismic FRP <Arrow />
                  </span>
                </div>
              </Link>
              <Link href="/coatings" className="hx-svc-card">
                <div className="hx-svc-media">
                  <Image
                    src="/images/jobs/job-3253.jpg"
                    alt="Decorative flake epoxy resin floor system installed on an industrial concrete slab"
                    fill
                    sizes="(max-width: 860px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="hx-svc-body">
                  <span className="eyebrow">Industrial coatings</span>
                  <h3>Epoxy &amp; Resinous Floor Coatings</h3>
                  <p>
                    The other half of the shop — American-made epoxy,
                    polyaspartic, polyurethane, and urethane-concrete systems for
                    industrial floors, parking decks, and high-traffic
                    commercial, installed per the manufacturer&apos;s data sheets.
                  </p>
                  <span className="hx-svc-go">
                    Explore coatings <Arrow />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* (4) WHAT FRP DOES — 4 cards from catalog */}
        <section className="sec" aria-labelledby="frp-h">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">What FRP does</div>
              <h2 id="frp-h">From bare concrete to structurally bonded.</h2>
              <p className="lede">
                Externally bonded fiber adds tensile capacity, confinement, and
                ductility without adding meaningful mass — placed exactly where
                the engineer of record calls for it.
              </p>
            </div>
            <div className="mkt-grid">
              {frpFour.map((t) => {
                const photo = FRP_PHOTO[t.slug];
                return (
                  <article key={t.slug} className="mkt-tile">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="mkt-label">
                      <b>{t.name}</b>
                      <span>{t.whatItDoes}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* (5) WHO WE SERVE — full-bleed photo grid, sectors + coating markets */}
        <section className="sec sec--cream" aria-labelledby="serve-h">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">Who we serve</div>
              <h2 id="serve-h">Built for owners, engineers, and agencies.</h2>
              <p className="lede">
                Structural strengthening and industrial floors for the people who
                own, design, and approve the work — commercial, industrial,
                multifamily, infrastructure, and the facilities behind them.
              </p>
            </div>
            <div className="mkt-grid mkt-grid--feat">
              <article className="mkt-tile">
                <Image
                  src="/images/jobs/courthouse-merced.jpg"
                  alt="Historic Merced County Courthouse, a masonry structure of the kind addressed by California seismic retrofit work"
                  fill
                  sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="mkt-label">
                  <b>{sectors[0]?.name}</b>
                  <span>{sectors[0]?.blurb}</span>
                </div>
              </article>
              {sectors.slice(1).map((s, i) => {
                const photos = [
                  { src: "/images/jobs/job-8294.jpg", alt: "Industrial process piping and ductwork in a plant environment served by FRP and coatings" },
                  { src: "/images/jobs/job-d.jpg", alt: "Multifamily and mixed-use building exterior of the type subject to California retrofit ordinances" },
                  { src: "/images/jobs/job-f.jpg", alt: "Concrete infrastructure structure of the kind strengthened with externally bonded FRP" },
                ];
                const p = photos[i];
                return (
                  <article key={s.slug} className="mkt-tile">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="mkt-label">
                      <b>{s.name}</b>
                      <span>{s.blurb}</span>
                    </div>
                  </article>
                );
              })}
              {coatingMarkets.map((m, i) => {
                const photos = [
                  { src: "/images/jobs/job-1358.jpg", alt: "Glossy seamless epoxy floor in a clean food and beverage processing space" },
                  { src: "/images/jobs/job-6936.jpg", alt: "Dark high-build epoxy floor system installed on a manufacturing production floor" },
                  { src: "/images/jobs/job-b.jpg", alt: "Glossy resinous floor coating in an automotive service interior" },
                ];
                const p = photos[i];
                return (
                  <article key={m.slug} className="mkt-tile">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="mkt-label">
                      <b>{m.name}</b>
                      <span>{m.blurb}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* (6) HOW A JOB RUNS — 3-step process */}
        <section className="sec" aria-labelledby="proc-h">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">How a job runs</div>
              <h2 id="proc-h">EOR drawings in. A spec engineered. A bid back.</h2>
              <p className="lede">
                We are honest about the shape of the company: the structural work
                is technical and the spec is written by other engineers. We bid
                and install to that package, with documented QA at handover.
              </p>
            </div>
            <div className="hx-steps">
              <article className="hx-step">
                <span className="hx-step-no">01</span>
                <h3>EOR drawings in</h3>
                <p>
                  The structural engineer of record issues the design intent —
                  members, demand, target capacity, performance objective, and
                  anchor calls. For coatings, we profile the slab and the wear,
                  chemical, and traffic it actually sees.
                </p>
              </article>
              <article className="hx-step">
                <span className="hx-step-no">02</span>
                <h3>System engineering</h3>
                <p>
                  Henkel and LOCTITE in-house engineers produce
                  application-specific drawings off the EOR documents — fabric,
                  orientation, layers, overlap, anchorage. Coatings get matched to
                  a Polymer Nation system against the manufacturer&apos;s data
                  sheets.
                </p>
              </article>
              <article className="hx-step">
                <span className="hx-step-no">03</span>
                <h3>Bid, mobilize, install</h3>
                <p>
                  Written, itemized bids back inside 1 to 2 business days. On
                  award we mobilize, prepare the substrate, and install primer,
                  fabric, and saturant — or primer, body coat, and topcoat — with
                  cure verification and QA documentation at sign-off.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* (7) COATINGS TEASER — alternating photo + text feature */}
        <section className="sec sec--cream" aria-labelledby="coat-h">
          <div className="wrap">
            <div className="feature reverse">
              <div className="feature-media">
                <Image
                  src="/images/jobs/job-1358.jpg"
                  alt="Glossy poured epoxy resin floor reflecting overhead light in an industrial interior"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="feature-body">
                <div className="eyebrow">The other half of the shop</div>
                <h2 id="coat-h">American-made resin systems.</h2>
                <p>
                  Epoxy floor systems for industrial floors, parking decks,
                  residential, and high-traffic commercial. 100 percent solids
                  epoxies, polyaspartics and polyureas, high-performance topcoats,
                  urethane concrete, and chemical-resistant systems.
                </p>
                <p>
                  The resins are American-made and the applicator path is direct:
                  we order from Polymer Nation, install per their data sheets, and
                  back the work with their warranty when project conditions
                  qualify.
                </p>
                <Link href="/coatings" className="btn btn-outline">
                  Explore coatings
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* (8) CTA BAND -> /contact */}
        <section className="sec" aria-labelledby="cta-h">
          <div className="wrap">
            <div className="cta-band">
              <div className="cta-band-inner">
                <div>
                  <div className="eyebrow">Got a project flagged for retrofit?</div>
                  <h2 id="cta-h">Written, itemized bids back inside 1 to 2 business days.</h2>
                  <p>
                    Send the engineer-of-record drawings or the floor scope. We
                    spec the system, bid it itemized, and install it to that
                    package across California.
                  </p>
                </div>
                <div className="cta-band-actions">
                  <Link href="/contact" className="btn btn-primary">
                    Request a Bid
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Send Drawings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
