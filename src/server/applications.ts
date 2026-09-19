import "server-only";

import { ObjectId, type Collection } from "mongodb";

import type { JobApplication, JobApplicationStatus } from "@/types/site";

import { getDb } from "./db";
import { deleteObject } from "./storage";

/**
 * Applications submitted against published vacancies.
 *
 * Kept out of the site document for the same reason as form submissions: that
 * document is served publicly, and these records carry personal data and a link
 * to the candidate's CV.
 */

const COLLECTION = "job_applications";

const VALID_STATUSES: JobApplicationStatus[] = [
  "New",
  "Shortlisted",
  "Interviewed",
  "Rejected",
  "Hired",
];

interface ApplicationRecord {
  _id: ObjectId;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
  notes?: string;
  cvUrl?: string;
  cvFileName?: string;
  /** R2 object key, kept so the file can be removed with the record. */
  cvKey?: string;
  submittedAt: Date;
  status: JobApplicationStatus;
}

async function getCollection(): Promise<Collection<ApplicationRecord>> {
  const db = await getDb();
  const collection = db.collection<ApplicationRecord>(COLLECTION);
  await collection.createIndex({ submittedAt: -1 });
  await collection.createIndex({ jobId: 1 });
  return collection;
}

function toPublicApplication(record: ApplicationRecord): JobApplication {
  return {
    id: record._id.toHexString(),
    jobId: record.jobId,
    jobTitle: record.jobTitle,
    fullName: record.fullName,
    email: record.email,
    phone: record.phone,
    experience: record.experience,
    qualification: record.qualification,
    notes: record.notes,
    cvUrl: record.cvUrl,
    cvFileName: record.cvFileName,
    submittedAt: record.submittedAt.toISOString(),
    status: record.status,
  };
}

export interface NewApplication {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
  notes?: string;
  cvUrl?: string;
  cvFileName?: string;
  cvKey?: string;
}

/** Stores one application from the public careers form. */
export async function createApplication(input: NewApplication): Promise<JobApplication> {
  const fullName = input.fullName.trim().slice(0, 200);
  const phone = input.phone.trim().slice(0, 40);

  if (!fullName || !phone) {
    throw new Error("Full name and phone number are required.");
  }

  const record: ApplicationRecord = {
    _id: new ObjectId(),
    jobId: input.jobId.trim().slice(0, 100),
    jobTitle: input.jobTitle.trim().slice(0, 300) || "General application",
    fullName,
    email: input.email.trim().slice(0, 200),
    phone,
    experience: input.experience.trim().slice(0, 200),
    qualification: input.qualification.trim().slice(0, 300),
    notes: input.notes?.trim().slice(0, 4000) || undefined,
    cvUrl: input.cvUrl,
    cvFileName: input.cvFileName,
    cvKey: input.cvKey,
    submittedAt: new Date(),
    status: "New",
  };

  const collection = await getCollection();
  await collection.insertOne(record);

  return toPublicApplication(record);
}

/** All applications, newest first. Admin only. */
export async function listApplications(): Promise<JobApplication[]> {
  const collection = await getCollection();
  const records = await collection.find({}).sort({ submittedAt: -1 }).limit(1000).toArray();
  return records.map(toPublicApplication);
}

/** Updates an application's hiring status. */
export async function setApplicationStatus(id: string, status: string): Promise<boolean> {
  if (!ObjectId.isValid(id) || !VALID_STATUSES.includes(status as JobApplicationStatus)) return false;

  const collection = await getCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: status as JobApplicationStatus } },
  );

  return result.matchedCount > 0;
}

/** Deletes an application and the CV file it uploaded, if any. */
export async function deleteApplication(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const collection = await getCollection();
  const record = await collection.findOne({ _id: new ObjectId(id) });
  if (!record) return false;

  const result = await collection.deleteOne({ _id: record._id });
  if (result.deletedCount === 0) return false;

  // Remove the stored CV so deleted candidates leave nothing behind in R2.
  // Older records predate `cvKey`; recover the key from the public URL.
  const key = record.cvKey || keyFromUrl(record.cvUrl);
  if (key) await deleteObject(key);

  return true;
}

/** Recovers an R2 object key from a stored public URL. */
function keyFromUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  try {
    // Public URLs look like `https://<host>/applications/<file>`.
    const path = new URL(url).pathname.replace(/^\//, "");
    return path.startsWith("applications/") ? path : undefined;
  } catch {
    return undefined;
  }
}
