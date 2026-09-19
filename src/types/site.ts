/**
 * Shared data contracts between the React client and the Express API.
 *
 * `GET /api/site-content` returns a `SiteContentDocument`, and
 * `PUT /api/site-content` accepts the same shape. Keep this file in sync with
 * `server/lib/site-content.js`, which normalizes documents on the server side.
 */

/** Visual theme applied to a notice's category tag. */
export type NoticeTagTheme = "urgent" | "success" | "warning" | "info" | "hiring" | "event";

export interface NoticeItemData {
  id: string;
  title: string;
  /** Human-readable date, e.g. "12 Mar 2025". */
  date: string;
  /** Day-of-month shown on the calendar chip, e.g. "12". */
  day: string;
  /** Uppercase short month shown on the calendar chip, e.g. "MAR". */
  month: string;
  /** Uppercase label, e.g. "URGENT". */
  tag: string;
  /** Tailwind classes derived from `tag` via `resolveNoticeTagColor`. */
  tagColor: string;
  desc: string;
  /** Circular reference number shown in the letterhead modal. */
  refNo?: string;
  /** Body paragraphs of the official circular. Falls back to `desc` when absent. */
  fullDetails?: string[];
  /** Who the circular is addressed to, shown in the letterhead modal. */
  audience?: string;
  /** Display size of the downloadable circular PDF, e.g. "1.2 MB". */
  fileSize?: string;
}

export interface NoticeCategoryData {
  id: "notices" | "announcements" | "recruitment";
  label: string;
  /** Tailwind gradient used behind the category header. */
  accent?: string;
  /** Secondary heading shown under `label`. */
  sublabel?: string;
  /** Pill shown beside `label`, e.g. "3 Updates". */
  badge?: string;
  items: NoticeItemData[];
}

export type NoticeCategoryId = NoticeCategoryData["id"];

export interface JobPosition {
  id: string;
  title: string;
  dept: string;
  type: string;
  vacancies: string;
  experience: string;
  qualification: string;
  payScale: string;
  deadline: string;
  location: string;
  highlights: string[];
  description: string;
}

export type FormSubmissionType = "admission" | "enquiry" | "visit" | "prospectus";
export type FormSubmissionStatus = "Pending" | "Reviewed" | "Contacted" | "Approved";

export interface FormSubmissionItem {
  id: string;
  type: FormSubmissionType;
  title: string;
  name: string;
  phone: string;
  email?: string;
  submittedAt: string;
  status: FormSubmissionStatus;
  details: Record<string, string>;
}

export type ImageAssetSection = "hero" | "academics" | "facilities" | "gallery" | "misc";

export interface ImageAssetItem {
  id: string;
  section: ImageAssetSection;
  label: string;
  url: string;
  alt: string;
}

export interface ImageAssetsDocument {
  heroSlides: ImageAssetItem[];
  academicBanners: ImageAssetItem[];
  facilities: ImageAssetItem[];
  gallery: ImageAssetItem[];
  misc: ImageAssetItem[];
}

export type ImageCollectionKey = keyof ImageAssetsDocument;

/**
 * The public site document, served unauthenticated from `GET /api/site-content`.
 *
 * Nothing personal may live here. Form submissions and job applications are
 * stored in their own collections behind admin-only endpoints.
 */
export interface SiteContentDocument {
  academicSession: string;
  parentsLoginUrl: string;
  announcements: string[];
  noticeCategories: NoticeCategoryData[];
  recruitmentPositions: JobPosition[];
  imageAssets: ImageAssetsDocument;
}

export interface UploadedImageResponse {
  url: string;
  key: string;
}

// --------------------------------------------------------- job applications --

export type JobApplicationStatus = "New" | "Shortlisted" | "Interviewed" | "Rejected" | "Hired";

/** A candidate's application against a published vacancy. */
export interface JobApplication {
  id: string;
  /** Vacancy applied for. May no longer exist if the vacancy was deleted. */
  jobId: string;
  /** Vacancy title captured at apply time, so it survives the vacancy's deletion. */
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
  notes?: string;
  /** Public R2 URL of the uploaded CV, when one was attached. */
  cvUrl?: string;
  /** Original filename, shown in the admin list. */
  cvFileName?: string;
  /** ISO timestamp. */
  submittedAt: string;
  status: JobApplicationStatus;
}
