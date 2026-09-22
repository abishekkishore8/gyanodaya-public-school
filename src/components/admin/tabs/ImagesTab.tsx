"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";

import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import { Card, CardHeader } from "@/components/admin/ui/Card";
import EmptyState from "@/components/admin/ui/EmptyState";
import { Field, Input } from "@/components/admin/ui/Field";
import Modal from "@/components/admin/ui/Modal";
import PageHeader from "@/components/admin/ui/PageHeader";
import { NEW_GALLERY_UPLOAD_KEY, useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/context/ToastContext";
import type { ImageAssetItem, ImageCollectionKey } from "@/types/site";

interface ImageGroup {
  key: ImageCollectionKey;
  label: string;
  description: string;
  /** Aspect ratio the photo is displayed at on the public site. */
  ratio: string;
}

const IMAGE_GROUPS: ImageGroup[] = [
  {
    key: "gallery",
    label: "Gallery",
    description: "Student life grid. Photos can be added and removed here.",
    ratio: "aspect-4/3",
  },
  {
    key: "misc",
    label: "Other",
    description: "Supporting images such as the about-section campus shot.",
    ratio: "aspect-4/3",
  },
];

type GroupFilter = ImageCollectionKey | "all";

interface TileAsset {
  asset: ImageAssetItem;
  collection: ImageCollectionKey;
  group: ImageGroup;
}

/** A single thumbnail with hover actions. */
function ImageTile({
  entry,
  uploading,
  onOpen,
}: {
  entry: TileAsset;
  uploading: boolean;
  onOpen: () => void;
}) {
  const { asset, group } = entry;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-xs transition hover:border-[#14452f]/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14452f] cursor-pointer"
    >
      <div className={`relative w-full overflow-hidden bg-slate-100 ${group.ratio}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote assets, sized by CSS */}
        <img
          src={asset.url}
          alt={asset.alt}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        {uploading && (
          <div className="absolute inset-0 grid place-items-center bg-white/80 text-[12px] font-semibold text-slate-700">
            Uploading…
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-slate-900/0 transition group-hover:bg-slate-900/35" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-2.5 text-center text-[12px] font-semibold text-white transition group-hover:translate-y-0">
          Edit image
        </span>
      </div>

      <div className="p-3">
        <p className="truncate text-[12.5px] font-semibold text-slate-900">{asset.label}</p>
        <p className="mt-0.5 truncate text-[11.5px] text-slate-500">{asset.alt || "No alt text"}</p>
      </div>
    </button>
  );
}

/** Detail editor: preview, metadata, replace and delete. */
function ImageDetailModal({ entry, onClose }: { entry: TileAsset; onClose: () => void }) {
  const { asset, collection, group } = entry;
  const { imageUploadState, updateImageAsset, uploadImageAsset, deleteGalleryImage } = useAdmin();

  const [altDraft, setAltDraft] = useState(asset.alt);
  const [labelDraft, setLabelDraft] = useState(asset.label);
  const fileRef = useRef<HTMLInputElement>(null);

  // Re-sync when a replacement upload changes the saved asset underneath us.
  useEffect(() => setAltDraft(asset.alt), [asset.alt]);
  useEffect(() => setLabelDraft(asset.label), [asset.label]);

  const uploading = Boolean(imageUploadState[asset.id]);
  const changed = altDraft.trim() !== asset.alt || labelDraft.trim() !== asset.label;

  const save = async () => {
    await updateImageAsset(collection, asset.id, {
      alt: altDraft.trim() || asset.alt,
      label: labelDraft.trim() || asset.label,
    });
    onClose();
  };

  return (
    <Modal
      title={asset.label}
      description={`${group.label} · ${asset.id}`}
      onClose={onClose}
      footer={
        <>
          {collection === "gallery" && (
            <Button
              variant="danger"
              className="mr-auto"
              onClick={async () => {
                if (!window.confirm("Remove this photo from the gallery?")) return;
                await deleteGalleryImage(asset.id);
                onClose();
              }}
            >
              Delete photo
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={!changed} onClick={() => void save()}>
            Save changes
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className={`relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 ${group.ratio}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote asset */}
          <img src={asset.url} alt={asset.alt} className="h-full w-full object-cover" />
          {uploading && (
            <div className="absolute inset-0 grid place-items-center bg-white/80 text-[13px] font-semibold text-slate-700">
              Uploading…
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? "Uploading…" : "Replace image"}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void uploadImageAsset(collection, asset.id, file);
              e.currentTarget.value = "";
            }}
          />
          <a
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline"
          >
            Open original ↗
          </a>
        </div>

        <Field label="Alt text" hint="Describes the photo for screen readers and search engines.">
          <Input value={altDraft} onChange={(e) => setAltDraft(e.target.value)} />
        </Field>

        {collection === "gallery" && (
          <Field label="Caption" hint="Shown under the photo in the public gallery.">
            <Input value={labelDraft} onChange={(e) => setLabelDraft(e.target.value)} />
          </Field>
        )}
      </div>
    </Modal>
  );
}

