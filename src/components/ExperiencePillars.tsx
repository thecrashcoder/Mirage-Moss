import React, { useRef } from "react";
import { Compass, CalendarRange, Map } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";
import { useScrollRevealWithStagger } from "../hooks/useScrollReveal";

export default function ExperiencePillars() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger stagger on column scroll in
  useScrollRevealWithStagger(containerRef, ".experience-column", 30);

  const pillars = [
    {
      icon: Compass,
      title: "Discover hidden gems",
      desc: "Go past the obvious. Find the quiet coves, backstreet kitchens, and golden hour viewpoints that most travellers walk right past.",
    },
    {
      icon: CalendarRange,
      title: "Plan without friction",
      desc: "Build a complete trip in minutes. Routes, stays, bookings, and timing all live in one calm, beautiful place.",
    },
    {
      icon: Map,
      title: "Explore with confidence",
      desc: "Live maps, offline access, and local insight travel with you, so you are never lost and never guessing.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="experience"
      className="bg-brand-black py-24 md:py-32 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Header Block */}
        <SectionEyebrow>THE EXPERIENCE</SectionEyebrow>
        
        <h2 className="text-white font-semibold text-3xl md:text-5xl tracking-tight leading-tight mt-3 mb-16 select-none uppercase">
          Travel, the way it should feel
        </h2>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-left mt-6">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="experience-column group p-8 rounded-2xl bg-brand-charcoal border border-white/5 hover:border-gold/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-500 mb-6 border border-white/10">
                  <IconComponent className="w-6 h-6 stroke-[1.25]" />
                </div>

                {/* Pillar Heading */}
                <h3 className="text-white text-lg font-semibold tracking-wide mb-3">
                  {item.title}
                </h3>

                {/* Description Text */}
                <p className="text-white/70 text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
