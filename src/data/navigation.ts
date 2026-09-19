import { DEFAULT_PARENTS_LOGIN_URL } from "./site";

// Top bar navigation links
export const TOP_NAV = [
  { label: "Notice Board", href: "#notice-board" },
  { label: "Careers & Hiring", href: "#recruitment" },
  { label: "News & Circulars", href: "#notice-board" },
  { label: "Parents Login", href: DEFAULT_PARENTS_LOGIN_URL, isExternal: true },
];

// Main navigation bar links with dropdown submenu structure
export const MAIN_NAV = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#about" },
  {
    label: "ACADEMICS",
    href: "#academics",
    hasDropdown: true,
    subItems: [
      { label: "Core Pillars", href: "#academics" },
      { label: "Pre-Primary (Nursery - KG)", href: "#academics" },
      { label: "Primary Wing (Class I - V)", href: "#academics" },
      { label: "Middle & Senior Secondary", href: "#academics" },
    ],
  },
  { label: "NOTICE BOARD", href: "#notice-board" },
  {
    label: "ONLINE FORMS",
    href: "#online-forms",
    hasDropdown: true,
    subItems: [
      { label: "Online Admission Form", href: "#online-forms" },
      { label: "General & Academic Enquiry", href: "#online-forms" },
      { label: "Book Campus Visit & Tour", href: "#online-forms" },
      { label: "Download Prospectus & Fees", href: "#online-forms" },
    ],
  },
  {
    label: "FACILITIES",
    href: "#facilities",
    hasDropdown: true,
    subItems: [
      { label: "Smart Classrooms", href: "#facilities" },
      { label: "Science & STEM Labs", href: "#facilities" },
      { label: "Digital Library Hub", href: "#facilities" },
      { label: "GPS-Tracked Bus Transport", href: "#facilities" },
    ],
  },
  {
    label: "ADMISSIONS",
    href: "#admissions",
    hasDropdown: true,
    subItems: [
      { label: "Admission Criteria 2025–26", href: "#admissions" },
      { label: "Fee Structure & Guidelines", href: "#admissions" },
      { label: "Online Admission Form", href: "#online-forms" },
    ],
  },
  { label: "GALLERY", href: "#gallery" },
];

/**
 * The section each main navigation link points at, in nav order. Computed once
 * at module scope so the scroll-spy observer is built only when the nav itself
 * changes.
 */
export const MAIN_NAV_SECTION_IDS: readonly string[] = MAIN_NAV.map((item) => item.href.replace("#", ""));

