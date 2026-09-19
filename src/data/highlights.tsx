import type { ReactNode } from "react";

export interface HighlightCard {
  icon: ReactNode;
  title: string;
  desc: string;
}

// 5 Key Highlights Cards
export const HIGHLIGHT_CARDS: HighlightCard[] = [
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

