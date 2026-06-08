import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { LightboxGallery } from "@/lib/components/lightbox";
import { seoTitle, SITE_URL } from "@/lib/site";
import "./projects.css";

export const metadata: Metadata = {
  title: seoTitle("Projects"),
  description:
    "A featured Salyers Construction seismic retrofit: carbon FRP strips bonded to a working parking-structure slab underside in California, phased so tenant access never stopped. Documented job references available on request.",
};

// Honest, accurate prep → install → cure sequence (verbatim from the source site).
const PHASES = [
  { n: "01", label: "Surface prep" },
  { n: "02", label: "Strip install" },
  { n: "03", label: "Saturant cure" },
] as const;

// Real job photos only — alt + caption written from the actual photo, no invented
// names or clients. FRP / seismic work leads; the two resinous-floor shots are
// pushed to the end. Clicking any photo opens it in the lightbox.
const GALLERY = [
  {
    src: "/images/jobs/job-g.jpg",
    alt: "Externally bonded carbon FRP strips applied across a concrete parking-deck soffit.",
    caption: "Carbon FRP strips bonded to a parking-deck soffit",
    objPos: "center 35%",
  },
  {
    src: "/images/jobs/job-8292.jpg",
    alt: "Structural beam wrapped with carbon fiber reinforced polymer fabric during a seismic retrofit.",
    caption: "Carbon fiber beam wrap, in progress",
    objPos: "center center",
  },
  {
    src: "/images/jobs/job-8293.jpg",
    alt: "Beam-to-column area wrapped with externally bonded FRP fabric in a framed building.",
    caption: "FRP fabric at a framed beam",
    objPos: "center 45%",
  },
  {
    src: "/images/jobs/job-3850.jpg",
    alt: "Carbon fiber reinforced polymer fabric bonded to the base of an exterior building wall.",
    caption: "Foundation / cripple-wall FRP, residential",
    objPos: "center 45%",
  },
  {
    src: "/images/jobs/job-d.jpg",
    alt: "Carbon FRP strips bonded to a concrete slab underside, routed around overhead piping.",
    caption: "Slab-underside FRP, routed around piping",
    objPos: "center center",
  },
  {
    src: "/images/jobs/job-c.jpg",
    alt: "Carbon fiber reinforcement bonded across a concrete member in a parking structure.",
    caption: "Shear strengthening, parking structure",
    objPos: "center center",
  },
  {
    src: "/images/jobs/job-8294.jpg",
    alt: "Carbon fiber fabric bonded to a structural beam beneath a wood subfloor.",
    caption: "Carbon beam wrap beneath a subfloor",
    objPos: "center 50%",
  },
  {
    src: "/images/jobs/job-a.jpg",
    alt: "Crew in coveralls preparing and strengthening a concrete column in a parking structure.",
    caption: "Crew strengthening a parking-structure column",
    objPos: "center 40%",
  },
  {
    src: "/images/jobs/job-5687.jpg",
    alt: "Salyers Construction team member on site beside the company truck and a pallet of materials.",
    caption: "On site — Salyers Construction",
    objPos: "center 35%",
  },
  {
    src: "/images/jobs/job-1358.jpg",
    alt: "Finished high-gloss light-gray resinous floor coating across a large industrial bay.",
    caption: "Industrial resinous floor coating",
    objPos: "center 60%",
  },
  {
    src: "/images/jobs/coatings-salyers.jpg",
    alt: "Light-gray resinous coating on an aircraft maintenance hangar floor.",
    caption: "Resinous hangar floor coating",
    objPos: "center 70%",
  },
] as const;

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
      name: "Projects",
      item: `${SITE_URL}/projects`,
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="Projects"
        image="/images/jobs/courthouse-merced.jpg"
        title={
          <>
            Carbon FRP, bonded while the building stayed <em>live</em>.
          </>
        }
        lead="Phased work that strengthens the structure without closing it. Below is a featured retrofit, real job photography across both lines of work, and how to get documented references for your project."
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* ---- Featured retrofit (the one real job, verbatim source prose) ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Featured retrofit</p>
            <h2>Garage slab retrofit, phased while the building stayed live</h2>
            <p className="lede">
              Carbon FRP strips bonded to the slab underside on a working parking
              structure. Bays cycled through prep, install, and saturant cure to
              keep tenant access uninterrupted.
            </p>
          </div>

          <div className="feature">
            <div className="pj-feature-media">
              <div className="pj-shot pj-shot--lead">
                <Image
                  src="/images/jobs/job-6936.jpg"
                  alt="Concrete column and beam under a parking deck wrapped with externally bonded carbon FRP."
                  fill
                  loading="lazy"
                  quality={40}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="pj-shot pj-shot--sm">
                <Image
                  src="/images/jobs/job-8288.jpg"
                  alt="Concrete column with surface spalling exposed for preparation before strengthening."
                  fill
                  loading="lazy"
                  quality={40}
                  sizes="(max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: "cover", objectPosition: "center 40%" }}
                />
              </div>
              <div className="pj-shot pj-shot--sm">
                <Image
                  src="/images/jobs/job-b.jpg"
                  alt="Carbon FRP strip bonded along the underside of a parking-structure slab."
                  fill
                  loading="lazy"
                  quality={40}
                  sizes="(max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: "cover", objectPosition: "center 35%" }}
                />
              </div>
            </div>

            <div className="feature-body">
              <h3>Strengthened without shutting the structure down</h3>
              <p>
                Externally bonded carbon fiber added tensile capacity to the slab
                underside where the engineer of record called for it. Because the
                garage stayed in use, the work was sequenced bay by bay rather than
                closing the structure all at once.
              </p>
              <p>
                Each bay moved through the same controlled sequence — surface
                preparation, strip installation, then saturant cure — before the
                next bay opened back up to traffic. That phasing is what kept tenant
                access uninterrupted from start to finish.
              </p>
              <ol className="pj-phases" aria-label="Per-bay install sequence">
                {PHASES.map((p) => (
                  <li key={p.n} className="pj-phase">
                    <b>{p.n}</b>
                    {p.label}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Real job gallery (seismic + coatings) ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">From the field</p>
            <h2>Real work, both lines of the shop</h2>
            <p className="lede">
              A look at seismic FRP strengthening and industrial resinous coatings
              from active California job sites — the structural side and the floor
              side of the same crew.
            </p>
          </div>

          <LightboxGallery
            items={GALLERY.map((g) => ({
              src: g.src,
              alt: g.alt,
              caption: g.caption,
              objPos: g.objPos,
            }))}
          />
        </div>
      </section>

      {/* ---- Honest "more on request" note ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="pj-note">
            <div className="pj-note-ico" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M8 13h8M8 17h6" />
              </svg>
            </div>
            <div>
              <h3>More documented work is available on request</h3>
              <p>
                We keep this page honest — only work we can stand behind goes here.
                We don&rsquo;t publish invented project names, client logos, or round
                numbers we can&rsquo;t back up.
              </p>
              <p>
                When you request a bid, tell us what you&rsquo;re building and
                we&rsquo;ll share relevant documented installs and references for
                seismic FRP retrofit or industrial coatings that match your scope.
              </p>
              <div className="pj-note-cta">
                <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
                <QuoteWizard label="Send Drawings" triggerClassName="btn btn-outline" initialPath="drawings" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Navy CTA band ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="cta-band cta-band-inner">
            <div>
              <p className="eyebrow">Engineering first, hands behind it</p>
              <h2>Have drawings for a retrofit or a floor?</h2>
              <p>
                Send the package and we&rsquo;ll return a written, itemized bid
                inside 1 to 2 business days. Seismic FRP and industrial coatings,
                statewide California.
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
