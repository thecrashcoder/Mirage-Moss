import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to initialize correct position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="scroll-progress-bar-container"
      className="fixed top-0 left-0 right-0 h-[3px] bg-white/[0.03] z-[9999] pointer-events-none"
    >
      <div
        id="scroll-progress-bar-fill"
        className="h-full bg-gold transition-all duration-75 ease-out shadow-[0_0_10px_rgba(201,162,107,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
