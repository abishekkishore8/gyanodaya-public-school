import "server-only";

import type { UploadedImageResponse } from "@/types/site";

import { getUploadsBaseUrl } from "./config";
import { getUploadsBucket } from "./db";

/**
 * Uploaded files — website photographs and candidate CVs — in Cloudflare R2.
 *
 * The bucket is reached through the Worker's `UPLOADS` binding, so no access
 * keys are involved; `R2_PUBLIC_BASE_URL` is only needed to build the public
 * URL of a stored object (an R2 custom domain, or the bucket's r2.dev address).
 */

/** Folder prefix for everything the website itself uploads. */
const IMAGE_PREFIX = "website-assets";

/** Folder prefix for documents the school publishes (circulars, certificates). */
const DOCUMENT_PREFIX = "documents";

/** Folder prefix for candidate CVs. */
const CV_PREFIX = "applications";

/** Makes a filename safe to use as an object key. */
function sanitizeFileName(name: string): string {
  return (name || "file").replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120);
}

/** Uploads any file under `prefix` and returns its public URL and object key. */
async function putObject(file: File, prefix: string): Promise<UploadedImageResponse> {
  const bucket = await getUploadsBucket();
  if (!bucket) {
    throw new Error("The R2 binding `UPLOADS` is not configured on the server.");
  }

  const baseUrl = await getUploadsBaseUrl();
  if (!baseUrl) {
    throw new Error("R2_PUBLIC_BASE_URL is not set, so uploaded files would have no public address.");
  }

  // A random segment keeps uploaded filenames from colliding or being guessable.
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const key = `${prefix}/${unique}-${sanitizeFileName(file.name)}`;

  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: file.type || "application/octet-stream",
      // Uploaded assets are immutable: the key changes whenever the file does.
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  return { url: `${baseUrl}/${key}`, key };
}

/** Stores a website image in R2. */
export function uploadImage(file: File): Promise<UploadedImageResponse> {
  return putObject(file, IMAGE_PREFIX);
}

/** Stores a published document (PDF, Word, Excel, image) in R2. */
export function uploadDocument(file: File): Promise<UploadedImageResponse> {
  return putObject(file, DOCUMENT_PREFIX);
}

/** Stores a candidate's CV in R2. */
export function uploadCv(file: File): Promise<UploadedImageResponse> {
  return putObject(file, CV_PREFIX);
}

/** Removes an object, ignoring the case where it is already gone. */
export async function deleteObject(key: string): Promise<void> {
  const bucket = await getUploadsBucket();
  if (!bucket || !key) return;

  try {
    await bucket.delete(key);
  } catch {
    // A missing or already-deleted object must not fail the request that
    // triggered the cleanup.
  }
}
