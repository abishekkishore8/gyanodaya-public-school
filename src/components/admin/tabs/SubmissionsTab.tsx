"use client";

import { useMemo, useState } from "react";

import Badge, { type BadgeTone } from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import { Card, CardHeader } from "@/components/admin/ui/Card";
import EmptyState from "@/components/admin/ui/EmptyState";
import { Input, Select } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdminData } from "@/context/AdminDataContext";
import type { FormSubmissionItem, FormSubmissionStatus, FormSubmissionType } from "@/types/site";

type Filter = "all" | FormSubmissionType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "admission", label: "Admissions" },
  { id: "enquiry", label: "Enquiries" },
  { id: "visit", label: "Campus visits" },
  { id: "prospectus", label: "Prospectus" },
];

const STATUSES: FormSubmissionStatus[] = ["Pending", "Reviewed", "Contacted", "Approved"];

const STATUS_TONE: Record<FormSubmissionStatus, BadgeTone> = {
  Pending: "warning",
  Reviewed: "info",
  Contacted: "brand",
  Approved: "success",
};

const TYPE_LABEL: Record<FormSubmissionType, string> = {
  admission: "Admission",
  enquiry: "Enquiry",
  visit: "Campus visit",
  prospectus: "Prospectus",
};

function SubmissionRow({ item }: { item: FormSubmissionItem }) {
  const { setSubmissionStatus, removeSubmission } = useAdminData();
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="neutral">{TYPE_LABEL[item.type]}</Badge>
            <code className="text-[11.5px] text-slate-500">{item.id}</code>
          </div>

          <p className="mt-1.5 text-[14px] font-semibold text-slate-900">{item.name}</p>
          <p className="text-[12.5px] text-slate-500">{item.title}</p>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-slate-500">
            <a href={`tel:${item.phone}`} className="hover:text-slate-800">
              {item.phone}
            </a>
            {item.email && (
              <a href={`mailto:${item.email}`} className="truncate hover:text-slate-800">
                {item.email}
              </a>
            )}
            <span className="text-slate-400">{item.submittedAt}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Badge tone={STATUS_TONE[item.status]}>{item.status}</Badge>

          <Select
            value={item.status}
            aria-label={`Status for ${item.id}`}
            onChange={(e) => void setSubmissionStatus(item.id, e.target.value as FormSubmissionStatus)}
            className="h-8 w-auto py-0 text-[13px]"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>

          <Button size="sm" variant="secondary" onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "Hide" : "Details"}
          </Button>

          <Button size="sm" variant="danger" onClick={() => void removeSubmission(item.id)}>
            Delete
          </Button>
        </div>
      </div>

      {expanded && (
        <dl className="mt-4 grid gap-x-6 gap-y-2.5 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          {Object.entries(item.details).map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
              <dd className="mt-0.5 text-[13px] leading-relaxed text-slate-800">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}

/** Reviews online form submissions and updates their status. */
export default function SubmissionsTab() {
  const { submissions: formSubmissions } = useAdminData();

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();

    return formSubmissions.filter((item) => {
      if (filter !== "all" && item.type !== filter) return false;
      if (!query) return true;

      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.phone.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        (item.email?.toLowerCase().includes(query) ?? false)
      );
    });
  }, [formSubmissions, filter, search]);

  const pendingCount = formSubmissions.filter((item) => item.status === "Pending").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Form submissions"
        description={
          pendingCount > 0
            ? `${formSubmissions.length} total · ${pendingCount} awaiting review`
            : `${formSubmissions.length} total · all reviewed`
        }
      />

      <Card>
        <CardHeader
          title="Enquiries"
          description="Admission applications, enquiries, campus visits and prospectus requests."
          badge={<Badge tone="brand">{visible.length}</Badge>}
        />

        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-5 py-3">
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((option) => {
              const active = option.id === filter;
              const count =
                option.id === "all"
                  ? formSubmissions.length
                  : formSubmissions.filter((item) => item.type === option.id).length;

              return (
                <button
                  key={option.id}
                  onClick={() => setFilter(option.id)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12.5px] font-medium transition cursor-pointer ${
                    active
                      ? "border-[#14452f] bg-[#14452f] text-white"
                      : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option.label}
                  <span className={active ? "text-white/70" : "text-slate-400"}>{count}</span>
                </button>
              );
            })}
          </div>

          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, reference, phone…"
            aria-label="Search submissions"
            className="ml-auto h-9 w-full sm:w-64"
          />
        </div>

        {visible.length === 0 ? (
          <EmptyState
            icon="🔍"
            title={formSubmissions.length === 0 ? "No submissions yet" : "Nothing matches those filters"}
            description={
              formSubmissions.length === 0
                ? "Enquiries submitted through the website will appear here."
                : "Try a different category or clear the search."
            }
            action={
              formSubmissions.length > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setFilter("all");
                    setSearch("");
                  }}
                >
                  Clear filters
                </Button>
              )
            }
          />
        ) : (
          <ul className="divide-y divide-slate-100">
            {visible.map((item) => (
              <SubmissionRow key={item.id} item={item} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
