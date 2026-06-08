import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import "./legal.css";

export const metadata: Metadata = {
  title: seoTitle("Privacy Policy"),
  description:
    "How Salyers Construction handles the information you submit through this website when you request a bid in California. We use it only to respond and prepare your bid, and we do not sell it.",
};

export default function PrivacyPage() {
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
        name: "Privacy Policy",
        item: `${SITE_URL}/privacy`,
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
            How we handle <em>your information</em>.
          </>
        }
        lead="A plain-English summary of what we collect when you contact us or request a bid, how we use it, and what we do not do with it."
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
            When you contact us or request a bid, we collect the details you
            choose to provide &mdash; your name, company, email, phone, and a
            description of your project &mdash; and we use them only to respond
            to you and prepare a written bid. We do not sell your information.
          </p>
          <p>
            Inquiries submitted through this site are delivered to{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>, the email we use to
            review project details and return a written, itemized bid, typically
            inside 1 to 2 business days. We keep your message and any drawings or
            documents you send so we can scope the work, follow up, and maintain
            our own records of the projects we bid.
          </p>
          <p>
            We share what you send only as needed to do the work you asked for
            &mdash; for example, with the structural engineer of record, a
            general contractor or building owner on the same project, or a
            material manufacturer when a product specification requires it. We
            don&rsquo;t trade or sell your details to advertisers or data
            brokers.
          </p>
          <p className="lx-note">
            This is an honest summary, not a complete legal policy. It will be
            expanded into a full privacy policy &mdash; including data retention,
            your rights, and any California-specific disclosures &mdash; and
            reviewed by counsel before launch. In the meantime, questions about
            your information can go to{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a> or{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
          </p>
        </div>
      </section>

      {/* ---- At a glance bento ---- */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">At a glance</p>
            <h2>What we collect, and what we do with it.</h2>
            <p className="lede">
              The short version. Everything here applies to information you
              submit through the bid and contact forms on this website.
            </p>
          </div>

          <div className="bento lx-bento">
            <article className="bento-card">
              <h3>What we collect</h3>
              <p>
                Your name, company, email, phone, and the project details,
                drawings, or photos you choose to send when you request a bid.
              </p>
            </article>
            <article className="bento-card">
              <h3>Why we use it</h3>
              <p>
                Only to respond to your inquiry, scope the work, and prepare a
                written, itemized bid &mdash; and to follow up on that project.
              </p>
            </article>
            <article className="bento-card">
              <h3>Where it goes</h3>
              <p>
                Inquiries are delivered to{" "}
                <a href={CONTACT.emailHref}>{CONTACT.email}</a>. We share details
                only with the people working on your project, when needed.
              </p>
            </article>
            <article className="bento-card">
              <h3>What we don&rsquo;t do</h3>
              <p>
                We do not sell your information, and we do not trade it to
                advertisers or data brokers.
              </p>
            </article>
            <article className="bento-card">
              <h3>How long we keep it</h3>
              <p>
                We keep your message and documents to scope, bid, and record the
                projects we work on. Ask us to remove yours and we will.
              </p>
            </article>
            <article className="bento-card">
              <h3>Questions</h3>
              <p>
                Email{" "}
                <a href={CONTACT.emailHref}>{CONTACT.email}</a> or call{" "}
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> and we&rsquo;ll
                tell you what we have.
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
                <h2>Ready to put a real bid in front of you.</h2>
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
