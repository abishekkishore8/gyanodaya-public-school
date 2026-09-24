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

        {/* Council cards — same layout as the faculty cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {academics.council.map((member) => (
            <article
              key={member.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 sm:h-60 overflow-hidden bg-[#f1f4f1]">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name ? `${member.name}, ${member.role}` : member.role}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  // The post's initial when there is no photograph yet
                  <span
                    style={{ color: GREEN }}
                    className="grid h-full w-full place-items-center pb-10 font-serif text-6xl font-bold opacity-25"
                    aria-hidden="true"
                  >
                    {member.role.charAt(0)}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1f15]/85 to-transparent px-4 pt-8 pb-3">
                  {member.name && (
                    <p className="font-serif font-bold text-white text-sm sm:text-base leading-tight">{member.name}</p>
                  )}
                  <p className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] text-[#dfb455]">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="p-4 flex flex-col grow">
                {member.studentClass && (
                  <p style={{ color: GREEN }} className="text-[11px] sm:text-xs font-semibold mb-1.5">
                    {member.studentClass}
                  </p>
                )}
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">{member.responsibility}</p>
                {member.quote && (
                  <blockquote
                    style={{ borderColor: GOLD }}
                    className="mt-3 border-l-2 pl-3 font-serif text-xs sm:text-[13px] italic text-gray-700 leading-relaxed"
                  >
                    “{member.quote}”
                  </blockquote>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
