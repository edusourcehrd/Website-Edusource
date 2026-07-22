"use client";

import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import TrustStats from "@/components/sections/trust-stats";
import HowItWorks from "@/components/sections/how-it-works";
import dynamic from "next/dynamic";
import Footer from "@/components/sections/footer";
import StickyBanner from "@/components/sections/sticky-banner";

const LogoSlideshow = dynamic(() => import("@/components/sections/logo-slideshow"));
const ComparisonSection = dynamic(() => import("@/components/sections/comparison"));
const StepsSection = dynamic(() => import("@/components/sections/steps"));
const ValueCards = dynamic(() => import("@/components/sections/value-cards"));
const Testimonials = dynamic(() => import("@/components/sections/testimonials"));
const FAQ = dynamic(() => import("@/components/sections/faq"));
const FinalCTA = dynamic(() => import("@/components/sections/final-cta"));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <HowItWorks />
        <LogoSlideshow />
        <ComparisonSection />
        <StepsSection />
        <ValueCards />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
