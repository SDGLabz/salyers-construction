"use client";

// Opt-out cookie consent banner (US-style: tracking loads by default,
// banner lets visitors decline). Stores preference in localStorage.
// When the (future) identity-resolution pixel is wired up, it should
// check `getConsentStatus()` before loading.
//
// The pixel is currently OFF / not built — this banner gates the future
// pixel + any non-essential analytics. Essential cookies (consent pref)
// are always set.
import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "salyers_consent";
type ConsentStatus = "accepted" | "declined" | null;

/** Read the stored consent status (callable from any client module). */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "accepted" || v === "declined") return v;
  return null;
}

/** Returns true if non-essential tracking is allowed. */
export function isTrackingAllowed(): boolean {
  // Respect Global Privacy Control (GPC) header
  if (typeof navigator !== "undefined" && (navigator as { globalPrivacyControl?: boolean }).globalPrivacyControl) {
    return false;
  }
  const status = getConsentStatus();
  // US opt-out model: tracking is allowed until the user explicitly declines
  return status !== "declined";
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if user already made a choice
    const status = getConsentStatus();
    if (status) return;
    // Respect GPC — auto-decline if set
    if ((navigator as { globalPrivacyControl?: boolean }).globalPrivacyControl) {
      localStorage.setItem(CONSENT_KEY, "declined");
      return;
    }
    // Show the banner after a short delay so it doesn't flash on load
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  return (
    <div className="cc-banner" role="dialog" aria-label="Cookie consent">
      <div className="cc-inner">
        <p className="cc-text">
          We store one small preference to remember your cookie choice. This site
          doesn&rsquo;t currently run third-party analytics or advertising &mdash; and
          if that ever changes, you can decline it here.{" "}
          <Link href="/privacy" className="cc-link">
            Privacy Policy
          </Link>
        </p>
        <div className="cc-actions">
          <button type="button" className="btn btn-primary cc-btn" onClick={accept}>
            Accept
          </button>
          <button type="button" className="btn btn-outline cc-btn" onClick={decline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
