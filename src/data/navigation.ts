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
  { label: "Careers & Hiring", href: "/careers" },
  { label: "News & Circulars", href: "/notice-board#announcements" },
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
    // Each stage is a page of its own; `/academics/[stage]` opens that tab.
    subItems: [
      { label: "Core Pillars", href: "/academics" },
      { label: "Pre-Primary (Nursery - KG)", href: "/academics/pre-primary" },
      { label: "Primary Wing (Class I - V)", href: "/academics/primary" },
      { label: "Middle & Senior Secondary", href: "/academics/middle" },
      { label: "Co-Curricular Activities", href: "/academics/co-curricular" },
      { label: "Sports & Games", href: "/academics/sports" },
      { label: "Student Council", href: "/academics/student-council" },
    ],
  },
  {
    label: "FACILITIES",
    href: "/facilities",
    sectionId: "facilities",
    hasDropdown: true,
    // One page per facility card; the slug is the card title, lower-cased and
    // hyphenated, so renaming a card in the panel means editing these too.
    subItems: [
      { label: "Infrastructure", href: "/facilities/infrastructure" },
      { label: "Classrooms", href: "/facilities/classrooms" },
      { label: "Laboratories", href: "/facilities/laboratories" },
      { label: "Transportation", href: "/facilities/transportation" },
      { label: "Hostel", href: "/facilities/hostel" },
      { label: "Safety & Security", href: "/facilities/safety-security" },
    ],
  },
  {
    label: "ADMISSIONS",
    href: "/admissions",
    sectionId: "admissions",
    hasDropdown: true,
    // The online forms live under admissions; `/online-forms` has no nav entry
    // of its own, so every form is reached from here.
    subItems: [
      { label: "Admission Criteria 2025–26", href: "/admissions" },
      { label: "Fee Structure", href: "/fees" },
      { label: "School Uniform", href: "/admissions/uniform" },
      { label: "Online Admission Form", href: "/online-forms#admission" },
      { label: "General & Academic Enquiry", href: "/online-forms#enquiry" },
      { label: "Book Campus Visit & Tour", href: "/online-forms#visit" },
      { label: "Download Prospectus & Fees", href: "/online-forms#prospectus" },
    ],
  },
  { label: "GALLERY", href: "/gallery", sectionId: "gallery" },
  { label: "CONTACT", href: "/contact" },
  // No `sectionId`: the disclosure is a page of its own, not a home-page section.
  { label: "MANDATORY DISCLOSURE", href: "/mandatory-disclosure" },
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
  { label: "Fee Structure", href: "/fees" },
  { label: "Board Results", href: "/results" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

/** Every public route, for the sitemap. */
export const PUBLIC_ROUTES: readonly string[] = [
  "/",
  "/about",
  "/academics",
  "/academics/pre-primary",
  "/academics/primary",
  "/academics/middle",
  "/academics/senior",
  "/academics/co-curricular",
  "/academics/sports",
  "/academics/student-council",
  "/notice-board",
  "/facilities",
  "/admissions",
  "/admissions/uniform",
  "/fees",
  "/online-forms",
  "/gallery",
  "/results",
  "/careers",
  "/contact",
  "/mandatory-disclosure",
];
