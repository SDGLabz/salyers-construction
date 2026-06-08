import type { Metadata } from "next";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import "./legal.css";

export const metadata: Metadata = {
  title: seoTitle("Terms & Conditions"),
  description:
    "The Terms & Conditions for the Salyers Construction website: acceptable use, intellectual property, disclaimers, limitation of liability, binding arbitration and class-action waiver, California governing law, and required consumer notices.",
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
        lead="The rules for using this site, what its content is and is not, and the legal terms — including arbitration, disclaimers, and limitation of liability — that govern your use. The work itself is bid and contracted separately, in writing, for each project."
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
              A plain-English summary. The full, controlling Terms are below and
              govern in the event of any conflict.
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
                to the manufacturer&rsquo;s published data sheets and reports.
              </p>
            </article>
            <article className="bento-card">
              <h3>Disputes &amp; arbitration</h3>
              <p>
                These Terms include an arbitration agreement and class-action waiver
                (Section 16) you can opt out of within 30 days.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ---- Full terms ---- */}
      <section className="sec">
        <div className="wrap lx-prose">
          <p className="lx-updated">Effective date: June 8, 2026 &middot; Last updated: June 8, 2026</p>
          <p className="lede">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) are a binding agreement
            between you and {CONTACT.legalName} (&ldquo;{CONTACT.legalName},&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your
            access to and use of this website and the forms on it (the
            &ldquo;Site&rdquo;). By accessing or using the Site, you agree to these
            Terms and to our{" "}
            <a href={`${SITE_URL}/privacy`}>Privacy Policy</a>. If you do not agree, do
            not use the Site. <strong>Please read Section 16 carefully: it requires
            disputes to be resolved by binding arbitration on an individual basis and
            waives class actions, subject to a 30-day opt-out.</strong>
          </p>

          <h2>1. Definitions</h2>
          <p>
            &ldquo;Content&rdquo; means the text, photographs, graphics, layout, design,
            and other materials on the Site. &ldquo;Submission&rdquo; means any
            information, message, drawing, document, or file you send us through the
            Site. &ldquo;You&rdquo; means the individual or entity using the Site.
          </p>

          <h2>2. Eligibility and acceptance</h2>
          <p>
            The Site and our services are intended for adults only. You must be at least
            18 years old and able to form a binding contract to use the Site, and by
            using it you represent and warrant that you are 18 or older.{" "}
            <strong>If you are under 18, you may not use the Site or submit any
            information through it.</strong> We do not knowingly permit anyone under 18 to
            use the Site, or anyone under 13 to provide personal information, and our
            forms require you to confirm you are at least 18 before you can submit (see
            our <a href={`${SITE_URL}/privacy`}>Privacy Policy</a>). If you use the Site
            on behalf of an organization, you represent that you are authorized to accept
            these Terms for it, and &ldquo;you&rdquo; includes that organization. Your use
            of the Site confirms your acceptance of these Terms.
          </p>

          <h2>3. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date above and, for material changes, take
            reasonable steps to notify you. Your continued use of the Site after a change
            takes effect constitutes acceptance of the updated Terms.
          </p>

          <h2>4. The content is information, not a quote</h2>
          <p>
            The Content is provided for general information about our services — seismic
            FRP retrofit and industrial epoxy and resinous coatings. It is not a binding
            quote, an offer, or a commitment of price, schedule, or result for any
            project, and nothing on the Site creates a contract for construction services
            between you and us.
          </p>

          <h2>5. Not engineering or professional advice</h2>
          <p>
            Nothing on the Site is a structural design, a stamped recommendation, or a
            substitute for the engineer of record on your building. Codes, standards,
            systems, and product names are described to explain how we work. The
            structural design itself belongs to the licensed engineer of record, and
            product performance is governed by the manufacturer&rsquo;s own published
            data sheets and evaluation reports. Do not rely on the Site in place of
            professional engineering judgment for your specific project.
          </p>

          <h2>6. Bids and contracts</h2>
          <p>
            Every project is scoped, bid, and contracted individually. A written,
            itemized bid — and any contract that follows — sets the actual scope, price,
            terms, schedule, warranties, and responsibilities for your work. A bid is an
            offer only on its stated terms and is subject to site conditions, the
            engineer&rsquo;s package, and acceptance in writing. If anything in a signed
            agreement differs from the Site or a bid, the signed agreement controls.
          </p>

          <h2>7. License to use the Site; restrictions</h2>
          <p>
            Subject to these Terms, we grant you a limited, non-exclusive,
            non-transferable, revocable license to access and use the Site for your own
            lawful, internal, informational and bid-request purposes. You may not, and may not
            permit others to: copy, reproduce, republish, frame, scrape, harvest, or
            commercially exploit the Site or Content without our written permission;
            reverse engineer or attempt to derive source code; remove proprietary
            notices; or use the Site in a way that infringes any right or violates any
            law. We reserve all rights not expressly granted.
          </p>

          <h2>8. Intellectual property</h2>
          <p>
            The Content is owned by {CONTACT.legalName} or its licensors and is protected
            by copyright, trademark, and other laws. The {CONTACT.legalName} name and
            logo are our trademarks and may not be used without permission.
          </p>
          <p>
            Third-party names and marks — including Henkel, LOCTITE, Tyfo, and Polymer
            Nation, and the other resinous-coating brands, product codes, and standards
            bodies (such as ICC-ES, ACI, and ASCE) referenced on the Site — are the
            property of their respective owners and are used for identification only.
            Their use does not imply any affiliation, sponsorship, or endorsement beyond
            the applicator and trained-installer relationships described on the Site.
          </p>

          <h2>9. Copyright complaints (DMCA)</h2>
          <p>
            We respect intellectual-property rights. If you believe Content on the Site
            infringes your copyright, send a written notice to{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a> that includes: your physical
            or electronic signature; identification of the copyrighted work; identification
            of the allegedly infringing material and its location; your contact
            information; a statement that you have a good-faith belief the use is not
            authorized; and a statement, under penalty of perjury, that the information is
            accurate and that you are the owner or authorized to act for the owner. We
            will respond to valid notices, including by removing the material and, where
            appropriate, providing an opportunity to submit a counter-notice.
          </p>

          <h2>10. Your submissions</h2>
          <p>
            When you send a Submission, you represent that you have the right to share it
            and that doing so does not violate anyone&rsquo;s rights or any
            confidentiality obligation. You grant us a non-exclusive, worldwide,
            royalty-free license to use, store, reproduce, and process your Submission to
            respond to you, scope and bid the work, and keep our project records. Do not
            submit anything unlawful, infringing, confidential, or that you are not
            authorized to disclose, and do not include sensitive personal information
            (see our <a href={`${SITE_URL}/privacy`}>Privacy Policy</a>). We are not
            obligated to keep any Submission confidential except as stated in our Privacy
            Policy or a separate signed agreement.
          </p>

          <h2>11. Acceptable use</h2>
          <p>
            You agree not to: attempt to disrupt, attack, overload, or gain unauthorized
            access to the Site or its systems; introduce malware or harmful code; scrape,
            harvest, or use automated means to collect data; reverse engineer the Site;
            impersonate any person or misrepresent your affiliation; use the Site for any
            unlawful, fraudulent, deceptive, infringing, or harassing purpose; or
            interfere with any other user&rsquo;s use of the Site. We may investigate and
            take legal action against violations, and may suspend or terminate access to
            anyone who violates these Terms.
          </p>

          <h2>12. Third-party links and services</h2>
          <p>
            The Site may link to third-party websites and resources for reference. We do
            not control them and are not responsible for their content, accuracy,
            products, or practices. Accessing a linked site is at your own risk and
            subject to that site&rsquo;s terms and policies.
          </p>

          <h2>13. Disclaimer of warranties</h2>
          <p>
            THE SITE AND CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
            AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED,
            OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. We do not warrant that the
            Site will be uninterrupted, secure, error-free, or that the Content is
            complete, accurate, or current, and details may change without notice. This
            disclaimer concerns the website only; the workmanship, materials, and
            warranties for an actual project are set out in the bid and signed contract
            for that project. Some jurisdictions do not allow certain warranty
            exclusions, so some of the above may not apply to you.
          </p>

          <h2>14. Limitation of liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, {CONTACT.legalName} AND ITS OWNERS,
            EMPLOYEES, AND CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF
            PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATING TO YOUR USE OF
            (OR INABILITY TO USE) THE SITE, EVEN IF ADVISED OF THE POSSIBILITY. TO THE
            FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY ARISING OUT OF OR
            RELATING TO THE SITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS ($100). Nothing
            in these Terms limits liability that cannot be limited under applicable law,
            and some jurisdictions do not allow certain limitations, so some of the above
            may not apply to you. This section does not limit any rights or remedies under
            a signed construction contract.
          </p>

          <h2>15. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless {CONTACT.legalName} and its
            owners, employees, and contractors from and against any claims, losses,
            liabilities, damages, costs, and expenses (including reasonable
            attorneys&rsquo; fees) arising out of or related to your misuse of the Site,
            your violation of these Terms or applicable law, or any Submission you provide
            that infringes or violates a third party&rsquo;s rights.
          </p>

          <h2>16. Dispute resolution; arbitration; class-action waiver</h2>
          <p>
            <strong>Please read this section carefully — it affects your legal rights.</strong>
          </p>
          <p>
            <strong>Informal resolution first.</strong> Before starting an arbitration or
            court proceeding, you agree to contact us at{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a> and give us 30 days to resolve
            the dispute informally and in good faith.
          </p>
          <p>
            <strong>Binding arbitration.</strong> If we cannot resolve a dispute relating
            to the Site or these Terms informally, you and we agree it will be resolved by
            final and binding individual arbitration administered by the American
            Arbitration Association (AAA) under its Consumer Arbitration Rules then in
            effect (or, if AAA is unavailable, by JAMS under its applicable consumer
            rules), before a single arbitrator, rather than in court, except as provided
            below. The Federal Arbitration Act governs the interpretation and enforcement
            of this section. The arbitration will take place in Placer County, California,
            or — at your election — by telephone or videoconference, by written
            submissions, or in the county where you reside. We will pay the filing,
            administrative, and arbitrator fees for any claim subject to this section to
            the extent required by the administrator&rsquo;s consumer rules or applicable
            law; otherwise, each party bears its own attorneys&rsquo; fees except where a
            statute provides for their recovery.
          </p>
          <p>
            <strong>Class-action waiver.</strong> Disputes will be arbitrated only on an
            individual basis. You and we waive any right to bring or participate in a
            class, collective, consolidated, or representative action, and the arbitrator
            may not consolidate more than one person&rsquo;s claims. If this class-action
            waiver is found unenforceable as to a particular claim, that claim (and only
            that claim) will proceed in court, and the remainder of this Section survives.
          </p>
          <p>
            <strong>Exceptions.</strong> Either party may bring an individual claim in
            small-claims court, and either party may seek injunctive or equitable relief
            in court to protect its intellectual property or stop unauthorized use of the
            Site. <strong>30-day opt-out:</strong> you may opt out of this arbitration
            agreement by emailing <a href={CONTACT.emailHref}>{CONTACT.email}</a> within
            30 days of the date you first accept these Terms or first submit a form
            through the Site, whichever is later, stating your name and intent to opt
            out; we will acknowledge a valid opt-out by email. Opting out does not affect
            the other provisions of these Terms.
          </p>

          <h2>17. Governing law and venue</h2>
          <p>
            These Terms are governed by the laws of the State of California, without
            regard to its conflict-of-laws rules. To the extent a dispute is not subject
            to arbitration, you agree it will be brought exclusively in the state or
            federal courts located in or serving Placer County, California, and you
            consent to their personal jurisdiction and venue and waive any objection to
            an inconvenient forum.
          </p>

          <h2>18. Termination</h2>
          <p>
            We may suspend or terminate your access to the Site at any time, with or
            without notice, if we believe you have violated these Terms or to protect the
            Site or others. The sections that by their nature should survive — including
            intellectual property, submissions, disclaimers, limitation of liability,
            indemnification, dispute resolution, and the miscellaneous terms — survive
            termination.
          </p>

          <h2>19. Force majeure</h2>
          <p>
            We are not responsible for any delay or failure to perform caused by events
            beyond our reasonable control, including acts of God, natural disasters,
            labor disputes, utility or network failures, or government action.
          </p>

          <h2>20. Electronic communications</h2>
          <p>
            By using the Site or contacting us through it, you consent to receive
            communications from us electronically, and you agree that electronic
            agreements, notices, and records satisfy any legal requirement that such
            communications be in writing.
          </p>

          <h2>21. Export and sanctions compliance</h2>
          <p>
            You represent that you are not located in, and will not use the Site from, a
            country subject to U.S. embargo, and that you are not on any U.S. government
            restricted-party list.
          </p>

          <h2>22. California consumer notice</h2>
          <p>
            Under California Civil Code &sect; 1789.3, California users are entitled to
            this notice: you may contact us with questions or complaints using the
            details in Section 24. You may also contact the Complaint Assistance Unit of
            the Division of Consumer Services of the California Department of Consumer
            Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, CA
            95834, or by telephone at (800) 952-5210.
          </p>

          <h2>23. Miscellaneous</h2>
          <p>
            These Terms, together with our{" "}
            <a href={`${SITE_URL}/privacy`}>Privacy Policy</a> and any signed agreement
            for a specific project, are the entire agreement between you and us regarding
            the Site and supersede prior understandings about it. If any provision is
            found unenforceable, the rest remain in effect, and the unenforceable
            provision will be limited to the minimum extent necessary. Our failure to
            enforce a provision is not a waiver. You may not assign these Terms without
            our consent; we may assign them in connection with a merger, acquisition, or
            sale of assets. Section headings are for convenience only. These Terms are
            drafted in English, which controls.
          </p>

          <h2>24. Contact us</h2>
          <p>
            Questions about these Terms? Reach {CONTACT.legalName} at{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>,{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>, or {CONTACT.street},{" "}
            {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}.
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
