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
  // Dark chrome (footer, mobile menu, quote-wizard + widget headers) uses the
  // white-wordmark variant; the light top nav uses the navy-wordmark variant so
  // it stays legible on white.
  return (
    <span className="sc-logo" aria-hidden="true">
      <Image
        src={
          light
            ? "/images/brand/salyers-logo.png"
            : "/images/brand/salyers-logo-light.png"
        }
        alt=""
        width={230}
        height={340}
        className="sc-logo-img"
        priority
        unoptimized
      />
    </span>
  );
}
