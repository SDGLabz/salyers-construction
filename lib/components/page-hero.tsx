// Official Belzona-blue welcome hero for interior content pages
// (About, Service Area, Contact, Lunch & Learn, Approvals).
import type { ReactNode } from "react";
import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  image,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  /** Optional dimmed background photo for a grander hero (catalog/industries/applications). */
  image?: string;
}) {
  return (
    <header className={`pg-hero${image ? " pg-hero--photo" : ""}`}>
      {image ? (
        <>
          {/* Dimmed cover photo. Rendered as an optimized, priority-preloaded
              next/Image fill (AVIF/WebP + responsive sizing) instead of a raw
              CSS background, so the hero — which is the LCP element on these
              pages — loads fast. The wrapper keeps every framing rule (0.34
              opacity, scale, 30s Ken-Burns drift, hover saturate) untouched, so
              it is visually identical. */}
          <div className="pg-hero-photo" aria-hidden="true">
            <Image
              src={image}
              alt=""
              fill
              priority
              fetchPriority="high"
              quality={45}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <span className="pg-hero-orb pg-hero-orb-a" aria-hidden="true" />
          <span className="pg-hero-orb pg-hero-orb-b" aria-hidden="true" />
        </>
      ) : null}
      <div className="pg-hero-inner wrap">
        {eyebrow ? <div className="pg-hero-eyebrow">{eyebrow}</div> : null}
        <h1>{title}</h1>
        {lead ? <p className="pg-hero-lead">{lead}</p> : null}
        {children ? <div className="pg-hero-cta">{children}</div> : null}
      </div>
    </header>
  );
}
