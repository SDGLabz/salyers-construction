import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTitle("Service Area — California"),
  description:
    "Seismic FRP retrofit statewide across California; industrial coatings centered in Northern California, traveling statewide for right-sized projects.",
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title={
          <>
            Seismic, statewide. Coatings, mostly <em>Northern California</em>.
          </>
        }
        lead="Two service-area policies because the two scopes have different mobilization economics. Seismic FRP travels anywhere in California. Industrial coatings is centered in Northern California and travels for a right-sized job."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
      </PageHero>
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          Seismic FRP: the full state — Bay Area, Sacramento, Central Valley,
          Greater Los Angeles, Inland Empire, San Diego, Central Coast, and points
          in between. Public infrastructure and bridge work follows the agency
          wherever the asset is. Coatings: Bay Area, Sacramento, and the broader
          Central Valley as the base service area, with travel for right-sized
          projects evaluated by scope and schedule.
        </p>
      </section>
    </>
  );
}
