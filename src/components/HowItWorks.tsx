import React, { useRef } from "react";
import SectionEyebrow from "./SectionEyebrow";
import { useScrollRevealWithStagger } from "../hooks/useScrollReveal";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stagger loading for the steps
  useScrollRevealWithStagger(containerRef, ".step-card", 30);

  const steps = [
    {
      num: "01",
      title: "Tell us your kind of adventure",
      desc: "Answer a few quick prompts about pace, budget, and the feeling you are chasing.",
    },
    {
      num: "02",
      title: "Get a trip built around you",
      desc: "Mirage and Moss assembles a cinematic itinerary you can edit freely.",
    },
    {
      num: "03",
      title: "Go, and let the app guide you",
      desc: "Everything you booked and saved travels with you, online or off.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="bg-brand-black py-24 md:py-32 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Head Block */}
        <div className="text-center mb-20">
          <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
          <h2 className="text-white font-semibold text-3xl md:text-5xl tracking-tight leading-tight mt-3 select-none uppercase">
            Three steps from dreaming to going
          </h2>
        </div>

        {/* Steps display - Horizontal Row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-12 relative">
          
          {/* Subtle link path line behind standard desktop cards */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-white/10 z-0" />
          
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="step-card group relative flex flex-col items-center text-center p-8 rounded-2xl bg-brand-charcoal/50 border border-white/5 hover:border-gold/25 transition-all duration-300 z-10"
            >
              {/* Highlight Circle Number */}
              <div className="w-16 h-16 rounded-full bg-brand-charcoal border border-white/10 flex items-center justify-center text-gold font-bold text-xl mb-8 group-hover:scale-105 group-hover:border-gold/30 shadow-xl transition-all duration-500 z-10">
                {step.num}
              </div>

              {/* Step Title */}
              <h3 className="text-white text-lg font-bold tracking-wide mb-4">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
