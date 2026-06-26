import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: seoTitle("Accessibility Statement"),
  description:
    "Salyers Construction's commitment to digital accessibility — the on-page accessibility tool, the standards we work toward (WCAG 2.1 AA), and how to report a barrier.",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Accessibility",
      item: `${SITE_URL}/accessibility`,
    },
  ],
};

export default function AccessibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="Accessibility"
        title={
          <>
            Built to work <em>for everyone</em>.
          </>
        }
        lead="We want every visitor to be able to read this site, request a bid, and reach us — regardless of ability or assistive technology. Here's what we provide today and how to tell us if something isn't working."
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <Link href="/contact" className="btn btn-ghost">
          Contact us
        </Link>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <div className="prose">
            <h2>Our commitment</h2>
            <p>
              Salyers Construction is committed to making{" "}
              <strong>{SITE_URL.replace(/^https?:\/\//, "")}</strong> usable for
              the widest possible audience. We are working toward conformance with
              the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, the
              standard referenced by the Americans with Disabilities Act (ADA) and
              California&apos;s Unruh Civil Rights Act, and we treat accessibility
              as part of how the site is built and maintained — not an afterthought.
            </p>

            <h2>The accessibility tool on this site</h2>
            <p>
              Every page includes an accessibility menu, opened from the icon
              button fixed in the bottom-right corner. It lets you adjust the
              experience to suit you, with your choices saved on your device:
            </p>
            <ul>
              <li>
                <strong>One-click profiles</strong> — Seizure Safe, Vision
                Impaired, ADHD Friendly, Cognitive Disability, Keyboard
                Navigation, Blind Users, and Older Adults.
              </li>
              <li>
                <strong>Content</strong> — larger text, line height, letter
                spacing, a more readable font, link and heading highlighting, a
                text magnifier, and text alignment.
              </li>
              <li>
                <strong>Color</strong> — dark, light, and high-contrast modes,
                saturation controls (including monochrome), and custom text,
                title, and background colors.
              </li>
              <li>
                <strong>Orientation</strong> — mute sounds, hide images, a
                distraction-free reading mode, a reading guide and reading mask, a
                larger cursor, pause animations, and focus/hover highlighting.
              </li>
            </ul>
            <p>
              The tool supplements — it does not replace — accessibility built
              into the site itself, such as keyboard navigation, visible focus
              outlines, a skip-to-content link, descriptive text alternatives, and
              respect for your system&apos;s reduced-motion preference.
            </p>

            <h2>Known limitations</h2>
            <p>
              Accessibility is ongoing work. Some third-party or embedded content
              may not yet fully conform, and we are continually testing and
              improving. If you encounter a barrier, please tell us — your feedback
              directly shapes our fixes.
            </p>

            <h2>Report a problem or request an alternative format</h2>
            <p>
              If any part of this site is difficult to use, or you need information
              in a different format, contact us and we&apos;ll help and work to
              resolve it:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href={CONTACT.emailHref}>{CONTACT.email}</a>
              </li>
              <li>
                Phone: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>
                Mail: {CONTACT.legalName}, {CONTACT.street}, {CONTACT.city},{" "}
                {CONTACT.region} {CONTACT.postalCode}
              </li>
            </ul>
            <p>
              Please include the page address and a short description of the
              problem so we can reproduce and fix it as quickly as possible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
