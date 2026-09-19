"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import JobEditorModal from "@/components/admin/JobEditorModal";
import NoticeEditorModal from "@/components/admin/NoticeEditorModal";
import Button from "@/components/admin/ui/Button";
import SchoolLogo from "@/components/common/SchoolLogo";
import Toast from "@/components/common/Toast";
import { AdminProvider } from "@/context/AdminContext";
import { AdminDataProvider, useAdminData } from "@/context/AdminDataContext";
import { SiteContentProvider, useSiteContent } from "@/context/SiteContentContext";
import { ToastProvider } from "@/context/ToastContext";
import type { AdminUser } from "@/types/admin";
import type { FormSubmissionItem, JobApplication, SiteContentDocument } from "@/types/site";

type SiteContent = ReturnType<typeof useSiteContent>;
type AdminData = ReturnType<typeof useAdminData>;

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  /** Badge count read off the loaded site content and admin data. */
  count?: (content: SiteContent, data: AdminData) => number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Stroke icons keep the sidebar calm; emoji would fight the type. */
function Icon({ path }: { path: string }) {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: <Icon path="M4 6h16M4 12h16M4 18h7" /> }],
  },
  {
    label: "Content",
    items: [
      {
        href: "/admin/ticker",
        label: "News ticker",
        icon: <Icon path="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />,
        count: (c) => c.announcements.length,
      },
      {
        href: "/admin/notices",
        label: "Notice board",
        icon: <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        count: (c) => c.noticeCategories.reduce((total, category) => total + category.items.length, 0),
      },
      {
        href: "/admin/images",
        label: "Media library",
        icon: <Icon path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
        count: (c) =>
          c.imageAssets.heroSlides.length +
          c.imageAssets.academicBanners.length +
          c.imageAssets.facilities.length +
          c.imageAssets.gallery.length +
          c.imageAssets.misc.length,
      },
    ],
  },
  {
    label: "Enquiries",
    items: [
      {
        href: "/admin/submissions",
        label: "Form submissions",
        icon: <Icon path="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />,
        count: (_c, d) => d.submissions.length,
      },
      {
        href: "/admin/vacancies",
        label: "Vacancies",
        icon: <Icon path="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
        count: (c) => c.recruitmentPositions.length,
      },
    ],
  },
  {
    label: "Configuration",
    items: [
      {
        href: "/admin/users",
        label: "Administrators",
        icon: <Icon path="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
      },
      {
        href: "/admin/settings",
        label: "Site settings",
        icon: <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
      },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

function isItemActive(href: string, pathname: string): boolean {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const content = useSiteContent();
  const data = useAdminData();

  return (
    <nav className="flex flex-col gap-5" aria-label="Admin sections">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.13em] text-slate-400">
            {group.label}
          </p>

          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = isItemActive(item.href, pathname);
              const count = item.count?.(content, data);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    active
                      ? "bg-[#14452f] text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className={active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}>
                    {item.icon}
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {count !== undefined && (
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                        active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function UserMenu({ user }: { user: AdminUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Close on Escape, matching the behaviour of the rest of the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  const initials = (user.name || user.username).slice(0, 2).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-slate-100 cursor-pointer"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14452f] text-[11px] font-bold text-white">
          {initials}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block max-w-[10rem] truncate text-[13px] font-semibold leading-tight text-slate-800">
            {user.name}
          </span>
          <span className="block text-[11px] leading-tight text-slate-500">@{user.username}</span>
        </span>
        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            role="menu"
            className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
          >
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="truncate text-[13px] font-semibold text-slate-900">{user.name}</p>
              <p className="truncate text-xs text-slate-500">@{user.username}</p>
            </div>
            <Link
              href="/admin/users"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-[13px] text-slate-700 hover:bg-slate-50"
            >
              Manage administrators
            </Link>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-[13px] text-slate-700 hover:bg-slate-50"
            >
              View public site ↗
            </Link>
            <button
              onClick={signOut}
              disabled={signingOut}
              className="w-full border-t border-slate-100 px-4 py-2.5 text-left text-[13px] font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60 cursor-pointer"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ShellChrome({ user, children }: { user: AdminUser; children: ReactNode }) {
  const pathname = usePathname();
  const { isLoading, loadError } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);

  const current = ALL_ITEMS.find((item) => isItemActive(item.href, pathname));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Toast />

      {/* Brand bar */}
      <div className="bg-[#0e3322] text-white">
        <div className="mx-auto flex h-11 max-w-[1500px] items-center gap-2.5 px-4 sm:px-6">
          <SchoolLogo className="h-6 w-6 shrink-0" />
          <span className="truncate text-[13px] font-semibold tracking-tight">
            Gyanodaya Public School
            <span className="ml-2 font-normal text-white/60">Management Portal</span>
          </span>
        </div>
      </div>

      {/* Top bar: breadcrumb + account */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-lg border border-slate-300 p-1.5 text-slate-600 lg:hidden cursor-pointer"
              aria-label="Open navigation"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <nav aria-label="Breadcrumb" className="min-w-0 text-[13px]">
              <ol className="flex items-center gap-1.5 text-slate-500">
                <li>
                  <Link href="/admin" className="hover:text-slate-800">
                    Admin
                  </Link>
                </li>
                {current && current.href !== "/admin" && (
                  <>
                    <li aria-hidden className="text-slate-300">
                      /
                    </li>
                    <li className="truncate font-semibold text-slate-800">{current.label}</li>
                  </>
                )}
              </ol>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link href="/" target="_blank" className="hidden sm:block">
              <Button size="sm" variant="secondary">
                View site ↗
              </Button>
            </Link>
            <UserMenu user={user} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-7 px-4 py-7 sm:px-6">
        <aside className="hidden w-[228px] shrink-0 lg:block">
          <div className="sticky top-[86px]">
            <SidebarNav />
          </div>
        </aside>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMenuOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-white p-4 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-900">Navigation</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
                  aria-label="Close navigation"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SidebarNav onNavigate={() => setMenuOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 pb-10">
          {loadError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="text-sm font-semibold text-red-900">Could not load site content</p>
              <p className="mt-1 text-[13px] leading-relaxed text-red-800">{loadError}</p>
            </div>
          ) : isLoading ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading">
              <div className="h-7 w-52 animate-pulse rounded-md bg-slate-200" />
              <div className="h-28 animate-pulse rounded-xl bg-slate-200/70" />
              <div className="h-64 animate-pulse rounded-xl bg-slate-200/70" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* Editors are opened from more than one page, so they live at shell level. */}
      <NoticeEditorModal />
      <JobEditorModal />
    </div>
  );
}

interface AdminShellProps {
  user: AdminUser;
  /** Content fetched in the layout, so the panel renders without a loading pass. */
  initialContent?: SiteContentDocument;
  initialSubmissions?: FormSubmissionItem[];
  initialApplications?: JobApplication[];
  children: ReactNode;
}

/** Providers plus the chrome shared by every page in the admin panel. */
export default function AdminShell({
  user,
  initialContent,
  initialSubmissions,
  initialApplications,
  children,
}: AdminShellProps) {
  return (
    <ToastProvider>
      <SiteContentProvider initialContent={initialContent}>
        <AdminDataProvider
          initialSubmissions={initialSubmissions}
          initialApplications={initialApplications}
        >
          <AdminProvider>
            <ShellChrome user={user}>{children}</ShellChrome>
          </AdminProvider>
        </AdminDataProvider>
      </SiteContentProvider>
    </ToastProvider>
  );
}
