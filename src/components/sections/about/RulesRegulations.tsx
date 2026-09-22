import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";

/** School rules, numbered so a parent can refer to one by its number. */
export default function RulesRegulations() {
  const { about } = useSiteContent();

  if (about.rules.length === 0) return null;

  return (
    <section id="rules" className="py-12 sm:py-16 bg-white scroll-mt-28">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            CODE OF CONDUCT
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Rules &amp; Regulations
          </h2>
          {about.rulesIntro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {about.rulesIntro}
            </p>
          )}
        </div>

        <ol className="space-y-3">
          {about.rules.map((rule, index) => (
            <li
              key={rule.id}
              className="flex gap-4 rounded-xl border border-gray-200/80 bg-[#f9faf9] p-4 sm:p-5 hover:border-[#14452f]/30 transition-colors"
            >
              <span
                style={{ backgroundColor: GREEN }}
                className="w-7 h-7 shrink-0 rounded-lg text-white text-xs font-bold flex items-center justify-center tabular-nums"
              >
                {index + 1}
              </span>
              <div>
                <h3 style={{ color: GREEN }} className="font-semibold text-sm sm:text-base mb-1">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">{rule.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
