/** School-wide links and identifiers. */

/**
 * Canonical origin, used for metadata, `robots.txt` and the sitemap.
 *
 * Vercel sets `NEXT_PUBLIC_SITE_URL` per environment; the fallback is the
 * production domain so a local build still emits absolute URLs.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://gyanodaya-public-school.vercel.app").replace(
  /\/+$/,
  "",
);

/** Play Store listing for the parent mobile app. */
export const PLAYSTORE_PARENT_APP_URL = "https://play.google.com/store/search?q=gyanodaya+public+school+bagodar&c=apps";

/** Parents login destination used until the admin overrides it in settings. */
export const DEFAULT_PARENTS_LOGIN_URL = PLAYSTORE_PARENT_APP_URL;

/** Logo served from `public/`. */
export const SCHOOL_LOGO_SRC = "/gps_logo-removebg-preview.png";
