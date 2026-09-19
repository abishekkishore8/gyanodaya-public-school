"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/** Shared look for every text control in the panel. */
const CONTROL =
  "w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-[#14452f] focus:outline-2 focus:outline-offset-0 focus:outline-[#14452f]/20 disabled:bg-slate-50 disabled:text-slate-500";

interface FieldProps {
  label: string;
  /** Marks the control required and shows an asterisk. */
  required?: boolean;
  /** Helper text under the control. */
  hint?: string;
  children: ReactNode;
  className?: string;
}

/** Label + control + hint, laid out consistently. */
export function Field({ label, required, hint, children, className = "" }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs leading-relaxed text-slate-500">{hint}</span>}
    </label>
  );
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${CONTROL} h-10 ${className}`} />;
}

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${CONTROL} py-2.5 ${className}`} />;
}

export function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${CONTROL} h-10 ${className}`} />;
}
