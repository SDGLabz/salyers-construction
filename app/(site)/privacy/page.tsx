import type { Metadata } from "next";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import "./legal.css";

export const metadata: Metadata = {
  title: seoTitle("Privacy Policy"),
  description:
    "How Salyers Construction collects, uses, shares, retains, and protects the information you submit through this website, and the privacy choices and rights you have, including for California residents.",
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
        lead="What we collect when you contact us or request a bid, how we use and share it, how long we keep it, and the choices and rights you have — including California privacy rights."
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* ---- At a glance bento (quick summary) ---- */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">At a glance</p>
            <h2>What we collect, and what we do with it.</h2>
            <p className="lede">
              The short version. Everything here applies to information you submit
              through the bid, drawings, samples, and contact forms on this website.
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
                follow up, and keep our own project records.
              </p>
            </article>
            <article className="bento-card">
              <h3>Where it goes</h3>
              <p>
                Submissions are delivered to{" "}
                <a href={CONTACT.emailHref}>{CONTACT.email}</a> via our email
                provider, and shared only with people on your project, when needed.
              </p>
            </article>
            <article className="bento-card">
              <h3>What we don&rsquo;t do</h3>
              <p>
                We do not sell or share your information for advertising, and we
                do not trade it to data brokers.
              </p>
            </article>
            <article className="bento-card">
              <h3>Tracking</h3>
              <p>
                No third-party analytics or ad pixel runs today. If one is ever
                added, the consent banner gates it and we honor Global Privacy
                Control.
              </p>
            </article>
            <article className="bento-card">
              <h3>Your rights</h3>
              <p>
                Ask us to access, correct, or delete your information any time —
                email <a href={CONTACT.emailHref}>{CONTACT.email}</a> or call{" "}
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ---- Full policy ---- */}
      <section className="sec">
        <div className="wrap lx-prose">
          <p className="lx-updated">Effective date: June 8, 2026</p>
          <p className="lede">
            This Privacy Policy explains what information {CONTACT.legalName}{" "}
            (&ldquo;{CONTACT.legalName},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) collects through this website, how we use and share it,
            how long we keep it, and the choices and rights you have. By using this
            site or submitting a form, you agree to this Policy.
          </p>

          <h2>1. Who we are</h2>
          <p>
            {CONTACT.legalName} is a California general building contractor (CSLB
            license {CONTACT.license}) located at {CONTACT.street}, {CONTACT.city},{" "}
            {CONTACT.region} {CONTACT.postalCode}. This Policy applies to this website
            and the bid, drawings, samples, and inquiry forms on it. It does not cover
            any third-party website we link to.
          </p>

          <h2>2. Information we collect</h2>
          <p>
            <strong>Information you give us.</strong> When you contact us or use a
            form, we collect what you choose to provide — your name, company, role,
            email address, phone number, project location, the line of work and
            project type, square footage and facility details, your message, and any
            drawings, documents, or photos you upload. You don&rsquo;t have to provide
            this, but we can&rsquo;t prepare a bid without enough of it to scope the
            work.
          </p>
          <p>
            <strong>Information collected automatically.</strong> Like most websites,
            our hosting provider records standard technical data when you visit — such
            as your IP address, browser type, device, referring page, and the pages
            you view — in server logs used to operate, secure, and troubleshoot the
            site. We also store one small item in your browser to remember your cookie
            choice (see Section 4).
          </p>
          <p>
            <strong>What we don&rsquo;t want.</strong> We don&rsquo;t ask for sensitive
            personal information (such as government IDs, financial account numbers, or
            health data) through this website — please don&rsquo;t include it in a form
            or attachment. This site is not directed to children (see Section 10).
          </p>
          <p>
            <strong>In CCPA/CPRA terms,</strong> the personal information we collect
            falls into these categories: identifiers (name, email, phone); commercial
            and professional information (company, role, project details); internet or
            network activity (server-log data such as IP address and pages viewed); and
            approximate geolocation (the project city or county you provide). We do not
            collect sensitive personal information through this site.
          </p>

          <h2>3. How we use your information</h2>
          <ul>
            <li>To respond to your inquiry, scope your project, and prepare and send a written, itemized bid;</li>
            <li>To follow up about that project and our working relationship;</li>
            <li>To keep internal records of the projects we bid and perform;</li>
            <li>To operate, secure, maintain, and improve this website;</li>
            <li>To prevent abuse (our forms use a spam-prevention &ldquo;honeypot&rdquo; field) and to comply with law and protect our rights, your safety, and others.</li>
          </ul>
          <p>
            We process your information only for the purposes above or a compatible
            purpose. Where the law requires a legal basis, ours are your consent, our
            legitimate interest in running our business and answering your request, and
            taking steps at your request before entering a contract.
          </p>

          <h2>4. Cookies and similar technologies</h2>
          <p>
            <strong>Essential.</strong> We store a single preference in your
            browser&rsquo;s local storage to remember whether you accepted or declined
            non-essential technologies. It is required to honor your choice and is not
            used to track you.
          </p>
          <p>
            <strong>Analytics and advertising.</strong> This site is built to support,
            but does <strong>not currently run</strong>, any third-party analytics or
            identity/advertising pixel. If we enable one in the future, the consent
            banner lets you decline it, and we will honor your &ldquo;Decline&rdquo;
            choice, your browser settings, and the Global Privacy Control (GPC) signal —
            a GPC signal is treated as a decline automatically. We do not use cookies for
            cross-site tracking or targeted advertising.
          </p>
          <p>
            <strong>Your controls.</strong> Use the banner&rsquo;s Accept / Decline
            buttons, your browser&rsquo;s privacy and cookie settings, or a GPC-enabled
            browser or extension. If your browser sends GPC, we treat it as a request
            to decline non-essential technologies and to opt out of any
            &ldquo;sale&rdquo; or &ldquo;sharing.&rdquo;
          </p>

          <h2>5. How we share information</h2>
          <p>
            We do not sell your personal information, and we do not share it for
            cross-context behavioral advertising. We never trade your details to
            advertisers or data brokers. We disclose information only as follows:
          </p>
          <ul>
            <li>
              <strong>Service providers.</strong> We use a small number of vendors to
              run the site and our forms — including our hosting and infrastructure
              provider (Vercel) and our email-delivery provider (Resend), which
              transmits your form submission to us. They process information on our
              behalf, under contract, only to provide their service.
            </li>
            <li>
              <strong>Project participants.</strong> When it is necessary to do the work
              you asked about, we may share relevant details with people on the same
              project — for example the structural engineer of record, a general
              contractor or building owner, or a material manufacturer when a product
              specification requires it.
            </li>
            <li>
              <strong>Legal and safety.</strong> We may disclose information if required
              by law, subpoena, or government request, or to protect the rights,
              property, or safety of {CONTACT.legalName}, our clients, or others.
            </li>
            <li>
              <strong>Business transfer.</strong> If our business is sold or
              reorganized, information may transfer as part of that transaction, subject
              to this Policy.
            </li>
          </ul>

          <h2>6. How long we keep it</h2>
          <p>
            We keep your submission and any documents you send for as long as we need
            them to respond, scope and bid the work, perform any resulting project, and
            maintain our business and legal records. When information is no longer
            needed for those purposes, we delete or anonymize it. You can ask us to
            delete your information at any time (see Section 8), subject to records we
            are required by law to keep.
          </p>

          <h2>7. How we protect it</h2>
          <p>
            We use reasonable administrative and technical safeguards, including
            encrypted transport (HTTPS) for this site and limiting who can read the
            inbox where submissions arrive. No website or method of transmission is
            completely secure, so we cannot guarantee absolute security.
          </p>

          <h2>8. Your privacy rights</h2>
          <p>
            <strong>California residents (CCPA/CPRA).</strong> You have the right to
            know and access the personal information we have collected about you, to
            request that we delete or correct it, and to opt out of the
            &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information — though
            we do not sell or share it. You have the right not to be treated
            differently for exercising these rights, and to use an authorized agent. We
            honor the Global Privacy Control as a valid opt-out signal. Under
            California&rsquo;s &ldquo;Shine the Light&rdquo; law, we confirm we do not
            disclose personal information to third parties for their own direct-marketing
            purposes.
          </p>
          <p>
            <strong>Other U.S. states.</strong> If your state grants similar rights
            (such as to access, correct, delete, or opt out), you may exercise them the
            same way.
          </p>
          <p>
            <strong>How to exercise your rights.</strong> Email{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a> or call{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>. We may need to verify your
            identity before acting on a request, and we will respond within the time the
            law allows.
          </p>

          <h2>9. Third-party links</h2>
          <p>
            This site may link to other websites (for example, manufacturer or
            standards pages). We do not control and are not responsible for their content
            or privacy practices. Review their policies before sharing information with
            them.
          </p>

          <h2>10. Children&rsquo;s privacy</h2>
          <p>
            This website is intended for businesses and the people who build, own, and
            approve construction projects. It is not directed to children, and we do not
            knowingly collect personal information from anyone under 16. If you believe a
            child has provided information, contact us and we will delete it.
          </p>

          <h2>11. Where your information is processed</h2>
          <p>
            We operate from the United States, and the information you submit is
            processed and stored in the United States. If you access this site from
            outside the U.S., you understand your information will be transferred to and
            handled in the U.S.
          </p>

          <h2>12. Changes to this Policy</h2>
          <p>
            We may update this Policy from time to time. When we do, we will revise the
            &ldquo;Effective date&rdquo; above, and significant changes will be reflected
            on this page. Your continued use of the site after an update means you accept
            the revised Policy.
          </p>

          <h2>13. Contact us</h2>
          <p>
            Questions about this Policy or your information? Reach us at{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>,{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>, or {CONTACT.legalName},{" "}
            {CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}. This
            Policy works alongside our <a href={`${SITE_URL}/terms`}>Terms &amp; Conditions</a>.
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
