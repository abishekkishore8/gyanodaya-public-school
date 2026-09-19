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

/** School name as it appears in the logo lockup. */
export const SCHOOL_WORDMARK = "GYANODAYA";

/**
 * The wordmark split into letters.
 *
 * Measured with the shipped Inter metrics, "PUBLIC SCHOOL • BAGODAR" is wider
 * than "GYANODAYA" at every breakpoint, so the lower line sets the width of the
 * lockup and the name is spread across it with `justify-between`. That keeps
 * both lines flush left and right without hand-tuned letter-spacing per size.
 *
 * The letters are `aria-hidden`; the container carries the name as its label so
 * a screen reader says "Gyanodaya", not nine separate letters.
 */
export const SCHOOL_WORDMARK_LETTERS: readonly string[] = SCHOOL_WORDMARK.split("");
