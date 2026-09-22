"use client";

import { useEffect, useState } from "react";

import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import FilePicker from "@/components/admin/ui/FilePicker";
import { Field, Input, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { DisclosureContent, DisclosureDocumentItem, DisclosureFieldItem, DisclosureResultItem } from "@/types/site";

/** Id for a row added in the panel; unique enough for a single document. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Row of label + value inputs, used by the general, staff and infrastructure tables. */
function FieldRows({
  rows,
  onChange,
}: {
  rows: DisclosureFieldItem[];
  onChange: (rows: DisclosureFieldItem[]) => void;
}) {
  const update = (id: string, patch: Partial<DisclosureFieldItem>) =>
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <Field label="Heading" className="sm:flex-1">
            <Input value={row.label} onChange={(e) => update(row.id, { label: e.target.value })} />
          </Field>
          <Field label="Information" className="sm:flex-1">
            <Input value={row.value} onChange={(e) => update(row.id, { value: e.target.value })} />
          </Field>
          <Button
            variant="danger"
            aria-label={`Remove ${row.label || "row"}`}
            onClick={() => onChange(rows.filter((item) => item.id !== row.id))}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onChange([...rows, { id: newId("row"), label: "", value: "" }])}
      >
        + Add row
      </Button>
    </div>
  );
}

/** Row of document name + link, used by the documents and results tables. */
function DocumentRows({
  rows,
  onChange,
}: {
  rows: DisclosureDocumentItem[];
  onChange: (rows: DisclosureDocumentItem[]) => void;
}) {
  const update = (id: string, patch: Partial<DisclosureDocumentItem>) =>
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.id} className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <Field label="Document" className="sm:flex-1">
            <Input value={row.label} onChange={(e) => update(row.id, { label: e.target.value })} />
          </Field>
          <div className="sm:w-80">
            <FilePicker
              url={row.url}
              onChange={(url) => update(row.id, { url })}
              hint="Leave empty to show “Available at the school office”."
            />
          </div>
          <Button
            variant="danger"
            className="sm:mt-6"
            aria-label={`Remove ${row.label || "document"}`}
            onClick={() => onChange(rows.filter((item) => item.id !== row.id))}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onChange([...rows, { id: newId("doc"), label: "", url: "" }])}
      >
        + Add document
      </Button>
    </div>
  );
}

/** One year of board results. */
function ResultRows({
  rows,
  onChange,
  idPrefix,
}: {
  rows: DisclosureResultItem[];
  onChange: (rows: DisclosureResultItem[]) => void;
  idPrefix: string;
}) {
  const update = (id: string, patch: Partial<DisclosureResultItem>) =>
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <Field label="Year" className="sm:w-32">
            <Input value={row.year} onChange={(e) => update(row.id, { year: e.target.value })} />
          </Field>
          <Field label="Registered" className="sm:flex-1">
            <Input value={row.registered} onChange={(e) => update(row.id, { registered: e.target.value })} />
          </Field>
          <Field label="Passed" className="sm:flex-1">
            <Input value={row.passed} onChange={(e) => update(row.id, { passed: e.target.value })} />
          </Field>
          <Field label="Pass %" className="sm:flex-1">
            <Input
              value={row.passPercentage}
              onChange={(e) => update(row.id, { passPercentage: e.target.value })}
            />
          </Field>
          <Button
            variant="danger"
            aria-label={`Remove ${row.year || "year"}`}
            onClick={() => onChange(rows.filter((item) => item.id !== row.id))}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          onChange([
            ...rows,
            { id: newId(idPrefix), year: "", registered: "", passed: "", passPercentage: "" },
          ])
        }
      >
        + Add year
      </Button>
    </div>
  );
}

/**
 * Editor for the CBSE mandatory public disclosure page.
 *
 * The whole disclosure is edited as one draft and saved in a single write, so a
 * half-finished proforma is never published.
 */
export default function DisclosureTab() {
  const { disclosure } = useSiteContent();
  const { saveDisclosure } = useAdmin();

  const [draft, setDraft] = useState<DisclosureContent>(disclosure);
  const [saving, setSaving] = useState(false);

  // Follow the saved document, including a reload from the API.
  useEffect(() => setDraft(disclosure), [disclosure]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(disclosure);

  const patch = (updates: Partial<DisclosureContent>) => setDraft((prev) => ({ ...prev, ...updates }));

  const handleSave = async () => {
    setSaving(true);
    await saveDisclosure(draft);
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="Mandatory disclosure"
        description="Every figure on the public Mandatory Public Disclosure page, in the CBSE Appendix IX order."
        actions={
          <a href="/mandatory-disclosure" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              View page ↗
            </Button>
          </a>
        }
      />

      <Card>
        <CardHeader title="Page introduction" description="Shown under the page title." />
        <CardBody className="space-y-4">
          <Field label="Introduction">
            <Textarea rows={3} value={draft.intro} onChange={(e) => patch({ intro: e.target.value })} />
          </Field>
          <Field label="Last updated" className="max-w-xs" hint="For example 12 September 2025.">
            <Input value={draft.updatedOn} onChange={(e) => patch({ updatedOn: e.target.value })} />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="A — General information"
          description="Affiliation number, school code, principal and contact details."
        />
        <CardBody>
          <FieldRows rows={draft.general} onChange={(general) => patch({ general })} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="B — Documents and information"
          description="Certificates CBSE requires the school to publish. Add a link once a document is hosted online."
        />
        <CardBody>
          <DocumentRows rows={draft.documents} onChange={(documents) => patch({ documents })} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="C — Result and academics"
          description="Fee structure, calendar, SMC and PTA lists, board results."
        />
        <CardBody>
          <DocumentRows rows={draft.resultAcademics} onChange={(resultAcademics) => patch({ resultAcademics })} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Board results — Class X" description="One row per session, newest first." />
        <CardBody>
          <ResultRows idPrefix="x" rows={draft.classXResults} onChange={(classXResults) => patch({ classXResults })} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Board results — Class XII" description="One row per session, newest first." />
        <CardBody>
          <ResultRows
            idPrefix="xii"
            rows={draft.classXiiResults}
            onChange={(classXiiResults) => patch({ classXiiResults })}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="D — Staff (teaching)"
          description="Principal, teacher counts, ratio, special educator and counsellor."
        />
        <CardBody>
          <FieldRows rows={draft.staff} onChange={(staff) => patch({ staff })} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="E — School infrastructure"
          description="Campus area, classrooms, laboratories, toilets and the inspection video."
        />
        <CardBody>
          <FieldRows rows={draft.infrastructure} onChange={(infrastructure) => patch({ infrastructure })} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Declaration & contact" description="The closing paragraph under the tables." />
        <CardBody className="space-y-4">
          <Field label="Declaration">
            <Textarea rows={2} value={draft.declaration} onChange={(e) => patch({ declaration: e.target.value })} />
          </Field>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Field label="Contact email" className="sm:flex-1">
              <Input
                type="email"
                value={draft.contactEmail}
                onChange={(e) => patch({ contactEmail: e.target.value })}
              />
            </Field>
            <Field label="Contact phone" className="sm:flex-1">
              <Input value={draft.contactPhone} onChange={(e) => patch({ contactPhone: e.target.value })} />
            </Field>
          </div>
        </CardBody>
      </Card>

      {/* Save bar — stays in reach however far down the proforma you are. */}
      <div className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12.5px] text-slate-500">
            {dirty ? "You have unsaved changes." : "Everything is saved."}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!dirty || saving} onClick={() => setDraft(disclosure)}>
              Discard
            </Button>
            <Button variant="primary" size="sm" disabled={!dirty || saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save disclosure"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
