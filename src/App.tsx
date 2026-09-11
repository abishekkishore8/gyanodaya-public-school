import { useState, useEffect, useRef } from "react";

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

const GREEN = "#14452f"; // Dark forest emerald green
const GOLD = "#c59a3f"; // Warm golden yellow
const GOLD_TEXT = "#dfb455";

// Custom High-Fidelity Vector Logo ("Awakening of Knowledge")
export function SchoolLogo({ className = "w-12 h-12" }: { className?: string }) {
  const rays = Array.from({ length: 36 }, (_, i) => i * 10);

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        <defs>
          <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#fed766" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#fec84d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fec84d" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e23c08" />
            <stop offset="50%" stopColor="#f0541e" />
            <stop offset="100%" stopColor="#d83606" />
          </linearGradient>

          <linearGradient id="goldFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8b5" />
            <stop offset="50%" stopColor="#fed766" />
            <stop offset="100%" stopColor="#e59819" />
          </linearGradient>

          <linearGradient id="quillGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d83606" />
            <stop offset="60%" stopColor="#f25c22" />
            <stop offset="100%" stopColor="#ff7a3d" />
          </linearGradient>
        </defs>

        {/* 1. SUNBURST RAYS BACKGROUND */}
        <g id="sunburst-rays">
          {rays.map((deg) => (
            <polygon
              key={deg}
              points="250,250 240,15 260,15"
              fill="url(#sunburstGrad)"
              transform={`rotate(${deg} 250 250)`}
            />
          ))}
          <circle cx="250" cy="250" r="140" fill="url(#sunburstGrad)" opacity="0.6" />
        </g>

        {/* 2. GREEN LAUREL WREATH */}
        <g id="laurel-wreath" fill="#0c7844" stroke="#095c34" strokeWidth="1">
          <path d="M152 145 C132 170 120 205 118 245 C116 285 130 325 158 355 C164 362 172 368 180 374 C168 362 140 320 138 270 C136 220 156 172 174 150 Z" />
          <ellipse cx="140" cy="160" rx="14" ry="24" transform="rotate(-35 140 160)" />
          <ellipse cx="122" cy="195" rx="14" ry="24" transform="rotate(-20 122 195)" />
          <ellipse cx="112" cy="235" rx="14" ry="24" transform="rotate(-5 112 235)" />
          <ellipse cx="114" cy="275" rx="14" ry="24" transform="rotate(12 114 275)" />
          <ellipse cx="126" cy="315" rx="14" ry="24" transform="rotate(30 126 315)" />
          <ellipse cx="148" cy="350" rx="14" ry="24" transform="rotate(48 148 350)" />
          
          <ellipse cx="160" cy="180" rx="12" ry="20" transform="rotate(-15 160 180)" />
          <ellipse cx="145" cy="215" rx="12" ry="20" transform="rotate(0 145 215)" />
          <ellipse cx="140" cy="255" rx="12" ry="20" transform="rotate(15 140 255)" />
          <ellipse cx="148" cy="295" rx="12" ry="20" transform="rotate(32 148 295)" />
          <ellipse cx="170" cy="330" rx="12" ry="20" transform="rotate(50 170 330)" />

          <path d="M348 145 C368 170 380 205 382 245 C384 285 370 325 342 355 C336 362 328 368 320 374 C332 362 360 320 362 270 C364 220 344 172 326 150 Z" />
          <ellipse cx="360" cy="160" rx="14" ry="24" transform="rotate(35 360 160)" />
          <ellipse cx="378" cy="195" rx="14" ry="24" transform="rotate(20 378 195)" />
          <ellipse cx="388" cy="235" rx="14" ry="24" transform="rotate(5 388 235)" />
          <ellipse cx="386" cy="275" rx="14" ry="24" transform="rotate(-12 386 275)" />
          <ellipse cx="374" cy="315" rx="14" ry="24" transform="rotate(-30 374 315)" />
          <ellipse cx="352" cy="350" rx="14" ry="24" transform="rotate(-48 352 350)" />
          
          <ellipse cx="340" cy="180" rx="12" ry="20" transform="rotate(15 340 180)" />
          <ellipse cx="355" cy="215" rx="12" ry="20" transform="rotate(0 355 215)" />
          <ellipse cx="360" cy="255" rx="12" ry="20" transform="rotate(-15 360 255)" />
          <ellipse cx="352" cy="295" rx="12" ry="20" transform="rotate(-32 352 295)" />
          <ellipse cx="330" cy="330" rx="12" ry="20" transform="rotate(-50 330 330)" />
        </g>

        {/* 3. HEAD SILHOUETTE */}
        <g id="mind-head" transform="translate(205, 120)">
          <path
            d="M45 5 C72 5 90 24 90 52 C90 70 82 82 72 90 L72 105 L28 105 L28 92 C20 88 12 78 10 70 L24 70 L24 62 L12 62 L8 50 L18 48 L15 40 L28 40 C28 20 35 5 45 5 Z"
            fill="#f37023"
            stroke="#d85207"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M45 14 C65 14 78 28 78 50 C78 64 72 74 64 80 L62 96 L38 96 L38 84 C30 80 24 72 22 66"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 4. OPEN BOOK */}
        <g id="open-book" transform="translate(195, 238)">
          <path
            d="M55 24 L5 38 L8 98 L55 84 L102 98 L105 38 Z"
            fill="#1e184e"
            stroke="#110d33"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M55 24 L10 38 L14 90 L55 78 Z"
            fill="#ffffff"
            stroke="#1e184e"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="22" y1="48" x2="48" y2="40" stroke="#1e184e" strokeWidth="1.5" />
          <line x1="22" y1="58" x2="48" y2="50" stroke="#1e184e" strokeWidth="1.5" />
          <line x1="23" y1="68" x2="48" y2="60" stroke="#1e184e" strokeWidth="1.5" />
          <line x1="24" y1="78" x2="48" y2="70" stroke="#1e184e" strokeWidth="1.5" />

          <path
            d="M55 24 L100 38 L96 90 L55 78 Z"
            fill="#ffffff"
            stroke="#1e184e"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="62" y1="40" x2="88" y2="48" stroke="#1e184e" strokeWidth="1.5" />
          <line x1="62" y1="50" x2="88" y2="58" stroke="#1e184e" strokeWidth="1.5" />
          <line x1="62" y1="60" x2="87" y2="68" stroke="#1e184e" strokeWidth="1.5" />
          <line x1="62" y1="70" x2="86" y2="78" stroke="#1e184e" strokeWidth="1.5" />
        </g>

        {/* 5. INK POT & QUILL PEN */}
        <path
          d="M239 320 C239 316 244 314 250 314 C256 314 261 316 261 320 L264 332 C264 336 258 338 250 338 C242 338 236 336 236 332 Z"
          fill="#e65100"
          stroke="#b23c00"
          strokeWidth="2"
        />
        <rect x="245" y="311" width="10" height="4" rx="1.5" fill="#f57c00" stroke="#b23c00" strokeWidth="1" />

        <path
          d="M210 324 C230 300 270 260 325 218 C285 240 252 270 236 310 Z"
          fill="url(#quillGrad)"
          stroke="#b23c00"
          strokeWidth="1.5"
        />
        <path
          d="M210 324 C240 285 285 245 325 218 C270 258 245 288 230 322 Z"
          fill="#ff6e40"
        />

        {/* 6. RIBBON BANNER */}
        <g id="ribbon-banner">
          <path
            d="M85 365 L40 278 L120 305 L80 340 Z"
            fill="#e65100"
            stroke="#bf360c"
            strokeWidth="1.5"
          />
          <polygon points="40,278 120,305 75,320" fill="#f57c00" />

          <path
            d="M415 365 L460 278 L380 305 L420 340 Z"
            fill="#e65100"
            stroke="#bf360c"
            strokeWidth="1.5"
          />
          <polygon points="460,278 380,305 425,320" fill="#f57c00" />

          <path
            d="M92 320 C110 308 140 308 160 325 C145 345 110 345 92 320 Z"
            fill="url(#goldFoldGrad)"
            stroke="#e59819"
            strokeWidth="1.5"
          />

          <path
            d="M408 320 C390 308 360 308 340 325 C355 345 390 345 408 320 Z"
            fill="url(#goldFoldGrad)"
            stroke="#e59819"
            strokeWidth="1.5"
          />

          <path
            d="M90 330 C170 345 330 345 410 330 C418 358 412 375 400 385 C320 398 180 398 100 385 C88 375 82 358 90 330 Z"
            fill="url(#ribbonGrad)"
            stroke="#c83204"
            strokeWidth="2"
          />

          <text
            x="250"
            y="368"
            fill="#ffffff"
            fontSize="26"
            fontFamily="'Brush Script MT', 'Great Vibes', 'Caveat', 'Playfair Display', cursive, serif"
            fontStyle="italic"
            fontWeight="bold"
            textAnchor="middle"
            letterSpacing="1"
            className="drop-shadow"
          >
            Awakening of Knowledge
          </text>
        </g>
      </svg>
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

// Announcements / News Ticker items
const ANNOUNCEMENTS = [
  "📢 Admissions Open for Academic Session 2025–26 (Nursery to Class XII) at GPS Bagodar",
  "🏆 Gyanodaya Public School students win District Inter-School Science & Math Fair",
  "📅 Annual Sports & Cultural Meet 2025 scheduled for next month",
  "✨ 100% Pass Percentage in CBSE Board Examinations with distinction",
  "🚌 GPS-enabled Safe School Bus routes operational across Bagodar, Saria, Dumri & Giridih",
];

const PLAYSTORE_PARENT_APP_URL = "https://play.google.com/store/search?q=gyanodaya+public+school+bagodar&c=apps";

// Top bar navigation links
const TOP_NAV = [
  { label: "Career", href: "#career" },
  { label: "Alumni", href: "#alumni" },
  { label: "News & Events", href: "#news" },
  { label: "Parents Login", href: PLAYSTORE_PARENT_APP_URL, isExternal: true },
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
      { label: "Online Admission Enquiry", href: "#admissions" },
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

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubNavOpen, setMobileSubNavOpen] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Interactive Modals & States
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Auto-play Hero slider every 5.5 seconds (pauses on hover)
  useEffect(() => {
    if (isHoveringHero) return;
    sliderTimerRef.current = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => {
      if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    };
  }, [isHoveringHero]);

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
        if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % GALLERY_ITEMS.length);
        if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setAdmissionModalOpen(false);
      setEnquiryForm({ studentName: "", grade: "Grade 1 - 5", parentName: "", phone: "", email: "" });
      showToast("🎉 Thank you! Your admission enquiry has been submitted. Our counselor will contact you shortly.");
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast("✨ Subscribed successfully to the Gyanodaya Public School newsletter!");
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased selection:bg-[#c59a3f] selection:text-white pb-16 md:pb-0 overflow-x-hidden w-full max-w-full">

      {/* ======================================================== */}
      {/* 0. INTERACTIVE TOAST NOTIFICATION */}
      {/* ======================================================== */}
      {toastMessage && (
        <div className="fixed top-3 sm:top-5 right-3 sm:right-5 left-3 sm:left-auto z-[100] animate-slide-down bg-[#14452f] text-white px-4 sm:px-5 py-3 rounded-xl shadow-2xl border-2 border-[#dfb455] flex items-center gap-3 text-xs sm:text-sm font-medium max-w-sm sm:max-w-md">
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
        <div className="max-w-[1240px] mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between gap-x-2">
          {/* Left Contact Details */}
          {/* Left Contact & Location Info */}
          <div className="flex items-center gap-x-2.5 sm:gap-x-4 text-gray-200 truncate">
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
          <div className="flex items-center gap-x-2 sm:gap-x-3.5 shrink-0">
            {TOP_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="hover:text-[#dfb455] transition-colors font-medium text-gray-200 text-xs hidden xl:inline-block cursor-pointer"
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
      {/* 1.5. LIVE NEWS & NOTICE TICKER MARQUEE */}
      {/* ======================================================== */}
      <div className="bg-[#0e3322] text-white py-1.5 border-b border-[#1f5f40] overflow-hidden flex items-center text-xs w-full">
        <div className="px-2.5 sm:px-3.5 bg-[#c59a3f] text-[#14452f] font-bold text-[9px] sm:text-[11px] uppercase tracking-wider py-0.5 rounded-r shrink-0 z-10 flex items-center gap-1.5 shadow">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-ping" />
          <span>LATEST NEWS</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap flex-1 relative">
          <div className="animate-marquee flex items-center gap-8 sm:gap-12 font-medium text-gray-200 cursor-pointer text-[10.5px] sm:text-xs">
            {ANNOUNCEMENTS.concat(ANNOUNCEMENTS).map((item, idx) => (
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
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN NAVBAR WITH LOGO, PARENTS LOGIN AND SEARCH */}
      {/* ======================================================== */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 w-full ${scrolled ? "shadow-md py-1.5 sm:py-2" : "border-b border-gray-100 py-2 sm:py-2.5"}`}>
        <div className="max-w-[1360px] mx-auto px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & School Name */}
          <a href="#home" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0">
            <SchoolLogo className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 group-hover:scale-105 transition-transform duration-300 shrink-0" />
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

          {/* Desktop Navigation Links (Visible on xl+ screens: 1200px+) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
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
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
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
              href={PLAYSTORE_PARENT_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 border border-[#14452f] bg-[#f0faf5] hover:bg-[#14452f] text-[#14452f] hover:text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg transition-all duration-200 uppercase tracking-wider cursor-pointer shadow-xs active:scale-95 group shrink-0"
              aria-label="Parents Login Play Store App"
            >
              {/* Google Play / Android Icon */}
              <svg className="w-3.5 h-3.5 text-[#c59a3f] group-hover:text-[#dfb455] transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.793 12 3.61 22.186c-.368-.328-.61-.83-.61-1.426V3.24c0-.596.242-1.098.609-1.426zm11.246 11.248l2.257 2.257-11.83 6.643 9.573-8.9zm0-2.124L5.282 2.038l11.83 6.643-2.257 2.257zm1.487 1.062l3.435 1.932c.708.398.708 1.05 0 1.448l-3.435 1.932-2.115-2.115 2.115-3.197z" />
              </svg>
              <span className="whitespace-nowrap">Parents Login</span>
            </a>

            {/* Enquire Button (visible on sm+) */}
            <button
              onClick={() => setAdmissionModalOpen(true)}
              style={{ backgroundColor: GREEN }}
              className="hidden sm:inline-flex items-center gap-1.5 text-white text-xs font-semibold px-3 sm:px-3.5 py-1.5 rounded-lg hover:brightness-110 transition-all shadow-sm uppercase tracking-wider cursor-pointer shrink-0"
            >
              <span>Enquire</span>
              <svg className="w-3.5 h-3.5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Mobile & Tablet Hamburger toggle button (visible on < xl) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              className="xl:hidden flex items-center gap-1 p-1.5 sm:p-2 text-gray-700 hover:text-[#14452f] focus:outline-none cursor-pointer rounded-lg hover:bg-gray-100 shrink-0 border border-gray-200"
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
            className="xl:hidden fixed inset-0 top-[70px] sm:top-[76px] z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="bg-white w-full sm:max-w-md h-[calc(100vh-70px)] sm:h-[calc(100vh-76px)] overflow-y-auto p-4 sm:p-5 shadow-2xl border-l border-gray-200 animate-slide-down flex flex-col gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <SchoolLogo className="w-6 h-6" />
                  <span className="font-serif font-bold text-sm text-[#14452f]">Navigation Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quick Parent Portal Banner in Drawer */}
              <a
                href={PLAYSTORE_PARENT_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#f0faf5] border border-[#14452f]/20 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-[#e4f5ed] transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#14452f] text-[#dfb455] flex items-center justify-center font-bold text-sm shrink-0">
                    📱
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#14452f] uppercase tracking-wider">Parents Login App</h4>
                    <p className="text-[10.5px] text-gray-500">Official GPS Mobile App on Play Store</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#14452f] bg-white px-2.5 py-1 rounded-md shadow-xs border border-gray-200 whitespace-nowrap">Open App ↗</span>
              </a>

              {/* Quick Search */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search GPS Bagodar..."
                  className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      showToast("🔍 Searching school records...");
                      setMobileMenuOpen(false);
                    }
                  }}
                />
              </div>

              {/* Main Navigation Links */}
              <div className="flex flex-col divide-y divide-gray-100 text-sm font-semibold text-gray-800">
                {MAIN_NAV.map((item) => (
                  <div key={item.label} className="py-0.5">
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 px-1 hover:text-[#14452f] flex-1 text-xs sm:text-sm tracking-wide"
                      >
                        {item.label}
                      </a>
                      {item.hasDropdown && (
                        <button
                          onClick={() => setMobileSubNavOpen(mobileSubNavOpen === item.label ? null : item.label)}
                          className="p-2 text-gray-400 hover:text-[#14452f] cursor-pointer"
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
                      <div className="pl-4 py-1.5 flex flex-col gap-1 bg-[#f9faf9] rounded-md animate-slide-down">
                        {item.subItems.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1.5 text-xs text-gray-600 hover:text-[#14452f] font-normal"
                          >
                            • {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Contact & Action Buttons */}
              <div className="pt-2.5 mt-auto border-t border-gray-100 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919431377488"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold hover:bg-gray-200 active:scale-95"
                  >
                    <span>📞 Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/919431377488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 active:scale-95"
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
                  className="w-full text-white font-bold text-xs py-3 rounded-lg text-center uppercase tracking-wider shadow-md hover:brightness-110 cursor-pointer active:scale-98"
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
            key={activeSlide}
            className="h-full bg-[#dfb455] transition-all duration-[5500ms] ease-linear"
            style={{ width: isHoveringHero ? "100%" : "100%" }}
          />
        </div>

        {/* Dynamic Hero Slide Images with Smooth Crossfade */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
            }`}
            style={{ transition: "opacity 1s ease-in-out, transform 8s ease-out" }}
          >
            <img
              src={slide.img}
              alt={slide.headline}
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
          onClick={() => setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/60 bg-black/30 hover:bg-black/60 text-white items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-xs shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1))}
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/60 bg-black/30 hover:bg-black/60 text-white items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-xs shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Dot Indicators */}
        <div className="absolute bottom-14 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/35 px-3 py-1.5 rounded-full backdrop-blur-xs">
          {HERO_SLIDES.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setActiveSlide(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === dotIndex ? "w-6 sm:w-7 bg-[#dfb455]" : "w-2 bg-white/50 hover:bg-white/90"
              }`}
            />
          ))}
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 h-full max-w-[1240px] mx-auto px-4 sm:px-8 md:px-10 flex flex-col justify-center pb-8 sm:pb-0">
          <div key={activeSlide} className="max-w-xl animate-fade-in-up">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#dfb455] text-[9.5px] sm:text-xs font-semibold tracking-wider uppercase mb-2.5 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#dfb455] animate-ping" />
              <span>{HERO_SLIDES[activeSlide].tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold text-white leading-[1.18] sm:leading-[1.15] mb-2.5 sm:mb-4 drop-shadow-md">
              {HERO_SLIDES[activeSlide].headline.split(", ")[0]},
              <br />
              {HERO_SLIDES[activeSlide].headline.split(", ")[1] ? (
                <span>
                  {HERO_SLIDES[activeSlide].headline.split(", ")[1].split(" ")[0]}{" "}
                  <span style={{ color: GOLD_TEXT }}>
                    {HERO_SLIDES[activeSlide].headline.split(", ")[1].split(" ").slice(1).join(" ")}
                  </span>
                </span>
              ) : (
                <span style={{ color: GOLD_TEXT }}>Building Futures</span>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-7 max-w-md font-light line-clamp-3 sm:line-clamp-none">
              {HERO_SLIDES[activeSlide].subtitle}
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

              <button
                onClick={() => setTourModalOpen(true)}
                className="border border-white/80 text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3.5 rounded flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-white hover:text-[#14452f] transition-all uppercase tracking-wider backdrop-blur-xs cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>CAMPUS TOUR</span>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dfb455]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FIVE FEATURE HIGHLIGHTS FLOATING CARD (RESPONSIVE GRID) */}
      {/* ======================================================== */}
      <div className="relative z-20 max-w-[1140px] mx-auto px-3 sm:px-4 -mt-8 sm:-mt-10 md:-mt-14">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 overflow-hidden">
          {HIGHLIGHT_CARDS.map((card, cIdx) => (
            <div
              key={card.title}
              className={`p-3.5 sm:p-4 md:p-6 flex flex-col items-center text-center group hover:bg-[#f9fbf9] transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
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
      {/* 5. WELCOME TO GYANODAYA PUBLIC SCHOOL (ABOUT SECTION) */}
      {/* ======================================================== */}
      <section id="about" className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Campus Photo with Interactive Video Teaser */}
          <div className="relative rounded-xl overflow-hidden shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&h=700&fit=crop&auto=format&q=80"
              alt="Gyanodaya Public School Students and Campus"
              loading="lazy"
              decoding="async"
              className="w-full h-[300px] sm:h-[400px] md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <button
                onClick={() => setTourModalOpen(true)}
                aria-label="Play Virtual Campus Tour"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 hover:bg-[#c59a3f] text-[#14452f] hover:text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-115 cursor-pointer animate-pulse-glow"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200/80">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14452f]/8 text-[#14452f] text-[11px] font-bold tracking-[0.16em] uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59a3f]" />
                <span>ACADEMIC EXCELLENCE & CURRICULUM</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15]">
                Nurturing Intellect, <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#14452f]">Shaping Leaders of Tomorrow.</span>
              </h2>
            </div>
            
            <p className="text-gray-600 text-xs sm:text-sm lg:max-w-md leading-relaxed">
              {(ACADEMICS_CARDS_DATA[activeTab] || ACADEMICS_CARDS_DATA.all).tagline}
            </p>
          </div>

          {/* Key Academic Metrics Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {ACADEMIC_HIGHLIGHTS.map((stat, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-xl border border-gray-200/70 shadow-xs hover:shadow-md hover:border-[#14452f]/30 transition-all group"
              >
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#14452f] group-hover:text-[#c59a3f] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-gray-900 mt-1">{stat.label}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{stat.detail}</div>
              </div>
            ))}
          </div>

          {/* Segmented Stage Switcher Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {ACADEMIC_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group px-4 sm:px-5 py-2.5 rounded-xl text-left transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? "bg-[#14452f] text-white border-[#14452f] shadow-md shadow-[#14452f]/15"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50/80"
                  }`}
                >
                  <div className={`text-xs sm:text-sm font-bold tracking-wide ${isActive ? "text-white" : "text-gray-900 group-hover:text-[#14452f]"}`}>
                    {tab.label}
                  </div>
                  <div className={`text-[10px] ${isActive ? "text-[#dfb455]" : "text-gray-500"}`}>
                    {tab.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Academic Content Stage Canvas */}
          {(() => {
            const currentData = ACADEMICS_CARDS_DATA[activeTab] || ACADEMICS_CARDS_DATA.all;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
                
                {/* Stage Feature Overview Showcase (5 columns) */}
                <div className="lg:col-span-5 bg-[#0d2e20] text-white rounded-2xl overflow-hidden border border-[#1e5038] shadow-xl flex flex-col justify-between relative group">
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                      src={currentData.stageBanner.image}
                      alt={currentData.stageBanner.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2e20] via-[#0d2e20]/40 to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10.5px] font-semibold tracking-wider text-[#dfb455] uppercase">
                      CBSE Affiliated · GPS Bagodar
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between relative z-10 -mt-6">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                        {currentData.stageBanner.title}
                      </h3>
                      <p className="text-[#dfb455] text-xs font-semibold uppercase tracking-wider mb-4">
                        {currentData.stageBanner.subtitle}
                      </p>
                      
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                        {currentData.description}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-white/10">
                        {currentData.stageBanner.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200">
                            <span className="w-4 h-4 rounded-full bg-[#dfb455]/20 text-[#dfb455] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => setAdmissionModalOpen(true)}
                        style={{ backgroundColor: GOLD }}
                        className="text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer shadow-sm active:scale-95"
                      >
                        Apply for Admission
                      </button>
                      <button
                        onClick={() => setTourModalOpen(true)}
                        className="text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Schedule Campus Visit</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Structured Subject & Learning Cards (7 columns) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 content-start">
                  {currentData.cards.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#14452f]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#f0faf5] border border-[#14452f]/10 flex items-center justify-center text-[#14452f] group-hover:bg-[#14452f] group-hover:text-[#dfb455] transition-colors">
                            <AcademicStageIcon type={item.iconType} className="w-6 h-6 transition-transform group-hover:scale-110" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#faf5ea] text-[#976a16] border border-[#dfb455]/40">
                            {item.badge}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#14452f] transition-colors mb-2 leading-snug">
                          {item.title}
                        </h4>

                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-[#14452f]">
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
            {FACILITIES_LIST.map((fac) => (
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
              onClick={() => setTourModalOpen(true)}
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
            {GALLERY_ITEMS.map((item, index) => (
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
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-inner animate-float">
              <SchoolLogo className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            {/* Title & Subtitle */}
            <div className="flex flex-col md:flex-row items-center gap-y-1 gap-x-6">
              <h3
                style={{ color: GOLD_TEXT }}
                className="font-serif text-lg sm:text-2xl font-bold tracking-tight"
              >
                Admissions Open for
                <br className="sm:hidden" /> Academic Year 2025–26
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
      {/* 10. FOOTER */}
      {/* ======================================================== */}
      <footer style={{ backgroundColor: "#0e3322" }} className="text-white pt-12 sm:pt-16 pb-8 border-t border-black/20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 mb-10 sm:mb-12">
            
            {/* Column 1: School Brand & Description (2 cols on lg) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <SchoolLogo className="w-11 h-11 sm:w-12 sm:h-12" />
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
                  { label: "Career", href: "#career" },
                  { label: "Alumni", href: "#alumni" },
                  { label: "Parents Login", href: PLAYSTORE_PARENT_APP_URL, isExternal: true },
                ].map((info) => (
                  <li key={info.label}>
                    <a
                      href={info.href}
                      target={info.isExternal ? "_blank" : undefined}
                      rel={info.isExternal ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!info.isExternal) {
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
            <div id="contact">
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
              setLightboxIndex((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
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
              src={GALLERY_ITEMS[lightboxIndex].img}
              alt={GALLERY_ITEMS[lightboxIndex].title}
              className="max-h-[68vh] sm:max-h-[72vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-3 sm:mt-4 text-center text-white px-4">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#dfb455] bg-white/10 px-3 py-0.5 sm:py-1 rounded-full">
                {GALLERY_ITEMS[lightboxIndex].category}
              </span>
              <h4 className="font-serif text-base sm:text-xl font-bold mt-1.5 sm:mt-2">
                {GALLERY_ITEMS[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-md">
                {GALLERY_ITEMS[lightboxIndex].desc}
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                {lightboxIndex + 1} of {GALLERY_ITEMS.length}
              </p>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! + 1) % GALLERY_ITEMS.length);
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
                  Academic Session 2025–26 • Nursery to Class XII
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
      {/* 13. CAMPUS VIRTUAL TOUR MODAL */}
      {/* ======================================================== */}
      {tourModalOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setTourModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#14452f] text-white p-3.5 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SchoolLogo className="w-7 h-7 sm:w-8 sm:h-8" />
                <h3 className="font-serif font-bold text-sm sm:text-lg truncate">
                  Virtual Campus Tour • GPS Bagodar
                </h3>
              </div>
              <button
                onClick={() => setTourModalOpen(false)}
                className="text-white/80 hover:text-white text-2xl font-bold cursor-pointer ml-2"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=675&fit=crop&auto=format&q=80"
                alt="Virtual Campus"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute text-center text-white px-4 sm:px-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#c59a3f] text-white flex items-center justify-center mx-auto mb-2.5 sm:mb-3 shadow-xl animate-pulse">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h4 className="font-serif font-bold text-lg sm:text-xl drop-shadow">
                  Interactive 360° Campus Tour
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-md mx-auto hidden xs:block">
                  Experience our sprawling sports grounds, high-tech science laboratories, smart auditoriums, and lush campus quad.
                </p>
                <button
                  onClick={() => {
                    setTourModalOpen(false);
                    setAdmissionModalOpen(true);
                  }}
                  style={{ backgroundColor: GOLD }}
                  className="mt-3 sm:mt-4 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded shadow-lg hover:brightness-110 cursor-pointer"
                >
                  Schedule Campus Visit
                </button>
              </div>
            </div>
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
          href={PLAYSTORE_PARENT_APP_URL}
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

    </div>
  );
}

