import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { Accordion } from "@/lib/components/accordion";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import {
  getServiceBySlug,
  getFrpTypes,
  getStandards,
  getPersonas,
  getFaqsByTopic,
} from "@/lib/catalog";
import "./seismic.css";

const service = getServiceBySlug("seismic-frp");

export const metadata: Metadata = {
  title: seoTitle("Seismic FRP Retrofit California"),
  description:
    service?.metaDescription ??
    "Externally bonded carbon and glass FRP seismic retrofit for concrete and masonry across California — Henkel and LOCTITE Tyfo, ACI 440.2R, ASCE 41, ICC-ES ESR-2103.",
};

// One real seismic/structural photo per FRP service-type (accurate alt text +
// object-position so the structural subject stays framed in the 16:10 tile).
const FRP_PHOTO: Record<
  string,
  { src: string; alt: string; pos: string }
> = {
  "column-jacketing": {
    src: "/images/jobs/job-8288.jpg",
    alt: "Reinforced concrete column wrapped with carbon fiber confinement fabric on a Salyers Construction seismic retrofit",
    pos: "center 40%",
  },
  "beam-column-joints": {
    src: "/images/jobs/job-8293.jpg",
    alt: "Beam-to-column joint of a concrete moment frame strengthened with externally bonded FRP fabric",
    pos: "center 45%",
  },
  "shear-strengthening": {
    src: "/images/jobs/job-c.jpg",
    alt: "Carbon fiber reinforcement fabric bonded across the web of a concrete member to add shear capacity",
    pos: "center center",
  },
  "flexural-strengthening": {
    src: "/images/jobs/job-5693.jpg",
    alt: "Underside of a concrete slab with FRP fabric bonded to the tension face for added flexural reinforcement",
    pos: "center 45%",
  },
  "masonry-retrofit": {
    src: "/images/jobs/courthouse-merced.jpg",
    alt: "Historic Merced County Courthouse, a masonry building of the type addressed by California URM seismic retrofit work",
    pos: "center 35%",
  },
  infrastructure: {
    src: "/images/jobs/job-3850.jpg",
    alt: "Concrete structural member on an infrastructure retrofit prepared for fiber reinforced polymer strengthening",
    pos: "center 50%",
  },
};

