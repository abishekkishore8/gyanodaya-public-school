import { useState, useEffect, useRef } from "react";

import type {
  FormSubmissionItem,
  ImageAssetItem,
  ImageAssetsDocument,
  JobPosition,
  NoticeCategoryData,
  NoticeItemData,
  SiteContentDocument,
  UploadedImageResponse,
} from "./shared/data";

// Demo high-resolution school & campus photography
const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1920&h=1080&fit=crop&auto=format",
    tag: "CBSE AFFILIATED INSTITUTION",
    headline: "Inspiring Excellence, Building Futures",
    subtitle: "At Gyanodaya Public School, Bagodar, we nurture young minds with strong values, modern learning and boundless opportunities.",
  },
  {
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop&auto=format",
    tag: "NURTURING GLOBAL LEADERS",
    headline: "Empowering Leaders of Tomorrow",
    subtitle: "Comprehensive CBSE curriculum with world-class faculty, modern infrastructure and holistic character building.",
  },
  {
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop&auto=format",
    tag: "WORLD-CLASS INFRASTRUCTURE",
    headline: "A Legacy of Academic Distinction",
    subtitle: "Fostering curiosity, creativity, and critical thinking from foundational kindergarten years to senior secondary.",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop&auto=format",
    tag: "HOLISTIC DEVELOPMENT",
    headline: "Where Potential Meets Purpose",
    subtitle: "State-of-the-art laboratories, digital smart classrooms, and vibrant sports & cultural opportunities.",
  },
];

const INITIAL_IMAGE_ASSETS: ImageAssetsDocument = {
  heroSlides: HERO_SLIDES.map((slide, index) => ({
    id: `hero-${index + 1}`,
    section: "hero",
    label: `Hero Slide ${index + 1}`,
    url: slide.img,
    alt: slide.headline,
  })),
  academicBanners: [
    {
      id: "academics-all",
      section: "academics",
      label: "Academics Banner - All",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&h=700&fit=crop&auto=format&q=80",
      alt: "Holistic learning classroom",
    },
    {
      id: "academics-pre-primary",
      section: "academics",
      label: "Academics Banner - Pre Primary",
      url: "https://images.unsplash.com/photo-1587691592099-24045742c181?w=1000&h=700&fit=crop&auto=format&q=80",
      alt: "Pre primary classroom",
    },
    {
      id: "academics-primary",
      section: "academics",
      label: "Academics Banner - Primary",
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&h=700&fit=crop&auto=format&q=80",
      alt: "Primary students learning",
    },
    {
      id: "academics-middle",
      section: "academics",
      label: "Academics Banner - Middle",
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&h=700&fit=crop&auto=format&q=80",
      alt: "Middle school students in class",
    },
    {
      id: "academics-senior",
      section: "academics",
      label: "Academics Banner - Senior",
      url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1000&h=700&fit=crop&auto=format&q=80",
      alt: "Senior secondary students",
    },
  ],
  facilities: [
    {
      id: "facility-1",
      section: "facilities",
      label: "Facility - Smart Classrooms",
      url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=420&fit=crop&auto=format",
      alt: "Smart classroom",
    },
    {
      id: "facility-2",
      section: "facilities",
      label: "Facility - STEM Labs",
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=420&fit=crop&auto=format",
      alt: "Science lab",
    },
    {
      id: "facility-3",
      section: "facilities",
      label: "Facility - Library",
      url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=420&fit=crop&auto=format",
      alt: "Library interior",
    },
    {
      id: "facility-4",
      section: "facilities",
      label: "Facility - Transport",
      url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=420&fit=crop&auto=format",
      alt: "School transport",
    },
  ],
  gallery: [
    {
      id: "gallery-1",
      section: "gallery",
      label: "Gallery - Classroom Discussions",
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=675&fit=crop&auto=format&q=80",
      alt: "Interactive classroom discussions",
    },
    {
      id: "gallery-2",
      section: "gallery",
      label: "Gallery - Library Research",
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&h=675&fit=crop&auto=format&q=80",
      alt: "Library research",
    },
    {
      id: "gallery-3",
      section: "gallery",
      label: "Gallery - STEM Fair",
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&h=675&fit=crop&auto=format&q=80",
      alt: "STEM fair",
    },
    {
      id: "gallery-4",
      section: "gallery",
      label: "Gallery - Cultural Celebration",
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=675&fit=crop&auto=format&q=80",
      alt: "Cultural celebration",
    },
    {
      id: "gallery-5",
      section: "gallery",
      label: "Gallery - Sports Day",
      url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=675&fit=crop&auto=format&q=80",
      alt: "Sports day",
    },
    {
      id: "gallery-6",
      section: "gallery",
      label: "Gallery - Green Campus",
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&h=675&fit=crop&auto=format&q=80",
      alt: "Green campus",
    },
  ],
  misc: [
    {
      id: "about-campus",
      section: "misc",
      label: "About Section Campus Image",
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&h=700&fit=crop&auto=format&q=80",
      alt: "Gyanodaya Public School Students and Campus",
    },
  ],
};

const GREEN = "#14452f"; // Dark forest emerald green
const GOLD = "#c59a3f"; // Warm golden yellow
const GOLD_TEXT = "#dfb455";
const NOTICE_TAG_THEMES = {
  urgent: "bg-red-50 text-red-700 border-red-200",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  hiring: "bg-sky-50 text-sky-800 border-sky-200",
  event: "bg-purple-50 text-purple-700 border-purple-200",
} as const;

type NoticeTagThemeKey = keyof typeof NOTICE_TAG_THEMES;

function getNoticeTagColor(theme: NoticeTagThemeKey) {
  return NOTICE_TAG_THEMES[theme];
}

function inferNoticeTagTheme(tag: string, categoryKey: NoticeCategoryData["id"]): NoticeTagThemeKey {
  const normalizedTag = tag.trim().toUpperCase();

  if (categoryKey === "recruitment") return "hiring";
  if (categoryKey === "announcements") {
    if (normalizedTag.includes("EVENT") || normalizedTag.includes("FEST") || normalizedTag.includes("CAMPUS")) return "event";
    return "success";
  }

  if (normalizedTag.includes("MEETING") || normalizedTag.includes("DATE") || normalizedTag.includes("WARN")) return "warning";
  if (normalizedTag.includes("TRANSPORT") || normalizedTag.includes("INFO") || normalizedTag.includes("UPDATE")) return "info";
  return "urgent";
}

function normalizeNoticeItem(categoryKey: NoticeCategoryData["id"], item: NoticeItemData): NoticeItemData {
  const theme = inferNoticeTagTheme(item.tag, categoryKey);
  return {
    ...item,
    tagColor: getNoticeTagColor(theme),
  };
}

function normalizeNoticeCategories(categories: NoticeCategoryData[]) {
  return categories.map((category) => ({
    ...category,
    items: category.items.map((item) => normalizeNoticeItem(category.id, item)),
  }));
}

const SCHOOL_LOGO_SRC = "/gps_logo-removebg-preview.png";

