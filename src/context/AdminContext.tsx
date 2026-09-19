import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { INITIAL_ANNOUNCEMENTS } from "@/data/announcements";
import { INITIAL_NOTICE_CATEGORIES } from "@/data/notices";
import { INITIAL_RECRUITMENT_POSITIONS } from "@/data/recruitment";
import { uploadImage } from "@/lib/api";
import { normalizeNoticeCategories } from "@/lib/notices";
import type {
  ImageAssetItem,
  ImageAssetsDocument,
  ImageCollectionKey,
  JobPosition,
  NoticeCategoryId,
  NoticeItemData,
} from "@/types/site";

import { useSiteContent } from "./SiteContentContext";
import { useToast } from "./ToastContext";


/** Key used in `imageUploadState` for the "add a gallery photo" control. */
export const NEW_GALLERY_UPLOAD_KEY = "galleryNew";

interface AdminValue {
  /** Per-asset upload flags, keyed by asset id (or `NEW_GALLERY_UPLOAD_KEY`). */
  imageUploadState: Record<string, boolean>;
  updateImageAsset: (collection: ImageCollectionKey, assetId: string, updates: Partial<ImageAssetItem>) => Promise<void>;
  uploadImageAsset: (collection: ImageCollectionKey, assetId: string, file: File) => Promise<void>;
  addGalleryImage: (file: File) => Promise<void>;
  deleteGalleryImage: (assetId: string) => Promise<void>;

  addAnnouncement: (text: string) => Promise<void>;
  updateAnnouncement: (index: number, text: string) => Promise<void>;
  deleteAnnouncement: (index: number) => Promise<void>;
  moveAnnouncement: (index: number, direction: "up" | "down") => Promise<void>;

  saveNotice: (categoryKey: NoticeCategoryId, noticeId: string | null, fields: NoticeDraft) => Promise<void>;
  deleteNotice: (categoryKey: NoticeCategoryId, noticeId: string) => Promise<void>;

  /** Open notice editor target, or `null` when the editor is closed. */
  noticeEditor: NoticeEditorTarget | null;
  /** Opens the notice editor; pass a notice to edit it, or omit it to add one. */
  openNoticeEditor: (categoryKey: NoticeCategoryId, notice?: NoticeItemData | null) => void;
  closeNoticeEditor: () => void;
  /** Notice category the dashboard's notices tab is focused on. */
  activeNoticeCategory: NoticeCategoryId;
  setActiveNoticeCategory: (categoryKey: NoticeCategoryId) => void;

  saveJobPosition: (jobId: string | null, job: JobPosition) => Promise<void>;
  deleteJobPosition: (jobId: string) => Promise<void>;

  /** Open job editor target, or `null` when the editor is closed. */
  jobEditor: JobEditorTarget | null;
  /** Opens the vacancy editor; pass a job to edit it, or omit it to add one. */
  openJobEditor: (job?: JobPosition | null) => void;
  closeJobEditor: () => void;