export default function SeismicPage() {
  const overview = service?.overview ?? [];
  const workflow = service?.workflow ?? [];
  const frpTypes = getFrpTypes();
  const standards = getStandards();
  const personas = getPersonas();
  const faqs = getFaqsByTopic("seismic");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Seismic FRP Retrofit",
    serviceType: "Seismic FRP Retrofit",
    description: service?.metaDescription,
    provider: {
      "@type": "GeneralContractor",
      name: CONTACT.legalName,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.city,
        addressRegion: CONTACT.region,
        postalCode: CONTACT.postalCode,
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    url: `${SITE_URL}/seismic`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Seismic FRP retrofit"
        title="Engineered to strengthen. Built to spec."
        lead="Externally bonded carbon and glass fiber strengthening for reinforced concrete and masonry, statewide across California. We install the Henkel and LOCTITE Tyfo certified system from engineer-of-record drawings — adding tensile capacity, confinement, and ductility without adding meaningful mass."
        image="/images/jobs/job-g.jpg"
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* ---- What FRP is (definition prose) ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">What FRP is</p>
            <h2>Fibers in tension, epoxy as the matrix, bonded to the outside</h2>
            <p className="lede">
              Fiber reinforced polymer is a composite of high-strength fibers in a
              polymer matrix. Bonded to an existing structure, it does structural
              work without changing how the building feels or weighs.
            </p>
          </div>
          <div className="sx-prose">
            {overview.slice(0, 2).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What it adds (2x2 cards — pulled out of the dense intro) ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">What it adds</p>
            <h2>Four things externally bonded fiber brings to a member</h2>
            <p className="lede">
              Engineers reach for FRP because a thin bonded laminate can deliver
              capacity the existing section was never detailed for.
            </p>
          </div>
          <div className="sx-adds">
            <article className="feat-card fb-card">
              <h3>Tensile capacity</h3>
              <p>High-strength carbon or glass fibers carry tension the existing section cannot.</p>
            </article>
            <article className="feat-card fb-card">
              <h3>Confinement</h3>
              <p>Hoop-direction fibers restrain the concrete core for higher axial capacity.</p>
            </article>
            <article className="feat-card fb-card">
              <h3>Ductility</h3>
              <p>Members deform under cyclic seismic load instead of failing brittle.</p>
            </article>
            <article className="feat-card fb-card">
              <h3>~1/8 to 1/4 inch thick</h3>
              <p>A thin externally bonded laminate — no meaningful added mass.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ---- A thin laminate, not a jacket (feature) ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="feature">
            <div className="feature-media">
              <Image
                src="/images/jobs/job-8294.jpg"
                alt="A thin externally bonded carbon fiber laminate on a structural beam — far lighter than a concrete or steel jacket"
                fill
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectPosition: "center 50%" }}
              />
            </div>
            <div className="feature-body">
              <p className="eyebrow">Low added mass</p>
              <h2>A thin laminate, not a jacket</h2>
              <p>
                The finished laminate is roughly an eighth to a quarter inch thick.
                Compared with a concrete or steel jacket it adds almost no dead load,
                which is one of the reasons structural engineers specify it on existing
                buildings rather than rebuilding members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- How it carries load (subtle cursor glow, not clickable) ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="feature">
            <div className="feature-media">
              <Image
                src="/images/jobs/job-8292.jpg"
                alt="Reinforced concrete column confined with hoop-direction carbon fiber fabric, transferring tensile load into the fibers"
                fill
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectPosition: "center 40%" }}
              />
            </div>
            <div className="feature-body">
              <p className="eyebrow">How it carries load</p>
              <p className="sx-pull">
                Older concrete frames carry structural debt — under-detailed joints,
                widely spaced ties, lap splices that were never meant for today&rsquo;s
                seismic demand.
              </p>
              <p>
                FRP fabric is saturated with epoxy and bonded to a prepared substrate.
                Under load, tensile stress transfers through the bond into the fibers.
                In confinement applications, hoop-direction fibers restrain lateral
                expansion of the concrete core, increasing axial capacity and
                displacement ductility.
              </p>
              <p>
                That is how a retrofit closes the gap between what an existing member
                can deliver and what an ASCE 41 evaluation or a code-triggered upgrade
                now requires — targeted to the specific members the engineer flags,
                not the whole structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- 6 FRP service-types (bento) ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">FRP retrofit, by member</p>
            <h2>Six ways we apply fiber reinforced polymer</h2>
            <p className="lede">
              The fabric, orientation, and anchorage change with the deficiency. These
              are the applications we install most across concrete and masonry.
            </p>
          </div>
          <div className="bento">
            {frpTypes.map((t) => {
              const photo = FRP_PHOTO[t.slug];
              return (
                <article key={t.slug} className="bento-card sx-typecard">
                  {photo ? (
                    <div className="sx-typemedia">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
                        style={{ objectPosition: photo.pos }}
                      />
                    </div>
                  ) : null}
                  <div className="sx-typebody">
                    <span className="sx-typekick">{t.summary}</span>
                    <h3>{t.name}</h3>
                    <p>{t.whatItDoes}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- 4-step engineering workflow (subtle cursor glow, not clickable) ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Engineering first, hands behind it</p>
            <h2>How a retrofit runs, start to sign-off</h2>
            <p className="lede">
              The design is written by other engineers. We are the licensed applicator:
              we read the package, bid it, install it, and document it.
            </p>
          </div>
          <ol className="sx-flow">
            {workflow.map((s) => (
              <li key={s.step} className="sx-step fb-card">
                <span className="sx-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Standards table + Tyfo materials note ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Standards and references</p>
            <h2>The codes and reports the work answers to</h2>
            <p className="lede">
              FRP is designed and installed against a specific set of structural
              standards and an evaluation report the building official can review.
            </p>
          </div>
          <div className="spec-list">
            {standards.map((s) => (
              <div key={s.slug} className="spec-row">
                <code className="spec-code">{s.code}</code>
                <div>
                  <p className="spec-label">{s.title}</p>
                  <p className="spec-note">{s.whatItIs}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="sx-matnote">
            <h3>Materials: the Tyfo system</h3>
            <p>
              We install the Henkel and LOCTITE Tyfo carbon and glass fiber
              strengthening system — the same composite the design references. It is
              covered by ICC-ES Evaluation Report <code>ESR-2103</code>, which
              documents the tested properties, design assumptions, and conditions of
              use for concrete and masonry. We order from the manufacturer, install per
              their application drawings, and close the QA paper trail at handover.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Who we work with (personas) ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Who we work with</p>
            <h2>The people on the other side of a retrofit bid</h2>
            <p className="lede">
              We are honest about the shape of the company: a small, licensed shop that
              installs to other engineers&rsquo; designs and reports straight back to the
              people accountable for the building.
            </p>
          </div>
          <div className="sx-adds">
            {personas.map((p) => (
              <article key={p.slug} className="feat-card">
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ accordion ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Seismic FRP, answered</p>
            <h2>Common questions on FRP retrofit</h2>
          </div>
          <Accordion items={faqs.map((f) => ({ q: f.question, a: <p>{f.answer}</p> }))} />
        </div>
      </section>

      {/* ---- CTA band ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-inner">
              <div>
                <p className="eyebrow">Have drawings in hand?</p>
                <h2>Send the package, get a written bid back in 1 to 2 business days</h2>
                <p>
                  Written, itemized bids back inside 1 to 2 business days — materials,
                  labor, schedule, and our assumptions. Statewide across California.
                </p>
              </div>
              <div className="cta-band-actions">
                <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
                <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
