import type { Metadata } from "next";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: seoTitle("Contact — Request a Bid"),
  description:
    "Request a written, itemized bid for seismic FRP retrofit or industrial epoxy coatings in California, or send project drawings. Salyers Construction, B1 #960653, Roseville CA. Bids back in 1–2 business days.",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us about the building."
        lead="Written, itemized bids back inside 1 to 2 business days. Send the engineer-of-record drawings if you have them, or describe the scope and we'll take it from there."
      />

      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <div
          className="ct-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
            gap: "clamp(28px, 4vw, 56px)",
            alignItems: "start",
          }}
        >
          {/* Launcher: blurred faux-form thumbnail that opens the wizard */}
          <div>
            <p className="eyebrow" style={{ color: "var(--orange-ink)" }}>
              Start here
            </p>
            <h2 style={{ marginTop: 8, marginBottom: 18 }}>Request a bid in about a minute.</h2>
            <div className="ct-survey">
              <QuoteWizard triggerClassName="ct-survey-thumb">
                <span className="ct-thumb-form" aria-hidden="true">
                  <span className="ct-thumb-bar">
                    <span />
                  </span>
                  <span className="ct-thumb-q">Which line of work?</span>
                  <span className="ct-thumb-grid">
                    <span>Seismic FRP retrofit</span>
                    <span>Industrial coatings</span>
                  </span>
                  <span className="ct-thumb-q ct-thumb-q2">What&rsquo;s the project?</span>
                  <span className="ct-thumb-grid">
                    <span>Seismic strengthening</span>
                    <span>New epoxy floor</span>
                    <span>Concrete repair</span>
                    <span>Re-coat a floor</span>
                    <span>Parking structure</span>
                    <span>Containment</span>
                  </span>
                </span>
                <span className="ct-survey-over">
                  <span className="ct-survey-eyebrow">Guided request</span>
                  <span className="ct-survey-h">Start your bid request</span>
                  <span className="ct-survey-p">
                    A few quick questions on your scope, location, and timeline — then we send back a written,
                    itemized bid.
                  </span>
                  <span className="ct-survey-play">
                    <span className="ct-survey-play-ic" aria-hidden="true">▶</span>
                    Begin
                  </span>
                </span>
              </QuoteWizard>
            </div>

            {/* what to expect */}
            <div className="ct-ways">
              <div className="ct-ways-head">
                <h2>What to expect</h2>
                <p>Straight answers from the people who&rsquo;ll do the work. Engineering first, hands behind it.</p>
              </div>
              <div className="ct-ways-grid">
                <div className="ct-way">
                  <div className="ct-way-ic" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <h3>1–2 business days</h3>
                  <p>Written, itemized bids back inside one to two business days — no runaround.</p>
                </div>
                <div className="ct-way">
                  <div className="ct-way-ic" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M9 13h6M9 17h6" />
                    </svg>
                  </div>
                  <h3>Bid to your drawings</h3>
                  <p>Have EOR design intent or a construction set? Send it and we price to the documents.</p>
                </div>
                <div className="ct-way">
                  <div className="ct-way-ic" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    </svg>
                  </div>
                  <h3>Licensed B1 contractor</h3>
                  <p>California B1 #{CONTACT.license.replace(/\D/g, "")}, building since {CONTACT.since}, statewide.</p>
                </div>
                <div className="ct-way">
                  <div className="ct-way-ic" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                    </svg>
                  </div>
                  <h3>No obligation</h3>
                  <p>Ask about a seismic standard or a coating system — we&rsquo;re happy to talk it through.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust column — Call / Email / Visit */}
          <aside className="ct-team">
            <div className="ct-team-intro">
              <h2>Reach us directly.</h2>
              <p>Prefer to call or email? Here&rsquo;s how to get straight to Salyers Construction.</p>
              <div className="ct-team-cta">
                <a href={CONTACT.phoneHref} className="btn btn-ghost">
                  Call {CONTACT.phone}
                </a>
              </div>
              <p className="ct-team-note">
                For seismic FRP retrofit and industrial coatings across {CONTACT.regionLong}.
              </p>
            </div>
            <div className="ct-team-facts">
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 18 }}>
                <li>
                  <strong style={{ display: "block", color: "var(--belzona-blue)" }}>Call</strong>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </li>
                <li>
                  <strong style={{ display: "block", color: "var(--belzona-blue)" }}>Email</strong>
                  <a href={CONTACT.emailHref}>{CONTACT.email}</a>
                </li>
                <li>
                  <strong style={{ display: "block", color: "var(--belzona-blue)" }}>Visit</strong>
                  <span style={{ color: "var(--text-2)", lineHeight: 1.5 }}>
                    {CONTACT.street}
                    <br />
                    {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
                  </span>
                </li>
                <li style={{ color: "var(--text-3)", fontSize: 13 }}>{CONTACT.license}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
