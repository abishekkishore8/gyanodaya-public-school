import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

/**
 * A curriculum stage on a page of its own.
 *
 * The stages themselves are administrator-managed, so this route does not keep
 * a list of them: it passes the segment through and the academics section opens
 * that tab, falling back to the first stage when the segment is unknown.
 */
function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stage: string }>;
}): Promise<Metadata> {
  const { stage } = await params;
  const title = titleFromSlug(stage);

  return {
    title: `${title} | Academics | Gyanodaya Public School, Bagodar`,
    description: `${title} curriculum at Gyanodaya Public School, Bagodar — CBSE affiliated, Nursery to Class XII.`,
    alternates: { canonical: `/academics/${stage}` },
  };
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  return <SchoolSite page="academics" stage={stage} />;
}
