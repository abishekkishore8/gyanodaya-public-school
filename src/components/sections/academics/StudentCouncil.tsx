import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";

/** The student council: one card per post, with the holder when named. */
export default function StudentCouncil() {
  const { academics } = useSiteContent();

  if (academics.council.length === 0) return null;

  return (
    <section id="student-council" className="py-12 sm:py-16 bg-white scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            STUDENT LEADERSHIP
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Student Council
          </h2>
          {academics.councilIntro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {academics.councilIntro}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {academics.council.map((member) => (
            <article
              key={member.id}
              className="flex gap-4 rounded-xl border border-gray-200/80 bg-[#f9faf9] p-4 sm:p-5 hover:border-[#14452f]/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Photograph, or the post's initial when there is none */}
              <div className="shrink-0">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name ? `${member.name}, ${member.role}` : member.role}
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top border-2 border-[#dfb455]/60"
                  />
                ) : (
                  <span
                    style={{ backgroundColor: GREEN }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-serif text-xl font-bold text-[#dfb455]"
                    aria-hidden="true"
                  >
                    {member.role.charAt(0)}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h3 style={{ color: GREEN }} className="font-serif font-bold text-sm sm:text-base leading-tight">
                  {member.role}
                </h3>
                {(member.name || member.studentClass) && (
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-0.5">
                    {[member.name, member.studentClass].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mt-1.5">
                  {member.responsibility}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
