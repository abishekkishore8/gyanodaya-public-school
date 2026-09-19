import SchoolLogo from "@/components/common/SchoolLogo";
import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { noticeBodyParagraphs, noticeReferenceNumber } from "@/lib/notices";
import { GREEN } from "@/lib/theme";

/** Official circular rendered on a school letterhead. */
export default function NoticeCircularModal() {
  const { showToast } = useToast();
  const { selectedNotice, setSelectedNotice } = useUi();

  if (!selectedNotice) return null;

  const referenceNumber = noticeReferenceNumber(selectedNotice);
  const bodyParagraphs = noticeBodyParagraphs(selectedNotice);

  return (
    <div
      className="fixed inset-0 z-[125] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
      onClick={() => setSelectedNotice(null)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative border-2 border-[#14452f]/20 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedNotice(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* Official Letterhead Header */}
        <div className="flex items-center gap-3.5 pb-5 border-b-2 border-[#14452f]/30 mb-5">
          <SchoolLogo className="w-12 h-12 sm:w-14 sm:h-14 shrink-0" />
          <div>
            <h3 className="font-serif font-bold text-base sm:text-xl text-[#14452f] leading-tight">
              GYANODAYA PUBLIC SCHOOL
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold text-gray-600">
              Affiliated to CBSE, New Delhi • Bagodar, Giridih District, Jharkhand
            </p>
            <p className="text-[10px] text-gray-400 font-mono mt-0.5">
              Ref No: <strong>{referenceNumber}</strong> | Date: <strong>{selectedNotice.date}</strong>
            </p>
          </div>
        </div>

        {/* Notice Title & Priority Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h4 className="font-serif text-lg sm:text-xl font-bold text-gray-900 leading-snug">
            {selectedNotice.title}
          </h4>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shrink-0 border ${selectedNotice.tagColor}`}
          >
            {selectedNotice.tag}
          </span>
        </div>

        {/* Notice Body Paragraphs */}
        <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#f9faf9] p-4 sm:p-5 rounded-xl border border-gray-200/80 mb-6">
          {bodyParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Signatory & Official Stamp Block */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-200 mb-6 text-xs">
          <div className="text-gray-500">
            <p className="font-semibold text-gray-700">Target Audience:</p>
            <p>{selectedNotice.audience || "All Students, Parents & Staff"}</p>
          </div>

          <div className="text-right">
            <div className="font-serif font-bold text-sm text-[#14452f]">
              Office of the Principal
            </div>
            <div className="text-[10.5px] text-gray-500">
              Gyanodaya Public School, Bagodar
            </div>
            <div className="text-[9px] font-mono text-emerald-700 mt-0.5 font-bold uppercase tracking-wider">
              ✓ Digitally Verified Circular
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              showToast(`📄 Downloading official circular PDF: ${referenceNumber}.pdf (${selectedNotice.fileSize || "1.2 MB"})...`);
              setSelectedNotice(null);
            }}
            style={{ backgroundColor: GREEN }}
            className="w-full sm:w-auto text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <svg className="w-4 h-4 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Official Circular PDF</span>
          </button>

          <button
            onClick={() => setSelectedNotice(null)}
            className="w-full sm:w-auto text-gray-600 hover:text-gray-900 text-xs font-semibold py-2 px-4 cursor-pointer"
          >
            Close Notice
          </button>
        </div>

      </div>
    </div>
  );
}
