import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PillButton from "./PillButton";
import SectionEyebrow from "./SectionEyebrow";

export default function FeaturedDestinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Smoothly track viewport width resizes to keep translation proportions pristine
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const destinations = [
    {
      title: "Kyoto, Japan",
      category: "EAST ASIA",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=85",
      alt: "Serene golden pavilion pagoda temple surrounded by nature in Kyoto",
    },
    {
      title: "Santorini, Greece",
      category: "MEDITERRANEAN",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=85",
      alt: "Classic whitewashed blue dome churches overlooking the Aegean Sea in Santorini",
    },
    {
      title: "Cappadocia, Turkey",
      category: "WEST ASIA",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=85",
      alt: "Colorful hot air balloons floating over magical landscape of Cappadocia",
    },
    {
      title: "Amalfi Coast, Italy",
      category: "SOUTHERN EUROPE",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=85",
      alt: "Vibrant coastal town of Positano on the dramatic cliffs of Amalfi",
    },
    {
      title: "Torres del Paine, Patagonia",
      category: "SOUTH AMERICA",
      image: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=85",
      alt: "Towering granite horns and high glacial peaks of Torres del Paine in Patagonia",
    },
  ];

  // Drag and Swipe Gesture Handlers
  const dragStartX = useRef<number | null>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartX.current;

    // Trigger state index shifts on passing a 50px threshold
    if (diff > 50) {
      setActiveIndex((prev) => Math.max(0, prev - 1));
      dragStartX.current = null;
    } else if (diff < -50) {
      setActiveIndex((prev) => Math.min(destinations.length - 1, prev + 1));
      dragStartX.current = null;
    }
  };

  const handleDragEnd = () => {
    dragStartX.current = null;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(destinations.length - 1, prev + 1));
  };

  const handleViewAll = () => {
    alert("Full destinations portal opening soon. We are adding new entries weekly.");
  };

  // Spacing helper computation for dynamic 3D carousel positioning
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const spacing = isMobile ? 120 : isTablet ? 190 : 270;

  return (
    <section
      ref={containerRef}
      id="destinations"
      className="bg-black py-24 md:py-32 border-b border-white/5 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <SectionEyebrow>FEATURED DESTINATIONS</SectionEyebrow>
        
        <h2 className="text-white font-semibold text-3xl md:text-5xl tracking-tight leading-tight mt-3 mb-16 select-none uppercase">
          Places of quiet wonder
        </h2>

        {/* 3D Perspective Coverflow track wrapper */}
        <div
          className="relative w-full h-[460px] md:h-[520px] flex items-center justify-center overflow-visible mb-12 cursor-grab active:cursor-grabbing"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {destinations.map((item, idx) => {
            const offset = idx - activeIndex;
            const absOffset = Math.abs(offset);

            // Spacing layout with positive/negative non-linear shifts
            let translateX = offset * spacing;
            if (offset < 0) {
              translateX -= isMobile ? 10 : 30;
            } else if (offset > 0) {
              translateX += isMobile ? 10 : 30;
            }

            // Exactly replicating the 3D skew coordinates shown in the photo
            // Left skewed cards rotate positive along Y, right skewed rotate negative along Y.
            const rotateY = offset * -26;
            const scale = 1 - absOffset * 0.12;
            const translateZ = absOffset * -160;
            const zIndex = 100 - absOffset;
            const isActive = idx === activeIndex;

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="destination-card absolute w-[240px] h-[350px] sm:w-[280px] sm:h-[400px] md:w-[320px] md:h-[450px] rounded-[32px] overflow-hidden shadow-3xl cursor-pointer select-none transition-all duration-700 ease-out"
                style={{
                  transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  boxShadow: isActive ? "0 25px 50px -12px rgba(0,0,0,0.85)" : "0 10px 30px -10px rgba(0,0,0,0.6)",
                }}
              >
                {/* Visual Art Artwork */}
                <img
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Clean, luxury gradient overlay mapping bottom text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

                {/* bottom-mounted Overlap text elements */}
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-20 text-center flex flex-col items-center justify-end">
                  <h3 className="text-white font-serif font-light text-lg sm:text-xl md:text-[22px] leading-tight select-none pointer-events-none">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Dots & Chevron Navigation Control Bars */}
        <div className="flex flex-col items-center justify-center gap-6 mt-4">
          <div className="flex items-center space-x-6">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 hover:scale-105 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Tracks */}
            <div className="flex space-x-2">
              {destinations.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === activeIndex ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === destinations.length - 1}
              className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 hover:scale-105 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
              aria-label="Next destination"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <PillButton variant="secondary" onClick={handleViewAll}>
              View all places
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
