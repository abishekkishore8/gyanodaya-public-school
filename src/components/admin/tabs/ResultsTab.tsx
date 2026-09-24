"use client";

import { useEffect, useState } from "react";

import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import PhotoPicker from "@/components/admin/ui/PhotoPicker";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { ResultGroupItem, ResultsContent } from "@/types/site";

/** Id for a row added in the panel; unique enough for a single document. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Editor for one results announcement and its toppers. */
function ResultGroupEditor({
  group,
  onChange,
  onRemove,
}: {
  group: ResultGroupItem;
  onChange: (group: ResultGroupItem) => void;
  onRemove: () => void;
}) {
  const updateTopper = (id: string, patch: Partial<ResultGroupItem["toppers"][number]>) =>
    onChange({
      ...group,
      toppers: group.toppers.map((topper) => (topper.id === id ? { ...topper, ...patch } : topper)),
    });

  const updateStat = (id: string, patch: Partial<ResultGroupItem["stats"][number]>) =>
    onChange({
      ...group,
      stats: group.stats.map((stat) => (stat.id === id ? { ...stat, ...patch } : stat)),
    });

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= group.toppers.length) return;
    const next = [...group.toppers];
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ ...group, toppers: next });
  };

  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <Field label="Heading" className="min-w-0 flex-1" required hint="For example Class (X) Results 2026.">
          <Input value={group.title} onChange={(e) => onChange({ ...group, title: e.target.value })} />
        </Field>
        <Button variant="danger" onClick={onRemove}>
          Remove result
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-[13px] font-semibold text-slate-700">Summary tiles</p>
        <p className="text-[12px] text-slate-500">
          Shown left of the photos, two per row — e.g. 98% / Above / 6 Students. Leave empty to hide.
        </p>
        {group.stats.map((stat) => (
          <div key={stat.id} className="flex flex-col gap-3 rounded-lg bg-slate-50/70 p-3 sm:flex-row sm:items-end">
            <Field label="Figure" className="sm:w-28" required>
              <Input value={stat.value} placeholder="98%" onChange={(e) => updateStat(stat.id, { value: e.target.value })} />
            </Field>
            <Field label="Label" className="sm:w-32">
              <Input value={stat.label} placeholder="Above" onChange={(e) => updateStat(stat.id, { label: e.target.value })} />
            </Field>
            <Field label="Caption" className="sm:flex-1">
              <Input
                value={stat.caption}
                placeholder="6 Students"
                onChange={(e) => updateStat(stat.id, { caption: e.target.value })}
              />
            </Field>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onChange({ ...group, stats: group.stats.filter((item) => item.id !== stat.id) })}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange({
              ...group,
              stats: [...group.stats, { id: newId("stat"), value: "", label: "Above", caption: "" }],
            })
          }
        >
          + Add tile
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-[13px] font-semibold text-slate-700">Students</p>
        {group.toppers.map((topper, index) => (
          <div key={topper.id} className="rounded-lg bg-slate-50/70 p-3 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-slate-400">#{index + 1}</span>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" aria-label="Move up" disabled={index === 0} onClick={() => move(index, -1)}>
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label="Move down"
                  disabled={index === group.toppers.length - 1}
                  onClick={() => move(index, 1)}
                >
                  ↓
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    onChange({ ...group, toppers: group.toppers.filter((item) => item.id !== topper.id) })
                  }
                >
                  Remove
                </Button>
              </div>
            </div>

            <PhotoPicker
              url={topper.imageUrl}
              uploadKey={`topper-${topper.id}`}
              clearable
              hint="Optional — without a photo the card shows the student's initial."
              onChange={(imageUrl) => updateTopper(topper.id, { imageUrl })}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Field label="Name" className="sm:flex-1" required>
                <Input value={topper.name} onChange={(e) => updateTopper(topper.id, { name: e.target.value })} />
              </Field>
              <Field label="Marks" className="sm:w-32" required>
                <Input
                  value={topper.score}
                  onChange={(e) => updateTopper(topper.id, { score: e.target.value })}
                  placeholder="96.2%"
                />
              </Field>
              <Field label="Label" className="sm:w-48" hint="Optional line above the name, e.g. State Topper.">
                <Input value={topper.detail} onChange={(e) => updateTopper(topper.id, { detail: e.target.value })} />
              </Field>
            </div>
          </div>
        ))}

        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange({
              ...group,
              toppers: [
                ...group.toppers,
                { id: newId("topper"), name: "", score: "", detail: "", imageUrl: "" },
              ],
            })
          }
        >
          + Add student
        </Button>
      </div>

      <Field label="Footnote" hint="Optional small note under the photos, e.g. * Results of CBSE 2026.">
        <Input value={group.footnote} onChange={(e) => onChange({ ...group, footnote: e.target.value })} />
      </Field>
    </div>
  );
}

/**
 * Editor for the board results strip under the notice board.
 *
 * A result with no students is left off the public page, so next year's
 * heading can be prepared before the marks are out.
 */
export default function ResultsTab() {
  const { results } = useSiteContent();
  const { saveResults } = useAdmin();

  const [draft, setDraft] = useState<ResultsContent>(results);
  const [saving, setSaving] = useState(false);

  // Follow the saved document, including a reload from the API.
  useEffect(() => setDraft(results), [results]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(results);

  const handleSave = async () => {
    setSaving(true);
    await saveResults(draft);
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="Board results"
        description="The toppers strip shown on the home page, under the notice board."
        actions={
          <a href="/#results" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              View section ↗
            </Button>
          </a>
        }
      />

      <Card>
        <CardHeader title="Introduction" description="One line above the results." />
        <CardBody>
          <Field label="Introduction">
            <Textarea
              rows={2}
              value={draft.intro}
              onChange={(e) => setDraft((prev) => ({ ...prev, intro: e.target.value }))}
            />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Results"
          description="One block per announcement — Class X and Class XII, or one per session."
        />
        <CardBody className="space-y-4">
          {draft.groups.map((group) => (
            <ResultGroupEditor
              key={group.id}
              group={group}
              onChange={(next) =>
                setDraft((prev) => ({
                  ...prev,
                  groups: prev.groups.map((item) => (item.id === next.id ? next : item)),
                }))
              }
              onRemove={() =>
                setDraft((prev) => ({ ...prev, groups: prev.groups.filter((item) => item.id !== group.id) }))
              }
            />
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setDraft((prev) => ({
                ...prev,
                groups: [...prev.groups, { id: newId("result"), title: "", stats: [], toppers: [], footnote: "" }],
              }))
            }
          >
            + Add result
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
            <Button variant="ghost" size="sm" disabled={!dirty || saving} onClick={() => setDraft(results)}>
              Discard
            </Button>
            <Button variant="primary" size="sm" disabled={!dirty || saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save results"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
