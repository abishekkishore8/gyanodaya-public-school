import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { ACADEMICS_CARDS_DATA } from "@/data/academics";
import { INITIAL_ANNOUNCEMENTS } from "@/data/announcements";
import { FACILITIES_LIST } from "@/data/facilities";
import { GALLERY_ITEMS } from "@/data/gallery";
import { HERO_SLIDES } from "@/data/hero";
import { INITIAL_IMAGE_ASSETS } from "@/data/images";
import { INITIAL_NOTICE_CATEGORIES } from "@/data/notices";
import { INITIAL_RECRUITMENT_POSITIONS } from "@/data/recruitment";
import { DEFAULT_PARENTS_LOGIN_URL } from "@/data/site";
import { ApiError, fetchSiteContent, saveSiteContentDocument } from "@/lib/api";
import { normalizeNoticeCategories } from "@/lib/notices";
import type {
  ImageAssetItem,
  ImageAssetsDocument,
  ImageCollectionKey,
  JobPosition,
  NoticeCategoryData,
  NoticeCategoryId,
  SiteContentDocument,
} from "@/types/site";

import { useToast } from "./ToastContext";

const DEFAULT_ACADEMIC_SESSION = "2025–26";

/** A hero slide with its image resolved from the admin-managed assets. */
export interface ResolvedHeroSlide {
  img: string;
  tag: string;
  headline: string;
  subtitle: string;
  alt: string;
}

/** A gallery tile built from an admin-managed image asset. */
export interface ResolvedGalleryItem {
  img: string;
  title: string;
  category: string;
  desc: string;
}

interface SaveMessages {
  /** Toast shown after a successful save. */
  success?: string;
  /** Toast shown when the save fails. */
  failure?: string;
}

interface SiteContentValue {
  isLoading: boolean;
  loadError: string | null;

  academicSession: string;
  parentsLoginUrl: string;
  announcements: string[];
  noticeCategories: NoticeCategoryData[];
  recruitmentPositions: JobPosition[];
  imageAssets: ImageAssetsDocument;

  /** Hero slides with admin-managed images applied. */
  heroSlides: ResolvedHeroSlide[];
  /** Curriculum content with admin-managed stage banners applied. */
  academicCardsData: typeof ACADEMICS_CARDS_DATA;
  /** Facility cards with admin-managed photos applied. */
  facilitiesList: typeof FACILITIES_LIST;
  /** Gallery tiles derived from the admin-managed gallery collection. */
  galleryItems: ResolvedGalleryItem[];
  aboutCampusImage: ImageAssetItem | undefined;
  campusSupportImages: ImageAssetItem[];

  /** Looks up one image asset, falling back to the bundled default. */
  getImageAsset: (collection: ImageCollectionKey, id: string) => ImageAssetItem | undefined;
  /** Finds a notice category by id. */
  findNoticeCategory: (categoryId: NoticeCategoryId) => NoticeCategoryData | undefined;

  /**
   * Persists `overrides` merged over the current content and applies the saved
   * document. Resolves `true` on success; on failure it shows `failure` (or a
   * generic message) and resolves `false` rather than throwing.
   */
  saveContent: (overrides: Partial<SiteContentDocument>, messages?: SaveMessages) => Promise<boolean>;
}

const SiteContentContext = createContext<SiteContentValue | null>(null);

const GENERIC_SAVE_FAILURE = "⚠️ Save failed because gps_school_website could not be updated.";

interface SiteContentProviderProps {
  children: ReactNode;
  /**
   * Content already fetched on the server. When supplied the provider renders
   * with real values immediately and skips the initial client fetch, which is
   * what keeps the admin panel free of a loading flash and of placeholder
   * counts that change after hydration.
   */
  initialContent?: SiteContentDocument;
}

