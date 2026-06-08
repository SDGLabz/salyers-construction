import type { Metadata } from "next";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTitle("Terms & Conditions"),
  description: "Terms of use for the Salyers Construction website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        lead="The terms that govern your use of this website."
      />
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          The content on this site is provided for general information about
          Salyers Construction&rsquo;s services and does not constitute a binding
          quote or engineering advice. Every project is bid and contracted
          individually. This summary will be expanded into full terms before
          launch.
        </p>
      </section>
    </>
  );
}
