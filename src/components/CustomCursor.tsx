import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Check if the user is on a touch device or prefers-reduced-motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isReduced) {
      // Hide completely on mobile/tablet or reduced motion
      cursor.style.display = "none";
      ring.style.display = "none";
      return;
    }

    // Hide default system cursor on the document body to enable custom cursor style
    document.body.classList.add("cursor-none");

    // Align cursors center initially
    gsap.set([cursor, ring], { xPercent: -50, yPercent: -50 });

    // GSAP quickSetter for ultra fluid high performance coordinates rendering
    const xCursorSet = gsap.quickSetter(cursor, "x", "px");
    const yCursorSet = gsap.quickSetter(cursor, "y", "px");
    const xRingSet = gsap.quickSetter(ring, "x", "px");
    const yRingSet = gsap.quickSetter(ring, "y", "px");

    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Inner dot follows mouse coordinates exactly
      xCursorSet(mouse.x);
      yCursorSet(mouse.y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Dynamic ticking loop for the delayed lag overlay ring
    const ticker = gsap.ticker.add(() => {
      // Fetch current GSAP targets or let GSAP smooth toward mouse properties with 0.15 factor interpolation
      const currentX = gsap.getProperty(ring, "x") as number || 0;
      const currentY = gsap.getProperty(ring, "y") as number || 0;

      const nextX = currentX + (mouse.x - currentX) * 0.15;
      const nextY = currentY + (mouse.y - currentY) * 0.15;

      xRingSet(nextX);
      yRingSet(nextY);
    });

    // -------------------------------------------------------------
    // Dynamic Hover Listeners Setup (Expand Effect)
    // -------------------------------------------------------------
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect if element is a button, link, or custom clickable selector
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".destination-card") ||
        target.closest(".article-card") ||
        target.closest(".itinerary-card") ||
        target.closest("[role='button']") ||
        target.style.cursor === "pointer" ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        // Expand the outer ring and change inner dot style
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "#C9A26B", // Match gold accent key
          backgroundColor: "rgba(201, 162, 107, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursor, {
          scale: 0.5,
          backgroundColor: "#C9A26B",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".destination-card") ||
        target.closest(".article-card") ||
        target.closest(".itinerary-card") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        // Return back to standard minimal style
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.5)",
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#FAF7F2",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Hide custom elements when mouse leaves document viewport scope
    const handleMouseLeave = () => {
      gsap.to([cursor, ring], { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, ring], { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Tiny inner leading pinpoint dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-cream rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Outer follow-up smoothing circle ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 bg-transparent pointer-events-none z-[9998] transition-transform duration-75 ease-out mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
