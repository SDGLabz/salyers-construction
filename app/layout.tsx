import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { CookieConsent } from "@/lib/components/cookie-consent";
import { Analytics } from "@/lib/components/analytics";
import "./globals.css";

// Display + body — Google Sans (now public on Google Fonts). Exposed to
// globals.css as --font-google-sans.
const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-google-sans",
  display: "swap",
});

// Mono for specs, standards codes, and labels — Google Sans Code.
const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-google-sans-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Salyers Construction — Seismic FRP Retrofit & Industrial Coatings",
  description:
    "California B1 general contractor (#960653) for seismic FRP retrofit and industrial epoxy coatings. Engineered strengthening built to spec — statewide California, since 2011.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Salyers Construction — Seismic FRP Retrofit & Industrial Coatings",
    description:
      "Seismic FRP retrofit and industrial coatings, statewide California. Engineered to strengthen. Built to spec.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSans.variable} ${googleSansCode.variable}`}>
      <body>
        <Analytics />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
