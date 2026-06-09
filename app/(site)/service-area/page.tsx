import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { seoTitle, SITE_URL, SITE_NAME } from "@/lib/site";
import { getServiceRegions } from "@/lib/catalog";
import { CONTACT } from "@/lib/contact";
import "./service-area.css";

export const metadata: Metadata = {
  title: seoTitle("Service Area — California"),
  description:
    "Seismic FRP retrofit statewide across California — the Bay Area, Sacramento, the Central Valley, Greater Los Angeles, the Inland Empire, San Diego, and the Central Coast. Industrial coatings centered in Northern California, traveling statewide for right-sized projects.",
  alternates: { canonical: `${SITE_URL}/service-area` },
};

// Pin icon reused across chips + HQ callout.
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s7-6.16 7-11a7 7 0 1 0-14 0c0 4.84 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

// Named regions for each scope — kept to the source/catalog list so nothing is
// fabricated. The live page + catalog name these regions; we do not invent
// specific cities the source never claims.
const SEISMIC_METROS = [
  "Bay Area",
  "Sacramento",
  "Central Valley",
  "Greater Los Angeles",
  "Inland Empire",
  "San Diego",
  "Central Coast",
];

const COATINGS_METROS = [
  "Roseville (HQ) & the Sacramento metro",
  "Bay Area",
  "Central Valley",
];

