import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import "./legal.css";

export const metadata: Metadata = {
  title: seoTitle("Terms & Conditions"),
  description:
    "Terms of use for the Salyers Construction website. The content here is general information about our California seismic FRP and industrial coatings work, not a binding quote or engineering advice.",
};

export default function TermsPage() {
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
        name: "Terms & Conditions",
        item: `${SITE_URL}/terms`,
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
        eyebrow="Legal"
        title={
          <>
            The terms behind <em>this website</em>.
          </>
        }
        lead="What the content on this site is — and what it is not. The work itself is bid and contracted separately, in writing, for each project."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Send Drawings
        </Link>
      </PageHero>

      {/* ---- Prose summary ---- */}
      <section className="sec">
        <div className="wrap lx-prose">
          <p className="lede">
            The content on this site is provided for general information about
            Salyers Construction&rsquo;s services &mdash; seismic FRP retrofit
            and industrial epoxy and resinous coatings &mdash; and does not
            constitute a binding quote or engineering advice.
          </p>
          <p>
            Nothing on this website is a structural design, a stamped
            recommendation, or a promise of price, schedule, or result. Standards,
            systems, and product names are described to explain how we work; the
            structural design itself belongs to the engineer of record, and
            product performance is governed by the manufacturer&rsquo;s own
            published data sheets and evaluation reports.
          </p>
          <p>
            Every project is bid and contracted individually. A written, itemized
            bid &mdash; and any contract that follows &mdash; is what sets the
            actual scope, price, terms, and responsibilities for your work. If
            anything in a signed agreement differs from this site, the signed
            agreement controls. We aim to keep this site accurate, but details
            can change without notice.
          </p>
          <p className="lx-note">
            This is a short, honest summary, not complete terms of use. It will
            be expanded into full terms and conditions and reviewed by counsel
            before launch. Questions in the meantime can go to{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a> or{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
          </p>
        </div>
      </section>

      {/* ---- The terms in brief ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">In brief</p>
            <h2>What this site is &mdash; and what it isn&rsquo;t.</h2>
            <p className="lede">
              The short version, so there&rsquo;s no confusion between reading
              about the work and contracting for it.
            </p>
          </div>

          <div className="bento lx-bento">
            <article className="bento-card">
              <h3>Information, not a quote</h3>
              <p>
                Pages describe our services. They are not a binding price,
                schedule, or commitment for any specific project.
              </p>
            </article>
            <article className="bento-card">
              <h3>Not engineering advice</h3>
              <p>
                Nothing here is a structural design or a substitute for the
                engineer of record on your building.
              </p>
            </article>
            <article className="bento-card">
              <h3>Bid individually</h3>
              <p>
                Every project is scoped, bid, and contracted on its own &mdash;
                in writing, itemized, after we review the details.
              </p>
            </article>
            <article className="bento-card">
              <h3>The contract controls</h3>
              <p>
                If a signed agreement differs from this site, the signed
                agreement governs the work.
              </p>
            </article>
            <article className="bento-card">
              <h3>Products per the maker</h3>
              <p>
                Tyfo FRP and Polymer Nation coatings perform to the
                manufacturer&rsquo;s published data sheets and reports.
              </p>
            </article>
            <article className="bento-card">
              <h3>Subject to change</h3>
              <p>
                We keep this site accurate, but content can be updated or
                corrected without notice.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ---- CTA band (navy) ---- */}
      <section className="sec">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-inner">
              <div>
                <p className="eyebrow">Engineering first, hands behind it.</p>
                <h2>The real terms come with the bid.</h2>
                <p>
                  Send the drawings or the conditions and you&rsquo;ll get a
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
