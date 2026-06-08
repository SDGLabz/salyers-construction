import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTitle("Industrial Epoxy Coatings California"),
  description:
    "American-made epoxy, polyaspartic, polyurethane, and urethane-concrete floor systems for industrial floors, parking decks, and high-traffic commercial across Northern California.",
};

export default function CoatingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Industrial coatings"
        title={
          <>
            Resinous floor systems. <em>American-made</em> resins.
          </>
        }
        lead="Epoxy, polyaspartic, polyurethane, and urethane-concrete systems for industrial floors, parking decks, residential, and high-traffic commercial. Northern California primary, statewide for the right project."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
      </PageHero>
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          Industrial and commercial environments where the floor is part of the
          operation, not decoration. Substrate-specific surface preparation and a
          system spec matched to the wear, chemical, and traffic profile — from
          100% solids epoxies and fast-cure polyaspartics to thermal-shock-resistant
          urethane concrete.
        </p>
      </section>
    </>
  );
}
