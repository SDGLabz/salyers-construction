import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { Accordion } from "@/lib/components/accordion";
import { ColorExplorer, type ColorCategory } from "@/lib/components/color-explorer";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import {
  getServiceBySlug,
  getMarkets,
  getBenefits,
  getCoatingSystems,
  getFaqsByTopic,
} from "@/lib/catalog";
import colorData from "@/data/coating-colors.json";
import "./coatings.css";

const service = getServiceBySlug("coatings");
const markets = getMarkets();
const benefits = getBenefits();
const systems = getCoatingSystems();
const faqs = getFaqsByTopic("coatings");

export const metadata: Metadata = {
  title: seoTitle("Industrial Epoxy & Resinous Floor Coatings California"),
  description:
    service?.metaDescription ??
    "Polymer Nation American-made epoxy, polyaspartic, polyurethane, and urethane concrete floor systems for industrial, commercial, and parking decks across Northern California and statewide for the right job.",
  alternates: { canonical: `${SITE_URL}/coatings` },
};

// One real, on-topic industry floor photo per market (localized), mapped 1:1 to
// the 12 coatings markets. Alt text describes the scene; object-position keeps
// the floor — not the ceiling — in frame under the label gradient.
const MARKET_PHOTO: Record<string, { src: string; alt: string; pos: string }> = {
  "animal-care": { src: "/images/markets/pc-animal-care.jpg", alt: "Seamless resinous floor in a veterinary and animal-care facility", pos: "center 72%" },
  automotive: { src: "/images/markets/pc-automotive.jpg", alt: "High-gloss epoxy floor in an automotive service and dealership space", pos: "center 60%" },
  "commercial-industrial": { src: "/images/markets/pc-commercial-industrial.jpg", alt: "Resinous floor coating across a commercial-industrial building", pos: "center 60%" },
  corrections: { src: "/images/markets/pc-corrections.jpg", alt: "Durable seamless epoxy floor in a corrections facility dayroom", pos: "center 72%" },
  "food-beverage": { src: "/images/markets/pc-food-beverage.jpg", alt: "Sanitary resinous floor in a food and beverage production area", pos: "center 60%" },
  "grocery-retail": { src: "/images/markets/pc-grocery-retail.jpg", alt: "Polished resinous floor down a grocery and retail aisle", pos: "center 60%" },
  "healthcare-fitness": { src: "/images/markets/pc-healthcare-fitness.jpg", alt: "Seamless hygienic floor in a healthcare and fitness facility", pos: "center 55%" },
  "hospitality-entertainment": { src: "/images/markets/pc-hospitality-entertainment.jpg", alt: "Decorative resinous floor in a hospitality and entertainment venue", pos: "center 55%" },
  manufacturing: { src: "/images/markets/pc-manufacturing.jpg", alt: "Heavy-duty epoxy floor on a manufacturing plant floor", pos: "center 60%" },
  municipalities: { src: "/images/markets/pc-municipalities.jpg", alt: "Resinous floor in a municipal and civic facility", pos: "center 60%" },
  "pharmaceutical-biotech": { src: "/images/markets/pc-pharmaceutical-biotech.jpg", alt: "Cleanroom-grade resinous floor in a pharmaceutical and biotech lab", pos: "center 55%" },
  "aviation-transportation": { src: "/images/markets/pc-aviation-transportation.jpg", alt: "Seamless resinous floor in an aviation and transportation facility", pos: "center 60%" },
};

const benefitIcons: Record<string, ReactNode> = {
  "built-to-last": <path d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6" />,
  "chemical-resistance": (
    <path d="M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3M9 3h6M7 14h10" />
  ),
  "seamless-hygienic": <path d="M3 12h18M3 7h18M3 17h18" />,
  "slip-resistant-safety": (
    <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
  ),
  "low-maintenance": <path d="M14 4l6 6L9 21H3v-6L14 4ZM12 6l6 6" />,
  "long-term-value": (
    <path d="M12 2v20M5 9c0-2 2-3 7-3s7 1 7 3-2 3-7 3-7 1-7 3 2 3 7 3 7-1 7-3" />
  ),
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Industrial Floor Coatings",
  name: "Industrial Epoxy & Resinous Floor Coatings",
  description:
    "American-made epoxy, polyaspartic, polyurethane, urethane concrete, patching and joint repair, chemical-resistant, and decorative resinous floor systems installed per manufacturer data sheets.",
  provider: {
    "@type": "GeneralContractor",
    name: CONTACT.legalName,
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      postalCode: CONTACT.postalCode,
      addressCountry: "US",
    },
  },
  areaServed: { "@type": "State", name: "California" },
  url: `${SITE_URL}/coatings`,
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Industrial Coatings",
      item: `${SITE_URL}/coatings`,
    },
  ],
};

