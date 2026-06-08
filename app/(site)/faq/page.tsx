import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTitle("FAQ — Seismic FRP & Coatings"),
  description:
    "Common questions about seismic FRP retrofit and industrial floor coatings — added mass, cure time, occupancy, and how a job runs.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions engineers and owners ask."
        lead="A few common questions about FRP retrofit and resinous floor coatings. The full, expanded FAQ — reviewed for technical accuracy — arrives in a later build step."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
      </PageHero>
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          Does FRP add mass to the foundation? At a typical installed thickness in
          the 1/8 to 1/4 inch range, externally bonded FRP does not transfer
          significant new mass to foundations. How does a job run? EOR drawings in,
          system engineering, written itemized bid, then surface prep, install, and
          documented QA sign-off at handover.
        </p>
      </section>
    </>
  );
}
