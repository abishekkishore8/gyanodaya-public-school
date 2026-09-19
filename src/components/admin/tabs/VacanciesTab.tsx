"use client";

import { useState } from "react";

import Badge, { type BadgeTone } from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import { Card, CardHeader } from "@/components/admin/ui/Card";
import EmptyState from "@/components/admin/ui/EmptyState";
import { Select } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdmin } from "@/context/AdminContext";
import { useAdminData } from "@/context/AdminDataContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { JobApplication, JobApplicationStatus } from "@/types/site";

const STATUSES: JobApplicationStatus[] = ["New", "Shortlisted", "Interviewed", "Rejected", "Hired"];

const STATUS_TONE: Record<JobApplicationStatus, BadgeTone> = {
  New: "warning",
  Shortlisted: "info",
  Interviewed: "brand",
  Rejected: "danger",
  Hired: "success",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

/** One candidate, with their CV link and hiring status. */
function ApplicationRow({ application }: { application: JobApplication }) {
  const { setApplicationStatus, removeApplication } = useAdminData();
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="px-5 py-3.5">
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[13.5px] font-semibold text-slate-900">{application.fullName}</p>
            <Badge tone={STATUS_TONE[application.status]}>{application.status}</Badge>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-slate-500">
            <a href={`tel:${application.phone}`} className="hover:text-slate-800">
              {application.phone}
            </a>
            {application.email && (
              <a href={`mailto:${application.email}`} className="truncate hover:text-slate-800">
                {application.email}
              </a>
            )}
            <span className="text-slate-400">{formatDate(application.submittedAt)}</span>
          </div>

          <p className="mt-1 text-[12.5px] text-slate-600">
            {application.qualification || "Qualification not given"}
            <span className="text-slate-400"> · {application.experience || "Experience not given"}</span>
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {application.cvUrl ? (
            <a href={application.cvUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="primary">
                Download CV
              </Button>
            </a>
          ) : (
            <Badge tone="neutral">No CV attached</Badge>
          )}

          <Select
            value={application.status}
            aria-label={`Status for ${application.fullName}`}
            onChange={(e) => void setApplicationStatus(application.id, e.target.value as JobApplicationStatus)}
            className="h-8 w-auto py-0 text-[13px]"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>

          {application.notes && (
            <Button size="sm" variant="secondary" onClick={() => setExpanded((prev) => !prev)}>
              {expanded ? "Hide" : "Notes"}
            </Button>
          )}

          <Button size="sm" variant="danger" onClick={() => void removeApplication(application.id)}>
            Delete
          </Button>
        </div>
      </div>

      {expanded && application.notes && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Candidate notes</p>
          <p className="mt-1 whitespace-pre-wrap text-[13px] leading-relaxed text-slate-800">
            {application.notes}
          </p>
          {application.cvFileName && (
            <p className="mt-2 text-[12px] text-slate-500">Attachment: {application.cvFileName}</p>
          )}
        </div>
      )}
    </li>
  );
}

/** Manages vacancies and the applications received against each of them. */
export default function VacanciesTab() {
  const { recruitmentPositions } = useSiteContent();
  const { openJobEditor, deleteJobPosition } = useAdmin();
  const { applications, applicationsForJob } = useAdminData();

  const [openVacancy, setOpenVacancy] = useState<string | null>(null);

  // Applications whose vacancy has since been deleted still need somewhere to live.
  const orphaned = applications.filter(
    (application) => !recruitmentPositions.some((job) => job.id === application.jobId),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vacancies"
        description="Openings published on the careers desk, and the applications received for each."
        actions={
          <Button variant="primary" onClick={() => openJobEditor()}>
            Add vacancy
          </Button>
        }
      />

      <Card>
        <CardHeader
          title="Published vacancies"
          badge={<Badge tone="brand">{recruitmentPositions.length}</Badge>}
          description={`${applications.length} application${applications.length === 1 ? "" : "s"} received in total.`}
        />

        {recruitmentPositions.length === 0 ? (
          <EmptyState
            icon="💼"
            title="No vacancies published"
            description="Add a vacancy and it will appear on the careers desk immediately."
            action={
              <Button variant="primary" onClick={() => openJobEditor()}>
                Add the first vacancy
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-slate-100">
            {recruitmentPositions.map((job) => {
              const jobApplications = applicationsForJob(job.id);
              const isOpen = openVacancy === job.id;

              return (
                <li key={job.id}>
                  <div className="flex flex-wrap items-start gap-4 px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-slate-900">{job.title}</p>
                      <p className="mt-0.5 text-[12.5px] text-slate-500">{job.dept}</p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge tone="neutral">{job.vacancies}</Badge>
                        <Badge tone="info">{job.type}</Badge>
                        <Badge tone="warning">Closes {job.deadline}</Badge>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        variant={jobApplications.length > 0 ? "primary" : "secondary"}
                        onClick={() => setOpenVacancy(isOpen ? null : job.id)}
                      >
                        {jobApplications.length} application{jobApplications.length === 1 ? "" : "s"}
                        <span aria-hidden>{isOpen ? " ▴" : " ▾"}</span>
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => openJobEditor(job)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          if (window.confirm(`Delete the vacancy “${job.title}”? Applications are kept.`)) {
                            void deleteJobPosition(job.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/60">
                      {jobApplications.length === 0 ? (
                        <EmptyState
                          icon="📄"
                          title="No applications yet"
                          description="Candidates who apply through the careers desk will appear here with their CV."
                        />
                      ) : (
                        <ul className="divide-y divide-slate-200/70">
                          {jobApplications.map((application) => (
                            <ApplicationRow key={application.id} application={application} />
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {orphaned.length > 0 && (
        <Card>
          <CardHeader
            title="Other applications"
            badge={<Badge tone="neutral">{orphaned.length}</Badge>}
            description="Applications for “Other staff”, or for vacancies that have since been removed."
          />
          <ul className="divide-y divide-slate-100">
            {orphaned.map((application) => (
              <li key={application.id}>
                <p className="px-5 pt-3 text-[12px] font-medium text-slate-500">
                  Applied for: {application.jobTitle}
                </p>
                <ApplicationRow application={application} />
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
