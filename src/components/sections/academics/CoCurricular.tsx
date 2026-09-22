import ContentCardGrid from "@/components/common/ContentCardGrid";
import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD } from "@/lib/theme";

/** Clubs and activities that run alongside the curriculum. */
export default function CoCurricular() {
  const { academics } = useSiteContent();

  if (academics.coCurricular.length === 0) return null;

  return (
    <section id="co-curricular" className="py-12 sm:py-16 bg-white scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            BEYOND THE CLASSROOM
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Co-Curricular Activities
          </h2>
          {academics.coCurricularIntro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {academics.coCurricularIntro}
            </p>
          )}
        </div>

        <ContentCardGrid items={academics.coCurricular} />
      </div>
    </section>
  );
}
