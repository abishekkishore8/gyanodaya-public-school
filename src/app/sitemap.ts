import type { MetadataRoute } from "next";

import { PUBLIC_ROUTES } from "@/data/navigation";
import { SITE_URL } from "@/data/site";

/**
 * Serves `/sitemap.xml`, listing the public routes only — `/admin` and `/api`
 * are excluded here and in `robots.ts`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route === "/notice-board" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/admissions" ? 0.9 : 0.7,
  }));
}
