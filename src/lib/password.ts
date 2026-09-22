/**
 * PBKDF2 password hashing, shared by the server and the maintenance scripts.
 *
 * WebCrypto runs as native code in both the Workers runtime and Node, which
 * matters on Cloudflare: a pure-JavaScript hash like bcrypt costs far more CPU
 * than a Worker invocation is allowed.
 */

/**
 * Iterations for new hashes. Stored inside each hash, so this can be raised
 * later without invalidating existing passwords.
 */
export const PBKDF2_ITERATIONS = 100_000;

const SALT_BYTES = 16;
const KEY_BYTES = 32;

function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

async function deriveKey(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    keyMaterial,
    KEY_BYTES * 8,
  );

  return new Uint8Array(bits);
}

/** Hashes a password for storage. Format: `pbkdf2$<iterations>$<salt>$<hash>`. */
export async function hashPbkdf2(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const derived = await deriveKey(password, salt, PBKDF2_ITERATIONS);

  return `pbkdf2$${PBKDF2_ITERATIONS}$${toBase64(salt)}$${toBase64(derived)}`;
}

/** Constant-time comparison of two byte strings. */
function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

/** Verifies a password against a `pbkdf2$…` hash. */
export async function verifyPbkdf2(password: string, storedHash: string): Promise<boolean> {
  const [scheme, iterations, saltB64, hashB64] = storedHash.split("$");
  if (scheme !== "pbkdf2" || !iterations || !saltB64 || !hashB64) return false;

  try {
    const derived = await deriveKey(password, fromBase64(saltB64), Number(iterations));
    return timingSafeEqualBytes(derived, fromBase64(hashB64));
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
