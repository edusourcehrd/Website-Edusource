import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import TrustStats from "@/components/sections/trust-stats";
import HowItWorks from "@/components/sections/how-it-works";
import Footer from "@/components/sections/footer";
import StickyBanner from "@/components/sections/sticky-banner";
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema, getFAQSchema, getContactPageSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { edumitraFaq } from "@/data/edumitraFaq";

const LogoSlideshow = dynamic(() => import("@/components/sections/logo-slideshow"));
const ComparisonSection = dynamic(() => import("@/components/sections/comparison"));
const StepsSection = dynamic(() => import("@/components/sections/steps"));
const ValueCards = dynamic(() => import("@/components/sections/value-cards"));
const Testimonials = dynamic(() => import("@/components/sections/testimonials"));
const FAQ = dynamic(() => import("@/components/sections/faq"));
const FinalCTA = dynamic(() => import("@/components/sections/final-cta"));

export const metadata: Metadata = {
  title: "Edusource HRD Centre, Kollam | Government-Approved Skill Training Institute",
  description:
    "Edusource HRD Centre in Kollam provides government-approved professional training in Hospital Administration, HR Management, Logistics, Medical Coding, and German language.",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "Edusource HRD Centre, Kollam | Government-Approved Skill Training Institute",
    description:
      "Transform your career with government-approved diploma courses in Hospital Administration, Medical Coding, Logistics, HR, and German language training in Kollam.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Edusource HRD Centre Kollam Campus & Programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edusource HRD Centre, Kollam | Government-Approved Skill Training Institute",
    description:
      "Transform your career with government-approved diploma courses in Hospital Administration, Medical Coding, Logistics, HR, and German language training in Kollam.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function Home() {
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Home", item: "/" }]);
  const faqList = Array.isArray(edumitraFaq) ? edumitraFaq : [];
  const faqSchema = getFAQSchema(
    faqList.slice(0, 8).map((f) => ({
      question: (f.keywords && f.keywords[0]) || f.id.replace(/-/g, " "),
      answer: f.answer,
    }))
  );
  const contactSchema = getContactPageSchema();

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLdScript data={[breadcrumbSchema, faqSchema, contactSchema]} />
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
