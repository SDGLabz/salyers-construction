import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Static route map. Dynamic detail routes (FRP types / coating systems) are
// phase-2; today the catalog renders as sections on the two pillar pages.
const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/seismic", priority: 0.9 },
  { path: "/coatings", priority: 0.9 },
  { path: "/service-area", priority: 0.8 },
  { path: "/certifications", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/projects", priority: 0.5 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
