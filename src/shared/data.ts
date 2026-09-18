export interface NoticeItemData {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  tag: string;
  tagColor: string;
  desc: string;
}

export interface NoticeCategoryData {
  id: "notices" | "announcements" | "recruitment";
  label: string;
  accent: string;
  items: NoticeItemData[];
}

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

export interface FormSubmissionItem {
  id: string;
  type: "admission" | "enquiry" | "visit" | "prospectus";
  title: string;
  name: string;
  phone: string;
  email?: string;
  submittedAt: string;
  status: "Pending" | "Reviewed" | "Contacted" | "Approved";
  details: Record<string, string>;
}

export interface ImageAssetItem {
  id: string;
  section: "hero" | "academics" | "facilities" | "gallery" | "misc";
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

export interface SiteContentDocument {
  academicSession: string;
  parentsLoginUrl: string;
  announcements: string[];
  noticeCategories: NoticeCategoryData[];
  recruitmentPositions: JobPosition[];
  formSubmissions: FormSubmissionItem[];
  imageAssets: ImageAssetsDocument;
}

export interface AdminLoginResponse {
  success: boolean;
  message?: string;
}

export interface UploadedImageResponse {
  url: string;
  key: string;
}