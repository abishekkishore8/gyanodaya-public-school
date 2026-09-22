"use client";

import { useEffect, useState } from "react";

import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/context/ToastContext";

/** Site-wide settings, plus backup and factory reset. */
export default function SettingsTab() {
  const {
    academicSession,
    parentsLoginUrl,
    announcements,
    noticeCategories,
    recruitmentPositions,
    imageAssets,
    disclosure,
    contact,
  } = useSiteContent();
  const { showToast } = useToast();
  const { saveAcademicSession, saveParentsLoginUrl, saveContact, resetToDefaults } = useAdmin();

  const [sessionDraft, setSessionDraft] = useState(academicSession);
  const [loginUrlDraft, setLoginUrlDraft] = useState(parentsLoginUrl);
  const [contactDraft, setContactDraft] = useState(contact);

  // Keep drafts in step with values saved elsewhere (or reloaded from the API).
  useEffect(() => setSessionDraft(academicSession), [academicSession]);
  useEffect(() => setLoginUrlDraft(parentsLoginUrl), [parentsLoginUrl]);
  useEffect(() => setContactDraft(contact), [contact]);

  const sessionChanged = sessionDraft.trim() !== academicSession;
  const loginUrlChanged = loginUrlDraft.trim() !== parentsLoginUrl;
  const contactChanged = JSON.stringify(contactDraft) !== JSON.stringify(contact);

  const downloadBackup = () => {
    const backup = {
      academicSession,
      parentsLoginUrl,
      announcements,
      noticeCategories,
      recruitmentPositions,
      imageAssets,
      disclosure,
      contact,
      exportedAt: new Date().toISOString(),
    };

    const url = URL.createObjectURL(
      new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `gps-bagodar-backup-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    showToast("💾 Backup downloaded.");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Site settings" description="School-wide values used across the public website." />

      <Card>
        <CardHeader
          title="Academic session"
          description="Shown on the admissions banner and prefilled on the online admission form."
        />
        <CardBody>
          <Field label="Session" required className="max-w-xs" hint="For example 2025–26.">
            <Input value={sessionDraft} onChange={(e) => setSessionDraft(e.target.value)} />
          </Field>
        </CardBody>
        <CardFooter>
          <span className="text-[12.5px] text-slate-500">
            Currently <strong className="font-semibold text-slate-700">{academicSession}</strong>
          </span>
          <Button
            variant="primary"
            size="sm"
            disabled={!sessionChanged}
            onClick={() => void saveAcademicSession(sessionDraft)}
          >
            Save session
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader
          title="Parents login link"
          description="Where the “Parents Login” buttons across the site point."
        />
        <CardBody>
          <Field label="Destination URL" required hint="Must be a full URL, including https://">
            <Input
              type="url"
              value={loginUrlDraft}
              onChange={(e) => setLoginUrlDraft(e.target.value)}
              placeholder="https://play.google.com/store/apps/details?id=…"
            />
          </Field>
        </CardBody>
        <CardFooter>
          <a
            href={parentsLoginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-[12.5px] text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline"
          >
            Test current link ↗
          </a>
          <Button
            variant="primary"
            size="sm"
            disabled={!loginUrlChanged}
            onClick={() => void saveParentsLoginUrl(loginUrlDraft)}
          >
            Save link
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader
          title="Contact details"
          description="Used by the top bar, the footer and the contact page."
        />
        <CardBody className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Field label="Phone" className="sm:flex-1" required>
              <Input
                value={contactDraft.phone}
                onChange={(e) => setContactDraft({ ...contactDraft, phone: e.target.value })}
              />
            </Field>
            <Field label="Alternate phone" className="sm:flex-1">
              <Input
                value={contactDraft.altPhone}
                onChange={(e) => setContactDraft({ ...contactDraft, altPhone: e.target.value })}
              />
            </Field>
            <Field label="Email" className="sm:flex-1" required>
              <Input
                type="email"
                value={contactDraft.email}
                onChange={(e) => setContactDraft({ ...contactDraft, email: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Address">
            <Textarea
              rows={2}
              value={contactDraft.address}
              onChange={(e) => setContactDraft({ ...contactDraft, address: e.target.value })}
            />
          </Field>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Field label="Office hours" className="sm:flex-1">
              <Input
                value={contactDraft.officeHours}
                onChange={(e) => setContactDraft({ ...contactDraft, officeHours: e.target.value })}
              />
            </Field>
            <Field label="Map embed URL" className="sm:flex-1" hint="Google Maps → Share → Embed a map.">
              <Input
                value={contactDraft.mapEmbedUrl}
                onChange={(e) => setContactDraft({ ...contactDraft, mapEmbedUrl: e.target.value })}
              />
            </Field>
          </div>
        </CardBody>
        <CardFooter>
          <span className="text-[12.5px] text-slate-500">Shown wherever the school is contacted.</span>
          <Button
            variant="primary"
            size="sm"
            disabled={!contactChanged}
            onClick={() => void saveContact(contactDraft)}
          >
            Save contact details
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader
          title="Backup"
          description="Download a snapshot of the ticker, notices, vacancies, image references and mandatory disclosure."
        />
        <CardBody>
          <Button variant="secondary" onClick={downloadBackup}>
            Download JSON backup
          </Button>
        </CardBody>
      </Card>

      <Card className="border-red-200">
        <CardHeader
          title="Danger zone"
          description="Restores the news ticker, notice board and vacancies to their factory defaults. Images, settings and form submissions are not affected."
        />
        <CardBody>
          <Button variant="danger" onClick={() => void resetToDefaults()}>
            Reset content to defaults
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