  saveParentsLoginUrl: (url: string) => Promise<void>;
  saveAcademicSession: (session: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

/** What the notice editor is currently editing. */
export interface NoticeEditorTarget {
  categoryKey: NoticeCategoryId;
  /** `null` when adding a new notice. */
  notice: NoticeItemData | null;
}

/** What the vacancy editor is currently editing. */
export interface JobEditorTarget {
  /** `null` when adding a new vacancy. */
  job: JobPosition | null;
}

/** Fields the notice editor collects; tag color is derived, not stored by the form. */
export interface NoticeDraft {
  title: string;
  date: string;
  day: string;
  month: string;
  tag: string;
  desc: string;
}

const AdminContext = createContext<AdminValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const {
    announcements,
    noticeCategories,
    recruitmentPositions,
    imageAssets,
    saveContent,
  } = useSiteContent();

  const [imageUploadState, setImageUploadState] = useState<Record<string, boolean>>({});
  const [noticeEditor, setNoticeEditor] = useState<NoticeEditorTarget | null>(null);
  const [jobEditor, setJobEditor] = useState<JobEditorTarget | null>(null);
  const [activeNoticeCategory, setActiveNoticeCategory] = useState<NoticeCategoryId>("notices");

  const openNoticeEditor = useCallback((categoryKey: NoticeCategoryId, notice: NoticeItemData | null = null) => {
    setNoticeEditor({ categoryKey, notice });
  }, []);
  const closeNoticeEditor = useCallback(() => setNoticeEditor(null), []);

  const openJobEditor = useCallback((job: JobPosition | null = null) => setJobEditor({ job }), []);
  const closeJobEditor = useCallback(() => setJobEditor(null), []);

  // ---------------------------------------------------------------- images --

  const updateImageAsset = useCallback(
    async (collection: ImageCollectionKey, assetId: string, updates: Partial<ImageAssetItem>) => {
      const nextAssets: ImageAssetsDocument = {
        ...imageAssets,
        [collection]: imageAssets[collection].map((asset) =>
          asset.id === assetId ? { ...asset, ...updates } : asset,
        ),
      };

      await saveContent(
        { imageAssets: nextAssets },
        {
          success: "🖼️ Image updated successfully.",
          failure: "⚠️ Image update failed because gps_school_website could not be updated.",
        },
      );
    },
    [imageAssets, saveContent],
  );

  const uploadImageAsset = useCallback(
    async (collection: ImageCollectionKey, assetId: string, file: File) => {
      setImageUploadState((prev) => ({ ...prev, [assetId]: true }));
      try {
        const uploaded = await uploadImage(file);
        await updateImageAsset(collection, assetId, { url: uploaded.url });
      } catch (error) {
        showToast(error instanceof Error ? `⚠️ ${error.message}` : "⚠️ Image upload failed.");
      } finally {
        setImageUploadState((prev) => ({ ...prev, [assetId]: false }));
      }
    },
    [showToast, updateImageAsset],
  );

  const addGalleryImage = useCallback(
    async (file: File) => {
      setImageUploadState((prev) => ({ ...prev, [NEW_GALLERY_UPLOAD_KEY]: true }));
      try {
        const uploaded = await uploadImage(file);
        const baseName = file.name.replace(/\.[^.]+$/, "");
        const nextGallery: ImageAssetItem[] = [
          {
            id: `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            section: "gallery",
            label: `Gallery - ${baseName || "New Photo"}`,
            url: uploaded.url,
            alt: baseName || "School gallery image",
          },
          ...imageAssets.gallery,
        ];

        await saveContent(
          { imageAssets: { ...imageAssets, gallery: nextGallery } },
          {
            success: "🖼️ New gallery photo added.",
            failure: "⚠️ Gallery upload failed because gps_school_website could not be updated.",
          },
        );
      } catch (error) {
        showToast(error instanceof Error ? `⚠️ ${error.message}` : "⚠️ Gallery upload failed.");
      } finally {
        setImageUploadState((prev) => ({ ...prev, [NEW_GALLERY_UPLOAD_KEY]: false }));
      }
    },
    [imageAssets, saveContent, showToast],
  );

  const deleteGalleryImage = useCallback(
    async (assetId: string) => {
      const nextGallery = imageAssets.gallery.filter((asset) => asset.id !== assetId);
      await saveContent(
        { imageAssets: { ...imageAssets, gallery: nextGallery } },
        {
          success: "🗑️ Gallery photo removed.",
          failure: "⚠️ Gallery deletion failed because gps_school_website could not be updated.",
        },
      );
    },
    [imageAssets, saveContent],
  );

  // --------------------------------------------------------- announcements --

  const addAnnouncement = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      await saveContent(
        { announcements: [trimmed, ...announcements] },
        {
          success: "📢 News ticker announcement added live!",
          failure: "⚠️ Announcement creation failed because gps_school_website could not be updated.",
        },
      );
    },
    [announcements, saveContent],
  );

  const updateAnnouncement = useCallback(
    async (index: number, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const updated = [...announcements];
      updated[index] = trimmed;
      await saveContent(
        { announcements: updated },
        {
          success: "✅ Announcement updated!",
          failure: "⚠️ Announcement update failed because gps_school_website could not be updated.",
        },
      );
    },
    [announcements, saveContent],
  );

  const deleteAnnouncement = useCallback(
    async (index: number) => {
      await saveContent(
        { announcements: announcements.filter((_, i) => i !== index) },
        {
          success: "🗑️ Announcement removed from ticker.",
          failure: "⚠️ Announcement deletion failed because gps_school_website could not be updated.",
        },
      );
    },
    [announcements, saveContent],
  );

  const moveAnnouncement = useCallback(
    async (index: number, direction: "up" | "down") => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= announcements.length) return;

      const updated = [...announcements];
      [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
      await saveContent(
        { announcements: updated },
        { failure: "⚠️ Announcement reorder failed because gps_school_website could not be updated." },
      );
    },
    [announcements, saveContent],
  );

  // ---------------------------------------------------------------- notices --

  const saveNotice = useCallback(
    async (categoryKey: NoticeCategoryId, noticeId: string | null, fields: NoticeDraft) => {
      const title = fields.title.trim();
      if (!title) return;

      const normalizedFields = {
        title,
        date: fields.date.trim(),
        day: fields.day.trim(),
        month: fields.month.trim().toUpperCase(),
        tag: fields.tag.trim().toUpperCase(),
        desc: fields.desc.trim(),
      };

      const updatedCategories = noticeCategories.map((category) => {
        if (category.id !== categoryKey) return category;

        if (noticeId) {
          return {
            ...category,
            items: category.items.map((item) => (item.id === noticeId ? { ...item, ...normalizedFields } : item)),
          };
        }

        return {
          ...category,
          items: [{ id: `notice-${Date.now()}`, tagColor: "", ...normalizedFields }, ...category.items],
        };
      });

      await saveContent(
        { noticeCategories: normalizeNoticeCategories(updatedCategories) },
        {
          success: noticeId ? "✅ Notice updated successfully!" : "📌 New notice added to Notice Board!",
          failure: "⚠️ Notice board update failed because gps_school_website could not be updated.",
        },
      );
    },
    [noticeCategories, saveContent],
  );

  const deleteNotice = useCallback(
    async (categoryKey: NoticeCategoryId, noticeId: string) => {
      const updatedCategories = noticeCategories.map((category) =>
        category.id === categoryKey
          ? { ...category, items: category.items.filter((item) => item.id !== noticeId) }
          : category,
      );

      await saveContent(
        { noticeCategories: updatedCategories },
        {
          success: "🗑️ Notice deleted from board.",
          failure: "⚠️ Notice deletion failed because gps_school_website could not be updated.",
        },
      );
    },
    [noticeCategories, saveContent],
  );

  // ------------------------------------------------------------ recruitment --

  const saveJobPosition = useCallback(
    async (jobId: string | null, job: JobPosition) => {
      const title = job.title.trim();
      if (!title) return;

      const updatedJobs = jobId
        ? recruitmentPositions.map((existing) => (existing.id === jobId ? { ...job, title } : existing))
        : [{ ...job, id: `job-${Date.now()}`, title }, ...recruitmentPositions];

      await saveContent(
        { recruitmentPositions: updatedJobs },
        {
          success: jobId ? "✅ Job opening updated!" : "💼 New Job Vacancy published!",
          failure: "⚠️ Job vacancy update failed because gps_school_website could not be updated.",
        },
      );
    },
    [recruitmentPositions, saveContent],
  );

  const deleteJobPosition = useCallback(
    async (jobId: string) => {
      await saveContent(
        { recruitmentPositions: recruitmentPositions.filter((job) => job.id !== jobId) },
        {
          success: "🗑️ Job vacancy removed.",
          failure: "⚠️ Job vacancy deletion failed because gps_school_website could not be updated.",
        },
      );
    },
    [recruitmentPositions, saveContent],
  );

  // --------------------------------------------------------------- settings --

  const saveParentsLoginUrl = useCallback(
    async (url: string) => {
      const nextUrl = url.trim();
      if (!nextUrl) {
        showToast("⚠️ Parents login link cannot be empty.");
        return;
      }

      try {
        new URL(nextUrl);
      } catch {
        showToast("⚠️ Please enter a valid parents login URL.");
        return;
      }

      await saveContent(
        { parentsLoginUrl: nextUrl },
        {
          success: "🔗 Parents login link updated.",
          failure: "⚠️ Parents login link could not be updated in gps_school_website.",
        },
      );
    },
    [saveContent, showToast],
  );

  const saveAcademicSession = useCallback(
    async (session: string) => {
      const nextSession = session.trim();
      if (!nextSession) {
        showToast("⚠️ Academic session cannot be empty.");
        return;
      }

      await saveContent(
        { academicSession: nextSession },
        {
          success: "📘 Academic session updated.",
          failure: "⚠️ Academic session could not be updated in gps_school_website.",
        },
      );
    },
    [saveContent, showToast],
  );

  const resetToDefaults = useCallback(async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all News Ticker, Notice Board, and Recruitment data back to factory defaults?",
    );
    if (!confirmed) return;

    await saveContent(
      {
        announcements: INITIAL_ANNOUNCEMENTS,
        noticeCategories: INITIAL_NOTICE_CATEGORIES,
        recruitmentPositions: INITIAL_RECRUITMENT_POSITIONS,
      },
      {
        success: "🔄 All data restored to school default values!",
        failure: "⚠️ Reset failed because gps_school_website could not be updated.",
      },
    );
  }, [saveContent]);

  const value = useMemo<AdminValue>(
    () => ({
      imageUploadState,
      updateImageAsset,
      uploadImageAsset,
      addGalleryImage,
      deleteGalleryImage,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      moveAnnouncement,
      saveNotice,
      deleteNotice,
      noticeEditor,
      openNoticeEditor,
      closeNoticeEditor,
      activeNoticeCategory,
      setActiveNoticeCategory,
      saveJobPosition,
      deleteJobPosition,
      jobEditor,
      openJobEditor,
      closeJobEditor,
      saveParentsLoginUrl,
      saveAcademicSession,
      resetToDefaults,
    }),
    [
      imageUploadState,
      updateImageAsset,
      uploadImageAsset,
      addGalleryImage,
      deleteGalleryImage,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      moveAnnouncement,
      saveNotice,
      deleteNotice,
      noticeEditor,
      openNoticeEditor,
      closeNoticeEditor,
      activeNoticeCategory,
      saveJobPosition,
      deleteJobPosition,
      jobEditor,
      openJobEditor,
      closeJobEditor,
      saveParentsLoginUrl,
      saveAcademicSession,
      resetToDefaults,
    ],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminValue {
  const value = useContext(AdminContext);
  if (!value) throw new Error("useAdmin must be used within an AdminProvider");
  return value;
}
