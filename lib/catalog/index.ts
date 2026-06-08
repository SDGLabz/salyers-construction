import type {
  Service,
  FrpType,
  CoatingSystem,
  Market,
  Benefit,
  Sector,
  Persona,
  Certification,
  Standard,
  ServiceRegion,
  Faq,
} from "./types";

import servicesJson from "@/data/services.json";
import frpTypesJson from "@/data/frp-types.json";
import coatingSystemsJson from "@/data/coating-systems.json";
import marketsJson from "@/data/markets.json";
import benefitsJson from "@/data/benefits.json";
import sectorsJson from "@/data/sectors.json";
import personasJson from "@/data/personas.json";
import certificationsJson from "@/data/certifications.json";
import standardsJson from "@/data/standards.json";
import serviceRegionsJson from "@/data/service-regions.json";
import faqsJson from "@/data/faqs.json";

export const services = servicesJson as unknown as Service[];
export const frpTypes = frpTypesJson as unknown as FrpType[];
export const coatingSystems = coatingSystemsJson as unknown as CoatingSystem[];
export const markets = marketsJson as unknown as Market[];
export const benefits = benefitsJson as unknown as Benefit[];
export const sectors = sectorsJson as unknown as Sector[];
export const personas = personasJson as unknown as Persona[];
export const certifications = certificationsJson as unknown as Certification[];
export const standards = standardsJson as unknown as Standard[];
export const serviceRegions = serviceRegionsJson as unknown as ServiceRegion[];
export const faqs = faqsJson as unknown as Faq[];

// ---- loader helpers (cloned from belzona-baton-rouge/lib/catalog) ----
function indexBySlug<T extends { slug: string }>(rows: T[]): Map<string, T> {
  const m = new Map<string, T>();
  for (const r of rows) m.set(r.slug, r);
  return m;
}

// resolve an array of slugs into records, dropping any that don't resolve
function resolve<T>(slugs: string[], map: Map<string, T>): T[] {
  return (slugs ?? []).map((s) => map.get(s)).filter((x): x is T => Boolean(x));
}

const serviceBySlug = indexBySlug(services);
const frpTypeBySlug = indexBySlug(frpTypes);
const coatingSystemBySlug = indexBySlug(coatingSystems);
const marketBySlug = indexBySlug(markets);
const benefitBySlug = indexBySlug(benefits);
const sectorBySlug = indexBySlug(sectors);
const personaBySlug = indexBySlug(personas);
const certBySlug = indexBySlug(certifications);
const standardBySlug = indexBySlug(standards);
const regionBySlug = indexBySlug(serviceRegions);
const faqBySlug = indexBySlug(faqs);

// ---- Services ----
export const getServices = (): Service[] => services;
export const getServiceSlugs = (): string[] => services.map((s) => s.slug);
export const getServiceBySlug = (slug: string): Service | null =>
  serviceBySlug.get(slug) ?? null;

// ---- FRP retrofit types ----
export const getFrpTypes = (): FrpType[] => frpTypes;
export const getFrpTypeSlugs = (): string[] => frpTypes.map((t) => t.slug);
export const getFrpTypeBySlug = (slug: string): FrpType | null =>
  frpTypeBySlug.get(slug) ?? null;
// the standards each FRP type references, resolved to full Standard records
export const getStandardsForFrpType = (t: FrpType): Standard[] =>
  resolve(t.relatedStandards, standardBySlug);

// ---- Coating systems ----
export const getCoatingSystems = (): CoatingSystem[] => coatingSystems;
export const getCoatingSystemSlugs = (): string[] => coatingSystems.map((c) => c.slug);
export const getCoatingSystemBySlug = (slug: string): CoatingSystem | null =>
  coatingSystemBySlug.get(slug) ?? null;

// ---- Markets served ----
export const getMarkets = (): Market[] => markets;
export const getMarketBySlug = (slug: string): Market | null =>
  marketBySlug.get(slug) ?? null;

// ---- Epoxy benefits ----
export const getBenefits = (): Benefit[] => benefits;
export const getBenefitBySlug = (slug: string): Benefit | null =>
  benefitBySlug.get(slug) ?? null;

// ---- Sectors served ----
export const getSectors = (): Sector[] => sectors;
export const getSectorBySlug = (slug: string): Sector | null =>
  sectorBySlug.get(slug) ?? null;

// ---- Personas (who we work with) ----
export const getPersonas = (): Persona[] => personas;
export const getPersonaBySlug = (slug: string): Persona | null =>
  personaBySlug.get(slug) ?? null;

// ---- Certifications / credentials ----
export const getCertifications = (): Certification[] => certifications;
export const getCertificationBySlug = (slug: string): Certification | null =>
  certBySlug.get(slug) ?? null;

// ---- Standards (engineering standards table) ----
export const getStandards = (): Standard[] => standards;
export const getStandardBySlug = (slug: string): Standard | null =>
  standardBySlug.get(slug) ?? null;

// ---- Service regions ----
export const getServiceRegions = (): ServiceRegion[] => serviceRegions;
export const getServiceRegionBySlug = (slug: string): ServiceRegion | null =>
  regionBySlug.get(slug) ?? null;

// ---- FAQs ----
export const getFaqs = (): Faq[] => faqs;
export const getFaqBySlug = (slug: string): Faq | null => faqBySlug.get(slug) ?? null;
export const getFaqsByTopic = (topic: Faq["topic"]): Faq[] =>
  faqs.filter((f) => f.topic === topic);
