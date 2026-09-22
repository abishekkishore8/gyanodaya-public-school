import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD, GREEN } from "@/lib/theme";

/** How the school and parents work together through the year. */
export default function ParentTeacher() {
  const { about } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  if (about.parentTeacher.length === 0) return null;

  return (
    <section id="parent-teacher" className="py-12 sm:py-16 bg-[#f7faf8] scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 grid gap-8 lg:gap-12 lg:grid-cols-[380px_1fr] items-start">

        {/* Section Header */}
        <div>
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            WORKING TOGETHER
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Parent-Teacher Relation
          </h2>
          {about.parentTeacherIntro && (
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">{about.parentTeacherIntro}</p>
          )}

          <button
            onClick={() => setAdmissionModalOpen(true)}
            style={{ backgroundColor: GREEN }}
            className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-sm hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer shadow hover:scale-102"
          >
            <span>TALK TO US</span>
            <svg className="w-4 h-4 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Shared Responsibilities */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
          {about.parentTeacher.map((point) => (
            <div
              key={point.id}
              className="rounded-xl bg-white border border-gray-100 shadow-sm p-5 hover:shadow-lg transition-shadow"
            >
              <h3 style={{ color: GREEN }} className="font-semibold text-sm sm:text-base mb-1.5">
                {point.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
