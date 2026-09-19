import Link from "next/link";
import { usePathname } from "next/navigation";

import SchoolLogo from "@/components/common/SchoolLogo";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { MAIN_NAV, MAIN_NAV_SECTION_IDS, type NavItem } from "@/data/navigation";
import { SCHOOL_WORDMARK, SCHOOL_WORDMARK_LETTERS } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useNavDrawerDismiss } from "@/hooks/useNavDrawer";
import { GOLD, GREEN } from "@/lib/theme";
import { useCallback } from "react";

interface NavbarProps {
  /** True once the page has scrolled far enough to condense the header. */
  scrolled: boolean;
}

/**
 * Sticky primary navigation. Below the `nav-full` breakpoint (1400px, defined
 * in globals.css) the inline links collapse into a slide-in drawer.
 */
export default function Navbar({ scrolled }: NavbarProps) {
  const { parentsLoginUrl } = useSiteContent();
  const { showToast } = useToast();
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    mobileSubNavOpen,
    setMobileSubNavOpen,
    searchOpen,
    setSearchOpen,
    setAdmissionModalOpen,
  } = useUi();
  const activeSection = useActiveSection(MAIN_NAV_SECTION_IDS);
  const pathname = usePathname();

  /**
   * Highlights the link for the page being viewed. On the home page every
   * section is on screen at some point, so the scroll-spy decides instead.
   */
  const isCurrent = useCallback(
    (item: NavItem) => {
      if (pathname === "/") return activeSection === item.sectionId;
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    },
    [pathname, activeSection],
  );

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [setMobileMenuOpen]);

  useBodyScrollLock(mobileMenuOpen);
  useNavDrawerDismiss(mobileMenuOpen, closeMobileMenu);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 w-full ${scrolled ? "shadow-md py-1.5 sm:py-2" : "border-b border-gray-100 py-2 sm:py-2.5"}`}>
      {/* Widens at `nav-full` so the inline links have room; below that it keeps the site's usual measure. */}
      <div className="max-w-[1360px] nav-full:max-w-[1500px] mx-auto px-3 sm:px-5 nav-full:px-4 flex items-center justify-between gap-2 sm:gap-4 nav-full:gap-2 min-w-0">

        {/* Logo & School Name */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
          <div className="flex items-center justify-center shrink-0 rounded-full bg-white/90 ring-1 ring-[#14452f]/10 p-1">
            <SchoolLogo className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 2xl:w-14 2xl:h-14 group-hover:scale-105 transition-transform duration-300 shrink-0" />
          </div>
          <div className="flex flex-col truncate">
            <span
              style={{ color: GREEN }}
              aria-label={SCHOOL_WORDMARK}
              className="flex w-full justify-between font-wordmark font-bold text-base sm:text-lg md:text-xl 2xl:text-2xl leading-none group-hover:opacity-90"
            >
              {SCHOOL_WORDMARK_LETTERS.map((letter, index) => (
                <span key={index} aria-hidden="true">
                  {letter}
                </span>
              ))}
            </span>
            {/*
              This line sets the width of the lockup; the name above stretches to
              match it. `-mr` cancels the trailing letter-space CSS adds after the
              last character, which would otherwise push this line a hair wider.
            */}
            <span
              style={{ color: GREEN }}
              className="text-[8px] sm:text-[9px] md:text-[10px] 2xl:text-[11px] font-semibold tracking-[0.06em] -mr-[0.06em] uppercase leading-tight mt-0.5 truncate"
            >
              PUBLIC SCHOOL • BAGODAR
            </span>
          </div>
        </Link>

        {/* Inline navigation — only from `nav-full` up, where every link fits on one row */}
        <nav className="hidden nav-full:flex items-center gap-1 min-w-0 flex-1 justify-center">
          {MAIN_NAV.map((item) => {
            const isActive = isCurrent(item);

            return (
              <div key={item.label} className="relative group/menu py-2">
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center gap-0.5 text-[12px] font-semibold tracking-[0.02em] py-1 px-1 relative whitespace-nowrap transition-colors after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#14452f] after:origin-left after:transition-transform after:duration-200 group-hover/menu:after:scale-x-100 ${
                    isActive ? "text-[#14452f] after:scale-x-100" : "text-gray-700 hover:text-[#14452f] after:scale-x-0"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg
                      className="w-2.5 h-2.5 text-gray-400 mt-0.5 group-hover/menu:rotate-180 group-focus-within/menu:rotate-180 transition-transform duration-300 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown flyout — opens on hover and on keyboard focus */}
                {item.subItems && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50 origin-top opacity-0 invisible -translate-y-2 transition-[opacity,transform,visibility] duration-200 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-focus-within/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#f0faf5] hover:text-[#14452f] focus:bg-[#f0faf5] focus:text-[#14452f] focus:outline-none transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Icons & Buttons (Search, Parents Login, Enquire, Tablet/Mobile Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 shrink-0 min-w-0">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search website"
            className="p-1.5 sm:p-2 text-gray-700 hover:text-[#14452f] transition-colors rounded-full hover:bg-gray-100 cursor-pointer shrink-0"
          >
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* PARENTS LOGIN BUTTON - REDIRECTS TO PLAY STORE APP ON ALL SCREEN SIZES */}
          <a
            href={parentsLoginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 border border-[#14452f] bg-[#f0faf5] hover:bg-[#14452f] text-[#14452f] hover:text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 2xl:px-3 py-1.5 rounded-lg transition-all duration-200 uppercase tracking-[0.08em] sm:tracking-[0.12em] 2xl:tracking-wider cursor-pointer shadow-xs active:scale-95 group shrink-0"
            aria-label="Parents Login Play Store App"
          >
            {/* Google Play / Android Icon */}
            <svg className="w-3.5 h-3.5 text-[#c59a3f] group-hover:text-[#dfb455] transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.793 12 3.61 22.186c-.368-.328-.61-.83-.61-1.426V3.24c0-.596.242-1.098.609-1.426zm11.246 11.248l2.257 2.257-11.83 6.643 9.573-8.9zm0-2.124L5.282 2.038l11.83 6.643-2.257 2.257zm1.487 1.062l3.435 1.932c.708.398.708 1.05 0 1.448l-3.435 1.932-2.115-2.115 2.115-3.197z" />
            </svg>
            <span className="hidden min-[420px]:inline whitespace-nowrap">Parents Login</span>
            <span className="min-[420px]:hidden whitespace-nowrap">Parents</span>
          </a>

          {/* Enquire Button (visible on sm+) */}
          <button
            onClick={() => setAdmissionModalOpen(true)}
            style={{ backgroundColor: GREEN }}
            className="hidden nav-full:inline-flex items-center gap-1.5 text-white text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 2xl:px-3.5 py-1.5 rounded-lg hover:brightness-110 transition-all shadow-sm uppercase tracking-[0.08em] sm:tracking-wider cursor-pointer shrink-0"
          >
            <span>Enquire</span>
            <svg className="w-3.5 h-3.5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Drawer toggle — shown until the inline navigation fits */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="flex nav-full:hidden items-center gap-1 p-1.5 sm:p-2 text-gray-700 hover:text-[#14452f] focus:outline-none cursor-pointer rounded-lg hover:bg-gray-100 shrink-0 border border-gray-200"
          >
            <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider hidden sm:inline text-gray-700">Menu</span>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SLIDE-IN NAVIGATION DRAWER (below the `nav-full` breakpoint)     */}
      {/* ================================================================ */}
      {/*
        A full-viewport overlay rather than one offset below the header: the
        header is sticky, so its distance from the top of the screen changes
        with scroll position (it sits under the top bar and ticker at rest,
        flush at the top once scrolled) and no fixed offset is correct at both.
      */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="flex nav-full:hidden fixed inset-0 z-60 bg-[#0b1f15]/55 backdrop-blur-sm justify-end animate-fade-in"
          onClick={closeMobileMenu}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="w-full min-[380px]:w-[92vw] sm:w-[24rem] md:w-[25rem] max-w-full h-dvh max-h-dvh overflow-y-auto overscroll-contain px-3 py-3 pb-4 min-[380px]:px-4 min-[380px]:py-4 sm:px-4 sm:py-4 shadow-2xl border-l border-[#d7e4dc] animate-slide-in-right flex flex-col gap-3 bg-[linear-gradient(180deg,#fcfdfb_0%,#f4f8f4_100%)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between rounded-[1.25rem] border border-[#dbe7df] bg-white/92 px-3 py-3 shadow-sm min-[380px]:px-3.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="rounded-full bg-[#f4fbf7] p-1.5 ring-1 ring-[#14452f]/10 shrink-0">
                  <SchoolLogo className="w-6 h-6 min-[380px]:w-7 min-[380px]:h-7" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] min-[380px]:text-[10px] font-bold uppercase tracking-[0.2em] text-[#c59a3f]">GPS Bagodar</p>
                  <span className="font-serif font-bold text-[12px] min-[380px]:text-[13px] sm:text-sm text-[#14452f] block truncate">Explore Campus Sections</span>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">Admissions, academics and contact links in one place.</p>
                </div>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-1.5 min-[380px]:p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Parent Portal Banner in Drawer */}
            <a
              href={parentsLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="bg-[#f0faf5] border border-[#14452f]/15 rounded-2xl p-3 flex items-center justify-between gap-2.5 cursor-pointer hover:bg-[#e7f5ee] transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#14452f] text-[#dfb455] flex items-center justify-center font-bold text-xs shrink-0">
                  📱
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] min-[380px]:text-[11px] font-bold text-[#14452f] uppercase tracking-[0.12em]">Parents Login App</h4>
                  <p className="text-[9.5px] min-[380px]:text-[10px] text-gray-500 leading-snug">Official GPS mobile app on Play Store</p>
                </div>
              </div>
              <span className="text-[9.5px] min-[380px]:text-[10px] font-bold text-[#14452f] bg-white px-2 py-1.5 rounded-xl shadow-xs border border-gray-200 whitespace-nowrap shrink-0">Open App ↗</span>
            </a>

            {/* Quick Search */}
            <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2.5 shadow-sm">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search GPS Bagodar..."
                className="bg-transparent text-[10.5px] min-[380px]:text-[11px] sm:text-xs text-gray-800 w-full focus:outline-none placeholder:text-gray-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    showToast("🔍 Searching school records...");
                    closeMobileMenu();
                  }
                }}
              />
            </div>

            {/* Main Navigation Links */}
            <div className="flex flex-col gap-1.5 text-sm font-semibold text-gray-800">
              {MAIN_NAV.map((item) => (
                <div key={item.label} className="rounded-xl border border-[#dbe7df] bg-white/92 px-2.5 min-[380px]:px-3 py-1 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      aria-current={isCurrent(item) ? "page" : undefined}
                      className={`py-2.5 pr-2 flex-1 text-[10.5px] min-[380px]:text-[11px] sm:text-[12px] tracking-[0.1em] min-[380px]:tracking-[0.12em] uppercase leading-tight ${
                        isCurrent(item) ? "text-[#14452f]" : "hover:text-[#14452f]"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={() => setMobileSubNavOpen(mobileSubNavOpen === item.label ? null : item.label)}
                        className="p-1.5 text-gray-400 hover:text-[#14452f] cursor-pointer rounded-full hover:bg-[#f4f8f4]"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${mobileSubNavOpen === item.label ? "rotate-180 text-[#14452f]" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Collapsible Submenu */}
                  {item.subItems && mobileSubNavOpen === item.label && (
                    <div className="pl-3 pr-1 pb-2 flex flex-col gap-1 bg-[#f7faf7] rounded-xl animate-slide-down border border-[#edf3ee]">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={closeMobileMenu}
                          className="py-1.5 text-[10.5px] min-[380px]:text-[11px] text-gray-600 hover:text-[#14452f] font-medium leading-snug"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="pt-3 mt-auto border-t border-[#dbe7df] flex flex-col gap-2 bg-[linear-gradient(180deg,rgba(244,248,244,0)_0%,rgba(244,248,244,0.92)_18%,rgba(244,248,244,1)_100%)]">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919431377488"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-gray-800 text-[10.5px] min-[380px]:text-[11px] font-semibold hover:bg-gray-50 active:scale-95 border border-[#dbe7df] shadow-sm"
                >
                  <span>📞 Call Us</span>
                </a>
                <a
                  href="https://wa.me/919431377488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[10.5px] min-[380px]:text-[11px] font-semibold hover:bg-emerald-100 active:scale-95 border border-emerald-100 shadow-sm"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => {
                  closeMobileMenu();
                  setAdmissionModalOpen(true);
                }}
                style={{ backgroundColor: GOLD }}
                className="w-full text-white font-bold text-[10.5px] min-[380px]:text-[11px] py-3 rounded-2xl text-center uppercase tracking-[0.14em] min-[380px]:tracking-[0.18em] shadow-lg hover:brightness-110 cursor-pointer active:scale-98"
              >
                Apply for Admission 2025–26
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Desktop Search Input */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5 transition-all animate-slide-down">
          <div className="max-w-[1240px] mx-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="Search programs, admissions, curriculum, bus routes..."
              className="flex-1 bg-white border border-gray-300 rounded px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] shadow-inner"
              autoFocus
            />
            <button
              onClick={() => {
                showToast("🔍 Searching school records...");
                setSearchOpen(false);
              }}
              style={{ backgroundColor: GREEN }}
              className="text-white text-xs px-4 py-2 rounded font-semibold cursor-pointer hover:brightness-110"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
