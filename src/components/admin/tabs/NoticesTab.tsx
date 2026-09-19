"use client";

import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import { Card, CardHeader } from "@/components/admin/ui/Card";
import EmptyState from "@/components/admin/ui/EmptyState";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";

/** Manages the three notice board categories shown on the public site. */
export default function NoticesTab() {
  const { noticeCategories } = useSiteContent();
  const {
    activeNoticeCategory,
    setActiveNoticeCategory,
    openNoticeEditor,
    deleteNotice,
  } = useAdmin();

  const category = noticeCategories.find((item) => item.id === activeNoticeCategory) ?? noticeCategories[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notice board"
        description="Circulars, announcements and recruitment notices published on the school bulletin."
        actions={
          category && (
            <Button variant="primary" onClick={() => openNoticeEditor(category.id)}>
              Add notice
            </Button>
          )
        }
      />

      {/* Category switcher */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Notice categories">
        {noticeCategories.map((item) => {
          const active = item.id === category?.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveNoticeCategory(item.id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[13px] font-medium transition ${
                active
                  ? "border-[#14452f] bg-[#14452f] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              } cursor-pointer`}
            >
              <span>{item.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                  active ? "bg-white/15" : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {category && (
        <Card>
          <CardHeader
            title={category.label}
            description={category.sublabel || "Notices in this category, newest first."}
            badge={<Badge tone="brand">{category.items.length}</Badge>}
            actions={
              <Button size="sm" variant="secondary" onClick={() => openNoticeEditor(category.id)}>
                Add
              </Button>
            }
          />

          {category.items.length === 0 ? (
            <EmptyState
              icon="📌"
              title="No notices in this category"
              description="Published notices appear on the school bulletin board immediately."
              action={
                <Button variant="primary" onClick={() => openNoticeEditor(category.id)}>
                  Add the first notice
                </Button>
              }
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {category.items.map((notice) => (
                <li key={notice.id} className="flex flex-wrap items-start gap-4 px-5 py-4">
                  {/* Date chip mirrors how the notice renders publicly */}
                  <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-slate-200 bg-slate-50 py-1.5">
                    <span className="text-[15px] font-semibold leading-none text-slate-900">{notice.day}</span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase text-slate-500">
                      {notice.month}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide ${notice.tagColor}`}
                      >
                        {notice.tag}
                      </span>
                      <span className="text-[12px] text-slate-400">{notice.date}</span>
                    </div>

                    <p className="mt-1.5 text-[14px] font-semibold leading-snug text-slate-900">{notice.title}</p>
                    <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-slate-500">{notice.desc}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => openNoticeEditor(category.id, notice)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        if (window.confirm(`Delete "${notice.title}"?`)) {
                          void deleteNotice(category.id, notice.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
