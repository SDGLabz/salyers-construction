// Salyers Construction logo.
//   legacy=true  -> the original SC + Golden Gate bridge mark (recovered from
//                   git), black on transparent. Used in the top nav + mobile
//                   menu (light/white chrome).
//   otherwise    -> the customer-supplied artwork (red SC + city skyline +
//                   "SALYERS CONSTRUCTION"/"CA Lic"), two-tone so the wordmark
//                   stays legible: white-wordmark variant on dark chrome
//                   (footer, quote-wizard + widget headers), navy-wordmark on
//                   light. Sizing is controlled by each context's CSS
//                   (.site-logo img, .sf-brand .sc-logo-img, .qw-brand img,
//                   .aw-head .sc-logo-img).
import Image from "next/image";

export function Logo({
  light = false,
  legacy = false,
}: {
  light?: boolean;
  legacy?: boolean;
}) {
  if (legacy) {
    return (
      <span className="sc-logo" aria-hidden="true">
        <Image
          src="/images/brand/salyers-logo-legacy.png"
          alt=""
          width={800}
          height={800}
          className="sc-logo-img"
          priority
          unoptimized
        />
      </span>
    );
  }
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
