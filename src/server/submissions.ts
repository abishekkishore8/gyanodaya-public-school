import "server-only";

import { ObjectId, type Collection } from "mongodb";

import type { FormSubmissionItem, FormSubmissionStatus, FormSubmissionType } from "@/types/site";

import { getDb } from "./db";

/**
 * Enquiries submitted through the public online forms.
 *
 * These live in their own collection rather than in the site document, because
 * `GET /api/site-content` is public and these records carry personal data
 * (names, phone numbers, addresses, dates of birth).
 */

const COLLECTION = "form_submissions";

const VALID_TYPES: FormSubmissionType[] = ["admission", "enquiry", "visit", "prospectus"];
const VALID_STATUSES: FormSubmissionStatus[] = ["Pending", "Reviewed", "Contacted", "Approved"];

interface SubmissionRecord {
  _id: ObjectId;
  reference: string;
  type: FormSubmissionType;
  title: string;
  name: string;
  phone: string;
  email?: string;
  submittedAt: Date;
  status: FormSubmissionStatus;
  details: Record<string, string>;
}

async function getCollection(): Promise<Collection<SubmissionRecord>> {
  const db = await getDb();
  const collection = db.collection<SubmissionRecord>(COLLECTION);
  await collection.createIndex({ submittedAt: -1 });
  return collection;
}

function toPublicSubmission(record: SubmissionRecord): FormSubmissionItem {
  return {
    id: record.reference,
    type: record.type,
    title: record.title,
    name: record.name,
    phone: record.phone,
    email: record.email,
    submittedAt: record.submittedAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    status: record.status,
    details: record.details,
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

  const record: SubmissionRecord = {
    _id: new ObjectId(),
    reference: String(body.id || "").trim().slice(0, 40) || `GPS-${Date.now()}`,
    type,
    title: String(body.title || "").trim().slice(0, 300) || "Enquiry",
    name,
    phone,
    email: String(body.email || "").trim().slice(0, 200) || undefined,
    submittedAt: new Date(),
    // The public site never chooses a status; everything starts as Pending.
    status: "Pending",
    details: sanitizeDetails(body.details),
  };

  const collection = await getCollection();
  await collection.insertOne(record);

  return toPublicSubmission(record);
}

/** All submissions, newest first. Admin only. */
export async function listSubmissions(): Promise<FormSubmissionItem[]> {
  const collection = await getCollection();
  const records = await collection.find({}).sort({ submittedAt: -1 }).limit(1000).toArray();
  return records.map(toPublicSubmission);
}

/** Updates a submission's review status. */
export async function setSubmissionStatus(reference: string, status: string): Promise<boolean> {
  if (!VALID_STATUSES.includes(status as FormSubmissionStatus)) return false;

  const collection = await getCollection();
  const result = await collection.updateOne(
    { reference },
    { $set: { status: status as FormSubmissionStatus } },
  );

  return result.matchedCount > 0;
}

export async function deleteSubmission(reference: string): Promise<boolean> {
  const collection = await getCollection();
  const result = await collection.deleteOne({ reference });
  return result.deletedCount > 0;
}
