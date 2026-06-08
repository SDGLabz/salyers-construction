import type { Metadata } from "next";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import "./legal.css";

export const metadata: Metadata = {
  title: seoTitle("Terms & Conditions"),
  description:
    "The terms of use for the Salyers Construction website: the content is general information about our California seismic FRP and industrial coatings work, not a binding quote or engineering advice. Every project is bid and contracted separately in writing.",
};

export default function TermsPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: `${SITE_URL}/terms` },
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
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* ---- In brief bento (quick summary) ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">In brief</p>
            <h2>What this site is &mdash; and what it isn&rsquo;t.</h2>
            <p className="lede">
              The short version, so there&rsquo;s no confusion between reading about
              the work and contracting for it.
            </p>
          </div>

          <div className="bento lx-bento">
            <article className="bento-card">
              <h3>Information, not a quote</h3>
              <p>
                Pages describe our services. They are not a binding price, schedule,
                or commitment for any specific project.
              </p>
            </article>
            <article className="bento-card">
              <h3>Not engineering advice</h3>
              <p>
                Nothing here is a structural design or a substitute for the engineer
                of record on your building.
              </p>
            </article>
            <article className="bento-card">
              <h3>Bid individually</h3>
              <p>
                Every project is scoped, bid, and contracted on its own &mdash; in
                writing, itemized, after we review the details.
              </p>
            </article>
            <article className="bento-card">
              <h3>The contract controls</h3>
              <p>
                If a signed agreement differs from this site, the signed agreement
                governs the work.
              </p>
            </article>
            <article className="bento-card">
              <h3>Products per the maker</h3>
              <p>
                Tyfo FRP and the resinous coatings we install are designed to perform
                to the manufacturer&rsquo;s published data sheets and evaluation reports.
              </p>
            </article>
            <article className="bento-card">
              <h3>Subject to change</h3>
              <p>
                We keep this site accurate, but content can be updated or corrected
                without notice.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ---- Full terms ---- */}
      <section className="sec">
        <div className="wrap lx-prose">
          <p className="lx-updated">Effective date: June 8, 2026</p>
          <p className="lede">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of this
            website operated by {CONTACT.legalName} (&ldquo;{CONTACT.legalName},&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or
            using this site, you agree to these Terms. If you do not agree, please do
            not use the site.
          </p>

          <h2>1. The content is information, not a quote</h2>
          <p>
            The content on this site is provided for general information about our
            services — seismic FRP retrofit and industrial epoxy and resinous coatings.
            It is not a binding quote, an offer, or a commitment of price, schedule, or
            result for any project, and nothing on this site creates a contract between
            you and us.
          </p>

          <h2>2. Not engineering or professional advice</h2>
          <p>
            Nothing on this website is a structural design, a stamped recommendation, or
            a substitute for the engineer of record on your building. Codes, standards,
            systems, and product names are described to explain how we work. The
            structural design itself belongs to the licensed engineer of record, and
            product performance is governed by the manufacturer&rsquo;s own published
            data sheets and evaluation reports. Do not rely on this site in place of
            professional engineering judgment for your specific project.
          </p>

          <h2>3. Bids and contracts</h2>
          <p>
            Every project is scoped, bid, and contracted individually. A written,
            itemized bid — and any contract that follows — is what sets the actual
            scope, price, terms, schedule, and responsibilities for your work. A bid is
            an offer only on its stated terms and is subject to site conditions, the
            engineer&rsquo;s package, and acceptance in writing. If anything in a signed
            agreement differs from this site or from a bid, the signed agreement
            controls.
          </p>

          <h2>4. Your submissions</h2>
          <p>
            When you send us information, drawings, documents, or photos through a form,
            you confirm that you have the right to share them and that doing so does not
            violate anyone&rsquo;s rights or any confidentiality obligation. You grant us
            permission to use what you submit to respond to you, scope and bid the work,
            and keep our project records. Please do not submit anything unlawful,
            infringing, or that you are not authorized to disclose, and do not include
            sensitive personal information (see our{" "}
            <a href={`${SITE_URL}/privacy`}>Privacy Policy</a>).
          </p>

          <h2>5. Intellectual property</h2>
          <p>
            The text, photographs, graphics, layout, and other content on this site are
            owned by {CONTACT.legalName} or its licensors and are protected by
            intellectual-property laws. You may view and share pages for your own
            non-commercial, informational use, but you may not copy, reproduce,
            republish, or use them commercially without our written permission.
          </p>
          <p>
            Third-party names and marks — including Henkel, LOCTITE, Tyfo, and Polymer
            Nation, and the other resinous-coating brands, product codes, and standards
            bodies (such as ICC-ES, ACI, and ASCE) referenced on this site — are the
            property of their
            respective owners and are used for identification only. Their use does not
            imply any affiliation, sponsorship, or endorsement beyond the applicator and
            trained-installer relationships described on the site.
          </p>

          <h2>6. Acceptable use</h2>
          <p>
            You agree not to misuse the site: no attempting to disrupt, attack, or gain
            unauthorized access to it; no scraping, harvesting, or automated data
            collection; no reverse engineering; no uploading malware; and no using the
            site for any unlawful, fraudulent, or misleading purpose. We may suspend or
            limit access to anyone who violates these Terms.
          </p>

          <h2>7. Disclaimer of warranties</h2>
          <p>
            This website and its content are provided &ldquo;as is&rdquo; and &ldquo;as
            available,&rdquo; without warranties of any kind, express or implied,
            including merchantability, fitness for a particular purpose, and
            non-infringement. We aim to keep the site accurate and current, but we do not
            warrant that it is complete, error-free, or uninterrupted, and details can
            change without notice. This disclaimer is about the website; the
            workmanship, materials, and warranties for an actual project are set out in
            the bid and signed contract for that project.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {CONTACT.legalName} will not be
            liable for any indirect, incidental, special, consequential, or punitive
            damages, or for lost profits or data, arising out of or related to your use
            of — or inability to use — this website, even if advised of the possibility.
            Nothing in these Terms limits liability that cannot be limited under
            applicable law.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {CONTACT.legalName} from claims,
            losses, and expenses (including reasonable attorneys&rsquo; fees) arising
            from your misuse of the site, your violation of these Terms, or content you
            submit that infringes a third party&rsquo;s rights.
          </p>

          <h2>10. Third-party links</h2>
          <p>
            This site may link to third-party websites for reference. We do not control
            them and are not responsible for their content, accuracy, or practices.
            Accessing a linked site is at your own risk.
          </p>

          <h2>11. Governing law and venue</h2>
          <p>
            These Terms are governed by the laws of the State of California, without
            regard to its conflict-of-laws rules. You agree that any dispute relating to
            this website or these Terms will be brought exclusively in the state or
            federal courts located in or serving Placer County, California, and you
            consent to their jurisdiction.
          </p>

          <h2>12. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will revise the
            &ldquo;Effective date&rdquo; above. Your continued use of the site after a
            change means you accept the updated Terms.
          </p>

          <h2>13. Contact us</h2>
          <p>
            Questions about these Terms? Reach us at{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>,{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>, or {CONTACT.legalName},{" "}
            {CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}.
          </p>
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
                  Send the drawings or the conditions and you&rsquo;ll get a written,
                  itemized bid back, usually within 1 to 2 business days &mdash; from a{" "}
                  {CONTACT.license} general contractor building in California since{" "}
                  {CONTACT.since}.
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
