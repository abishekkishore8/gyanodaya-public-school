"use client";

import { useEffect, useState } from "react";

import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import PhotoPicker from "@/components/admin/ui/PhotoPicker";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { AboutContent, AboutMessageItem, AboutPointItem, FacultyMemberItem } from "@/types/site";

/** Id for a row added in the panel; unique enough for a single document. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Paragraphs are edited as one textarea, split on blank lines. */
function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}


/** Editor for a list of titled points: commitments, rules, responsibilities. */
function PointRows({
  rows,
  onChange,
  idPrefix,
  addLabel,
}: {
  rows: AboutPointItem[];
  onChange: (rows: AboutPointItem[]) => void;
  idPrefix: string;
  addLabel: string;
}) {
  const update = (id: string, patch: Partial<AboutPointItem>) =>
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {rows.map((row, index) => (
        <div key={row.id} className="rounded-lg border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold text-slate-400">#{index + 1}</span>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" aria-label="Move up" disabled={index === 0} onClick={() => move(index, -1)}>
                ↑
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label="Move down"
                disabled={index === rows.length - 1}
                onClick={() => move(index, 1)}
              >
                ↓
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onChange(rows.filter((item) => item.id !== row.id))}
              >
                Remove
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Field label="Title">
              <Input value={row.title} onChange={(e) => update(row.id, { title: e.target.value })} />
            </Field>
            <Field label="Description">
              <Textarea rows={2} value={row.text} onChange={(e) => update(row.id, { text: e.target.value })} />
            </Field>
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onChange([...rows, { id: newId(idPrefix), title: "", text: "" }])}
      >
        + {addLabel}
      </Button>
    </div>
  );
}

