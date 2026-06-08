import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTitle("Projects"),
  description:
    "Representative Salyers Construction work — seismic FRP retrofit and industrial coatings across California.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Carbon FRP, bonded while the building stayed <em>live</em>.
          </>
        }
        lead="A featured retrofit: carbon FRP strips bonded to a parking-structure slab underside, with bays cycled through prep, install, and saturant cure to keep tenant access uninterrupted."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
      </PageHero>
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          Additional project case studies are being added. Job references and
          documented installs are available on request — ask when you request a
          bid and we&rsquo;ll share relevant past work.
        </p>
      </section>
    </>
  );
}
