import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/lib/components/site-chrome";
import { PageHero } from "@/lib/components/page-hero";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="site-main">
        <div className="pg">
          <PageHero
            eyebrow="404"
            title={<>We couldn&rsquo;t find that page.</>}
            lead="The page may have moved or the link may be out of date. Here's where most people are headed."
          >
            <Link className="btn btn-primary" href="/contact">
              Request a Bid
            </Link>
            <Link className="btn btn-outline" href="/">
              Back home
            </Link>
          </PageHero>

          <div className="wrap pg-body">
            <section className="pg-section">
              <h2 className="sr-only">Popular destinations</h2>
              <div className="pg-cards">
                <Link className="pg-card" href="/seismic">
                  <h3>Seismic FRP</h3>
                  <p>Carbon and glass fiber strengthening, installed from EOR drawings.</p>
                  <span className="pg-card-go">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </Link>
                <Link className="pg-card" href="/coatings">
                  <h3>Coatings</h3>
                  <p>American-made resinous floor systems for industrial and commercial floors.</p>
                  <span className="pg-card-go">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </Link>
                <Link className="pg-card" href="/service-area">
                  <h3>Service Area</h3>
                  <p>Seismic statewide; coatings across Northern California.</p>
                  <span className="pg-card-go">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </Link>
                <Link className="pg-card" href="/contact">
                  <h3>Contact</h3>
                  <p>Request a written, itemized bid, or send project drawings.</p>
                  <span className="pg-card-go">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
