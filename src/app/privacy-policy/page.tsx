import type { Metadata } from "next";
import React from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ScrollReveal from '@/components/scroll-reveal';
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "Privacy Policy | Edusource HRD Centre, Kollam",
  description:
    "Read the official Privacy Policy of Edusource HRD Centre, Kollam. Learn how we collect, protect, and use student and visitor data.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Edusource HRD Centre, Kollam",
    description:
      "Official Privacy Policy of Edusource HRD Centre, Kollam.",
    url: `${SITE_CONFIG.url}/privacy-policy`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Edusource HRD Centre",
    description: "Privacy Policy of Edusource HRD Centre, Kollam.",
  },
};

export default function PrivacyPolicy() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Privacy Policy", item: "/privacy-policy" },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLdScript data={breadcrumbSchema} />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] mb-4">Privacy Policy</h1>
            <p className="text-slate-500 font-bold mb-12">Edusource HRD Centre | Last Updated: 18 May 2026</p>
            
            <div className="prose prose-lg max-w-none prose-slate prose-headings:text-[#0f172a] prose-headings:font-bold prose-p:text-slate-600 prose-li:text-slate-600">
              <p>Edusource HRD Centre respects your privacy. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, submit an enquiry, contact us, use our chatbot, or use our services.</p>

              <h2 className="text-2xl mt-12 mb-6">1. Who We Are</h2>
              <p>Edusource HRD Centre is a training institute based in Kollam, Kerala, offering professional courses such as Hospital Administration, HR Management, Logistics and Shipping Management, Medical Coding, Medical Transcription, and German Language Training.</p>
              <p>
                Address: Edusource HRD Centre, Kollam, Kerala, India<br />
                Email: info@edusourcehrd.com<br />
                Website: <a href="https://edusourcehrd.com/" className="text-blue-600 hover:underline">https://edusourcehrd.com/</a><br />
                Phone / WhatsApp: +91 9895953159
              </p>

              <h2 className="text-2xl mt-12 mb-6">2. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide to us when you fill out forms on our website, request information, apply for admission, or communicate with us.</p>
              <ul>
                <li>Full Name</li>
                <li>Mobile Number and WhatsApp Number</li>
                <li>Email Address</li>
                <li>Address, District, State, Pincode</li>
                <li>Academic Qualification details</li>
                <li>Course preferences and learning mode</li>
              </ul>

              <h2 className="text-2xl mt-12 mb-6">3. How We Use Your Information</h2>
              <p>We use the collected information for educational, administrative, and student support purposes only:</p>
              <ul>
                <li>To process course enquiries and online admission applications</li>
                <li>To contact you regarding course details, fee structures, and batch schedules</li>
                <li>To provide academic counselling and assistance</li>
                <li>To respond to chatbot queries and messages</li>
              </ul>

              <h2 className="text-2xl mt-12 mb-6">4. Data Security</h2>
              <p>We implement technical and organizational measures to safeguard your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

              <h2 className="text-2xl mt-12 mb-6">5. Contact Us</h2>
              <p>If you have any questions regarding this Privacy Policy, please contact us at info@edusourcehrd.com or call +91 9895953159.</p>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
