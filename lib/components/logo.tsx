// Salyers Construction's real logo — the SC monogram under the twin Golden Gate
// bridge towers with the "SALYERS CONSTRUCTION" wordmark, as used on the trucks
// and the approved site. The source art is solid black on transparent, so the
// `light` variant just inverts it to white for dark navy chrome (header over the
// hero, footer, mobile menu, wizard). Sizing is controlled by each context's CSS
// (.site-logo img, .sf-brand .sc-logo-img, .qw-brand img, etc.).
import Image from "next/image";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`sc-logo${light ? " sc-logo--light" : ""}`} aria-hidden="true">
      <Image
        src="/images/brand/salyers-logo.png"
        alt=""
        width={800}
        height={800}
        className="sc-logo-img"
        priority
      />
    </span>
  );
}
