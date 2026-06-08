import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
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

// One real seismic/structural photo per FRP service-type (accurate alt text).
const FRP_PHOTO: Record<string, { src: string; alt: string }> = {
  "column-jacketing": {
    src: "/images/jobs/job-8292.jpg",
    alt: "Reinforced concrete column wrapped with carbon fiber confinement fabric on a Salyers Construction seismic retrofit",
  },
  "beam-column-joints": {
    src: "/images/jobs/job-8288.jpg",
    alt: "Beam-to-column joint of a concrete moment frame strengthened with externally bonded FRP fabric",
  },
  "shear-strengthening": {
    src: "/images/jobs/job-8293.jpg",
    alt: "Concrete beam web with U-wrapped fiber reinforced polymer adding shear capacity",
  },
  "flexural-strengthening": {
    src: "/images/jobs/job-5693.jpg",
    alt: "Underside of a concrete slab with FRP fabric bonded to the tension face for added flexural reinforcement",
  },
  "masonry-retrofit": {
    src: "/images/jobs/courthouse-merced.jpg",
    alt: "Historic Merced County Courthouse, a masonry building of the type addressed by California URM seismic retrofit work",
  },
  infrastructure: {
    src: "/images/jobs/job-3850.jpg",
    alt: "Concrete structural member on an infrastructure retrofit prepared for fiber reinforced polymer strengthening",
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
        image="/images/jobs/job-5700.jpg"
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Send Drawings
        </Link>
      </PageHero>

      {/* ---- What FRP is ---- */}
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
          <div className="ov2">
            <div className="ov2-main">
              {overview.slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <h3>A thin laminate, not a jacket</h3>
              <p>
                The finished laminate is roughly an eighth to a quarter inch thick.
                Compared with a concrete or steel jacket it adds almost no dead load,
                which is one of the reasons structural engineers specify it on
                existing buildings rather than rebuilding members.
              </p>
            </div>
            <aside className="ov2-aside" aria-label="What FRP adds">
              <h3>What it adds</h3>
              <ul className="sx-facts">
                <li>
                  <b>Tensile capacity</b>
                  <span>
                    High-strength carbon or glass fibers carry tension the existing
                    section cannot.
                  </span>
                </li>
                <li>
                  <b>Confinement</b>
                  <span>
                    Hoop-direction fibers restrain the concrete core for higher axial
                    capacity.
                  </span>
                </li>
                <li>
                  <b>Ductility</b>
                  <span>
                    Members deform under cyclic seismic load instead of failing
                    brittle.
                  </span>
                </li>
                <li>
                  <b>~1/8 to 1/4 inch</b>
                  <span>
                    A thin externally bonded laminate — no meaningful added mass.
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ---- How it carries load ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="feature">
            <div className="feature-media">
              <Image
                src="/images/jobs/job-c.jpg"
                alt="Carbon fiber reinforcement mesh installed across a prepared concrete surface"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
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
                        sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
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

      {/* ---- 4-step engineering workflow ---- */}
      <section className="sec sec--cream">
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
              <li key={s.step} className="sx-step">
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
          <div className="feat3">
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
    </>
  );
}
