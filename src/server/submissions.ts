import "server-only";

import type { FormSubmissionItem, FormSubmissionStatus, FormSubmissionType } from "@/types/site";

import { getDb, nowIso } from "./db";

/**
 * Enquiries submitted through the public online forms.
 *
 * These live in their own D1 table rather than in the site document, because
 * `GET /api/site-content` is public and these records carry personal data
 * (names, phone numbers, addresses, dates of birth).
 */

const VALID_TYPES: FormSubmissionType[] = ["admission", "enquiry", "visit", "prospectus"];
const VALID_STATUSES: FormSubmissionStatus[] = ["Pending", "Reviewed", "Contacted", "Approved"];

interface SubmissionRow {
  reference: string;
  type: FormSubmissionType;
  title: string;
  name: string;
  phone: string;
  email: string | null;
  submitted_at: string;
  status: FormSubmissionStatus;
  details: string;
}

function toPublicSubmission(row: SubmissionRow): FormSubmissionItem {
  let details: Record<string, string> = {};
  try {
    details = JSON.parse(row.details) as Record<string, string>;
  } catch {
    details = {};
  }

  return {
    id: row.reference,
    type: row.type,
    title: row.title,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    submittedAt: new Date(row.submitted_at).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    status: row.status,
    details,
  };
}

/** Keeps only string values, and caps sizes so a form post cannot bloat the database. */
function sanitizeDetails(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};

  const details: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>).slice(0, 40)) {
    details[key.slice(0, 80)] = String(entry ?? "").slice(0, 2000);
  }
  return details;
}

/** Validates and stores one submission from the public site. */
export async function createSubmission(input: unknown): Promise<FormSubmissionItem> {
  const body = (input || {}) as Partial<FormSubmissionItem>;

  const type = VALID_TYPES.includes(body.type as FormSubmissionType)
    ? (body.type as FormSubmissionType)
    : null;
  const name = String(body.name || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 40);

  if (!type) throw new Error("Unknown submission type.");
  if (!name || !phone) throw new Error("Name and phone number are required.");

  const row: SubmissionRow = {
    reference: String(body.id || "").trim().slice(0, 40) || `GPS-${Date.now()}`,
    type,
    title: String(body.title || "").trim().slice(0, 300) || "Enquiry",
    name,
    phone,
    email: String(body.email || "").trim().slice(0, 200) || null,
    submitted_at: nowIso(),
    // The public site never chooses a status; everything starts as Pending.
    status: "Pending",
    details: JSON.stringify(sanitizeDetails(body.details)),
  };

  const db = await getDb();
  await db
    .prepare(
      `INSERT INTO form_submissions
         (reference, type, title, name, phone, email, submitted_at, status, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      row.reference,
      row.type,
      row.title,
      row.name,
      row.phone,
      row.email,
      row.submitted_at,
      row.status,
      row.details,
    )
    .run();

  return toPublicSubmission(row);
}

/** All submissions, newest first. Admin only. */
export async function listSubmissions(): Promise<FormSubmissionItem[]> {
  const db = await getDb();
  const { results } = await db
    .prepare("SELECT * FROM form_submissions ORDER BY submitted_at DESC LIMIT 1000")
    .all<SubmissionRow>();

  return results.map(toPublicSubmission);
}

/** Updates a submission's review status. */
export async function setSubmissionStatus(reference: string, status: string): Promise<boolean> {
  if (!VALID_STATUSES.includes(status as FormSubmissionStatus)) return false;

  const db = await getDb();
  const result = await db
    .prepare("UPDATE form_submissions SET status = ? WHERE reference = ?")
    .bind(status, reference)
    .run();

  return (result.meta.changes ?? 0) > 0;
}

export async function deleteSubmission(reference: string): Promise<boolean> {
  const db = await getDb();
  const result = await db
    .prepare("DELETE FROM form_submissions WHERE reference = ?")
    .bind(reference)
    .run();

  return (result.meta.changes ?? 0) > 0;
}
