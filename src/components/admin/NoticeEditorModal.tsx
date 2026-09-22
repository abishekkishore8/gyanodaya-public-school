"use client";

import { useState, type FormEvent } from "react";

import Modal from "@/components/admin/ui/Modal";
import Button from "@/components/admin/ui/Button";
import FilePicker from "@/components/admin/ui/FilePicker";
import { Field, Input, Select, Textarea } from "@/components/admin/ui/Field";
import { useAdmin, type NoticeEditorTarget } from "@/context/AdminContext";
import type { NoticeCategoryId } from "@/types/site";

/** Default tag text offered when adding a notice to a category. */
const DEFAULT_TAG_BY_CATEGORY: Record<NoticeCategoryId, string> = {
  notices: "URGENT",
  announcements: "ADMISSIONS",
  recruitment: "OPENINGS",
};

const CATEGORY_LABELS: Record<NoticeCategoryId, string> = {
  notices: "Official circulars",
  announcements: "Announcements",
  recruitment: "Recruitment",
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/**
 * Mounts the editor only while a target is open, so its form state is seeded
 * fresh from that target every time it is opened.
 */
export default function NoticeEditorModal() {
  const { noticeEditor } = useAdmin();

  if (!noticeEditor) return null;
  return <NoticeEditorForm target={noticeEditor} />;
}

/** Add or edit a single notice board item. */
function NoticeEditorForm({ target }: { target: NoticeEditorTarget }) {
  const { closeNoticeEditor, saveNotice } = useAdmin();

  const editingNotice = target.notice;
  const [categoryKey, setCategoryKey] = useState<NoticeCategoryId>(target.categoryKey);
  const [form, setForm] = useState(() => ({
    title: editingNotice?.title ?? "",
    date: editingNotice?.date ?? "15 Mar 2025",
    day: editingNotice?.day ?? "15",
    month: editingNotice?.month ?? "MAR",
    tag: editingNotice?.tag ?? DEFAULT_TAG_BY_CATEGORY[target.categoryKey],
    desc: editingNotice?.desc ?? "",
    fileUrl: editingNotice?.fileUrl ?? "",
    fileSize: editingNotice?.fileSize ?? "",
  }));

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    void saveNotice(categoryKey, editingNotice?.id ?? null, form);
    closeNoticeEditor();
  };

  return (
    <Modal
      title={editingNotice ? "Edit notice" : "Add notice"}
      description={`Published to ${CATEGORY_LABELS[categoryKey]} on the school bulletin board.`}
      onClose={closeNoticeEditor}
      footer={
        <>
          <Button type="button" variant="ghost" onClick={closeNoticeEditor}>
            Cancel
          </Button>
          <Button type="submit" form="notice-editor" variant="primary" disabled={!form.title.trim()}>
            {editingNotice ? "Save changes" : "Publish notice"}
          </Button>
        </>
      }
    >
      <form id="notice-editor" onSubmit={handleSubmit} className="space-y-4">
        <Field label="Category" required>
          <Select value={categoryKey} onChange={(e) => setCategoryKey(e.target.value as NoticeCategoryId)}>
            {(Object.keys(CATEGORY_LABELS) as NoticeCategoryId[]).map((id) => (
              <option key={id} value={id}>
                {CATEGORY_LABELS[id]}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Headline" required>
          <Input
            autoFocus
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="CBSE Class X & XII Board Exam: Admit card protocols"
          />
        </Field>

        <Field label="Summary" hint="One or two sentences shown under the headline.">
          <Textarea
            rows={3}
            value={form.desc}
            onChange={(e) => update("desc", e.target.value)}
            placeholder="Admit cards are available at the Principal's office. Reporting at 9:30 AM in full uniform."
          />
        </Field>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field label="Day" required hint="Calendar chip.">
            <Input
              inputMode="numeric"
              maxLength={2}
              value={form.day}
              onChange={(e) => update("day", e.target.value)}
            />
          </Field>

          <Field label="Month" required>
            <Select value={form.month} onChange={(e) => update("month", e.target.value)}>
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Full date" required className="col-span-2 sm:col-span-1">
            <Input
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              placeholder="15 Mar 2025"
            />
          </Field>
        </div>

        <Field
          label="Tag"
          required
          hint="Short uppercase label, e.g. URGENT, EXAMS, TRANSPORT. Its colour is chosen automatically."
        >
          <Input
            value={form.tag}
            onChange={(e) => update("tag", e.target.value.toUpperCase())}
            placeholder="URGENT"
          />
        </Field>

        <FilePicker
          label="Attachment"
          url={form.fileUrl}
          onChange={(fileUrl, file) => setForm((prev) => ({ ...prev, fileUrl, fileSize: file?.size ?? "" }))}
          hint="Optional. Upload the circular (PDF, Word, image) or paste a link to it. Visitors get a download button."
        />
      </form>
    </Modal>
  );
}
