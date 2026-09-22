/**
 * Default content for the About Us page.
 *
 * This is the seed and the fallback only — the live page reads the `about`
 * section of the site document, which an administrator maintains under
 * Admin → About us. Names are left blank until the school supplies them — the
 * page then shows the designation alone rather than a placeholder.
 */

import type { AboutContent } from "@/types/site";

/** Stand-in portrait used until a photograph is uploaded. */
const PLACEHOLDER_PORTRAIT = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=700&fit=crop&auto=format&q=80";

export const INITIAL_ABOUT: AboutContent = {
  vision:
    "To be the school of choice in Bagodar and the wider Giridih district — a place where every child grows into a confident, compassionate and capable citizen, equipped to meet the world with an open mind and a steady character.",
  mission:
    "To deliver the CBSE curriculum with rigour and imagination, to know every student as an individual, and to build discipline, curiosity and moral clarity alongside academic achievement.",

  missionPoints: [
    {
      id: "point-academics",
      title: "Academic rigour",
      text: "Concept-led teaching, continuous assessment and structured remedial support so no learner is carried along unnoticed.",
    },
    {
      id: "point-character",
      title: "Character first",
      text: "Honesty, punctuality, respect and service are taught as deliberately as any subject on the timetable.",
    },
    {
      id: "point-individual",
      title: "Every child known",
      text: "A teacher-student ratio that lets mentors track each child's progress, difficulties and strengths through the year.",
    },
    {
      id: "point-modern",
      title: "Modern learning",
      text: "Smart classrooms, science and computer laboratories, and a library that makes reading a habit rather than a task.",
    },
    {
      id: "point-safety",
      title: "A safe campus",
      text: "GPS-tracked transport, supervised corridors and a staff trained to notice when a child needs help.",
    },
    {
      id: "point-partnership",
      title: "Partnership with parents",
      text: "Regular interaction meets, open access to mentors, and a shared record of every child's progress.",
    },
  ],

  messages: [
    {
      id: "message-chairman",
      title: "Chairman's Message",
      name: "",
      designation: "Chairman, Gyanodaya Public School",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop&auto=format&q=80",
      quote: "",
      excerpt:
        "Education is the backbone of a progressing society. Our commitment has always been to give every child of Bagodar an education that builds character alongside competence.",
      body: [
        "Education is the backbone of a progressing society. When Gyanodaya Public School opened its gates in Bagodar, our promise to this region was a simple one: that no child here should have to travel far from home to receive an education that stands comparison with the best in the state.",
        "Two decades later, that promise is kept by a faculty who know every student by name, by classrooms that have kept pace with the way children learn today, and by parents who have placed their trust in us generation after generation.",
        "We are committed to developing the complete personality of our students — confident in thought, disciplined in work, and rooted in the values of their family and their community. To every parent considering Gyanodaya for their child, I extend a warm welcome.",
      ],
    },
    {
      id: "message-director",
      title: "Director's Message",
      name: "",
      designation: "Director, Gyanodaya Public School",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop&auto=format&q=80",
      quote: "",
      excerpt:
        "A curriculum is only as strong as the teaching behind it. We plan every session around continuous assessment, remedial support and the individual pace of each learner.",
      body: [
        "A curriculum is only as strong as the teaching behind it. Our academic plan follows the CBSE framework closely, but the way it reaches a classroom in Bagodar is ours — concept-led teaching, regular practice, and continuous assessment that tells a teacher what a child has actually understood.",
        "Results season brings a mix of relief and anxiety to every household. We work through the year to make sure that by the time a board examination arrives, no student is meeting the syllabus for the first time. Remedial classes, doubt-clearing sessions and subject mentoring run alongside the regular timetable.",
        "Equally, we measure a session by more than a mark sheet. Reading habits, laboratory work, public speaking and project learning all carry weight, because these are the skills that outlast the examination hall.",
      ],
    },
    {
      id: "message-principal",
      title: "Principal's Message",
      name: "",
      designation: "Principal, Gyanodaya Public School",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&auto=format&q=80",
      quote: "A child is not a vase to be filled, but a candle to be lit.",
      excerpt:
        "The role of education is to light the lamp of knowledge, kindle curiosity, and help young minds discover who they truly are.",
      body: [
        "The role of education is to light the lamp of knowledge, kindle curiosity, and help young minds discover who they truly are. A school that only fills a child with information has done half its work.",
        "At Gyanodaya, the day extends well beyond the last period. Houses compete, the library stays busy, the science and computer laboratories are open to anyone with a question, and our sports and cultural calendar gives every student a stage of their own.",
        "Our doors are always open to parents. The progress of a child is a shared responsibility, and the most meaningful results we have seen have come from home and school working in step.",
      ],
    },
  ],

  facultyIntro:
    "Our teachers are the school. Each member of the faculty is a subject specialist and a mentor to a group of students whose progress they follow through the year.",
  faculty: [
    {
      id: "faculty-1",
      name: "",
      designation: "Vice Principal",
      qualification: "M.A., B.Ed.",
      description: "Oversees the academic calendar, classroom observation and the mentoring programme across all wings.",
      imageUrl: PLACEHOLDER_PORTRAIT,
    },
    {
      id: "faculty-2",
      name: "",
      designation: "Head — Senior Secondary Wing",
      qualification: "M.Sc., B.Ed.",
      description: "Leads the science faculty and coordinates board examination preparation for Classes XI and XII.",
      imageUrl: PLACEHOLDER_PORTRAIT,
    },
    {
      id: "faculty-3",
      name: "",
      designation: "Head — Primary Wing",
      qualification: "M.A., B.Ed., NTT",
      description: "Guides foundational literacy and numeracy, and the transition from pre-primary into Class I.",
      imageUrl: PLACEHOLDER_PORTRAIT,
    },
    {
      id: "faculty-4",
      name: "",
      designation: "Coordinator — Activities & Sports",
      qualification: "M.P.Ed.",
      description: "Runs the inter-house calendar, sports training and the school's cultural programme.",
      imageUrl: PLACEHOLDER_PORTRAIT,
    },
  ],

  rulesIntro:
    "These rules exist to keep the campus orderly, safe and fair to every student. Admission to Gyanodaya Public School is taken as an undertaking by both student and parent to observe them.",
  rules: [
    {
      id: "rule-attendance",
      title: "Attendance",
      text: "A minimum of 75% attendance is required to appear in the annual examination. Leave must be applied for in writing, and medical leave supported by a certificate.",
    },
    {
      id: "rule-uniform",
      title: "Uniform and appearance",
      text: "The prescribed uniform, including school shoes and the identity card, is to be worn on every working day. Hair is to be kept neat; jewellery and cosmetics are not permitted.",
    },
    {
      id: "rule-punctuality",
      title: "Punctuality",
      text: "Students must reach school before the assembly bell. Repeated late arrival will be reported to parents and may result in the student being sent home.",
    },
    {
      id: "rule-conduct",
      title: "Conduct",
      text: "Courtesy towards teachers, staff and fellow students is expected at all times. Bullying, ragging and abusive language are treated as serious offences.",
    },
    {
      id: "rule-property",
      title: "School property",
      text: "Furniture, laboratory equipment, library books and campus grounds are to be treated with care. Wilful damage will be charged to the student concerned.",
    },
    {
      id: "rule-devices",
      title: "Mobile phones and valuables",
      text: "Mobile phones and expensive personal items are not permitted on campus. The school accepts no responsibility for items brought against this rule.",
    },
    {
      id: "rule-transport",
      title: "Transport discipline",
      text: "Students using school transport must board and alight only at the assigned stop and follow the instructions of the bus attendant at all times.",
    },
    {
      id: "rule-fees",
      title: "Fees",
      text: "Fees are payable by the due date announced for each term. Continued default may lead to the student's name being struck off the rolls.",
    },
  ],

  parentTeacherIntro:
    "A child does best when home and school say the same things. Our parent-teacher relationship is built on regular, honest and two-way contact rather than a single meeting at the end of the year.",
  parentTeacher: [
    {
      id: "ptr-meetings",
      title: "Parent-teacher meetings",
      text: "Held after every major assessment. Mentors discuss academic progress, attendance, conduct and co-curricular participation, and agree on what to work on next.",
    },
    {
      id: "ptr-mentor",
      title: "A named mentor",
      text: "Every student is assigned a mentor whom parents may contact for anything concerning their child's progress or wellbeing.",
    },
    {
      id: "ptr-communication",
      title: "Day-to-day communication",
      text: "Circulars, the school diary and the parent app carry notices, examination schedules and attendance so nothing reaches a parent second-hand.",
    },
    {
      id: "ptr-association",
      title: "Parent-teacher association",
      text: "Parent representatives take part in planning events, reviewing school facilities and raising concerns on behalf of their class.",
    },
    {
      id: "ptr-support",
      title: "Support at home",
      text: "Teachers share what a parent can practically do at home — reading routines, supervised study time, and screen-time limits appropriate to the age group.",
    },
  ],
};
