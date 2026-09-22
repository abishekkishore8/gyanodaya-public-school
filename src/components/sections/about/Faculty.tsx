import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";

/** Teaching faculty: photograph, designation, qualification and what they do. */
export default function Faculty() {
  const { about } = useSiteContent();

  if (about.faculty.length === 0) return null;

  return (
    <section id="faculty" className="py-12 sm:py-16 bg-[#f7faf8] scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            OUR TEACHERS
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Faculty
          </h2>
          {about.facultyIntro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {about.facultyIntro}
            </p>
          )}
        </div>

        {/* Faculty Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {about.faculty.map((member) => (
            <article
              key={member.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 sm:h-60 overflow-hidden bg-gray-200">
                <img
                  src={member.imageUrl}
                  alt={member.name ? `${member.name}, ${member.designation}` : member.designation}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1f15]/85 to-transparent px-4 pt-8 pb-3">
                  {member.name && (
                    <p className="font-serif font-bold text-white text-sm sm:text-base leading-tight">
                      {member.name}
                    </p>
                  )}
                  <p className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] text-[#dfb455]">
                    {member.designation}
                  </p>
                </div>
              </div>

              <div className="p-4 flex flex-col grow">
                {member.qualification && (
                  <p style={{ color: GREEN }} className="text-[11px] sm:text-xs font-semibold mb-1.5">
                    {member.qualification}
                  </p>
                )}
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
