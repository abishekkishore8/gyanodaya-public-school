/**
 * Default campus facilities. Seed and fallback only — the live page reads the
 * `facilities` part of the site document, maintained under Admin → Facilities.
 *
 * Each card's anchor is derived from its title, and the navigation sub-items
 * under FACILITIES link to those anchors — rename a card and the matching
 * sub-item in `navigation.ts` needs the same change.
 */

import type { FacilitiesContent } from "@/types/site";

export const INITIAL_FACILITIES: FacilitiesContent = {
  intro:
    "The campus is built around what a school day actually needs: light-filled classrooms, working laboratories, safe transport and staff who know where every child is.",

  items: [
    {
      id: "facility-infrastructure",
      title: "Infrastructure",
      tag: "Campus",
      description:
        "A purpose-built campus with wide corridors, an assembly ground, a covered area for the monsoon months and dedicated wings for the primary and senior school.",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "facility-classrooms",
      title: "Classrooms",
      tag: "Smart Boards",
      description:
        "Airy classrooms with digital boards and audio-visual aids, seating arranged so every child is within reach of the teacher.",
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "facility-laboratories",
      title: "Laboratories",
      tag: "Practical Work",
      description:
        "Physics, chemistry, biology and computer laboratories equipped to CBSE norms, with practicals scheduled through the year rather than crammed before the examination.",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "facility-transportation",
      title: "Transportation",
      tag: "GPS Tracked",
      description:
        "A bus fleet covering Bagodar, Sariya and the surrounding clusters, GPS tracked, with trained drivers and an attendant on every route.",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "facility-hostel",
      title: "Hostel",
      tag: "Residential",
      description:
        "Separate residential blocks for boys and girls with resident wardens, supervised evening study, a common dining hall and medical support on call.",
      imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop&auto=format&q=80",
    },
    {
      id: "facility-safety-security",
      title: "Safety & Security",
      tag: "24×7",
      description:
        "CCTV coverage of corridors and entry points, a controlled gate with visitor records, fire safety equipment, a first-aid room and staff trained in emergency drill.",
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&auto=format&q=80",
    },
  ],
};
