import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { seoTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: seoTitle("Certifications & Standards"),
  description:
    "A licensed California general contractor (CA B1 #960653), a certified Henkel/LOCTITE Tyfo FRP applicator (ICC-ES ESR-2103), and a trained Polymer Nation coatings installer.",
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications"
        title={
          <>
            The <em>credentials</em> behind the bid.
          </>
        }
        lead="A licensed California general contractor, a certified FRP applicator under the Henkel and LOCTITE Tyfo system, and a trained installer of Polymer Nation coatings. Work is designed and installed per ACI 440, ASCE 41, the California Building Code, and relevant ASTM standards."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Bid
        </Link>
      </PageHero>
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
        <p className="lede">
          California general building contractor, CA B1 #960653, issued 2011 and in
          good standing. Certified Henkel and LOCTITE Tyfo applicator under ICC-ES
          ESR-2103. Polymer Nation trained installer — training completed in person
          in Chicago.
        </p>
      </section>
    </>
  );
}
