import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTitle("About Salyers Construction"),
  description:
    "A California B1 general contractor since 2011 — engineering-rigorous structural strengthening and industrial coatings. Engineering first, hands behind it.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A California GC. Engineering first, hands behind it."
        lead="Salyers Construction has held a California B1 general contractor license since 2011. The work is structural strengthening — principally FRP seismic retrofit — with industrial epoxy coatings filling the calendar between seismic projects."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
      </PageHero>
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          Built for the engineered work bigger contractors will not bid. An
          engineering-rigorous small shop: lower overhead, faster mobilization on
          tight projects, and direct contact with the lead on your job. We read
          EOR drawings, install to a certified system specification, and document
          what was done.
        </p>
      </section>
    </>
  );
}
