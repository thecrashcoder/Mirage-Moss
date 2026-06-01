import React, { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillButton from "./PillButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // -------------------------------------------------------------
    // Timeline Sequence on Mount as Requested
    // -------------------------------------------------------------
    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced) {
        // If reduced motion is requested, simply display immediately
        gsap.set([pinRef.current, ".hero-word", ".sub-word", buttonsRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const timeline = gsap.timeline();

      // Step 1: Pin icon drops in (from y -20, opacity 0 to normal with a slight bounce-back)
      timeline.fromTo(
        pinRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "back.out(2.2)" }
      );

      // Step 2: Heading animates word-by-word stagger
      timeline.fromTo(
        ".hero-word",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.08 },
        "-=0.4" // overlap with step 1 completing
      );

      // Step 3: Subheading animates word-by-word stagger
      timeline.fromTo(
        ".sub-word",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.04 },
        "-=0.2"
      );

      // Step 4: CTA buttons fade up from the bottom
      timeline.fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.1"
      );

      // -------------------------------------------------------------
      // Subtle Parallax Scroll Effect on Video Container
      // -------------------------------------------------------------
      gsap.to(".hero-video-container", {
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWordsLine1 = "Begin Your Next".split(" ");
  const headingWordsLine2 = "Big Adventure".split(" ");

  const subWordsLine1 = "Discover hidden gems, plan unforgettable trips, and".split(" ");
  const subWordsLine2 = "explore the world, all in one seamless app.".split(" ");

  const handleInquire = () => {
    document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownload = () => {
    alert("Downloading Mirage & Moss from App Store...");
  };

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-black"
    >
      {/* Fullscreen Video Background exactly containing all viewport elements */}
      <div className="hero-video-container absolute inset-0 w-full h-full z-0 select-none pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          src="https://cdn.sceneai.art/Hero%20Section%20Video/0519be39-d8d1-48a5-84ee-f8a1ec038cd6.mp4"
        />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Pin Container */}
        <div 
          ref={pinRef}
          className="mb-8 p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center text-gold cursor-pointer transform hover:scale-110 hover:border-gold/30 transition-all duration-300"
        >
          <MapPin className="w-6 h-6 drop-shadow-[0_4px_16px_rgba(201,162,107,0.4)]" />
        </div>

        {/* Heading Word-Splitting Layout */}
        <h1 className="text-white font-semibold tracking-[-0.027em] leading-tight mb-4 text-3xl sm:text-5xl md:text-[60px] select-none uppercase">
          {/* Line 1 */}
          <span className="block overflow-hidden">
            {headingWordsLine1.map((word, idx) => (
              <span key={`h1-${idx}`} className="word-wrap inline-block mr-[0.25em]">
                <span className="hero-word opacity-0 inline-block transform translate-y-full">
                  {word}
                </span>
              </span>
            ))}
          </span>
          {/* Line 2 */}
          <span className="block overflow-hidden">
            {headingWordsLine2.map((word, idx) => (
              <span key={`h2-${idx}`} className="word-wrap inline-block mr-[0.25em] text-white">
                <span className="hero-word opacity-0 inline-block transform translate-y-full">
                  {word}
                </span>
              </span>
            ))}
          </span>
        </h1>

        {/* Subheading Word-Splitting Layout */}
        <p className="text-white font-medium leading-relaxed max-w-[540px] mb-12 text-sm sm:text-base md:text-[17px] select-none">
          {/* Sub Line 1 */}
          <span className="block overflow-hidden">
            {subWordsLine1.map((word, idx) => (
              <span key={`s1-${idx}`} className="word-wrap inline-block mr-[0.22em] text-white">
                <span className="sub-word opacity-0 inline-block transform translate-y-full">
                  {word}
                </span>
              </span>
            ))}
          </span>
          {/* Sub Line 2 */}
          <span className="block overflow-hidden">
            {subWordsLine2.map((word, idx) => (
              <span key={`s2-${idx}`} className="word-wrap inline-block mr-[0.22em] text-white/90">
                <span className="sub-word opacity-0 inline-block transform translate-y-full">
                  {word}
                </span>
              </span>
            ))}
          </span>
        </p>

        {/* CTA Actions */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <PillButton variant="primary" onClick={handleInquire} className="w-full sm:w-auto">
            Inquire Now
          </PillButton>
          <PillButton variant="secondary" onClick={handleDownload} className="w-full sm:w-auto">
            Download App
          </PillButton>
        </div>

      </div>

      {/* Subtle indicator arrow bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2">Scroll to discover</span>
        <div className="w-px h-10 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
}
