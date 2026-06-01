import React from "react";
import { Instagram, Youtube, Twitter, Globe, ArrowUp } from "lucide-react";

export default function Footer() {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    explore: [
      { name: "Destinations", id: "destinations" },
      { name: "The experience", id: "experience" },
      { name: "Curated itineraries", id: "itineraries" },
      { name: "Field notes", id: "fieldnotes" },
    ],
    company: [
      { name: "About", id: "" },
      { name: "Careers", id: "" },
      { name: "Press", id: "" },
      { name: "Contact", id: "" },
    ],
    support: [
      { name: "Help centre", id: "" },
      { name: "Privacy", id: "" },
      { name: "Terms", id: "" },
    ],
  };

  const handleLinkClick = (id: string, name: string) => {
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(`${name} documentation or page details will open as we release our official guides.`);
    }
  };

  return (
    <footer className="bg-brand-black text-white/50 py-16 md:py-24 border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Major Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-white/5">
          
          {/* Brand block (left column, spans 5) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/10">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-semibold text-base tracking-widest uppercase text-white select-none">
                Mirage & Moss
              </span>
            </div>
            
            <p className="text-white/70 text-xs sm:text-sm font-light max-w-xs leading-relaxed select-none">
              Cinematic travel, planned beautifully. Empowering seamless physical adventures worldwide.
            </p>

            {/* Socials Link Row */}
            <div className="flex items-center space-x-4 pt-4 text-white/40">
              <a
                href="#footer"
                aria-label="Instagram profile"
                onClick={() => alert("Instagram active in Beta mode")}
                className="p-2 bg-brand-charcoal hover:bg-gold/15 rounded-full hover:text-gold border border-white/5 transition-all duration-300"
              >
                <Instagram className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="#footer"
                aria-label="YouTube channel"
                onClick={() => alert("YouTube catalog launches shortly")}
                className="p-2 bg-brand-charcoal hover:bg-gold/15 rounded-full hover:text-gold border border-white/5 transition-all duration-300"
              >
                <Youtube className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="#footer"
                aria-label="Twitter official profile"
                onClick={() => alert("X community space live in Beta")}
                className="p-2 bg-brand-charcoal hover:bg-gold/15 rounded-full hover:text-gold border border-white/5 transition-all duration-300"
              >
                <Twitter className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Right Columns (Links: spans 7) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 sm:gap-12 text-left">
            
            {/* Column 1: Explore */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Explore
              </h4>
              <ul className="space-y-4 text-xs font-normal">
                {footerLinks.explore.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleLinkClick(link.id, link.name)}
                      className="hover:text-gold select-none cursor-pointer text-left transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Company
              </h4>
              <ul className="space-y-4 text-xs font-normal">
                {footerLinks.company.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleLinkClick(link.id, link.name)}
                      className="hover:text-gold select-none cursor-pointer text-left transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Support
              </h4>
              <ul className="space-y-4 text-xs font-normal">
                {footerLinks.support.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleLinkClick(link.id, link.name)}
                      className="hover:text-gold select-none cursor-pointer text-left transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom copyright metadata footer line */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 text-[11px] font-normal tracking-wide gap-6">
          <p>© 2026 Mirage and Moss. All rights reserved.</p>
          
          {/* Scroll to Top helper item */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 px-4 py-2 bg-brand-charcoal hover:bg-gold/15 border border-white/5 hover:border-gold/25 rounded-full hover:text-gold cursor-pointer transition-all duration-300 select-none group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
}
