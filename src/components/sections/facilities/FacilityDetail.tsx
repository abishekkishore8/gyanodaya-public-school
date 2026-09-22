import Link from "next/link";

import { cardAnchorId } from "@/components/common/ContentCardGrid";
import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";

/** One facility on a page of its own, with the others listed beside it. */
export default function FacilityDetail({ slug }: { slug: string }) {
  const { facilities } = useSiteContent();

  const facility = facilities.items.find((item) => cardAnchorId(item.title) === slug);

  if (!facility) {
    return (
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-8 text-center">
          <h1 style={{ color: GREEN }} className="font-serif text-2xl sm:text-3xl font-bold mb-3">
            Facility not found
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            This page may have been renamed. Browse everything on the facilities page instead.
          </p>
          <Link
            href="/facilities"
            style={{ backgroundColor: GREEN }}
            className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-sm uppercase tracking-wider hover:brightness-110 transition"
          >
            All facilities
          </Link>
        </div>
      </section>
    );
  }

  const others = facilities.items.filter((item) => item.id !== facility.id);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 text-[11px] sm:text-xs text-gray-500">
          <Link href="/facilities" className="hover:text-[#14452f]">
            Facilities
          </Link>
          <span className="mx-1.5">/</span>
          <span className="font-semibold text-gray-700">{facility.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            {facility.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg mb-6">
                <img
                  src={facility.imageUrl}
                  alt={facility.title}
                  className="w-full h-[260px] sm:h-[380px] object-cover"
                />
              </div>
            )}

            {facility.tag && (
              <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
                {facility.tag}
              </p>
            )}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {facility.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{facility.description}</p>
          </div>

          {/* The rest of the campus */}
          {others.length > 0 && (
            <aside className="rounded-2xl border border-gray-200/80 bg-[#f7faf8] p-5 sm:p-6">
              <h2 style={{ color: GREEN }} className="font-serif text-lg font-bold mb-3">
                More on campus
              </h2>
              <ul className="space-y-2">
                {others.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/facilities/${cardAnchorId(item.title)}`}
                      className="flex items-center justify-between gap-3 rounded-lg bg-white border border-gray-100 px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold text-gray-700 hover:border-[#14452f]/30 hover:text-[#14452f] transition-colors"
                    >
                      <span>{item.title}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
