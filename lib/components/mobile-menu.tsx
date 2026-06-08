"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import { Logo } from "@/lib/components/logo";

/**
 * Shared mobile hamburger menu — identical on every page. Full-screen panel
 * (portaled to body so no transformed ancestor traps it) with the nav, the
 * Company section, a "Request a Bid" CTA, and the company NAP. Auto-closes
 * whenever a link is tapped. Search lives in the nav bar (outside this menu).
 */

const NAV = [
  { href: "/seismic", label: "Seismic FRP" },
  { href: "/coatings", label: "Coatings" },
  { href: "/projects", label: "Projects" },
];

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/certifications", label: "Certifications" },
  { href: "/service-area", label: "Service Area" },
  { href: "/faq", label: "FAQ" },
];

const emptySubscribe = () => () => {};

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  // Hydration-safe "am I on the client" flag without setState-in-effect:
  // server snapshot is false, client snapshot is true.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const panel = (
    <div className="mnav" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="mnav-top">
        <Link href="/" className="mnav-logo" onClick={close} aria-label="Salyers Construction — home">
          <Logo light />
        </Link>
        <button type="button" className="mnav-x" aria-label="Close menu" onClick={close}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <nav className="mnav-links" aria-label="Mobile">
        {NAV.map((l) => (
          <Link key={l.href} href={l.href} onClick={close}>
            {l.label}
          </Link>
        ))}
        <span className="mnav-group">Company</span>
        {COMPANY.map((l) => (
          <Link key={l.href} href={l.href} className="mnav-sub" onClick={close}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="mnav-cta">
        <Link href="/contact" className="btn btn-primary mnav-contact" onClick={close}>
          Request a Bid
        </Link>
      </div>

      <div className="mnav-info">
        <a href={CONTACT.phoneHref} onClick={close}>
          {CONTACT.phone}
        </a>
        <a href={CONTACT.emailHref} onClick={close}>
          {CONTACT.email}
        </a>
        <span>
          {CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
        </span>
        <span>
          California GC since {CONTACT.since} · {CONTACT.license}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="mnav-burger"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="mnav-burger-bars" aria-hidden="true" />
      </button>
      {mounted && open ? createPortal(panel, document.body) : null}
    </>
  );
}
