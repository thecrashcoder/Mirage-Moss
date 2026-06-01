import React, { useRef } from "react";
import { Quote } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";
import { useScrollRevealWithStagger } from "../hooks/useScrollReveal";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stagger load both major quote test cards
  useScrollRevealWithStagger(containerRef, ".quote-card", 30);

  const list = [
    {
      quote: "I planned three weeks across Japan in a single evening. It felt less like admin and more like daydreaming.",
      author: "Amara",
      location: "Colombo",
    },
    {
      quote: "The hidden gems were the whole trip. We never would have found that valley on our own.",
      author: "Diego",
      location: "Lisbon",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="bg-brand-black py-24 md:py-32 border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Eyebrow */}
        <div className="text-center mb-16">
          <SectionEyebrow>LOVED BY EXPLORERS</SectionEyebrow>
        </div>

        {/* Quotes Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="quote-card group p-8 md:p-10 rounded-3xl bg-brand-charcoal border border-white/5 hover:border-gold/25 transition-all duration-500 flex flex-col justify-between shadow-2xl relative"
            >
              
              {/* Giant gold ambient quote sign back decor */}
              <div className="absolute top-6 right-8 text-gold/10 group-hover:text-gold/20 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                <Quote className="w-16 h-16 stroke-[1]" />
              </div>

              {/* Quote text body */}
              <blockquote className="text-white/95 text-base md:text-lg lg:text-[19px] leading-relaxed font-normal tracking-wide relative z-10 select-none">
                "{item.quote}"
              </blockquote>

              {/* Author signature footer */}
              <div className="mt-8 flex items-center space-x-3 select-none">
                <div className="w-px h-6 bg-gold/50" />
                <div className="text-xs uppercase tracking-widest text-gold font-bold">
                  <span>{item.author}</span>
                  <span className="text-white/40 font-normal normal-case ml-2">· {item.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
