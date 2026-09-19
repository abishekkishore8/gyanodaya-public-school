import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Notice Board, Circulars & Careers | Gyanodaya Public School, Bagodar",
  description:
    "Latest notices, circulars, announcements and teaching vacancies at Gyanodaya Public School, Bagodar. Check examination dates, holidays and recruitment openings.",
  alternates: { canonical: "/notice-board" },
};

export default function NoticeBoardPage() {
  return <SchoolSite page="notice-board" />;
}
