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
  // Drawn on a 24-unit grid and scaled, after Remix Icon's bus-line.
  transport: (
    <g transform="scale(2)" strokeWidth="1.1">
      <path d="M6 18v2.5M18 18v2.5" />
      <rect x="4" y="3" width="16" height="15" rx="2" />
      <path d="M4 11h16M4 7h16" />
      <circle cx="8" cy="14.5" r="1" fill={GREEN} stroke="none" />
      <circle cx="16" cy="14.5" r="1" fill={GREEN} stroke="none" />
      <path d="M2 8v3M22 8v3" />
    </g>
  ),
  // After Remix Icon's hotel-bed-line.
  hostel: (
    <g transform="scale(2)" strokeWidth="1.1">
      <path d="M3 4v16M3 16h18v4" />
      <path d="M11 16v-6h6a4 4 0 0 1 4 4v2" />
      <circle cx="7" cy="11" r="2" />
    </g>
  ),
  holistic: (
    <>
      <path d="M24 10c0 8-8 16-16 16 8 0 16 8 16 16 0-8 8-16 16-16-8 0-16-8-16-16z" />
      <path d="M24 20v14M18 27h12" strokeWidth="1.8" />
    </>
  ),
  // After Lucide's flask-conical.
  labs: (
    <g transform="scale(2)" strokeWidth="1.1">
      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
      <path d="M6.453 15h11.094" />
      <path d="M8.5 2h7" />
    </g>
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
