import React, { useRef, useEffect } from "react";

export default function TrustBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef1 = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track1 = trackRef1.current;
    const track2 = trackRef2.current;
    if (!track1 || !track2) return;

    // Use dynamic import or standard gsap timeline
    import("gsap").then(({ default: gsap }) => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const tl = gsap.timeline({ repeat: -1 });
      tl.to([track1, track2], {
        xPercent: -100,
        duration: 25,
        ease: "none",
      });

      const outer = containerRef.current;
      if (outer) {
        const handleMouseEnter = () => {
          gsap.to(tl, { timeScale: 0.25, duration: 0.6 });
        };
        const handleMouseLeave = () => {
          gsap.to(tl, { timeScale: 1.0, duration: 0.6 });
        };
        outer.addEventListener("mouseenter", handleMouseEnter);
        outer.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          outer.removeEventListener("mouseenter", handleMouseEnter);
          outer.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });
  }, []);

  const logos = [
    {
      type: "condenast",
      content: (
        <div className="flex flex-col items-center">
          <span className="font-serif italic text-lg md:text-xl font-bold tracking-tight text-white/90">
            CONDÉ NAST
          </span>
          <span className="text-[9px] tracking-[0.4em] text-white/70 -mt-0.5 uppercase">
            TRAVELLER
          </span>
        </div>
      ),
    },
    {
      type: "natgeo",
      content: (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-6 border-2 border-gold bg-transparent shrink-0" />
          <span className="font-sans font-bold text-xs tracking-wider uppercase text-white/95 whitespace-nowrap">
            NATIONAL GEOGRAPHIC
          </span>
        </div>
      ),
    },
    {
      type: "afar",
      content: (
        <div className="flex items-center">
          <span className="font-sans font-extrabold text-xl md:text-2xl tracking-[0.1em] text-white/95 italic">
            AFAR
          </span>
        </div>
      ),
    },
    {
      type: "suitcase",
      content: (
        <div className="flex items-center">
          <span className="font-serif text-lg md:text-xl tracking-widest uppercase text-white/90">
            SUITCASE
          </span>
        </div>
      ),
    },
    {
      type: "monocle",
      content: (
        <div className="flex items-center">
          <span className="font-sans font-semibold text-lg md:text-xl tracking-tight text-white/95 uppercase">
            MONOCLE
          </span>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-brand-charcoal border-y border-white/5 py-16 text-center select-none overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Caption */}
        <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.22em] mb-10">
          Featured in
        </p>
      </div>

      {/* Infinite Scrolling Ticker Frame */}
      <div className="relative w-full overflow-hidden flex">
        {/* Soft edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-charcoal to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-charcoal to-transparent z-10 pointer-events-none" />

        {/* Track 1 */}
        <div
          ref={trackRef1}
          className="flex shrink-0 items-center justify-around w-full min-w-full gap-12 sm:gap-20 px-4"
        >
          {logos.map((logo, idx) => (
            <div
              key={`track1-${idx}`}
              className="opacity-40 hover:opacity-100 transition-opacity duration-300 transform hover:scale-[1.03] cursor-pointer"
            >
              {logo.content}
            </div>
          ))}
        </div>

        {/* Track 2 (Identical mirror) */}
        <div
          ref={trackRef2}
          className="flex shrink-0 items-center justify-around w-full min-w-full gap-12 sm:gap-20 px-4"
        >
          {logos.map((logo, idx) => (
            <div
              key={`track2-${idx}`}
              className="opacity-40 hover:opacity-100 transition-opacity duration-300 transform hover:scale-[1.03] cursor-pointer"
            >
              {logo.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