export default function CoatingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="Industrial epoxy & resinous coatings"
        title={
          <>
            Resinous floor systems. <em>American-made</em> resins.
          </>
        }
        lead="Epoxy, polyaspartic and polyurea, polyurethane, and urethane concrete systems for industrial floors, parking decks, residential, and high-traffic commercial. Northern California primary, statewide for the right project."
        image="/images/jobs/job-1358.jpg"
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* ---- Floors that work for a living (overview) ---- */}
      <section className="sec wrap" data-glow>
        <div className="sec-head">
          <div className="eyebrow">Floors that work for a living</div>
          <h2>The floor is part of the operation, not decoration.</h2>
          <p className="lede">
            We build floors for industrial and commercial environments where the
            floor takes the load: substrate-specific surface preparation, and a
            system spec matched to the wear, chemical, and traffic profile.
          </p>
        </div>
        <div className="ov2">
          <div className="ov2-main">
            {service?.overview.map((para) => (
              // Keep Polymer Nation framed as "trained" (not "certified") —
              // accuracy correction applied at render without mutating catalog.
              <p key={para.slice(0, 24)}>
                {para.replace(
                  /factory-trained and certified on every system/gi,
                  "factory-trained on every system",
                )}
              </p>
            ))}
          </div>
          <aside className="ov2-aside">
            <h3>The other half of the shop</h3>
            <p
              style={{
                color: "var(--text-2)",
                fontSize: "15px",
                lineHeight: 1.6,
                marginBottom: "12px",
              }}
            >
              Industrial coatings rounds out the seismic work. The applicator
              path is direct: we order from the manufacturer, install per their
              data sheets, and back the work with their warranty when project
              conditions qualify.
            </p>
            <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
          </aside>
        </div>
      </section>

      {/* ---- How a coatings job runs (steps as cards, subtle cursor glow) ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">How a coatings job runs</div>
            <h2>From slab profile to a signed-off floor.</h2>
            <p className="lede">
              We don&rsquo;t pour a coating onto whatever is already there. We read the
              slab and the way the floor gets used, then install the system to the
              manufacturer&rsquo;s method and document it at handover.
            </p>
          </div>
          <div className="cx-steps">
            {service?.workflow.map((step) => (
              <article key={step.step} className="feat-card fb-card">
                <span className="cx-stepno">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Markets (12 photo tiles) ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Markets we coat</div>
            <h2>Industrial and commercial floors across California.</h2>
            <p className="lede">
              From food and beverage washdown areas to manufacturing lines and
              parking decks, we spec the system to the way each floor actually
              gets used.
            </p>
          </div>
          <div className="mkt-grid mkt-grid--feat">
            {markets.map((m, i) => {
              const photo = MARKET_PHOTO[m.slug] ?? MARKET_PHOTO["commercial-industrial"];
              // First tile is the 2x2 feature (~66vw on desktop); the rest are
              // ~33vw. Only the feature tile sits near the fold, so it loads
              // eagerly under the scrim; the rest stay lazy with q40.
              const isFeature = i === 0;
              return (
                <div key={m.slug} className="mkt-tile">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    quality={40}
                    loading={isFeature ? "eager" : "lazy"}
                    sizes={
                      isFeature
                        ? "(max-width: 540px) 100vw, (max-width: 999px) 50vw, 66vw"
                        : "(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
                    }
                    style={{ objectFit: "cover", objectPosition: photo.pos }}
                  />
                  <div className="mkt-label">
                    <b>{m.name}</b>
                    <span>{m.blurb}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- 6 epoxy benefits ---- */}
      <section className="sec wrap">
        <div className="sec-head">
          <div className="eyebrow">Why resinous flooring</div>
          <h2>Six reasons engineers and owners spec epoxy.</h2>
          <p className="lede">
            Properly installed resinous systems outlast and outperform tile,
            sealed concrete, and VCT in the environments that punish a floor
            hardest.
          </p>
        </div>
        <div className="feat3">
          {benefits.map((b) => (
            <article key={b.slug} className="feat-card">
              <div className="feat-ico" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {benefitIcons[b.slug]}
                </svg>
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---- Polymer Nation / American-made band ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="cx-made">
            <div className="cx-made-body">
              <div className="eyebrow">American-made</div>
              <h2>The resins are American-made. The path is direct.</h2>
              <p>
                We install American-made resinous floor systems. We order direct
                from the manufacturer, install per their published data sheets, and
                back the work with the manufacturer&rsquo;s warranty when project
                conditions qualify.
              </p>
              <ul className="cx-made-points">
                <li>Factory-trained on every system we install.</li>
                <li>
                  Installed per the manufacturer&rsquo;s published data sheets.
                </li>
                <li>
                  Manufacturer warranty available when project conditions
                  qualify.
                </li>
              </ul>
            </div>
            <div className="cx-made-media">
              <Image
                src="/images/markets/pn-epoxies.jpg"
                alt="Applicators squeegeeing a poured American-made epoxy resin floor coating"
                fill
                quality={45}
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 45vw"
                style={{ objectFit: "cover", objectPosition: "center 60%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- 7 coating systems (accordion) ---- */}
      <section className="sec wrap">
        <div className="sec-head">
          <div className="eyebrow">Coating systems</div>
          <h2>Seven systems, matched to the demand.</h2>
          <p className="lede">
            We don&rsquo;t default to one product. We profile the slab and spec
            the system against the wear, chemical, and traffic the floor sees.
          </p>
        </div>
        <Accordion
          items={systems.map((s) => ({
            q: (
              <>
                {s.name}
                <span className="cx-sys-summary-kicker">{s.summary}</span>
              </>
            ),
            a: (
              <>
                <p>{s.body}</p>
                <div className="cx-bestfor">
                  {s.bestFor.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </>
            ),
          }))}
        />
      </section>

      {/* ---- Residential garages (real garage epoxy floor) ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="feature">
            <div className="feature-media">
              <Image
                src="/images/markets/residential.jpg"
                alt="High-end residential garage finished with a decorative grey flake epoxy floor"
                fill
                quality={45}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center 65%" }}
              />
            </div>
            <div className="feature-body">
              <div className="eyebrow">Residential</div>
              <h2>Yes, we coat residential garages.</h2>
              <p>
                Decorative flake, quartz, and metallic systems bring
                industrial-grade durability to high-end residential garages — same
                prep discipline and the same manufacturer-spec install as our
                commercial work.
              </p>
              <p>
                Browse the flake, quartz, terrazzo, and solid color options below, or
                tell us the look you&rsquo;re after and we&rsquo;ll walk you through it
                as part of your written bid.
              </p>
              <div className="cx-cta-row">
                <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
                <QuoteWizard label="Request samples" triggerClassName="btn btn-outline" initialPath="samples" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Colors & finishes (tabbed swatch explorer) ---- */}
      <section className="sec wrap" data-glow>
        <div className="sec-head">
          <div className="eyebrow">Colors &amp; finishes</div>
          <h2>Pick a look — flake, quartz, terrazzo, and solid color.</h2>
          <p className="lede">
            The resinous floor color line we install, grouped by finish so it&rsquo;s
            easy to browse. We confirm availability and bring physical samples as part
            of your bid. Metallic finishes are available on request.
          </p>
        </div>
        <ColorExplorer categories={colorData as ColorCategory[]} />
      </section>

      {/* ---- Credentials strip (real, never fabricated) ---- */}
      <section className="sec wrap">
        <div className="cred-strip">
          <div className="cred-item">
            <b>Since {CONTACT.since}</b>
            <span>Building in California</span>
          </div>
          <div className="cred-item">
            <b>{CONTACT.license}</b>
            <span>Licensed general contractor</span>
          </div>
          <div className="cred-item">
            <b>Statewide California</b>
            <span>NorCal primary, statewide for the right job</span>
          </div>
          <div className="cred-item">
            <b>Factory-trained</b>
            <span>On every Polymer Nation system we install</span>
          </div>
          <div className="cred-item">
            <b>Bids in 1&ndash;2 days</b>
            <span>Written, itemized, back fast</span>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Coatings FAQ</div>
            <h2>Common coatings questions.</h2>
          </div>
          <Accordion items={faqs.map((f) => ({ q: f.question, a: <p>{f.answer}</p> }))} />
        </div>
      </section>

      {/* ---- CTA band ---- */}
      <section className="sec wrap">
        <div className="cta-band">
          <div className="cta-band-inner">
            <div>
              <div className="eyebrow">Get a written bid</div>
              <h2>Tell us about your floor.</h2>
              <p>
                Send the space, the substrate, and how the floor gets used.
                We&rsquo;ll spec a system and get a written, itemized bid back
                inside 1 to 2 business days.
              </p>
            </div>
            <div className="cta-band-actions">
              <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
              <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
