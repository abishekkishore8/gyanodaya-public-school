"use client";

import { useState, type FormEvent } from "react";

import Button from "@/components/admin/ui/Button";
import { Field, Input, Textarea } from "@/components/admin/ui/Field";
import Modal from "@/components/admin/ui/Modal";
import { useAdmin, type JobEditorTarget } from "@/context/AdminContext";
import type { JobPosition } from "@/types/site";

const BLANK_VACANCY: JobPosition = {
  id: "",
  title: "",
  dept: "Senior Secondary (Classes XI & XII)",
  type: "Full Time · Permanent",
  vacancies: "1 Position",
  experience: "2+ Years CBSE Experience",
  qualification: "M.Sc / M.A + B.Ed",
  payScale: "CBSE 7th Pay Matrix + EPF + Staff Bus",
  deadline: "30 April 2025",
  location: "Bagodar Campus, Giridih",
  highlights: ["Staff Transport", "EPF Benefits", "Child Fee Subsidy"],
  description: "",
};

/**
 * Mounts the editor only while a target is open, so its form state is seeded
 * fresh from that vacancy every time it is opened.
 */
export default function JobEditorModal() {
  const { jobEditor } = useAdmin();

  if (!jobEditor) return null;
  return <JobEditorForm target={jobEditor} />;
}

/** Add or edit a recruitment vacancy. */
function JobEditorForm({ target }: { target: JobEditorTarget }) {
  const { closeJobEditor, saveJobPosition } = useAdmin();

  const editingJobId = target.job?.id ?? null;
  const [form, setForm] = useState<JobPosition>(
    () => target.job ?? { ...BLANK_VACANCY, id: `job-${Date.now()}` },
  );

  const update = <K extends keyof JobPosition>(key: K, value: JobPosition[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    void saveJobPosition(editingJobId, form);
    closeJobEditor();
  };

  return (
    <Modal
      title={editingJobId ? "Edit vacancy" : "Add vacancy"}
      description="Shown on the careers and recruitment desk."
      onClose={closeJobEditor}
      footer={
        <>
          <Button type="button" variant="ghost" onClick={closeJobEditor}>
            Cancel
          </Button>
          <Button type="submit" form="job-editor" variant="primary" disabled={!form.title.trim()}>
            {editingJobId ? "Save changes" : "Publish vacancy"}
          </Button>
        </>
      }
    >
      <form id="job-editor" onSubmit={handleSubmit} className="space-y-4">
        <Field label="Position title" required>
          <Input
            autoFocus
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="PGT – Physics & Mathematics"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Department / wing">
            <Input value={form.dept} onChange={(e) => update("dept", e.target.value)} />
          </Field>

          <Field label="Employment type">
            <Input value={form.type} onChange={(e) => update("type", e.target.value)} />
          </Field>

          <Field label="Vacancies">
            <Input value={form.vacancies} onChange={(e) => update("vacancies", e.target.value)} />
          </Field>

          <Field label="Application deadline">
            <Input value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
          </Field>

          <Field label="Experience required">
            <Input value={form.experience} onChange={(e) => update("experience", e.target.value)} />
          </Field>

          <Field label="Qualification">
            <Input value={form.qualification} onChange={(e) => update("qualification", e.target.value)} />
          </Field>
        </div>

        <Field label="Pay scale">
          <Input value={form.payScale} onChange={(e) => update("payScale", e.target.value)} />
        </Field>

        <Field label="Location">
          <Input value={form.location} onChange={(e) => update("location", e.target.value)} />
        </Field>

        <Field label="Highlights" hint="Separate each benefit with a comma.">
          <Input
            value={form.highlights.join(", ")}
            onChange={(e) =>
              update(
                "highlights",
                e.target.value
                  .split(",")
                  .map((entry) => entry.trim())
                  .filter(Boolean),
              )
            }
            placeholder="Staff transport, EPF benefits, Child fee subsidy"
          />
        </Field>

        <Field label="Description">
          <Textarea
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What the school is looking for in this role."
          />
        </Field>
      </form>
    </Modal>
  );
}
