import { GREEN } from "@/lib/theme";
import type { HighlightIconKey } from "@/types/site";

/**
 * Line icons for the highlights strip. An administrator picks one by key, so
 * the set here is what the panel offers — add a key in `HighlightIconKey` and
 * a path below to extend it.
 */
const PATHS: Record<HighlightIconKey, React.ReactNode> = {
  classroom: (
    <>
      <rect x="5" y="8" width="38" height="24" rx="2" />
      <path d="M16 32v6M32 32v6M10 38h28" />
      <path d="M12 15h12v10H12z" strokeWidth="1.6" />
      <circle cx="33" cy="20" r="3" strokeWidth="1.6" />
    </>
  ),
  faculty: (
    <>
      <circle cx="24" cy="14" r="6" />
      <path d="M10 36c0-7.7 6.3-14 14-14s14 6.3 14 14" />
      <circle cx="11" cy="18" r="4" strokeWidth="1.6" />
      <path d="M5 33c0-4.4 2.7-8 6-8" strokeWidth="1.6" />
      <circle cx="37" cy="18" r="4" strokeWidth="1.6" />
      <path d="M43 33c0-4.4-2.7-8-6-8" strokeWidth="1.6" />
    </>
  ),
  transport: (
    <>
      <rect x="7" y="16" width="34" height="18" rx="3" />
      <path d="M7 24h34M13 16v-4a2 2 0 012-2h18a2 2 0 012 2v4" />
      <circle cx="15" cy="34" r="3.5" />
      <circle cx="33" cy="34" r="3.5" />
      <path d="M18.5 34h11" />
      <path d="M11 20h4M19 20h10" />
    </>
  ),
  holistic: (
    <>
      <path d="M24 10c0 8-8 16-16 16 8 0 16 8 16 16 0-8 8-16 16-16-8 0-16-8-16-16z" />
      <path d="M24 20v14M18 27h12" strokeWidth="1.8" />
    </>
  ),
  labs: (
    <>
      <path d="M20 8h8M24 8v10l-10 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L24 18" />
      <path d="M17 31h14M22 24h4" strokeWidth="1.6" />
      <circle cx="21" cy="35" r="1.5" fill={GREEN} />
      <circle cx="27" cy="33" r="1.5" fill={GREEN} />
    </>
  ),
  library: (
    <>
      <path d="M8 12h12a4 4 0 014 4v22a4 4 0 00-4-4H8z" />
      <path d="M40 12H28a4 4 0 00-4 4v22a4 4 0 014-4h12z" />
      <path d="M24 16v22" strokeWidth="1.6" />
    </>
  ),
  sports: (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M24 9c5 5 5 25 0 30M24 9c-5 5-5 25 0 30" strokeWidth="1.6" />
      <path d="M9 24h30" strokeWidth="1.6" />
    </>
  ),
  safety: (
    <>
      <path d="M24 7l14 6v11c0 9-6 15.5-14 17-8-1.5-14-8-14-17V13z" />
      <path d="M18 24l4.5 4.5L31 20" strokeWidth="2" />
    </>
  ),
};

/** Every key the panel offers, in the order it lists them. */
export const HIGHLIGHT_ICON_KEYS = Object.keys(PATHS) as HighlightIconKey[];

export default function HighlightIcon({
  icon,
  className = "w-9 h-9",
}: {
  icon: HighlightIconKey;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke={GREEN}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[icon] ?? PATHS.classroom}
    </svg>
  );
}
