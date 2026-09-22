import "server-only";

import type { JobApplication, JobApplicationStatus } from "@/types/site";

import { getDb, newRowId, nowIso } from "./db";
import { deleteObject } from "./storage";

/**
 * Applications submitted against published vacancies.
 *
 * Kept out of the site document for the same reason as form submissions: that
 * document is served publicly, and these records carry personal data and a link
 * to the candidate's CV in R2.
 */

const VALID_STATUSES: JobApplicationStatus[] = [
  "New",
  "Shortlisted",
  "Interviewed",
  "Rejected",
  "Hired",
];

interface ApplicationRow {
  id: string;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
  notes: string | null;
  cv_url: string | null;
  /** R2 object key, kept so the file can be removed with the record. */
  cv_key: string | null;
  cv_file_name: string | null;
  submitted_at: string;
  status: JobApplicationStatus;
}

function toPublicApplication(row: ApplicationRow): JobApplication {
  return {
    id: row.id,
    jobId: row.job_id,
    jobTitle: row.job_title,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    experience: row.experience,
    qualification: row.qualification,
    notes: row.notes ?? undefined,
    cvUrl: row.cv_url ?? undefined,
    cvFileName: row.cv_file_name ?? undefined,
    submittedAt: row.submitted_at,
    status: row.status,
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

  const row: ApplicationRow = {
    id: newRowId(),
    job_id: input.jobId.trim().slice(0, 100),
    job_title: input.jobTitle.trim().slice(0, 300) || "General application",
    full_name: fullName,
    email: input.email.trim().slice(0, 200),
    phone,
    experience: input.experience.trim().slice(0, 200),
    qualification: input.qualification.trim().slice(0, 300),
    notes: input.notes?.trim().slice(0, 4000) || null,
    cv_url: input.cvUrl ?? null,
    cv_key: input.cvKey ?? null,
    cv_file_name: input.cvFileName ?? null,
    submitted_at: nowIso(),
    status: "New",
  };

  const db = await getDb();
  await db
    .prepare(
      `INSERT INTO job_applications
         (id, job_id, job_title, full_name, email, phone, experience, qualification,
          notes, cv_url, cv_key, cv_file_name, submitted_at, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      row.id,
      row.job_id,
      row.job_title,
      row.full_name,
      row.email,
      row.phone,
      row.experience,
      row.qualification,
      row.notes,
      row.cv_url,
      row.cv_key,
      row.cv_file_name,
      row.submitted_at,
      row.status,
    )
    .run();

  return toPublicApplication(row);
}

/** All applications, newest first. Admin only. */
export async function listApplications(): Promise<JobApplication[]> {
  const db = await getDb();
  const { results } = await db
    .prepare("SELECT * FROM job_applications ORDER BY submitted_at DESC LIMIT 1000")
    .all<ApplicationRow>();

  return results.map(toPublicApplication);
}

/** Updates an application's hiring status. */
export async function setApplicationStatus(id: string, status: string): Promise<boolean> {
  if (!id || !VALID_STATUSES.includes(status as JobApplicationStatus)) return false;

  const db = await getDb();
  const result = await db
    .prepare("UPDATE job_applications SET status = ? WHERE id = ?")
    .bind(status, id)
    .run();

  return (result.meta.changes ?? 0) > 0;
}

/** Deletes an application and the CV file it uploaded, if any. */
export async function deleteApplication(id: string): Promise<boolean> {
  if (!id) return false;

  const db = await getDb();
  const row = await db
    .prepare("SELECT * FROM job_applications WHERE id = ?")
    .bind(id)
    .first<ApplicationRow>();
  if (!row) return false;

  const result = await db.prepare("DELETE FROM job_applications WHERE id = ?").bind(id).run();
  if ((result.meta.changes ?? 0) === 0) return false;

  // Remove the stored CV so deleted candidates leave nothing behind in R2.
  // Older records predate `cv_key`; recover the key from the public URL.
  const key = row.cv_key || keyFromUrl(row.cv_url ?? undefined);
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
