import React, { useRef } from "react";
import { ArrowRight, PlaneTakeoff, Clock, Wallet } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";
import PillButton from "./PillButton";
import { useScrollRevealWithStagger } from "../hooks/useScrollReveal";

export default function ItinerariesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stagger load both major wide itineraries
  useScrollRevealWithStagger(containerRef, ".itinerary-card", 40);

  const itineraries = [
    {
      title: "Seven days across the Faroe Islands",
      tag: "Slow travel",
      price: "From $2400",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85",
      alt: "Panoramic green cliffs with majestic waterfalls in the Faroe Islands",
      overview: "Deep ocean fiords, grass roofed villages, and hiking routes that trace high sea cliffs. Curated specifically for quiet pacing and optimal photography conditions.",
      tripTime: "7 Days",
    },
    {
      title: "A long weekend in old Kyoto",
      tag: "City and culture",
      price: "From $1150",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
      alt: "Historic street in Kyoto illuminated by soft warm traditional lamps",
      overview: "Mornings in moss gardens, tea houses tucked behind bamboo thickets, and deep dives into traditional craft workshops. A compact but highly immersive journey.",
      tripTime: "4 Days",
    },
  ];

  const handleBrowse = () => {
    alert("Our global library of 140 curated routes is loading shortly");
  };

  return (
    <section
      ref={containerRef}
      id="itineraries"
      className="bg-brand-charcoal py-24 md:py-32 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Header Content */}
        <SectionEyebrow>CURATED ITINERARIES</SectionEyebrow>
        
        <h2 className="text-white font-semibold text-3xl md:text-5xl tracking-tight leading-tight mt-3 mb-4 select-none uppercase">
          Journeys we would take ourselves
        </h2>
        
        <p className="text-white/75 font-normal text-sm md:text-base max-w-xl mx-auto mb-16 select-none">
          Handbuilt routes from our travel editors, ready to book or remix
        </p>

        {/* Wide Card Rows */}
        <div className="flex flex-col gap-10 text-left mb-16">
          {itineraries.map((itinerary, idx) => (
            <div
              key={idx}
              className="itinerary-card group flex flex-col lg:flex-row bg-brand-black border border-white/5 rounded-3xl overflow-hidden hover:border-gold/30 transition-all duration-500 shadow-2xl"
            >
              
              {/* Media Block (Left or Alternate order) */}
              <div className="w-full lg:w-[45%] h-[300px] lg:h-auto relative overflow-hidden">
                <img
                  src={itinerary.image}
                  alt={itinerary.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent lg:hidden z-10" />
                
                {/* Floating Tag over image */}
                <span className="absolute top-6 left-6 inline-block bg-brand-black/70 backdrop-blur-md border border-white/10 text-gold text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full z-20">
                  {itinerary.tag.toUpperCase()}
                </span>
              </div>

              {/* Text Block (Right) */}
              <div className="w-full lg:w-[55%] p-8 lg:p-12 flex flex-col justify-between">
                
                {/* Topic content */}
                <div>
                  <h3 className="text-white font-semibold text-2xl lg:text-3xl tracking-tight mt-1 mb-4 group-hover:text-gold transition-colors duration-300">
                    {itinerary.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-[480px]">
                    {itinerary.overview}
                  </p>
                </div>

                {/* Meta details footer line */}
                <div className="flex flex-wrap items-center justify-between border-t border-white/5 pt-6 gap-4">
                  <div className="flex items-center space-x-6 text-white/50 text-xs font-semibold tracking-wider">
                    <span className="flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-white/40" />
                      <span>{itinerary.tripTime}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Wallet className="w-4 h-4 text-white/40" />
                      <span>{itinerary.price}</span>
                    </span>
                  </div>

                  {/* Remix Text Link */}
                  <div className="flex items-center space-x-2 text-gold group-hover:translate-x-1.5 transition-transform duration-300">
                    <span className="text-xs font-bold tracking-widest uppercase">Explore itinerary</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Action button */}
        <PillButton variant="secondary" onClick={handleBrowse}>
          Browse all itineraries
        </PillButton>

      </div>
    </section>
  );
}
