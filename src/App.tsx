/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import ExperiencePillars from "./components/ExperiencePillars";
import FeaturedDestinations from "./components/FeaturedDestinations";
import HowItWorks from "./components/HowItWorks";
import ItinerariesPreview from "./components/ItinerariesPreview";
import FieldNotesPreview from "./components/FieldNotesPreview";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <div className="relative min-h-screen bg-brand-black text-brand-cream">
      {/* Golden Scroll Progress bar at absolute top */}
      <ScrollProgressBar />

      {/* Immersive custom circular cursor layout */}
      <CustomCursor />

      {/* Absolute/Sticky global header */}
      <Navbar />

      {/* Primary content area */}
      <main>
        <Hero />
        <TrustBar />
        <ExperiencePillars />
        <FeaturedDestinations />
        <HowItWorks />
        <ItinerariesPreview />
        <FieldNotesPreview />
        <Testimonials />
        <Newsletter />
      </main>

      {/* Dynamic branding footer */}
      <Footer />
    </div>
  );
}

