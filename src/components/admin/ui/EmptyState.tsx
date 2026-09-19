import type { ReactNode } from "react";

/** Shown in place of a list or table that has no records yet. */
export default function EmptyState({
  icon = "📭",
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <span className="text-3xl" aria-hidden>
        {icon}
      </span>
      <p className="mt-3 text-sm font-semibold text-slate-800">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-slate-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
