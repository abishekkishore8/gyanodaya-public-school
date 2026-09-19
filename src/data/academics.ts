/** Academic stage tabs, headline stats and per-stage curriculum content. */
// Academics tab categories & detailed curriculum data
export const ACADEMIC_TABS = [
  { id: "all", label: "Core Pillars", subtitle: "Foundation of Excellence" },
  { id: "pre-primary", label: "Pre-Primary", subtitle: "Nursery – UKG" },
  { id: "primary", label: "Primary Wing", subtitle: "Classes I – V" },
  { id: "middle", label: "Middle School", subtitle: "Classes VI – VIII" },
  { id: "senior", label: "Senior Secondary", subtitle: "Classes IX – XII" },
];

/** Tab ids, for deep-linking from the navigation (`/academics#primary`). */
export const ACADEMIC_TAB_IDS: readonly string[] = ACADEMIC_TABS.map((tab) => tab.id);

export const ACADEMIC_HIGHLIGHTS = [
  { value: "100%", label: "CBSE Board Pass Rate", detail: "Consistent distinctions" },
  { value: "1:20", label: "Mentor to Student Ratio", detail: "Personalized care" },
  { value: "30+", label: "Co-Curricular Clubs", detail: "Holistic development" },
  { value: "15+", label: "Smart & STEM Labs", detail: "Hands-on discovery" },
];

export const ACADEMICS_CARDS_DATA: Record<
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

