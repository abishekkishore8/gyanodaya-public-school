import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD, GREEN } from "@/lib/theme";

/** "Welcome to Gyanodaya" introduction with the campus photo and headline stats. */
export default function About() {
  const { aboutCampusImage } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  return (
    <section id="about" className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left Campus Photo */}
        <div className="relative rounded-[1.5rem] overflow-hidden shadow-xl group border border-[#e6ece8] bg-[#f7faf8]">
          <img
            src={aboutCampusImage?.url || "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&h=700&fit=crop&auto=format&q=80"}
            alt={aboutCampusImage?.alt || "Gyanodaya Public School Students and Campus"}
            loading="lazy"
            decoding="async"
            className="w-full h-[300px] sm:h-[400px] md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f15]/55 via-[#0b1f15]/10 to-transparent group-hover:from-[#0b1f15]/62 transition-colors" />

          {/* Floating Experience Badge */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-lg border border-gray-100 flex items-center gap-2.5 sm:gap-3">
            <span className="font-serif font-bold text-xl sm:text-2xl text-[#14452f]">20+</span>
            <span className="text-[11px] sm:text-xs text-gray-600 font-medium leading-tight">
              Years of Academic
              <br />
              Distinction &amp; Trust
            </span>
          </div>
        </div>

        {/* Right Text & Stats Content */}
        <div>
          <p
            style={{ color: GOLD }}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-1.5"
          >
            WELCOME TO
          </p>
          <h2
            style={{ color: GREEN }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-5"
          >
            Gyanodaya Public School
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
            Gyanodaya Public School (GPS Bagodar) is a premier co-educational institution in Bagodar, Giridih, Jharkhand, dedicated to developing confident, compassionate and responsible global citizens. We blend rigorous CBSE academic curriculum with character building, digital smart education, and moral values to prepare students for a bright and successful future.
          </p>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 py-3 sm:py-4 mb-6 sm:mb-8 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
            {[
              { value: "CBSE", label: "Affiliation" },
              { value: "1:20", label: "Teacher Ratio" },
              { value: "20+", label: "Years of Trust" },
              { value: "100%", label: "Pass Result" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-left p-2 rounded hover:bg-white transition-colors"
              >
                <div
                  style={{ color: GREEN }}
                  className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
                >
                  {stat.value}
                </div>
                <div className="text-gray-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Read More CTA Button */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setAdmissionModalOpen(true)}
              style={{ backgroundColor: GREEN }}
              className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-sm hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer shadow hover:scale-102"
            >
              <span>READ MORE ABOUT US</span>
              <svg className="w-4 h-4 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
