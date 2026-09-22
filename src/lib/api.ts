/** Typed wrappers around the `/api` endpoints served by `server/`. */

import type {
  FormSubmissionItem,
  JobApplication,
  SiteContentDocument,
  UploadedImageResponse,
} from "@/types/site";

/** Error carrying the HTTP status of a failed API call. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Reads `{ message }` off an error response, falling back to `fallback`. */
async function readErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string };
    return body?.message || fallback;
  } catch {
    return fallback;
  }
}

async function request<T>(input: string, init: RequestInit | undefined, fallbackError: string): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response, fallbackError), response.status);
  }

  return (await response.json()) as T;
}

export function fetchSiteContent(): Promise<SiteContentDocument> {
  return request<SiteContentDocument>("/api/site-content", undefined, "Failed to load site content.");
}

export function saveSiteContentDocument(content: SiteContentDocument): Promise<SiteContentDocument> {
  return request<SiteContentDocument>(
    "/api/site-content",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    },
    "Failed to save site content.",
  );
}

export function uploadImage(file: File): Promise<UploadedImageResponse> {
  const formData = new FormData();
  formData.append("image", file);

  return request<UploadedImageResponse>("/api/uploads/image", { method: "POST", body: formData }, "Upload failed.");
}

/** Uploads a document (PDF, office file or image) for the admin panel to link to. */
export function uploadDocument(file: File): Promise<UploadedImageResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return request<UploadedImageResponse>("/api/uploads/document", { method: "POST", body: formData }, "Upload failed.");
}

/**
 * Records an enquiry from one of the public online forms.
 *
 * Submissions live in their own collection, not in the site document, so this
 * does not require an administrator session.
 */
export function submitFormSubmission(submission: FormSubmissionItem): Promise<{ submission: FormSubmissionItem }> {
  return request<{ submission: FormSubmissionItem }>(
    "/api/submissions",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    },
    "Could not record your enquiry.",
  );
}

/** Fields the public careers form collects. */
export interface JobApplicationInput {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
  notes?: string;
  /** Optional CV; uploaded to R2 by the server. */
  cv?: File | null;
}

/** Submits a job application, with the CV sent as multipart form data. */
export function submitJobApplication(input: JobApplicationInput): Promise<{ application: JobApplication }> {
  const formData = new FormData();

  formData.append("jobId", input.jobId);
  formData.append("jobTitle", input.jobTitle);
  formData.append("fullName", input.fullName);
  formData.append("email", input.email);
  formData.append("phone", input.phone);
  formData.append("experience", input.experience);
  formData.append("qualification", input.qualification);
  formData.append("notes", input.notes || "");
  if (input.cv) formData.append("cv", input.cv);

  return request<{ application: JobApplication }>(
    "/api/applications",
    { method: "POST", body: formData },
    "Could not submit your application.",
  );
}