/** Editor for one leadership message. */
function MessageEditor({
  message,
  onChange,
  onRemove,
}: {
  message: AboutMessageItem;
  onChange: (message: AboutMessageItem) => void;
  onRemove: () => void;
}) {
  const [bodyDraft, setBodyDraft] = useState(message.body.join("\n\n"));

  // Follow the saved message when it is reloaded from the API.
  useEffect(() => setBodyDraft(message.body.join("\n\n")), [message.body]);

  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[13.5px] font-semibold text-slate-800">{message.title || "Untitled message"}</h3>
        <Button size="sm" variant="danger" onClick={onRemove}>
          Remove
        </Button>
      </div>

      <PhotoPicker
        url={message.imageUrl}
        uploadKey={`message-${message.id}`}
        onChange={(imageUrl) => onChange({ ...message, imageUrl })}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Field label="Heading" className="sm:flex-1" required>
          <Input
            value={message.title}
            onChange={(e) => onChange({ ...message, title: e.target.value })}
            placeholder="Principal's Message"
          />
        </Field>
        <Field label="Name" className="sm:flex-1">
          <Input value={message.name} onChange={(e) => onChange({ ...message, name: e.target.value })} />
        </Field>
        <Field label="Designation" className="sm:flex-1">
          <Input
            value={message.designation}
            onChange={(e) => onChange({ ...message, designation: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Pull quote" hint="Optional. Shown in italics above the message.">
        <Input value={message.quote} onChange={(e) => onChange({ ...message, quote: e.target.value })} />
      </Field>

      <Field label="Card summary" hint="The short version shown on the home-page card.">
        <Textarea
          rows={2}
          value={message.excerpt}
          onChange={(e) => onChange({ ...message, excerpt: e.target.value })}
        />
      </Field>

      <Field label="Full message" hint="Leave a blank line between paragraphs.">
        <Textarea
          rows={8}
          value={bodyDraft}
          onChange={(e) => {
            setBodyDraft(e.target.value);
            onChange({ ...message, body: toParagraphs(e.target.value) });
          }}
        />
      </Field>
    </div>
  );
}

/** Editor for one faculty member. */
function FacultyEditor({
  member,
  onChange,
  onRemove,
}: {
  member: FacultyMemberItem;
  onChange: (member: FacultyMemberItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[13.5px] font-semibold text-slate-800">
          {member.name || member.designation || "New faculty member"}
        </h3>
        <Button size="sm" variant="danger" onClick={onRemove}>
          Remove
        </Button>
      </div>

      <PhotoPicker
        url={member.imageUrl}
        uploadKey={`faculty-${member.id}`}
        onChange={(imageUrl) => onChange({ ...member, imageUrl })}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Field label="Name" className="sm:flex-1">
          <Input value={member.name} onChange={(e) => onChange({ ...member, name: e.target.value })} />
        </Field>
        <Field label="Designation" className="sm:flex-1">
          <Input
            value={member.designation}
            onChange={(e) => onChange({ ...member, designation: e.target.value })}
          />
        </Field>
        <Field label="Qualification" className="sm:flex-1">
          <Input
            value={member.qualification}
            onChange={(e) => onChange({ ...member, qualification: e.target.value })}
            placeholder="M.Sc., B.Ed."
          />
        </Field>
      </div>

      <Field label="Description">
        <Textarea
          rows={2}
          value={member.description}
          onChange={(e) => onChange({ ...member, description: e.target.value })}
        />
      </Field>
    </div>
  );
}

/**
 * Editor for the About Us page.
 *
 * The whole page is edited as one draft and saved in a single write, so a
 * half-finished section is never published. The leadership messages here are
 * the same ones the home page shows as cards.
 */
export default function AboutTab() {
  const { about } = useSiteContent();
  const { saveAbout } = useAdmin();

  const [draft, setDraft] = useState<AboutContent>(about);
  const [saving, setSaving] = useState(false);

  // Follow the saved document, including a reload from the API.
  useEffect(() => setDraft(about), [about]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(about);

  const patch = (updates: Partial<AboutContent>) => setDraft((prev) => ({ ...prev, ...updates }));

  const handleSave = async () => {
    setSaving(true);
    await saveAbout(draft);
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="About us"
        description="Mission and vision, leadership messages, faculty, rules and the parent-teacher relationship."
        actions={
          <a href="/about" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              View page ↗
            </Button>
          </a>
        }
      />

      <Card>
        <CardHeader title="Mission & vision" description="The two statements at the top of the page." />
        <CardBody className="space-y-4">
          <Field label="Our vision">
            <Textarea rows={3} value={draft.vision} onChange={(e) => patch({ vision: e.target.value })} />
          </Field>
          <Field label="Our mission">
            <Textarea rows={3} value={draft.mission} onChange={(e) => patch({ mission: e.target.value })} />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Commitments" description="The cards shown under the mission and vision." />
        <CardBody>
          <PointRows
            rows={draft.missionPoints}
            onChange={(missionPoints) => patch({ missionPoints })}
            idPrefix="point"
            addLabel="Add commitment"
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Leadership messages"
          description="Shown in full on this page and as cards on the home page, in this order."
        />
        <CardBody className="space-y-4">
          {draft.messages.map((message) => (
            <MessageEditor
              key={message.id}
              message={message}
              onChange={(next) =>
                patch({ messages: draft.messages.map((item) => (item.id === next.id ? next : item)) })
              }
              onRemove={() => patch({ messages: draft.messages.filter((item) => item.id !== message.id) })}
            />
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              patch({
                messages: [
                  ...draft.messages,
                  {
                    id: newId("message"),
                    title: "",
                    name: "",
                    designation: "",
                    imageUrl: "",
                    quote: "",
                    excerpt: "",
                    body: [],
                  },
                ],
              })
            }
          >
            + Add message
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Faculty" description="Photographs and descriptions of the teaching staff." />
        <CardBody className="space-y-4">
          <Field label="Introduction">
            <Textarea
              rows={2}
              value={draft.facultyIntro}
              onChange={(e) => patch({ facultyIntro: e.target.value })}
            />
          </Field>

          {draft.faculty.map((member) => (
            <FacultyEditor
              key={member.id}
              member={member}
              onChange={(next) =>
                patch({ faculty: draft.faculty.map((item) => (item.id === next.id ? next : item)) })
              }
              onRemove={() => patch({ faculty: draft.faculty.filter((item) => item.id !== member.id) })}
            />
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              patch({
                faculty: [
                  ...draft.faculty,
                  {
                    id: newId("faculty"),
                    name: "",
                    designation: "",
                    qualification: "",
                    description: "",
                    imageUrl: "",
                  },
                ],
              })
            }
          >
            + Add faculty member
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Rules & regulations" description="Numbered on the page in this order." />
        <CardBody className="space-y-4">
          <Field label="Introduction">
            <Textarea rows={2} value={draft.rulesIntro} onChange={(e) => patch({ rulesIntro: e.target.value })} />
          </Field>
          <PointRows
            rows={draft.rules}
            onChange={(rules) => patch({ rules })}
            idPrefix="rule"
            addLabel="Add rule"
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Parent-teacher relation" description="How the school and parents work together." />
        <CardBody className="space-y-4">
          <Field label="Introduction">
            <Textarea
              rows={2}
              value={draft.parentTeacherIntro}
              onChange={(e) => patch({ parentTeacherIntro: e.target.value })}
            />
          </Field>
          <PointRows
            rows={draft.parentTeacher}
            onChange={(parentTeacher) => patch({ parentTeacher })}
            idPrefix="ptr"
            addLabel="Add point"
          />
        </CardBody>
      </Card>

      {/* Save bar — stays in reach however far down the page you are. */}
      <div className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12.5px] text-slate-500">
            {dirty ? "You have unsaved changes." : "Everything is saved."}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!dirty || saving} onClick={() => setDraft(about)}>
              Discard
            </Button>
            <Button variant="primary" size="sm" disabled={!dirty || saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save About page"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
