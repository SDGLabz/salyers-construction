import type { Metadata } from "next";
import { Lato, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

// Display + body: Lato (matches the approved Salyers brand). Exposed to
// globals.css as --font-lato.
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

// Technical mono for eyebrows, specs, standards codes, and labels.
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
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
    <html lang="en" className={`${lato.variable} ${ibmPlexMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
