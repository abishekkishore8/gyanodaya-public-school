"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { useToast } from "./ToastContext";
import type {
  FormSubmissionItem,
  FormSubmissionStatus,
  JobApplication,
  JobApplicationStatus,
} from "@/types/site";

/**
 * Enquiries and job applications.
 *
 * These are not part of the public site document — they live in their own
 * admin-only collections — so the panel loads them separately from
 * `SiteContentContext`.
 */

async function readMessage(response: Response, fallback: string): Promise<string> {
  const body = (await response.json().catch(() => ({}))) as { message?: string };
  return body.message || fallback;
}

interface AdminDataValue {
  submissions: FormSubmissionItem[];
  applications: JobApplication[];

  refreshSubmissions: () => Promise<void>;
  refreshApplications: () => Promise<void>;

  setSubmissionStatus: (reference: string, status: FormSubmissionStatus) => Promise<void>;
  removeSubmission: (reference: string) => Promise<void>;

  setApplicationStatus: (id: string, status: JobApplicationStatus) => Promise<void>;
  removeApplication: (id: string) => Promise<void>;

  /** Applications for one vacancy, newest first. */
  applicationsForJob: (jobId: string) => JobApplication[];
}

const AdminDataContext = createContext<AdminDataValue | null>(null);

interface AdminDataProviderProps {
  children: ReactNode;
  /** Fetched in the panel layout so the first paint already has real data. */
  initialSubmissions?: FormSubmissionItem[];
  initialApplications?: JobApplication[];
}

export function AdminDataProvider({
  children,
  initialSubmissions = [],
  initialApplications = [],
}: AdminDataProviderProps) {
  const { showToast } = useToast();

  const [submissions, setSubmissions] = useState<FormSubmissionItem[]>(initialSubmissions);
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);

  const refreshSubmissions = useCallback(async () => {
    try {
      const response = await fetch("/api/submissions");
      if (!response.ok) throw new Error(await readMessage(response, "Failed to load submissions."));
      const body = (await response.json()) as { submissions: FormSubmissionItem[] };
      setSubmissions(body.submissions);
    } catch (error) {
      showToast(`⚠️ ${error instanceof Error ? error.message : "Failed to load submissions."}`);
    }
  }, [showToast]);

  const refreshApplications = useCallback(async () => {
    try {
      const response = await fetch("/api/applications");
      if (!response.ok) throw new Error(await readMessage(response, "Failed to load applications."));
      const body = (await response.json()) as { applications: JobApplication[] };
      setApplications(body.applications);
    } catch (error) {
      showToast(`⚠️ ${error instanceof Error ? error.message : "Failed to load applications."}`);
    }
  }, [showToast]);

  const setSubmissionStatus = useCallback(
    async (reference: string, status: FormSubmissionStatus) => {
      // Optimistic: the row updates immediately and is reverted by the refresh
      // below if the server rejected the change.
      setSubmissions((prev) => prev.map((item) => (item.id === reference ? { ...item, status } : item)));

      const response = await fetch(`/api/submissions/${encodeURIComponent(reference)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        showToast(`⚠️ ${await readMessage(response, "Could not update the submission.")}`);
        await refreshSubmissions();
        return;
      }

      showToast(`Marked ${reference} as “${status}”.`);
    },
    [refreshSubmissions, showToast],
  );

  const removeSubmission = useCallback(
    async (reference: string) => {
      if (!window.confirm("Delete this enquiry permanently?")) return;

      const response = await fetch(`/api/submissions/${encodeURIComponent(reference)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        showToast(`⚠️ ${await readMessage(response, "Could not delete the submission.")}`);
        return;
      }

      setSubmissions((prev) => prev.filter((item) => item.id !== reference));
      showToast("Enquiry deleted.");
    },
    [showToast],
  );

  const setApplicationStatus = useCallback(
    async (id: string, status: JobApplicationStatus) => {
      setApplications((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));

      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        showToast(`⚠️ ${await readMessage(response, "Could not update the application.")}`);
        await refreshApplications();
        return;
      }

      showToast(`Application marked “${status}”.`);
    },
    [refreshApplications, showToast],
  );

  const removeApplication = useCallback(
    async (id: string) => {
      if (!window.confirm("Delete this application permanently? The attached CV is deleted too.")) return;

      const response = await fetch(`/api/applications/${id}`, { method: "DELETE" });

      if (!response.ok) {
        showToast(`⚠️ ${await readMessage(response, "Could not delete the application.")}`);
        return;
      }

      setApplications((prev) => prev.filter((item) => item.id !== id));
      showToast("Application deleted.");
    },
    [showToast],
  );

  const applicationsForJob = useCallback(
    (jobId: string) => applications.filter((application) => application.jobId === jobId),
    [applications],
  );

  const value = useMemo<AdminDataValue>(
    () => ({
      submissions,
      applications,
      refreshSubmissions,
      refreshApplications,
      setSubmissionStatus,
      removeSubmission,
      setApplicationStatus,
      removeApplication,
      applicationsForJob,
    }),
    [
      submissions,
      applications,
      refreshSubmissions,
      refreshApplications,
      setSubmissionStatus,
      removeSubmission,
      setApplicationStatus,
      removeApplication,
      applicationsForJob,
    ],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData(): AdminDataValue {
  const value = useContext(AdminDataContext);
  if (!value) throw new Error("useAdminData must be used within an AdminDataProvider");
  return value;
}
