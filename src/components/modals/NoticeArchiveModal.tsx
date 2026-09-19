import NoticeCategoryIcon from "@/components/icons/NoticeCategoryIcon";
import { useUi } from "@/context/UiContext";

/** Lists every notice in one category, opening each as an official circular. */
export default function NoticeArchiveModal() {
  const { selectedNoticeCategory, setSelectedNoticeCategory, setSelectedNotice } = useUi();

  if (!selectedNoticeCategory) return null;

  return (
    <div
      className="fixed inset-0 z-[124] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
      onClick={() => setSelectedNoticeCategory(null)}
    >
      <div
        className="bg-white rounded-[1.75rem] shadow-2xl max-w-4xl w-full border border-[#14452f]/15 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 sm:px-7 py-5 border-b border-[#14452f]/10 bg-gradient-to-r from-[#f7fbf8] via-white to-[#f7fbf8]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-[#14452f]/8 border border-[#14452f]/12 flex items-center justify-center shrink-0">
                <NoticeCategoryIcon id={selectedNoticeCategory.id} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#14452f]/70">
                  Verified Desk Archive
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14452f] leading-tight">
                  {selectedNoticeCategory.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedNoticeCategory.sublabel} • {selectedNoticeCategory.items.length} item{selectedNoticeCategory.items.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedNoticeCategory(null)}
              className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer shrink-0"
              aria-label="Close archive"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-110px)] bg-[#fcfdfc]">
          {selectedNoticeCategory.items.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-[#14452f]/15 bg-white px-6 py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#14452f]/8 border border-[#14452f]/12 flex items-center justify-center mx-auto mb-4">
                <NoticeCategoryIcon id={selectedNoticeCategory.id} />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#14452f]">No items published yet</h4>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                This archive is currently empty. New verified updates will appear here as soon as they are published.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {selectedNoticeCategory.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedNoticeCategory(null);
                    setSelectedNotice(item);
                  }}
                  className="w-full text-left rounded-[1.35rem] border border-[#14452f]/10 bg-white p-4 sm:p-5 hover:border-[#14452f]/25 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-14 sm:w-16 shrink-0 bg-[#f0faf5] border border-[#14452f]/15 rounded-xl py-2 px-1 flex flex-col items-center justify-center leading-none text-center">
                      <span className="text-sm sm:text-base font-bold text-[#14452f]">{item.day}</span>
                      <span className="text-[10px] font-bold text-[#c59a3f] uppercase mt-1">{item.month}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.tagColor}`}>
                          {item.tag}
                        </span>
                        <span className="text-xs font-semibold text-[#14452f]">Open details →</span>
                      </div>
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                      <p className="text-xs text-gray-400 mt-3 font-medium">
                        Published on {item.date}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
