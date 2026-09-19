import "server-only";

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import type { UploadedImageResponse } from "@/types/site";

import { getR2Config, type R2Config } from "./config";

/** Image uploads to the Cloudflare R2 bucket that serves the site's photos. */

/** Folder prefix for everything this app uploads. */
const KEY_PREFIX = "website-assets";

const globalForR2 = globalThis as typeof globalThis & { __gpsR2Client?: S3Client };

function getClient(config: R2Config): S3Client {
  if (!globalForR2.__gpsR2Client) {
    globalForR2.__gpsR2Client = new S3Client({
      region: "auto",
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
    });
  }
  return globalForR2.__gpsR2Client;
}

/** Folder prefix for candidate CVs. */
const CV_PREFIX = "applications";

/** Makes a filename safe to use as an object key. */
function sanitizeFileName(name: string): string {
  return (name || "file").replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120);
}

/** Uploads any file under `prefix` and returns its public URL and object key. */
async function putObject(file: File, prefix: string): Promise<UploadedImageResponse> {
  const config = getR2Config();
  if (!config) {
    throw new Error("R2 is not fully configured on the server.");
  }

  // A random segment keeps uploaded filenames from colliding or being guessable.
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const key = `${prefix}/${unique}-${sanitizeFileName(file.name)}`;
  const body = new Uint8Array(await file.arrayBuffer());

  await getClient(config).send(
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: body,
      ContentType: file.type || "application/octet-stream",
    }),
  );

  return { url: `${config.publicBaseUrl.replace(/\/$/, "")}/${key}`, key };
}

/** Stores a website image in R2. */
export function uploadImage(file: File): Promise<UploadedImageResponse> {
  return putObject(file, KEY_PREFIX);
}

/** Stores a candidate's CV in R2, under a separate prefix from site images. */
export function uploadCv(file: File): Promise<UploadedImageResponse> {
  return putObject(file, CV_PREFIX);
}

/**
 * Removes an object from R2.
 *
 * Returns false instead of throwing when R2 is not configured or the delete
 * fails, so tidying up storage can never block deleting a database record.
 */
export async function deleteObject(key: string): Promise<boolean> {
  const config = getR2Config();
  if (!config || !key) return false;

  try {
    await getClient(config).send(new DeleteObjectCommand({ Bucket: config.bucketName, Key: key }));
    return true;
  } catch {
    return false;
  }
}
