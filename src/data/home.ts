/**
 * Default home-page content: hero slides, the highlights strip, the welcome
 * block, the FAQs and the admissions banner.
 *
 * Seed and fallback only — the live pages read the `home` part of the site
 * document, maintained under Admin → Home page.
 */

import type { HomeContent } from "@/types/site";

export const INITIAL_HOME: HomeContent = {
  hero: [
    {
      id: "hero-1",
      tag: "CBSE AFFILIATED INSTITUTION",
      headline: "Inspiring Excellence, Building Futures",
      subtitle:
        "At Gyanodaya Public School, Bagodar, we nurture young minds with strong values, modern learning and boundless opportunities.",
      imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1920&h=1080&fit=crop&auto=format",
    },
    {
      id: "hero-2",
      tag: "NURTURING GLOBAL LEADERS",
      headline: "Empowering Leaders of Tomorrow",
      subtitle:
        "Comprehensive CBSE curriculum with world-class faculty, modern infrastructure and holistic character building.",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop&auto=format",
    },
    {
      id: "hero-3",
      tag: "WORLD-CLASS INFRASTRUCTURE",
      headline: "A Legacy of Academic Distinction",
      subtitle:
        "Fostering curiosity, creativity, and critical thinking from foundational kindergarten years to senior secondary.",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop&auto=format",
    },
    {
      id: "hero-4",
      tag: "HOLISTIC DEVELOPMENT",
      headline: "Where Potential Meets Purpose",
      subtitle:
        "State-of-the-art laboratories, digital smart classrooms, and vibrant sports & cultural opportunities.",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop&auto=format",
    },
  ],

  highlights: [
    {
      id: "highlight-classrooms",
      icon: "classroom",
      title: "Smart Classrooms",
      desc: "Interactive technology-enabled learning",
    },
    {
      id: "highlight-faculty",
      icon: "faculty",
      title: "Experienced Faculty",
      desc: "Dedicated mentors who inspire every child",
    },
    {
      id: "highlight-transport",
      icon: "transport",
      title: "Safe Transport",
      desc: "GPS-tracked fleet with verified drivers",
    },
    {
      id: "highlight-holistic",
      icon: "holistic",
      title: "Holistic Development",
      desc: "Mind · Body · Values balanced growth",
    },
    {
      id: "highlight-labs",
      icon: "labs",
      title: "Modern Labs",
      desc: "Cutting-edge STEM & science facilities",
    },
  ],

  welcome: {
    eyebrow: "WELCOME TO",
    title: "Gyanodaya Public School",
    body: "Gyanodaya Public School (GPS Bagodar) is a premier co-educational institution in Bagodar, Giridih, Jharkhand, dedicated to developing confident, compassionate and responsible global citizens. We blend rigorous CBSE academic curriculum with character building, digital smart education, and moral values to prepare students for a bright and successful future.",
    badgeValue: "20+",
    badgeLabel: "Years of Academic Distinction & Trust",
    stats: [
      { id: "stat-board", value: "CBSE", label: "Affiliation" },
      { id: "stat-ratio", value: "1:20", label: "Teacher Ratio" },
      { id: "stat-years", value: "20+", label: "Years of Trust" },
      { id: "stat-result", value: "100%", label: "Pass Result" },
    ],
    buttonLabel: "READ MORE ABOUT US",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&h=700&fit=crop&auto=format&q=80",
  },

  faqs: [
    {
      id: "faq-admission",
      question: "What is the admission procedure for the 2025–26 academic year?",
      answer:
        "Admissions begin with online or campus registration. Following an interactive evaluation and document verification, selected candidates are granted admission upon fee submission.",
    },
    {
      id: "faq-board",
      question: "Which board is Gyanodaya Public School affiliated with?",
      answer:
        "Gyanodaya Public School (GPS Bagodar) is affiliated with the Central Board of Secondary Education (CBSE), New Delhi, adhering to the NCERT national curriculum framework.",
    },
    {
      id: "faq-ratio",
      question: "What is the student-teacher ratio maintained in classrooms?",
      answer:
        "We strictly maintain an optimal 1:20 teacher-student ratio to ensure each student receives individualized mentoring and attention.",
    },
    {
      id: "faq-transport",
      question: "Are transport facilities available across Bagodar and surrounding regions?",
      answer:
        "Yes, our GPS-enabled, safe bus fleet covers all major routes across Bagodar, Saria, Dumri, Atka, Bishnugarh, and surrounding areas in Giridih district.",
    },
    {
      id: "faq-activities",
      question: "What extra-curricular and sports activities are provided?",
      answer:
        "We offer sports like cricket, football, basketball, badminton, table tennis, and martial arts, along with music, classical/contemporary dance, robotics, debate, and fine arts.",
    },
  ],

  cta: {
    title: "Admissions Open for Academic Year",
    subtitle: "Give your child the best start for a bright tomorrow.",
    buttonLabel: "ENQUIRE NOW",
  },
};
