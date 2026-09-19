import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { useSiteContent } from "./SiteContentContext";
import type { JobPosition, NoticeCategoryData, NoticeCategoryId, NoticeItemData } from "@/types/site";

/** Receipt shown after an online form is submitted. */
export interface SubmissionReceipt {
  id: string;
  type: string;
  title: string;
  applicantName: string;
  phone: string;
  date: string;
  keyDetails: { label: string; value: string }[];
}

interface UiValue {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  mobileSubNavOpen: string | null;
  setMobileSubNavOpen: (label: string | null) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  /** Index of the gallery photo shown in the lightbox, or `null` when closed. */
  lightboxIndex: number | null;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  showNextLightboxImage: () => void;
  showPreviousLightboxImage: () => void;

  admissionModalOpen: boolean;
  setAdmissionModalOpen: (open: boolean) => void;

  /** Notice shown in the official circular letterhead modal. */
  selectedNotice: NoticeItemData | null;
  setSelectedNotice: (notice: NoticeItemData | null) => void;
  /** Category shown in the "all notices" archive modal. */
  selectedNoticeCategory: NoticeCategoryData | null;
  setSelectedNoticeCategory: (category: NoticeCategoryData | null) => void;
  /** Opens the archive modal for a category by id. */
  openNoticeArchive: (categoryId: NoticeCategoryId) => void;

  jobModalOpen: boolean;
  setJobModalOpen: (open: boolean) => void;
  selectedJob: JobPosition | null;
  setSelectedJob: (job: JobPosition | null) => void;
  /** Opens the application modal prefilled for `job`. */
  openJobApplication: (job: JobPosition) => void;

  submissionReceipt: SubmissionReceipt | null;
  setSubmissionReceipt: (receipt: SubmissionReceipt | null) => void;
}

const UiContext = createContext<UiValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const { galleryItems, findNoticeCategory } = useSiteContent();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubNavOpen, setMobileSubNavOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItemData | null>(null);
  const [selectedNoticeCategory, setSelectedNoticeCategory] = useState<NoticeCategoryData | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [submissionReceipt, setSubmissionReceipt] = useState<SubmissionReceipt | null>(null);

  const galleryCount = galleryItems.length;

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNextLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null || galleryCount === 0 ? prev : (prev + 1) % galleryCount));
  }, [galleryCount]);

  const showPreviousLightboxImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null || galleryCount === 0 ? prev : (prev - 1 + galleryCount) % galleryCount,
    );
  }, [galleryCount]);

  const openNoticeArchive = useCallback(
    (categoryId: NoticeCategoryId) => {
      const category = findNoticeCategory(categoryId);
      if (category) setSelectedNoticeCategory(category);
    },
    [findNoticeCategory],
  );

  const openJobApplication = useCallback((job: JobPosition) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  }, []);

  const value = useMemo<UiValue>(
    () => ({
      mobileMenuOpen,
      setMobileMenuOpen,
      mobileSubNavOpen,
      setMobileSubNavOpen,
      searchOpen,
      setSearchOpen,
      lightboxIndex,
      openLightbox,
      closeLightbox,
      showNextLightboxImage,
      showPreviousLightboxImage,
      admissionModalOpen,
      setAdmissionModalOpen,
      selectedNotice,
      setSelectedNotice,
      selectedNoticeCategory,
      setSelectedNoticeCategory,
      openNoticeArchive,
      jobModalOpen,
      setJobModalOpen,
      selectedJob,
      setSelectedJob,
      openJobApplication,
      submissionReceipt,
      setSubmissionReceipt,
    }),
    [
      mobileMenuOpen,
      mobileSubNavOpen,
      searchOpen,
      lightboxIndex,
      openLightbox,
      closeLightbox,
      showNextLightboxImage,
      showPreviousLightboxImage,
      admissionModalOpen,
      selectedNotice,
      selectedNoticeCategory,
      openNoticeArchive,
      jobModalOpen,
      selectedJob,
      openJobApplication,
      submissionReceipt,
    ],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiValue {
  const value = useContext(UiContext);
  if (!value) throw new Error("useUi must be used within a UiProvider");
  return value;
}
