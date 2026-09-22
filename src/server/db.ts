import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * The D1 database behind the whole site.
 *
 * The binding is resolved per request rather than cached, because a Worker
 * isolate can serve more than one environment. `next dev` gets the same
 * bindings through `initOpenNextCloudflareForDev()` in `next.config.ts`, so
 * this works identically in development and on Cloudflare.
 */
export async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB;

  if (!db) {
    throw new Error("The D1 binding `DB` is not configured. Check wrangler.jsonc.");
  }

  return db;
}

/** The R2 bucket holding uploaded photographs and candidate CVs. */
export async function getUploadsBucket(): Promise<R2Bucket | undefined> {
  const { env } = await getCloudflareContext({ async: true });
  return env.UPLOADS;
}

/** Timestamps are stored as ISO strings so D1 rows stay readable. */
export function nowIso(): string {
  return new Date().toISOString();
}

/** Identifier for a new row; D1 has no ObjectId. */
export function newRowId(): string {
  return crypto.randomUUID();
}
