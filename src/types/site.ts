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
  /** Uploaded or linked attachment (usually the circular PDF). */
  fileUrl?: string;
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

// ---------------------------------------------------------------- about us --

/** A titled point in a list: a commitment, a rule, a shared responsibility. */
export interface AboutPointItem {
  id: string;
  title: string;
  text: string;
}

/** A message from a member of the school's leadership. */
export interface AboutMessageItem {
  id: string;
  /** Heading, e.g. "Principal's Message". */
  title: string;
  /** Who signs the message; may be blank until the school supplies it. */
  name: string;
  designation: string;
  /** Portrait, uploaded in the admin panel. */
  imageUrl: string;
  /** Pull quote the message opens with, when it has one. */
  quote: string;
  /** Short version, shown on the home-page card. */
  excerpt: string;
  /** Full message, one entry per paragraph. */
  body: string[];
}

/** A member of the teaching faculty, with their photograph. */
export interface FacultyMemberItem {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  description: string;
  /** Photograph, uploaded in the admin panel. */
  imageUrl: string;
}

/** Everything the About Us page renders, all administrator-editable. */
export interface AboutContent {
  vision: string;
  mission: string;
  /** Commitments shown under the mission and vision. */
  missionPoints: AboutPointItem[];
  /** Leadership messages: the About page shows them in full, home as cards. */
  messages: AboutMessageItem[];
  facultyIntro: string;
  faculty: FacultyMemberItem[];
  rulesIntro: string;
  rules: AboutPointItem[];
  parentTeacherIntro: string;
  parentTeacher: AboutPointItem[];
}

// --------------------------------------------------------------- home page --

/** One slide of the hero carousel. */
export interface HeroSlideItem {
  id: string;
  /** Pill above the headline, e.g. "CBSE AFFILIATED INSTITUTION". */
  tag: string;
  headline: string;
  subtitle: string;
  imageUrl: string;
}

/** Which icon a highlight card draws; see `HighlightIcon`. */
export type HighlightIconKey =
  "classroom" | "faculty" | "transport" | "holistic" | "labs" | "library" | "sports" | "safety";

/** One card of the strip that overlaps the hero. */
export interface HighlightItem {
  id: string;
  icon: HighlightIconKey;
  title: string;
  desc: string;
}

/** A figure shown in a statistics row. */
export interface StatItem {
  id: string;
  value: string;
  label: string;
  /** Optional line under the label. */
  detail?: string;
}

