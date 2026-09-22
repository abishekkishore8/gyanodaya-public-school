import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD, GREEN } from "@/lib/theme";

/** The fee structure, one table per stage. */
export default function FeeStructure() {
  const { fees, academicSession } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  return (
    <section id="fees" className="py-12 sm:py-16 bg-white scroll-mt-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            SESSION {academicSession}
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Fee Structure
          </h1>
          {fees.intro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {fees.intro}
            </p>
          )}
        </div>

        {/* One table per stage */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fees.groups.map((group) => (
            <div
              key={group.id}
              className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm"
            >
              <div style={{ backgroundColor: GREEN }} className="px-5 py-3.5">
                <h2 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  {group.title}
                </h2>
                {group.subtitle && (
                  <p className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#dfb455] mt-0.5">
                    {group.subtitle}
                  </p>
                )}
              </div>

              <table className="w-full text-left text-xs sm:text-[13px]">
                <tbody className="divide-y divide-gray-100">
                  {group.rows.map((row) => (
                    <tr key={row.id} className="even:bg-[#f9faf9] align-top">
                      <th scope="row" className="px-4 py-3 font-semibold text-gray-700">
                        {row.label}
                        {row.note && <span className="block text-[11px] font-normal text-gray-400">{row.note}</span>}
                      </th>
                      <td className="px-4 py-3 text-right font-semibold whitespace-nowrap" style={{ color: GREEN }}>
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Notes */}
        {fees.notes.length > 0 && (
          <div className="mt-6 sm:mt-8 rounded-2xl border border-[#dfb455]/40 bg-[#fdfaf2] p-5 sm:p-6">
            <h2 style={{ color: GREEN }} className="font-semibold text-sm sm:text-base mb-3">
              Please note
            </h2>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {fees.notes.map((note) => (
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

        <div className="mt-8 text-center">
          <button
            onClick={() => setAdmissionModalOpen(true)}
            style={{ backgroundColor: GREEN }}
            className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-sm hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer shadow"
          >
            <span>ASK ABOUT FEES</span>
            <svg className="w-4 h-4 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
