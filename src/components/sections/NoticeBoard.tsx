import NoticeCategoryIcon from "@/components/icons/NoticeCategoryIcon";
import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { INITIAL_RECRUITMENT_POSITIONS } from "@/data/recruitment";

/** Three-column bulletin board: circulars, announcements and open vacancies. */
export default function NoticeBoard() {
  const { noticeCategories, recruitmentPositions } = useSiteContent();
  const { setSelectedNotice, openNoticeArchive, openJobApplication } = useUi();

  /** The recruitment column links straight to an application for the newest vacancy. */
  const featuredVacancy = recruitmentPositions[0] || INITIAL_RECRUITMENT_POSITIONS[0];

  return (
    <section
      id="notice-board"
      className="py-14 sm:py-18 bg-gradient-to-b from-[#f2f6f3] via-[#f7faf8] to-white border-b border-gray-200/90 relative overflow-hidden"
    >
      {/* Anchor targets */}
      <div id="notices" className="absolute -top-24" />
      <div id="announcements" className="absolute -top-24" />
      <div id="recruitment" className="absolute -top-24" />
      <div id="career" className="absolute -top-24" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#14452f]/10 text-[#14452f] px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#dfb455] animate-ping" />
            <span>GPS BAGODAR • OFFICIAL NOTICE DESK</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Notice Board &amp; <span className="text-[#14452f] italic font-normal">Latest Updates</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1.5 max-w-lg mx-auto leading-relaxed">
            Access verified CBSE circulars, campus event announcements, and active faculty recruitment notices updated daily.
          </p>
        </div>

        {/* 3 Unified Institutional Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {noticeCategories.map((cat, catIdx) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-lg hover:border-[#14452f]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full"
            >
              {/* Column Header Bar */}
              <div className="bg-[#14452f] p-4 sm:p-4.5 border-b-2 border-[#dfb455] flex items-center justify-between gap-3 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <NoticeCategoryIcon id={cat.id} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg leading-tight tracking-wide text-white">
                      {cat.label}
                    </h3>
                    <div className="text-[11px] text-gray-200/90 font-normal mt-0.5">
                      {cat.sublabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0 bg-[#dfb455] text-[#14452f]">
                    {cat.badge || `${cat.items.length} Items`}
                  </span>
                </div>
              </div>

              {/* Notice Items List */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col divide-y divide-gray-100 bg-white">
                {cat.items.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-xs italic">
                    No notices currently posted in this category.
                  </div>
                ) : (
                  cat.items.map((item, itemIdx) => (
                    <div
                      key={item.id || itemIdx}
                      className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0 group/item cursor-pointer hover:bg-[#f7faf8] rounded-xl p-2 -mx-1 transition-all relative"
                      onClick={() => {
                        if (cat.id === "recruitment") {
                          openJobApplication(featuredVacancy);
                        } else {
                          setSelectedNotice(item);
                        }
                      }}
                    >
                      {/* Left Date Stamp Badge */}
                      <div className="w-12 sm:w-14 shrink-0 bg-[#f0faf5] border border-[#14452f]/15 rounded-lg py-1.5 px-1 flex flex-col items-center justify-center leading-none text-center group-hover/item:border-[#14452f]/40 transition-colors">
                        <span className="text-xs sm:text-sm font-bold text-[#14452f]">{item.day}</span>
                        <span className="text-[9px] font-bold text-[#c59a3f] uppercase mt-0.5">{item.month}</span>
                      </div>

                      {/* Right Notice Information */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                          <span className={`text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.tagColor}`}>
                            {item.tag}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-400 font-medium group-hover/item:text-[#14452f] transition-colors shrink-0">
                              Details →
                            </span>
                          </div>
                        </div>

                        <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 group-hover/item:text-[#14452f] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 text-[11px] leading-relaxed mt-0.5 line-clamp-2 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Column Action Footer */}
              <div className="p-3.5 bg-[#f9faf9] border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified Desk</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (cat.id === "recruitment") {
                        openJobApplication(featuredVacancy);
                      } else {
                        openNoticeArchive(cat.id);
                      }
                    }}
                    className="text-[#14452f] hover:text-[#c59a3f] font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{cat.id === "recruitment" ? "Apply Online" : "View All"}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
