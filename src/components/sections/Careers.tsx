import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD, GREEN } from "@/lib/theme";

/** Open vacancies, with the application form one click away. */
export default function Careers() {
  const { recruitmentPositions } = useSiteContent();
  const { openJobApplication } = useUi();

  return (
    <section id="careers" className="py-12 sm:py-16 bg-white scroll-mt-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            WORK WITH US
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Careers at Gyanodaya
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We look for teachers who know their subject and enjoy the company of children. Applications are
            welcome against the vacancies below; suitable candidates are called for an interaction at the campus.
          </p>
        </div>

        {recruitmentPositions.length === 0 ? (
          <p className="rounded-2xl border border-gray-200/80 bg-[#f7faf8] px-6 py-10 text-center text-sm text-gray-600">
            There are no open vacancies at the moment. Please check back later.
          </p>
        ) : (
          <div className="space-y-5">
            {recruitmentPositions.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 style={{ color: GREEN }} className="font-serif text-lg sm:text-xl font-bold leading-tight">
                      {job.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] text-gray-500 mt-1">
                      {job.dept} · {job.type}
                    </p>
                  </div>

                  <button
                    onClick={() => openJobApplication(job)}
                    style={{ backgroundColor: GREEN }}
                    className="shrink-0 inline-flex items-center gap-2 text-white text-xs font-semibold px-5 py-2.5 rounded-sm hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer"
                  >
                    <span>Apply now</span>
                    <svg className="w-3.5 h-3.5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

                <p className="mt-3 text-xs sm:text-[13px] text-gray-600 leading-relaxed">{job.description}</p>

                <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-[#f9faf9] border border-gray-100 p-3.5">
                  {[
                    { label: "Vacancies", value: job.vacancies },
                    { label: "Experience", value: job.experience },
                    { label: "Qualification", value: job.qualification },
                    { label: "Apply by", value: job.deadline },
                  ].map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                        {detail.label}
                      </dt>
                      <dd className="text-[11.5px] sm:text-xs font-semibold text-gray-700 mt-0.5">{detail.value}</dd>
                    </div>
                  ))}
                </dl>

                {job.highlights.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-full border border-[#dfb455]/50 bg-[#fdfaf2] px-3 py-1 text-[10.5px] font-semibold text-[#8a6a1f]"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
