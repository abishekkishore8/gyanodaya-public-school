import type { MetadataRoute } from "next";

import { SITE_URL } from "@/data/site";

/**
 * Serves `/robots.txt`.
 *
 * The management panel and the API are kept out of search results — `/admin` is
 * already guarded server-side, and `/api/site-content` is public but is data,
 * not a page anyone should land on from a search.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
