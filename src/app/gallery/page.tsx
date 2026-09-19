import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Photo Gallery | Gyanodaya Public School, Bagodar",
  description:
    "Photographs of campus life at Gyanodaya Public School, Bagodar — classrooms, laboratories, sports, cultural events and celebrations through the school year.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <SchoolSite page="gallery" />;
}
