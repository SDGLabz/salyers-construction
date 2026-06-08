import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import {
  getServiceBySlug,
  getMarkets,
  getBenefits,
  getCoatingSystems,
  getFaqsByTopic,
} from "@/lib/catalog";
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

// Accurate photo per market. Real coatings-floor shots lead the floor-centric
// markets; supporting industrial / interior / exterior tiles carry the rest.
// Alt text describes what each photo ACTUALLY shows (not the market name).
const MARKET_PHOTO: Record<string, { src: string; alt: string }> = {
  "food-beverage": {
    src: "/images/jobs/job-3253.jpg",
    alt: "Decorative flake resinous floor finished with a clear topcoat",
  },
  manufacturing: {
    src: "/images/jobs/job-6936.jpg",
    alt: "Dark monolithic epoxy floor coating in an industrial bay",
  },
  "commercial-industrial": {
    src: "/images/jobs/job-8294.jpg",
    alt: "Industrial pipe and duct work above a coated floor",
  },
  automotive: {
    src: "/images/jobs/job-1358.jpg",
    alt: "High-gloss seamless epoxy floor reflecting overhead light",
  },
  "grocery-retail": {
    src: "/images/jobs/job-b.jpg",
    alt: "Glossy resinous floor in a finished commercial interior",
  },
  "healthcare-fitness": {
    src: "/images/jobs/job-a.jpg",
    alt: "Finished interior space with a coated floor",
  },
  "pharmaceutical-biotech": {
    src: "/images/jobs/job-1358.jpg",
    alt: "Seamless high-gloss epoxy floor with no joints or grout lines",
  },
  "animal-care": {
    src: "/images/jobs/job-b.jpg",
    alt: "Glossy seamless interior floor coating, easy to wash down",
  },
  corrections: {
    src: "/images/jobs/job-6936.jpg",
    alt: "Durable dark epoxy floor coating in a hard-use environment",
  },
  "hospitality-entertainment": {
    src: "/images/jobs/job-3253.jpg",
    alt: "Decorative flake floor system with a designer finish",
  },
  municipalities: {
    src: "/images/jobs/job-d.jpg",
    alt: "Exterior of a public-facility building",
  },
  "aviation-transportation": {
    src: "/images/jobs/job-8294.jpg",
    alt: "Overhead duct and pipe runs above an industrial coated floor",
  },
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
        image="/images/jobs/job-3253.jpg"
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Send Drawings
        </Link>
      </PageHero>

      {/* ---- Floors that work for a living (overview) ---- */}
      <section className="sec wrap">
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
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
            <h3>How a coatings job runs</h3>
            {service?.workflow.map((step) => (
              <p key={step.step}>
                <strong>
                  {step.step} &middot; {step.title}.
                </strong>{" "}
                {step.detail}
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
            <Link href="/contact" className="btn btn-primary">
              Request a Bid
            </Link>
          </aside>
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
            {markets.map((m) => {
              const photo = MARKET_PHOTO[m.slug] ?? {
                src: "/images/jobs/job-6936.jpg",
                alt: "Industrial epoxy floor coating",
              };
              return (
                <div key={m.slug} className="mkt-tile">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
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
              <div className="eyebrow">Polymer Nation &middot; American-made</div>
              <h2>The resins are American-made. The path is direct.</h2>
              <p>
                We install Polymer Nation resinous systems. We order from the
                manufacturer, install per their data sheets, and back the work
                with their warranty when project conditions qualify.
              </p>
              <ul className="cx-made-points">
                <li>
                  Factory-trained and certified on every system we install.
                </li>
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
                src="/images/jobs/job-1358.jpg"
                alt="High-gloss seamless epoxy floor installed by the Salyers crew"
                fill
                sizes="(max-width: 860px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
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
        <div className="faq">
          {systems.map((s) => (
            <details key={s.slug} className="faq-item">
              <summary>
                {s.name}
                <span className="cx-sys-summary-kicker">{s.summary}</span>
              </summary>
              <div className="faq-a">
                <p>{s.body}</p>
                <div className="cx-bestfor">
                  {s.bestFor.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ---- Residential note + samples / color inquiry ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Before you bid</div>
            <h2>Residential garages, samples, and color.</h2>
          </div>
          <div className="cx-note">
            <article className="cx-note-card">
              <div className="eyebrow">Residential</div>
              <h3>Yes, we coat residential garages.</h3>
              <p>
                Decorative flake, quartz, and metallic systems bring
                industrial-grade durability to high-end residential garages.
                Same prep discipline, same manufacturer-spec install as our
                commercial work.
              </p>
              <Link href="/contact" className="btn btn-outline">
                Request a Bid
              </Link>
            </article>
            <article className="cx-note-card">
              <div className="eyebrow">Samples &amp; color</div>
              <h3>Want to see flake or metallic options?</h3>
              <p>
                Tell us the space and the look you&rsquo;re after and we&rsquo;ll
                walk you through flake, quartz, and metallic finishes and color
                options as part of your written bid.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Request a color inquiry
              </Link>
            </article>
          </div>
        </div>
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
            <span>Certified on every system we install</span>
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
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.slug} className="faq-item">
                <summary>{f.question}</summary>
                <div className="faq-a">
                  <p>{f.answer}</p>
                </div>
              </details>
            ))}
          </div>
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
              <Link href="/contact" className="btn btn-primary">
                Request a Bid
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Send Drawings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
