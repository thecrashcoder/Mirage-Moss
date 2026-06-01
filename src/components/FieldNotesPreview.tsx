import React, { useRef } from "react";
import SectionEyebrow from "./SectionEyebrow";
import PillButton from "./PillButton";
import { useScrollRevealWithStagger } from "../hooks/useScrollReveal";

export default function FieldNotesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stagger editorial article card loading animation
  useScrollRevealWithStagger(containerRef, ".article-card", 30);

  const articles = [
    {
      category: "Slow travel",
      title: "The case for staying somewhere longer than you planned",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=85",
      alt: "Quiet path running through mystical fog elements in mountain valley",
      readTime: "6 min read",
    },
    {
      category: "City guides",
      title: "Forty eight hours in Lisbon, told by a local",
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=85",
      alt: "Charming traditional yellow tram on a street in Lisbon",
      readTime: "5 min read",
    },
    {
      category: "Gear",
      title: "What to pack for the Faroe Islands, and what to leave behind",
      image: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=600&q=85",
      alt: "Flat lay showing high quality outdoor boots, wool sweaters and camera gear",
      readTime: "8 min read",
    },
  ];

  const handleReadNotes = () => {
    alert("Field Notes magazine loading soon. Subscriber access is active.");
  };

  return (
    <section
      ref={containerRef}
      id="fieldnotes"
      className="bg-brand-charcoal py-24 md:py-32 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Section Title */}
        <SectionEyebrow>FIELD NOTES</SectionEyebrow>
        
        <h2 className="text-white font-semibold text-3xl md:text-5xl tracking-tight leading-tight mt-3 mb-16 select-none uppercase">
          Stories from the road
        </h2>

        {/* 3 Columns Article List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left mb-16">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="article-card group flex flex-col justify-between h-full bg-brand-black border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-gold/30 transition-all duration-500 shadow-xl"
            >
              
              {/* Media Block */}
              <div>
                <div className="h-[220px] overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Info block */}
                <div className="p-8">
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-widest uppercase mb-4 text-gold">
                    <span>{article.category}</span>
                    <span className="text-white/40 normal-case font-normal">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-white font-semibold text-lg tracking-tight leading-snug group-hover:text-gold transition-colors duration-300">
                    {article.title}
                  </h3>
                </div>
              </div>

              {/* Card CTA Footer decoration in notes */}
              <div className="px-8 pb-8 pt-0 mt-auto flex items-center text-white/50 group-hover:text-gold transition-colors duration-300">
                <span className="text-[11px] font-bold tracking-widest uppercase relative">
                  Read article
                  <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
                </span>
              </div>

            </article>
          ))}
        </div>

        {/* Action Button */}
        <PillButton variant="secondary" onClick={handleReadNotes}>
          Read field notes
        </PillButton>

      </div>
    </section>
  );
}
