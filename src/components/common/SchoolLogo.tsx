import { SCHOOL_LOGO_SRC } from "@/data/site";

export default function SchoolLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 overflow-visible ${className}`}>
      <img
        src={SCHOOL_LOGO_SRC}
        alt="Gyanodaya Public School logo"
        className="block h-full w-full object-contain object-center drop-shadow-sm select-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
