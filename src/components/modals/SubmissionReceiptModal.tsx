import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";

/** Confirmation receipt shown after an online form is submitted. */
export default function SubmissionReceiptModal() {
  const { showToast } = useToast();
  const { submissionReceipt, setSubmissionReceipt } = useUi();

  if (!submissionReceipt) return null;

  return (
    <div
      className="fixed inset-0 z-[135] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in"
      onClick={() => setSubmissionReceipt(null)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border-2 border-[#14452f]/30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSubmissionReceipt(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 text-3xl font-bold shadow-inner">
            ✓
          </div>
          <span className="bg-[#dfb455]/15 text-[#14452f] text-[10.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#dfb455]/30">
            {submissionReceipt.type}
          </span>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#14452f] mt-2">
            Submission Successful!
          </h3>
          <p className="text-gray-500 text-xs mt-1">
            Your application has been logged into the Gyanodaya Public School registry.
          </p>
        </div>

        {/* Receipt Summary Card */}
        <div className="bg-[#f0faf5] p-4 rounded-xl border border-[#14452f]/20 mb-6 space-y-2.5 text-xs">
          {submissionReceipt.keyDetails.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-[#14452f]/10 pb-1.5 last:border-0 last:pb-0">
              <span className="text-gray-500 font-medium">{item.label}:</span>
              <span className="font-bold text-[#14452f] text-right font-mono">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => {
              window.print();
              showToast("🖨️ Opening print dialog for submission receipt...");
            }}
            className="w-full bg-[#14452f] hover:bg-[#1f5f40] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>🖨️ Print / Save Digital Receipt</span>
          </button>
          <button
            onClick={() => setSubmissionReceipt(null)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Done & Return to Website
          </button>
        </div>
      </div>
    </div>
  );
}