/** The "Welcome to Gyanodaya" introduction. */
export interface WelcomeContent {
  eyebrow: string;
  title: string;
  body: string;
  /** Floating badge over the photograph. */
  badgeValue: string;
  badgeLabel: string;
  stats: StatItem[];
  buttonLabel: string;
  imageUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** The green admissions banner. */
export interface CtaContent {
  /** The academic session is appended to this line. */
  title: string;
  subtitle: string;
  buttonLabel: string;
}

/** Everything on the home page that is not a section of its own. */
export interface HomeContent {
  hero: HeroSlideItem[];
  highlights: HighlightItem[];
  welcome: WelcomeContent;
  faqs: FaqItem[];
  cta: CtaContent;
}

/** School contact details, used by the header, footer and contact page. */
export interface ContactContent {
  phone: string;
  altPhone: string;
  email: string;
  address: string;
  officeHours: string;
  /** Google Maps embed URL for the contact page. */
  mapEmbedUrl: string;
}

// ------------------------------------------------------------ fee structure --

/** One line of a fee table. */
export interface FeeRowItem {
  id: string;
  label: string;
  /** Amount as it should read, e.g. "₹1,200 per month". */
  amount: string;
  note: string;
}

/** A fee table, usually one per stage. */
export interface FeeGroupItem {
  id: string;
  title: string;
  subtitle: string;
  rows: FeeRowItem[];
}

/** The fee structure page. */
export interface FeesContent {
  intro: string;
  groups: FeeGroupItem[];
  notes: NoteItem[];
}

// ------------------------------------------------------------ board results --

/** A student in a results strip. */
export interface ResultTopperItem {
  id: string;
  name: string;
  /** Marks as they should read, e.g. "96.2%". */
  score: string;
  /** Optional label above the name, e.g. "State Topper". */
  detail: string;
  /** Photograph; the card falls back to the initial without one. */
  imageUrl: string;
}

/** One summary tile beside the toppers, e.g. "98% Above" over "6 Students". */
export interface ResultStatItem {
  id: string;
  /** Large figure, e.g. "98%". */
  value: string;
  /** Word under the figure, e.g. "Above". */
  label: string;
  /** Footer strip, e.g. "6 Students" or "Average". */
  caption: string;
}

/** One results announcement, such as Class X for a given year. */
export interface ResultGroupItem {
  id: string;
  title: string;
  /** Summary tiles shown left of the toppers; may be empty. */
  stats: ResultStatItem[];
  toppers: ResultTopperItem[];
  /** Small note under the toppers, e.g. "* Results of CBSE 2026". */
  footnote: string;
}

/** The board results shown on the home page. */
export interface ResultsContent {
  intro: string;
  groups: ResultGroupItem[];
}

// --------------------------------------------------- academics & facilities --

/** A photo card with a badge, a title and a description. */
export interface ContentCardItem {
  id: string;
  title: string;
  /** Small badge over the photo, e.g. "Inter-house". */
  tag: string;
  description: string;
  /** Photograph, uploaded in the admin panel. */
  imageUrl: string;
}

/** A post on the student council. */
export interface CouncilMemberItem {
  id: string;
  role: string;
  /** Who holds the post; blank until the school names them. */
  name: string;
  /** Class and section, e.g. "Class XII-A". */
  studentClass: string;
  responsibility: string;
  /** A line in the student's own words; optional, absent on older documents. */
  quote?: string;
  /** Photograph; the card falls back to a monogram without one. */
  imageUrl: string;
}

/** Icon drawn on a curriculum card; see `AcademicStageIcon`. */
export type CurriculumIconType =
  | "curriculum"
  | "faculty"
  | "stem"
  | "excellence"
  | "play"
  | "phonics"
  | "math"
  | "arts"
  | "tech"
  | "debate"
  | "board"
  | "exam";

/** One card inside a curriculum stage. */
export interface CurriculumCardItem {
  id: string;
  title: string;
  desc: string;
  badge: string;
  iconType: CurriculumIconType;
}

/**
 * One stage of the curriculum. `id` is both the tab id and the URL segment of
 * `/academics/[stage]`, so it must stay lower-case and hyphenated.
 */
export interface CurriculumStageItem {
  id: string;
  label: string;
  subtitle: string;
  tagline: string;
  description: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImageUrl: string;
  bannerFeatures: string[];
  cards: CurriculumCardItem[];
}

/** The curriculum tabs at the top of the academics page. */
export interface CurriculumContent {
  /** The four figures above the tabs. */
  highlights: StatItem[];
  stages: CurriculumStageItem[];
}

/** The academics page beyond the curriculum tabs. */
export interface AcademicsContent {
  curriculum: CurriculumContent;
  coCurricularIntro: string;
  coCurricular: ContentCardItem[];
  sportsIntro: string;
  sports: ContentCardItem[];
  councilIntro: string;
  council: CouncilMemberItem[];
}

/** The campus facilities page. */
export interface FacilitiesContent {
  intro: string;
  items: ContentCardItem[];
}

// ----------------------------------------------------------- school uniform --

/** One garment in a uniform set. */
export interface UniformItemRow {
  id: string;
  /** What it is, e.g. "Shirt". */
  label: string;
  /** How it must look, e.g. "White half-sleeve with the school monogram". */
  detail: string;
}

/** A complete uniform, such as the summer uniform for boys. */
export interface UniformSetItem {
  id: string;
  title: string;
  /** When it is worn, e.g. "April to October". */
  days: string;
  /** Photograph of the uniform, uploaded in the admin panel. */
  imageUrl: string;
  items: UniformItemRow[];
}

/** A single line of guidance. */
export interface NoteItem {
  id: string;
  text: string;
}

/** A point of uniform guidance shown under the sets. */
export type UniformNoteItem = NoteItem;

/** The school uniform section of the admissions page. */
export interface UniformContent {
  intro: string;
  sets: UniformSetItem[];
  notes: UniformNoteItem[];
}

// ---------------------------------------------------- mandatory disclosure --

/** One label/value line of a disclosure table. */
export interface DisclosureFieldItem {
  id: string;
  label: string;
  value: string;
}

/** A document the school must publish, linked once a scan is available. */
export interface DisclosureDocumentItem {
  id: string;
  label: string;
  /** Public URL of the document; empty until one is published. */
  url: string;
}

/** One year of board results for a class. */
export interface DisclosureResultItem {
  id: string;
  year: string;
  registered: string;
  passed: string;
  passPercentage: string;
}

/**
 * The CBSE mandatory public disclosure, in the order of Appendix IX of the
 * affiliation bye-laws. Every value is administrator-editable.
 */
export interface DisclosureContent {
  /** Paragraph under the page title. */
  intro: string;
  /** When the figures were last verified, as the school words it. */
  updatedOn: string;
  general: DisclosureFieldItem[];
  documents: DisclosureDocumentItem[];
  resultAcademics: DisclosureDocumentItem[];
  classXResults: DisclosureResultItem[];
  classXiiResults: DisclosureResultItem[];
  staff: DisclosureFieldItem[];
  infrastructure: DisclosureFieldItem[];
  /** Closing declaration under the tables. */
  declaration: string;
  contactEmail: string;
  contactPhone: string;
}

/**
 * The public site document, served unauthenticated from `GET /api/site-content`.
 *
 * Nothing personal may live here. Form submissions and job applications are
 * stored in their own collections behind admin-only endpoints.
 */
export interface SiteContentDocument {
  academicSession: string;
  home: HomeContent;
  contact: ContactContent;
  parentsLoginUrl: string;
  announcements: string[];
  noticeCategories: NoticeCategoryData[];
  recruitmentPositions: JobPosition[];
  imageAssets: ImageAssetsDocument;
  about: AboutContent;
  academics: AcademicsContent;
  facilities: FacilitiesContent;
  results: ResultsContent;
  fees: FeesContent;
  uniform: UniformContent;
  disclosure: DisclosureContent;
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
