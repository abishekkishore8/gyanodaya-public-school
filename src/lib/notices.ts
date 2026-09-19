/**
 * Notice tag theming.
 *
 * Tag colors are derived from the tag text rather than stored, so that notices
 * created through the admin panel and those seeded on the server render
 * identically.
 */

import type { NoticeCategoryData, NoticeCategoryId, NoticeItemData, NoticeTagTheme } from "@/types/site";

const NOTICE_TAG_THEMES: Record<NoticeTagTheme, string> = {
  urgent: "bg-red-50 text-red-700 border-red-200",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  hiring: "bg-sky-50 text-sky-800 border-sky-200",
  event: "bg-purple-50 text-purple-700 border-purple-200",
};

export const NOTICE_TAG_THEME_KEYS = Object.keys(NOTICE_TAG_THEMES) as NoticeTagTheme[];

/** Tailwind classes for a tag theme. */
export function resolveNoticeTagColor(theme: NoticeTagTheme): string {
  return NOTICE_TAG_THEMES[theme];
}

/** Picks a tag theme from the tag text and the category it belongs to. */
export function inferNoticeTagTheme(tag: string, categoryKey: NoticeCategoryId): NoticeTagTheme {
  const normalizedTag = tag.trim().toUpperCase();

  if (categoryKey === "recruitment") return "hiring";

  if (categoryKey === "announcements") {
    if (normalizedTag.includes("EVENT") || normalizedTag.includes("FEST") || normalizedTag.includes("CAMPUS")) {
      return "event";
    }
    return "success";
  }

  if (normalizedTag.includes("MEETING") || normalizedTag.includes("DATE") || normalizedTag.includes("WARN")) {
    return "warning";
  }
  if (normalizedTag.includes("TRANSPORT") || normalizedTag.includes("INFO") || normalizedTag.includes("UPDATE")) {
    return "info";
  }
  return "urgent";
}

function normalizeNoticeItem(categoryKey: NoticeCategoryId, item: NoticeItemData): NoticeItemData {
  return { ...item, tagColor: resolveNoticeTagColor(inferNoticeTagTheme(item.tag, categoryKey)) };
}

/** Re-derives every tag color so stored and generated notices look the same. */
export function normalizeNoticeCategories(categories: NoticeCategoryData[]): NoticeCategoryData[] {
  return categories.map((category) => ({
    ...category,
    items: category.items.map((item) => normalizeNoticeItem(category.id, item)),
  }));
}

/**
 * Body paragraphs for the official circular modal. Older notices (and every
 * notice seeded by the server) have no `fullDetails`, so fall back to `desc`.
 */
export function noticeBodyParagraphs(notice: NoticeItemData): string[] {
  if (notice.fullDetails?.length) return notice.fullDetails;
  return notice.desc ? [notice.desc] : [];
}

/** Reference number shown on the circular letterhead. */
export function noticeReferenceNumber(notice: NoticeItemData): string {
  return notice.refNo || `GPS/${notice.month}/${notice.id.toUpperCase()}`;
}
