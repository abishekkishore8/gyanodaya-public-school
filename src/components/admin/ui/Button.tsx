"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-[#14452f] text-white hover:bg-[#1b5c3e] focus-visible:outline-[#14452f]",
  secondary:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-slate-400",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-slate-400",
  danger:
    "bg-white text-red-700 border border-red-200 hover:bg-red-50 hover:border-red-300 focus-visible:outline-red-400",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Leading glyph or icon. */
  icon?: ReactNode;
}

/** Standard action button for the admin panel. */
export default function Button({
  variant = "secondary",
  size = "md",
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </button>
  );
}
