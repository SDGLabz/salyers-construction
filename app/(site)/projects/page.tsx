import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
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

// Real job photos only, with accurate generic alt text — no invented names/clients.
const GALLERY = [
  {
    src: "/images/jobs/job-5700.jpg",
    alt: "Carbon fiber reinforced polymer wrap applied to a concrete column during a seismic retrofit.",
  },
  {
    src: "/images/jobs/job-8292.jpg",
    alt: "Underside of a concrete parking-structure slab strengthened with externally bonded FRP.",
  },
  {
    src: "/images/jobs/job-3253.jpg",
    alt: "Broadcast-flake resinous floor coating installed over a prepared concrete slab.",
  },
  {
    src: "/images/jobs/job-8288.jpg",
    alt: "Concrete beam and slab framing prepared for fiber reinforced polymer strengthening.",
  },
  {
    src: "/images/jobs/job-1358.jpg",
    alt: "Finished high-gloss epoxy floor coating in an industrial interior.",
  },
  {
    src: "/images/jobs/job-5693.jpg",
    alt: "Concrete reinforcement detail on a structural retrofit in progress.",
  },
  {
    src: "/images/jobs/job-6936.jpg",
    alt: "Dark resinous epoxy coating system on an industrial concrete floor.",
  },
  {
    src: "/images/jobs/job-5687.jpg",
    alt: "Salyers Construction crew installing a structural strengthening system on site.",
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
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Send Drawings
        </Link>
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
            <div className="pj-feature-media" aria-hidden="false">
              <div className="pj-shot pj-shot--lead">
                <Image
                  src="/images/jobs/job-8292.jpg"
                  alt="Concrete parking-structure slab underside strengthened with externally bonded carbon FRP."
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="pj-shot pj-shot--sm">
                <Image
                  src="/images/jobs/job-5700.jpg"
                  alt="Carbon fiber wrap applied to a concrete column during the retrofit."
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="pj-shot pj-shot--sm">
                <Image
                  src="/images/jobs/job-8293.jpg"
                  alt="Concrete framing prepared for fiber reinforced polymer strengthening."
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
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

          <div className="mkt-grid mkt-grid--feat pj-gallery">
            {GALLERY.map((shot) => (
              <figure key={shot.src} className="mkt-tile">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </figure>
            ))}
          </div>
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
                <Link href="/contact" className="btn btn-primary">
                  Request a Bid
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Send Drawings
                </Link>
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
