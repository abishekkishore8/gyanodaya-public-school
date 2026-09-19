import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD } from "@/lib/theme";

/** Sticky call / WhatsApp / apply bar shown on small screens. */
export default function MobileQuickBar() {
  const { parentsLoginUrl } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e3322]/98 backdrop-blur-md border-t border-[#1f5f40] px-2 py-1.5 flex items-center justify-around shadow-2xl">
      <a
        href="tel:+919431377488"
        className="flex flex-col items-center justify-center gap-0.5 text-gray-200 hover:text-[#dfb455] py-1 px-2 rounded-lg active:scale-95 transition-transform"
      >
        <svg className="w-4 h-4 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="text-[9.5px] font-medium tracking-tight">Call</span>
      </a>

      <a
        href="https://wa.me/919431377488"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 text-gray-200 hover:text-emerald-400 py-1 px-2 rounded-lg active:scale-95 transition-transform"
      >
        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.632.062-.976-.051-.309-.101-.689-.234-1.196-.453-2.144-.925-3.535-3.111-3.642-3.255-.106-.144-.872-1.159-.872-2.212 0-1.053.548-1.57.742-1.785.195-.214.424-.268.566-.268.143 0 .285.002.408.008.131.006.305-.05.477.362.179.428.611 1.488.665 1.595.054.107.089.232.018.375-.071.144-.107.233-.213.357-.107.125-.224.279-.32.375-.107.107-.219.224-.094.438.125.214.556.915 1.193 1.482.82.731 1.512.958 1.726 1.065.214.107.339.089.464-.054.125-.143.536-.625.679-.839.143-.214.286-.179.479-.107.195.071 1.23.58 1.443.687.214.107.357.161.41.25.054.089.054.518-.09.923z" />
        </svg>
        <span className="text-[9.5px] font-medium tracking-tight">WhatsApp</span>
      </a>

      <a
        href={parentsLoginUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 text-[#dfb455] hover:text-white py-1 px-2 rounded-lg active:scale-95 transition-transform cursor-pointer"
      >
        <svg className="w-4 h-4 text-[#dfb455]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.609 1.814L13.793 12 3.61 22.186c-.368-.328-.61-.83-.61-1.426V3.24c0-.596.242-1.098.609-1.426zm11.246 11.248l2.257 2.257-11.83 6.643 9.573-8.9zm0-2.124L5.282 2.038l11.83 6.643-2.257 2.257zm1.487 1.062l3.435 1.932c.708.398.708 1.05 0 1.448l-3.435 1.932-2.115-2.115 2.115-3.197z" />
        </svg>
        <span className="text-[9.5px] font-bold tracking-tight">Parents Login</span>
      </a>

      <button
        onClick={() => setAdmissionModalOpen(true)}
        style={{ backgroundColor: GOLD }}
        className="flex items-center gap-1 text-white font-bold text-[10.5px] px-2.5 py-1.5 rounded-md shadow-md active:scale-95 transition-transform cursor-pointer"
      >
        <span>Apply</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
}
