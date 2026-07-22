import React from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ScrollReveal from '@/components/scroll-reveal';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] mb-4">Privacy Policy</h1>
            <p className="text-slate-500 font-bold mb-12">Edusource HRD Centre | Last Updated: 18 May 2026</p>
            
            <div className="prose prose-lg max-w-none prose-slate prose-headings:text-[#0f172a] prose-headings:font-bold prose-p:text-slate-600 prose-li:text-slate-600">
              <p>Edusource HRD Centre respects your privacy. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, submit an enquiry, contact us, use our chatbot, or use our services.</p>

              <h2 className="text-2xl mt-12 mb-6">1. Who We Are</h2>
              <p>Edusource HRD Centre is a skill training and career guidance institution based in <strong>Madannada, Kollam, Kerala, India</strong>.</p>
              <p>
                Website: <a href="https://edusourceacademy.com/" className="text-blue-600 hover:underline">https://edusourceacademy.com/</a><br />
                Email: hrdcentrekollam@gmail.com<br />
                Phone: +91 96334 92021 / +91 98959 53159
              </p>

              <h2 className="text-2xl mt-12 mb-6">2. Information We Collect</h2>
              <p>We may collect the following information when you contact us, fill out a form, request admission details, use our chatbot, or communicate with us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Course of interest</li>
                <li>Education background, if voluntarily shared</li>
                <li>Message or enquiry details</li>
                <li>Location or city, if voluntarily shared</li>
                <li>Website usage data such as browser type, device type, pages visited, and basic analytics data</li>
              </ul>
              <p>We do not intentionally collect unnecessary sensitive personal information through our website.</p>

              <h2 className="text-2xl mt-12 mb-6">3. How We Use Your Information</h2>
              <p>We may use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your course enquiry</li>
                <li>Provide admission guidance</li>
                <li>Share course details, batch updates, and contact information</li>
                <li>Improve our website and student support</li>
                <li>Communicate through phone, WhatsApp, SMS, or email</li>
                <li>Maintain internal enquiry records</li>
                <li>Prevent misuse, spam, or website abuse</li>
                <li>Comply with legal obligations where required</li>
              </ul>

              <h2 className="text-2xl mt-12 mb-6">4. Consent</h2>
              <p>By submitting your details through our website, contact form, chatbot, WhatsApp, phone, or email, you consent to Edusource HRD Centre using your information for enquiry handling, admission support, and related communication.</p>
              <p>You may request that we stop contacting you by informing us directly.</p>

              <h2 className="text-2xl mt-12 mb-6">5. Cookies and Analytics</h2>
              <p>Our website may use cookies or analytics tools to understand website performance, visitor behaviour, and page usage.</p>
              <p>Cookies may help us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Improve website speed and user experience</li>
                <li>Understand which pages are useful</li>
                <li>Analyse traffic sources</li>
                <li>Improve marketing and content quality</li>
              </ul>
              <p>You can disable cookies through your browser settings.</p>

              <h2 className="text-2xl mt-12 mb-6">6. AI Chatbot and EduMitra</h2>
              <p>If our website includes an AI chatbot or FAQ assistant such as <strong>EduMitra</strong>, it may process your questions to provide course-related answers.</p>
              <p>Please do not share sensitive personal information, passwords, financial details, private documents, or confidential information through the chatbot.</p>
              <p>EduMitra is intended for general guidance only. For the latest and most accurate admission, fee, certificate, and batch details, contact Edusource HRD Centre directly.</p>

              <h2 className="text-2xl mt-12 mb-6">7. Information Sharing</h2>
              <p>We do not sell your personal information.</p>
              <p>We may share limited information only when necessary with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website hosting providers</li>
                <li>Analytics or technical service providers</li>
                <li>Communication tools used for enquiry response</li>
                <li>Internal admission/support team</li>
                <li>Authorities if legally required</li>
              </ul>

              <h2 className="text-2xl mt-12 mb-6">8. Data Security</h2>
              <p>We take reasonable steps to protect your information from unauthorised access, misuse, loss, or alteration.</p>
              <p>However, no website, internet transmission, or digital storage system can be guaranteed to be completely secure.</p>

              <h2 className="text-2xl mt-12 mb-6">9. Data Retention</h2>
              <p>We may retain enquiry and communication records for as long as necessary to provide support, manage admissions, maintain records, or comply with legal and operational requirements.</p>
              <p>If you want your information removed from our enquiry records, you may contact us.</p>

              <h2 className="text-2xl mt-12 mb-6">10. Your Rights</h2>
              <p>You may contact us to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw communication consent</li>
                <li>Ask questions about how your data is used</li>
              </ul>
              <p>To make a request, contact:</p>
              <p>
                Email: hrdcentrekollam@gmail.com<br />
                Phone: +91 96334 92021 / +91 98959 53159
              </p>

              <h2 className="text-2xl mt-12 mb-6">11. Children’s Privacy</h2>
              <p>Our courses and services may be viewed by students and parents. If a minor submits information, we recommend that a parent or guardian be involved in the admission or enquiry process.</p>

              <h2 className="text-2xl mt-12 mb-6">12. External Links</h2>
              <p>Our website may contain links to third-party websites or platforms. We are not responsible for the privacy practices, content, or security of external websites.</p>

              <h2 className="text-2xl mt-12 mb-6">13. Updates to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with the latest update date.</p>

              <h2 className="text-2xl mt-12 mb-6">14. Contact Us</h2>
              <p>For privacy-related questions, contact:</p>
              <p>
                <strong>Edusource HRD Centre</strong><br />
                Madannada, Kollam, Kerala, India<br />
                Website: <a href="https://edusourceacademy.com/" className="text-blue-600 hover:underline">https://edusourceacademy.com/</a><br />
                Email: hrdcentrekollam@gmail.com<br />
                Phone: +91 96334 92021 / +91 98959 53159
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