export function SiteContentProvider({ children, initialContent }: SiteContentProviderProps) {
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(!initialContent);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [academicSession, setAcademicSession] = useState(
    initialContent?.academicSession || DEFAULT_ACADEMIC_SESSION,
  );
  const [parentsLoginUrl, setParentsLoginUrl] = useState(
    initialContent?.parentsLoginUrl || DEFAULT_PARENTS_LOGIN_URL,
  );
  const [announcements, setAnnouncements] = useState<string[]>(
    initialContent?.announcements ?? INITIAL_ANNOUNCEMENTS,
  );
  const [noticeCategories, setNoticeCategories] = useState<NoticeCategoryData[]>(() =>
    initialContent ? normalizeNoticeCategories(initialContent.noticeCategories) : INITIAL_NOTICE_CATEGORIES,
  );
  const [recruitmentPositions, setRecruitmentPositions] = useState<JobPosition[]>(
    initialContent?.recruitmentPositions ?? INITIAL_RECRUITMENT_POSITIONS,
  );
  const [imageAssets, setImageAssets] = useState<ImageAssetsDocument>(
    initialContent?.imageAssets ?? INITIAL_IMAGE_ASSETS,
  );

  /**
   * Mirrors the current document so `saveContent` always builds its payload
   * from the latest values, even when called from a stale closure (for example
   * inside a `setTimeout` in a form handler).
   */
  const contentRef = useRef<SiteContentDocument>({
    academicSession,
    parentsLoginUrl,
    announcements,
    noticeCategories,
    recruitmentPositions,
    imageAssets,
  });

  useEffect(() => {
    contentRef.current = {
      academicSession,
      parentsLoginUrl,
      announcements,
      noticeCategories,
      recruitmentPositions,
        imageAssets,
    };
  }, [
    academicSession,
    parentsLoginUrl,
    announcements,
    noticeCategories,
    recruitmentPositions,
    imageAssets,
  ]);

  const applySiteContent = useCallback((content: SiteContentDocument) => {
    setAcademicSession(content.academicSession || DEFAULT_ACADEMIC_SESSION);
    setParentsLoginUrl(content.parentsLoginUrl || DEFAULT_PARENTS_LOGIN_URL);
    setAnnouncements(content.announcements);
    setNoticeCategories(normalizeNoticeCategories(content.noticeCategories));
    setRecruitmentPositions(content.recruitmentPositions);
    setImageAssets(content.imageAssets);
  }, []);

  const saveContent = useCallback(
    async (overrides: Partial<SiteContentDocument>, messages?: SaveMessages) => {
      try {
        const saved = await saveSiteContentDocument({ ...contentRef.current, ...overrides });
        applySiteContent(saved);
        if (messages?.success) showToast(messages.success);
        return true;
      } catch (error) {
        // An expired session is the most common failure, and the generic
        // "could not be updated" message sends people looking in the wrong place.
        if (error instanceof ApiError && error.status === 401) {
          showToast("🔒 Your session has expired. Please sign in again.");
          return false;
        }

        showToast(messages?.failure || GENERIC_SAVE_FAILURE);
        return false;
      }
    },
    [applySiteContent, showToast],
  );

  useEffect(() => {
    // Already seeded from the server — nothing to fetch.
    if (initialContent) return;

    let cancelled = false;

    const loadSiteContent = async () => {
      try {
        const data = await fetchSiteContent();
        if (cancelled) return;
        applySiteContent(data);
        setLoadError(null);
      } catch (error) {
        if (cancelled) return;
        setLoadError(error instanceof Error ? error.message : "Failed to load site content.");
        showToast(
          "⚠️ Could not connect to gps_school_website. Content editing is disabled until the database is reachable.",
        );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadSiteContent();
    return () => {
      cancelled = true;
    };
  }, [applySiteContent, showToast, initialContent]);

  const getImageAsset = useCallback(
    (collection: ImageCollectionKey, id: string) =>
      imageAssets[collection].find((asset) => asset.id === id) ||
      INITIAL_IMAGE_ASSETS[collection].find((asset) => asset.id === id),
    [imageAssets],
  );

  const findNoticeCategory = useCallback(
    (categoryId: NoticeCategoryId) => noticeCategories.find((category) => category.id === categoryId),
    [noticeCategories],
  );

  const heroSlides = useMemo<ResolvedHeroSlide[]>(
    () =>
      HERO_SLIDES.map((slide, index) => {
        const asset = getImageAsset("heroSlides", `hero-${index + 1}`);
        return { ...slide, img: asset?.url || slide.img, alt: asset?.alt || slide.headline };
      }),
    [getImageAsset],
  );

  const academicCardsData = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(ACADEMICS_CARDS_DATA).map(([key, value]) => {
          const asset = getImageAsset("academicBanners", key === "all" ? "academics-all" : `academics-${key}`);
          return [key, { ...value, stageBanner: { ...value.stageBanner, image: asset?.url || value.stageBanner.image } }];
        }),
      ) as typeof ACADEMICS_CARDS_DATA,
    [getImageAsset],
  );

  const facilitiesList = useMemo(
    () =>
      FACILITIES_LIST.map((facility, index) => {
        const asset = getImageAsset("facilities", `facility-${index + 1}`);
        return { ...facility, img: asset?.url || facility.img };
      }),
    [getImageAsset],
  );

  const galleryItems = useMemo<ResolvedGalleryItem[]>(
    () =>
      imageAssets.gallery.map((asset, index) => {
        const fallback = GALLERY_ITEMS[index];
        const cleanTitle = asset.label.replace(/^Gallery\s*-\s*/i, "").trim();

        return {
          img: asset.url,
          title: cleanTitle || fallback?.title || `Gallery Photo ${index + 1}`,
          category: fallback?.category || "Campus Life",
          desc: asset.alt || fallback?.desc || "Moments from Gyanodaya Public School.",
        };
      }),
    [imageAssets.gallery],
  );

  const value = useMemo<SiteContentValue>(
    () => ({
      isLoading,
      loadError,
      academicSession,
      parentsLoginUrl,
      announcements,
      noticeCategories,
      recruitmentPositions,
        imageAssets,
      heroSlides,
      academicCardsData,
      facilitiesList,
      galleryItems,
      aboutCampusImage: getImageAsset("misc", "about-campus"),
      campusSupportImages: imageAssets.misc,
      getImageAsset,
      findNoticeCategory,
      saveContent,
    }),
    [
      isLoading,
      loadError,
      academicSession,
      parentsLoginUrl,
      announcements,
      noticeCategories,
      recruitmentPositions,
        imageAssets,
      heroSlides,
      academicCardsData,
      facilitiesList,
      galleryItems,
      getImageAsset,
      findNoticeCategory,
      saveContent,
    ],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContentValue {
  const value = useContext(SiteContentContext);
  if (!value) throw new Error("useSiteContent must be used within a SiteContentProvider");
  return value;
}
