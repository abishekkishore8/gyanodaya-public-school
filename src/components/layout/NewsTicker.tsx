import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";

/** Continuously scrolling marquee of the latest school announcements. */
export default function NewsTicker() {
  const { announcements } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  return (
    <div className="bg-[#0e3322] text-white py-1.5 border-b border-[#1f5f40] overflow-hidden flex items-center text-xs w-full">
      <div className="px-2.5 sm:px-3.5 bg-[#c59a3f] text-[#14452f] font-bold text-[9px] sm:text-[11px] uppercase tracking-wider py-0.5 rounded-r shrink-0 z-10 flex items-center gap-1.5 shadow">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-ping" />
        <span>LATEST NEWS</span>
      </div>
      <div className="overflow-hidden whitespace-nowrap flex-1 relative">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 font-medium text-gray-200 cursor-pointer text-[10.5px] sm:text-xs">
          {announcements.concat(announcements).map((item, idx) => (
            <span
              key={idx}
              onClick={() => setAdmissionModalOpen(true)}
              className="hover:text-[#dfb455] transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
