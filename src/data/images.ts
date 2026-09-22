import type { ImageAssetsDocument } from "@/types/site";

/** Fallback image assets used before the API responds, and as a per-id fallback. */
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
