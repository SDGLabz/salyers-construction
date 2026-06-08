import type { Metadata } from "next";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: seoTitle("Privacy Policy"),
  description:
    "How Salyers Construction handles information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How we handle the information you share with us through this site."
      />
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          When you contact us or request a bid, we collect the details you provide
          — your name, company, email, phone, and project description — and use
          them only to respond to your request and prepare a bid. We do not sell
          your information. Inquiries are delivered to{" "}
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>. This summary will be
          expanded into a full policy before launch; questions in the meantime can
          go to that address.
        </p>
      </section>
    </>
  );
}
