import type { ReactNode } from "react";

/** Surface that groups related controls or records. */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white shadow-xs ${className}`}>{children}</section>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  /** Buttons or controls aligned to the right of the title. */
  actions?: ReactNode;
  /** Count or status shown next to the title. */
  badge?: ReactNode;
}

export function CardHeader({ title, description, actions, badge }: CardHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
          {badge}
        </div>
        {description && <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

export function CardBody({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  /** Turn off for flush content such as full-width lists and tables. */
  padded?: boolean;
}) {
  return <div className={`${padded ? "px-5 py-4" : ""} ${className}`}>{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/70 px-5 py-3">
      {children}
    </footer>
  );
}
