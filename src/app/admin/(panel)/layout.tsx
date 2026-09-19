import { redirect } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { getCurrentAdmin } from "@/server/session";
import { listApplications } from "@/server/applications";
import { readSiteContent } from "@/server/site-content";
import { listSubmissions } from "@/server/submissions";
import type { FormSubmissionItem, JobApplication, SiteContentDocument } from "@/types/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Management Portal · Gyanodaya Public School",
  robots: { index: false, follow: false },
};

/**
 * Guard for every page in the `(panel)` group.
 *
 * The session cookie is verified on the server before any admin markup is sent,
 * so an unauthenticated visitor never receives the panel at all. Site content is
 * fetched here too, so the panel renders with real data on first paint instead
 * of flashing placeholder counts.
 */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  let initialContent: SiteContentDocument | undefined;
  let initialSubmissions: FormSubmissionItem[] = [];
  let initialApplications: JobApplication[] = [];

  try {
    [initialContent, initialSubmissions, initialApplications] = await Promise.all([
      readSiteContent(),
      listSubmissions(),
      listApplications(),
    ]);
  } catch {
    // Leave content undefined: the shell falls back to fetching on the client
    // and surfaces the load error from there.
  }

  return (
    <AdminShell
      user={admin}
      initialContent={initialContent}
      initialSubmissions={initialSubmissions}
      initialApplications={initialApplications}
    >
      {children}
    </AdminShell>
  );
}
