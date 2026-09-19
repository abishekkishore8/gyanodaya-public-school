"use client";

import { useEffect, useState } from "react";

import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input } from "@/components/admin/ui/Field";
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
  } = useSiteContent();
  const { showToast } = useToast();
  const { saveAcademicSession, saveParentsLoginUrl, resetToDefaults } = useAdmin();

  const [sessionDraft, setSessionDraft] = useState(academicSession);
  const [loginUrlDraft, setLoginUrlDraft] = useState(parentsLoginUrl);

  // Keep drafts in step with values saved elsewhere (or reloaded from the API).
  useEffect(() => setSessionDraft(academicSession), [academicSession]);
  useEffect(() => setLoginUrlDraft(parentsLoginUrl), [parentsLoginUrl]);

  const sessionChanged = sessionDraft.trim() !== academicSession;
  const loginUrlChanged = loginUrlDraft.trim() !== parentsLoginUrl;

  const downloadBackup = () => {
    const backup = {
      academicSession,
      parentsLoginUrl,
      announcements,
      noticeCategories,
      recruitmentPositions,
      imageAssets,
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
          title="Backup"
          description="Download a snapshot of the ticker, notices, vacancies and image references."
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
