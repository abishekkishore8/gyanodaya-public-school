import { useState, type FormEvent } from "react";

import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { GOLD } from "@/lib/theme";
import { submitFormSubmission } from "@/lib/api";
import { createReferenceId, formatSubmittedAt, readField } from "@/lib/submissions";
import type { FormSubmissionItem } from "@/types/site";

const SUBMIT_DELAY_MS = 700;

/** Campus tour booking form. */
export default function CampusVisitForm() {
  
  const { showToast } = useToast();
  const { setSubmissionReceipt } = useUi();

  const [campusVisitForm, setCampusVisitForm] = useState({
    visitorName: "",
    phone: "",
    email: "",
    childGrade: "Class VI",
    visitDate: "",
    timeSlot: "Morning Slot (09:30 AM – 11:30 AM)",
    visitorsCount: "2 Persons",
    facilities: ["Smart Classrooms", "Science & STEM Labs", "Library"],
    specialRequests: "",
  });
  const [visitSubmitting, setVisitSubmitting] = useState(false);

  const handleCampusVisitSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const submitted = {
      ...campusVisitForm,
      visitorName: readField(formData, "visitorName", campusVisitForm.visitorName),
      phone: readField(formData, "phone", campusVisitForm.phone),
      email: readField(formData, "email", campusVisitForm.email),
      visitDate: readField(formData, "visitDate", campusVisitForm.visitDate),
      timeSlot: readField(formData, "timeSlot", campusVisitForm.timeSlot),
      visitorsCount: readField(formData, "visitorsCount", campusVisitForm.visitorsCount),
      specialRequests: readField(formData, "specialRequests", campusVisitForm.specialRequests),
    };

    if (!submitted.visitorName || !submitted.phone || !submitted.visitDate) {
      showToast("Please provide visitor name, phone number, and preferred date.");
      return;
    }

    setCampusVisitForm(submitted);
    setVisitSubmitting(true);

    window.setTimeout(() => {
      const refId = createReferenceId("visit");
      const submittedAt = formatSubmittedAt();

      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "visit",
        title: `Campus Tour Appointment (${submitted.visitDate})`,
        name: submitted.visitorName,
        phone: submitted.phone,
        email: submitted.email || undefined,
        submittedAt,
        status: "Pending",
        details: {
          "Visitor Name": submitted.visitorName,
          "Preferred Date": submitted.visitDate,
          "Time Slot": submitted.timeSlot,
          "Child's Grade": submitted.childGrade,
          "Guests Count": submitted.visitorsCount,
          "Interest Areas": submitted.facilities.join(", ") || "General Campus",
          "Contact Phone": submitted.phone,
          "Email": submitted.email || "Not provided",
          "Special Requests": submitted.specialRequests || "None",
        },
      };

      setVisitSubmitting(false);
      setSubmissionReceipt({
        id: refId,
        type: "School Campus Tour Appointment Pass",
        title: `Visit Scheduled on ${submitted.visitDate}`,
        applicantName: submitted.visitorName,
        phone: submitted.phone,
        date: submittedAt,
        keyDetails: [
          { label: "Appointment Pass ID", value: refId },
          { label: "Scheduled Date", value: submitted.visitDate },
          { label: "Time Window", value: submitted.timeSlot },
          { label: "Visitors", value: submitted.visitorsCount },
          {
            label: "Reception Venue",
            value: "Visitor Lounge, Administrative Block, GPS Main Campus, Bagodar",
          },
        ],
      });

      void submitFormSubmission(newSubmission)
        .then(() => showToast(`Campus visit pass ${refId} created! See you on campus.`))
        .catch(() => showToast("Campus visit request failed. Please call the school office."));
    }, SUBMIT_DELAY_MS);
  };

  return (
    <form onSubmit={handleCampusVisitSubmit} className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14452f]">
          Schedule a School Campus Tour & Visit
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Visit GPS Bagodar to experience our smart classrooms, STEM robotics labs, sports grounds, and interact with our faculty mentors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Parent / Visitor Name *
          </label>
          <input
            type="text"
            name="visitorName"
            required
            value={campusVisitForm.visitorName}
            onChange={(e) => setCampusVisitForm({ ...campusVisitForm, visitorName: e.target.value })}
            placeholder="Your Full Name"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Contact Mobile / WhatsApp *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={campusVisitForm.phone}
            onChange={(e) => setCampusVisitForm({ ...campusVisitForm, phone: e.target.value })}
            placeholder="+91 94313 XXXXX"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={campusVisitForm.email}
            onChange={(e) => setCampusVisitForm({ ...campusVisitForm, email: e.target.value })}
            placeholder="visitor@gmail.com"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Preferred Visit Date *
          </label>
          <input
            type="date"
            name="visitDate"
            required
            value={campusVisitForm.visitDate}
            onChange={(e) => setCampusVisitForm({ ...campusVisitForm, visitDate: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Preferred Time Slot
          </label>
          <select
            name="timeSlot"
            value={campusVisitForm.timeSlot}
            onChange={(e) => setCampusVisitForm({ ...campusVisitForm, timeSlot: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          >
            <option value="Morning Slot (09:30 AM – 11:30 AM)">Morning Slot (09:30 AM – 11:30 AM)</option>
            <option value="Midday Slot (11:45 AM – 01:15 PM)">Midday Slot (11:45 AM – 01:15 PM)</option>
            <option value="Afternoon Slot (02:00 PM – 03:45 PM)">Afternoon Slot (02:00 PM – 03:45 PM)</option>
            <option value="Saturday Special (10:00 AM – 01:00 PM)">Saturday Special (10:00 AM – 01:00 PM)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Total Visitors
          </label>
          <select
            name="visitorsCount"
            value={campusVisitForm.visitorsCount}
            onChange={(e) => setCampusVisitForm({ ...campusVisitForm, visitorsCount: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          >
            <option value="1 Person">1 Person</option>
            <option value="2 Persons (Parents)">2 Persons (Parents)</option>
            <option value="3 Persons (Parents + Child)">3 Persons (Parents + Child)</option>
            <option value="4+ Persons (Family)">4+ Persons (Family)</option>
          </select>
        </div>

        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Special Requirements / Areas of Interest
          </label>
          <input
            type="text"
            name="specialRequests"
            value={campusVisitForm.specialRequests}
            onChange={(e) => setCampusVisitForm({ ...campusVisitForm, specialRequests: e.target.value })}
            placeholder="e.g. Would like to see the Physics lab, hostel rooms, and meet the Science coordinator"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={visitSubmitting}
        style={{ backgroundColor: GOLD }}
        className="w-full text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
      >
        {visitSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Scheduling Visit...</span>
          </>
        ) : (
          <>
            <span>Book Guided Campus Visit Pass ↗</span>
          </>
        )}
      </button>
    </form>
  );
}
