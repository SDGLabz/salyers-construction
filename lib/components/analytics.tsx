"use client";

// Google Analytics 4 (gtag.js), wired through Google Consent Mode so it
// respects the site's US opt-out consent model:
//   • analytics is GRANTED by default,
//   • DENIED when the visitor has clicked "Decline" (salyers_consent) or
//     their browser sends a Global Privacy Control (GPC) signal.
// The <CookieConsent> banner pushes a live `consent: update` when the visitor
// changes their choice (see cookie-consent.tsx), so no reload is needed.
//
// GA measurement ID: hardcoded fallback so it works without extra config;
// override per-environment with NEXT_PUBLIC_GA_ID if ever needed.
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-CX2LV7XF8J";

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* Bootstrap dataLayer + Consent Mode defaults BEFORE the GA library
          loads, so the very first hit honors Decline / GPC. */}
      <Script
        id="ga-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            var __declined = false;
            try {
              if (navigator.globalPrivacyControl) __declined = true;
              if (localStorage.getItem('salyers_consent') === 'declined') __declined = true;
            } catch (e) {}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: __declined ? 'denied' : 'granted'
            });
            gtag('config', '${GA_ID}');
          `,
        }}
      />
      <Script
        id="ga-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
    </>
  );
}
