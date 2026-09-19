"use client";

import Link from "next/link";

import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import EmptyState from "@/components/admin/ui/EmptyState";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdminData } from "@/context/AdminDataContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { FormSubmissionStatus } from "@/types/site";

const STATUS_TONE: Record<FormSubmissionStatus, "warning" | "info" | "brand" | "success"> = {
  Pending: "warning",
  Reviewed: "info",
  Contacted: "brand",
  Approved: "success",
};

function StatTile({
  href,
  label,
  value,
  hint,
}: {
  href: string;
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-[#14452f]/35 hover:shadow-md"
    >
      <p className="text-[12.5px] font-medium text-slate-500">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-slate-900">{value}</p>
      <p className="mt-0.5 text-[12px] leading-snug text-slate-500">{hint}</p>
    </Link>
  );
}

/** Dashboard: at-a-glance counts, recent enquiries and quick actions. */
export default function Overview() {
  const {
    announcements,
    noticeCategories,
    recruitmentPositions,
    imageAssets,
    academicSession,
  } = useSiteContent();
  const { submissions: formSubmissions, applications } = useAdminData();

  const noticeCount = noticeCategories.reduce((total, category) => total + category.items.length, 0);
  const imageCount =
    imageAssets.heroSlides.length +
    imageAssets.academicBanners.length +
    imageAssets.facilities.length +
    imageAssets.gallery.length +
    imageAssets.misc.length;

  const pending = formSubmissions.filter((item) => item.status === "Pending");
  const newApplications = applications.filter((item) => item.status === "New").length;
  const recent = formSubmissions.slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`Everything published on the school website. Session ${academicSession}.`}
        actions={
          <>
            <Link href="/admin/ticker">
              <Button size="sm" variant="secondary">
                Add news item
              </Button>
            </Link>
            <Link href="/admin/notices">
              <Button size="sm" variant="primary">
                New notice
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatTile
          href="/admin/ticker"
          label="Ticker items"
          value={announcements.length}
          hint="Scrolling headlines"
        />
        <StatTile href="/admin/notices" label="Notices" value={noticeCount} hint="Across three categories" />
        <StatTile href="/admin/images" label="Images" value={imageCount} hint="Hero, gallery and more" />
        <StatTile
          href="/admin/submissions"
          label="Submissions"
          value={formSubmissions.length}
          hint={pending.length > 0 ? `${pending.length} awaiting review` : "All reviewed"}
        />
        <StatTile
          href="/admin/vacancies"
          label="Applications"
          value={applications.length}
          hint={
            newApplications > 0 ? `${newApplications} not yet reviewed` : "Across all vacancies"
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent enquiries"
            description="Latest submissions from the online forms."
            actions={
              <Link href="/admin/submissions">
                <Button size="sm" variant="ghost">
                  View all
                </Button>
              </Link>
            }
          />

          {recent.length === 0 ? (
            <EmptyState
              icon="📭"
              title="No submissions yet"
              description="Admission applications, enquiries and campus visit requests will appear here."
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {recent.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-semibold text-slate-900">{item.name}</p>
                    <p className="truncate text-[12.5px] text-slate-500">{item.title}</p>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-[12px] text-slate-500">{item.submittedAt}</p>
                  </div>
                  <Badge tone={STATUS_TONE[item.status]}>{item.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Open vacancies"
              badge={<Badge tone="neutral">{recruitmentPositions.length}</Badge>}
              description="Published on the careers desk."
              actions={
                <Link href="/admin/vacancies">
                  <Button size="sm" variant="ghost">
                    Manage
                  </Button>
                </Link>
              }
            />
            <CardBody>
              {recruitmentPositions.length === 0 ? (
                <p className="text-[13px] text-slate-500">No vacancies are currently published.</p>
              ) : (
                <ul className="space-y-2.5">
                  {recruitmentPositions.slice(0, 5).map((job) => (
                    <li key={job.id} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c59a3f]" />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-slate-800">{job.title}</p>
                        <p className="truncate text-[12px] text-slate-500">{job.vacancies}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Quick links" />
            <CardBody padded={false}>
              <div className="divide-y divide-slate-100">
                {[
                  { href: "/admin/images", label: "Replace a photograph" },
                  { href: "/admin/settings", label: "Change academic session" },
                  { href: "/admin/vacancies", label: "Publish a vacancy" },
                  { href: "/admin/users", label: "Add an administrator" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between px-5 py-3 text-[13px] text-slate-700 hover:bg-slate-50"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden className="text-slate-300">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
