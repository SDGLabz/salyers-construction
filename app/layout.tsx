import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

// Display / headings / logo wordmark — Archivo Black (official Salyers brand
// kit). Exposed to globals.css as --font-archivo-black.
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
  display: "swap",
});

// Body / UI / eyebrows — Inter.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
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
    <html lang="en" className={`${archivoBlack.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
