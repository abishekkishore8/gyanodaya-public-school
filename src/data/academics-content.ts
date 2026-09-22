/**
 * Default co-curricular, sports and student council content for the academics
 * page. Seed and fallback only — the live page reads the `academics` part of
 * the site document, maintained under Admin → Academics.
 *
 * The curriculum tabs are part of the same field, so they are editable too.
 */

import type { AcademicsContent } from "@/types/site";

export const INITIAL_ACADEMICS: AcademicsContent = {
  curriculum: {
    highlights: [
      { id: "metric-1", value: "100%", label: "CBSE Board Pass Rate", detail: "Consistent distinctions" },
      { id: "metric-2", value: "1:20", label: "Mentor to Student Ratio", detail: "Personalized care" },
      { id: "metric-3", value: "30+", label: "Co-Curricular Clubs", detail: "Holistic development" },
      { id: "metric-4", value: "15+", label: "Smart & STEM Labs", detail: "Hands-on discovery" },
    ],

    stages: [
      {
        id: "all",
        label: "Core Pillars",
        subtitle: "Foundation of Excellence",
        tagline: "A transformative, values-steeped learning environment aligned with CBSE standards & NEP 2020.",
        description:
          "At Gyanodaya Public School, academic rigor is harmoniously blended with character building, digital fluency, and experiential inquiry so that every child blossoms into a confident, responsible global citizen.",
        bannerTitle: "Holistic Learning Continuum",
        bannerSubtitle: "Nursery through Class XII CBSE Affiliated",
        bannerImageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&h=700&fit=crop&auto=format&q=80",
        bannerFeatures: [
          "CBSE Affiliated Curriculum with NEP 2020 pedagogical standards",
          "Experiential STEM & Robotics learning with real-world applications",
          "Continuous Comprehensive Evaluation (CCE) & individual mentor guidance",
        ],
        cards: [
          {
            id: "all-card-1",
            title: "CBSE Curriculum",
            desc:
              "Comprehensive national curriculum engineered for conceptual depth, analytical precision, and board exam mastery.",
            badge: "CBSE Affiliated",
            iconType: "curriculum",
          },
          {
            id: "all-card-2",
            title: "Experienced Faculty",
            desc:
              "Passionate educators and subject experts delivering personalized mentorship, moral guidance, and academic support.",
            badge: "1:20 Ratio",
            iconType: "faculty",
          },
          {
            id: "all-card-3",
            title: "Innovative STEM Learning",
            desc:
              "Hands-on robotics, computer science labs, experiential science kits, and modern inquiry-based experimentation.",
            badge: "Future-Ready",
            iconType: "stem",
          },
          {
            id: "all-card-4",
            title: "Excellence Driven",
            desc:
              "A balanced integration of competitive sports, fine arts, debating, leadership councils, and moral character refining.",
            badge: "All-Round Growth",
            iconType: "excellence",
          },
        ],
      },
      {
        id: "pre-primary",
        label: "Pre-Primary",
        subtitle: "Nursery – UKG",
        tagline: "Joyful foundational learning creating lifelong love for discovery, reading, and friendship.",
        description:
          "Our early childhood wing combines Montessori principles with playful inquiry, sensory stations, and storytelling to nurture natural wonder, emotional intelligence, and motor confidence in our youngest learners.",
        bannerTitle: "Foundational Years (Nursery, LKG, UKG)",
        bannerSubtitle: "Ages 3 to 6 · Play, Learn & Grow",
        bannerImageUrl: "https://images.unsplash.com/photo-1587691592099-24045742c181?w=1000&h=700&fit=crop&auto=format&q=80",
        bannerFeatures: [
          "Safe, vibrant child-friendly discovery rooms and activity corners",
          "Jolly Phonics, musical rhymes, puppet theatre & creative storytelling",
          "Sensory motor development through indoor tactile play & sand zones",
        ],
        cards: [
          {
            id: "pre-primary-card-1",
            title: "Play-Based Discovery",
            desc:
              "Montessori-inspired interactive activity zones promoting sensory development, fine motor skills, and creative joy.",
            badge: "Nursery - UKG",
            iconType: "play",
          },
          {
            id: "pre-primary-card-2",
            title: "Foundational Literacy & Phonics",
            desc:
              "Engaging storytelling, phonetic sounds, multilingual conversational confidence, and social bonding.",
            badge: "Early Years",
            iconType: "phonics",
          },
        ],
      },
      {
        id: "primary",
        label: "Primary Wing",
        subtitle: "Classes I – V",
        tagline: "Building core competencies in mathematics, science inquiry, expressive language, and civic values.",
        description:
          "Classes I to V transition children into structured learning while keeping curiosity active through interactive projects, mathematics manipulatives, bilingual expression, and daily sports.",
        bannerTitle: "Primary Wing (Classes I – V)",
        bannerSubtitle: "Ages 6 to 11 · Core Competency & Confidence",
        bannerImageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&h=700&fit=crop&auto=format&q=80",
        bannerFeatures: [
          "Activity-led conceptual mathematics & Environmental Studies (EVS)",
          "Language lab immersion for fluent English & Hindi reading and writing",
          "Physical education, martial arts, vocal music & visual arts integration",
        ],
        cards: [
          {
            id: "primary-card-1",
            title: "Conceptual Mathematics & Science",
            desc:
              "Activity-based mathematical reasoning, environmental awareness, and foundational curiosity.",
            badge: "Class I - V",
            iconType: "math",
          },
          {
            id: "primary-card-2",
            title: "Creative Arts & Physical Fitness",
            desc:
              "Daily sports training, martial arts, vocal music, dance, and creative theatrical expression.",
            badge: "Holistic Core",
            iconType: "arts",
          },
        ],
      },
      {
        id: "middle",
        label: "Middle School",
        subtitle: "Classes VI – VIII",
        tagline: "Sharpening critical thinking, scientific inquiry, digital literacy, and collaborative leadership.",
        description:
          "Classes VI to VIII prepare students for rigorous academic concepts with specialized subject teachers, hands-on lab experiments, coding fundamentals, and inter-house debates.",
        bannerTitle: "Middle School (Classes VI – VIII)",
        bannerSubtitle: "Ages 11 to 14 · Inquiry, Logic & Expression",
        bannerImageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&h=700&fit=crop&auto=format&q=80",
        bannerFeatures: [
          "Dedicated Physics, Chemistry, Biology & Computer Science laboratories",
          "Coding, algorithmic thinking & introduction to Artificial Intelligence",
          "Inter-school debating, Model UN & social responsibility outreach",
        ],
        cards: [
          {
            id: "middle-card-1",
            title: "Analytical Science & Technology",
            desc:
              "Applied physics, chemistry, biology practicals, computer coding, and algorithmic thinking.",
            badge: "Class VI - VIII",
            iconType: "tech",
          },
          {
            id: "middle-card-2",
            title: "Debating & Global Awareness",
            desc:
              "Model UN, inter-school declamations, history, geography excursions, and social ethics projects.",
            badge: "Leadership Skills",
            iconType: "debate",
          },
        ],
      },
      {
        id: "senior",
        label: "Senior Secondary",
        subtitle: "Classes IX – XII",
        tagline: "Mastering CBSE Board syllabus alongside structured competitive entrance coaching.",
        description:
          "Classes IX to XII offer rigorous academic streams (Science, Commerce, Arts) backed by experienced mentors, personalized doubt clinics, mock board exams, and career roadmap counseling.",
        bannerTitle: "Senior Secondary (Classes IX – XII)",
        bannerSubtitle: "Ages 14 to 18 · Board Distinction & Entrance Mastery",
        bannerImageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1000&h=700&fit=crop&auto=format&q=80",
        bannerFeatures: [
          "Tailored streams: Science (PCM/PCB), Commerce, and Humanities",
          "Integrated test series for CBSE Boards, JEE, NEET, CUET & NDA",
          "One-on-one academic counseling, scholarship aid & university guidance",
        ],
        cards: [
          {
            id: "senior-card-1",
            title: "Board Exam Mastery (Class IX - XII)",
            desc:
              "Specialized streams in Science, Commerce, and Humanities with rigorous concept drilling and mentorship.",
            badge: "Class IX - XII",
            iconType: "board",
          },
          {
            id: "senior-card-2",
            title: "Competitive Exam Preparation",
            desc:
              "Dedicated guidance for JEE, NEET, CUET, and NDA along with comprehensive career counseling.",
            badge: "Success Track",
            iconType: "exam",
          },
        ],
      },
    ],
  },
  coCurricularIntro:
    "The timetable makes room for what a syllabus cannot teach. Every student takes part in at least one activity through the year, and the inter-house calendar gives each of them a stage.",
  coCurricular: [
    {
      id: "cc-music",
      title: "Music & Dance",
      tag: "Performing Arts",
      description: "Vocal and instrumental training, classical and folk dance, and preparation for the annual cultural evening.",
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "cc-art",
      title: "Art & Craft",
      tag: "Creative",
      description: "Drawing, painting, clay work and craft, with student work displayed through the year and at the annual exhibition.",
      imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "cc-debate",
      title: "Debate & Literary Club",
      tag: "Public Speaking",
      description: "Declamation, debate, quiz and creative writing, building the confidence to speak and argue well.",
      imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "cc-science",
      title: "Science & Robotics Club",
      tag: "STEM",
      description: "Working models, experiments and robotics projects that take classroom theory onto the bench.",
      imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "cc-eco",
      title: "Eco Club & Community Service",
      tag: "Values",
      description: "Tree plantation, campus cleanliness drives and community outreach in and around Bagodar.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "cc-computer",
      title: "Computer & Digital Literacy",
      tag: "Technology",
      description: "Typing, coding fundamentals, presentations and safe use of the internet, from the primary wing upwards.",
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop&auto=format&q=80",
    },
  ],

  sportsIntro:
    "Games are a period on the timetable, not an afterthought. Every house competes through the year, and students who show promise are coached for district and state level meets.",
  sports: [
    {
      id: "sport-cricket",
      title: "Cricket",
      tag: "Inter-house",
      description: "Practice nets and a full inter-house league through the winter term.",
      imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "sport-football",
      title: "Football",
      tag: "Team Sport",
      description: "Coached practice for junior and senior teams, with inter-school fixtures each season.",
      imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "sport-athletics",
      title: "Athletics",
      tag: "Annual Meet",
      description: "Sprints, relays, long jump and shot put, culminating in the annual sports day.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "sport-indoor",
      title: "Indoor Games",
      tag: "All Year",
      description: "Chess, carrom and table tennis, played through the games period and the monsoon months.",
      imageUrl: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "sport-yoga",
      title: "Yoga & Physical Training",
      tag: "Wellness",
      description: "Morning drill, yoga and fitness routines that run for every class through the week.",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "sport-kabaddi",
      title: "Kabaddi & Kho-Kho",
      tag: "Traditional",
      description: "Traditional games kept alive on the school ground, with inter-house tournaments each year.",
      imageUrl: "https://images.unsplash.com/photo-1526676537331-7748c7b1b0ed?w=800&h=600&fit=crop&auto=format&q=80",
    },
  ],

  councilIntro:
    "The student council carries real responsibility for the running of the school. Posts are held for one academic session and are awarded on conduct, consistency and the confidence of the student body.",
  council: [
    {
      id: "council-head-boy",
      role: "Head Boy",
      name: "",
      studentClass: "",
      responsibility: "Leads the assembly, represents students to the leadership, and supports discipline across the senior wing.",
      imageUrl: "",
    },
    {
      id: "council-head-girl",
      role: "Head Girl",
      name: "",
      studentClass: "",
      responsibility: "Leads the assembly alongside the Head Boy and coordinates student participation in school events.",
      imageUrl: "",
    },
    {
      id: "council-sports-captain",
      role: "Sports Captain",
      name: "",
      studentClass: "",
      responsibility: "Organises inter-house fixtures with the physical education staff and leads the annual sports day.",
      imageUrl: "",
    },
    {
      id: "council-cultural-secretary",
      role: "Cultural Secretary",
      name: "",
      studentClass: "",
      responsibility: "Plans the cultural calendar, auditions and the annual function with the activities coordinator.",
      imageUrl: "",
    },
    {
      id: "council-discipline-prefect",
      role: "Discipline Prefect",
      name: "",
      studentClass: "",
      responsibility: "Oversees punctuality, uniform and corridor conduct, and reports to the discipline committee.",
      imageUrl: "",
    },
    {
      id: "council-house-captains",
      role: "House Captains",
      name: "",
      studentClass: "",
      responsibility: "One captain per house, responsible for house points, participation and the house notice board.",
      imageUrl: "",
    },
  ],
};
