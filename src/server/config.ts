/**
 * Server-side environment configuration.
 *
 * Nothing here throws: a missing value is surfaced through `missingEnv()` so
 * the affected route can return a clear error instead of the whole app failing
 * to start. This module must never be imported from a client component.
 *
 * Storage itself is bound, not configured — D1 as `DB` and R2 as `UPLOADS` in
 * `wrangler.jsonc`. Only the bucket's public URL and the session secret come
 * from variables.
 */

import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

/** Largest image accepted by the upload route. */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/** Reads a Worker variable, falling back to `process.env` for `next dev`. */
export async function getVar(name: string): Promise<string | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = (env as unknown as Record<string, unknown>)[name];
    if (typeof value === "string" && value) return value;
  } catch {
    // No Cloudflare context (a plain Node script) — fall through.
  }

  return process.env[name] || undefined;
}

/** Public base URL that serves the R2 bucket, without a trailing slash. */
export async function getUploadsBaseUrl(): Promise<string | null> {
  const base = await getVar("R2_PUBLIC_BASE_URL");
  return base ? base.replace(/\/$/, "") : null;
}

/** Names of required values that are not set, for the health probe. */
export async function missingEnv(): Promise<string[]> {
  const missing: string[] = [];

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env.DB) missing.push("D1 binding DB");
    if (!env.UPLOADS) missing.push("R2 binding UPLOADS (uploads disabled)");
  } catch {
    missing.push("Cloudflare bindings (DB, UPLOADS)");
  }

  if (!(await getUploadsBaseUrl())) missing.push("R2_PUBLIC_BASE_URL (uploads disabled)");
  if (process.env.NODE_ENV === "production" && !(await getVar("SESSION_SECRET"))) {
    missing.push("SESSION_SECRET");
  }

  return missing;
}
