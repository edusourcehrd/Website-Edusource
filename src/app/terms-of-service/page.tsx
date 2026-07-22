import type { Metadata } from "next";
import React from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ScrollReveal from '@/components/scroll-reveal';
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "Terms of Service | Edusource HRD Centre, Kollam",
  description:
    "Read the Terms of Service for Edusource HRD Centre, Kollam. Terms governing admissions, course participation, website usage, and institutional guidelines.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms-of-service`,
  },
  openGraph: {
    title: "Terms of Service | Edusource HRD Centre, Kollam",
    description:
      "Terms of Service for Edusource HRD Centre, Kollam.",
    url: `${SITE_CONFIG.url}/terms-of-service`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Edusource HRD Centre",
    description: "Terms of Service for Edusource HRD Centre, Kollam.",
  },
};

export default function TermsOfService() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Terms of Service", item: "/terms-of-service" },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLdScript data={breadcrumbSchema} />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] mb-4">Terms of Service</h1>
            <p className="text-slate-500 font-bold mb-12">Edusource HRD Centre | Last Updated: 18 May 2026</p>
            
            <div className="prose prose-lg max-w-none prose-slate prose-headings:text-[#0f172a] prose-headings:font-bold prose-p:text-slate-600 prose-li:text-slate-600">
              <p>Welcome to the Edusource HRD Centre website. By accessing or using our website, submitting an enquiry, contacting us, using our chatbot, or using our services, you agree to the following Terms of Service.</p>

              <h2 className="text-2xl mt-12 mb-6">1. About Edusource HRD Centre</h2>
              <p>Edusource HRD Centre is an educational institution located in Kollam, Kerala, offering skill-based diploma and training programs across various sectors including healthcare administration, language training, HR, medical coding, and logistics.</p>

              <h2 className="text-2xl mt-12 mb-6">2. Admissions & Enrolment</h2>
              <p>Submission of an online application form does not guarantee immediate enrolment. Enrolment is finalized after document verification and admission confirmation by the academic office.</p>

              <h2 className="text-2xl mt-12 mb-6">3. Use of Website Content</h2>
              <p>All content on this website—including text, graphics, logos, images, course syllabi, and software—is the property of Edusource HRD Centre and protected by intellectual property laws.</p>

              <h2 className="text-2xl mt-12 mb-6">4. Contact Information</h2>
              <p>For questions or clarifications regarding these Terms of Service, please contact us:</p>
              <p>
                Edusource HRD Centre<br />
                Kollam, Kerala, India<br />
                Email: info@edusourcehrd.com<br />
                Website: <a href="https://edusourcehrd.com/" className="text-blue-600 hover:underline">https://edusourcehrd.com/</a><br />
                Phone: +91 9895953159
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
