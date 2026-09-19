import { useEffect, useRef, useState, type FormEvent } from "react";

import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { submitJobApplication } from "@/lib/api";
import { GOLD, GREEN } from "@/lib/theme";

/** Largest CV the server accepts, mirrored here for a friendlier message. */
const MAX_CV_BYTES = 5 * 1024 * 1024;

const EMPTY_APPLICATION = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "Fresher / Under 1 Year",
  qualification: "",
  notes: "",
};

/** Career application form for an open faculty or staff vacancy. */
export default function JobApplicationModal() {
  const { recruitmentPositions } = useSiteContent();
  const { showToast } = useToast();
  const { jobModalOpen, setJobModalOpen, selectedJob } = useUi();

  const [jobForm, setJobForm] = useState(EMPTY_APPLICATION);
  const [cv, setCv] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [jobSubmitted, setJobSubmitted] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);

  /**
   * Preselect the vacancy the applicant arrived from, falling back to the first
   * published one so the select never shows a value the form state lacks.
   */
  useEffect(() => {
    const preferred = selectedJob?.title || recruitmentPositions[0]?.title;
    if (preferred) setJobForm((prev) => (prev.position ? prev : { ...prev, position: preferred }));
  }, [selectedJob, recruitmentPositions]);

  const resetForm = () => {
    setJobForm(EMPTY_APPLICATION);
    setCv(null);
    if (cvInputRef.current) cvInputRef.current.value = "";
  };

  const handleJobSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (cv && cv.size > MAX_CV_BYTES) {
      showToast(`⚠️ Your CV must be ${Math.round(MAX_CV_BYTES / (1024 * 1024))} MB or smaller.`);
      return;
    }

    // Match the chosen title back to a vacancy so the application is filed
    // against it; "Other" applications keep an empty jobId.
    const vacancy = recruitmentPositions.find((job) => job.title === jobForm.position);

    setSubmitting(true);
    try {
      await submitJobApplication({
        jobId: vacancy?.id ?? "",
        jobTitle: jobForm.position,
        fullName: jobForm.fullName,
        email: jobForm.email,
        phone: jobForm.phone,
        experience: jobForm.experience,
        qualification: jobForm.qualification,
        notes: jobForm.notes,
        cv,
      });

      setJobSubmitted(true);
      showToast(`🎉 Application received for ${jobForm.position}! Our HR panel will review your profile.`);

      window.setTimeout(() => {
        setJobSubmitted(false);
        setJobModalOpen(false);
        resetForm();
      }, 2200);
    } catch (error) {
      showToast(
        error instanceof Error
          ? `⚠️ ${error.message}`
          : "⚠️ Could not submit your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!jobModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[125] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
      onClick={() => setJobModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border border-gray-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setJobModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#f0faf5] text-[#14452f] flex items-center justify-center text-xl font-bold shrink-0">
            💼
          </div>
          <div>
            <h3 style={{ color: GREEN }} className="font-serif font-bold text-lg sm:text-2xl">
              Job Application
            </h3>
            <p className="text-gray-500 text-xs">
              Faculty &amp; Staff Recruitment Drive 2025–26 • GPS Bagodar
            </p>
          </div>
        </div>

        {jobSubmitted ? (
          <div className="py-8 text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h4 className="font-serif font-bold text-xl text-gray-900 mb-1">
              Application Received!
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm">
              Our academic selection committee will review your profile and contact you for demo &amp; interview rounds.
            </p>
          </div>
        ) : (
          <form onSubmit={handleJobSubmit} className="space-y-3 sm:space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Position Applied For *
              </label>
              <select
                value={jobForm.position}
                onChange={(e) => setJobForm({ ...jobForm, position: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] bg-white font-medium"
              >
                {recruitmentPositions.map((j) => (
                  <option key={j.id} value={j.title}>
                    {j.title}
                  </option>
                ))}
                <option value="Other Subject Teacher / Staff">Other Subject Teacher / Admin Staff</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ramesh Sharma"
                  value={jobForm.fullName}
                  onChange={(e) => setJobForm({ ...jobForm, fullName: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={jobForm.phone}
                  onChange={(e) => setJobForm({ ...jobForm, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="youremail@example.com"
                  value={jobForm.email}
                  onChange={(e) => setJobForm({ ...jobForm, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Total Experience *
                </label>
                <select
                  value={jobForm.experience}
                  onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] bg-white"
                >
                  <option>Fresher / Under 1 Year</option>
                  <option>1 - 3 Years</option>
                  <option>3 - 5 Years</option>
                  <option>5+ Years (Senior Faculty)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Highest Qualification &amp; Specialization *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. M.Sc (Physics), B.Ed (First Class)"
                value={jobForm.qualification}
                onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Key Highlights / Notes
              </label>
              <textarea
                rows={2}
                placeholder="Subject achievements, notice period, or anything else we should know..."
                value={jobForm.notes}
                onChange={(e) => setJobForm({ ...jobForm, notes: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Attach CV / Resume
              </label>
              <input
                ref={cvInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                className="w-full cursor-pointer rounded border border-gray-300 px-3 py-2 text-xs file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-[#14452f] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white sm:text-sm"
              />
              <p className="mt-1 text-[11px] text-gray-500">
                PDF or Word document, up to 5 MB.
                {cv && <span className="ml-1 font-semibold text-[#14452f]">Selected: {cv.name}</span>}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ backgroundColor: GOLD }}
              className="w-full text-white font-bold py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-md mt-2 cursor-pointer active:scale-98 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Job Application ↗"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
