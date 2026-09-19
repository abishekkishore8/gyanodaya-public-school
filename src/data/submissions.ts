import type { FormSubmissionItem } from "@/types/site";

/** Sample submissions shown before the API responds. */

export const INITIAL_SUBMISSIONS: FormSubmissionItem[] = [
  {
    id: "GPS-ADM-8492",
    type: "admission",
    title: "Class XI (Science - PCM) Admission",
    name: "Rahul Kumar Verma",
    phone: "+91 98351 22419",
    email: "verma.rahul2010@gmail.com",
    submittedAt: "10 Mar 2025, 02:45 PM",
    status: "Pending",
    details: {
      "Applying For": "Class XI (Science - PCM with Computer Science)",
      "Gender": "Male",
      "Date of Birth": "14-07-2009",
      "Parent Name": "Suresh Prasad Verma (Govt. Employee)",
      "Mother Name": "Sunita Devi",
      "Address": "Near Bus Stand, Bagodar, Giridih",
      "Previous School": "DAV Public School, 91.4%",
      "School Bus Transport": "Yes (Route: Bagodar - Sariya)",
      "Hostel Facility": "No",
    },
  },
  {
    id: "GPS-VISIT-3104",
    type: "visit",
    title: "Campus Tour & STEM Lab Visit",
    name: "Dr. Ananya Mukherjee",
    phone: "+91 94311 88320",
    email: "ananya.m@aiims.edu",
    submittedAt: "09 Mar 2025, 11:15 AM",
    status: "Reviewed",
    details: {
      "Prospective Grade": "Class VI & Class VIII (2 Children)",
      "Preferred Date": "18 Mar 2025",
      "Time Slot": "Morning Slot: 09:30 AM – 11:30 AM",
      "Visitors Count": "3 Persons",
      "Key Interest Areas": "Robotics Lab, Science Labs, Library, Sports Ground",
      "Notes": "Relocating from Kolkata to Giridih district next month.",
    },
  },
  {
    id: "GPS-ENQ-1940",
    type: "enquiry",
    title: "Hostel & Transport Fee Query",
    name: "Manoj Singh",
    phone: "+91 87094 55123",
    email: "manoj.singh.giridih@yahoo.com",
    submittedAt: "08 Mar 2025, 04:30 PM",
    status: "Contacted",
    details: {
      "Subject": "Fee Structure & Payment Options",
      "Student Grade": "Grade 9",
      "Message": "Would like to know the quarterly fee installment schedule and boarding charges for boy hostel.",
      "Preferred Mode": "WhatsApp / Phone Call",
      "Best Time": "Evening 4 PM - 7 PM",
    },
  },
];
