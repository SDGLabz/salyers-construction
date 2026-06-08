import type { Metadata } from "next";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: seoTitle("Contact — Request a Bid"),
  description:
    "Request a written, itemized bid for seismic FRP retrofit or industrial coatings, or send project drawings. California B1 #960653.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about the building."
        lead="Written, itemized bids back inside 1–2 business days. Send the engineer-of-record drawings if you have them, or describe the scope and we'll take it from there."
      />
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          The full multi-step bid request opens here in the next build step. For
          now, reach us directly:
        </p>
        <ul style={{ marginTop: "18px", lineHeight: 2, listStyle: "none" }}>
          <li>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </li>
          <li>
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
          </li>
          <li>
            {CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
          </li>
        </ul>
      </section>
    </>
  );
}
