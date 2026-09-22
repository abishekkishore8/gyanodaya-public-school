import ContentCardGrid from "@/components/common/ContentCardGrid";
import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD } from "@/lib/theme";

/** Games, athletics and physical training. */
export default function Sports() {
  const { academics } = useSiteContent();

  if (academics.sports.length === 0) return null;

  return (
    <section id="sports" className="py-12 sm:py-16 bg-[#f7faf8] scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            ON THE FIELD
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Sports &amp; Games
          </h2>
          {academics.sportsIntro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {academics.sportsIntro}
            </p>
          )}
        </div>

        <ContentCardGrid items={academics.sports} />
      </div>
    </section>
  );
}
