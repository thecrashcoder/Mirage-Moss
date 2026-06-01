import React, { useState, useRef } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal transition on enter viewport
  useScrollReveal(containerRef, 25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    // Simulate premium registration success
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section
      ref={containerRef}
      id="newsletter"
      className="bg-brand-black py-24 border-b border-white/5 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Subtitle icon block */}
        <div className="mx-auto w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 border border-gold/20">
          <Mail className="w-4.5 h-4.5 stroke-[1.5]" />
        </div>

        {/* Dynamic State: Submitted Success Alert */}
        {isSubmitted ? (
          <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#1C1814] border border-gold/20 flex flex-col items-center">
            <CheckCircle2 className="w-10 h-10 text-gold mb-3 animate-[spin_1s_ease-out_1]" />
            <h3 className="text-white font-bold text-lg mb-1 tracking-wide uppercase">SUCCESSFULLY JOINED</h3>
            <p className="text-white/70 text-xs">
              Welcome to the inner circle. Your first curation letter arrives on the upcoming new moon.
            </p>
          </div>
        ) : (
          <div>
            {/* Header copy */}
            <h2 className="text-white font-semibold text-3xl md:text-4xl tracking-tight leading-tight select-none mb-3 uppercase">
              Field notes, straight to your inbox
            </h2>

            <p className="text-white/60 text-xs sm:text-sm font-normal tracking-wide select-none mb-10">
              One thoughtful letter a month. No noise, no spam.
            </p>

            {/* Email form container - Input and Join button on one single horizontal row */}
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex items-center border border-white/10 hover:border-gold/30 rounded-full p-1.5 bg-brand-charcoal hover:bg-[#1A1612] transition-all duration-300 shadow-xl"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent text-white px-5 py-2.5 text-xs sm:text-sm rounded-full outline-none placeholder-white/30 border-none mr-2 font-normal"
              />
              <button
                type="submit"
                className="bg-white text-black hover:bg-gold hover:text-black shrink-0 px-6 sm:px-8 py-2.5 sm:py-3.5 text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,162,107,0.4)] cursor-pointer"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 stroke-[2.5]" />
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}
