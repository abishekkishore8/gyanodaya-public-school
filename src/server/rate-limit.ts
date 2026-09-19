import "server-only";

import type { Collection } from "mongodb";

import { getDb } from "./db";

/**
 * Fixed-window rate limiting for the publicly reachable endpoints.
 *
 * Counters live in MongoDB rather than process memory because serverless
 * instances do not share memory — an in-process limiter would reset on every
 * cold start and be trivially bypassed by concurrent instances. Documents
 * expire automatically through a TTL index.
 */

const COLLECTION = "rate_limits";

interface RateLimitRecord {
  /** `${bucket}:${identifier}:${windowStart}` */
  _id: string;
  count: number;
  /** TTL index target; Mongo removes the document shortly after this. */
  expiresAt: Date;
}

let indexReady: Promise<void> | undefined;

async function getCollection(): Promise<Collection<RateLimitRecord>> {
  const db = await getDb();
  const collection = db.collection<RateLimitRecord>(COLLECTION);

  // Create the TTL index once per process, not on every request.
  if (!indexReady) {
    indexReady = collection
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
      .then(() => undefined)
      .catch(() => {
        indexReady = undefined;
      });
  }
  await indexReady;

  return collection;
}

/**
 * Best-effort client identifier.
 *
 * `x-forwarded-for` is set by Vercel and most proxies. It is spoofable when the
 * app is served without a trusted proxy, so this is a speed bump against
 * casual abuse rather than a security control.
 */
export function clientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();

  return request.headers.get("x-real-ip") || "unknown";
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the current window resets. */
  retryAfter: number;
}

/**
 * Counts one request against `bucket` for `identifier`.
 *
 * Fails open: if the database is unreachable the request is allowed through,
 * so a storage problem cannot take down the public forms.
 */
export async function checkRateLimit(
  bucket: string,
  identifier: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const expiresAt = new Date(windowStart + windowMs);
  const retryAfter = Math.max(1, Math.ceil((expiresAt.getTime() - now) / 1000));

  try {
    const collection = await getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: `${bucket}:${identifier}:${windowStart}` },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
      { upsert: true, returnDocument: "after" },
    );

    return { allowed: (result?.count ?? 1) <= limit, retryAfter };
  } catch {
    return { allowed: true, retryAfter };
  }
}

/** Standard 429 response for a blocked request. */
export function tooManyRequests(retryAfter: number, message: string): Response {
  return new Response(JSON.stringify({ message }), {
    status: 429,
    headers: { "Content-Type": "application/json", "Retry-After": String(retryAfter) },
  });
}
