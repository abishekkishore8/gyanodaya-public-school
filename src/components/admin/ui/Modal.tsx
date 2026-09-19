"use client";

import { useEffect, type ReactNode } from "react";

interface ModalProps {
  title: string;
  description?: string;
  onClose: () => void;
  /** Action buttons, right-aligned in the footer. */
  footer?: ReactNode;
  children: ReactNode;
}

/** Centred dialog used by the panel's editors. Closes on Escape or backdrop click. */
export default function Modal({ title, description, onClose, footer, children }: ModalProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    // Stop the page behind the dialog from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
            {description && <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="px-5 py-5">{children}</div>

        {footer && (
          <footer className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50/70 px-5 py-3">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
