import "server-only";

import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { compare as bcryptCompare, hash as bcryptHash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

/**
 * Password hashing and session tokens.
 *
 * Passwords are bcrypt hashes (`bcryptjs` — pure JavaScript, so there is no
 * native build step on serverless). Accounts created before the migration hold
 * a `scrypt$…` hash; those still verify and are re-hashed with bcrypt the next
 * time their owner signs in, so no one has to reset a password.
 *
 * Sessions are HS256 JWTs signed with `SESSION_SECRET`. They are verified in the
 * Node runtime (server components and route handlers), never at the edge.
 */

/** bcrypt cost factor. 12 ≈ 250ms per hash on Vercel's runtime. */
const BCRYPT_ROUNDS = 12;

/** Legacy scrypt parameters, kept only to verify pre-migration hashes. */
const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

/** How long a signed-in session stays valid. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

/** Name of the cookie holding the session token. */
export const SESSION_COOKIE = "gps_admin_session";

const JWT_ALGORITHM = "HS256";
const JWT_ISSUER = "gyanodaya-public-school";
const JWT_AUDIENCE = "gps-admin";

// --------------------------------------------------------------- passwords --

/** Hashes a password for storage. Format: bcrypt (`$2b$…`). */
export async function hashPassword(password: string): Promise<string> {
  return bcryptHash(password, BCRYPT_ROUNDS);
}

/** True when `storedHash` predates the bcrypt migration and should be upgraded. */
export function isLegacyHash(storedHash: string): boolean {
  return (storedHash || "").startsWith("scrypt$");
}

/**
 * Checks a password against a stored hash, accepting both bcrypt and the legacy
 * `scrypt$<saltHex>$<hashHex>` format.
 *
 * Returns false rather than throwing on a malformed hash, so a corrupted record
 * fails closed instead of breaking the login route.
 *
 * Note bcrypt only considers the first 72 bytes of a password; that is standard
 * bcrypt behaviour and is not a problem at the lengths this panel accepts.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash) return false;

  if (isLegacyHash(storedHash)) return verifyLegacyPassword(password, storedHash);

  try {
    return await bcryptCompare(password, storedHash);
  } catch {
    return false;
  }
}

async function verifyLegacyPassword(password: string, storedHash: string): Promise<boolean> {
  const [scheme, saltHex, hashHex] = storedHash.split("$");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;

  try {
    const expected = Buffer.from(hashHex, "hex");
    const derived = await scryptAsync(password, Buffer.from(saltHex, "hex"), expected.length);
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

/** Rejects passwords that are too weak to be worth storing. */
export function validatePasswordStrength(password: string): string | null {
  if (password.length < 10) return "Password must be at least 10 characters long.";
  if (!/[a-zA-Z]/.test(password)) return "Password must contain at least one letter.";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
  return null;
}

// ---------------------------------------------------------------- sessions --

export interface SessionPayload {
  /** Admin user id. */
  sub: string;
  username: string;
  /** Expiry, seconds since the epoch. */
  exp: number;
}

let cachedSecret: Uint8Array | undefined;

/**
 * Key used to sign session tokens.
 *
 * In production `SESSION_SECRET` must be set. In development a random secret is
 * generated per process so sessions simply do not survive a restart, which is
 * far safer than shipping a hardcoded fallback.
 */
function getSessionKey(): Uint8Array {
  if (cachedSecret) return cachedSecret;

  const configured = process.env.SESSION_SECRET;
  if (configured && configured.length >= 32) {
    cachedSecret = new TextEncoder().encode(configured);
    return cachedSecret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set to at least 32 characters in production.");
  }

  console.warn(
    "⚠️  SESSION_SECRET is not set (or is shorter than 32 characters). Using a random development secret — admin sessions will not survive a restart.",
  );
  cachedSecret = new TextEncoder().encode(randomBytes(32).toString("hex"));
  return cachedSecret;
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
    .sign(getSessionKey());
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
    const { payload } = await jwtVerify(token, getSessionKey(), {
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
    // Malformed, tampered with, expired, or signed with a different secret.
    return null;
  }
}
