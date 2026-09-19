"use client";

import BackToTop from "@/components/common/BackToTop";
import MobileQuickBar from "@/components/common/MobileQuickBar";
import Toast from "@/components/common/Toast";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import NewsTicker from "@/components/layout/NewsTicker";
import TopBar from "@/components/layout/TopBar";
import AdmissionEnquiryModal from "@/components/modals/AdmissionEnquiryModal";
import JobApplicationModal from "@/components/modals/JobApplicationModal";
import Lightbox from "@/components/modals/Lightbox";
import NoticeArchiveModal from "@/components/modals/NoticeArchiveModal";
import NoticeCircularModal from "@/components/modals/NoticeCircularModal";
import SubmissionReceiptModal from "@/components/modals/SubmissionReceiptModal";
import About from "@/components/sections/About";
import Academics from "@/components/sections/Academics";
import AdmissionsCta from "@/components/sections/AdmissionsCta";
import Facilities from "@/components/sections/Facilities";
import Faqs from "@/components/sections/Faqs";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import NoticeBoard from "@/components/sections/NoticeBoard";
import OnlineForms from "@/components/sections/online-forms/OnlineForms";
import { SiteContentProvider, useSiteContent } from "@/context/SiteContentContext";
import { ToastProvider } from "@/context/ToastContext";
import { UiProvider } from "@/context/UiContext";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** Shown instead of the site when the content API cannot be reached. */
function DatabaseUnavailable({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#f8f6ef] text-gray-800 flex items-center justify-center px-6">
      <div className="max-w-lg rounded-3xl border border-[#dfb455]/40 bg-white p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-[#14452f]">Database connection required</h1>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          This website is configured to load content only from the gps_school_website database. The page is blocked
          until the backend can read that database successfully.
        </p>
        <p className="mt-3 text-xs text-red-700">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#14452f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f3524]"
        >
          Retry database connection
        </button>
      </div>
    </div>
  );
}

/**
 * The public site plus every modal layer. Rendered inside the providers so it
 * can read site content, UI state and admin state through hooks.
 */
function SiteBody() {
  const { loadError } = useSiteContent();
  const { scrolled, scrollProgress } = useScrollProgress();

  if (loadError) return <DatabaseUnavailable message={loadError} />;

  return (
    // `overflow-x-clip` rather than `-hidden`: see globals.css — `hidden` here breaks the sticky header.
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased selection:bg-[#c59a3f] selection:text-white pb-16 md:pb-0 overflow-x-clip w-full max-w-full">
      <Toast />

      <TopBar />
      <NewsTicker />
      <Navbar scrolled={scrolled} />

      <main>
        <Hero />
        <Highlights />
        <NoticeBoard />
        <About />
        <Academics />
        <Facilities />
        <Gallery />
        <Faqs />
        <AdmissionsCta />
        <OnlineForms />
      </main>

      <Footer />

      <BackToTop visible={scrolled} scrollProgress={scrollProgress} />
      <MobileQuickBar />

      {/* Public modal layers */}
      <Lightbox />
      <AdmissionEnquiryModal />
      <NoticeCircularModal />
      <NoticeArchiveModal />
      <JobApplicationModal />
      <SubmissionReceiptModal />
    </div>
  );
}

/**
 * Client root for the whole site: nests the state providers around the page.
 *
 * Everything below here is a client component — content is fetched from
 * `/api/site-content` in the browser so the admin dashboard sees its own edits
 * immediately.
 */
export default function SchoolSite() {
  return (
    <ToastProvider>
      <SiteContentProvider>
        <UiProvider>
          <SiteBody />
        </UiProvider>
      </SiteContentProvider>
    </ToastProvider>
  );
}
