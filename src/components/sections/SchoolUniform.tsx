import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";

/** The prescribed school uniform, linked from the admissions navigation. */
export default function SchoolUniform() {
  const { uniform } = useSiteContent();

  if (uniform.sets.length === 0) return null;

  return (
    <section id="uniform" className="py-12 sm:py-16 bg-white scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            DRESS CODE
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            School Uniform
          </h2>
          {uniform.intro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {uniform.intro}
            </p>
          )}
        </div>

        {/* One card per uniform */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {uniform.sets.map((set) => (
            <article
              key={set.id}
              className="flex flex-col rounded-2xl border border-gray-200/80 bg-white shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {set.imageUrl && (
                <div className="h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <img
                    src={set.imageUrl}
                    alt={set.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div style={{ backgroundColor: GREEN }} className="px-5 py-3.5">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  {set.title}
                </h3>
                {set.days && (
                  <p className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#dfb455] mt-0.5">
                    {set.days}
                  </p>
                )}
              </div>

              <ul className="divide-y divide-gray-100 grow">
                {set.items.map((item) => (
                  <li key={item.id} className="px-5 py-3">
                    <p style={{ color: GREEN }} className="text-xs sm:text-[13px] font-semibold">
                      {item.label}
                    </p>
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mt-0.5">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Guidance */}
        {uniform.notes.length > 0 && (
          <div className="mt-6 sm:mt-8 rounded-2xl border border-[#dfb455]/40 bg-[#fdfaf2] p-5 sm:p-6">
            <h3 style={{ color: GREEN }} className="font-semibold text-sm sm:text-base mb-3">
              Please note
            </h3>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {uniform.notes.map((note) => (
                <li key={note.id} className="flex gap-2.5 text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  <span style={{ color: GOLD }} className="font-bold shrink-0">
                    •
                  </span>
                  <span>{note.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
