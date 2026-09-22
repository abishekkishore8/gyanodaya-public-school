/**
 * Seed content written to MongoDB the first time the site document is created,
 * and used to backfill any field missing from a stored document.
 */

import { INITIAL_ABOUT } from "@/data/about";
import { INITIAL_CONTACT } from "@/data/contact";
import { INITIAL_HOME } from "@/data/home";
import { INITIAL_ACADEMICS } from "@/data/academics-content";
import { INITIAL_FACILITIES } from "@/data/facilities-content";
import { INITIAL_FEES } from "@/data/fees";
import { INITIAL_RESULTS } from "@/data/results";
import { INITIAL_DISCLOSURE } from "@/data/disclosure";
import { INITIAL_UNIFORM } from "@/data/uniform";
import type {
  FormSubmissionItem,
  ImageAssetsDocument,
  JobPosition,
  NoticeCategoryData,
  SiteContentDocument,
} from "@/types/site";

export const INITIAL_ANNOUNCEMENTS: string[] = [
  "📢 Admissions open for Session 2025-26. Limited seats available from Nursery to Class XI.",
  "🏆 GPS Bagodar students secure district-level honors in Science Exhibition and Debate Championship.",
  "🚌 New GPS transport routes launched for Bagodar, Sariya, and nearby residential clusters.",
  "🎓 Scholarship-cum-Admission Test registrations now live for meritorious students.",
];

export const INITIAL_NOTICE_CATEGORIES: NoticeCategoryData[] = [
  {
    id: "notices",
    label: "Important Notices",
    accent: "from-red-50 via-white to-red-50",
    items: [
      {
        id: "notice-1",
        title: "Half-Yearly Examination Schedule Released",
        date: "15 Sep 2025",
        day: "15",
        month: "SEP",
        tag: "URGENT",
        tagColor: "bg-red-50 text-red-700 border-red-200",
        desc: "Detailed timetable for Classes VI to XII is now available. Students must collect admit cards from class teachers.",
      },
      {
        id: "notice-2",
        title: "Parent-Teacher Interaction Meet",
        date: "21 Sep 2025",
        day: "21",
        month: "SEP",
        tag: "MEETING",
        tagColor: "bg-amber-50 text-amber-700 border-amber-200",
        desc: "Parents are invited to discuss academic progress, attendance, and co-curricular development with faculty mentors.",
      },
    ],
  },
  {
    id: "announcements",
    label: "Latest Updates",
    accent: "from-emerald-50 via-white to-emerald-50",
    items: [
      {
        id: "announcement-1",
        title: "Smart Classroom Upgrade Completed",
        date: "10 Sep 2025",
        day: "10",
        month: "SEP",
        tag: "CAMPUS",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        desc: "All middle and senior classrooms are now equipped with upgraded digital boards and interactive teaching tools.",
      },
      {
        id: "announcement-2",
        title: "Inter-House Cultural Fest Registrations Open",
        date: "18 Sep 2025",
        day: "18",
        month: "SEP",
        tag: "EVENT",
        tagColor: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
        desc: "Students can register for music, dance, theatre, quiz, and fine arts competitions through their house coordinators.",
      },
    ],
  },
  {
    id: "recruitment",
    label: "Recruitment",
    accent: "from-sky-50 via-white to-sky-50",
    items: [
      {
        id: "recruitment-1",
        title: "Applications Invited for PGT Physics",
        date: "30 Sep 2025",
        day: "30",
        month: "SEP",
        tag: "HIRING",
        tagColor: "bg-sky-50 text-sky-700 border-sky-200",
        desc: "Experienced CBSE faculty with strong board-result background are encouraged to apply for the senior secondary wing.",
      },
    ],
  },
];

export const INITIAL_RECRUITMENT_POSITIONS: JobPosition[] = [
  {
    id: "job-physics",
    title: "PGT – Physics & Mathematics",
    dept: "Senior Secondary (Classes XI & XII)",
    type: "Full Time · Permanent",
    vacancies: "2 Positions",
    experience: "3+ Years CBSE Experience",
    qualification: "M.Sc + B.Ed",
    payScale: "CBSE 7th Pay Matrix + EPF + Staff Bus",
    deadline: "30 September 2025",
    location: "Bagodar Campus, Giridih",
    highlights: ["Staff Transport", "EPF Benefits", "Child Fee Subsidy"],
    description: "Lead concept-driven classroom teaching, practical integration, and board exam mentoring for senior secondary learners.",
  },
  {
    id: "job-it-admin",
    title: "Computer Science Teacher & IT Administrator",
    dept: "Middle & Senior School",
    type: "Full Time · Permanent",
    vacancies: "1 Position",
    experience: "2+ Years School IT Experience",
    qualification: "B.Tech / MCA / M.Sc CS + Teaching Aptitude",
    payScale: "Negotiable + Performance Incentives",
    deadline: "12 October 2025",
    location: "Bagodar Campus, Giridih",
    highlights: ["Smart Lab Access", "Annual Bonus", "Professional Development"],
    description: "Handle computer science instruction, digital lab operations, and school technology coordination across academic departments.",
  },
];

export const INITIAL_SUBMISSIONS: FormSubmissionItem[] = [];

export const INITIAL_IMAGE_ASSETS: ImageAssetsDocument = {
  heroSlides: [],
  academicBanners: [],
  facilities: [],
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

export function createDefaultSiteContent(): SiteContentDocument {
  return {
    academicSession: "2025–26",
    home: INITIAL_HOME,
    contact: INITIAL_CONTACT,
    parentsLoginUrl: "https://play.google.com/store/search?q=gyanodaya+public+school+bagodar&c=apps",
    announcements: INITIAL_ANNOUNCEMENTS,
    noticeCategories: INITIAL_NOTICE_CATEGORIES,
    recruitmentPositions: INITIAL_RECRUITMENT_POSITIONS,
    imageAssets: INITIAL_IMAGE_ASSETS,
    // Seeded from the shared modules so the panel, the page and the seed can
    // never drift apart.
    about: INITIAL_ABOUT,
    academics: INITIAL_ACADEMICS,
    facilities: INITIAL_FACILITIES,
    results: INITIAL_RESULTS,
    fees: INITIAL_FEES,
    uniform: INITIAL_UNIFORM,
    disclosure: INITIAL_DISCLOSURE,
  };
}