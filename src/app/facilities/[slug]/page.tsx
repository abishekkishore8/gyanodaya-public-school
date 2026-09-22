import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

/** Title from the slug: the card titles themselves live in the database. */
function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = titleFromSlug(slug);

  return {
    title: `${title} | Facilities | Gyanodaya Public School, Bagodar`,
    description: `${title} at Gyanodaya Public School, Bagodar.`,
    alternates: { canonical: `/facilities/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SchoolSite page="facility" slug={slug} />;
}
