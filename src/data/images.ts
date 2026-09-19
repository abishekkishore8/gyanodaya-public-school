import type { ImageAssetsDocument } from "@/types/site";
import { HERO_SLIDES } from "./hero";

/** Fallback image assets used before the API responds, and as a per-id fallback. */
export const INITIAL_IMAGE_ASSETS: ImageAssetsDocument = {
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