export default function ServiceAreaPage() {
  const regions = getServiceRegions();
  const tierA = regions.find((r) => r.tier === "A");
  const tierB = regions.find((r) => r.tier === "B");

  // LocalBusiness (GeneralContractor) with an areaServed array mixing the named
  // metros (City) and the broad CA region (AdministrativeArea / State).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: SITE_NAME,
    url: `${SITE_URL}/service-area`,
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
    foundingDate: String(CONTACT.since),
    areaServed: [
      { "@type": "State", name: "California" },
      { "@type": "City", name: "Roseville, CA" },
      { "@type": "City", name: "Sacramento, CA" },
      { "@type": "City", name: "Los Angeles, CA" },
      { "@type": "City", name: "San Diego, CA" },
      { "@type": "AdministrativeArea", name: "San Francisco Bay Area, California" },
      { "@type": "AdministrativeArea", name: "Northern California" },
      { "@type": "AdministrativeArea", name: "Central Valley, California" },
      { "@type": "AdministrativeArea", name: "Inland Empire, California" },
      { "@type": "AdministrativeArea", name: "Central Coast, California" },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Area",
        item: `${SITE_URL}/service-area`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHero
        eyebrow="Service area · California"
        image="/images/jobs/courthouse-merced.jpg"
        title={
          <>
            Seismic, statewide. Coatings, mostly <em>Northern California</em>.
          </>
        }
        lead="Two service-area policies, because the two scopes have different mobilization economics. Seismic FRP travels anywhere in California. Industrial coatings is centered in Northern California and travels for a right-sized job."
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* ---- Two-policy explainer (subtle cursor glow) ---- */}
      <section className="sec" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Two policies, on purpose</div>
            <h2>Different work travels differently.</h2>
            <p className="lede">
              An engineered FRP retrofit is a high-value, drawing-driven scope:
              it is worth mobilizing a crew across the state for. A resinous floor
              is a thicker-material, longer-on-site job where mobilization
              economics matter more — so coatings stays close to home and travels
              only when the project warrants it.
            </p>
          </div>
          <div className="sa-policies">
            <article className="sa-policy fb-card">
              <div className="eyebrow">Seismic FRP retrofit</div>
              <h3>The full state.</h3>
              <p>
                Externally bonded carbon and glass strengthening is installed
                from engineer-of-record drawings to a certified spec, then
                documented at handover. The structure decides where we go — Bay
                Area, Sacramento, the Central Valley, Greater Los Angeles, the
                Inland Empire, San Diego, the Central Coast, and points in
                between.
              </p>
              <span className="sa-scope">Statewide California</span>
            </article>
            <article className="sa-policy fb-card">
              <div className="eyebrow">Industrial coatings</div>
              <h3>Northern California first.</h3>
              <p>
                Epoxy, polyaspartic, polyurethane, and urethane-concrete floor
                systems are centered in Northern California: the Bay Area,
                Sacramento, and the broader Central Valley are the base service
                area. We will travel for right-sized projects in Southern
                California and outside the state — evaluated by scope and
                schedule.
              </p>
              <span className="sa-scope">NorCal primary · travels for scope</span>
            </article>
          </div>
        </div>
      </section>

      {/* ---- Tier A: Seismic FRP — statewide ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <div className="sa-tier-head">
              <span className="sa-tier-badge" aria-hidden="true">
                A
              </span>
              <div className="eyebrow" style={{ margin: 0 }}>
                Tier A · Seismic FRP · statewide
              </div>
            </div>
            <h2>{tierA?.name ?? "Seismic FRP — Statewide California"}</h2>
            <p className="lede">
              {tierA?.blurb ??
                "Seismic FRP travels anywhere in California. Engineered structural strengthening goes where the project is."}
            </p>
          </div>

          {/* Featured-bento: hero structural photo + market tiles */}
          <div className="mkt-grid mkt-grid--feat">
            <div className="mkt-tile">
              <Image
                src="/images/jobs/job-8294.jpg"
                alt="Carbon fiber fabric bonded to a structural beam during a seismic FRP retrofit"
                fill
                loading="lazy"
                quality={40}
                sizes="(max-width: 1000px) 100vw, 66vw"
                style={{ objectFit: "cover", objectPosition: "center 50%" }}
              />
              <div className="mkt-label">
                <b>Statewide structural strengthening</b>
                <span>
                  Column jacketing, shear and flexural strengthening, and
                  beam-column joints — installed from EOR drawings, anywhere in
                  California.
                </span>
              </div>
            </div>
            <div className="mkt-tile">
              <Image
                src="/images/jobs/job-8292.jpg"
                alt="Underside of a concrete parking deck strengthened with bonded fiber-reinforced polymer"
                fill
                loading="lazy"
                quality={40}
                sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="mkt-label">
                <b>Parking decks &amp; structures</b>
                <span>Bay Area · Sacramento · Greater Los Angeles</span>
              </div>
            </div>
            <div className="mkt-tile">
              <Image
                src="/images/jobs/courthouse-merced.jpg"
                alt="Historic Merced County Courthouse, a masonry building of the kind targeted for seismic retrofit"
                fill
                loading="lazy"
                quality={40}
                sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center 30%" }}
              />
              <div className="mkt-label">
                <b>Public &amp; historic buildings</b>
                <span>Soft-story, masonry, and ordinance-driven retrofits</span>
              </div>
            </div>
          </div>

          <div className="sa-metros" aria-label="Seismic FRP metros served">
            {SEISMIC_METROS.map((m) => (
              <span className="sa-chip" key={m}>
                <PinIcon />
                {m}
              </span>
            ))}
          </div>

          <div className="sa-hq">
            <PinIcon />
            <div>
              <b>Note on local ordinances</b>
              <span>
                Several California jurisdictions carry mandatory soft-story and
                masonry retrofit programs. We work to the engineer-of-record
                drawings and the authority having jurisdiction on each project —
                bring us the ordinance and the design, and we will bid the
                installation.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Tier B: Coatings — NorCal primary ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sa-tier-head">
              <span className="sa-tier-badge" aria-hidden="true">
                B
              </span>
              <div className="eyebrow" style={{ margin: 0 }}>
                Tier B · Industrial coatings · NorCal primary
              </div>
            </div>
            <h2>{tierB?.name ?? "Industrial Coatings — Northern California"}</h2>
            <p className="lede">
              {tierB?.blurb ??
                "Industrial coatings is centered in Northern California and will travel for a right-sized job."}
            </p>
          </div>

          <div className="feat3">
            <article className="feat-card">
              <div className="feat-ico" aria-hidden="true">
                <PinIcon />
              </div>
              <h3>Sacramento metro</h3>
              <p>
                Our base. The Roseville HQ and the surrounding Sacramento metro
                are the densest concentration of resinous floor work we do.
              </p>
            </article>
            <article className="feat-card">
              <div className="feat-ico" aria-hidden="true">
                <PinIcon />
              </div>
              <h3>Bay Area &amp; Central Valley</h3>
              <p>
                The Bay Area and the broader Central Valley round out the primary
                coatings footprint — industrial floors, warehouses, and
                high-traffic commercial slabs.
              </p>
            </article>
            <article className="feat-card">
              <div className="feat-ico" aria-hidden="true">
                <PinIcon />
              </div>
              <h3>Travels for scope</h3>
              <p>
                Right-sized projects in Southern California or out of state are
                evaluated case by case — by scope and schedule. Send the
                location and we will tell you straight.
              </p>
            </article>
          </div>

          <div className="sa-metros" aria-label="Industrial coatings metros served">
            {COATINGS_METROS.map((m) => (
              <span className="sa-chip" key={m}>
                <PinIcon />
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Photo + HQ feature (subtle cursor glow) ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="feature">
            <div className="feature-media">
              <Image
                src="/images/jobs/job-5687.jpg"
                alt="Salyers Construction truck on a California job site, run out of Roseville in Placer County"
                fill
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center 35%" }}
              />
            </div>
            <div className="feature-body">
              <div className="eyebrow">Based in Roseville</div>
              <h3>Run out of Placer County, working California.</h3>
              <p>
                Salyers Construction has held a California B1 general contractor
                license ({CONTACT.license}) since {CONTACT.since}, operating from{" "}
                {CONTACT.city}, {CONTACT.regionLong}. Seismic FRP goes statewide;
                coatings work radiates out from the Sacramento metro.
              </p>
              <p>
                Not sure your project falls inside the coatings footprint? Send
                the location and scope — we will tell you straight, and bid the
                ones we can do right.
              </p>
              <QuoteWizard label="Request a Bid" triggerClassName="btn btn-outline" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Real-credentials strip ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="cred-strip">
            <div className="cred-item">
              <b>Since {CONTACT.since}</b>
              <span>Building in California</span>
            </div>
            <div className="cred-item">
              <b>{CONTACT.license}</b>
              <span>California B1 general contractor</span>
            </div>
            <div className="cred-item">
              <b>Statewide CA</b>
              <span>Seismic FRP travels anywhere</span>
            </div>
            <div className="cred-item">
              <b>Seismic FRP + Coatings</b>
              <span>Two lines, one engineering standard</span>
            </div>
            <div className="cred-item">
              <b>1–2 business days</b>
              <span>Written, itemized bids</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA band ---- */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-inner">
              <div>
                <div className="eyebrow">In our footprint — or close to it?</div>
                <h2>Tell us where the project is. We will tell you straight.</h2>
                <p>
                  Written, itemized bids back inside 1 to 2 business days.
                  Engineering first, hands behind it.
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
