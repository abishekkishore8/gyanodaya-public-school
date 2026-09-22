"use client";

import { useRef, useState, type ChangeEvent } from "react";

import Button from "@/components/admin/ui/Button";
import { Field, Input } from "@/components/admin/ui/Field";
import { useToast } from "@/context/ToastContext";
import { uploadDocument } from "@/lib/api";

/** File types offered in the picker; the server enforces the same list. */
const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*";

/** Human-readable size, e.g. "1.2 MB". */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface FilePickerProps {
  url: string;
  /** Called with the new URL, and the uploaded file's details when it came from an upload. */
  onChange: (url: string, file?: { name: string; size: string }) => void;
  label?: string;
  hint?: string;
}

/**
 * Attachment control: upload a document to storage, or paste a link to one
 * hosted elsewhere (Google Drive, the CBSE portal, …). Both end up as a URL.
 */
export default function FilePicker({ url, onChange, label = "Link", hint }: FilePickerProps) {
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await uploadDocument(file);
      onChange(uploaded.url, { name: file.name, size: formatFileSize(file.size) });
      showToast(`📎 ${file.name} uploaded.`);
    } catch (error) {
      showToast(error instanceof Error ? `⚠️ ${error.message}` : "⚠️ File upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-w-0 space-y-2">
      <Field label={label} hint={hint}>
        <Input
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste a link, or upload a file"
          disabled={uploading}
        />
      </Field>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="secondary" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? "Uploading…" : url ? "Replace with file" : "Upload file"}
        </Button>
        {url && !uploading && (
          <>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#14452f] hover:underline"
            >
              Open ↗
            </a>
            <Button size="sm" variant="ghost" onClick={() => onChange("")}>
              Remove
            </Button>
          </>
        )}
      </div>
      <input ref={fileRef} type="file" accept={ACCEPT} hidden onChange={(e) => void handleFile(e)} />
    </div>
  );
}
