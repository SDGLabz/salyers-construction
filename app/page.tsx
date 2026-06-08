import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/lib/components/site-chrome";
import { PageHero } from "@/lib/components/page-hero";

export const metadata: Metadata = {
  title: "Salyers Construction — Seismic FRP Retrofit & Industrial Coatings",
  description:
    "California B1 general contractor (#960653) for seismic FRP retrofit and industrial epoxy coatings. Statewide California, since 2011.",
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="site-main" tabIndex={-1}>
        <PageHero
          eyebrow="California B1 General Contractor · #960653 · Since 2011"
          title={
            <>
              Engineered to <em>strengthen</em>. Built to spec.
            </>
          }
          lead="Seismic FRP retrofit and industrial coatings, statewide California. We install Henkel and LOCTITE Tyfo composite systems from engineer-of-record drawings on commercial, industrial, multifamily, and infrastructure assets."
        >
          <Link href="/contact" className="btn btn-primary">
            Request a Bid
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Send Drawings
          </Link>
        </PageHero>

        <section className="sal-services wrap" aria-labelledby="svc-h">
          <div className="eyebrow">What we do</div>
          <h2 id="svc-h">Two lines of work. One engineering standard.</h2>
          <p className="lede">
            Structural strengthening with externally bonded fiber, and industrial
            resinous floor systems — both installed to a certified spec and
            documented at handover.
          </p>
          <div className="sal-cards">
            <Link href="/seismic" className="sal-card">
              <span className="eyebrow">Seismic FRP</span>
              <h3>Seismic Retrofitting &amp; FRP Strengthening</h3>
              <p>
                Carbon and glass fabric, structurally bonded — column jacketing,
                shear and flexural strengthening, beam-column joints, and
                infrastructure, installed from EOR drawings.
              </p>
              <span className="sal-go">Explore seismic FRP →</span>
            </Link>
            <Link href="/coatings" className="sal-card">
              <span className="eyebrow">Industrial coatings</span>
              <h3>Epoxy &amp; Resinous Floor Coatings</h3>
              <p>
                American-made epoxy, polyaspartic, polyurethane, and
                urethane-concrete systems for industrial floors, parking decks,
                and high-traffic commercial.
              </p>
              <span className="sal-go">Explore coatings →</span>
            </Link>
          </div>
        </section>

        <section className="sal-cta">
          <div className="wrap sal-cta-inner">
            <div>
              <div className="eyebrow">Got a project flagged for retrofit?</div>
              <h2>Written, itemized bids back inside 1–2 business days.</h2>
            </div>
            <div className="sal-cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Request a Bid
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Send Drawings
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
