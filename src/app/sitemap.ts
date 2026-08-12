import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/seo";
import { locations } from "@/content/locations/locations";

const staticRoutes = [
  "/",
  "/buy-a-home",
  "/refinance",
  "/reverse-mortgage",
  "/home-equity",
  "/resources",
  "/resources/glossary",
  "/about-dawn",
  "/ask-dawn",
  "/mortgage-compass",
  "/family/helping-mom-or-dad",
  "/locations",
  "/privacy-policy",
  "/terms",
  "/accessibility-statement",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
  }));

  const locationEntries = locations.map((location) => ({
    url: `${SITE_URL}/locations/${location.slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...locationEntries];
}
