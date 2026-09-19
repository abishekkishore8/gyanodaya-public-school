"use client";

import { useState, type FormEvent } from "react";

import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import EmptyState from "@/components/admin/ui/EmptyState";
import { Field, Input } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";

/** Prefixes offered as one-click shortcuts when composing a headline. */
const QUICK_EMOJIS = ["📢", "🏆", "📅", "✨", "🚌", "💼", "🔬", "🎓"];

/** Manages the scrolling news ticker shown at the top of the public site. */
export default function TickerTab() {
  const { announcements } = useSiteContent();
  const { addAnnouncement, updateAnnouncement, deleteAnnouncement, moveAnnouncement } = useAdmin();

  const [draft, setDraft] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleAdd = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    void addAnnouncement(draft);
    setDraft("");
  };

  const handleSaveEdit = (index: number) => {
    if (!editingText.trim()) return;
    void updateAnnouncement(index, editingText);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="News ticker"
        description="The scrolling headline strip below the main navigation. Changes appear immediately."
      />

      <Card>
        <CardHeader title="Add a headline" description="Keep it short — the ticker scrolls continuously." />
        <CardBody>
          <form onSubmit={handleAdd} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Field label="Headline" className="flex-1" required>
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Admissions open for Session 2025–26 — Nursery to Class XII"
              />
            </Field>
            <Button type="submit" variant="primary" disabled={!draft.trim()}>
              Publish
            </Button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[12px] text-slate-500">Prefix:</span>
            {QUICK_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setDraft((prev) => `${emoji} ${prev}`)}
                className="rounded-md px-1.5 py-1 text-sm transition hover:bg-slate-100 cursor-pointer"
                aria-label={`Prefix with ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Live headlines"
          badge={<Badge tone="brand">{announcements.length}</Badge>}
          description="Shown in this order, looping left to right."
        />

        {announcements.length === 0 ? (
          <EmptyState
            icon="📣"
            title="No headlines yet"
            description="Add one above and it will start scrolling on the website straight away."
          />
        ) : (
          <ul className="divide-y divide-slate-100">
            {announcements.map((item, index) => (
              <li key={`${item}-${index}`} className="flex flex-wrap items-center gap-3 px-5 py-3">
                <span className="w-6 shrink-0 text-[12px] font-semibold tabular-nums text-slate-400">
                  {index + 1}
                </span>

                {editingIndex === index ? (
                  <>
                    <Input
                      autoFocus
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(index);
                        if (e.key === "Escape") setEditingIndex(null);
                      }}
                      className="min-w-0 flex-1"
                    />
                    <div className="flex shrink-0 gap-2">
                      <Button size="sm" variant="primary" onClick={() => handleSaveEdit(index)}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingIndex(null)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="min-w-0 flex-1 truncate text-[13.5px] text-slate-800">{item}</p>

                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        aria-label="Move up"
                        disabled={index === 0}
                        onClick={() => void moveAnnouncement(index, "up")}
                      >
                        ↑
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        aria-label="Move down"
                        disabled={index === announcements.length - 1}
                        onClick={() => void moveAnnouncement(index, "down")}
                      >
                        ↓
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setEditingIndex(index);
                          setEditingText(item);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          if (window.confirm("Remove this headline from the ticker?")) {
                            void deleteAnnouncement(index);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
