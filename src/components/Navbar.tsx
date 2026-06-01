import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Globe } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for header background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation for mobile overlay menu
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when menu open
      document.body.style.overflow = "hidden";

      // Animate overlay background
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      // Animate link list
      const items = mobileMenuRef.current?.querySelectorAll(".mobile-link");
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.1, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      // Fade out before closing state
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(true);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (isOpen) {
      toggleMenu();
    }
  };

  const navLinks = [
    { label: "DESTINATIONS", id: "destinations" },
    { label: "THE EXPERIENCE", id: "experience" },
    { label: "FIELD NOTES", id: "fieldnotes" },
    { label: "CURATED ITINERARIES", id: "itineraries" },
  ];

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-5 md:px-16 md:py-6 ${
          isScrolled
            ? "bg-brand-black/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Logo & Text */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/10">
              <Globe className="w-4.5 h-4.5 text-white transition-transform duration-500 group-hover:rotate-12" />
            </div>
            <span className="text-white font-medium text-base tracking-widest uppercase flex items-center">
              Mirage & Moss
            </span>
          </div>

          {/* Center: Pill Navigation (Desktop Only) */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-2 py-1.5 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white/85 text-[11px] font-semibold tracking-wider px-5 py-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => alert("Exclusive portal access: Signup open in early beta shortly")}
              className="hidden md:block text-white/80 hover:text-white text-xs font-semibold tracking-wider px-5 py-2.5 rounded-full border border-white/10 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              LOGIN / SIGNUP
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="p-2 text-white hover:text-gold transition-colors duration-300 lg:hidden cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-brand-black/98 z-40 flex flex-col justify-center items-center lg:hidden backdrop-blur-xl"
        >
          {/* Close button inside overlay corner */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>

          <nav className="flex flex-col items-center space-y-8 select-none">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="mobile-link text-white/90 text-2xl font-light tracking-widest transition-all duration-300 hover:text-gold cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                alert("Membership portal active soon");
                toggleMenu();
              }}
              className="mobile-link mt-8 px-8 py-3 rounded-full border border-gold/40 text-gold text-sm tracking-widest hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
            >
              LOGIN / SIGNUP
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
