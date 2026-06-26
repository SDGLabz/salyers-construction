// Salyers Construction's official logo — the customer-supplied artwork (red SC +
// city skyline, "SALYERS CONSTRUCTION" + "CA Lic #960653"). Stored as a
// transparent PNG (its navy background was keyed out; the artwork and
// proportions are untouched) so it sits cleanly on the site's navy chrome
// (footer, mobile menu, quote-wizard + accessibility-widget headers). On the
// light top nav it rides a navy plaque (.site-logo) so the white wordmark stays
// legible. Sizing is controlled by each context's CSS (.site-logo img,
// .sf-brand .sc-logo-img, .qw-brand img, .aw-head .sc-logo-img).
import Image from "next/image";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`sc-logo${light ? " sc-logo--light" : ""}`} aria-hidden="true">
      <Image
        src="/images/brand/salyers-logo.png"
        alt=""
        width={425}
        height={404}
        className="sc-logo-img"
        priority
        unoptimized
      />
    </span>
  );
}
