"use client";

import { useRef, type ChangeEvent } from "react";

import Button from "@/components/admin/ui/Button";
import { Field, Input } from "@/components/admin/ui/Field";
import { useAdmin } from "@/context/AdminContext";

interface PhotoPickerProps {
  url: string;
  /** Unique per control — tracks this upload's spinner. */
  uploadKey: string;
  onChange: (url: string) => void;
  /** Preview shape; portraits are taller than they are wide. */
  shape?: "portrait" | "landscape";
  /** Offers a button that clears the photo. */
  clearable?: boolean;
  hint?: string;
}

/**
 * Photo preview with upload, used wherever a record carries its own picture
 * (leadership, faculty, uniforms, facility and activity cards). Uploads go to
 * the same storage as the media library; the URL field accepts a remote image.
 */
export default function PhotoPicker({
  url,
  uploadKey,
  onChange,
  shape = "portrait",
  clearable = false,
  hint,
}: PhotoPickerProps) {
  const { imageUploadState, uploadPhoto } = useAdmin();
  const fileRef = useRef<HTMLInputElement>(null);
  const uploading = Boolean(imageUploadState[uploadKey]);

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const uploaded = await uploadPhoto(uploadKey, file);
    if (uploaded) onChange(uploaded);
  };

  return (
    <div className="flex items-start gap-3">
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 ${
          shape === "portrait" ? "h-24 w-20" : "h-20 w-28"
        }`}
      >
        {url ? (
          /* eslint-disable-next-line @next/next/no-img-element -- remote asset, sized by CSS */
          <img src={url} alt="" className="h-full w-full object-cover object-top" />
        ) : (
          <span className="grid h-full place-items-center px-1 text-center text-[11px] text-slate-400">
            No photo
          </span>
        )}
        {uploading && (
          <div className="absolute inset-0 grid place-items-center bg-white/80 text-[11px] font-semibold text-slate-700">
            Uploading…
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {url ? "Replace photo" : "Upload photo"}
          </Button>
          {clearable && url && (
            <Button size="sm" variant="ghost" onClick={() => onChange("")}>
              Remove photo
            </Button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => void handleFile(e)} />
        <Field label="Photo URL" hint={hint}>
          <Input value={url} onChange={(e) => onChange(e.target.value)} placeholder="https://…" />
        </Field>
      </div>
    </div>
  );
}
