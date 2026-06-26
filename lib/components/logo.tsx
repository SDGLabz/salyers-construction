// Salyers Construction logo — red city-skyline + "SC" monogram and the
// "SALYERS CONSTRUCTION" wordmark. Two contrast-tuned variants so it stays
// legible on either background: navy wordmark for light chrome (the top nav) and
// white wordmark for dark chrome (footer, mobile menu, quote-wizard and
// accessibility-widget headers). The SC monogram + skyline stay brand red in
// both. Sizing is controlled by each context's CSS (.site-logo img,
// .sf-brand .sc-logo-img, .qw-brand img, .aw-head .sc-logo-img). To swap in the
// final artwork, drop the file in and point `src` at it.
import Image from "next/image";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="sc-logo" aria-hidden="true">
      <Image
        src={`/images/brand/salyers-logo-on-${light ? "dark" : "light"}.svg`}
        alt=""
        width={252}
        height={92}
        className="sc-logo-img"
        priority
        unoptimized
      />
    </span>
  );
}
