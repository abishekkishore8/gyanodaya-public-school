import "server-only";

import { getDb } from "./db";

/**
 * Fixed-window rate limiting for the publicly reachable endpoints.
 *
 * Counters live in D1 rather than isolate memory because Workers isolates do
 * not share memory — an in-process limiter would reset constantly and be
 * trivially bypassed. D1 has no TTL, so expired rows are swept opportunistically
 * whenever a window rolls over.
 */

/**
 * Best-effort client identifier.
 *
 * `x-forwarded-for` is set by Cloudflare and most proxies. It is spoofable when the
 * app is served without a trusted proxy, so this is a speed bump against
 * casual abuse rather than a security control.
 */
export function clientIdentifier(request: Request): string {
  // Cloudflare sets `cf-connecting-ip` and it cannot be spoofed by the client.
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

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
  const expiresAt = windowStart + windowMs;
  const retryAfter = Math.max(1, Math.ceil((expiresAt - now) / 1000));

  try {
    const db = await getDb();
    const key = `${bucket}:${identifier}:${windowStart}`;

    const row = await db
      .prepare(
        `INSERT INTO rate_limits (key, count, expires_at)
         VALUES (?, 1, ?)
         ON CONFLICT(key) DO UPDATE SET count = count + 1
         RETURNING count`,
      )
      .bind(key, expiresAt)
      .first<{ count: number }>();

    // Sweep old windows now and then rather than on every request.
    if (Math.random() < 0.02) {
      await db.prepare("DELETE FROM rate_limits WHERE expires_at < ?").bind(now).run();
    }

    return { allowed: (row?.count ?? 1) <= limit, retryAfter };
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
