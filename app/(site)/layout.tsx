import { SiteHeader, SiteFooter } from "@/lib/components/site-chrome";
import TiltCards from "@/lib/components/tilt-cards";
import PointerGlow from "@/lib/components/pointer-glow";
import { RevealOnScroll } from "@/lib/components/reveal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="site-main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <TiltCards />
      <PointerGlow />
      <RevealOnScroll />
    </>
  );
}
