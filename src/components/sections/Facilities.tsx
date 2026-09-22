import ContentCardGrid from "@/components/common/ContentCardGrid";
import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD } from "@/lib/theme";

/** Campus facilities, one card per area, maintained under Admin → Facilities. */
export default function Facilities() {
  const { facilities } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  return (
    <section id="facilities" className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            FACILITIES
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            World-Class Infrastructure
          </h2>
          {facilities.intro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
              {facilities.intro}
            </p>
          )}
        </div>

        <div className="mb-10 sm:mb-12">
          <ContentCardGrid items={facilities.items} />
        </div>

        {/* Campus Visit CTA */}
        <div className="text-center">
          <button
            onClick={() => setAdmissionModalOpen(true)}
            style={{ borderColor: "#14452f", color: "#14452f" }}
            className="inline-flex items-center gap-2 border-2 text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-sm hover:bg-[#14452f] hover:text-white transition-all uppercase tracking-wider cursor-pointer hover:scale-105"
          >
            <span>BOOK A CAMPUS VISIT</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
