import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import "./about.css";

export const metadata: Metadata = {
  title: seoTitle("About Salyers Construction"),
  description:
    "A California B1 general contractor since 2011 (CSLB #960653). Engineering-rigorous seismic FRP retrofit statewide, plus Polymer Nation industrial coatings in Northern California. Engineering first, hands behind it.",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${SITE_URL}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="About Salyers Construction"
        title="A California GC. Engineering first, hands behind it."
        lead={`Salyers Construction has held a California B1 general contractor license since ${CONTACT.since}. The work is structural strengthening — principally fiber reinforced polymer seismic retrofit — with industrial epoxy coatings filling the calendar between seismic projects.`}
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* ---- Real credentials strip (NEVER fabricated) ---- */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cred-strip">
            <div className="cred-item">
              <b>Since {CONTACT.since}</b>
              <span>California general building contractor, in good standing.</span>
            </div>
            <div className="cred-item">
              <b>{CONTACT.license}</b>
              <span>CSLB B1 general building license #960653.</span>
            </div>
            <div className="cred-item">
              <b>Statewide California</b>
              <span>Seismic FRP travels anywhere in the state.</span>
            </div>
            <div className="cred-item">
              <b>Seismic FRP + Coatings</b>
              <span>Two lines of work out of one shop.</span>
            </div>
            <div className="cred-item">
              <b>1–2 business days</b>
              <span>Written, itemized bids back on most projects.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Company foundation: photo + the two lines of work ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="feature">
            <div className="feature-media">
              <Image
                src="/images/jobs/job-5687.jpg"
                alt="Salyers Construction crew on site during a structural strengthening job."
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center 35%" }}
              />
            </div>
            <div className="feature-body">
              <div className="eyebrow">The shop</div>
              <h2>Structural strengthening, with coatings the other half of the shop.</h2>
              <p>
                Salyers Construction is a California general contractor focused on
                structural strengthening using fiber reinforced polymer. The company
                has been licensed since {CONTACT.since} and operates as a small,
                non-union shop. The two practical consequences of that: agile
                mobilization, and direct contact with the lead on your job.
              </p>
              <p>
                Industrial epoxy coatings round out the work — Polymer Nation systems
                for parking decks, industrial floors, and high-traffic commercial.
                Training was completed in person in Chicago. Coatings is filler work
                between seismic projects, and the focus is Northern California, with
                statewide availability for the right job.
              </p>
              <Link href="/seismic" className="sal-go">
                See the seismic FRP work →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Positioning: built for the work bigger contractors will not bid ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Where we fit</div>
            <h2>Built for the work bigger contractors will not bid.</h2>
            <p className="lede">
              The bigger seismic and structural strengthening shops in California —
              Penhall, Pullman Services (which absorbed FT Thomas), Structural
              Technologies, and the broader union sector — focus on the largest
              infrastructure and concrete restoration contracts. We pick up the
              engineered work that sits beneath that threshold.
            </p>
          </div>
          <div className="ab-pos">
            <div className="ab-pos-card">
              <span className="ab-pos-kicker">Engineering-rigorous small shop</span>
              <h3>Lower overhead, faster mobilization, direct contact.</h3>
              <p>
                A small, non-union shop means lower overhead, faster mobilization on
                tight projects, and a phone tree that does not go through three layers
                of project management to reach the lead.
              </p>
            </div>
            <div className="ab-pos-card">
              <span className="ab-pos-kicker">For the engineer of record</span>
              <h3>An applicator who reads drawings and stands behind the spec.</h3>
              <p>
                Where a structural engineer needs an applicator who reads drawings,
                can mobilize without a months-long lead time, and stands behind the
                spec — that is the engineered work Salyers is set up to pick up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Technical approach + credentials aside (.ov2), subtle cursor glow ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">How the work is governed</div>
            <h2>The spec is written by other engineers. We install to it and document it.</h2>
          </div>
          <div className="ov2">
            <div className="ov2-main">
              <p>
                The structural work is technical and the spec is written by other
                engineers. The structural engineer of record produces the design
                intent. The system manufacturer&rsquo;s in-house engineering produces
                the application drawings. We bid and install to that package, with
                documented QA at handover.
              </p>
              <p>
                Salyers does not pretend to be a 200-person concrete restoration
                company. What the shop is set up to do is read EOR drawings, install to
                a certified system specification, and document what was done — a
                coherent paper trail for the building official, the owner, and the
                warranty path.
              </p>
              <h3>What that looks like in scope</h3>
              <p>
                <strong>Seismic FRP</strong> covers commercial, industrial,
                multifamily, and infrastructure — concrete and masonry strengthening,
                column wraps, pier caps, and beam strengthening, including marine
                substrates under public works contracts. <strong>Industrial
                coatings</strong> are epoxy and resinous systems for industrial floors,
                parking decks, and high-traffic commercial. Seismic is statewide;
                coatings are tighter, with Northern California as the base.
              </p>
              <Link href="/certifications" className="sal-go">
                See full certifications →
              </Link>
            </div>
            <aside className="ov2-aside" aria-label="Credentials">
              <h3>Credentials</h3>
              <ul className="ab-cred">
                <li>
                  <b>CSLB B1 General Building</b>
                  <span className="ab-cred-no">{CONTACT.license}</span>
                  <span className="ab-cred-note">
                    California general building contractor, in good standing since{" "}
                    {CONTACT.since}.
                  </span>
                </li>
                <li>
                  <b>Henkel / LOCTITE Tyfo Applicator</b>
                  <span className="ab-cred-no">ICC-ES ESR-2103</span>
                  <span className="ab-cred-note">
                    Certified LOCTITE Tyfo composite applicator. Work installed to the
                    system the design references.
                  </span>
                </li>
                <li>
                  <b>Polymer Nation Trained Installer</b>
                  <span className="ab-cred-note">
                    Trained in person at Polymer Nation&rsquo;s Chicago location.
                    American-made resins, installed per their data sheets.
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ---- Honest about the shape of the company (out-of-scope), cursor glow ---- */}
      <section className="sec" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Straight talk</div>
            <h2>Honest about the shape of the company.</h2>
            <p className="lede">
              Salyers Construction is a small shop with a narrow specialization. What
              follows is an honest read of where the company fits in the California FRP
              and structural strengthening market — and where it does not.
            </p>
          </div>
          <div className="ab-honest">
            <div className="ab-honest-row fb-card">
              <b>Non-union</b>
              <p>
                The shop is small. That means lower overhead, faster mobilization on
                tight projects, and a phone tree that does not go through three layers
                of project management to reach the lead.
              </p>
            </div>
            <div className="ab-honest-row fb-card">
              <b>Engineering rigor at small-shop scale</b>
              <p>
                Salyers does not pretend to be a 200-person concrete restoration
                company. What the shop is set up to do is read EOR drawings, install to
                a certified system specification, and document what was done.
              </p>
            </div>
            <div className="ab-honest-row fb-card">
              <b>Statewide for seismic</b>
              <p>
                Seismic FRP is the primary line of business, and the team will travel
                anywhere in California for it. Coatings is geographically tighter —
                Northern California is the base — but the shop will travel for a
                right-sized job.
              </p>
            </div>
            <div className="ab-honest-row ab-honest-row--out fb-card">
              <b>Not the right call for everything</b>
              <p>
                A residential garage coating, a soft-story wood-frame retrofit that is
                purely carpentry, a water intrusion claim — all of those should go to a
                contractor set up for that specific trade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Structural credibility photos ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">On the job</div>
            <h2>Engineered seismic strengthening and resinous floors.</h2>
          </div>
          <div className="mkt-grid mkt-grid--feat ab-jobgrid">
            <div className="mkt-tile">
              <Image
                src="/images/jobs/job-8293.jpg"
                alt="Externally bonded carbon fiber fabric wrapped around a structural beam during a seismic FRP retrofit."
                fill
                loading="lazy"
                quality={40}
                sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 600px"
                style={{ objectFit: "cover", objectPosition: "center 45%" }}
              />
              <div className="mkt-label">
                <b>Seismic FRP retrofit</b>
                <span>
                  Externally bonded carbon and glass fabric on concrete and masonry.
                </span>
              </div>
            </div>
            <div className="mkt-tile">
              <Image
                src="/images/jobs/courthouse-merced.jpg"
                alt="Historic Merced County Courthouse, a masonry structure of the kind addressed by seismic retrofit."
                fill
                loading="lazy"
                quality={40}
                sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 25vw"
                style={{ objectFit: "cover", objectPosition: "center 30%" }}
              />
              <div className="mkt-label">
                <b>Masonry strengthening</b>
                <span>Concrete and masonry under code-triggered upgrades.</span>
              </div>
            </div>
            <div className="mkt-tile">
              <Image
                src="/images/jobs/job-8292.jpg"
                alt="Structural concrete column and beam framing on a strengthening project."
                fill
                loading="lazy"
                quality={40}
                sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 25vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="mkt-label">
                <b>Columns and beams</b>
                <span>Confinement wraps, shear and flexural strengthening.</span>
              </div>
            </div>
            <div className="mkt-tile">
              <Image
                src="/images/jobs/job-3253.jpg"
                alt="Salyers reviewing a resinous coating system with a Polymer Nation representative in the coatings lab."
                fill
                loading="lazy"
                quality={40}
                sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 25vw"
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
              />
              <div className="mkt-label">
                <b>Trained on the systems</b>
                <span>Polymer Nation resinous systems, learned firsthand.</span>
              </div>
            </div>
            <div className="mkt-tile">
              <Image
                src="/images/jobs/job-6265.jpg"
                alt="Salyers Construction crew at work on an industrial jobsite."
                fill
                loading="lazy"
                quality={40}
                sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 25vw"
                style={{ objectFit: "cover", objectPosition: "center 35%" }}
              />
              <div className="mkt-label">
                <b>The crew</b>
                <span>Direct contact with the lead on your job.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Closing CTA band ---- */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-inner">
              <div>
                <div className="eyebrow">Got a project flagged for retrofit?</div>
                <h2>Engineering first, hands behind it.</h2>
                <p>
                  If the engineer of record has issued drawings, or your asset is
                  screened into a city soft-story or seismic program, send them over.
                  Written, itemized bids back inside 1 to 2 business days.
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