/** Visual media library for every photograph on the public site. */
export default function ImagesTab() {
  const { imageAssets } = useSiteContent();
  const { imageUploadState, addGalleryImage } = useAdmin();
  const { showToast } = useToast();

  const [filter, setFilter] = useState<GroupFilter>("all");
  const [selected, setSelected] = useState<TileAsset | null>(null);
  const [dragging, setDragging] = useState(false);

  const isAddingGalleryPhoto = Boolean(imageUploadState[NEW_GALLERY_UPLOAD_KEY]);

  /** Flatten every collection into one list so "All" can show them together. */
  const allEntries = useMemo<TileAsset[]>(
    () =>
      IMAGE_GROUPS.flatMap((group) =>
        imageAssets[group.key].map((asset) => ({ asset, collection: group.key, group })),
      ),
    [imageAssets],
  );

  const visible = filter === "all" ? allEntries : allEntries.filter((entry) => entry.collection === filter);

  // Keep the open modal pointed at the latest saved version of its asset.
  const selectedEntry = selected
    ? allEntries.find((entry) => entry.asset.id === selected.asset.id) ?? null
    : null;

  const acceptDroppedFiles = (files: FileList | null) => {
    const images = Array.from(files || []).filter((file) => file.type.startsWith("image/"));

    if (images.length === 0) {
      showToast("⚠️ Only image files can be added to the gallery.");
      return;
    }

    images.forEach((file) => void addGalleryImage(file));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    acceptDroppedFiles(event.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media library"
        description="Every photograph used on the public website. Uploads are stored in Cloudflare R2."
        actions={
          <label
            className={`inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-[#14452f] px-4 text-sm font-semibold text-white transition hover:bg-[#1b5c3e] ${
              isAddingGalleryPhoto ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {isAddingGalleryPhoto ? "Uploading…" : "Add gallery photos"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={isAddingGalleryPhoto}
              onChange={(e) => {
                acceptDroppedFiles(e.target.files);
                e.currentTarget.value = "";
              }}
            />
          </label>
        }
      />

      {/* Group filter */}
      <div className="flex flex-wrap gap-1.5">
        {([{ key: "all", label: "All" }, ...IMAGE_GROUPS] as { key: GroupFilter; label: string }[]).map(
          (group) => {
            const active = group.key === filter;
            const count =
              group.key === "all" ? allEntries.length : imageAssets[group.key as ImageCollectionKey].length;

            if (group.key !== "all" && count === 0) return null;

            return (
              <button
                key={group.key}
                onClick={() => setFilter(group.key)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition cursor-pointer ${
                  active
                    ? "border-[#14452f] bg-[#14452f] text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {group.label}
                <span className={active ? "text-white/70" : "text-slate-400"}>{count}</span>
              </button>
            );
          },
        )}
      </div>

      <Card>
        <CardHeader
          title={filter === "all" ? "All images" : IMAGE_GROUPS.find((g) => g.key === filter)!.label}
          description={
            filter === "all"
              ? "Select any image to edit its details or replace the file."
              : IMAGE_GROUPS.find((g) => g.key === filter)!.description
          }
          badge={<Badge tone="brand">{visible.length}</Badge>}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative p-5 transition ${dragging ? "bg-[#f0faf5]" : ""}`}
        >
          {dragging && (
            <div className="pointer-events-none absolute inset-3 z-10 grid place-items-center rounded-xl border-2 border-dashed border-[#14452f] bg-white/85">
              <p className="text-[13px] font-semibold text-[#14452f]">Drop to add to the gallery</p>
            </div>
          )}

          {visible.length === 0 ? (
            <EmptyState icon="🖼️" title="No images in this group" />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((entry) => (
                <ImageTile
                  key={entry.asset.id}
                  entry={entry}
                  uploading={Boolean(imageUploadState[entry.asset.id])}
                  onOpen={() => setSelected(entry)}
                />
              ))}
            </div>
          )}

          <p className="mt-4 text-center text-[12px] text-slate-400">
            Drag image files anywhere here to add them to the gallery.
          </p>
        </div>
      </Card>

      {selectedEntry && <ImageDetailModal entry={selectedEntry} onClose={() => setSelected(null)} />}
    </div>
  );
}
