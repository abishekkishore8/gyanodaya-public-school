"use client";

import { useEffect, useState } from "react";

import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import PhotoPicker from "@/components/admin/ui/PhotoPicker";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { UniformContent, UniformSetItem } from "@/types/site";

/** Id for a row added in the panel; unique enough for a single document. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}


/** Editor for one complete uniform. */
function UniformSetEditor({
  set,
  onChange,
  onRemove,
}: {
  set: UniformSetItem;
  onChange: (set: UniformSetItem) => void;
  onRemove: () => void;
}) {
  const updateItem = (id: string, patch: Partial<UniformSetItem["items"][number]>) =>
    onChange({ ...set, items: set.items.map((item) => (item.id === id ? { ...item, ...patch } : item)) });

  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[13.5px] font-semibold text-slate-800">{set.title || "New uniform"}</h3>
        <Button size="sm" variant="danger" onClick={onRemove}>
          Remove uniform
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Field label="Title" className="sm:flex-1" required>
          <Input
            value={set.title}
            onChange={(e) => onChange({ ...set, title: e.target.value })}
            placeholder="Summer Uniform"
          />
        </Field>
        <Field label="When it is worn" className="sm:flex-1">
          <Input
            value={set.days}
            onChange={(e) => onChange({ ...set, days: e.target.value })}
            placeholder="April to October"
          />
        </Field>
      </div>

      <PhotoPicker
        url={set.imageUrl}
        uploadKey={`uniform-${set.id}`}
        shape="landscape"
        clearable
        hint="Optional — the card shows only the garment list without one."
        onChange={(imageUrl) => onChange({ ...set, imageUrl })}
      />

      <div className="space-y-3 rounded-lg bg-slate-50/70 p-3">
        <p className="text-[12.5px] font-semibold text-slate-600">Garments</p>

        {set.items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <Field label="Item" className="sm:w-48">
              <Input value={item.label} onChange={(e) => updateItem(item.id, { label: e.target.value })} />
            </Field>
            <Field label="Description" className="sm:flex-1">
              <Input value={item.detail} onChange={(e) => updateItem(item.id, { detail: e.target.value })} />
            </Field>
            <Button
              variant="danger"
              aria-label={`Remove ${item.label || "item"}`}
              onClick={() => onChange({ ...set, items: set.items.filter((row) => row.id !== item.id) })}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChange({ ...set, items: [...set.items, { id: newId("item"), label: "", detail: "" }] })}
        >
          + Add garment
        </Button>
      </div>
    </div>
  );
}

/**
 * Editor for the school uniform shown on the admissions page.
 *
 * The section is edited as one draft and saved in a single write.
 */
export default function UniformTab() {
  const { uniform } = useSiteContent();
  const { saveUniform } = useAdmin();

  const [draft, setDraft] = useState<UniformContent>(uniform);
  const [saving, setSaving] = useState(false);

  // Follow the saved document, including a reload from the API.
  useEffect(() => setDraft(uniform), [uniform]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(uniform);

  const patch = (updates: Partial<UniformContent>) => setDraft((prev) => ({ ...prev, ...updates }));

  const handleSave = async () => {
    setSaving(true);
    await saveUniform(draft);
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="School uniform"
        description="The dress code shown on the admissions page, under Admissions → School Uniform."
        actions={
          <a href="/admissions#uniform" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              View section ↗
            </Button>
          </a>
        }
      />

      <Card>
        <CardHeader title="Introduction" description="Shown under the section heading." />
        <CardBody>
          <Field label="Introduction">
            <Textarea rows={3} value={draft.intro} onChange={(e) => patch({ intro: e.target.value })} />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Uniforms" description="One card per uniform — summer, winter, sports, and any other." />
        <CardBody className="space-y-4">
          {draft.sets.map((set) => (
            <UniformSetEditor
              key={set.id}
              set={set}
              onChange={(next) => patch({ sets: draft.sets.map((item) => (item.id === next.id ? next : item)) })}
              onRemove={() => patch({ sets: draft.sets.filter((item) => item.id !== set.id) })}
            />
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              patch({
                sets: [...draft.sets, { id: newId("uniform"), title: "", days: "", imageUrl: "", items: [] }],
              })
            }
          >
            + Add uniform
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Please note" description="Guidance listed under the uniform cards." />
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
            onClick={() => patch({ notes: [...draft.notes, { id: newId("note"), text: "" }] })}
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
            <Button variant="ghost" size="sm" disabled={!dirty || saving} onClick={() => setDraft(uniform)}>
              Discard
            </Button>
            <Button variant="primary" size="sm" disabled={!dirty || saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save uniform"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
