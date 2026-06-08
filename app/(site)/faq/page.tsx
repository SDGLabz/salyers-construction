import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/lib/components/page-hero";
import { QuoteWizard } from "@/lib/components/quote-wizard";
import { Accordion } from "@/lib/components/accordion";
import { seoTitle, SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/contact";
import { getFaqs, getFaqsByTopic } from "@/lib/catalog";
import type { Faq } from "@/lib/catalog/types";
import "./faq.css";

export const metadata: Metadata = {
  title: seoTitle("FAQ — Seismic FRP & Coatings"),
  description:
    "Answers to the questions structural engineers, GCs, and building owners ask Salyers Construction about seismic FRP retrofit and industrial epoxy floor coatings across California — added mass, ACI 440.2R and ASCE 41 standards, occupancy, cure and return-to-service, surface prep, and how a written bid turns into an installed job.",
};

// Topic groups, in the order engineers tend to ask about them.
const GROUPS: { topic: Faq["topic"]; eyebrow: string; heading: string; lede: string }[] = [
  {
    topic: "seismic",
    eyebrow: "Seismic FRP retrofit",
    heading: "Externally bonded fiber strengthening",
    lede: "Carbon and glass fiber retrofit — added mass, who designs it, the standards it answers to, and working around occupancy.",
  },
  {
    topic: "coatings",
    eyebrow: "Industrial coatings",
    heading: "Resinous and epoxy floor systems",
    lede: "American-made resinous floors — return-to-service timing and why substrate preparation decides whether a floor lasts.",
  },
  {
    topic: "general",
    eyebrow: "Working with us",
    heading: "Bids, schedule, and how a job runs",
    lede: "Turnaround on a written bid and the path a project takes from engineer's drawings to documented handover.",
  },
];

export default function FaqPage() {
  const allFaqs = getFaqs();

  // FAQPage JSON-LD built from the exact same Q&A the page renders.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Questions engineers and owners ask."
        lead="Plainspoken answers on seismic FRP retrofit and industrial floor coatings — the things structural engineers, general contractors, building owners, and public agencies ask us before a bid goes out."
        image="/images/jobs/courthouse-merced.jpg"
      >
        <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
        <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
      </PageHero>

      {/* Intro: sets the technical, builder-not-fluff tone before the accordions. */}
      <section className="sec">
        <div className="wrap">
          <div className="fq-intro">
            <div className="fq-intro-body">
              <p className="eyebrow">Engineering first, hands behind it</p>
              <p>
                Most of what we get asked comes down to the same two things: will
                the work do what the engineer needs it to do, and how fast can a
                bid come back. We are the licensed applicator on{" "}
                {CONTACT.regionLong} projects — the structural engineer of record
                owns the design intent, the system manufacturer produces the
                application-specific spec, and we bid and install to that package.
              </p>
              <p>
                The questions below are grouped by line of work — seismic FRP
                strengthening, resinous and epoxy floor coatings, and the
                practical side of working with us. If a fact you need is not here,
                send the drawings and we will put the answer in the written,
                itemized bid.
              </p>
            </div>
            <div className="fq-intro-media">
              <Image
                src="/images/jobs/job-8292.jpg"
                alt="Carbon-fiber fabric bonded to a concrete structural member during a seismic FRP retrofit"
                fill
                sizes="(max-width: 900px) 100vw, 38vw"
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grouped accordions on a cream band (subtle cursor glow). */}
      <section className="sec sec--cream" data-glow>
        <div className="wrap">
          {GROUPS.map((g) => {
            const items = getFaqsByTopic(g.topic);
            if (items.length === 0) return null;
            return (
              <div className="fq-group" key={g.topic}>
                <div className="fq-group-head sec-head" style={{ marginBottom: 0 }}>
                  <div>
                    <p className="eyebrow">{g.eyebrow}</p>
                    <h2>{g.heading}</h2>
                    <p className="lede">{g.lede}</p>
                  </div>
                  <span className="fq-group-count">
                    {items.length} {items.length === 1 ? "question" : "questions"}
                  </span>
                </div>
                <div style={{ marginTop: "clamp(20px, 2.6vw, 30px)" }}>
                  <Accordion
                    items={items.map((f) => ({ q: f.question, a: <p>{f.answer}</p> }))}
                    defaultOpen={0}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real-credentials strip — never fabricated numbers. */}
      <section className="sec">
        <div className="wrap fq-cred">
          <div className="cred-strip">
            <div className="cred-item">
              <b>Since {CONTACT.since}</b>
              <span>Building in California</span>
            </div>
            <div className="cred-item">
              <b>{CONTACT.license}</b>
              <span>Licensed general contractor</span>
            </div>
            <div className="cred-item">
              <b>Statewide California</b>
              <span>{CONTACT.metros.join(" · ")}</span>
            </div>
            <div className="cred-item">
              <b>Seismic FRP + Coatings</b>
              <span>Two lines, one crew</span>
            </div>
            <div className="cred-item">
              <b>1–2 business days</b>
              <span>Written, itemized bids</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navy CTA band before the footer. */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-inner">
              <div>
                <p className="eyebrow">Still have a question?</p>
                <h2>Send the drawings. Get a written bid back in 1–2 business days.</h2>
                <p>
                  Engineer&apos;s package or a coatings scope, we will read it, ask
                  the right questions, and come back with materials, labor,
                  schedule, and our assumptions in writing.
                </p>
              </div>
              <div className="cta-band-actions">
                <QuoteWizard label="Request a Bid" triggerClassName="btn btn-primary" />
                <QuoteWizard label="Send Drawings" triggerClassName="btn btn-ghost" initialPath="drawings" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
