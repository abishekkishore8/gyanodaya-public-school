"use client";

import { useEffect, useState } from "react";

import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { FeeGroupItem, FeesContent } from "@/types/site";

/** Id for a row added in the panel; unique enough for a single document. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Editor for one fee table. */
function FeeGroupEditor({
  group,
  onChange,
  onRemove,
}: {
  group: FeeGroupItem;
  onChange: (group: FeeGroupItem) => void;
  onRemove: () => void;
}) {
  const updateRow = (id: string, patch: Partial<FeeGroupItem["rows"][number]>) =>
    onChange({ ...group, rows: group.rows.map((row) => (row.id === id ? { ...row, ...patch } : row)) });

  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Field label="Heading" className="sm:flex-1" required>
          <Input
            value={group.title}
            onChange={(e) => onChange({ ...group, title: e.target.value })}
            placeholder="Primary Wing"
          />
        </Field>
        <Field label="Classes" className="sm:flex-1">
          <Input
            value={group.subtitle}
            onChange={(e) => onChange({ ...group, subtitle: e.target.value })}
            placeholder="Classes I to V"
          />
        </Field>
        <Button variant="danger" onClick={onRemove}>
          Remove table
        </Button>
      </div>

      <div className="space-y-3 rounded-lg bg-slate-50/70 p-3">
        <p className="text-[12.5px] font-semibold text-slate-600">Rows</p>

        {group.rows.map((row) => (
          <div key={row.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <Field label="Item" className="sm:flex-1">
              <Input value={row.label} onChange={(e) => updateRow(row.id, { label: e.target.value })} />
            </Field>
            <Field label="Amount" className="sm:w-44">
              <Input
                value={row.amount}
                onChange={(e) => updateRow(row.id, { amount: e.target.value })}
                placeholder="₹1,200 / month"
              />
            </Field>
            <Field label="Note" className="sm:w-48">
              <Input value={row.note} onChange={(e) => updateRow(row.id, { note: e.target.value })} />
            </Field>
            <Button
              variant="danger"
              aria-label={`Remove ${row.label || "row"}`}
              onClick={() => onChange({ ...group, rows: group.rows.filter((item) => item.id !== row.id) })}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChange({ ...group, rows: [...group.rows, { id: newId("fee"), label: "", amount: "", note: "" }] })}
        >
          + Add row
        </Button>
      </div>
    </div>
  );
}

/** Editor for the fee structure page. */
export default function FeesTab() {
  const { fees } = useSiteContent();
  const { saveFees } = useAdmin();

  const [draft, setDraft] = useState<FeesContent>(fees);
  const [saving, setSaving] = useState(false);

  // Follow the saved document, including a reload from the API.
  useEffect(() => setDraft(fees), [fees]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(fees);

  const patch = (updates: Partial<FeesContent>) => setDraft((prev) => ({ ...prev, ...updates }));

  const handleSave = async () => {
    setSaving(true);
    await saveFees(draft);
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="Fee structure"
        description="The fee tables published at /fees. Amounts are shown exactly as typed here."
        actions={
          <a href="/fees" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              View page ↗
            </Button>
          </a>
        }
      />

      <Card>
        <CardHeader title="Introduction" description="Shown under the page title." />
        <CardBody>
          <Field label="Introduction">
            <Textarea rows={3} value={draft.intro} onChange={(e) => patch({ intro: e.target.value })} />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Fee tables" description="One table per stage, shown in this order." />
        <CardBody className="space-y-4">
          {draft.groups.map((group) => (
            <FeeGroupEditor
              key={group.id}
              group={group}
              onChange={(next) => patch({ groups: draft.groups.map((item) => (item.id === next.id ? next : item)) })}
              onRemove={() => patch({ groups: draft.groups.filter((item) => item.id !== group.id) })}
            />
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => patch({ groups: [...draft.groups, { id: newId("fees"), title: "", subtitle: "", rows: [] }] })}
          >
            + Add table
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Please note" description="Payment terms listed under the tables." />
        <CardBody className="space-y-3">
          {draft.notes.map((note) => (
            <div key={note.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <Field label="Note" className="sm:flex-1">
                <Input
                  value={note.text}
                  onChange={(e) =>
                    patch({
                      notes: draft.notes.map((item) =>
                        item.id === note.id ? { ...item, text: e.target.value } : item,
                      ),
                    })
                  }
                />
              </Field>
              <Button
                variant="danger"
                aria-label="Remove note"
                onClick={() => patch({ notes: draft.notes.filter((item) => item.id !== note.id) })}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => patch({ notes: [...draft.notes, { id: newId("fee-note"), text: "" }] })}
          >
            + Add note
          </Button>
        </CardBody>
      </Card>

      {/* Save bar — stays in reach however far down the page you are. */}
      <div className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12.5px] text-slate-500">
            {dirty ? "You have unsaved changes." : "Everything is saved."}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!dirty || saving} onClick={() => setDraft(fees)}>
              Discard
            </Button>
            <Button variant="primary" size="sm" disabled={!dirty || saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save fees"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
