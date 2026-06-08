import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTitle("Seismic FRP Retrofit California"),
  description:
    "Engineered seismic FRP retrofit across California — Henkel and LOCTITE Tyfo carbon and glass fiber strengthening installed from engineer-of-record drawings.",
};

export default function SeismicPage() {
  return (
    <>
      <PageHero
        eyebrow="Seismic FRP"
        title="Engineered seismic strengthening"
        lead="Fiber reinforced polymer retrofit, statewide California. We install Henkel and LOCTITE Tyfo composite systems from engineer-of-record drawings — adding tensile capacity, confinement, and ductility without adding meaningful mass."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Send Drawings
        </Link>
      </PageHero>
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          Externally bonded carbon or glass fiber, structurally bonded to existing
          concrete and masonry. Our seismic work covers column jacketing,
          beam-column joints, shear and flexural strengthening, masonry retrofit,
          and infrastructure — designed to ACI 440.2R-17, ASCE 41-23, the
          California Building Code, and installed under ICC-ES ESR-2103.
        </p>
      </section>
    </>
  );
}
