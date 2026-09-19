import "server-only";

import type { SiteContentDocument } from "@/types/site";

import { getDb } from "./db";
import { createDefaultSiteContent } from "./defaults";

/**
 * Reads and writes the single `site_content` document that backs the whole
 * public site. The document is keyed `main` and seeded from `defaults.ts` the
 * first time it is requested.
 */

const COLLECTION = "site_content";
const DOCUMENT_KEY = "main";

/** Fields persisted on the document (everything except Mongo bookkeeping). */
const CONTENT_FIELDS = [
  "academicSession",
  "parentsLoginUrl",
  "announcements",
  "noticeCategories",
  "recruitmentPositions",
  "imageAssets",
] as const satisfies readonly (keyof SiteContentDocument)[];

async function getCollection() {
  const db = await getDb();
  return db.collection(COLLECTION);
}

/** Fills in any field missing from a stored (or submitted) document. */
export function normalizeSiteContent(doc: Partial<SiteContentDocument> | null): SiteContentDocument {
  const defaults = createDefaultSiteContent();
  const source = doc || {};

  return {
    academicSession: source.academicSession ?? defaults.academicSession,
    parentsLoginUrl: source.parentsLoginUrl ?? defaults.parentsLoginUrl,
    announcements: source.announcements ?? defaults.announcements,
    noticeCategories: source.noticeCategories ?? defaults.noticeCategories,
    recruitmentPositions: source.recruitmentPositions ?? defaults.recruitmentPositions,
    imageAssets: { ...defaults.imageAssets, ...(source.imageAssets || {}) },
  };
}

/** Writes the normalized content fields, creating the document if needed. */
async function upsertSiteContent(content: SiteContentDocument): Promise<void> {
  const collection = await getCollection();

  const $set: Record<string, unknown> = { updatedAt: new Date() };
  for (const field of CONTENT_FIELDS) {
    $set[field] = content[field];
  }

  await collection.updateOne(
    { key: DOCUMENT_KEY },
    { $set, $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  );
}

/**
 * Returns the current site content, seeding defaults on first use and
 * backfilling any field added since the document was written.
 */
export async function readSiteContent(): Promise<SiteContentDocument> {
  const collection = await getCollection();
  const existing = (await collection.findOne({ key: DOCUMENT_KEY })) as Partial<SiteContentDocument> | null;
  const normalized = normalizeSiteContent(existing);

  await upsertSiteContent(normalized);

  return normalized;
}

/** Replaces the site content with `payload` and returns what was stored. */
export async function writeSiteContent(
  payload: Partial<SiteContentDocument>,
): Promise<SiteContentDocument> {
  const normalized = normalizeSiteContent(payload);
  await upsertSiteContent(normalized);
  return normalized;
}
