import "server-only";

import type { ImageAssetsDocument, ImageCollectionKey, SiteContentDocument } from "@/types/site";

import { getDb, nowIso } from "./db";
import { createDefaultSiteContent } from "./defaults";

/**
 * Reads and writes the single site document that backs the whole public site.
 *
 * It lives as one JSON row in the D1 table `site_content`, keyed `main`, and is
 * seeded from `defaults.ts` the first time it is requested. Keeping it as one
 * row preserves the read-once / write-whole-document model the client uses.
 */

const TABLE = "site_content";
const DOCUMENT_KEY = "main";

/** Fields persisted on the document. */
const CONTENT_FIELDS = [
  "academicSession",
  "home",
  "contact",
  "parentsLoginUrl",
  "announcements",
  "noticeCategories",
  "recruitmentPositions",
  "imageAssets",
  "about",
  "academics",
  "facilities",
  "results",
  "fees",
  "uniform",
  "disclosure",
] as const satisfies readonly (keyof SiteContentDocument)[];

/**
 * Image assets that were seeded once and have since been replaced by a field
 * elsewhere in the document. They are dropped on read so the media library does
 * not keep offering a tile nothing on the site renders — the leadership
 * portraits now live on `about.messages`.
 */
const RETIRED_IMAGE_IDS = new Set([
  // Leadership portraits now live on `about.messages`.
  "message-chairman",
  "message-academic-director",
  "message-principal",
  // Hero images now live on `home.hero`.
  "hero-1",
  "hero-2",
  "hero-3",
  "hero-4",
  // Curriculum banners now live on `academics.curriculum.stages`.
  "academics-all",
  "academics-pre-primary",
  "academics-primary",
  "academics-middle",
  "academics-senior",
  // Facility photos now live on `facilities.items`.
  "facility-1",
  "facility-2",
  "facility-3",
  "facility-4",
]);

/**
 * Collections whose slots are fixed by the site's markup, so a default the
 * stored document has never seen must be added back — otherwise a section added
 * after the document was seeded has no editable image in the admin panel.
 * `gallery` is excluded: photos there are added and deleted by an administrator,
 * and backfilling would resurrect deleted ones.
 */
const FIXED_IMAGE_COLLECTIONS = [
  "heroSlides",
  "academicBanners",
  "facilities",
  "misc",
] as const satisfies readonly ImageCollectionKey[];

/** Merges stored image collections over the defaults, keeping every fixed slot. */
function mergeImageAssets(
  defaults: ImageAssetsDocument,
  stored: Partial<ImageAssetsDocument> | undefined,
): ImageAssetsDocument {
  const merged: ImageAssetsDocument = { ...defaults };

  for (const key of Object.keys(defaults) as ImageCollectionKey[]) {
    const storedAssets = stored?.[key];
    if (Array.isArray(storedAssets)) merged[key] = storedAssets;
  }

  for (const key of FIXED_IMAGE_COLLECTIONS) {
    const kept = merged[key].filter((asset) => !RETIRED_IMAGE_IDS.has(asset.id));
    const present = new Set(kept.map((asset) => asset.id));
    merged[key] = [...kept, ...defaults[key].filter((asset) => !present.has(asset.id))];
  }

  return merged;
}

/** Fills in any field missing from a stored (or submitted) document. */
export function normalizeSiteContent(doc: Partial<SiteContentDocument> | null): SiteContentDocument {
  const defaults = createDefaultSiteContent();
  const source = doc || {};

  return {
    academicSession: source.academicSession ?? defaults.academicSession,
    home: { ...defaults.home, ...(source.home || {}) },
    contact: { ...defaults.contact, ...(source.contact || {}) },
    parentsLoginUrl: source.parentsLoginUrl ?? defaults.parentsLoginUrl,
    announcements: source.announcements ?? defaults.announcements,
    noticeCategories: source.noticeCategories ?? defaults.noticeCategories,
    recruitmentPositions: source.recruitmentPositions ?? defaults.recruitmentPositions,
    imageAssets: mergeImageAssets(defaults.imageAssets, source.imageAssets),
    about: { ...defaults.about, ...(source.about || {}) },
    academics: { ...defaults.academics, ...(source.academics || {}) },
    facilities: { ...defaults.facilities, ...(source.facilities || {}) },
    results: { ...defaults.results, ...(source.results || {}) },
    fees: { ...defaults.fees, ...(source.fees || {}) },
    uniform: { ...defaults.uniform, ...(source.uniform || {}) },
    // Shallow merge: a disclosure section added after the document was written
    // falls back to its default instead of rendering as an empty table.
    disclosure: { ...defaults.disclosure, ...(source.disclosure || {}) },
  };
}

/** Writes the whole document, creating the row if it does not exist yet. */
async function upsertSiteContent(content: SiteContentDocument): Promise<void> {
  const db = await getDb();

  // Only the fields the app owns are persisted, so an unexpected key in a
  // submitted payload cannot be written back out.
  const payload: Partial<SiteContentDocument> = {};
  for (const field of CONTENT_FIELDS) {
    (payload as Record<string, unknown>)[field] = content[field];
  }

  const now = nowIso();
  await db
    .prepare(
      `INSERT INTO ${TABLE} (key, data, created_at, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
    )
    .bind(DOCUMENT_KEY, JSON.stringify(payload), now, now)
    .run();
}

/**
 * Returns the current site content, seeding defaults on first use and
 * backfilling any field added since the document was written.
 */
export async function readSiteContent(): Promise<SiteContentDocument> {
  const db = await getDb();
  const row = await db
    .prepare(`SELECT data FROM ${TABLE} WHERE key = ?`)
    .bind(DOCUMENT_KEY)
    .first<{ data: string }>();

  let stored: Partial<SiteContentDocument> | null = null;
  if (row?.data) {
    try {
      stored = JSON.parse(row.data) as Partial<SiteContentDocument>;
    } catch {
      // A corrupted row falls back to the defaults rather than taking the site
      // down; the next write replaces it.
      stored = null;
    }
  }

  const normalized = normalizeSiteContent(stored);
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
