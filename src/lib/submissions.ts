/** Helpers shared by the four public online forms. */

import type { FormSubmissionType } from "@/types/site";

/** Reference-number prefix for each submission type. */
const REFERENCE_PREFIXES: Record<FormSubmissionType | "admissionEnquiry", string> = {
  admission: "GPS-ADM",
  enquiry: "GPS-ENQ",
  visit: "GPS-VISIT",
  prospectus: "GPS-DOC",
  admissionEnquiry: "GPS-ADM-ENQ",
};

/** Generates a human-friendly reference number, e.g. `GPS-ADM-8492`. */
export function createReferenceId(kind: keyof typeof REFERENCE_PREFIXES): string {
  return `${REFERENCE_PREFIXES[kind]}-${Math.floor(1000 + Math.random() * 9000)}`;
}

/** Formats "now" the way submissions are displayed in the admin dashboard. */
export function formatSubmittedAt(date: Date = new Date()): string {
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

/** Reads a trimmed string field from a submitted form, falling back to `fallback`. */
export function readField(formData: FormData, name: string, fallback = ""): string {
  const value = formData.get(name);
  return value === null ? fallback : String(value).trim();
}

/** Classes XI and XII pick a stream; lower classes do not. */
export function streamSuffixFor(grade: string, stream: string): string {
  return grade.includes("XI") || grade.includes("XII") ? ` (${stream})` : "";
}
