import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import { getCertifications, getStandards } from "@/lib/catalog";
import "./certifications.css";

export const metadata: Metadata = {
  title: seoTitle("Certifications & Standards"),
  description:
    "The credentials behind a Salyers Construction bid in California: CSLB B1 #960653 general building contractor since 2011, a certified Henkel/LOCTITE Tyfo FRP applicator (ICC-ES ESR-2103), and a trained Polymer Nation coatings installer.",
};

// Each credential gets a photo that accurately depicts what it backs.
// Object-position frames the subject so the key content is never cropped out;
// these images sit under a scrim, so they load lazily at quality 40.
const CERT_PHOTOS: Record<
  string,
  { src: string; alt: string; objectPosition: string }
> = {
  "cslb-b1": {
    src: "/images/jobs/courthouse-merced.jpg",
    alt: "The historic Merced County Courthouse, a public masonry building of the kind a licensed general contractor coordinates seismic work on.",
    objectPosition: "center 35%",
  },
  "loctite-tyfo": {
    src: "/images/jobs/job-5700.jpg",
    alt: "Externally bonded carbon-fiber fabric wrapped around a structural concrete column during an FRP seismic retrofit.",
    objectPosition: "center",
  },
  "polymer-nation": {
    src: "/images/jobs/job-3253.jpg",
    alt: "A finished resinous floor coating, an example of an industrial epoxy system installed to the manufacturer's published method.",
    objectPosition: "center",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  design: "Design",
  evaluation: "Evaluation",
  code: "Code",
  test: "Test methods",
  "evaluation-report": "Evaluation report",
};

export default function CertificationsPage() {
  const certifications = getCertifications();
  const standards = getStandards();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Certifications",
        item: `${SITE_URL}/certifications`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        image="/images/jobs/job-8293.jpg"
        eyebrow="Certifications"
        title={
          <>
            The <em>credentials</em> behind the bid.
          </>
        }
        lead="A licensed California general contractor, a certified applicator under the Henkel and LOCTITE Tyfo system, and a trained installer of Polymer Nation coatings. The paperwork is part of the work — every bid stands on a license and a system the design references."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Send Drawings
        </Link>
      </PageHero>

      {/* ---- Real-credentials strip (navy) — verifiable facts only ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="cred-strip">
            <div className="cred-item">
              <b>Since 2011</b>
              <span>Building in California for over a decade</span>
            </div>
            <div className="cred-item">
              <b>CA B1 #960653</b>
              <span>CSLB general building contractor license</span>
            </div>
            <div className="cred-item">
              <b>ESR-2103</b>
              <span>ICC-ES report for the Tyfo FRP system</span>
            </div>
            <div className="cred-item">
              <b>Statewide</b>
              <span>Seismic FRP and coatings across California</span>
            </div>
            <div className="cred-item">
              <b>1&ndash;2 business days</b>
              <span>Written, itemized bids back to you</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- The three credentials ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">What we hold</p>
            <h2>Three credentials, one accountable contractor.</h2>
            <p className="lede">
              Each one does a specific job on your project: a license that can
              hold the contract, a system certification that ties field work to
              the engineer&rsquo;s drawings, and product training that grounds
              coatings selection in real data sheets.
            </p>
          </div>

          <div className="cx-cards">
            {certifications.map((cert, i) => {
              const photo = CERT_PHOTOS[cert.slug];
              return (
                <article className="cx-card" key={cert.slug}>
                  {photo ? (
                    <div className="cx-media">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        loading="lazy"
                        quality={40}
                        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 540px"
                        style={{
                          objectFit: "cover",
                          objectPosition: photo.objectPosition,
                        }}
                      />
                    </div>
                  ) : null}
                  <div className="cx-body">
                    <span className="cx-index">
                      {String(i + 1).padStart(2, "0")} / Credential
                    </span>
                    <h3>{cert.name}</h3>
                    <div className="cx-meta">
                      {cert.number ? (
                        <span className="cx-chip">{cert.number}</span>
                      ) : null}
                      {cert.certifyingBody ? (
                        <span className="cx-chip">{cert.certifyingBody}</span>
                      ) : null}
                    </div>
                    <p className="cx-means-label">What this means for your project</p>
                    <p className="cx-means">{cert.whatThisMeans}</p>
                    <div className="cx-legal">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden="true"
                      >
                        <path d="M10 1.7 3 4.4v4.7c0 4 2.9 6.6 7 8.2 4.1-1.6 7-4.2 7-8.2V4.4L10 1.7Z" />
                        <path d="m7.2 9.8 1.9 1.9 3.7-3.9" />
                      </svg>
                      <p>{cert.legal}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Standards table ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Standards we build to</p>
            <h2>The references behind the design and the install.</h2>
            <p className="lede">
              Seismic FRP work is engineered and installed per these published
              standards. We don&rsquo;t author the structural design &mdash; that
              belongs to the engineer of record &mdash; but the installation,
              documentation, and product all answer to the same references.
            </p>
          </div>

          <div className="spec-list">
            {standards.map((s) => (
              <div className="spec-row" key={s.slug}>
                <code className="spec-code">{s.code}</code>
                <div>
                  <span className="spec-label">{s.title}</span>
                  <p className="spec-note">
                    {s.whatItIs}
                    {CATEGORY_LABELS[s.category] ? (
                      <>
                        {" "}
                        <span style={{ color: "var(--text-3)" }}>
                          ({CATEGORY_LABELS[s.category]})
                        </span>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA band (navy) ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-inner">
              <div>
                <p className="eyebrow">Engineering first, hands behind it.</p>
                <h2>Put the credentials to work on your scope.</h2>
                <p>
                  Send the drawings or the conditions. You&rsquo;ll get a
                  written, itemized bid back inside 1 to 2 business days &mdash;
                  from a {CONTACT.license} general contractor building in
                  California since {CONTACT.since}.
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
