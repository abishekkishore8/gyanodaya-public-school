import { useToast } from "@/context/ToastContext";

/** Transient notification pinned to the top-right of the viewport. */
export default function Toast() {
  const { toastMessage, dismissToast } = useToast();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-3 sm:top-5 right-3 sm:right-5 left-3 sm:left-auto z-[130] animate-slide-down bg-[#14452f] text-white px-4 sm:px-5 py-3 rounded-xl shadow-2xl border-2 border-[#dfb455] flex items-center gap-3 text-xs sm:text-sm font-medium max-w-sm sm:max-w-md"
    >
      <span className="text-base sm:text-xl">🔔</span>
      <span className="flex-1">{toastMessage}</span>
      <button
        onClick={dismissToast}
        className="text-white/70 hover:text-white text-lg font-bold ml-1 cursor-pointer"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}
