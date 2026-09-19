/**
 * Server-side environment configuration, read once per process.
 *
 * Nothing here throws: a missing variable is surfaced through `missingEnv()` so
 * the affected route can return a clear error instead of the whole app failing
 * to start. This module must never be imported from a client component.
 */

import "server-only";

export const mongo = {
  uri: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DB_NAME || "gps_school_website",
};

export interface R2Config {
  accountId: string;
  bucketName: string;
  publicBaseUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
}

/** Largest image accepted by the upload route. */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/**
 * The R2 credentials, or `null` when any of them is missing — in which case
 * image uploads are unavailable but the rest of the site works normally.
 */
export function getR2Config(): R2Config | null {
  const { R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_PUBLIC_BASE_URL, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } =
    process.env;

  if (!R2_ACCOUNT_ID || !R2_BUCKET_NAME || !R2_PUBLIC_BASE_URL || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    return null;
  }

  return {
    accountId: R2_ACCOUNT_ID,
    bucketName: R2_BUCKET_NAME,
    publicBaseUrl: R2_PUBLIC_BASE_URL,
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  };
}

/** Names of required variables that are not set, for startup diagnostics. */
export function missingEnv(): string[] {
  const missing: string[] = [];
  if (!mongo.uri) missing.push("MONGODB_URI");
  if (!getR2Config()) missing.push("R2_* (image uploads disabled)");
  if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
    missing.push("SESSION_SECRET");
  }
  return missing;
}
