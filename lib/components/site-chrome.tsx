// Shared header + footer for interior pages. The homepage reuses these for now;
// a bespoke transparent-over-hero homepage nav comes in a later batch.
import Link from "next/link";
import { MobileMenu } from "@/lib/components/mobile-menu";
import { Logo } from "@/lib/components/logo";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { CONTACT } from "@/lib/contact";

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/certifications", label: "Certifications" },
  { href: "/service-area", label: "Service Area" },
  { href: "/faq", label: "FAQ" },
] as const;

// Shared "Company" dropdown (CSS :hover/:focus-within driven, no JS).
export function CompanyDropdown() {
  return (
    <div className="site-dd" role="navigation" aria-label="Company pages">
      <button type="button" className="site-dd-trigger" aria-haspopup="true">
        Company
        <svg className="site-dd-chev" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M2.5 4 5 6.5 7.5 4" />
        </svg>
      </button>
      <div className="site-dd-menu" role="menu">
        {COMPANY_LINKS.map((l) => (
          <Link key={l.href} href={l.href} role="menuitem">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-nav">
        <Link href="/" className="site-logo" aria-label="Salyers Construction — home">
          <Logo />
        </Link>
        <nav className="site-links" aria-label="Primary">
          <Link href="/seismic">Seismic FRP</Link>
          <Link href="/coatings">Coatings</Link>
          <Link href="/projects">Projects</Link>
          <CompanyDropdown />
        </nav>
        {/* Primary CTA opens the multistep bid wizard (modal). */}
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary site-cta" />
        <MobileMenu />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="sf-grid">
          <div className="sf-brand">
            <Logo light />
            <p>
              Engineered seismic strengthening and industrial coatings.
              California, since {CONTACT.since}.
            </p>
            <p className="sf-license">{CONTACT.license}</p>
            <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary sf-cta" />
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              <li>
                <Link href="/seismic">Seismic FRP Retrofit</Link>
              </li>
              <li>
                <Link href="/coatings">Industrial Coatings</Link>
              </li>
              <li>
                <Link href="/service-area">Service Area</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/certifications">Certifications</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>
                <a href={CONTACT.emailHref}>{CONTACT.email}</a>
              </li>
              <li>
                {CONTACT.street}, {CONTACT.city}, {CONTACT.region}{" "}
                {CONTACT.postalCode}
              </li>
            </ul>
          </div>
        </div>
        <div className="sf-bottom">
          <span>
            © 2026 {CONTACT.legalName}. {CONTACT.license}.
          </span>
          <span className="sf-legal">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </span>
          <span className="sf-rpi">Engineered to strengthen. Built to spec.</span>
        </div>
      </div>
    </footer>
  );
}
