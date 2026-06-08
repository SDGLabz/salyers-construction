// Typed catalog for the Salyers Construction site. Every record has slug + name.
// All prose is transcribed from the approved live site (sdg-salyers.webflow.io) or
// is factual, defensible boilerplate. NEVER fabricate specs, standards, or numbers.

export interface Asset {
  url: string;
  alt: string | null;
}

// ---- Service (the 2 lines of business: seismic FRP, industrial coatings) ----
export interface WorkflowStep {
  step: string; // "01"
  title: string;
  detail: string;
}

export interface Service {
  slug: "seismic-frp" | "coatings";
  name: string;
  eyebrow: string;
  taglineHeadline: string;
  /** Full-length overview prose (>=250 words across paragraphs). */
  overview: string[];
  workflow: WorkflowStep[];
  /** Slugs of related entities (FrpType[] for seismic, CoatingSystem[] for coatings). */
  related: string[];
  metaTitle: string;
  metaDescription: string;
}

// ---- FRP retrofit types (6) ----
export interface FrpType {
  slug: string;
  name: string;
  /** The short kicker line under the name on the live site (e.g. "Confinement wraps"). */
  summary: string;
  body: string;
  whatItDoes: string;
  relatedStandards: string[]; // Standard slugs
}

// ---- Coating systems (7) ----
export interface CoatingSystem {
  slug: string;
  name: string;
  /** Short kicker (e.g. "Fast-cure topcoats"). */
  summary: string;
  body: string;
  bestFor: string[];
}

// ---- Markets served (12, coatings) ----
export interface Market {
  slug: string;
  name: string;
  blurb: string;
  iconPath?: string;
}

// ---- Epoxy benefits (6) ----
export interface Benefit {
  slug: string;
  name: string;
  title: string;
  desc: string;
}

// ---- Sectors served (4, who we serve) ----
export interface Sector {
  slug: string;
  name: string;
  blurb: string;
}

// ---- Personas (4, who we work with) ----
export interface Persona {
  slug: string;
  name: string;
  blurb: string;
}

// ---- Certifications / credentials (3) ----
export interface Certification {
  slug: string;
  name: string;
  number?: string;
  certifyingBody?: string;
  whatThisMeans: string;
  legal: string;
}

// ---- Standards (the engineering standards table) ----
export interface Standard {
  slug: string;
  name: string; // short label used in lists
  code: string;
  title: string;
  whatItIs: string;
  category: "design" | "evaluation" | "code" | "test" | "evaluation-report";
}

// ---- Service regions (Tier A statewide CA; Tier B NorCal primary) ----
export interface ServiceRegion {
  slug: "statewide-ca" | "norcal-primary";
  name: string;
  tier: "A" | "B";
  blurb: string;
  counties: string[];
  cities: string[];
}

// ---- FAQs ----
export interface Faq {
  slug: string;
  name: string; // legacy alias for question (every record has slug + name)
  question: string;
  answer: string;
  topic: "seismic" | "coatings" | "general";
}
