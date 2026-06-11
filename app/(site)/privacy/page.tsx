import type { Metadata } from "next";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import "./legal.css";

export const metadata: Metadata = {
  title: seoTitle("Privacy Policy"),
  description:
    "How Salyers Construction collects, uses, discloses, retains, and protects personal information through this website, and the privacy rights of California, other U.S. state, and international (GDPR/UK) residents.",
};

export default function PrivacyPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy` },
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
        lead="What we collect when you use this website or request a bid, how we use, disclose, and protect it, how long we keep it, and the privacy rights you have — including for California, other U.S. state, and international residents."
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* ---- At a glance bento (quick summary) ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">At a glance</p>
            <h2>The short version.</h2>
            <p className="lede">
              A plain-English summary. The full, controlling Privacy Policy is below
              and governs in the event of any conflict.
            </p>
          </div>

          <div className="bento lx-bento">
            <article className="bento-card">
              <h3>What we collect</h3>
              <p>
                Your name, company, role, email, phone, project details, and any
                drawings, documents, or photos you choose to upload.
              </p>
            </article>
            <article className="bento-card">
              <h3>Why we use it</h3>
              <p>
                Only to respond, scope the work, prepare a written itemized bid,
                follow up, run the site, and keep our own project records.
              </p>
            </article>
            <article className="bento-card">
              <h3>Where it goes</h3>
              <p>
                Submissions reach{" "}
                <a href={CONTACT.emailHref}>{CONTACT.email}</a> through our email
                provider, shared only with people on your project, when needed.
              </p>
            </article>
            <article className="bento-card">
              <h3>What we don&rsquo;t do</h3>
              <p>
                We do not sell or share your information for advertising, and we do
                not trade it to data brokers.
              </p>
            </article>
            <article className="bento-card">
              <h3>Tracking</h3>
              <p>
                We use Google Analytics to understand how the Site is used. It runs
                only when you have not declined and no Global Privacy Control signal
                is present &mdash; the consent banner gates it.
              </p>
            </article>
            <article className="bento-card">
              <h3>Your rights</h3>
              <p>
                Access, correct, delete, or opt out — email{" "}
                <a href={CONTACT.emailHref}>{CONTACT.email}</a> or call{" "}
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ---- Full policy ---- */}
      <section className="sec">
        <div className="wrap lx-prose">
          <p className="lx-updated">Effective date: June 8, 2026 &middot; Last updated: June 8, 2026</p>
          <p className="lede">
            This Privacy Policy (&ldquo;Policy&rdquo;) describes how {CONTACT.legalName}{" "}
            (&ldquo;{CONTACT.legalName},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) collects, uses, discloses, retains, and protects personal
            information through this website and the bid, drawings, samples, and inquiry
            forms on it (collectively, the &ldquo;Site&rdquo;), and explains the privacy
            choices and rights available to you. By accessing or using the Site or
            submitting information through it, you acknowledge that you have read and
            understood this Policy. If you do not agree, please do not use the Site.
          </p>

          <h2>1. Scope and definitions</h2>
          <p>
            This Policy applies to personal information we process in connection with
            the Site. It does not apply to information collected offline, through
            separate signed agreements, or by any third-party website or service we link
            to. In this Policy: <strong>&ldquo;personal information&rdquo;</strong> (or
            &ldquo;personal data&rdquo;) means information that identifies, relates to,
            or could reasonably be linked to an identified or identifiable individual or
            household; <strong>&ldquo;sensitive personal information&rdquo;</strong>{" "}
            means the subset of personal information given heightened protection by law
            (such as government identifiers, financial account credentials, precise
            geolocation, or health data); <strong>&ldquo;process&rdquo;</strong> means
            any operation performed on personal information; and{" "}
            <strong>&ldquo;service provider&rdquo;</strong> (or
            &ldquo;processor&rdquo;) means a vendor that processes personal information
            on our behalf and under our instructions.
          </p>

          <h2>2. Personal information we collect</h2>
          <p>
            We collect the categories of personal information below. We do not collect
            more than we need, and many fields are optional — though we cannot prepare a
            bid without enough information to scope the work. This Policy, together with
            the short notice shown on our forms, serves as our <strong>notice at
            collection</strong> under the CCPA/CPRA: we collect the categories described
            in this Section for the purposes in Section 4, retain them as described in
            Section 8, and do not sell or share personal information.
          </p>
          <ul>
            <li>
              <strong>Identifiers and contact information</strong> — your name, company,
              role/title, email address, and phone number.
            </li>
            <li>
              <strong>Commercial and professional information</strong> — the line of
              work, project type, square footage, facility details, timeline, and the
              message and scope you provide.
            </li>
            <li>
              <strong>Project files you upload</strong> — drawings, documents, and
              photos you choose to attach to a request (which may themselves contain
              personal information you include).
            </li>
            <li>
              <strong>Approximate geolocation</strong> — the project city, county, or
              region you tell us (we do not collect precise device location).
            </li>
            <li>
              <strong>Internet and network activity</strong> — standard technical data
              recorded by our hosting provider in server logs, such as IP address,
              browser type, device, referring page, and the pages you view, used to
              operate, secure, and troubleshoot the Site.
            </li>
            <li>
              <strong>Cookie/consent preference</strong> — a single value stored in your
              browser to remember your cookie choice (see Section 7).
            </li>
          </ul>
          <p>
            <strong>In CCPA/CPRA category terms,</strong> the above maps to identifiers;
            customer records and commercial/professional information; internet or
            network activity; approximate geolocation; and audio/visual or document
            content you upload. We do <strong>not</strong> collect sensitive personal
            information through this Site, and we ask that you not submit it in a form or
            attachment. We do not knowingly process the personal information of children
            (see Section 13).
          </p>

          <h2>3. Sources of personal information</h2>
          <ul>
            <li><strong>Directly from you</strong>, when you complete a form, upload files, email, or call us.</li>
            <li><strong>Automatically</strong>, through standard server logs generated by your interaction with the Site.</li>
            <li><strong>From your organization or representatives</strong>, if a colleague, engineer, or agent submits a request that involves you.</li>
          </ul>

          <h2>4. How we use personal information</h2>
          <ul>
            <li>To respond to your inquiry, scope your project, and prepare and send a written, itemized bid;</li>
            <li>To follow up about that project and our working relationship, and to perform any resulting contract;</li>
            <li>To keep internal business and project records;</li>
            <li>To operate, maintain, secure, debug, and improve the Site;</li>
            <li>To detect, prevent, and respond to fraud, abuse, and security incidents (our forms use a spam-prevention &ldquo;honeypot&rdquo; field); and</li>
            <li>To comply with law and legal process, enforce our terms, and protect our rights, your safety, and the rights and safety of others.</li>
          </ul>
          <p>
            We process personal information only for the purposes described in this
            Policy or a compatible purpose, and we do not use it for incompatible
            purposes without notice or, where required, consent. We do not use your
            information for automated decision-making or profiling that produces legal or
            similarly significant effects (see Section 14).
          </p>

          <h2>5. Legal bases for processing (EEA / UK / Switzerland)</h2>
          <p>
            If you are in the European Economic Area, the United Kingdom, or
            Switzerland, we process your personal information on one or more of these
            legal bases: your <strong>consent</strong> (which you may withdraw at any
            time); the <strong>performance of a contract</strong> or steps you ask us to
            take before entering one; compliance with a <strong>legal obligation</strong>;
            and our <strong>legitimate interests</strong> in operating and securing our
            business and responding to your request, where those interests are not
            overridden by your rights.
          </p>

          <h2>6. How we disclose personal information</h2>
          <p>
            We do <strong>not sell</strong> your personal information, and we do not
            &ldquo;share&rdquo; it for cross-context behavioral advertising (as those
            terms are defined under California law). We have not sold or shared personal
            information in the preceding 12 months. We never trade your details to
            advertisers or data brokers. We disclose personal information only as
            follows:
          </p>
          <ul>
            <li>
              <strong>Service providers / processors.</strong> A small number of vendors
              process information on our behalf, under contract, solely to provide their
              service — including our hosting and infrastructure provider (Vercel), our
              email-delivery provider (Resend), which transmits your form submission to
              us, and Google LLC, which provides Google Analytics (website-usage
              measurement) subject to your analytics consent.
            </li>
            <li>
              <strong>Project participants.</strong> When necessary to do the work you
              asked about, we may disclose relevant details to people on the same project
              — such as the structural engineer of record, a general contractor or
              building owner, or a material manufacturer when a product specification
              requires it.
            </li>
            <li>
              <strong>Legal, safety, and compliance.</strong> We may disclose information
              when required by law, subpoena, court order, or government request, or when
              we believe disclosure is necessary to protect the rights, property, or
              safety of {CONTACT.legalName}, our clients, or others, or to investigate
              fraud or security issues.
            </li>
            <li>
              <strong>Business transfers.</strong> If we are involved in a merger,
              acquisition, financing, reorganization, or sale of assets, personal
              information may be transferred as part of that transaction, subject to this
              Policy.
            </li>
            <li>
              <strong>With your direction or consent.</strong> We may disclose
              information for any other purpose you direct or consent to.
            </li>
          </ul>

          <h2>7. Cookies and similar technologies</h2>
          <p>
            <strong>Strictly necessary / functional.</strong> We store a single
            preference in your browser&rsquo;s local storage to remember whether you
            accepted or declined non-essential technologies. It is required to honor your
            choice and is not used to track you.
          </p>
          <p>
            <strong>Analytics.</strong> The Site uses <strong>Google Analytics 4</strong>,
            a web-analytics service provided by Google LLC, to measure traffic and
            understand how visitors use the Site — for example, pages viewed, referring
            links, and the approximate region and device/browser type derived from your IP
            address (Google Analytics 4 does not log or store your full IP address). Google
            Analytics sets first-party cookies and processes this usage data on our behalf
            as a service provider. We have <strong>not</strong> enabled Google Analytics
            advertising features, and we do not use it for cross-context behavioral
            advertising or to build cross-site profiles of you. Google Analytics loads
            through Google Consent Mode and runs <strong>only when analytics consent is
            granted</strong> — that is, when you have not clicked &ldquo;Decline&rdquo; and
            no Global Privacy Control (GPC) signal is present. A &ldquo;Decline&rdquo;
            choice or a GPC signal detected in your browser is treated as a decline
            automatically, and no analytics cookies are set. You can also opt out using
            Google&rsquo;s browser add-on at tools.google.com/dlpage/gaoptout.
          </p>
          <p>
            <strong>Your controls.</strong> Use the banner&rsquo;s Accept / Decline
            buttons, your browser&rsquo;s privacy and cookie settings, or a GPC-enabled
            browser or extension to express an opt-out preference. Because we do not run
            cross-context advertising, we do not respond differently to legacy
            &ldquo;Do Not Track&rdquo; headers, but we honor GPC as described above.
          </p>

          <h2>8. How long we keep personal information</h2>
          <p>
            We retain personal information for as long as necessary to fulfill the
            purposes in this Policy — to respond, scope and bid the work, perform any
            resulting project, and maintain our business, accounting, warranty, and legal
            records — and then we delete or de-identify it. Retention periods are
            determined by the nature and sensitivity of the information, the purpose for
            which it was collected, applicable legal and contractual requirements, and
            our legitimate business needs. You may request deletion at any time (see
            Section 9), subject to information we are required or permitted by law to
            retain.
          </p>

          <h2>9. Your privacy rights and how to exercise them</h2>
          <p>
            Depending on where you live, you may have some or all of the following
            rights. We will not discriminate or retaliate against you for exercising
            them.
          </p>
          <p>
            <strong>California residents (CCPA/CPRA).</strong> You have the right to know
            and access the categories and specific pieces of personal information we have
            collected, the sources, the business purposes, and the categories of third
            parties to whom we disclose it; to request deletion; to request correction of
            inaccurate information; to opt out of the &ldquo;sale&rdquo; or
            &ldquo;sharing&rdquo; of personal information (we do neither); and to limit
            the use of sensitive personal information (we do not collect it). You have
            the right to be free from discrimination for exercising these rights and to
            use an authorized agent. We honor the Global Privacy Control as a valid
            opt-out signal. We do not offer financial incentives for personal
            information. Under California&rsquo;s &ldquo;Shine the Light&rdquo; law (Civil
            Code &sect; 1798.83), we confirm we do not disclose personal information to
            third parties for their own direct-marketing purposes.
          </p>
          <p>
            <strong>Other U.S. state residents.</strong> If you reside in a state with a
            comprehensive privacy law — such as Virginia, Colorado, Connecticut, Utah,
            Texas, Oregon, Montana, and others as they take effect — you may have rights
            to confirm whether we process your personal information and to access,
            correct, delete, or obtain a portable copy of it, and to opt out of targeted
            advertising, sale, or certain profiling. Where the law provides, you may also
            appeal a decision on your request.
          </p>
          <p>
            <strong>EEA, UK, and Switzerland (GDPR / UK GDPR).</strong> You may have the
            right to access; to rectification; to erasure (&ldquo;right to be
            forgotten&rdquo;); to restriction of processing; to data portability; to
            object to processing based on legitimate interests; and to withdraw consent
            at any time without affecting prior processing. You also have the right to
            lodge a complaint with your local supervisory authority.
          </p>
          <p>
            <strong>How to submit a request.</strong> Email{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a> or call{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>. To protect your information,
            we may need to verify your identity (and, for an authorized agent, proof of
            authorization) before we act. We will respond within the timeframe required
            by applicable law, and where the law allows an appeal of our decision, we
            will tell you how to appeal.
          </p>

          <h2>10. Data security</h2>
          <p>
            We maintain reasonable administrative, technical, and organizational
            safeguards designed to protect personal information against unauthorized
            access, use, alteration, and destruction, including encrypted transport
            (HTTPS) for the Site and limiting who can access the inbox where submissions
            arrive. No website, electronic transmission, or storage method is completely
            secure, so we cannot guarantee absolute security. If we become aware of a
            security incident affecting your personal information, we will notify you and
            the relevant authorities as required by law.
          </p>

          <h2>11. International data transfers</h2>
          <p>
            We operate from, and process and store personal information in, the United
            States. If you access the Site from outside the United States, you understand
            that your information will be transferred to and processed in the United
            States, where data-protection laws may differ from those of your
            jurisdiction. Where required, we rely on appropriate safeguards (such as
            standard contractual clauses) for cross-border transfers. {CONTACT.legalName}{" "}
            is established in the United States and does not target or offer services to
            individuals in the EEA or UK, and so has not appointed an Article 27
            representative; EEA, UK, and Swiss residents may contact us using the details
            in Section 17.
          </p>

          <h2>12. Third-party links and services</h2>
          <p>
            The Site may link to third-party websites and resources (for example,
            manufacturer or standards pages). We do not control and are not responsible
            for their content, accuracy, or privacy practices. This Policy does not apply
            to those sites; review their policies before sharing information with them.
          </p>

          <h2>13. Children&rsquo;s privacy</h2>
          <p>
            The Site is a general-audience business website intended for adults — the
            engineers, contractors, building owners, and public agencies who source,
            design, and approve construction projects. It is not directed to, or intended
            for use by, children.
          </p>
          <p>
            Consistent with the U.S. Children&rsquo;s Online Privacy Protection Act
            (COPPA), we <strong>never knowingly collect, use, sell, share, or retain the
            personal information of children under 13</strong>, and we do not ask for a
            date of birth or otherwise request information that would tell us a visitor is
            under 13. Our forms <strong>require</strong> each person to confirm they are
            at least 18 years old — via a mandatory checkbox — before a request can be
            submitted, and our systems reject any submission that does not include that
            confirmation. We do not use personal information for advertising or profiling,
            including of minors. We also do not knowingly collect, sell, or share the
            personal information of minors under 16, as addressed by California law (and
            we do not sell or share personal information at all).
          </p>
          <p>
            We do not want personal information from children. If you are a parent or
            guardian and believe a child under 13 has provided us personal information,
            or if you otherwise become aware that we may have it, contact us at{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a> and we will promptly delete it
            and stop any further collection or use.
          </p>

          <h2>14. Automated decision-making</h2>
          <p>
            We do not use your personal information to make decisions about you based
            solely on automated processing — including profiling — that produce legal or
            similarly significant effects.
          </p>

          <h2>15. Do Not Track and Global Privacy Control</h2>
          <p>
            Some browsers offer &ldquo;Do Not Track&rdquo; signals and a Global Privacy
            Control (GPC) signal. The Site runs Google Analytics but does not run
            cross-context behavioral advertising. Where a GPC signal is present, we treat
            it as a valid request to opt out of any sale or sharing and to decline
            non-essential technologies, and we honor it automatically — Google Analytics is
            not loaded and no analytics cookies are set. Because we do not run
            cross-context behavioral advertising, we do not respond differently to legacy
            &ldquo;Do Not Track&rdquo; headers.
          </p>

          <h2>16. Changes to this Policy</h2>
          <p>
            We may update this Policy from time to time to reflect changes in our
            practices, technology, or the law. When we do, we will revise the
            &ldquo;Last updated&rdquo; date above, and material changes will be reflected
            on this page. Your continued use of the Site after an update constitutes
            acceptance of the revised Policy.
          </p>

          <h2>17. How to contact us</h2>
          <p>
            For questions about this Policy, to exercise your rights, or to make a
            privacy complaint, contact {CONTACT.legalName} at{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>,{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>, or {CONTACT.street},{" "}
            {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}. EEA, UK, or Swiss
            residents also have the right to complain to their local data-protection
            authority. This Policy works alongside our{" "}
            <a href={`${SITE_URL}/terms`}>Terms &amp; Conditions</a>.
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
                <h2>Ready to put a real bid in front of you.</h2>
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
