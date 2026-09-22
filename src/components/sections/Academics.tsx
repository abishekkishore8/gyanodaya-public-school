import { useMemo, useState } from "react";

import AcademicStageIcon from "@/components/icons/AcademicStageIcon";
import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { useHashTab } from "@/hooks/useHashTab";
import { GOLD } from "@/lib/theme";

/** Curriculum showcase with a tab per academic stage. */
export default function Academics({ initialStage }: { initialStage?: string } = {}) {
  const { academics } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();
  const { highlights, stages } = academics.curriculum;

  const stageIds = useMemo(() => stages.map((stage) => stage.id), [stages]);
  const [activeTab, setActiveTab] = useState(initialStage || stages[0]?.id || "");

  // `/academics#primary` and friends open straight onto that stage.
  useHashTab(stageIds, setActiveTab);

  const currentData = stages.find((stage) => stage.id === activeTab) || stages[0];
  if (!currentData) return null;

  return (
    <section id="academics" className="py-16 sm:py-24 bg-gradient-to-b from-[#f8faf8] via-white to-[#f4f7f4] border-t border-gray-200/70 relative overflow-hidden">
      {/* Subtle Background Architectural Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#14452f]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#dfb455]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header: Editorial & Balanced */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-gray-200/80 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#14452f]/8 text-[#14452f] text-[10px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c59a3f]" />
              <span>ACADEMIC EXCELLENCE & CURRICULUM</span>
            </div>
            <h2 className="font-serif text-[1.85rem] sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.08] sm:leading-[1.15] max-w-[13ch] sm:max-w-none mx-auto lg:mx-0">
              Nurturing Intellect, <br className="hidden md:inline" />
              <span className="italic font-normal text-[#14452f]">Shaping Leaders of Tomorrow.</span>
            </h2>
          </div>

          <p className="text-gray-600 text-[11px] sm:text-sm lg:max-w-md leading-relaxed max-w-[34rem] mx-auto lg:mx-0">
            {currentData.tagline}
          </p>
        </div>

        {/* Key Academic Metrics Ticker */}
        <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto overscroll-x-contain no-scrollbar [-webkit-overflow-scrolling:touch] pb-2 md:pb-0 mb-8 sm:mb-10 snap-x snap-mandatory">
          {highlights.map((stat) => (
            <div
              key={stat.id}
              className="min-w-[9.5rem] md:min-w-0 bg-white/95 backdrop-blur-xs p-3 sm:p-5 rounded-2xl border border-gray-200/70 shadow-xs hover:shadow-md hover:border-[#14452f]/30 transition-all group shrink-0 snap-start"
            >
              <div className="text-xl sm:text-3xl font-serif font-bold text-[#14452f] group-hover:text-[#c59a3f] transition-colors">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-gray-900 mt-1 leading-snug">{stat.label}</div>
              <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-snug">{stat.detail}</div>
            </div>
          ))}
        </div>

        {/* Segmented Stage Switcher Pills */}
        <div className="flex items-stretch gap-2.5 overflow-x-auto overscroll-x-contain no-scrollbar [-webkit-overflow-scrolling:touch] pb-3 mb-7 sm:mb-8 px-0.5 sm:px-0 snap-x snap-mandatory">
          {stages.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group min-w-[11rem] max-w-[11rem] sm:min-w-[10.5rem] sm:max-w-none md:min-w-0 px-3.5 py-3 sm:px-5 rounded-2xl text-left transition-all cursor-pointer border shrink-0 snap-start ${
                  isActive
                    ? "bg-gradient-to-br from-[#14452f] to-[#1f5a3d] text-white border-[#14452f] shadow-lg shadow-[#14452f]/15"
                    : "bg-white/95 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50/80"
                }`}
              >
                <div className={`text-xs sm:text-sm font-bold tracking-normal sm:tracking-wide leading-tight whitespace-normal break-words ${isActive ? "text-white" : "text-gray-900 group-hover:text-[#14452f]"}`}>
                  {tab.label}
                </div>
                <div className={`text-[10px] mt-1.5 leading-snug whitespace-normal break-words ${isActive ? "text-[#dfb455]" : "text-gray-500"}`}>
                  {tab.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Academic Content Stage Canvas */}
        {(() => {
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-stretch">

              {/* Stage Feature Overview Showcase (5 columns) */}
              <div className="lg:col-span-5 bg-[#0d2e20] text-white rounded-[1.75rem] overflow-hidden border border-[#1e5038] shadow-xl flex flex-col justify-between relative group">
                <div className="relative h-52 sm:h-64 overflow-hidden">
                  <img
                    src={currentData.bannerImageUrl}
                    alt={currentData.bannerTitle}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2e20] via-[#0d2e20]/40 to-transparent" />

                  <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/15 text-[9.5px] sm:text-[10.5px] font-semibold tracking-wider text-[#dfb455] uppercase">
                    CBSE Affiliated · GPS Bagodar
                  </div>
                </div>

                <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between relative z-10 -mt-5 sm:-mt-6">
                  <div>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-white tracking-tight mb-1 leading-tight">
                      {currentData.bannerTitle}
                    </h3>
                    <p className="text-[#dfb455] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                      {currentData.bannerSubtitle}
                    </p>

                    <p className="text-gray-300 text-[11px] sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light">
                      {currentData.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-white/10">
                      {currentData.bannerFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-[11px] sm:text-xs text-gray-200 leading-snug bg-white/0 rounded-xl">
                          <span className="w-4 h-4 rounded-full bg-[#dfb455]/20 text-[#dfb455] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
                    <button
                      onClick={() => setAdmissionModalOpen(true)}
                      style={{ backgroundColor: GOLD }}
                      className="w-full sm:w-auto text-white text-[11px] sm:text-xs font-bold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer shadow-sm active:scale-95"
                    >
                      Apply for Admission
                    </button>
                    <button
                      onClick={() => {
                        window.location.hash = "online-forms";
                      }}
                      className="text-[11px] sm:text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center sm:justify-start gap-1 cursor-pointer transition-colors w-full sm:w-auto"
                    >
                      <span>Schedule Campus Visit</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Structured Subject & Learning Cards (7 columns) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 content-start">
                {currentData.cards.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[1.4rem] p-4 sm:p-7 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#14452f]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#f0faf5] border border-[#14452f]/10 flex items-center justify-center text-[#14452f] group-hover:bg-[#14452f] group-hover:text-[#dfb455] transition-colors">
                          <AcademicStageIcon type={item.iconType} className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
                        </div>
                        <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#faf5ea] text-[#976a16] border border-[#dfb455]/40 shrink-0">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-[15px] sm:text-lg text-gray-900 group-hover:text-[#14452f] transition-colors mb-2 leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-gray-600 text-[11px] sm:text-sm leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[10.5px] sm:text-[11px] font-semibold text-[#14452f] gap-3">
                      <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>Explore Syllabus</span>
                        <span>→</span>
                      </span>
                      <span className="text-gray-400 font-normal">GPS Standard</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
}
