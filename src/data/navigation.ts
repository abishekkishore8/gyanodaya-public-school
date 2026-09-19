import { DEFAULT_PARENTS_LOGIN_URL } from "./site";

/**
 * Navigation links.
 *
 * Every main entry is a real route. `sectionId` is the id of the same section
 * as it appears on the home page, which the scroll-spy uses to highlight the
 * current link while the visitor scrolls the one-page home view.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Matching section id on the home page, for scroll-spy highlighting. */
  sectionId?: string;
  isExternal?: boolean;
  hasDropdown?: boolean;
  subItems?: { label: string; href: string }[];
}

// Top bar navigation links
export const TOP_NAV: NavItem[] = [
  { label: "Notice Board", href: "/notice-board" },
  { label: "Careers & Hiring", href: "/notice-board#recruitment" },
  { label: "News & Circulars", href: "/notice-board#announcements" },
  { label: "Parents Login", href: DEFAULT_PARENTS_LOGIN_URL, isExternal: true },
];

// Main navigation bar links with dropdown submenu structure
export const MAIN_NAV: NavItem[] = [
  { label: "HOME", href: "/", sectionId: "home" },
  { label: "ABOUT US", href: "/about", sectionId: "about" },
  {
    label: "ACADEMICS",
    href: "/academics",
    sectionId: "academics",
    hasDropdown: true,
    // The hash selects a stage tab once the page is open — see Academics.tsx.
    subItems: [
      { label: "Core Pillars", href: "/academics#all" },
      { label: "Pre-Primary (Nursery - KG)", href: "/academics#pre-primary" },
      { label: "Primary Wing (Class I - V)", href: "/academics#primary" },
      { label: "Middle & Senior Secondary", href: "/academics#middle" },
    ],
  },
  { label: "NOTICE BOARD", href: "/notice-board", sectionId: "notice-board" },
  {
    label: "ONLINE FORMS",
    href: "/online-forms",
    sectionId: "online-forms",
    hasDropdown: true,
    subItems: [
      { label: "Online Admission Form", href: "/online-forms#admission" },
      { label: "General & Academic Enquiry", href: "/online-forms#enquiry" },
      { label: "Book Campus Visit & Tour", href: "/online-forms#visit" },
      { label: "Download Prospectus & Fees", href: "/online-forms#prospectus" },
    ],
  },
  {
    label: "FACILITIES",
    href: "/facilities",
    sectionId: "facilities",
    hasDropdown: true,
    subItems: [
      { label: "Smart Classrooms", href: "/facilities#smart-classrooms" },
      { label: "Science & STEM Labs", href: "/facilities#science-stem-laboratories" },
      { label: "Digital Library Hub", href: "/facilities#library-digital-knowledge-hub" },
      { label: "GPS-Tracked Bus Transport", href: "/facilities#gps-enabled-transport" },
    ],
  },
  {
    label: "ADMISSIONS",
    href: "/admissions",
    sectionId: "admissions",
    hasDropdown: true,
    subItems: [
      { label: "Admission Criteria 2025–26", href: "/admissions" },
      { label: "Fee Structure & Guidelines", href: "/admissions#faqs" },
      { label: "Online Admission Form", href: "/online-forms#admission" },
    ],
  },
  { label: "GALLERY", href: "/gallery", sectionId: "gallery" },
];

/**
 * The home-page section each main navigation link points at, in nav order.
 * Computed once at module scope so the scroll-spy observer is built only when
 * the nav itself changes.
 */
export const MAIN_NAV_SECTION_IDS: readonly string[] = MAIN_NAV.map((item) => item.sectionId).filter(
  (id): id is string => Boolean(id),
);

/** Footer quick links — same destinations, friendlier labels. */
export const FOOTER_QUICK_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Facilities", href: "/facilities" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/online-forms#enquiry" },
];

/** Every public route, for the sitemap. */
export const PUBLIC_ROUTES: readonly string[] = [
  "/",
  "/about",
  "/academics",
  "/notice-board",
  "/facilities",
  "/admissions",
  "/online-forms",
  "/gallery",
];
