import "server-only";

import { compare as bcryptCompare } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

import { hashPbkdf2, verifyPbkdf2 } from "@/lib/password";

import { getVar } from "./config";

/**
 * Password hashing and session tokens.
 *
 * Passwords are PBKDF2-SHA256 hashes computed with WebCrypto, which runs as
 * native code in the Workers runtime — `bcryptjs` is pure JavaScript and burns
 * far more CPU than a Worker invocation is allowed. Accounts created before the
 * move to Cloudflare hold a bcrypt hash; those still verify (on a plan with the
 * CPU budget for it) and are re-hashed with PBKDF2 the next time their owner
 * signs in.
 *
 * Sessions are HS256 JWTs signed with `SESSION_SECRET`.
 */

/** How long a signed-in session stays valid. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

/** Name of the cookie holding the session token. */
export const SESSION_COOKIE = "gps_admin_session";

const JWT_ALGORITHM = "HS256";
const JWT_ISSUER = "gyanodaya-public-school";
const JWT_AUDIENCE = "gps-admin";

// --------------------------------------------------------------- passwords --

/** Hashes a password for storage. Format: `pbkdf2$<iterations>$<salt>$<hash>`. */
export function hashPassword(password: string): Promise<string> {
  return hashPbkdf2(password);
}

/** True when `storedHash` is not PBKDF2 and should be upgraded on next sign-in. */
export function isLegacyHash(storedHash: string): boolean {
  return Boolean(storedHash) && !storedHash.startsWith("pbkdf2$");
}

/**
 * Checks a password against a stored hash, accepting PBKDF2 and legacy bcrypt.
 *
 * Returns false rather than throwing on a malformed hash, so a corrupted record
 * fails closed instead of breaking the login route.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash) return false;

  if (storedHash.startsWith("pbkdf2$")) {
    return verifyPbkdf2(password, storedHash);
  }

  // Pre-Cloudflare bcrypt hash. Verifying costs far more CPU than PBKDF2, so
  // the account is upgraded to PBKDF2 immediately after a successful sign-in.
  try {
    return await bcryptCompare(password, storedHash);
  } catch {
    return false;
  }
}

export { validatePasswordStrength } from "@/lib/password";

// ---------------------------------------------------------------- sessions --

export interface SessionPayload {
  /** Admin user id. */
  sub: string;
  username: string;
  /** Expiry, seconds since the epoch. */
  exp: number;
}

/**
 * Key used to sign session tokens.
 *
 * In production `SESSION_SECRET` must be set. In development a random secret is
 * generated per process so sessions simply do not survive a restart, which is
 * far safer than shipping a hardcoded fallback.
 */
async function getSessionKey(): Promise<Uint8Array> {
  const configured = await getVar("SESSION_SECRET");
  if (configured && configured.length >= 32) {
    return new TextEncoder().encode(configured);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set to at least 32 characters in production.");
  }

  console.warn(
    "⚠️  SESSION_SECRET is not set (or is shorter than 32 characters). Using a random development secret — admin sessions will not survive a restart.",
  );
  return crypto.getRandomValues(new Uint8Array(32));
}

/** Creates a signed session JWT for `user`. */
export async function createSessionToken(user: { id: string; username: string }): Promise<string> {
  return new SignJWT({ username: user.username })
    .setProtectedHeader({ alg: JWT_ALGORITHM, typ: "JWT" })
    .setSubject(user.id)
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(await getSessionKey());
}

/**
 * Verifies a session JWT, returning its payload or `null` if it is not valid.
 *
 * `algorithms` is pinned so a token cannot arrive claiming `alg: none` or an
 * asymmetric algorithm, and expiry is enforced by `jwtVerify` itself.
 */
export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, await getSessionKey(), {
      algorithms: [JWT_ALGORITHM],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    if (!payload.sub || typeof payload.exp !== "number") return null;

    return {
      sub: payload.sub,
      username: typeof payload.username === "string" ? payload.username : "",
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}
