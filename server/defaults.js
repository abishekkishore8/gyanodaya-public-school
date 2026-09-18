export const INITIAL_ANNOUNCEMENTS = [
  "📢 Admissions open for Session 2025-26. Limited seats available from Nursery to Class XI.",
  "🏆 GPS Bagodar students secure district-level honors in Science Exhibition and Debate Championship.",
  "🚌 New GPS transport routes launched for Bagodar, Sariya, and nearby residential clusters.",
  "🎓 Scholarship-cum-Admission Test registrations now live for meritorious students.",
];

export const INITIAL_NOTICE_CATEGORIES = [
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

export const INITIAL_RECRUITMENT_POSITIONS = [
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

export const INITIAL_SUBMISSIONS = [];

export const INITIAL_IMAGE_ASSETS = {
  heroSlides: [
    {
      id: "hero-1",
      section: "hero",
      label: "Hero Slide 1",
      url: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1920&h=1080&fit=crop&auto=format",
      alt: "Students walking on campus",
    },
    {
      id: "hero-2",
      section: "hero",
      label: "Hero Slide 2",
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop&auto=format",
      alt: "Students in graduation caps",
    },
    {
      id: "hero-3",
      section: "hero",
      label: "Hero Slide 3",
      url: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop&auto=format",
      alt: "School building exterior",
    },
    {
      id: "hero-4",
      section: "hero",
      label: "Hero Slide 4",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop&auto=format",
      alt: "Students in classroom",
    },
  ],
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
  misc: [],
};

export function createDefaultSiteContent() {
  return {
    academicSession: "2025–26",
    parentsLoginUrl: "https://play.google.com/store/search?q=gyanodaya+public+school+bagodar&c=apps",
    announcements: INITIAL_ANNOUNCEMENTS,
    noticeCategories: INITIAL_NOTICE_CATEGORIES,
    recruitmentPositions: INITIAL_RECRUITMENT_POSITIONS,
    formSubmissions: INITIAL_SUBMISSIONS,
    imageAssets: INITIAL_IMAGE_ASSETS,
  };
}