export function SchoolLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 overflow-visible ${className}`}>
      <img
        src={SCHOOL_LOGO_SRC}
        alt="Gyanodaya Public School logo"
        className="block h-full w-full object-contain object-center drop-shadow-sm select-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

// Bespoke academic icon component
function AcademicStageIcon({ type, className = "w-6 h-6 text-[#14452f]" }: { type: string; className?: string }) {
  switch (type) {
    case "curriculum":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "faculty":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "stem":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "excellence":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case "play":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "phonics":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      );
    case "math":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case "arts":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4 5 5 0 013-4.5V5a2 2 0 012-2h4a2 2 0 012 2v7.5A5 5 0 0117 17a4 4 0 01-4 4H7z" />
        </svg>
      );
    case "tech":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "debate":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "board":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case "exam":
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}

// Default Initial Announcements / News Ticker items
const INITIAL_ANNOUNCEMENTS = [
  "📢 Admissions Open for Academic Session 2025–26 (Nursery to Class XII) at GPS Bagodar",
  "💼 Faculty Recruitment 2025-26 Active: Walk-in & Online Applications Open for PGT, TGT, PRT",
  "🏆 Gyanodaya Public School students win District Inter-School Science & Math Fair",
  "📅 Annual Sports & Cultural Meet 2025 scheduled for next month",
  "✨ 100% Pass Percentage in CBSE Board Examinations with distinction",
  "🚌 GPS-enabled Safe School Bus routes operational across Bagodar, Saria, Dumri & Giridih",
];

const PLAYSTORE_PARENT_APP_URL = "https://play.google.com/store/search?q=gyanodaya+public+school+bagodar&c=apps";
const DEFAULT_PARENTS_LOGIN_URL = "https://play.google.com/store/search?q=gyanodaya+public+school+bagodar&c=apps";

// Top bar navigation links
const TOP_NAV = [
  { label: "Notice Board", href: "#notice-board" },
  { label: "Careers & Hiring", href: "#recruitment" },
  { label: "News & Circulars", href: "#notice-board" },
  { label: "Parents Login", href: DEFAULT_PARENTS_LOGIN_URL, isExternal: true },
];

// Main navigation bar links with dropdown submenu structure
const MAIN_NAV = [
  { label: "HOME", href: "#home", active: true },
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
  { label: "FAQS", href: "#faqs" },
  { label: "CONTACT US", href: "#contact" },
];

// 5 Key Highlights Cards
const HIGHLIGHT_CARDS = [
  {
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none" stroke="#14452f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="8" width="38" height="24" rx="2" />
        <path d="M16 32v6M32 32v6M10 38h28" />
        <path d="M12 15h12v10H12z" strokeWidth="1.6" />
        <circle cx="33" cy="20" r="3" strokeWidth="1.6" />
      </svg>
    ),
    title: "Smart Classrooms",
    desc: "Interactive technology-enabled learning",
  },
  {
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none" stroke="#14452f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="14" r="6" />
        <path d="M10 36c0-7.7 6.3-14 14-14s14 6.3 14 14" />
        <circle cx="11" cy="18" r="4" strokeWidth="1.6" />
        <path d="M5 33c0-4.4 2.7-8 6-8" strokeWidth="1.6" />
        <circle cx="37" cy="18" r="4" strokeWidth="1.6" />
        <path d="M43 33c0-4.4-2.7-8-6-8" strokeWidth="1.6" />
      </svg>
    ),
    title: "Experienced Faculty",
    desc: "Dedicated mentors who inspire every child",
  },
  {
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none" stroke="#14452f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="16" width="34" height="18" rx="3" />
        <path d="M7 24h34M13 16v-4a2 2 0 012-2h18a2 2 0 012 2v4" />
        <circle cx="15" cy="34" r="3.5" />
        <circle cx="33" cy="34" r="3.5" />
        <path d="M18.5 34h11" />
        <path d="M11 20h4M19 20h10" />
      </svg>
    ),
    title: "Safe Transport",
    desc: "GPS-tracked fleet with verified drivers",
  },
  {
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none" stroke="#14452f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 10c0 8-8 16-16 16 8 0 16 8 16 16 0-8 8-16 16-16-8 0-16-8-16-16z" />
        <path d="M24 20v14M18 27h12" strokeWidth="1.8" />
      </svg>
    ),
    title: "Holistic Development",
    desc: "Mind · Body · Values balanced growth",
  },
  {
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none" stroke="#14452f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 8h8M24 8v10l-10 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L24 18" />
        <path d="M17 31h14M22 24h4" strokeWidth="1.6" />
        <circle cx="21" cy="35" r="1.5" fill="#14452f" />
        <circle cx="27" cy="33" r="1.5" fill="#14452f" />
      </svg>
    ),
    title: "Modern Labs",
    desc: "Cutting-edge STEM & science facilities",
  },
];

// Academics tab categories & detailed curriculum data
const ACADEMIC_TABS = [
  { id: "all", label: "Core Pillars", subtitle: "Foundation of Excellence" },
  { id: "pre-primary", label: "Pre-Primary", subtitle: "Nursery – UKG" },
  { id: "primary", label: "Primary Wing", subtitle: "Classes I – V" },
  { id: "middle", label: "Middle School", subtitle: "Classes VI – VIII" },
  { id: "senior", label: "Senior Secondary", subtitle: "Classes IX – XII" },
];

const ACADEMIC_HIGHLIGHTS = [
  { value: "100%", label: "CBSE Board Pass Rate", detail: "Consistent distinctions" },
  { value: "1:20", label: "Mentor to Student Ratio", detail: "Personalized care" },
  { value: "30+", label: "Co-Curricular Clubs", detail: "Holistic development" },
  { value: "15+", label: "Smart & STEM Labs", detail: "Hands-on discovery" },
];

const ACADEMICS_CARDS_DATA: Record<
  string,
  {
    tagline: string;
    description: string;
    stageBanner: {
      title: string;
      subtitle: string;
      image: string;
      features: string[];
    };
    cards: Array<{
      title: string;
      desc: string;
      badge: string;
      iconType: "curriculum" | "faculty" | "stem" | "excellence" | "play" | "phonics" | "math" | "arts" | "tech" | "debate" | "board" | "exam";
    }>;
  }
> = {
  all: {
    tagline: "A transformative, values-steeped learning environment aligned with CBSE standards & NEP 2020.",
    description:
      "At Gyanodaya Public School, academic rigor is harmoniously blended with character building, digital fluency, and experiential inquiry so that every child blossoms into a confident, responsible global citizen.",
    stageBanner: {
      title: "Holistic Learning Continuum",
      subtitle: "Nursery through Class XII CBSE Affiliated",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&h=700&fit=crop&auto=format&q=80",
      features: [
        "CBSE Affiliated Curriculum with NEP 2020 pedagogical standards",
        "Experiential STEM & Robotics learning with real-world applications",
        "Continuous Comprehensive Evaluation (CCE) & individual mentor guidance",
      ],
    },
    cards: [
      {
        title: "CBSE Curriculum",
        desc: "Comprehensive national curriculum engineered for conceptual depth, analytical precision, and board exam mastery.",
        badge: "CBSE Affiliated",
        iconType: "curriculum",
      },
      {
        title: "Experienced Faculty",
        desc: "Passionate educators and subject experts delivering personalized mentorship, moral guidance, and academic support.",
        badge: "1:20 Ratio",
        iconType: "faculty",
      },
      {
        title: "Innovative STEM Learning",
        desc: "Hands-on robotics, computer science labs, experiential science kits, and modern inquiry-based experimentation.",
        badge: "Future-Ready",
        iconType: "stem",
      },
      {
        title: "Excellence Driven",
        desc: "A balanced integration of competitive sports, fine arts, debating, leadership councils, and moral character refining.",
        badge: "All-Round Growth",
        iconType: "excellence",
      },
    ],
  },
  "pre-primary": {
    tagline: "Joyful foundational learning creating lifelong love for discovery, reading, and friendship.",
    description:
      "Our early childhood wing combines Montessori principles with playful inquiry, sensory stations, and storytelling to nurture natural wonder, emotional intelligence, and motor confidence in our youngest learners.",
    stageBanner: {
      title: "Foundational Years (Nursery, LKG, UKG)",
      subtitle: "Ages 3 to 6 · Play, Learn & Grow",
      image: "https://images.unsplash.com/photo-1587691592099-24045742c181?w=1000&h=700&fit=crop&auto=format&q=80",
      features: [
        "Safe, vibrant child-friendly discovery rooms and activity corners",
        "Jolly Phonics, musical rhymes, puppet theatre & creative storytelling",
        "Sensory motor development through indoor tactile play & sand zones",
      ],
    },
    cards: [
      {
        title: "Play-Based Discovery",
        desc: "Montessori-inspired interactive activity zones promoting sensory development, fine motor skills, and creative joy.",
        badge: "Nursery - UKG",
        iconType: "play",
      },
      {
        title: "Foundational Literacy & Phonics",
        desc: "Engaging storytelling, phonetic sounds, multilingual conversational confidence, and social bonding.",
        badge: "Early Years",
        iconType: "phonics",
      },
    ],
  },
  primary: {
    tagline: "Building core competencies in mathematics, science inquiry, expressive language, and civic values.",
    description:
      "Classes I to V transition children into structured learning while keeping curiosity active through interactive projects, mathematics manipulatives, bilingual expression, and daily sports.",
    stageBanner: {
      title: "Primary Wing (Classes I – V)",
      subtitle: "Ages 6 to 11 · Core Competency & Confidence",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&h=700&fit=crop&auto=format&q=80",
      features: [
        "Activity-led conceptual mathematics & Environmental Studies (EVS)",
        "Language lab immersion for fluent English & Hindi reading and writing",
        "Physical education, martial arts, vocal music & visual arts integration",
      ],
    },
    cards: [
      {
        title: "Conceptual Mathematics & Science",
        desc: "Activity-based mathematical reasoning, environmental awareness, and foundational curiosity.",
        badge: "Class I - V",
        iconType: "math",
      },
      {
        title: "Creative Arts & Physical Fitness",
        desc: "Daily sports training, martial arts, vocal music, dance, and creative theatrical expression.",
        badge: "Holistic Core",
        iconType: "arts",
      },
    ],
  },
  middle: {
    tagline: "Sharpening critical thinking, scientific inquiry, digital literacy, and collaborative leadership.",
    description:
      "Classes VI to VIII prepare students for rigorous academic concepts with specialized subject teachers, hands-on lab experiments, coding fundamentals, and inter-house debates.",
    stageBanner: {
      title: "Middle School (Classes VI – VIII)",
      subtitle: "Ages 11 to 14 · Inquiry, Logic & Expression",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&h=700&fit=crop&auto=format&q=80",
      features: [
        "Dedicated Physics, Chemistry, Biology & Computer Science laboratories",
        "Coding, algorithmic thinking & introduction to Artificial Intelligence",
        "Inter-school debating, Model UN & social responsibility outreach",
      ],
    },
    cards: [
      {
        title: "Analytical Science & Technology",
        desc: "Applied physics, chemistry, biology practicals, computer coding, and algorithmic thinking.",
        badge: "Class VI - VIII",
        iconType: "tech",
      },
      {
        title: "Debating & Global Awareness",
        desc: "Model UN, inter-school declamations, history, geography excursions, and social ethics projects.",
        badge: "Leadership Skills",
        iconType: "debate",
      },
    ],
  },
  senior: {
    tagline: "Mastering CBSE Board syllabus alongside structured competitive entrance coaching.",
    description:
      "Classes IX to XII offer rigorous academic streams (Science, Commerce, Arts) backed by experienced mentors, personalized doubt clinics, mock board exams, and career roadmap counseling.",
    stageBanner: {
      title: "Senior Secondary (Classes IX – XII)",
      subtitle: "Ages 14 to 18 · Board Distinction & Entrance Mastery",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1000&h=700&fit=crop&auto=format&q=80",
      features: [
        "Tailored streams: Science (PCM/PCB), Commerce, and Humanities",
        "Integrated test series for CBSE Boards, JEE, NEET, CUET & NDA",
        "One-on-one academic counseling, scholarship aid & university guidance",
      ],
    },
    cards: [
      {
        title: "Board Exam Mastery (Class IX - XII)",
        desc: "Specialized streams in Science, Commerce, and Humanities with rigorous concept drilling and mentorship.",
        badge: "Class IX - XII",
        iconType: "board",
      },
      {
        title: "Competitive Exam Preparation",
        desc: "Dedicated guidance for JEE, NEET, CUET, and NDA along with comprehensive career counseling.",
        badge: "Success Track",
        iconType: "exam",
      },
    ],
  },
};

// World-Class Infrastructure Facilities
const FACILITIES_LIST = [
  {
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=420&fit=crop&auto=format",
    title: "Smart Classrooms",
    desc: "Digital interactive boards, high-speed audio-visual aids, and ergonomically designed seating.",
    tag: "High-Tech",
  },
  {
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=420&fit=crop&auto=format",
    title: "Science & STEM Laboratories",
    desc: "Fully equipped Physics, Chemistry, Biology, and Robotics labs meeting global safety standards.",
    tag: "Practical Lab",
  },
  {
    img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=420&fit=crop&auto=format",
    title: "Library & Digital Knowledge Hub",
    desc: "Over 10,000+ curated volumes, international journals, quiet reading zones, and e-learning terminals.",
    tag: "10,000+ Books",
  },
  {
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=420&fit=crop&auto=format",
    title: "GPS-Enabled Transport",
    desc: "Extensive fleet of secure buses with GPS tracking, CCTV surveillance, and trained female attendants.",
    tag: "Safe Transit",
  },
];

// Student Life / Gallery Images with detailed captions
const GALLERY_ITEMS = [
  {
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=675&fit=crop&auto=format&q=80",
    title: "Interactive Classroom Discussions",
    category: "Academics",
    desc: "Students participating in collaborative peer learning and debate sessions.",
  },
  {
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&h=675&fit=crop&auto=format&q=80",
    title: "Modern Library Research",
    category: "Campus Life",
    desc: "Dedicated silent reading spaces fostering a lifelong passion for books.",
  },
  {
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&h=675&fit=crop&auto=format&q=80",
    title: "Annual STEM & Robotics Fair",
    category: "Innovation",
    desc: "Showcasing student-built electronic models, automated systems, and science projects.",
  },
  {
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=675&fit=crop&auto=format&q=80",
    title: "Cultural & Musical Celebrations",
    category: "Arts & Culture",
    desc: "Vibrant stage performances celebrating India's rich cultural heritage and talent.",
  },
  {
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=675&fit=crop&auto=format&q=80",
    title: "Annual Athletic Meet & Sports Day",
    category: "Sports",
    desc: "Fostering team spirit, resilience, and physical fitness on the championship track.",
  },
  {
    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&h=675&fit=crop&auto=format&q=80",
    title: "Eco-Friendly Green Campus & Labs",
    category: "Environment",
    desc: "Sprawling botanical lawns and scientific inquiry zones inspiring nature stewardship.",
  },
];

// Default 3 Structured Institutional Notice Categories for School Bulletin Board
const INITIAL_NOTICE_CATEGORIES: NoticeCategoryData[] = [
  {
    id: "notices",
    label: "Official Circulars",
    sublabel: "CBSE & Academic Notices",
    badge: "3 Updates",
    items: [
      {
        id: "not-1",
        title: "CBSE Class X & XII Board Exam: Admit Card & Center Protocols",
        date: "12 Mar 2025",
        day: "12",
        month: "MAR",
        tag: "URGENT",
        tagColor: "bg-red-50 text-red-700 border-red-200",
        desc: "Class X & XII admit cards available at Principal Office. Strict 9:30 AM reporting in full school uniform.",
      },
      {
        id: "not-2",
        title: "Annual Final Examination Datesheet (Classes Nursery to IX)",
        date: "25 Feb 2025",
        day: "25",
        month: "FEB",
        tag: "EXAMS",
        tagColor: "bg-amber-50 text-amber-800 border-amber-200",
        desc: "Final promotional examinations commence 15th March. Detailed syllabus blueprints shared with students.",
      },
      {
        id: "not-3",
        title: "Revised Safe Bus Routes & Live GPS Tracking App Access",
        date: "01 Mar 2025",
        day: "01",
        month: "MAR",
        tag: "TRANSPORT",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        desc: "Upgraded bus tracking active for Bagodar, Saria, Suriya, Dumri & Atka via the Parents Mobile App.",
      },
    ],
  },
  {
    id: "announcements",
    label: "Announcements",
    sublabel: "Admissions & Events",
    badge: "Active",
    items: [
      {
        id: "ann-1",
        title: "Admissions Open for Session 2025–26 (Nursery to Class XII)",
        date: "08 Mar 2025",
        day: "08",
        month: "MAR",
        tag: "ADMISSIONS",
        tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        desc: "Phase-II Registration live for all grades. Merit scholarships up to 50% for 90%+ scorers & athletes.",
      },
      {
        id: "ann-2",
        title: "Inter-School Science, Robotics & Mathematical Innovation Fest",
        date: "04 Mar 2025",
        day: "04",
        month: "MAR",
        tag: "EVENT",
        tagColor: "bg-purple-50 text-purple-700 border-purple-200",
        desc: "25+ CBSE schools participating in 120+ working STEM models, robotics displays & quiz competitions.",
      },
      {
        id: "ann-3",
        title: "Annual Sports Championship & Cultural Heritage Meet 2025",
        date: "15 Apr 2025",
        day: "15",
        month: "APR",
        tag: "SPORTS",
        tagColor: "bg-rose-50 text-rose-700 border-rose-200",
        desc: "Athletic track events, martial arts demo, musical choir, and annual prize distribution ceremony.",
      },
    ],
  },
  {
    id: "recruitment",
    label: "Latest Recruitment",
    sublabel: "Faculty & Staff Careers",
    badge: "5 Positions",
    items: [
      {
        id: "rec-1",
        title: "PGT – Physics & Mathematics (Classes XI & XII)",
        date: "30 Apr 2025",
        day: "30",
        month: "APR",
        tag: "CBSE SCALE",
        tagColor: "bg-sky-50 text-sky-800 border-sky-200",
        desc: "M.Sc + B.Ed with 3+ yrs experience. Salary: ₹35k–₹55k/mo + EPF + Staff Bus Transit + Housing Aid.",
      },
      {
        id: "rec-2",
        title: "TGT – English & Social Science (Classes VI to X)",
        date: "30 Apr 2025",
        day: "30",
        month: "APR",
        tag: "FULL TIME",
        tagColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
        desc: "M.A / B.A + B.Ed with fluent English communication. Salary: ₹25k–₹40k/mo + staff bus transit.",
      },
      {
        id: "rec-3",
        title: "PRT Primary Teachers & Sports Coaches",
        date: "15 May 2025",
        day: "15",
        month: "MAY",
        tag: "OPENINGS",
        tagColor: "bg-teal-50 text-teal-800 border-teal-200",
        desc: "Graduation + D.El.Ed / B.P.Ed. Activity-based discovery teaching and sports coaching roles.",
      },
    ],
  },
];

// Helper to render Category Icon
function NoticeCategoryIcon({ id }: { id: string }) {
  if (id === "notices") {
    return (
      <svg className="w-5 h-5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }
  if (id === "announcements") {
    return (
      <svg className="w-5 h-5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

// Default Open Career / Recruitment Positions Data
const INITIAL_RECRUITMENT_POSITIONS: JobPosition[] = [
  {
    id: "pgt-physics-maths",
    title: "PGT – Physics & Mathematics",
    dept: "Senior Secondary (Classes XI & XII)",
    type: "Full Time · Permanent",
    vacancies: "2 Positions",
    experience: "3+ Years in CBSE Senior Secondary School",
    qualification: "M.Sc (Physics / Mathematics) + B.Ed with First Division",
    payScale: "CBSE Scale (₹35,000 – ₹55,000/mo) + EPF + Free Transport + Housing Aid",
    deadline: "30 April 2025",
    location: "Bagodar Campus, Giridih",
    highlights: ["Well-equipped STEM & Physics Lab", "Annual Performance Bonus", "Child Education Fee Waiver"],
    description:
      "Seeking dynamic, concept-oriented subject teachers with proven track record in guiding students for CBSE Board excellence and competitive entrance foundations (JEE/NEET).",
  },
  {
    id: "tgt-english-sst",
    title: "TGT – English & Social Science",
    dept: "Middle & High School (Classes VI to X)",
    type: "Full Time · Permanent",
    vacancies: "3 Positions",
    experience: "2+ Years CBSE Experience",
    qualification: "M.A / B.A (English / History / Political Science) + B.Ed",
    payScale: "CBSE Scale (₹25,000 – ₹40,000/mo) + EPF + Staff Bus",
    deadline: "30 April 2025",
    location: "Bagodar Campus, Giridih",
    highlights: ["Language Lab Access", "Faculty Training by CBSE Resource Persons", "Staff Health Benefits"],
    description:
      "Requires excellent spoken English communication skills, interactive pedagogy, and enthusiasm for literary clubs, debating, and social inquiry.",
  },
  {
    id: "prt-mother-teacher",
    title: "PRT – Primary Mother Teacher (All Subjects)",
    dept: "Primary Wing (Classes I to V)",
    type: "Full Time · Permanent",
    vacancies: "2 Positions",
    experience: "1+ Years experience or fresher with strong credentials",
    qualification: "Graduation + D.El.Ed / NTT / B.Ed with fluent English",
    payScale: "₹20,000 – ₹30,000/mo + EPF + Transport",
    deadline: "15 May 2025",
    location: "Bagodar Campus, Giridih",
    highlights: ["Activity-based discovery rooms", "Supportive mentorship environment"],
    description:
      "Looking for warm, patient, and creative educators who specialize in early child psychology, phonics, storytelling, and experiential arithmetic.",
  },
  {
    id: "sports-coach-instructor",
    title: "Sports Coach & Physical Education Instructor",
    dept: "Sports & Physical Fitness Department",
    type: "Full Time",
    vacancies: "1 Position (Male / Female)",
    experience: "2+ Years or State/National Level Athletic Credentials",
    qualification: "B.P.Ed / M.P.Ed or certified coach in Cricket / Football / Martial Arts",
    payScale: "Attractive Package commensurate with credentials + EPF + Perks",
    deadline: "30 April 2025",
    location: "Bagodar Campus, Giridih",
    highlights: ["Sprawling Multi-Sport Ground", "Inter-School Tournament Leadership"],
    description:
      "To train students in daily fitness drills, athletic sports, martial arts, yoga, and lead school contingents at CBSE cluster tournaments.",
  },
  {
    id: "it-computer-admin",
    title: "Computer Science Teacher & IT Administrator",
    dept: "Computer Science & Digital Infrastructure",
    type: "Full Time",
    vacancies: "1 Position",
    experience: "1–3 Years in Web/Hardware/Python/Scratch teaching",
    qualification: "BCA / MCA / B.Tech (CS/IT) or equivalent",
    payScale: "₹22,000 – ₹35,000/mo + EPF + Subsidized Perks",
    deadline: "15 May 2025",
    location: "Bagodar Campus, Giridih",
    highlights: ["Modern 40+ System High-Speed Lab", "Network & School Software Incharge"],
    description:
      "Responsible for teaching computer basics, Python programming, web essentials, and managing school digital infrastructure, website, and smart class servers.",
  },
];

// Frequently Asked Questions
const FAQS = [
  {
    q: "What is the admission procedure for the 2025–26 academic year?",
    a: "Admissions begin with online or campus registration. Following an interactive evaluation and document verification, selected candidates are granted admission upon fee submission.",
  },
  {
    q: "Which board is Gyanodaya Public School affiliated with?",
    a: "Gyanodaya Public School (GPS Bagodar) is affiliated with the Central Board of Secondary Education (CBSE), New Delhi, adhering to the NCERT national curriculum framework.",
  },
  {
    q: "What is the student-teacher ratio maintained in classrooms?",
    a: "We strictly maintain an optimal 1:20 teacher-student ratio to ensure each student receives individualized mentoring and attention.",
  },
  {
    q: "Are transport facilities available across Bagodar and surrounding regions?",
    a: "Yes, our GPS-enabled, safe bus fleet covers all major routes across Bagodar, Saria, Dumri, Atka, Bishnugarh, and surrounding areas in Giridih district.",
  },
  {
    q: "What extra-curricular and sports activities are provided?",
    a: "We offer sports like cricket, football, basketball, badminton, table tennis, and martial arts, along with music, classical/contemporary dance, robotics, debate, and fine arts.",
  },
];

const INITIAL_SUBMISSIONS: FormSubmissionItem[] = [
  {
    id: "GPS-ADM-8492",
    type: "admission",
    title: "Class XI (Science - PCM) Admission",
    name: "Rahul Kumar Verma",
    phone: "+91 98351 22419",
    email: "verma.rahul2010@gmail.com",
    submittedAt: "10 Mar 2025, 02:45 PM",
    status: "Pending",
    details: {
      "Applying For": "Class XI (Science - PCM with Computer Science)",
      "Gender": "Male",
      "Date of Birth": "14-07-2009",
      "Parent Name": "Suresh Prasad Verma (Govt. Employee)",
      "Mother Name": "Sunita Devi",
      "Address": "Near Bus Stand, Bagodar, Giridih",
      "Previous School": "DAV Public School, 91.4%",
      "School Bus Transport": "Yes (Route: Bagodar - Sariya)",
      "Hostel Facility": "No",
    },
  },
  {
    id: "GPS-VISIT-3104",
    type: "visit",
    title: "Campus Tour & STEM Lab Visit",
    name: "Dr. Ananya Mukherjee",
    phone: "+91 94311 88320",
    email: "ananya.m@aiims.edu",
    submittedAt: "09 Mar 2025, 11:15 AM",
    status: "Reviewed",
    details: {
      "Prospective Grade": "Class VI & Class VIII (2 Children)",
      "Preferred Date": "18 Mar 2025",
      "Time Slot": "Morning Slot: 09:30 AM – 11:30 AM",
      "Visitors Count": "3 Persons",
      "Key Interest Areas": "Robotics Lab, Science Labs, Library, Sports Ground",
      "Notes": "Relocating from Kolkata to Giridih district next month.",
    },
  },
  {
    id: "GPS-ENQ-1940",
    type: "enquiry",
    title: "Hostel & Transport Fee Query",
    name: "Manoj Singh",
    phone: "+91 87094 55123",
    email: "manoj.singh.giridih@yahoo.com",
    submittedAt: "08 Mar 2025, 04:30 PM",
    status: "Contacted",
    details: {
      "Subject": "Fee Structure & Payment Options",
      "Student Grade": "Grade 9",
      "Message": "Would like to know the quarterly fee installment schedule and boarding charges for boy hostel.",
      "Preferred Mode": "WhatsApp / Phone Call",
      "Best Time": "Evening 4 PM - 7 PM",
    },
  },
];

export default function App() {
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataLoadError, setDataLoadError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubNavOpen, setMobileSubNavOpen] = useState<string | null>(null);
  const [useCompactHeader, setUseCompactHeader] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Dynamic School Data with API Persistence
  const [announcements, setAnnouncements] = useState<string[]>(INITIAL_ANNOUNCEMENTS);

  const [noticeCategories, setNoticeCategories] = useState<NoticeCategoryData[]>(INITIAL_NOTICE_CATEGORIES);

  const [recruitmentPositions, setRecruitmentPositions] = useState<JobPosition[]>(INITIAL_RECRUITMENT_POSITIONS);
  const [imageAssets, setImageAssets] = useState<ImageAssetsDocument>(INITIAL_IMAGE_ASSETS);
  const [academicSession, setAcademicSession] = useState("2025–26");

  // Admin Authentication & Modal States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("gps_admin_logged_in") === "true";
    } catch {
      return false;
    }
  });
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<"ticker" | "notices" | "recruitment" | "images" | "submissions" | "settings">("ticker");

  // Admin Login Credentials State
  const [adminUsernameInput, setAdminUsernameInput] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [imageUploadState, setImageUploadState] = useState<Record<string, boolean>>({});
  const [sessionDraft, setSessionDraft] = useState("2025–26");
  const [parentsLoginUrl, setParentsLoginUrl] = useState(DEFAULT_PARENTS_LOGIN_URL);
  const [parentsLoginUrlDraft, setParentsLoginUrlDraft] = useState(DEFAULT_PARENTS_LOGIN_URL);

  // Online Forms & Submissions State
  const [formSubmissions, setFormSubmissions] = useState<FormSubmissionItem[]>(INITIAL_SUBMISSIONS);
  const [activeFormTab, setActiveFormTab] = useState<"admission" | "enquiry" | "visit" | "prospectus">("admission");
  
  // 1. Admission Form State
  const [admissionForm, setAdmissionForm] = useState({
    studentName: "",
    dob: "",
    gender: "Male",
    grade: "Class I",
    stream: "Science (PCM)",
    session: academicSession,
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    phone: "",
    email: "",
    address: "",
    city: "Bagodar, Giridih",
    prevSchool: "",
    prevPercentage: "",
    needTransport: "Yes",
    needHostel: "No",
    remarks: "",
    agreed: true,
  });
  const [admissionSubmitting, setAdmissionSubmitting] = useState(false);

  // 2. General Enquiry Form State
  const [generalEnquiryForm, setGeneralEnquiryForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "Fee Structure & Payment Schedule",
    grade: "Class VI",
    message: "",
    contactMode: "Phone Call",
    bestTime: "Morning (9:00 AM – 12:00 PM)",
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);

  // 3. Campus Visit Form State
  const [campusVisitForm, setCampusVisitForm] = useState({
    visitorName: "",
    phone: "",
    email: "",
    childGrade: "Class VI",
    visitDate: "",
    timeSlot: "Morning Slot (09:30 AM – 11:30 AM)",
    visitorsCount: "2 Persons",
    facilities: ["Smart Classrooms", "Science & STEM Labs", "Library"],
    specialRequests: "",
  });
  const [visitSubmitting, setVisitSubmitting] = useState(false);

  // 4. Prospectus Form State
  const [prospectusForm, setProspectusForm] = useState({
    parentName: "",
    phone: "",
    email: "",
    grade: "Class I – V (Primary)",
  });
  const [prospectusSubmitting, setProspectusSubmitting] = useState(false);

  // Confirmation Success Dialog
  const [submissionSuccessData, setSubmissionSuccessData] = useState<{
    id: string;
    type: string;
    title: string;
    applicantName: string;
    phone: string;
    date: string;
    keyDetails: { label: string; value: string }[];
  } | null>(null);

  // Submissions Admin Filter & Search
  const [submissionsFilter, setSubmissionsFilter] = useState<"all" | "admission" | "enquiry" | "visit" | "prospectus">("all");
  const [submissionsSearch, setSubmissionsSearch] = useState("");

  // Notice Item Form Modal / Editor State
  const [editingCategoryKey, setEditingCategoryKey] = useState<"notices" | "announcements" | "recruitment">("notices");
  const [noticeFormModalOpen, setNoticeFormModalOpen] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeFormData, setNoticeFormData] = useState({
    title: "",
    date: "15 Mar 2025",
    day: "15",
    month: "MAR",
    tag: "URGENT",
    tagTheme: "urgent" as NoticeTagThemeKey,
    desc: "",
  });

  // Announcement Ticker Editor State
  const [newAnnouncementText, setNewAnnouncementText] = useState("");
  const [editingAnnouncementIdx, setEditingAnnouncementIdx] = useState<number | null>(null);
  const [editingAnnouncementText, setEditingAnnouncementText] = useState("");

  // Job Editor State
  const [jobEditorModalOpen, setJobEditorModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobEditorFormData, setJobEditorFormData] = useState<JobPosition>({
    id: "",
    title: "",
    dept: "Senior Secondary",
    type: "Full Time · Permanent",
    vacancies: "1 Position",
    experience: "2+ Years CBSE Experience",
    qualification: "Post-Graduation + B.Ed",
    payScale: "CBSE 7th Pay Matrix + EPF",
    deadline: "30 April 2025",
    location: "Bagodar Campus, Giridih",
    highlights: ["Staff Transport", "EPF Benefits"],
    description: "",
  });

  // Interactive Modals & States
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notice Board & Recruitment Modal State
  const [selectedNotice, setSelectedNotice] = useState<NoticeItemData | null>(null);
  const [selectedNoticeCategory, setSelectedNoticeCategory] = useState<NoticeCategoryData | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [jobForm, setJobForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "PGT – Physics & Mathematics",
    experience: "2-4 Years",
    qualification: "M.Sc / B.Ed",
    notes: "",
  });
  const [jobSubmitted, setJobSubmitted] = useState(false);

  // Form State
  const [enquiryForm, setEnquiryForm] = useState({
    studentName: "",
    grade: "Grade 1 - 5",
    parentName: "",
    phone: "",
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const sliderTimerRef = useRef<number | null>(null);
  const formSubmissionsRef = useRef<FormSubmissionItem[]>(formSubmissions);

  const openNoticeArchive = (categoryId: "notices" | "announcements" | "recruitment") => {
    const category = noticeCategories.find((item) => item.id === categoryId);
    if (!category) {
      return;
    }
    setSelectedNoticeCategory(category);
  };

  useEffect(() => {
    formSubmissionsRef.current = formSubmissions;
  }, [formSubmissions]);

  const persistSiteContent = async (nextContent: SiteContentDocument) => {
    const response = await fetch("/api/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextContent),
    });

    if (!response.ok) {
      throw new Error("Failed to save site content.");
    }

    return (await response.json()) as SiteContentDocument;
  };

  const applySiteContent = (content: SiteContentDocument) => {
    setAcademicSession(content.academicSession || "2025–26");
    setSessionDraft(content.academicSession || "2025–26");
    setParentsLoginUrl(content.parentsLoginUrl || DEFAULT_PARENTS_LOGIN_URL);
    setParentsLoginUrlDraft(content.parentsLoginUrl || DEFAULT_PARENTS_LOGIN_URL);
    setAnnouncements(content.announcements);
    setNoticeCategories(normalizeNoticeCategories(content.noticeCategories));
    setRecruitmentPositions(content.recruitmentPositions);
    setFormSubmissions(content.formSubmissions);
    setImageAssets(content.imageAssets);
    setAdmissionForm((prev) => ({
      ...prev,
      session: content.academicSession || "2025–26",
    }));
  };

  const saveSiteContent = async (nextContent: SiteContentDocument, successMessage?: string) => {
    const savedContent = await persistSiteContent(nextContent);
    applySiteContent(savedContent);
    if (successMessage) {
      showToast(successMessage);
    }
    return savedContent;
  };

  const buildSiteContent = (overrides?: Partial<SiteContentDocument>): SiteContentDocument => ({
    academicSession,
    parentsLoginUrl,
    announcements,
    noticeCategories,
    recruitmentPositions,
    formSubmissions,
    imageAssets,
    ...overrides,
  });

  const saveFormSubmissions = async (
    updater: (current: FormSubmissionItem[]) => FormSubmissionItem[],
    successMessage?: string,
  ) => {
    const nextSubmissions = updater(formSubmissionsRef.current);
    return saveSiteContent(buildSiteContent({ formSubmissions: nextSubmissions }), successMessage);
  };

  const getImageAsset = (collection: keyof ImageAssetsDocument, id: string) => {
    const item = imageAssets[collection].find((asset) => asset.id === id);
    return item || INITIAL_IMAGE_ASSETS[collection].find((asset) => asset.id === id);
  };

  const heroSlides = HERO_SLIDES.map((slide, index) => {
    const asset = getImageAsset("heroSlides", `hero-${index + 1}`);
    return {
      ...slide,
      img: asset?.url || slide.img,
      alt: asset?.alt || slide.headline,
    };
  });
  const safeActiveSlide = heroSlides.length === 0 ? 0 : Math.min(activeSlide, heroSlides.length - 1);
  const currentHeroSlide = heroSlides[safeActiveSlide] || HERO_SLIDES[0];

  const academicCardsData = Object.fromEntries(
    Object.entries(ACADEMICS_CARDS_DATA).map(([key, value]) => {
      const assetId = key === "all" ? "academics-all" : `academics-${key}`;
      const asset = getImageAsset("academicBanners", assetId);
      return [
        key,
        {
          ...value,
          stageBanner: {
            ...value.stageBanner,
            image: asset?.url || value.stageBanner.image,
          },
        },
      ];
    }),
  ) as typeof ACADEMICS_CARDS_DATA;

  const facilitiesList = FACILITIES_LIST.map((facility, index) => {
    const asset = getImageAsset("facilities", `facility-${index + 1}`);
    return {
      ...facility,
      img: asset?.url || facility.img,
    };
  });

  const galleryItems = imageAssets.gallery.map((asset, index) => {
    const fallback = GALLERY_ITEMS[index];
    const cleanTitle = asset.label.replace(/^Gallery\s*-\s*/i, "").trim();

    return {
      img: asset.url,
      title: cleanTitle || fallback?.title || `Gallery Photo ${index + 1}`,
      category: fallback?.category || "Campus Life",
      desc: asset.alt || fallback?.desc || "Moments from Gyanodaya Public School.",
    };
  });

  const aboutCampusImage = getImageAsset("misc", "about-campus");
  const campusSupportImages = imageAssets.misc;

  // Auto-play Hero slider every 5.5 seconds (pauses on hover)
  useEffect(() => {
    if (isHoveringHero) return;
    sliderTimerRef.current = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => {
      if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    };
  }, [heroSlides.length, isHoveringHero]);

  useEffect(() => {
    if (heroSlides.length === 0) {
      if (activeSlide !== 0) {
        setActiveSlide(0);
      }
      return;
    }

    if (activeSlide >= heroSlides.length) {
      setActiveSlide(0);
    }
  }, [activeSlide, heroSlides.length]);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;
    const previousHtmlOverflow = documentElement.style.overflow;

    if (mobileMenuOpen) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      documentElement.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const updateHeaderMode = () => {
      setUseCompactHeader(window.innerWidth < 1680);
    };

    updateHeaderMode();
    window.addEventListener("resize", updateHeaderMode);

    return () => window.removeEventListener("resize", updateHeaderMode);
  }, []);

  // Track scroll position & calculate scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPct = (winScroll / height) * 100;
      setScrollProgress(scrolledPct);
      setScrolled(winScroll > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % galleryItems.length);
        if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  useEffect(() => {
    const loadSiteContent = async () => {
      try {
        const response = await fetch("/api/site-content");
        if (!response.ok) throw new Error("Failed to load site content.");
        const data = (await response.json()) as SiteContentDocument;
        applySiteContent(data);
        setDataLoadError(null);
      } catch (error) {
        setDataLoadError(error instanceof Error ? error.message : "Failed to load site content.");
        showToast("⚠️ Could not connect to gps_school_website. Content editing is disabled until the database is reachable.");
      } finally {
        setIsDataLoading(false);
      }
    };

    void loadSiteContent();
  }, []);

  // URL Hash & Link Listener for Admin Access (#admin, #admin-login, ?admin=true)
  useEffect(() => {
    const checkAdminUrlAccess = () => {
      const hash = window.location.hash.toLowerCase();
      const search = new URLSearchParams(window.location.search);
      const isParamAdmin =
        search.get("admin") === "true" ||
        search.get("admin") === "login" ||
        search.get("admin") === "portal" ||
        search.get("admin") === "dashboard";

      if (
        hash === "#admin" ||
        hash === "#admin-login" ||
        hash === "#admin-portal" ||
        hash === "#admin-dashboard" ||
        hash === "#dashboard" ||
        hash === "#adminlogin" ||
        isParamAdmin
      ) {
        if (isAdminLoggedIn) {
          setAdminDashboardOpen(true);
        } else {
          setAdminLoginModalOpen(true);
        }
      }
    };

    checkAdminUrlAccess();
    window.addEventListener("hashchange", checkAdminUrlAccess);
    window.addEventListener("popstate", checkAdminUrlAccess);

    return () => {
      window.removeEventListener("hashchange", checkAdminUrlAccess);
      window.removeEventListener("popstate", checkAdminUrlAccess);
    };
  }, [isAdminLoggedIn]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateImageAsset = async (collection: keyof ImageAssetsDocument, assetId: string, updates: Partial<ImageAssetItem>) => {
    const nextAssets: ImageAssetsDocument = {
      ...imageAssets,
      [collection]: imageAssets[collection].map((asset) => (asset.id === assetId ? { ...asset, ...updates } : asset)),
    };
    try {
      await saveSiteContent(buildSiteContent({ imageAssets: nextAssets }), "🖼️ Image updated successfully.");
    } catch {
      showToast("⚠️ Image update failed because gps_school_website could not be updated.");
    }
  };

  const handleUploadImageAsset = async (collection: keyof ImageAssetsDocument, assetId: string, file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    setImageUploadState((prev) => ({ ...prev, [assetId]: true }));
    try {
      const response = await fetch("/api/uploads/image", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Upload failed." }));
        throw new Error(errorData.message || "Upload failed.");
      }
      const uploaded = (await response.json()) as UploadedImageResponse;
      await handleUpdateImageAsset(collection, assetId, { url: uploaded.url });
    } catch (error) {
      showToast(error instanceof Error ? `⚠️ ${error.message}` : "⚠️ Image upload failed.");
    } finally {
      setImageUploadState((prev) => ({ ...prev, [assetId]: false }));
    }
  };

  const handleAddGalleryImage = async (file: File) => {
    setImageUploadState((prev) => ({ ...prev, galleryNew: true }));

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/uploads/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Upload failed." }));
        throw new Error(errorData.message || "Upload failed.");
      }

      const uploaded = (await response.json()) as UploadedImageResponse;
      const nextGallery = [
        {
          id: `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          section: "gallery" as const,
          label: `Gallery - ${file.name.replace(/\.[^.]+$/, "") || "New Photo"}`,
          url: uploaded.url,
          alt: file.name.replace(/\.[^.]+$/, "") || "School gallery image",
        },
        ...imageAssets.gallery,
      ];

      await saveSiteContent(buildSiteContent({ imageAssets: { ...imageAssets, gallery: nextGallery } }), "🖼️ New gallery photo added.");
    } catch (error) {
      showToast(error instanceof Error ? `⚠️ ${error.message}` : "⚠️ Gallery upload failed.");
    } finally {
      setImageUploadState((prev) => ({ ...prev, galleryNew: false }));
    }
  };

  const handleDeleteGalleryImage = async (assetId: string) => {
    const nextGallery = imageAssets.gallery.filter((asset) => asset.id !== assetId);

    try {
      await saveSiteContent(buildSiteContent({ imageAssets: { ...imageAssets, gallery: nextGallery } }), "🗑️ Gallery photo removed.");
    } catch {
      showToast("⚠️ Gallery deletion failed because gps_school_website could not be updated.");
    }
  };

  const handleSaveParentsLoginUrl = async () => {
    const nextUrl = parentsLoginUrlDraft.trim();

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

    try {
      await saveSiteContent(buildSiteContent({ parentsLoginUrl: nextUrl }), "🔗 Parents login link updated.");
      setParentsLoginUrl(nextUrl);
      setParentsLoginUrlDraft(nextUrl);
    } catch {
      showToast("⚠️ Parents login link could not be updated in gps_school_website.");
    }
  };

  const handleSaveAcademicSession = async () => {
    const nextSession = sessionDraft.trim();

    if (!nextSession) {
      showToast("⚠️ Academic session cannot be empty.");
      return;
    }

    try {
      await saveSiteContent(buildSiteContent({ academicSession: nextSession }), "📘 Academic session updated.");
      setAcademicSession(nextSession);
      setSessionDraft(nextSession);
      setAdmissionForm((prev) => ({ ...prev, session: nextSession }));
    } catch {
      showToast("⚠️ Academic session could not be updated in gps_school_website.");
    }
  };

  // Online Application & Enquiry Form Submission Handlers
  const handleOnlineAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const submittedAdmissionForm = {
      ...admissionForm,
      studentName: String(formData.get("studentName") || admissionForm.studentName).trim(),
      dob: String(formData.get("dob") || admissionForm.dob),
      gender: String(formData.get("gender") || admissionForm.gender),
      grade: String(formData.get("grade") || admissionForm.grade),
      stream: String(formData.get("stream") || admissionForm.stream),
      fatherName: String(formData.get("fatherName") || admissionForm.fatherName).trim(),
      fatherOccupation: String(formData.get("fatherOccupation") || admissionForm.fatherOccupation).trim(),
      motherName: String(formData.get("motherName") || admissionForm.motherName).trim(),
      phone: String(formData.get("phone") || admissionForm.phone).trim(),
      email: String(formData.get("email") || admissionForm.email).trim(),
      address: String(formData.get("address") || admissionForm.address).trim(),
      city: String(formData.get("city") || admissionForm.city).trim(),
      prevSchool: String(formData.get("prevSchool") || admissionForm.prevSchool).trim(),
      prevPercentage: String(formData.get("prevPercentage") || admissionForm.prevPercentage).trim(),
      needTransport: String(formData.get("needTransport") || admissionForm.needTransport),
      agreed: Boolean(formData.get("agreed")),
    };
    if (!submittedAdmissionForm.studentName || !submittedAdmissionForm.phone || !submittedAdmissionForm.fatherName) {
      showToast("⚠️ Please fill in student name, primary phone, and father/guardian name.");
      return;
    }
    setAdmissionForm(submittedAdmissionForm);
    setAdmissionSubmitting(true);
    setTimeout(() => {
      const refId = `GPS-ADM-${Math.floor(1000 + Math.random() * 9000)}`;
      const streamSuffix =
        submittedAdmissionForm.grade.includes("XI") || submittedAdmissionForm.grade.includes("XII")
          ? ` (${submittedAdmissionForm.stream})`
          : "";

      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "admission",
        title: `${submittedAdmissionForm.grade}${streamSuffix} Admission Application`,
        name: submittedAdmissionForm.studentName,
        phone: submittedAdmissionForm.phone,
        email: submittedAdmissionForm.email || undefined,
        submittedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        status: "Pending",
        details: {
          "Student Name": submittedAdmissionForm.studentName,
          "Applying For": `${submittedAdmissionForm.grade}${streamSuffix}`,
          "Gender": submittedAdmissionForm.gender,
          "Date of Birth": submittedAdmissionForm.dob || "Not specified",
          "Session": submittedAdmissionForm.session,
          "Father/Guardian": `${submittedAdmissionForm.fatherName} (${submittedAdmissionForm.fatherOccupation || "Not specified"})`,
          "Mother Name": submittedAdmissionForm.motherName || "Not specified",
          "Phone / WhatsApp": submittedAdmissionForm.phone,
          "Email": submittedAdmissionForm.email || "Not specified",
          "Residential Address": `${submittedAdmissionForm.address}, ${submittedAdmissionForm.city}`,
          "Previous School": submittedAdmissionForm.prevSchool ? `${submittedAdmissionForm.prevSchool} (Marks: ${submittedAdmissionForm.prevPercentage || "N/A"})` : "New Admission / Pre-Primary",
          "School Bus Transport": submittedAdmissionForm.needTransport,
          "Hostel Facility": submittedAdmissionForm.needHostel,
          "Remarks / Talents": submittedAdmissionForm.remarks.trim() || "None",
        },
      };

      setAdmissionSubmitting(false);

      setSubmissionSuccessData({
        id: refId,
        type: "Online Admission Application",
        title: `Application for ${submittedAdmissionForm.grade}${streamSuffix}`,
        applicantName: submittedAdmissionForm.studentName,
        phone: submittedAdmissionForm.phone,
        date: newSubmission.submittedAt,
        keyDetails: [
          { label: "Reference Number", value: refId },
          { label: "Target Class / Stream", value: `${submittedAdmissionForm.grade}${streamSuffix}` },
          { label: "Parent / Contact", value: `${submittedAdmissionForm.fatherName} (${submittedAdmissionForm.phone})` },
          { label: "School Transport", value: submittedAdmissionForm.needTransport },
          { label: "Next Step", value: "Counselor callback & campus document verification within 24h" },
        ],
      });

      void saveFormSubmissions((current) => [newSubmission, ...current], `🎉 Admission application ${refId} submitted successfully!`).catch(() => {
        showToast("⚠️ Admission submission failed because gps_school_website could not be updated.");
      });
    }, 800);
  };

  const handleGeneralEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const submittedEnquiryForm = {
      ...generalEnquiryForm,
      fullName: String(formData.get("fullName") || generalEnquiryForm.fullName).trim(),
      phone: String(formData.get("phone") || generalEnquiryForm.phone).trim(),
      email: String(formData.get("email") || generalEnquiryForm.email).trim(),
      subject: String(formData.get("subject") || generalEnquiryForm.subject),
      contactMode: String(formData.get("contactMode") || generalEnquiryForm.contactMode),
      message: String(formData.get("message") || generalEnquiryForm.message).trim(),
    };
    if (!submittedEnquiryForm.fullName || !submittedEnquiryForm.phone || !submittedEnquiryForm.message) {
      showToast("⚠️ Please provide full name, contact number, and your message.");
      return;
    }
    setGeneralEnquiryForm(submittedEnquiryForm);
    setEnquirySubmitting(true);
    setTimeout(() => {
      const refId = `GPS-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "enquiry",
        title: submittedEnquiryForm.subject,
        name: submittedEnquiryForm.fullName,
        phone: submittedEnquiryForm.phone,
        email: submittedEnquiryForm.email || undefined,
        submittedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        status: "Pending",
        details: {
          "Inquirer Name": submittedEnquiryForm.fullName,
          "Subject Topic": submittedEnquiryForm.subject,
          "Grade of Interest": submittedEnquiryForm.grade,
          "Contact Number": submittedEnquiryForm.phone,
          "Email Address": submittedEnquiryForm.email || "Not provided",
          "Message": submittedEnquiryForm.message,
          "Preferred Contact Mode": submittedEnquiryForm.contactMode,
          "Best Time to Connect": submittedEnquiryForm.bestTime,
        },
      };

      setEnquirySubmitting(false);

      setSubmissionSuccessData({
        id: refId,
        type: "General & Academic Enquiry",
        title: submittedEnquiryForm.subject,
        applicantName: submittedEnquiryForm.fullName,
        phone: submittedEnquiryForm.phone,
        date: newSubmission.submittedAt,
        keyDetails: [
          { label: "Enquiry ID", value: refId },
          { label: "Enquiry Topic", value: submittedEnquiryForm.subject },
          { label: "Preferred Mode", value: submittedEnquiryForm.contactMode },
          { label: "Preferred Time", value: submittedEnquiryForm.bestTime },
          { label: "Expected Response", value: "Within 2 to 4 working hours by GPS helpdesk" },
        ],
      });

      void saveFormSubmissions((current) => [newSubmission, ...current], `✅ Enquiry ${refId} received! Helpdesk will connect with you.`).catch(() => {
        showToast("⚠️ Enquiry submission failed because gps_school_website could not be updated.");
      });
    }, 700);
  };

  const handleCampusVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const submittedVisitForm = {
      ...campusVisitForm,
      visitorName: String(formData.get("visitorName") || campusVisitForm.visitorName).trim(),
      phone: String(formData.get("phone") || campusVisitForm.phone).trim(),
      email: String(formData.get("email") || campusVisitForm.email).trim(),
      visitDate: String(formData.get("visitDate") || campusVisitForm.visitDate),
      timeSlot: String(formData.get("timeSlot") || campusVisitForm.timeSlot),
      visitorsCount: String(formData.get("visitorsCount") || campusVisitForm.visitorsCount),
      specialRequests: String(formData.get("specialRequests") || campusVisitForm.specialRequests).trim(),
    };
    if (!submittedVisitForm.visitorName || !submittedVisitForm.phone || !submittedVisitForm.visitDate) {
      showToast("⚠️ Please provide visitor name, phone number, and preferred date.");
      return;
    }
    setCampusVisitForm(submittedVisitForm);
    setVisitSubmitting(true);
    setTimeout(() => {
      const refId = `GPS-VISIT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "visit",
        title: `Campus Tour Appointment (${submittedVisitForm.visitDate})`,
        name: submittedVisitForm.visitorName,
        phone: submittedVisitForm.phone,
        email: submittedVisitForm.email || undefined,
        submittedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        status: "Pending",
        details: {
          "Visitor Name": submittedVisitForm.visitorName,
          "Preferred Date": submittedVisitForm.visitDate,
          "Time Slot": submittedVisitForm.timeSlot,
          "Child's Grade": submittedVisitForm.childGrade,
          "Guests Count": submittedVisitForm.visitorsCount,
          "Interest Areas": submittedVisitForm.facilities.join(", ") || "General Campus",
          "Contact Phone": submittedVisitForm.phone,
          "Email": submittedVisitForm.email || "Not provided",
          "Special Requests": submittedVisitForm.specialRequests || "None",
        },
      };

      setVisitSubmitting(false);

      setSubmissionSuccessData({
        id: refId,
        type: "School Campus Tour Appointment Pass",
        title: `Visit Scheduled on ${submittedVisitForm.visitDate}`,
        applicantName: submittedVisitForm.visitorName,
        phone: submittedVisitForm.phone,
        date: newSubmission.submittedAt,
        keyDetails: [
          { label: "Appointment Pass ID", value: refId },
          { label: "Scheduled Date", value: submittedVisitForm.visitDate },
          { label: "Time Window", value: submittedVisitForm.timeSlot },
          { label: "Visitors", value: submittedVisitForm.visitorsCount },
          { label: "Reception Venue", value: "Visitor Lounge, Administrative Block, GPS Main Campus, Bagodar" },
        ],
      });

      void saveFormSubmissions((current) => [newSubmission, ...current], `🏫 Campus visit pass ${refId} created! See you on campus.`).catch(() => {
        showToast("⚠️ Campus visit request failed because gps_school_website could not be updated.");
      });
    }, 700);
  };

  const handleProspectusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const submittedProspectusForm = {
      ...prospectusForm,
      parentName: String(formData.get("parentName") || prospectusForm.parentName).trim(),
      phone: String(formData.get("phone") || prospectusForm.phone).trim(),
      email: String(formData.get("email") || prospectusForm.email).trim(),
      grade: String(formData.get("grade") || prospectusForm.grade),
    };
    if (!submittedProspectusForm.parentName || !submittedProspectusForm.phone) {
      showToast("⚠️ Please provide parent name and contact number.");
      return;
    }
    setProspectusForm(submittedProspectusForm);
    setProspectusSubmitting(true);
    setTimeout(() => {
      const refId = `GPS-DOC-${Math.floor(1000 + Math.random() * 9000)}`;
      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "prospectus",
        title: `Prospectus & Fee Chart Request (${submittedProspectusForm.grade})`,
        name: submittedProspectusForm.parentName,
        phone: submittedProspectusForm.phone,
        email: submittedProspectusForm.email || undefined,
        submittedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        status: "Approved",
        details: {
          "Parent Name": submittedProspectusForm.parentName,
          "Phone / WhatsApp": submittedProspectusForm.phone,
          "Email": submittedProspectusForm.email || "Not provided",
          "Target Wing / Class": submittedProspectusForm.grade,
        },
      };

      setProspectusSubmitting(false);

      void saveFormSubmissions((current) => [newSubmission, ...current], "📄 Prospectus details recorded! Opening admission details...").catch(() => {
        showToast("⚠️ Prospectus request failed because gps_school_website could not be updated.");
      });
      setAdmissionModalOpen(true);
    }, 600);
  };

  const handleUpdateSubmissionStatus = (id: string, newStatus: FormSubmissionItem["status"]) => {
    void saveFormSubmissions(
      (current) => current.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
      `Updated submission ${id} to "${newStatus}"`,
    ).catch(() => {
      showToast("⚠️ Submission status update failed because gps_school_website could not be updated.");
    });
  };

  const handleDeleteSubmission = (id: string) => {
    if (window.confirm("Are you sure you want to delete this submission record?")) {
      void saveFormSubmissions((current) => current.filter((s) => s.id !== id), "Submission record removed.").catch(() => {
        showToast("⚠️ Submission deletion failed because gps_school_website could not be updated.");
      });
    }
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const submittedEnquiryForm = {
      ...enquiryForm,
      studentName: String(formData.get("studentName") || enquiryForm.studentName).trim(),
      grade: String(formData.get("grade") || enquiryForm.grade),
      parentName: String(formData.get("parentName") || enquiryForm.parentName).trim(),
      phone: String(formData.get("phone") || enquiryForm.phone).trim(),
      email: String(formData.get("email") || enquiryForm.email).trim(),
    };

    if (!submittedEnquiryForm.studentName || !submittedEnquiryForm.parentName || !submittedEnquiryForm.phone) {
      showToast("⚠️ Please provide student name, parent name, and phone number.");
      return;
    }

    setEnquiryForm(submittedEnquiryForm);
    setFormSubmitted(true);
    setTimeout(() => {
      const refId = `GPS-ADM-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "admission",
        title: `Admission Enquiry (${submittedEnquiryForm.grade})`,
        name: submittedEnquiryForm.studentName,
        phone: submittedEnquiryForm.phone,
        email: submittedEnquiryForm.email || undefined,
        submittedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        status: "Pending",
        details: {
          "Student Name": submittedEnquiryForm.studentName,
          "Grade Applying For": submittedEnquiryForm.grade,
          "Parent / Guardian Name": submittedEnquiryForm.parentName,
          "Phone Number": submittedEnquiryForm.phone,
          "Email Address": submittedEnquiryForm.email || "Not provided",
          "Session": academicSession,
          "Source": "Admission Enquiry Modal",
        },
      };

      void saveFormSubmissions((current) => [newSubmission, ...current], `🎉 Admission enquiry ${refId} submitted successfully!`).catch(() => {
        showToast("⚠️ Admission enquiry failed because gps_school_website could not be updated.");
      });

      setFormSubmitted(false);
      setAdmissionModalOpen(false);
      setEnquiryForm({ studentName: "", grade: "Grade 1 - 5", parentName: "", phone: "", email: "" });
      showToast("🎉 Thank you! Your admission enquiry has been submitted. Our counselor will contact you shortly.");
    }, 1200);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJobSubmitted(true);
    setTimeout(() => {
      setJobSubmitted(false);
      setJobModalOpen(false);
      showToast(`🎉 Application received for ${jobForm.position}! Our HR panel will review your profile.`);
      setJobForm({
        fullName: "",
        email: "",
        phone: "",
        position: "PGT – Physics & Mathematics",
        experience: "2-4 Years",
        qualification: "M.Sc / B.Ed",
        notes: "",
      });
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast("✨ Subscribed successfully to the Gyanodaya Public School newsletter!");
    setNewsletterEmail("");
  };

  // ==========================================
  // ADMIN PANEL HANDLERS (API PERSISTENCE)
  // ==========================================
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUsernameInput, password: adminPasswordInput }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Invalid username or password." }));
        throw new Error(errorData.message || "Invalid username or password.");
      }

      setIsAdminLoggedIn(true);
      sessionStorage.setItem("gps_admin_logged_in", "true");
      setAdminLoginModalOpen(false);
      setAdminDashboardOpen(true);
      showToast("👑 Welcome Administrator! Management Portal is now active.");
    } catch (error) {
      setAdminLoginError(error instanceof Error ? error.message : "Invalid username or password.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("gps_admin_logged_in");
    setAdminDashboardOpen(false);
    showToast("Logged out of Administrator Portal.");
  };

  // 1. Ticker Announcements Handlers
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementText.trim()) return;
    const updated = [newAnnouncementText.trim(), ...announcements];
    void saveSiteContent(buildSiteContent({ announcements: updated }), "📢 News ticker announcement added live!").catch(() => {
      showToast("⚠️ Announcement creation failed because gps_school_website could not be updated.");
    });
    setNewAnnouncementText("");
  };

  const handleSaveEditedAnnouncement = (index: number) => {
    if (!editingAnnouncementText.trim()) return;
    const updated = [...announcements];
    updated[index] = editingAnnouncementText.trim();
    void saveSiteContent(buildSiteContent({ announcements: updated }), "✅ Announcement updated!").catch(() => {
      showToast("⚠️ Announcement update failed because gps_school_website could not be updated.");
    });
    setEditingAnnouncementIdx(null);
  };

  const handleDeleteAnnouncement = (index: number) => {
    const updated = announcements.filter((_, i) => i !== index);
    void saveSiteContent(buildSiteContent({ announcements: updated }), "🗑️ Announcement removed from ticker.").catch(() => {
      showToast("⚠️ Announcement deletion failed because gps_school_website could not be updated.");
    });
  };

  const handleMoveAnnouncement = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= announcements.length) return;
    const updated = [...announcements];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    void saveSiteContent(buildSiteContent({ announcements: updated })).catch(() => {
      showToast("⚠️ Announcement reorder failed because gps_school_website could not be updated.");
    });
  };

  // 2. Notice Board Items Handlers
  const openAddNoticeModal = (categoryKey: "notices" | "announcements" | "recruitment") => {
    setEditingCategoryKey(categoryKey);
    setEditingNoticeId(null);
    setNoticeFormData({
      title: "",
      date: "15 Mar 2025",
      day: "15",
      month: "MAR",
      tag: categoryKey === "notices" ? "URGENT" : categoryKey === "announcements" ? "ADMISSIONS" : "OPENINGS",
      tagTheme: categoryKey === "notices" ? "urgent" : categoryKey === "announcements" ? "success" : "hiring",
      desc: "",
    });
    setNoticeFormModalOpen(true);
  };

  const openEditNoticeModal = (categoryKey: "notices" | "announcements" | "recruitment", notice: NoticeItemData) => {
    setEditingCategoryKey(categoryKey);
    setEditingNoticeId(notice.id);
    setNoticeFormData({
      title: notice.title,
      date: notice.date,
      day: notice.day,
      month: notice.month,
      tag: notice.tag,
      tagTheme: inferNoticeTagTheme(notice.tag, categoryKey),
      desc: notice.desc,
    });
    setNoticeFormModalOpen(true);
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeFormData.title.trim()) return;

    const updatedCategories = noticeCategories.map((cat) => {
      if (cat.id === editingCategoryKey) {
        if (editingNoticeId) {
          // Edit existing item
          const updatedItems = cat.items.map((item) => {
            if (item.id === editingNoticeId) {
              return {
                ...item,
                title: noticeFormData.title.trim(),
                date: noticeFormData.date.trim(),
                day: noticeFormData.day.trim(),
                month: noticeFormData.month.trim().toUpperCase(),
                tag: noticeFormData.tag.trim().toUpperCase(),
                tagColor: getNoticeTagColor(noticeFormData.tagTheme),
                desc: noticeFormData.desc.trim(),
              };
            }
            return item;
          });
          return { ...cat, items: updatedItems };
        } else {
          // Add new item
          const newItem: NoticeItemData = {
            id: `notice-${Date.now()}`,
            title: noticeFormData.title.trim(),
            date: noticeFormData.date.trim(),
            day: noticeFormData.day.trim(),
            month: noticeFormData.month.trim().toUpperCase(),
            tag: noticeFormData.tag.trim().toUpperCase(),
            tagColor: getNoticeTagColor(noticeFormData.tagTheme),
            desc: noticeFormData.desc.trim(),
          };
          return { ...cat, items: [newItem, ...cat.items] };
        }
      }
      return cat;
    });

    const normalizedCategories = normalizeNoticeCategories(updatedCategories);

    void saveSiteContent(
      buildSiteContent({ noticeCategories: normalizedCategories }),
      editingNoticeId ? "✅ Notice updated successfully!" : "📌 New notice added to Notice Board!",
    ).catch(() => {
      showToast("⚠️ Notice board update failed because gps_school_website could not be updated.");
    });
    setNoticeFormModalOpen(false);
  };

  const handleDeleteNotice = (categoryKey: string, noticeId: string) => {
    const updatedCategories = noticeCategories.map((cat) => {
      if (cat.id === categoryKey) {
        return { ...cat, items: cat.items.filter((item) => item.id !== noticeId) };
      }
      return cat;
    });
    void saveSiteContent(buildSiteContent({ noticeCategories: updatedCategories }), "🗑️ Notice deleted from board.").catch(() => {
      showToast("⚠️ Notice deletion failed because gps_school_website could not be updated.");
    });
  };

  // 3. Recruitment Position Handlers
  const openAddJobModal = () => {
    setEditingJobId(null);
    setJobEditorFormData({
      id: `job-${Date.now()}`,
      title: "",
      dept: "Senior Secondary (Classes XI & XII)",
      type: "Full Time · Permanent",
      vacancies: "1 Position",
      experience: "2+ Years CBSE Experience",
      qualification: "M.Sc / M.A + B.Ed",
      payScale: "CBSE 7th Pay Matrix + EPF + Staff Bus",
      deadline: "30 April 2025",
      location: "Bagodar Campus, Giridih",
      highlights: ["Staff Transport", "EPF Benefits", "Child Fee Subsidy"],
      description: "",
    });
    setJobEditorModalOpen(true);
  };

  const openEditJobModal = (job: JobPosition) => {
    setEditingJobId(job.id);
    setJobEditorFormData({ ...job });
    setJobEditorModalOpen(true);
  };

  const handleSaveJobPosition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobEditorFormData.title.trim()) return;

    let updatedJobs: JobPosition[];
    if (editingJobId) {
      updatedJobs = recruitmentPositions.map((job) =>
        job.id === editingJobId ? { ...jobEditorFormData, title: jobEditorFormData.title.trim() } : job
      );
    } else {
      updatedJobs = [{ ...jobEditorFormData, id: `job-${Date.now()}`, title: jobEditorFormData.title.trim() }, ...recruitmentPositions];
    }

    void saveSiteContent(
      buildSiteContent({ recruitmentPositions: updatedJobs }),
      editingJobId ? "✅ Job opening updated!" : "💼 New Job Vacancy published!",
    ).catch(() => {
      showToast("⚠️ Job vacancy update failed because gps_school_website could not be updated.");
    });
    setJobEditorModalOpen(false);
  };

  const handleDeleteJobPosition = (jobId: string) => {
    const updatedJobs = recruitmentPositions.filter((job) => job.id !== jobId);
    void saveSiteContent(buildSiteContent({ recruitmentPositions: updatedJobs }), "🗑️ Job vacancy removed.").catch(() => {
      showToast("⚠️ Job vacancy deletion failed because gps_school_website could not be updated.");
    });
  };

  // 4. Reset to Default Data
  const handleResetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all News Ticker, Notice Board, and Recruitment data back to factory defaults?")) {
      void saveSiteContent(
        buildSiteContent({
          announcements: INITIAL_ANNOUNCEMENTS,
          noticeCategories: INITIAL_NOTICE_CATEGORIES,
          recruitmentPositions: INITIAL_RECRUITMENT_POSITIONS,
        }),
        "🔄 All data restored to school default values!",
      ).catch(() => {
        showToast("⚠️ Reset failed because gps_school_website could not be updated.");
      });
    }
  };

  if (dataLoadError) {
    return (
      <div className="min-h-screen bg-[#f8f6ef] text-gray-800 flex items-center justify-center px-6">
        <div className="max-w-lg rounded-3xl border border-[#dfb455]/40 bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-semibold text-[#14452f]">Database connection required</h1>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            This website is configured to load content only from the gps_school_website database. The page is blocked until the backend can read that database successfully.
          </p>
          <p className="mt-3 text-xs text-red-700">{dataLoadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#14452f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f3524]"
          >
            Retry database connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased selection:bg-[#c59a3f] selection:text-white pb-16 md:pb-0 overflow-x-hidden w-full max-w-full">

      {/* ======================================================== */}
      {/* 0. INTERACTIVE TOAST NOTIFICATION */}
      {/* ======================================================== */}
      {toastMessage && (
        <div className="fixed top-3 sm:top-5 right-3 sm:right-5 left-3 sm:left-auto z-[130] animate-slide-down bg-[#14452f] text-white px-4 sm:px-5 py-3 rounded-xl shadow-2xl border-2 border-[#dfb455] flex items-center gap-3 text-xs sm:text-sm font-medium max-w-sm sm:max-w-md">
          <span className="text-base sm:text-xl">🔔</span>
          <span className="flex-1">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/70 hover:text-white text-lg font-bold ml-1 cursor-pointer"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. TOP UTILITY HEADER BAR */}
      {/* ======================================================== */}
      <div style={{ backgroundColor: GREEN }} className="text-white text-[11px] sm:text-xs tracking-wide relative z-40 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between gap-x-2 min-w-0">
          {/* Left Contact Details */}
          {/* Left Contact & Location Info */}
          <div className="flex items-center gap-x-2.5 sm:gap-x-4 text-gray-200 truncate min-w-0 flex-1">
            <a
              href="tel:+919431377488"
              className="flex items-center gap-1.5 hover:text-[#dfb455] transition-colors group shrink-0"
              aria-label="Call school office"
            >
              <svg className="w-3.5 h-3.5 text-[#dfb455] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium text-[11px] sm:text-xs">+91 94313 77488</span>
            </a>

            <a
              href="mailto:info@gpsbagodar.edu.in"
              className="hidden sm:flex items-center gap-1.5 hover:text-[#dfb455] transition-colors group truncate text-[11px] sm:text-xs"
            >
              <svg className="w-3.5 h-3.5 text-[#dfb455] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">info@gpsbagodar.edu.in</span>
            </a>

            <span className="hidden 2xl:flex items-center gap-1.5 text-gray-300 text-xs">
              <svg className="w-3.5 h-3.5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Bagodar, Giridih, Jharkhand</span>
            </span>
          </div>

          {/* Right Links & Gold CTA */}
          <div className="flex items-center gap-x-2 sm:gap-x-3 shrink-0">
            {TOP_NAV.map((item) => (
              <a
                key={item.label}
                href={item.label === "Parents Login" ? parentsLoginUrl : item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="hover:text-[#dfb455] transition-colors font-medium text-gray-200 text-xs hidden 2xl:inline-block cursor-pointer"
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={() => setAdmissionModalOpen(true)}
              style={{ backgroundColor: GOLD }}
              className="text-white font-semibold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded hover:brightness-110 transition-all shadow-sm tracking-wider uppercase cursor-pointer hover:scale-105 active:scale-95 animate-pulse-glow"
            >
              ADMISSION OPEN
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1.5. LIVE NEWS & NOTICE TICKER MARQUEE (DYNAMIC STATE) */}
      {/* ======================================================== */}
      <div className="bg-[#0e3322] text-white py-1.5 border-b border-[#1f5f40] overflow-hidden flex items-center text-xs w-full">
        <div className="px-2.5 sm:px-3.5 bg-[#c59a3f] text-[#14452f] font-bold text-[9px] sm:text-[11px] uppercase tracking-wider py-0.5 rounded-r shrink-0 z-10 flex items-center gap-1.5 shadow">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-ping" />
          <span>LATEST NEWS</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap flex-1 relative">
          <div className="animate-marquee flex items-center gap-8 sm:gap-12 font-medium text-gray-200 cursor-pointer text-[10.5px] sm:text-xs">
            {announcements.concat(announcements).map((item, idx) => (
              <span
                key={idx}
                onClick={() => setAdmissionModalOpen(true)}
                className="hover:text-[#dfb455] transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Admin Ticker Edit Shortcut when logged in */}
        {isAdminLoggedIn && (
          <button
            onClick={() => {
              setAdminTab("ticker");
              setAdminDashboardOpen(true);
            }}
            className="hidden md:flex items-center gap-1 px-2.5 py-0.5 bg-[#dfb455] text-[#14452f] text-[10px] font-bold uppercase tracking-wider shrink-0 z-10 ml-2 rounded-l cursor-pointer hover:bg-white transition-colors"
            title="Manage Ticker Items"
          >
            <span>✏️ Edit News</span>
          </button>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN NAVBAR WITH LOGO, PARENTS LOGIN AND SEARCH */}
      {/* ======================================================== */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 w-full ${scrolled ? "shadow-md py-1.5 sm:py-2" : "border-b border-gray-100 py-2 sm:py-2.5"}`}>
        <div className="max-w-[1360px] mx-auto px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          
          {/* Logo & School Name */}
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
            <div className="flex items-center justify-center shrink-0 rounded-full bg-white/90 ring-1 ring-[#14452f]/10 p-1">
              <SchoolLogo className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 group-hover:scale-105 transition-transform duration-300 shrink-0" />
            </div>
            <div className="flex flex-col truncate">
              <span
                style={{ color: GREEN }}
                className="font-serif font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-none tracking-tight group-hover:opacity-90 truncate"
              >
                GYANODAYA
              </span>
              <span
                style={{ color: GREEN }}
                className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase leading-tight mt-0.5 truncate"
              >
                PUBLIC SCHOOL • BAGODAR
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible only when there is enough width for the full nav) */}
          <nav className={`${useCompactHeader ? "hidden" : "flex"} items-center gap-4 2xl:gap-5 min-w-0 flex-1 justify-center`}>
            {MAIN_NAV.map((item) => (
              <div key={item.label} className="relative group/menu py-2">
                <a
                  href={item.href}
                  className={`flex items-center gap-1 text-[13px] font-semibold tracking-wider transition-all py-1 px-1.5 relative whitespace-nowrap ${
                    item.active
                      ? "text-[#14452f] border-b-2 border-[#14452f]"
                      : "text-gray-700 hover:text-[#14452f]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg className="w-3 h-3 text-gray-400 mt-0.5 group-hover/menu:rotate-180 transition-transform duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>

                {/* Dropdown flyout */}
                {item.subItems && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50 animate-slide-down">
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#f0faf5] hover:text-[#14452f] transition-colors"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Icons & Buttons (Search, Parents Login, Enquire, Tablet/Mobile Menu) */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 shrink-0 min-w-0">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search website"
              className="p-1.5 sm:p-2 text-gray-700 hover:text-[#14452f] transition-colors rounded-full hover:bg-gray-100 cursor-pointer shrink-0"
            >
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* PARENTS LOGIN BUTTON - REDIRECTS TO PLAY STORE APP ON ALL SCREEN SIZES */}
            <a
              href={parentsLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 border border-[#14452f] bg-[#f0faf5] hover:bg-[#14452f] text-[#14452f] hover:text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 2xl:px-3 py-1.5 rounded-lg transition-all duration-200 uppercase tracking-[0.08em] sm:tracking-[0.12em] 2xl:tracking-wider cursor-pointer shadow-xs active:scale-95 group shrink-0"
              aria-label="Parents Login Play Store App"
            >
              {/* Google Play / Android Icon */}
              <svg className="w-3.5 h-3.5 text-[#c59a3f] group-hover:text-[#dfb455] transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.793 12 3.61 22.186c-.368-.328-.61-.83-.61-1.426V3.24c0-.596.242-1.098.609-1.426zm11.246 11.248l2.257 2.257-11.83 6.643 9.573-8.9zm0-2.124L5.282 2.038l11.83 6.643-2.257 2.257zm1.487 1.062l3.435 1.932c.708.398.708 1.05 0 1.448l-3.435 1.932-2.115-2.115 2.115-3.197z" />
              </svg>
              <span className="hidden min-[420px]:inline whitespace-nowrap">Parents Login</span>
              <span className="min-[420px]:hidden whitespace-nowrap">Parents</span>
            </a>

            {/* Enquire Button (visible on sm+) */}
            <button
              onClick={() => setAdmissionModalOpen(true)}
              style={{ backgroundColor: GREEN }}
              className={`${useCompactHeader ? "hidden" : "inline-flex"} items-center gap-1.5 text-white text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 2xl:px-3.5 py-1.5 rounded-lg hover:brightness-110 transition-all shadow-sm uppercase tracking-[0.08em] sm:tracking-wider cursor-pointer shrink-0`}
            >
              <span>Enquire</span>
              <svg className="w-3.5 h-3.5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Compact navigation toggle button (visible until the full desktop nav fits comfortably) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              className={`${useCompactHeader ? "flex" : "hidden"} items-center gap-1 p-1.5 sm:p-2 text-gray-700 hover:text-[#14452f] focus:outline-none cursor-pointer rounded-lg hover:bg-gray-100 shrink-0 border border-gray-200`}
            >
              <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider hidden sm:inline text-gray-700">Menu</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE & TABLET SLIDE-IN OVERLAY DRAWER (< xl screens) */}
        {/* ======================================================== */}
        {mobileMenuOpen && (
          <div
            className={`${useCompactHeader ? "flex" : "xl:hidden flex"} fixed inset-0 top-[70px] sm:top-[76px] z-50 bg-[#0b1f15]/55 backdrop-blur-sm justify-end sm:justify-end animate-fade-in`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-full min-[380px]:w-[92vw] sm:w-[24rem] md:w-[25rem] max-w-full h-[calc(100dvh-70px)] sm:h-[calc(100dvh-76px)] max-h-[calc(100dvh-70px)] sm:max-h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain px-3 py-3 pb-4 min-[380px]:px-4 min-[380px]:py-4 sm:px-4 sm:py-4 shadow-2xl border-l border-[#d7e4dc] animate-slide-down flex flex-col gap-3 bg-[linear-gradient(180deg,#fcfdfb_0%,#f4f8f4_100%)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="flex items-start justify-between rounded-[1.25rem] border border-[#dbe7df] bg-white/92 px-3 py-3 shadow-sm min-[380px]:px-3.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="rounded-full bg-[#f4fbf7] p-1.5 ring-1 ring-[#14452f]/10 shrink-0">
                    <SchoolLogo className="w-6 h-6 min-[380px]:w-7 min-[380px]:h-7" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] min-[380px]:text-[10px] font-bold uppercase tracking-[0.2em] text-[#c59a3f]">GPS Bagodar</p>
                    <span className="font-serif font-bold text-[12px] min-[380px]:text-[13px] sm:text-sm text-[#14452f] block truncate">Explore Campus Sections</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">Admissions, academics and contact links in one place.</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 min-[380px]:p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quick Parent Portal Banner in Drawer */}
              <a
                href={parentsLoginUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#f0faf5] border border-[#14452f]/15 rounded-2xl p-3 flex items-center justify-between gap-2.5 cursor-pointer hover:bg-[#e7f5ee] transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#14452f] text-[#dfb455] flex items-center justify-center font-bold text-xs shrink-0">
                    📱
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] min-[380px]:text-[11px] font-bold text-[#14452f] uppercase tracking-[0.12em]">Parents Login App</h4>
                    <p className="text-[9.5px] min-[380px]:text-[10px] text-gray-500 leading-snug">Official GPS mobile app on Play Store</p>
                  </div>
                </div>
                <span className="text-[9.5px] min-[380px]:text-[10px] font-bold text-[#14452f] bg-white px-2 py-1.5 rounded-xl shadow-xs border border-gray-200 whitespace-nowrap shrink-0">Open App ↗</span>
              </a>

              {/* Quick Search */}
              <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2.5 shadow-sm">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search GPS Bagodar..."
                  className="bg-transparent text-[10.5px] min-[380px]:text-[11px] sm:text-xs text-gray-800 w-full focus:outline-none placeholder:text-gray-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      showToast("🔍 Searching school records...");
                      setMobileMenuOpen(false);
                    }
                  }}
                />
              </div>

              {/* Main Navigation Links */}
              <div className="flex flex-col gap-1.5 text-sm font-semibold text-gray-800">
                {MAIN_NAV.map((item) => (
                  <div key={item.label} className="rounded-xl border border-[#dbe7df] bg-white/92 px-2.5 min-[380px]:px-3 py-1 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 pr-2 hover:text-[#14452f] flex-1 text-[10.5px] min-[380px]:text-[11px] sm:text-[12px] tracking-[0.1em] min-[380px]:tracking-[0.12em] uppercase leading-tight"
                      >
                        {item.label}
                      </a>
                      {item.hasDropdown && (
                        <button
                          onClick={() => setMobileSubNavOpen(mobileSubNavOpen === item.label ? null : item.label)}
                          className="p-1.5 text-gray-400 hover:text-[#14452f] cursor-pointer rounded-full hover:bg-[#f4f8f4]"
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${mobileSubNavOpen === item.label ? "rotate-180 text-[#14452f]" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Collapsible Submenu */}
                    {item.subItems && mobileSubNavOpen === item.label && (
                      <div className="pl-3 pr-1 pb-2 flex flex-col gap-1 bg-[#f7faf7] rounded-xl animate-slide-down border border-[#edf3ee]">
                        {item.subItems.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1.5 text-[10.5px] min-[380px]:text-[11px] text-gray-600 hover:text-[#14452f] font-medium leading-snug"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Contact & Action Buttons */}
              <div className="pt-3 mt-auto border-t border-[#dbe7df] flex flex-col gap-2 bg-[linear-gradient(180deg,rgba(244,248,244,0)_0%,rgba(244,248,244,0.92)_18%,rgba(244,248,244,1)_100%)]">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919431377488"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-gray-800 text-[10.5px] min-[380px]:text-[11px] font-semibold hover:bg-gray-50 active:scale-95 border border-[#dbe7df] shadow-sm"
                  >
                    <span>📞 Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/919431377488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[10.5px] min-[380px]:text-[11px] font-semibold hover:bg-emerald-100 active:scale-95 border border-emerald-100 shadow-sm"
                  >
                    <span>💬 WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAdmissionModalOpen(true);
                  }}
                  style={{ backgroundColor: GOLD }}
                  className="w-full text-white font-bold text-[10.5px] min-[380px]:text-[11px] py-3 rounded-2xl text-center uppercase tracking-[0.14em] min-[380px]:tracking-[0.18em] shadow-lg hover:brightness-110 cursor-pointer active:scale-98"
                >
                  Apply for Admission 2025–26
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Expandable Desktop Search Input */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5 transition-all animate-slide-down">
            <div className="max-w-[1240px] mx-auto flex items-center gap-2">
              <input
                type="text"
                placeholder="Search programs, admissions, curriculum, bus routes..."
                className="flex-1 bg-white border border-gray-300 rounded px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] shadow-inner"
                autoFocus
              />
              <button
                onClick={() => {
                  showToast("🔍 Searching school records...");
                  setSearchOpen(false);
                }}
                style={{ backgroundColor: GREEN }}
                className="text-white text-xs px-4 py-2 rounded font-semibold cursor-pointer hover:brightness-110"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* 3. HERO SLIDER SECTION (RESPONSIVE & FLUID) */}
      {/* ======================================================== */}
      <section
        id="home"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
        className="relative w-full overflow-hidden bg-[#0d2e20] min-h-[460px] sm:min-h-[520px] md:min-h-[600px] max-h-[720px]"
        style={{ height: "76vh" }}
      >
        {/* Animated countdown progress bar on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div
            key={safeActiveSlide}
            className="h-full bg-[#dfb455] transition-all duration-[5500ms] ease-linear"
            style={{ width: isHoveringHero ? "100%" : "100%" }}
          />
        </div>

        {/* Dynamic Hero Slide Images with Smooth Crossfade */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              safeActiveSlide === idx ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
            }`}
            style={{ transition: "opacity 1s ease-in-out, transform 8s ease-out" }}
          >
            <img
              src={slide.img}
              alt={slide.alt}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Left Dark Gradient Overlay for optimal readability */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(12,38,25,0.95) 0%, rgba(12,38,25,0.85) 45%, rgba(12,38,25,0.45) 75%, rgba(12,38,25,0.2) 100%)",
          }}
        />

        {/* Carousel Arrow Buttons (visible on sm+) */}
        <button
          onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/60 bg-black/30 hover:bg-black/60 text-white items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-xs shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/60 bg-black/30 hover:bg-black/60 text-white items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-xs shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Dot Indicators */}
        <div className="absolute bottom-14 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/35 px-3 py-1.5 rounded-full backdrop-blur-xs">
          {heroSlides.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setActiveSlide(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                safeActiveSlide === dotIndex ? "w-6 sm:w-7 bg-[#dfb455]" : "w-2 bg-white/50 hover:bg-white/90"
              }`}
            />
          ))}
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 h-full max-w-[1240px] mx-auto px-4 sm:px-8 md:px-10 flex flex-col justify-center pb-8 sm:pb-0">
          <div key={safeActiveSlide} className="max-w-xl animate-fade-in-up">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#dfb455] text-[9.5px] sm:text-xs font-semibold tracking-wider uppercase mb-2.5 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#dfb455] animate-ping" />
              <span>{currentHeroSlide.tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold text-white leading-[1.18] sm:leading-[1.15] mb-2.5 sm:mb-4 drop-shadow-md">
              {currentHeroSlide.headline.split(", ")[0]},
              <br />
              {currentHeroSlide.headline.split(", ")[1] ? (
                <span>
                  {currentHeroSlide.headline.split(", ")[1].split(" ")[0]}{" "}
                  <span style={{ color: GOLD_TEXT }}>
                    {currentHeroSlide.headline.split(", ")[1].split(" ").slice(1).join(" ")}
                  </span>
                </span>
              ) : (
                <span style={{ color: GOLD_TEXT }}>Building Futures</span>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-7 max-w-md font-light line-clamp-3 sm:line-clamp-none">
              {currentHeroSlide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
              <button
                onClick={() => setAdmissionModalOpen(true)}
                style={{ backgroundColor: GOLD }}
                className="text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3.5 rounded flex items-center justify-center gap-1.5 sm:gap-2 hover:brightness-110 transition-all shadow-lg uppercase tracking-wider cursor-pointer hover:scale-105 active:scale-95 animate-pulse-glow"
              >
                <span>ADMISSION OPEN</span>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FIVE FEATURE HIGHLIGHTS (RESPONSIVE GRID) */}
      {/* ======================================================== */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 my-10 sm:my-14">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 overflow-hidden">
          {HIGHLIGHT_CARDS.map((card, cIdx) => (
            <div
              key={card.title}
              className={`p-4 sm:p-5 md:p-6 flex flex-col items-center text-center group hover:bg-[#f9fbf9] transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                cIdx === 4 ? "col-span-2 sm:col-span-1 border-t sm:border-t-0" : ""
              }`}
            >
              <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h2
                style={{ color: GREEN }}
                className="font-semibold text-xs sm:text-sm leading-snug mb-1 group-hover:text-[#c59a3f] transition-colors"
              >
                {card.title}
              </h2>
              <p className="text-gray-500 text-[10.5px] sm:text-xs leading-relaxed max-w-[170px]">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. INSTITUTIONAL NOTICE BOARD (2ND SECTION - 3 CATEGORIES) */}
      {/* ======================================================== */}
      <section
        id="notice-board"
        className="py-14 sm:py-18 bg-gradient-to-b from-[#f2f6f3] via-[#f7faf8] to-white border-b border-gray-200/90 relative overflow-hidden"
      >
        {/* Anchor targets */}
        <div id="notices" className="absolute -top-24" />
        <div id="announcements" className="absolute -top-24" />
        <div id="recruitment" className="absolute -top-24" />
        <div id="career" className="absolute -top-24" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#14452f]/10 text-[#14452f] px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#dfb455] animate-ping" />
              <span>GPS BAGODAR • OFFICIAL NOTICE DESK</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Notice Board &amp; <span className="text-[#14452f] italic font-normal">Latest Updates</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1.5 max-w-lg mx-auto leading-relaxed">
              Access verified CBSE circulars, campus event announcements, and active faculty recruitment notices updated daily.
            </p>
          </div>

          {/* 3 Unified Institutional Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {noticeCategories.map((cat, catIdx) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-lg hover:border-[#14452f]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full"
              >
                {/* Column Header Bar */}
                <div className="bg-[#14452f] p-4 sm:p-4.5 border-b-2 border-[#dfb455] flex items-center justify-between gap-3 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                      <NoticeCategoryIcon id={cat.id} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base sm:text-lg leading-tight tracking-wide text-white">
                        {cat.label}
                      </h3>
                      <div className="text-[11px] text-gray-200/90 font-normal mt-0.5">
                        {cat.sublabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isAdminLoggedIn && (
                      <button
                        onClick={() => openAddNoticeModal(cat.id)}
                        className="bg-white/20 hover:bg-[#dfb455] hover:text-[#14452f] text-white px-2 py-0.5 rounded transition-colors text-[10.5px] font-bold cursor-pointer"
                        title={`Add new notice to ${cat.label}`}
                      >
                        ➕ Add
                      </button>
                    )}
                    <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0 bg-[#dfb455] text-[#14452f]">
                      {cat.badge || `${cat.items.length} Items`}
                    </span>
                  </div>
                </div>

                {/* Notice Items List */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col divide-y divide-gray-100 bg-white">
                  {cat.items.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 text-xs italic">
                      No notices currently posted in this category.
                    </div>
                  ) : (
                    cat.items.map((item, itemIdx) => (
                      <div
                        key={item.id || itemIdx}
                        className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0 group/item cursor-pointer hover:bg-[#f7faf8] rounded-xl p-2 -mx-1 transition-all relative"
                        onClick={() => {
                          if (cat.id === "recruitment") {
                            setSelectedJob(recruitmentPositions[0] || INITIAL_RECRUITMENT_POSITIONS[0]);
                            setJobForm((prev) => ({ ...prev, position: recruitmentPositions[0]?.title || "Teaching Faculty" }));
                            setJobModalOpen(true);
                          } else {
                            setSelectedNotice(item);
                          }
                        }}
                      >
                        {/* Left Date Stamp Badge */}
                        <div className="w-12 sm:w-14 shrink-0 bg-[#f0faf5] border border-[#14452f]/15 rounded-lg py-1.5 px-1 flex flex-col items-center justify-center leading-none text-center group-hover/item:border-[#14452f]/40 transition-colors">
                          <span className="text-xs sm:text-sm font-bold text-[#14452f]">{item.day}</span>
                          <span className="text-[9px] font-bold text-[#c59a3f] uppercase mt-0.5">{item.month}</span>
                        </div>

                        {/* Right Notice Information */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5 mb-1">
                            <span className={`text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.tagColor}`}>
                              {item.tag}
                            </span>
                            <div className="flex items-center gap-1">
                              {isAdminLoggedIn && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditNoticeModal(cat.id, item);
                                  }}
                                  className="text-gray-400 hover:text-[#14452f] text-xs p-0.5"
                                  title="Edit this notice"
                                >
                                  ✏️
                                </button>
                              )}
                              <span className="text-[10px] text-gray-400 font-medium group-hover/item:text-[#14452f] transition-colors shrink-0">
                                Details →
                              </span>
                            </div>
                          </div>

                          <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 group-hover/item:text-[#14452f] transition-colors leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-500 text-[11px] leading-relaxed mt-0.5 line-clamp-2 font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Column Action Footer */}
                <div className="p-3.5 bg-[#f9faf9] border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Verified Desk</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {isAdminLoggedIn && (
                      <button
                        onClick={() => {
                          setAdminTab("notices");
                          setEditingCategoryKey(cat.id);
                          setAdminDashboardOpen(true);
                        }}
                        className="text-[11px] font-bold text-[#14452f] bg-white border border-gray-200 px-2 py-0.5 rounded shadow-2xs hover:bg-[#f0faf5] cursor-pointer"
                      >
                        ⚙️ Manage
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (cat.id === "recruitment") {
                          setSelectedJob(recruitmentPositions[0] || INITIAL_RECRUITMENT_POSITIONS[0]);
                          setJobForm((prev) => ({ ...prev, position: recruitmentPositions[0]?.title || "Faculty" }));
                          setJobModalOpen(true);
                        } else {
                          openNoticeArchive(cat.id);
                        }
                      }}
                      className="text-[#14452f] hover:text-[#c59a3f] font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{cat.id === "recruitment" ? "Apply Online" : "View All"}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. WELCOME TO GYANODAYA PUBLIC SCHOOL (ABOUT SECTION) */}
      {/* ======================================================== */}
      <section id="about" className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Campus Photo */}
          <div className="relative rounded-[1.5rem] overflow-hidden shadow-xl group border border-[#e6ece8] bg-[#f7faf8]">
            <img
              src={aboutCampusImage?.url || "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&h=700&fit=crop&auto=format&q=80"}
              alt={aboutCampusImage?.alt || "Gyanodaya Public School Students and Campus"}
              loading="lazy"
              decoding="async"
              className="w-full h-[300px] sm:h-[400px] md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f15]/55 via-[#0b1f15]/10 to-transparent group-hover:from-[#0b1f15]/62 transition-colors" />
            
            {/* Floating Experience Badge */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-lg border border-gray-100 flex items-center gap-2.5 sm:gap-3">
              <span className="font-serif font-bold text-xl sm:text-2xl text-[#14452f]">20+</span>
              <span className="text-[11px] sm:text-xs text-gray-600 font-medium leading-tight">
                Years of Academic
                <br />
                Distinction &amp; Trust
              </span>
            </div>
          </div>

          {/* Right Text & Stats Content */}
          <div>
            <p
              style={{ color: GOLD }}
              className="text-xs font-bold uppercase tracking-[0.2em] mb-1.5"
            >
              WELCOME TO
            </p>
            <h2
              style={{ color: GREEN }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-5"
            >
              Gyanodaya Public School
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
              Gyanodaya Public School (GPS Bagodar) is a premier co-educational institution in Bagodar, Giridih, Jharkhand, dedicated to developing confident, compassionate and responsible global citizens. We blend rigorous CBSE academic curriculum with character building, digital smart education, and moral values to prepare students for a bright and successful future.
            </p>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 py-3 sm:py-4 mb-6 sm:mb-8 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              {[
                { value: "CBSE", label: "Affiliation" },
                { value: "1:20", label: "Teacher Ratio" },
                { value: "20+", label: "Years of Trust" },
                { value: "100%", label: "Pass Result" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-left p-2 rounded hover:bg-white transition-colors"
                >
                  <div
                    style={{ color: GREEN }}
                    className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Read More CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setAdmissionModalOpen(true)}
                style={{ backgroundColor: GREEN }}
                className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-sm hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer shadow hover:scale-102"
              >
                <span>READ MORE ABOUT US</span>
                <svg className="w-4 h-4 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. ACADEMICS SECTION (BESPOKE EDITORIAL CURRICULUM SHOWCASE) */}
      {/* ======================================================== */}
      <section id="academics" className="py-16 sm:py-24 bg-gradient-to-b from-[#f8faf8] via-white to-[#f4f7f4] border-t border-gray-200/70 relative overflow-hidden">
        {/* Subtle Background Architectural Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#14452f]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#dfb455]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header: Editorial & Balanced */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-gray-200/80 text-center lg:text-left">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#14452f]/8 text-[#14452f] text-[10px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59a3f]" />
                <span>ACADEMIC EXCELLENCE & CURRICULUM</span>
              </div>
              <h2 className="font-serif text-[1.85rem] sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.08] sm:leading-[1.15] max-w-[13ch] sm:max-w-none mx-auto lg:mx-0">
                Nurturing Intellect, <br className="hidden md:inline" />
                <span className="italic font-normal text-[#14452f]">Shaping Leaders of Tomorrow.</span>
              </h2>
            </div>
            
            <p className="text-gray-600 text-[11px] sm:text-sm lg:max-w-md leading-relaxed max-w-[34rem] mx-auto lg:mx-0">
              {(academicCardsData[activeTab] || academicCardsData.all).tagline}
            </p>
          </div>

          {/* Key Academic Metrics Ticker */}
          <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto overscroll-x-contain no-scrollbar [-webkit-overflow-scrolling:touch] pb-2 md:pb-0 mb-8 sm:mb-10 snap-x snap-mandatory">
            {ACADEMIC_HIGHLIGHTS.map((stat, i) => (
              <div
                key={i}
                className="min-w-[9.5rem] md:min-w-0 bg-white/95 backdrop-blur-xs p-3 sm:p-5 rounded-2xl border border-gray-200/70 shadow-xs hover:shadow-md hover:border-[#14452f]/30 transition-all group shrink-0 snap-start"
              >
                <div className="text-xl sm:text-3xl font-serif font-bold text-[#14452f] group-hover:text-[#c59a3f] transition-colors">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-gray-900 mt-1 leading-snug">{stat.label}</div>
                <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>

          {/* Segmented Stage Switcher Pills */}
          <div className="flex items-stretch gap-2.5 overflow-x-auto overscroll-x-contain no-scrollbar [-webkit-overflow-scrolling:touch] pb-3 mb-7 sm:mb-8 px-0.5 sm:px-0 snap-x snap-mandatory">
            {ACADEMIC_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group min-w-[11rem] max-w-[11rem] sm:min-w-[10.5rem] sm:max-w-none md:min-w-0 px-3.5 py-3 sm:px-5 rounded-2xl text-left transition-all cursor-pointer border shrink-0 snap-start ${
                    isActive
                      ? "bg-gradient-to-br from-[#14452f] to-[#1f5a3d] text-white border-[#14452f] shadow-lg shadow-[#14452f]/15"
                      : "bg-white/95 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50/80"
                  }`}
                >
                  <div className={`text-xs sm:text-sm font-bold tracking-normal sm:tracking-wide leading-tight whitespace-normal break-words ${isActive ? "text-white" : "text-gray-900 group-hover:text-[#14452f]"}`}>
                    {tab.label}
                  </div>
                  <div className={`text-[10px] mt-1.5 leading-snug whitespace-normal break-words ${isActive ? "text-[#dfb455]" : "text-gray-500"}`}>
                    {tab.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Academic Content Stage Canvas */}
          {(() => {
            const currentData = academicCardsData[activeTab] || academicCardsData.all;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-stretch">
                
                {/* Stage Feature Overview Showcase (5 columns) */}
                <div className="lg:col-span-5 bg-[#0d2e20] text-white rounded-[1.75rem] overflow-hidden border border-[#1e5038] shadow-xl flex flex-col justify-between relative group">
                  <div className="relative h-52 sm:h-64 overflow-hidden">
                    <img
                      src={currentData.stageBanner.image}
                      alt={currentData.stageBanner.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2e20] via-[#0d2e20]/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/15 text-[9.5px] sm:text-[10.5px] font-semibold tracking-wider text-[#dfb455] uppercase">
                      CBSE Affiliated · GPS Bagodar
                    </div>
                  </div>

                  <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between relative z-10 -mt-5 sm:-mt-6">
                    <div>
                      <h3 className="font-serif text-lg sm:text-2xl font-bold text-white tracking-tight mb-1 leading-tight">
                        {currentData.stageBanner.title}
                      </h3>
                      <p className="text-[#dfb455] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                        {currentData.stageBanner.subtitle}
                      </p>
                      
                      <p className="text-gray-300 text-[11px] sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light">
                        {currentData.description}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-white/10">
                        {currentData.stageBanner.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-[11px] sm:text-xs text-gray-200 leading-snug bg-white/0 rounded-xl">
                            <span className="w-4 h-4 rounded-full bg-[#dfb455]/20 text-[#dfb455] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-white/10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
                      <button
                        onClick={() => setAdmissionModalOpen(true)}
                        style={{ backgroundColor: GOLD }}
                        className="w-full sm:w-auto text-white text-[11px] sm:text-xs font-bold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer shadow-sm active:scale-95"
                      >
                        Apply for Admission
                      </button>
                      <button
                        onClick={() => {
                          window.location.hash = "online-forms";
                        }}
                        className="text-[11px] sm:text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center sm:justify-start gap-1 cursor-pointer transition-colors w-full sm:w-auto"
                      >
                        <span>Schedule Campus Visit</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Structured Subject & Learning Cards (7 columns) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 content-start">
                  {currentData.cards.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-[1.4rem] p-4 sm:p-7 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#14452f]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#f0faf5] border border-[#14452f]/10 flex items-center justify-center text-[#14452f] group-hover:bg-[#14452f] group-hover:text-[#dfb455] transition-colors">
                            <AcademicStageIcon type={item.iconType} className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
                          </div>
                          <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#faf5ea] text-[#976a16] border border-[#dfb455]/40 shrink-0">
                            {item.badge}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-[15px] sm:text-lg text-gray-900 group-hover:text-[#14452f] transition-colors mb-2 leading-snug">
                          {item.title}
                        </h4>

                        <p className="text-gray-600 text-[11px] sm:text-sm leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[10.5px] sm:text-[11px] font-semibold text-[#14452f] gap-3">
                        <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          <span>Explore Syllabus</span>
                          <span>→</span>
                        </span>
                        <span className="text-gray-400 font-normal">GPS Standard</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. FACILITIES (WORLD-CLASS INFRASTRUCTURE) */}
      {/* ======================================================== */}
      <section id="facilities" className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="mb-8 sm:mb-10 text-center sm:text-left">
            <p
              style={{ color: GOLD }}
              className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
            >
              FACILITIES
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              World-Class Infrastructure
            </h2>
          </div>

          {/* 4 Infrastructure Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {facilitiesList.map((fac) => (
              <div
                key={fac.title}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Photo with Tag */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-200">
                  <img
                    src={fac.img}
                    alt={fac.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs font-semibold">
                    {fac.tag}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      style={{ color: GREEN }}
                      className="font-bold text-sm mb-1 font-serif group-hover:text-[#c59a3f] transition-colors"
                    >
                      {fac.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Facilities CTA Button */}
          <div className="text-center">
            <button
              onClick={() => setAdmissionModalOpen(true)}
              style={{ borderColor: "#14452f", color: "#14452f" }}
              className="inline-flex items-center gap-2 border-2 text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-sm hover:bg-[#14452f] hover:text-white transition-all uppercase tracking-wider cursor-pointer hover:scale-105"
            >
              <span>VIEW ALL FACILITIES</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. STUDENT LIFE / GALLERY (INTERACTIVE LIGHTBOX - 6 ITEMS) */}
      {/* ======================================================== */}
      <section id="gallery" className="py-14 sm:py-20 bg-[#f9faf9] border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          
          {/* Header with View Gallery Button */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <p
                style={{ color: GOLD }}
                className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
              >
                STUDENT LIFE
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Learning Beyond Classrooms
              </h2>
            </div>

            <button
              onClick={() => setLightboxIndex(0)}
              style={{ borderColor: "#14452f", color: "#14452f" }}
              className="border-2 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-sm hover:bg-[#14452f] hover:text-white transition-all inline-flex items-center gap-2 uppercase tracking-wider cursor-pointer hover:scale-105"
            >
              <span>OPEN FULL GALLERY</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* 6 Gallery Photos Grid with Clean Responsive Breakpoints */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setLightboxIndex(index)}
                className="relative h-40 sm:h-44 md:h-48 rounded-lg overflow-hidden shadow-sm group cursor-pointer bg-gray-200"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-2.5 sm:p-3 text-white pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] text-[#dfb455] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1">
                    {item.title}
                  </span>
                  <div className="mt-1 flex items-center gap-1 text-[9.5px] sm:text-[10px] text-white/80">
                    <span>Click to zoom</span>
                    <span>🔍</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8.5. FREQUENTLY ASKED QUESTIONS (INTERACTIVE ACCORDION) */}
      {/* ======================================================== */}
      <section id="faqs" className="py-14 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <p
              style={{ color: GOLD }}
              className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
            >
              HAVE QUESTIONS?
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#14452f]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50/70 hover:bg-gray-100 flex items-center justify-between gap-3 sm:gap-4 font-semibold text-xs sm:text-base text-gray-800 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span
                      style={{ color: GREEN }}
                      className={`text-lg font-bold transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-slide-down">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. ADMISSIONS CTA BANNER */}
      {/* ======================================================== */}
      <section id="admissions" style={{ backgroundColor: GREEN }} className="py-8 sm:py-11 border-t border-b border-[#1b583c] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10 text-center md:text-left">
          
          {/* Left: Crest Icon + Text */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            {/* School Emblem Logo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-white/20 shadow-inner animate-float">
              <div className="w-full h-full rounded-full bg-white/95 flex items-center justify-center p-1.5">
                <SchoolLogo className="w-12 h-12 sm:w-15 sm:h-15" />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="flex flex-col md:flex-row items-center gap-y-1 gap-x-6">
              <h3
                style={{ color: GOLD_TEXT }}
                className="font-serif text-lg sm:text-2xl font-bold tracking-tight"
              >
                Admissions Open for
                <br className="sm:hidden" /> Academic Year {academicSession}
              </h3>

              {/* Vertical divider on medium screens */}
              <div className="hidden md:block w-px h-10 bg-white/20" />

              <p className="text-white/80 text-xs sm:text-sm font-light">
                Give your child the best start
                <br className="hidden sm:inline" /> for a bright tomorrow.
              </p>
            </div>
          </div>

          {/* Right Gold Enquire Now Button */}
          <button
            onClick={() => setAdmissionModalOpen(true)}
            style={{ backgroundColor: GOLD }}
            className="w-full sm:w-auto text-white font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 rounded-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all uppercase tracking-wider shadow-xl shrink-0 cursor-pointer hover:scale-105 active:scale-95 animate-pulse-glow"
          >
            <span>ENQUIRE NOW</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9.5. ONLINE FORMS & SERVICES PORTAL */}
      {/* ======================================================== */}
      <section id="online-forms" className="py-16 sm:py-24 bg-gradient-to-b from-[#f8faf8] via-[#f3f7f4] to-white border-t border-gray-200 relative overflow-hidden">
        {/* Background Subtle Institutional Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#14452f_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span
              style={{ color: GOLD }}
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] inline-block mb-2 bg-[#dfb455]/10 px-3 py-1 rounded-full border border-[#dfb455]/30"
            >
              ADMISSIONS, ENQUIRIES & CAMPUS VISITS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mt-1">
              Online Application & Service Forms
            </h2>
            <div className="w-16 h-1 bg-[#14452f] mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
              Complete your student registration, schedule a guided campus tour, or submit an academic enquiry directly to the school administrative cell.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Quick Info & Document Checklist (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Helpline & Hours Card */}
              <div className="bg-[#14452f] text-white p-6 rounded-2xl shadow-xl border-2 border-[#dfb455]/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#dfb455]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0 border border-white/20">
                    📞
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#dfb455]">
                      Admission Helpline
                    </h3>
                    <p className="text-xs text-gray-300">Direct Support & Desk Assistance</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs border-t border-white/15 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Calling Line:</span>
                    <a href="tel:+919431377488" className="font-bold text-white hover:text-[#dfb455]">
                      +91 94313 77488
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">WhatsApp Desk:</span>
                    <a href="https://wa.me/919431377488" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-400 hover:underline">
                      +91 94313 77488
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email:</span>
                    <span className="font-mono text-gray-200 truncate">admissions@gpsbagodar.edu.in</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Desk Hours:</span>
                    <span className="font-medium text-white">Mon–Sat: 8:00 AM – 3:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Documents Checklist Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md">
                <div className="flex items-center gap-2.5 mb-4 text-[#14452f]">
                  <span className="text-lg">📋</span>
                  <h4 className="font-serif font-bold text-sm uppercase tracking-wider">
                    Required Documents Checklist
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs text-gray-600">
                  {[
                    "Original Municipal / Panchayat Birth Certificate",
                    "4 Recent Passport-size Photographs of Student",
                    "2 Passport-size Photographs of Parents / Guardian",
                    "Previous Year Report Card / Marks Sheet (Class II+)",
                    "Original Transfer Certificate (TC) from recognized school",
                    "Copy of Student & Parents Aadhaar Card",
                    "Blood Group & Medical Fitness Certificate",
                  ].map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Campus Location Card */}
              <div className="bg-[#f0faf5] p-5 rounded-2xl border border-[#14452f]/20">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div className="text-xs">
                    <h5 className="font-bold text-[#14452f] mb-1">GPS Bagodar Campus</h5>
                    <p className="text-gray-600 leading-relaxed">
                      National Highway 19 (Grand Trunk Road), Bagodar, Dist: Giridih, Jharkhand – 825322
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Tabbed Interactive Form Portal (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden">
              
              {/* Form Navigation Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100/90 p-1.5 border-b border-gray-200">
                {[
                  { id: "admission", label: "Admission Form" },
                  { id: "enquiry", label: "General Enquiry" },
                  { id: "visit", label: "Campus Visit" },
                  { id: "prospectus", label: "Prospectus" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveFormTab(t.id as any)}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                      activeFormTab === t.id
                        ? "bg-white text-[#14452f] shadow-md border border-gray-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    <span className="truncate">{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Form Content Body */}
              <div className="p-6 sm:p-8">

                {/* FORM 1: ONLINE ADMISSION FORM */}
                {activeFormTab === "admission" && (
                  <form onSubmit={handleOnlineAdmissionSubmit} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14452f]">
                        Student Online Registration (Session {admissionForm.session})
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Apply online for Pre-Primary (Nursery, LKG, UKG), Primary, Middle, Secondary, and Senior Secondary (Science, Commerce, Arts).
                      </p>
                    </div>

                    {/* Section: Student Profile */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        1. Student Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Student Full Name *
                          </label>
                          <input
                            type="text"
                            name="studentName"
                            required
                            value={admissionForm.studentName}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, studentName: e.target.value })}
                            placeholder="e.g. Aryan Kumar Sharma"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Gender *
                          </label>
                          <select
                            name="gender"
                            value={admissionForm.gender}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, gender: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dob"
                            value={admissionForm.dob}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, dob: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Class Applying For *
                          </label>
                          <select
                            name="grade"
                            value={admissionForm.grade}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, grade: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          >
                            <option value="Nursery">Nursery (Play Group)</option>
                            <option value="LKG">LKG (Lower Kindergarten)</option>
                            <option value="UKG">UKG (Upper Kindergarten)</option>
                            <option value="Class I">Class I</option>
                            <option value="Class II">Class II</option>
                            <option value="Class III">Class III</option>
                            <option value="Class IV">Class IV</option>
                            <option value="Class V">Class V</option>
                            <option value="Class VI">Class VI</option>
                            <option value="Class VII">Class VII</option>
                            <option value="Class VIII">Class VIII</option>
                            <option value="Class IX">Class IX</option>
                            <option value="Class X">Class X</option>
                            <option value="Class XI (Senior Secondary)">Class XI (Senior Secondary)</option>
                            <option value="Class XII">Class XII</option>
                          </select>
                        </div>

                        {(admissionForm.grade.includes("XI") || admissionForm.grade.includes("XII")) && (
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Stream Preference
                            </label>
                            <select
                              name="stream"
                              value={admissionForm.stream}
                              onChange={(e) => setAdmissionForm({ ...admissionForm, stream: e.target.value })}
                              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                            >
                              <option value="Science (PCM + CS/PE)">Science (PCM + CS/PE)</option>
                              <option value="Science (PCB + Biotech/PE)">Science (PCB + Biotech/PE)</option>
                              <option value="Commerce (Accounts, Eco, BST, Math/IP)">Commerce (Accounts, Eco, BST, Math/IP)</option>
                              <option value="Humanities / Arts (Hist, Pol Sci, Geog, Eco)">Humanities / Arts (Hist, Pol Sci, Geog, Eco)</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section: Parent Information */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        2. Parent / Guardian Contact Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Father / Guardian Name *
                          </label>
                          <input
                            type="text"
                            name="fatherName"
                            required
                            value={admissionForm.fatherName}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, fatherName: e.target.value })}
                            placeholder="e.g. Ramesh Chandra Sharma"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Father Occupation
                          </label>
                          <input
                            type="text"
                            name="fatherOccupation"
                            value={admissionForm.fatherOccupation}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, fatherOccupation: e.target.value })}
                            placeholder="e.g. Business / Govt Service"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Mother Name
                          </label>
                          <input
                            type="text"
                            name="motherName"
                            value={admissionForm.motherName}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, motherName: e.target.value })}
                            placeholder="e.g. Meena Devi"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Primary Mobile / WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={admissionForm.phone}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                            placeholder="e.g. +91 94313 77488"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={admissionForm.email}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, email: e.target.value })}
                            placeholder="e.g. parent@gmail.com"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            City / Block / District
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={admissionForm.city}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, city: e.target.value })}
                            placeholder="e.g. Bagodar, Giridih"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div className="sm:col-span-2 md:col-span-3">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Residential Address / Village
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={admissionForm.address}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, address: e.target.value })}
                            placeholder="e.g. GT Road, Near SBI Bagodar Branch, Bagodar"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section: Academic Background & Facilities */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        3. Facilities & Previous School
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Previous School Attended (if any)
                          </label>
                          <input
                            type="text"
                            name="prevSchool"
                            value={admissionForm.prevSchool}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, prevSchool: e.target.value })}
                            placeholder="e.g. St. Joseph Convent School"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Previous Grade / %
                          </label>
                          <input
                            type="text"
                            name="prevPercentage"
                            value={admissionForm.prevPercentage}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, prevPercentage: e.target.value })}
                            placeholder="e.g. 88.5% or Grade A"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            School Bus Transport?
                          </label>
                          <select
                            name="needTransport"
                            value={admissionForm.needTransport}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, needTransport: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                          >
                            <option value="Yes">Yes (Bus Route Required)</option>
                            <option value="No">No (Self Conveyance)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Declaration Checkbox */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="admission-agreed"
                        name="agreed"
                        required
                        checked={admissionForm.agreed}
                        onChange={(e) => setAdmissionForm({ ...admissionForm, agreed: e.target.checked })}
                        className="mt-0.5 rounded text-[#14452f] focus:ring-[#14452f] cursor-pointer"
                      />
                      <label htmlFor="admission-agreed" className="cursor-pointer">
                        I hereby declare that all information submitted in this application is true and complete to the best of my knowledge. I agree to comply with the rules and admission policies of Gyanodaya Public School (GPS), Bagodar.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={admissionSubmitting}
                      style={{ backgroundColor: GOLD }}
                      className="w-full text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {admissionSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Registration...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Online Admission Application ↗</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* FORM 2: GENERAL & ACADEMIC ENQUIRY */}
                {activeFormTab === "enquiry" && (
                  <form onSubmit={handleGeneralEnquirySubmit} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14452f]">
                        General & Academic Enquiry
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Have questions about fee structure, bus routes, syllabus, or facilities? Submit your query and our team will get back to you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={generalEnquiryForm.fullName}
                          onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, fullName: e.target.value })}
                          placeholder="Your Full Name"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={generalEnquiryForm.phone}
                          onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, phone: e.target.value })}
                          placeholder="+91 94313 XXXXX"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={generalEnquiryForm.email}
                          onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, email: e.target.value })}
                          placeholder="email@domain.com"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Enquiry Subject / Category *
                        </label>
                        <select
                          name="subject"
                          value={generalEnquiryForm.subject}
                          onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, subject: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        >
                          <option value="Fee Structure & Payment Schedule">Fee Structure & Payment Schedule</option>
                          <option value="Admission Eligibility & Guidelines">Admission Eligibility & Guidelines</option>
                          <option value="School Bus Routes & Transport Details">School Bus Routes & Transport Details</option>
                          <option value="Hostel & Boarding Facilities">Hostel & Boarding Facilities</option>
                          <option value="Academic Curriculum & Board Affiliation">Academic Curriculum & Board Affiliation</option>
                          <option value="Sports & Extra-Curricular Facilities">Sports & Extra-Curricular Facilities</option>
                          <option value="Transfer Certificate (TC) & Bonafide">Transfer Certificate (TC) & Bonafide</option>
                          <option value="Other Questions / Feedback">Other Questions / Feedback</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Preferred Contact Mode
                        </label>
                        <select
                          name="contactMode"
                          value={generalEnquiryForm.contactMode}
                          onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, contactMode: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        >
                          <option value="Phone Call">Phone Call</option>
                          <option value="WhatsApp Message">WhatsApp Message</option>
                          <option value="Email">Email</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 md:col-span-3">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Your Message / Specific Question *
                        </label>
                        <textarea
                          required
                          name="message"
                          rows={4}
                          value={generalEnquiryForm.message}
                          onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, message: e.target.value })}
                          placeholder="Please describe your query in detail..."
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={enquirySubmitting}
                      style={{ backgroundColor: GREEN }}
                      className="w-full text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {enquirySubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry & Request Callback ↗</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* FORM 3: BOOK CAMPUS VISIT & TOUR */}
                {activeFormTab === "visit" && (
                  <form onSubmit={handleCampusVisitSubmit} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14452f]">
                        Schedule a School Campus Tour & Visit
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Visit GPS Bagodar to experience our smart classrooms, STEM robotics labs, sports grounds, and interact with our faculty mentors.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Parent / Visitor Name *
                        </label>
                        <input
                          type="text"
                          name="visitorName"
                          required
                          value={campusVisitForm.visitorName}
                          onChange={(e) => setCampusVisitForm({ ...campusVisitForm, visitorName: e.target.value })}
                          placeholder="Your Full Name"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Contact Mobile / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={campusVisitForm.phone}
                          onChange={(e) => setCampusVisitForm({ ...campusVisitForm, phone: e.target.value })}
                          placeholder="+91 94313 XXXXX"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={campusVisitForm.email}
                          onChange={(e) => setCampusVisitForm({ ...campusVisitForm, email: e.target.value })}
                          placeholder="visitor@gmail.com"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Preferred Visit Date *
                        </label>
                        <input
                          type="date"
                          name="visitDate"
                          required
                          value={campusVisitForm.visitDate}
                          onChange={(e) => setCampusVisitForm({ ...campusVisitForm, visitDate: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Preferred Time Slot
                        </label>
                        <select
                          name="timeSlot"
                          value={campusVisitForm.timeSlot}
                          onChange={(e) => setCampusVisitForm({ ...campusVisitForm, timeSlot: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        >
                          <option value="Morning Slot (09:30 AM – 11:30 AM)">Morning Slot (09:30 AM – 11:30 AM)</option>
                          <option value="Midday Slot (11:45 AM – 01:15 PM)">Midday Slot (11:45 AM – 01:15 PM)</option>
                          <option value="Afternoon Slot (02:00 PM – 03:45 PM)">Afternoon Slot (02:00 PM – 03:45 PM)</option>
                          <option value="Saturday Special (10:00 AM – 01:00 PM)">Saturday Special (10:00 AM – 01:00 PM)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Total Visitors
                        </label>
                        <select
                          name="visitorsCount"
                          value={campusVisitForm.visitorsCount}
                          onChange={(e) => setCampusVisitForm({ ...campusVisitForm, visitorsCount: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        >
                          <option value="1 Person">1 Person</option>
                          <option value="2 Persons (Parents)">2 Persons (Parents)</option>
                          <option value="3 Persons (Parents + Child)">3 Persons (Parents + Child)</option>
                          <option value="4+ Persons (Family)">4+ Persons (Family)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 md:col-span-3">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Special Requirements / Areas of Interest
                        </label>
                        <input
                          type="text"
                          name="specialRequests"
                          value={campusVisitForm.specialRequests}
                          onChange={(e) => setCampusVisitForm({ ...campusVisitForm, specialRequests: e.target.value })}
                          placeholder="e.g. Would like to see the Physics lab, hostel rooms, and meet the Science coordinator"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={visitSubmitting}
                      style={{ backgroundColor: GOLD }}
                      className="w-full text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {visitSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Scheduling Visit...</span>
                        </>
                      ) : (
                        <>
                          <span>Book Guided Campus Visit Pass ↗</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* FORM 4: PROSPECTUS & FEE CHART DOWNLOAD */}
                {activeFormTab === "prospectus" && (
                  <form onSubmit={handleProspectusSubmit} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14452f]">
                        Instant Prospectus & Fee Brochure Request
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Download the comprehensive GPS Bagodar School Prospectus (2025–26) containing curriculum highlights, fee slabs, transport routes, and code of conduct.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Parent / Guardian Name *
                        </label>
                        <input
                          type="text"
                          name="parentName"
                          required
                          value={prospectusForm.parentName}
                          onChange={(e) => setProspectusForm({ ...prospectusForm, parentName: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={prospectusForm.phone}
                          onChange={(e) => setProspectusForm({ ...prospectusForm, phone: e.target.value })}
                          placeholder="+91 94313 XXXXX"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={prospectusForm.email}
                          onChange={(e) => setProspectusForm({ ...prospectusForm, email: e.target.value })}
                          placeholder="your.email@gmail.com"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Target Class / Wing
                        </label>
                        <select
                          name="grade"
                          value={prospectusForm.grade}
                          onChange={(e) => setProspectusForm({ ...prospectusForm, grade: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        >
                          <option value="Pre-Primary (Nursery - UKG)">Pre-Primary (Nursery - UKG)</option>
                          <option value="Class I – V (Primary)">Class I – V (Primary)</option>
                          <option value="Class VI – VIII (Middle Wing)">Class VI – VIII (Middle Wing)</option>
                          <option value="Class IX – X (Secondary)">Class IX – X (Secondary)</option>
                          <option value="Class XI – XII (Senior Secondary Science/Commerce/Arts)">Class XI – XII (Senior Secondary)</option>
                        </select>
                      </div>
                    </div>

                    {/* Features summary */}
                    <div className="bg-[#f0faf5] p-4 rounded-xl border border-[#14452f]/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#14452f]">
                      <div className="flex items-center gap-1.5">
                        <span>📑</span>
                        <span className="font-semibold">Fee Breakdown</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>🚌</span>
                        <span className="font-semibold">Bus Route Map</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>🏆</span>
                        <span className="font-semibold">Scholarship Slabs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>🔬</span>
                        <span className="font-semibold">STEM Labs Info</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={prospectusSubmitting}
                      style={{ backgroundColor: GREEN }}
                      className="w-full text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {prospectusSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Brochure...</span>
                        </>
                      ) : (
                        <>
                          <span>Download GPS Prospectus & Fee Brochure (PDF) 📥</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. FOOTER */}
      {/* ======================================================== */}
      <footer style={{ backgroundColor: "#0e3322" }} className="text-white pt-12 sm:pt-16 pb-8 border-t border-black/20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#dfb455]">
                  Mandatory Disclosure
                </p>
                <h4 className="mt-1 font-serif text-lg sm:text-xl font-bold text-white">
                  School Information & Public Disclosure
                </h4>
              </div>
              <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-gray-300">
                Gyanodaya Public School, Bagodar publishes its mandatory disclosure, admission information, fee details, academic policies, and statutory school information for parents and guardians. For the latest verified records, please contact the school office or request the current disclosure set from the administrative desk.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-8 mb-10 sm:mb-12">
            
            {/* Column 1: School Brand & Description (2 cols on lg) */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-white/95 p-1 ring-1 ring-white/10 shadow-sm shrink-0">
                  <SchoolLogo className="w-12 h-12 sm:w-14 sm:h-14" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg sm:text-xl leading-none tracking-tight text-white">
                    GYANODAYA
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] text-gray-300 font-semibold tracking-[0.2em] uppercase leading-tight mt-0.5">
                    PUBLIC SCHOOL • BAGODAR
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                Nurturing young minds with strong values, academic distinction, digital intelligence, and holistic character building in Bagodar, Giridih, Jharkhand.
              </p>

              {/* Social Media Circular Outline Icons */}
              <div className="flex items-center gap-3">
                {[
                  { name: "Facebook", icon: "f", url: "https://www.facebook.com/GPSBagodar/" },
                  { name: "Instagram", icon: "📷", url: "#" },
                  { name: "YouTube", icon: "▶", url: "#" },
                  { name: "LinkedIn", icon: "in", url: "#" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    onClick={(e) => {
                      if (!social.url.startsWith("http")) {
                        e.preventDefault();
                        showToast(`Opening GPS Bagodar ${social.name} page...`);
                      }
                    }}
                    className="w-8 h-8 rounded-full border border-gray-400/50 hover:border-[#dfb455] text-gray-300 hover:text-[#dfb455] flex items-center justify-center text-xs font-semibold transition-all hover:scale-110 hover:bg-white/10"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                QUICK LINKS
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                {[
                  "Home",
                  "About Us",
                  "Academics",
                  "Facilities",
                  "Admissions",
                  "Gallery",
                  "Contact Us",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-[#dfb455] transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Information */}
            <div>
              <h4 className="text-white font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                INFORMATION
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                {[
                  { label: "Fee Structure", href: "#fee-structure" },
                  { label: "Admission Process", href: "#admissions" },
                  { label: "School Calendar", href: "#calendar" },
                  { label: "News & Events", href: "#news" },
                  { label: "Career & Jobs", href: "#recruitment" },
                  { label: "Parents Login", href: parentsLoginUrl, isExternal: true },
                  { label: isAdminLoggedIn ? "Admin Dashboard" : "Staff & Admin Login", href: "#admin", isAdminTrigger: true },
                ].map((info) => (
                  <li key={info.label}>
                    <a
                      href={info.href}
                      target={info.isExternal ? "_blank" : undefined}
                      rel={info.isExternal ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (info.isAdminTrigger) {
                          e.preventDefault();
                          if (isAdminLoggedIn) setAdminDashboardOpen(true);
                          else setAdminLoginModalOpen(true);
                        } else if (!info.isExternal) {
                          e.preventDefault();
                          setAdmissionModalOpen(true);
                        }
                      }}
                      className="hover:text-[#dfb455] transition-colors inline-block hover:translate-x-1 duration-200 cursor-pointer"
                    >
                      {info.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Us & Newsletter */}
            <div id="contact" className="col-span-2 lg:col-span-1">
              <h4 className="text-white font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                CONTACT US
              </h4>
              <div className="space-y-2.5 text-xs text-gray-300 mb-6">
                <p className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#dfb455] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Bagodar, Giridih District – 825322, Jharkhand, India</span>
                </p>

                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#dfb455] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+919431377488" className="hover:text-[#dfb455] transition-colors">
                    +91 94313 77488
                  </a>
                </p>

                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#dfb455] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@gpsbagodar.edu.in" className="hover:text-[#dfb455] transition-colors">
                    info@gpsbagodar.edu.in
                  </a>
                </p>
              </div>

              {/* Newsletter subscription */}
              <h4 className="text-white font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2">
                NEWSLETTER
              </h4>
              <p className="text-gray-300 text-xs mb-2.5">
                Subscribe for school circulars &amp; notices.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-1.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#dfb455]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="bg-[#c59a3f] hover:bg-[#dfb455] text-white p-2 rounded transition-colors shrink-0 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Copyright and Legal links */}
          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-gray-400 text-center sm:text-left">
            <p>© 2025 Gyanodaya Public School (GPS), Bagodar. Affiliated to CBSE, New Delhi.</p>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:text-gray-200 transition-colors">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#terms" className="hover:text-gray-200 transition-colors">
                Terms &amp; Conditions
              </a>
            </div>
          </div>

          <div className="pt-4 text-center text-[11px] sm:text-xs text-white/70">
            <p>
              Designed and Developed with ❤️{" "}
              <a
                href="https://www.vyntrox.com/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#dfb455] hover:text-white transition-colors"
              >
                Vyntrox
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 11. INTERACTIVE LIGHTBOX MODAL */}
      {/* ======================================================== */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 text-white/80 hover:text-white text-2xl sm:text-3xl font-bold p-2 z-50 cursor-pointer"
          >
            ✕
          </button>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[lightboxIndex].img}
              alt={galleryItems[lightboxIndex].title}
              className="max-h-[68vh] sm:max-h-[72vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-3 sm:mt-4 text-center text-white px-4">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#dfb455] bg-white/10 px-3 py-0.5 sm:py-1 rounded-full">
                {galleryItems[lightboxIndex].category}
              </span>
              <h4 className="font-serif text-base sm:text-xl font-bold mt-1.5 sm:mt-2">
                {galleryItems[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-md">
                {galleryItems[lightboxIndex].desc}
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                {lightboxIndex + 1} of {galleryItems.length}
              </p>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! + 1) % galleryItems.length);
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 12. INTERACTIVE ADMISSIONS ENQUIRY MODAL */}
      {/* ======================================================== */}
      {admissionModalOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setAdmissionModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 sm:p-8 relative border border-gray-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setAdmissionModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5">
              <SchoolLogo className="w-10 h-10" />
              <div>
                <h3 style={{ color: GREEN }} className="font-serif font-bold text-lg sm:text-2xl">
                  Admission Enquiry
                </h3>
                  <p className="text-gray-500 text-xs">
                    Academic Session {academicSession} • Nursery to Class XII
                </p>
              </div>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center animate-scale-in">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h4 className="font-serif font-bold text-xl text-gray-900 mb-1">
                  Enquiry Submitted!
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Our admissions counselor will call you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3 sm:space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Student's Full Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    placeholder="Enter student's name"
                    value={enquiryForm.studentName}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, studentName: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Grade Applying For *
                    </label>
                    <select
                      name="grade"
                      value={enquiryForm.grade}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, grade: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] bg-white"
                    >
                      <option>Pre-Primary (Nursery - UKG)</option>
                      <option>Grade 1 - 5 (Primary)</option>
                      <option>Grade 6 - 8 (Middle)</option>
                      <option>Grade 9 - 10 (Secondary)</option>
                      <option>Grade 11 - 12 (Senior Secondary)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      placeholder="Enter parent's name"
                      value={enquiryForm.parentName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, parentName: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="10-digit mobile number"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="parent@example.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: GOLD }}
                  className="w-full text-white font-bold py-3 rounded text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-md mt-4 cursor-pointer"
                >
                  Submit Admission Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 14. INTERACTIVE BACK TO TOP FLOATING BUTTON */}
      {/* ======================================================== */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-16 sm:bottom-20 md:bottom-6 right-4 sm:right-6 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#14452f] text-[#dfb455] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-[#dfb455] group"
        >
          {/* Circular SVG scroll progress indicator */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke="#dfb455"
              strokeWidth="2"
              strokeDasharray={`${scrollProgress}, 100`}
              className="transition-all duration-150"
            />
          </svg>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* ======================================================== */}
      {/* 15. MOBILE STICKY QUICK ACTION BAR (CONVERSION OPTIMIZED) */}
      {/* ======================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e3322]/98 backdrop-blur-md border-t border-[#1f5f40] px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <a
          href="tel:+919431377488"
          className="flex flex-col items-center justify-center gap-0.5 text-gray-200 hover:text-[#dfb455] py-1 px-2 rounded-lg active:scale-95 transition-transform"
        >
          <svg className="w-4 h-4 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[9.5px] font-medium tracking-tight">Call</span>
        </a>

        <a
          href="https://wa.me/919431377488"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-gray-200 hover:text-emerald-400 py-1 px-2 rounded-lg active:scale-95 transition-transform"
        >
          <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.632.062-.976-.051-.309-.101-.689-.234-1.196-.453-2.144-.925-3.535-3.111-3.642-3.255-.106-.144-.872-1.159-.872-2.212 0-1.053.548-1.57.742-1.785.195-.214.424-.268.566-.268.143 0 .285.002.408.008.131.006.305-.05.477.362.179.428.611 1.488.665 1.595.054.107.089.232.018.375-.071.144-.107.233-.213.357-.107.125-.224.279-.32.375-.107.107-.219.224-.094.438.125.214.556.915 1.193 1.482.82.731 1.512.958 1.726 1.065.214.107.339.089.464-.054.125-.143.536-.625.679-.839.143-.214.286-.179.479-.107.195.071 1.23.58 1.443.687.214.107.357.161.41.25.054.089.054.518-.09.923z" />
          </svg>
          <span className="text-[9.5px] font-medium tracking-tight">WhatsApp</span>
        </a>

        <a
          href={parentsLoginUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-[#dfb455] hover:text-white py-1 px-2 rounded-lg active:scale-95 transition-transform cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#dfb455]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.793 12 3.61 22.186c-.368-.328-.61-.83-.61-1.426V3.24c0-.596.242-1.098.609-1.426zm11.246 11.248l2.257 2.257-11.83 6.643 9.573-8.9zm0-2.124L5.282 2.038l11.83 6.643-2.257 2.257zm1.487 1.062l3.435 1.932c.708.398.708 1.05 0 1.448l-3.435 1.932-2.115-2.115 2.115-3.197z" />
          </svg>
          <span className="text-[9.5px] font-bold tracking-tight">Parents Login</span>
        </a>

        <button
          onClick={() => setAdmissionModalOpen(true)}
          style={{ backgroundColor: GOLD }}
          className="flex items-center gap-1 text-white font-bold text-[10.5px] px-2.5 py-1.5 rounded-md shadow-md active:scale-95 transition-transform cursor-pointer"
        >
          <span>Apply</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 16. OFFICIAL NOTICE CIRCULAR LETTERHEAD MODAL */}
      {/* ======================================================== */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-[125] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative border-2 border-[#14452f]/20 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Official Letterhead Header */}
            <div className="flex items-center gap-3.5 pb-5 border-b-2 border-[#14452f]/30 mb-5">
              <SchoolLogo className="w-12 h-12 sm:w-14 sm:h-14 shrink-0" />
              <div>
                <h3 className="font-serif font-bold text-base sm:text-xl text-[#14452f] leading-tight">
                  GYANODAYA PUBLIC SCHOOL
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-gray-600">
                  Affiliated to CBSE, New Delhi • Bagodar, Giridih District, Jharkhand
                </p>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                  Ref No: <strong>{selectedNotice.refNo}</strong> | Date: <strong>{selectedNotice.date}</strong>
                </p>
              </div>
            </div>

            {/* Notice Title & Priority Badge */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                {selectedNotice.title}
              </h4>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shrink-0 border ${
                  selectedNotice.badgeColor === "red"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : selectedNotice.badgeColor === "emerald"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : selectedNotice.badgeColor === "amber"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {selectedNotice.badge}
              </span>
            </div>

            {/* Notice Body Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#f9faf9] p-4 sm:p-5 rounded-xl border border-gray-200/80 mb-6">
              {selectedNotice.fullDetails.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Signatory & Official Stamp Block */}
            <div className="flex items-end justify-between pt-4 border-t border-gray-200 mb-6 text-xs">
              <div className="text-gray-500">
                <p className="font-semibold text-gray-700">Target Audience:</p>
                <p>{selectedNotice.audience}</p>
              </div>

              <div className="text-right">
                <div className="font-serif font-bold text-sm text-[#14452f]">
                  Office of the Principal
                </div>
                <div className="text-[10.5px] text-gray-500">
                  Gyanodaya Public School, Bagodar
                </div>
                <div className="text-[9px] font-mono text-emerald-700 mt-0.5 font-bold uppercase tracking-wider">
                  ✓ Digitally Verified Circular
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  showToast(`📄 Downloading official circular PDF: ${selectedNotice.refNo}.pdf (${selectedNotice.fileSize || "1.2 MB"})...`);
                  setSelectedNotice(null);
                }}
                style={{ backgroundColor: GREEN }}
                className="w-full sm:w-auto text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <svg className="w-4 h-4 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Official Circular PDF</span>
              </button>

              <button
                onClick={() => setSelectedNotice(null)}
                className="w-full sm:w-auto text-gray-600 hover:text-gray-900 text-xs font-semibold py-2 px-4 cursor-pointer"
              >
                Close Notice
              </button>
            </div>

          </div>
        </div>
      )}

      {selectedNoticeCategory && (
        <div
          className="fixed inset-0 z-[124] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setSelectedNoticeCategory(null)}
        >
          <div
            className="bg-white rounded-[1.75rem] shadow-2xl max-w-4xl w-full border border-[#14452f]/15 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 sm:px-7 py-5 border-b border-[#14452f]/10 bg-gradient-to-r from-[#f7fbf8] via-white to-[#f7fbf8]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#14452f]/8 border border-[#14452f]/12 flex items-center justify-center shrink-0">
                    <NoticeCategoryIcon id={selectedNoticeCategory.id} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#14452f]/70">
                      Verified Desk Archive
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14452f] leading-tight">
                      {selectedNoticeCategory.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedNoticeCategory.sublabel} • {selectedNoticeCategory.items.length} item{selectedNoticeCategory.items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNoticeCategory(null)}
                  className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer shrink-0"
                  aria-label="Close archive"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-110px)] bg-[#fcfdfc]">
              {selectedNoticeCategory.items.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-[#14452f]/15 bg-white px-6 py-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#14452f]/8 border border-[#14452f]/12 flex items-center justify-center mx-auto mb-4">
                    <NoticeCategoryIcon id={selectedNoticeCategory.id} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#14452f]">No items published yet</h4>
                  <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                    This archive is currently empty. New verified updates will appear here as soon as they are published.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {selectedNoticeCategory.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedNoticeCategory(null);
                        setSelectedNotice(item);
                      }}
                      className="w-full text-left rounded-[1.35rem] border border-[#14452f]/10 bg-white p-4 sm:p-5 hover:border-[#14452f]/25 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-14 sm:w-16 shrink-0 bg-[#f0faf5] border border-[#14452f]/15 rounded-xl py-2 px-1 flex flex-col items-center justify-center leading-none text-center">
                          <span className="text-sm sm:text-base font-bold text-[#14452f]">{item.day}</span>
                          <span className="text-[10px] font-bold text-[#c59a3f] uppercase mt-1">{item.month}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.tagColor}`}>
                              {item.tag}
                            </span>
                            <span className="text-xs font-semibold text-[#14452f]">Open details →</span>
                          </div>
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            {item.desc}
                          </p>
                          <p className="text-xs text-gray-400 mt-3 font-medium">
                            Published on {item.date}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 17. CAREER & RECRUITMENT APPLICATION MODAL */}
      {/* ======================================================== */}
      {jobModalOpen && (
        <div
          className="fixed inset-0 z-[125] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setJobModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border border-gray-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setJobModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#f0faf5] text-[#14452f] flex items-center justify-center text-xl font-bold shrink-0">
                💼
              </div>
              <div>
                <h3 style={{ color: GREEN }} className="font-serif font-bold text-lg sm:text-2xl">
                  Job Application
                </h3>
                <p className="text-gray-500 text-xs">
                  Faculty &amp; Staff Recruitment Drive 2025–26 • GPS Bagodar
                </p>
              </div>
            </div>

            {jobSubmitted ? (
              <div className="py-8 text-center animate-scale-in">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h4 className="font-serif font-bold text-xl text-gray-900 mb-1">
                  Application Received!
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Our academic selection committee will review your profile and contact you for demo &amp; interview rounds.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJobSubmit} className="space-y-3 sm:space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Position Applied For *
                  </label>
                  <select
                    value={jobForm.position}
                    onChange={(e) => setJobForm({ ...jobForm, position: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] bg-white font-medium"
                  >
                    {recruitmentPositions.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title}
                      </option>
                    ))}
                    <option value="Other Subject Teacher / Staff">Other Subject Teacher / Admin Staff</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Sharma"
                      value={jobForm.fullName}
                      onChange={(e) => setJobForm({ ...jobForm, fullName: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={jobForm.phone}
                      onChange={(e) => setJobForm({ ...jobForm, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="youremail@example.com"
                      value={jobForm.email}
                      onChange={(e) => setJobForm({ ...jobForm, email: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Total Experience *
                    </label>
                    <select
                      value={jobForm.experience}
                      onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] bg-white"
                    >
                      <option>Fresher / Under 1 Year</option>
                      <option>1 - 3 Years</option>
                      <option>3 - 5 Years</option>
                      <option>5+ Years (Senior Faculty)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Highest Qualification &amp; Specialization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M.Sc (Physics), B.Ed (First Class)"
                    value={jobForm.qualification}
                    onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Key Highlights / Resume Drive Link / Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Provide Google Drive link to Resume/CV or mention subject achievements..."
                    value={jobForm.notes}
                    onChange={(e) => setJobForm({ ...jobForm, notes: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: GOLD }}
                  className="w-full text-white font-bold py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-md mt-2 cursor-pointer active:scale-98"
                >
                  Submit Job Application ↗
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 17.5. FORM SUBMISSION SUCCESS RECEIPT MODAL */}
      {/* ======================================================== */}
      {submissionSuccessData && (
        <div
          className="fixed inset-0 z-[135] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setSubmissionSuccessData(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border-2 border-[#14452f]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSubmissionSuccessData(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 text-3xl font-bold shadow-inner">
                ✓
              </div>
              <span className="bg-[#dfb455]/15 text-[#14452f] text-[10.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#dfb455]/30">
                {submissionSuccessData.type}
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#14452f] mt-2">
                Submission Successful!
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                Your application has been logged into the Gyanodaya Public School registry.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#f0faf5] p-4 rounded-xl border border-[#14452f]/20 mb-6 space-y-2.5 text-xs">
              {submissionSuccessData.keyDetails.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-[#14452f]/10 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-gray-500 font-medium">{item.label}:</span>
                  <span className="font-bold text-[#14452f] text-right font-mono">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  window.print();
                  showToast("🖨️ Opening print dialog for submission receipt...");
                }}
                className="w-full bg-[#14452f] hover:bg-[#1f5f40] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>🖨️ Print / Save Digital Receipt</span>
              </button>
              <button
                onClick={() => setSubmissionSuccessData(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Done & Return to Website
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 18. ADMIN LOGIN SCREEN MODAL */}
      {/* ======================================================== */}
      {adminLoginModalOpen && (
        <div
          className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setAdminLoginModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative border-2 border-[#14452f]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setAdminLoginModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0e3322] text-[#dfb455] flex items-center justify-center mx-auto mb-3 shadow-lg border border-[#dfb455]/40">
                <SchoolLogo className="w-10 h-10" />
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#14452f]">
                Administrator Portal
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                Gyanodaya Public School Management System
              </p>
            </div>

            {/* Error Alert */}
            {adminLoginError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                <span>⚠️</span>
                <span>{adminLoginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                  Admin Username / Email
                </label>
                <input
                  type="text"
                  required
                  value={adminUsernameInput}
                  onChange={(e) => setAdminUsernameInput(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="text-[11px] text-[#14452f] hover:underline font-semibold cursor-pointer"
                  >
                    {showAdminPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showAdminPassword ? "text" : "password"}
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: GREEN }}
                className="w-full text-white font-bold py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-md mt-2 cursor-pointer active:scale-98"
              >
                Sign In to Admin Panel 🔐
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 19. FULL ADMIN MANAGEMENT DASHBOARD MODAL */}
      {/* ======================================================== */}
      {adminDashboardOpen && (
        <div
          className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 lg:p-6 animate-scale-in overflow-y-auto"
          onClick={() => setAdminDashboardOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full min-h-0 flex flex-col overflow-hidden border-2 border-[#14452f]/30 mt-4 sm:mt-8 max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] lg:max-h-[calc(100vh-3rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Admin Header */}
            <div className="bg-[#0e3322] text-white p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b-2 border-[#dfb455]">
              <div className="flex items-center gap-3">
                <SchoolLogo className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif font-bold text-base sm:text-xl text-white">
                      GPS Bagodar Management Console
                    </h3>
                    <span className="bg-[#dfb455] text-[#0e3322] text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Live Admin
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs mt-0.5">
                    Manage notices, forms, recruitment, and website images in real-time
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-stretch lg:self-auto lg:justify-end">
                <button
                  onClick={handleAdminLogout}
                  className="bg-red-900/60 hover:bg-red-800 text-red-200 text-xs px-3 py-1.5 rounded-lg border border-red-700/50 transition-colors cursor-pointer flex-1 sm:flex-none"
                >
                  Logout 🚪
                </button>
                <button
                  onClick={() => setAdminDashboardOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex-1 sm:flex-none"
                >
                  View Live Site ✕
                </button>
              </div>
            </div>

            {/* Admin Tab Navigation */}
            <div className="bg-gray-100 px-3 sm:px-4 pt-3 border-b border-gray-200">
              <div className="flex items-stretch gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-2">
              {[
                { id: "ticker", label: "📢 News Ticker", count: announcements.length },
                { id: "notices", label: "📌 Notice Board", count: noticeCategories.reduce((acc, c) => acc + c.items.length, 0) },
                { id: "images", label: "🖼️ Website Images", count: imageAssets.heroSlides.length + imageAssets.academicBanners.length + imageAssets.facilities.length + imageAssets.gallery.length + campusSupportImages.length },
                { id: "submissions", label: "📥 Forms & Inquiries", count: formSubmissions.length },
                { id: "settings", label: "⚙️ Site Settings", count: null },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAdminTab(t.id as any)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer whitespace-nowrap ${
                    adminTab === t.id
                      ? "bg-white text-[#14452f] shadow-xs border-t-2 border-[#14452f]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                  }`}
                >
                  <span>{t.label}</span>
                  {t.count !== null && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-gray-200 text-gray-700 font-mono">
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
              </div>
            </div>

            {/* Admin Body Content */}
            <div className="p-3 sm:p-5 lg:p-6 overflow-y-auto overscroll-contain flex-1 min-h-0 bg-gray-50/50">

              {/* TAB 1: NEWS TICKER MANAGER */}
              {adminTab === "ticker" && (
                <div className="space-y-5">
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#14452f] mb-2">
                      ➕ Add Live News Announcement
                    </h4>
                    <form onSubmit={handleAddAnnouncement} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={newAnnouncementText}
                        onChange={(e) => setNewAnnouncementText(e.target.value)}
                        placeholder="e.g. 📢 Admissions Open 2025–26 or 🏆 Science Fair winners declared..."
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                      />
                      <button
                        type="submit"
                        style={{ backgroundColor: GREEN }}
                        className="text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all uppercase tracking-wider shrink-0 cursor-pointer shadow-xs"
                      >
                        Publish to Ticker
                      </button>
                    </form>
                    <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-gray-500">
                      <span>Quick Emojis:</span>
                      {["📢", "🏆", "📅", "✨", "🚌", "💼", "🔬", "🎓"].map((em) => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => setNewAnnouncementText((prev) => `${em} ${prev}`)}
                          className="hover:bg-gray-200 p-1 rounded text-xs cursor-pointer"
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Ticker Items List */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-gray-900">
                        Active Ticker Items ({announcements.length})
                      </h4>
                      <span className="text-xs text-gray-500 font-light">Updates reflect instantly across all pages</span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {announcements.map((item, idx) => (
                        <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          {editingAnnouncementIdx === idx ? (
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                type="text"
                                value={editingAnnouncementText}
                                onChange={(e) => setEditingAnnouncementText(e.target.value)}
                                className="flex-1 bg-white border border-[#14452f] rounded-lg px-3 py-1.5 text-xs sm:text-sm focus:outline-none"
                              />
                              <button
                                onClick={() => handleSaveEditedAnnouncement(idx)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingAnnouncementIdx(null)}
                                className="text-gray-500 text-xs px-2 py-1.5 hover:text-gray-700"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                                  {idx + 1}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-800 font-medium truncate">
                                  {item}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                                <button
                                  onClick={() => handleMoveAnnouncement(idx, "up")}
                                  disabled={idx === 0}
                                  className="p-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 text-xs cursor-pointer"
                                  title="Move Up"
                                >
                                  ▲
                                </button>
                                <button
                                  onClick={() => handleMoveAnnouncement(idx, "down")}
                                  disabled={idx === announcements.length - 1}
                                  className="p-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 text-xs cursor-pointer"
                                  title="Move Down"
                                >
                                  ▼
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingAnnouncementIdx(idx);
                                    setEditingAnnouncementText(item);
                                  }}
                                  className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteAnnouncement(idx)}
                                  className="px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold cursor-pointer"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: NOTICE BOARD MANAGER (3 CATEGORIES) */}
              {adminTab === "notices" && (
                <div className="space-y-5">
                  
                  {/* Category Selector Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                      {noticeCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setEditingCategoryKey(cat.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            editingCategoryKey === cat.id
                              ? "bg-[#14452f] text-white shadow-xs"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <NoticeCategoryIcon id={cat.id} />
                          <span>{cat.label}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                            {cat.items.length}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => openAddNoticeModal(editingCategoryKey)}
                      style={{ backgroundColor: GOLD }}
                      className="text-white text-xs font-bold px-4 py-2 rounded-xl hover:brightness-110 transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>➕ Add Notice Item</span>
                    </button>
                  </div>

                  {/* Notices List for Active Category */}
                  {(() => {
                    const currentCategory = noticeCategories.find((c) => c.id === editingCategoryKey) || noticeCategories[0];
                    return (
                      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-xs">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                          <div>
                            <h4 className="font-serif font-bold text-base text-[#14452f]">
                              {currentCategory.label} Items
                            </h4>
                            <p className="text-gray-500 text-xs">{currentCategory.sublabel}</p>
                          </div>
                          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                            {currentCategory.items.length} notices total
                          </span>
                        </div>

                        {currentCategory.items.length === 0 ? (
                          <div className="py-12 text-center text-gray-400 text-xs">
                            <p className="text-2xl mb-2">📭</p>
                            <p>No notices in this category yet. Click "Add Notice Item" above to publish one.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentCategory.items.map((notice) => (
                              <div
                                key={notice.id}
                                className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 flex flex-col justify-between hover:border-[#14452f]/40 transition-all group"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-[10px] font-mono font-bold bg-[#f0faf5] text-[#14452f] px-2 py-0.5 rounded border border-[#14452f]/15">
                                      {notice.day} {notice.month}
                                    </span>
                                    <span className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${notice.tagColor}`}>
                                      {notice.tag}
                                    </span>
                                  </div>

                                  <h5 className="font-serif font-bold text-sm text-gray-900 mb-1 leading-snug">
                                    {notice.title}
                                  </h5>
                                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                                    {notice.desc}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200/60 text-xs">
                                  <span className="text-[10px] text-gray-400 font-mono">ID: {notice.id}</span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => openEditNoticeModal(currentCategory.id, notice)}
                                      className="px-2.5 py-1 rounded-md bg-white border border-gray-300 text-gray-800 text-xs font-semibold hover:bg-gray-100 cursor-pointer"
                                    >
                                      ✏️ Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteNotice(currentCategory.id, notice.id)}
                                      className="px-2.5 py-1 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-semibold hover:bg-red-100 cursor-pointer"
                                    >
                                      🗑️ Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                </div>
              )}

              {adminTab === "images" && (
                <div className="space-y-5">
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="font-serif font-bold text-base text-[#14452f]">Website Image Library</h4>
                  </div>

                  {[
                    { key: "heroSlides", label: "Hero Slides" },
                    { key: "academicBanners", label: "Academic Banners" },
                    { key: "facilities", label: "Facilities" },
                    { key: "gallery", label: "Gallery" },
                    { key: "misc", label: "About Section Photo" },
                  ]
                    .filter((group) => group.key !== "misc" || imageAssets.misc.length > 0)
                    .map((group) => (
                    <div key={group.key} className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div>
                          <h5 className="font-serif font-bold text-sm sm:text-base text-[#14452f]">{group.label}</h5>
                          {group.key === "misc" && (
                            <p className="text-[11px] text-gray-500 mt-1">Use this group for extra campus visuals such as the about-campus image and future supporting sections.</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-mono">
                            {imageAssets[group.key as keyof ImageAssetsDocument].length} items
                          </span>
                          {group.key === "gallery" && (
                            <label className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-[#14452f] text-white text-xs font-bold cursor-pointer hover:bg-[#1f5f40] transition-colors">
                              {imageUploadState.galleryNew ? "Uploading..." : "Add Gallery Photos"}
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                disabled={Boolean(imageUploadState.galleryNew)}
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  files.forEach((file) => {
                                    void handleAddGalleryImage(file);
                                  });
                                  e.currentTarget.value = "";
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {imageAssets[group.key as keyof ImageAssetsDocument].map((asset) => (
                          <div key={asset.id} className="grid grid-cols-1 xl:grid-cols-[180px_minmax(0,1fr)] gap-4 rounded-xl border border-gray-200 p-3.5 bg-gray-50/60">
                            <div className="rounded-lg overflow-hidden bg-gray-200 h-32 xl:h-full min-h-32">
                              <img src={asset.url} alt={asset.alt} className="w-full h-full object-cover" />
                            </div>

                            <div className="space-y-3">
                              <div>
                                <div className="text-sm font-bold text-gray-900">{asset.label}</div>
                                <div className="text-[11px] text-gray-500 font-mono">{asset.id}</div>
                              </div>

                              <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Stored Image URL</div>
                                <div className="mt-1 break-all text-xs text-gray-600">{asset.url}</div>
                              </div>

                              <label className="block">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Alt Text</span>
                                <input
                                  type="text"
                                  value={asset.alt}
                                  onChange={(e) => {
                                    const nextAssets: ImageAssetsDocument = {
                                      ...imageAssets,
                                      [group.key]: imageAssets[group.key as keyof ImageAssetsDocument].map((item) =>
                                        item.id === asset.id ? { ...item, alt: e.target.value } : item,
                                      ),
                                    } as ImageAssetsDocument;
                                    setImageAssets(nextAssets);
                                  }}
                                  onBlur={(e) => {
                                    if (e.target.value.trim() && e.target.value !== asset.alt) {
                                      void handleUpdateImageAsset(group.key as keyof ImageAssetsDocument, asset.id, { alt: e.target.value.trim() });
                                    }
                                  }}
                                  className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                                />
                              </label>

                              {group.key === "gallery" && (
                                <label className="block">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Photo Title</span>
                                  <input
                                    type="text"
                                    value={asset.label}
                                    onChange={(e) => {
                                      const nextAssets: ImageAssetsDocument = {
                                        ...imageAssets,
                                        [group.key]: imageAssets[group.key as keyof ImageAssetsDocument].map((item) =>
                                          item.id === asset.id ? { ...item, label: e.target.value } : item,
                                        ),
                                      } as ImageAssetsDocument;
                                      setImageAssets(nextAssets);
                                    }}
                                    onBlur={(e) => {
                                      if (e.target.value.trim() && e.target.value !== asset.label) {
                                        void handleUpdateImageAsset(group.key as keyof ImageAssetsDocument, asset.id, { label: e.target.value.trim() });
                                      }
                                    }}
                                    className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                                  />
                                </label>
                              )}

                              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                                <label className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-[#14452f] text-white text-xs font-bold cursor-pointer hover:bg-[#1f5f40] transition-colors">
                                  {imageUploadState[asset.id] ? "Uploading..." : "Select Image"}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={Boolean(imageUploadState[asset.id])}
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        void handleUploadImageAsset(group.key as keyof ImageAssetsDocument, asset.id, file);
                                      }
                                      e.currentTarget.value = "";
                                    }}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => void handleUpdateImageAsset(group.key as keyof ImageAssetsDocument, asset.id, { alt: asset.alt.trim(), label: asset.label.trim() })}
                                  className="px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
                                >
                                  Save Changes
                                </button>
                                {group.key === "gallery" && (
                                  <button
                                    type="button"
                                    onClick={() => void handleDeleteGalleryImage(asset.id)}
                                    className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer"
                                  >
                                    Delete Photo
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: FORMS & INQUIRIES SUBMISSIONS MANAGER */}
              {adminTab === "submissions" && (
                <div className="space-y-5">
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#14452f] flex items-center gap-2">
                        <span>📥 Online Form Submissions & Inquiries</span>
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-mono">
                          {formSubmissions.length} Total Records
                        </span>
                      </h4>
                      <p className="text-gray-500 text-xs mt-0.5">
                        Manage admission registrations, campus visit appointments, general inquiries, and brochure requests.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <input
                        type="text"
                        placeholder="Search by name, phone, or ID..."
                        value={submissionsSearch}
                        onChange={(e) => setSubmissionsSearch(e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#14452f] flex-1 md:w-56"
                      />
                      <button
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(formSubmissions, null, 2)], { type: "application/json" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `gps-form-submissions-${new Date().toISOString().split("T")[0]}.json`;
                          a.click();
                          URL.revokeObjectURL(url);
                          showToast("📥 Exported submissions to JSON!");
                        }}
                        className="bg-[#14452f] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#1f5f40] transition-colors cursor-pointer shrink-0"
                      >
                        Export JSON ↗
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
                    {[
                      { id: "all", label: "All Submissions" },
                      { id: "admission", label: "📝 Admissions" },
                      { id: "enquiry", label: "💬 Enquiries" },
                      { id: "visit", label: "🏫 Campus Visits" },
                      { id: "prospectus", label: "📥 Prospectus" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSubmissionsFilter(f.id as any)}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                          submissionsFilter === f.id
                            ? "bg-[#14452f] text-white font-bold shadow-xs"
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Submissions List */}
                  <div className="space-y-3">
                    {formSubmissions
                      .filter((item) => submissionsFilter === "all" || item.type === submissionsFilter)
                      .filter((item) => {
                        if (!submissionsSearch.trim()) return true;
                        const query = submissionsSearch.toLowerCase();
                        return (
                          item.name.toLowerCase().includes(query) ||
                          item.phone.includes(query) ||
                          item.id.toLowerCase().includes(query) ||
                          item.title.toLowerCase().includes(query)
                        );
                      })
                      .map((sub) => (
                        <div key={sub.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-xs hover:border-[#14452f]/40 transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-100">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-mono text-xs font-bold text-[#14452f] bg-[#f0faf5] px-2.5 py-0.5 rounded border border-[#14452f]/20">
                                {sub.id}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  sub.type === "admission"
                                    ? "bg-amber-100 text-amber-800"
                                    : sub.type === "visit"
                                    ? "bg-blue-100 text-blue-800"
                                    : sub.type === "enquiry"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {sub.type}
                              </span>
                              <span className="text-xs text-gray-400">🕒 {sub.submittedAt}</span>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <span className="text-xs text-gray-500 font-semibold">Status:</span>
                              <select
                                value={sub.status}
                                onChange={(e) => handleUpdateSubmissionStatus(sub.id, e.target.value as any)}
                                className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                  sub.status === "Approved"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : sub.status === "Contacted"
                                    ? "bg-blue-50 text-blue-800 border-blue-300"
                                    : sub.status === "Reviewed"
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : "bg-gray-50 text-gray-700 border-gray-300"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Reviewed">Reviewed</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Approved">Approved</option>
                              </select>
                              <button
                                onClick={() => handleDeleteSubmission(sub.id)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                                title="Delete submission"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>

                          <div className="mb-3">
                            <h5 className="font-serif font-bold text-sm sm:text-base text-gray-900">
                              {sub.title}
                            </h5>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-1">
                              <span><strong>Applicant:</strong> {sub.name}</span>
                              <span><strong>Phone:</strong> <a href={`tel:${sub.phone}`} className="text-[#14452f] hover:underline font-mono">{sub.phone}</a></span>
                              {sub.email && <span><strong>Email:</strong> {sub.email}</span>}
                            </div>
                          </div>

                          {/* Submission Details Grid */}
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/70 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              {Object.entries(sub.details).map(([key, val]) => (
                                <div key={key}>
                                  <span className="text-gray-400 block text-[10px] uppercase font-bold">{key}</span>
                                  <span className="font-medium text-gray-800">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                    {formSubmissions.length === 0 && (
                      <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                        <span className="text-3xl">📭</span>
                        <p className="text-gray-500 text-xs mt-2">No form submissions received yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: SETTINGS, RESET & BACKUP */}
              {adminTab === "settings" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#14452f] mb-1">📘 Academic Session</h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                            Update the live academic session used in admission banners, forms, and admin-managed content.
                          </p>
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#f0faf5] text-[#14452f] border border-[#14452f]/15">
                          Live: {academicSession}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          value={sessionDraft}
                          onChange={(e) => setSessionDraft(e.target.value)}
                          placeholder="e.g. 2026–27"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => void handleSaveAcademicSession()}
                          className="bg-[#14452f] hover:bg-[#1f5f40] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                        >
                          Save Session
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#14452f] mb-1">🔗 Parents Login Link</h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                            Update the live Parents Login button URL used in the header, mobile menu, and quick access cards.
                          </p>
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#f0faf5] text-[#14452f] border border-[#14452f]/15 max-w-full truncate">
                          Live URL
                        </span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <input
                          type="url"
                          value={parentsLoginUrlDraft}
                          onChange={(e) => setParentsLoginUrlDraft(e.target.value)}
                          placeholder="https://example.com/parents-login"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
                        />
                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                          <a
                            href={parentsLoginUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#14452f] underline underline-offset-2 break-all"
                          >
                            {parentsLoginUrl}
                          </a>
                          <button
                            type="button"
                            onClick={() => void handleSaveParentsLoginUrl()}
                            className="bg-[#14452f] hover:bg-[#1f5f40] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                          >
                            Save Link
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="font-serif font-bold text-base text-[#14452f] mb-2">
                      🔄 Factory Data Reset
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                      Reset all live news ticker announcements, 3 notice board categories, and career job vacancies back to the original school default values.
                    </p>
                    <button
                      onClick={handleResetToDefaults}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Restore Factory Default Data
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="font-serif font-bold text-base text-[#14452f] mb-2">
                      💾 Export / Download JSON Backup
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                      Download a complete snapshot of the school's current ticker, notices, and job vacancies as a JSON file.
                    </p>
                    <button
                      onClick={() => {
                        const backupData = {
                          academicSession,
                          announcements,
                          noticeCategories,
                          recruitmentPositions,
                          imageAssets,
                          exportedAt: new Date().toISOString(),
                        };
                        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `gps-bagodar-backup-${new Date().toISOString().split("T")[0]}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        showToast("💾 Backup JSON downloaded successfully!");
                      }}
                      className="bg-[#14452f] hover:bg-[#1f5f40] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Download Backup File (.json) 📥
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 20. ADD / EDIT NOTICE FORM MODAL */}
      {/* ======================================================== */}
      {noticeFormModalOpen && (
        <div
          className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setNoticeFormModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 relative border-2 border-[#14452f]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setNoticeFormModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-serif font-bold text-lg text-[#14452f] mb-1">
              {editingNoticeId ? "✏️ Edit Notice Item" : "➕ Add New Notice Item"}
            </h3>
            <p className="text-gray-500 text-xs mb-4">
              Category: <strong className="text-[#14452f] uppercase">{editingCategoryKey}</strong>
            </p>

            <form onSubmit={handleSaveNotice} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Target Category *
                </label>
                <select
                  value={editingCategoryKey}
                  onChange={(e) => setEditingCategoryKey(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                >
                  <option value="notices">Official Circulars (notices)</option>
                  <option value="announcements">Important Announcements (announcements)</option>
                  <option value="recruitment">Latest Recruitment (recruitment)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Notice Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={noticeFormData.title}
                  onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })}
                  placeholder="e.g. CBSE Practical Exam Instructions 2025"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Day (Number) *
                  </label>
                  <input
                    type="text"
                    required
                    value={noticeFormData.day}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, day: e.target.value })}
                    placeholder="12"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Month (3 Letters) *
                  </label>
                  <input
                    type="text"
                    required
                    value={noticeFormData.month}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, month: e.target.value })}
                    placeholder="MAR"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tag Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={noticeFormData.tag}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, tag: e.target.value })}
                    placeholder="URGENT"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Tag Style / Color Theme
                </label>
                <select
                  value={noticeFormData.tagTheme}
                  onChange={(e) => setNoticeFormData({ ...noticeFormData, tagTheme: e.target.value as NoticeTagThemeKey })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                >
                  <option value="urgent">Red (Urgent / Exams)</option>
                  <option value="success">Green (Admissions / Success)</option>
                  <option value="warning">Amber (Datesheet / Warning)</option>
                  <option value="info">Blue (Transport / Updates)</option>
                  <option value="hiring">Sky Blue (Recruitment / Hiring)</option>
                  <option value="event">Purple (Events / Campus)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={noticeFormData.desc}
                  onChange={(e) => setNoticeFormData({ ...noticeFormData, desc: e.target.value })}
                  placeholder="Provide concise instructions or circular description..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: GREEN }}
                className="w-full text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md mt-3 cursor-pointer"
              >
                {editingNoticeId ? "Save Changes" : "Publish Notice Item"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 21. ADD / EDIT JOB POSITION MODAL */}
      {/* ======================================================== */}
      {jobEditorModalOpen && (
        <div
          className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setJobEditorModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 relative border-2 border-[#14452f]/30 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setJobEditorModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-serif font-bold text-lg text-[#14452f] mb-1">
              {editingJobId ? "✏️ Edit Job Vacancy" : "💼 Post New Job Vacancy"}
            </h3>
            <p className="text-gray-500 text-xs mb-4">
              Gyanodaya Public School Careers &amp; Recruitment
            </p>

            <form onSubmit={handleSaveJobPosition} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Job Position Title *
                </label>
                <input
                  type="text"
                  required
                  value={jobEditorFormData.title}
                  onChange={(e) => setJobEditorFormData({ ...jobEditorFormData, title: e.target.value })}
                  placeholder="e.g. PGT – Biology & Chemistry"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Department / Wing *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobEditorFormData.dept}
                    onChange={(e) => setJobEditorFormData({ ...jobEditorFormData, dept: e.target.value })}
                    placeholder="Senior Secondary Wing"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Number of Vacancies *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobEditorFormData.vacancies}
                    onChange={(e) => setJobEditorFormData({ ...jobEditorFormData, vacancies: e.target.value })}
                    placeholder="2 Positions"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Salary / Pay Scale *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobEditorFormData.payScale}
                    onChange={(e) => setJobEditorFormData({ ...jobEditorFormData, payScale: e.target.value })}
                    placeholder="CBSE 7th Pay Scale (₹35k–₹50k)"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Application Deadline *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobEditorFormData.deadline}
                    onChange={(e) => setJobEditorFormData({ ...jobEditorFormData, deadline: e.target.value })}
                    placeholder="30 April 2025"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Required Qualification &amp; Experience *
                </label>
                <input
                  type="text"
                  required
                  value={jobEditorFormData.qualification}
                  onChange={(e) => setJobEditorFormData({ ...jobEditorFormData, qualification: e.target.value })}
                  placeholder="M.Sc + B.Ed with 2+ Years Experience"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Job Description / Scope
                </label>
                <textarea
                  rows={2}
                  value={jobEditorFormData.description}
                  onChange={(e) => setJobEditorFormData({ ...jobEditorFormData, description: e.target.value })}
                  placeholder="Mention responsibilities, classroom teaching scope..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452f]"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: GREEN }}
                className="w-full text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md mt-3 cursor-pointer"
              >
                {editingJobId ? "Save Job Opening" : "Publish Job Vacancy"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}



