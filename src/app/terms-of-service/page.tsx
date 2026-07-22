import React from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ScrollReveal from '@/components/scroll-reveal';

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] mb-4">Terms of Service</h1>
            <p className="text-slate-500 font-bold mb-12">Edusource HRD Centre | Last Updated: 18 May 2026</p>
            
            <div className="prose prose-lg max-w-none prose-slate prose-headings:text-[#0f172a] prose-headings:font-bold prose-p:text-slate-600 prose-li:text-slate-600">
              <p>Welcome to the Edusource HRD Centre website. By accessing or using our website, submitting an enquiry, contacting us, using our chatbot, or using our services, you agree to the following Terms of Service.</p>

              <h2 className="text-2xl mt-12 mb-6">1. About Edusource HRD Centre</h2>
              <p>Edusource HRD Centre provides career-oriented training, skill development courses, student guidance, and admission support services.</p>
              <p>Our courses may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Diploma in Hospital Administration</li>
                <li>Logistics & Shipping Management</li>
                <li>German Language Training</li>
                <li>Medical Coding</li>
                <li>Medical Transcription</li>
                <li>Human Resource Management</li>
                <li>AI Integrated Digital Marketing</li>
                <li>Other skill-based or career-focused training programs</li>
              </ul>

              <h2 className="text-2xl mt-12 mb-6">2. Use of Website</h2>
              <p>You agree to use this website only for lawful and genuine purposes.</p>
              <p>You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Misuse the website</li>
                <li>Submit false information</li>
                <li>Attempt to hack, damage, or disrupt the website</li>
                <li>Copy website content without permission</li>
                <li>Use the website for spam, fraud, or illegal activities</li>
              </ul>

              <h2 className="text-2xl mt-12 mb-6">3. Course Information</h2>
              <p>We try to keep course information accurate and updated. However, course details may change from time to time.</p>
              <p>This may include changes in:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fees</li>
                <li>Duration</li>
                <li>Batch timing</li>
                <li>Syllabus</li>
                <li>Certificate details</li>
                <li>Learning mode</li>
                <li>Admission availability</li>
                <li>Course structure</li>
              </ul>
              <p>Students should contact Edusource HRD Centre directly for the latest confirmed details before admission.</p>

              <h2 className="text-2xl mt-12 mb-6">4. No Guaranteed Placement</h2>
              <p>Edusource HRD Centre may provide training guidance, mentorship, and career support where applicable.</p>
              <p>However, job placement is not guaranteed unless explicitly confirmed in writing by the institute through an official communication.</p>
              <p>Students should not treat website content, chatbot answers, marketing content, or verbal guidance as a guaranteed job promise.</p>

              <h2 className="text-2xl mt-12 mb-6">5. No Visa, Foreign Admission, or Job Guarantee</h2>
              <p>For German language training or abroad-related guidance, Edusource HRD Centre may provide language learning and general guidance.</p>
              <p>However, we do not guarantee:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Visa approval</li>
                <li>Foreign university admission</li>
                <li>Ausbildung admission</li>
                <li>Overseas job placement</li>
                <li>Embassy approval</li>
                <li>Immigration outcome</li>
              </ul>
              <p>Final decisions depend on external authorities, institutions, employers, and official requirements.</p>

              <h2 className="text-2xl mt-12 mb-6">6. Fees and Payments</h2>
              <p>Course fees may vary depending on the course, batch, duration, offers, and updates.</p>
              <p>Students must confirm fee details directly with Edusource HRD Centre before making any payment.</p>
              <p>Payment, refund, cancellation, or transfer rules may vary by course and batch. Students should request written confirmation of applicable fee and refund terms before admission.</p>

              <h2 className="text-2xl mt-12 mb-6">7. Certificates</h2>
              <p>Selected courses may include government-approved, recognised, affiliated, or skill-based certification pathways.</p>
              <p>Certificate details may vary depending on the course and applicable institution or program. Students must confirm the latest certificate details directly before joining.</p>

              <h2 className="text-2xl mt-12 mb-6">8. Website Content</h2>
              <p>All website content, including text, graphics, images, design, course descriptions, layout, and branding, belongs to Edusource HRD Centre or is used with permission.</p>
              <p>You may not copy, reproduce, modify, or reuse our website content for commercial purposes without written permission.</p>

              <h2 className="text-2xl mt-12 mb-6">9. AI Chatbot / EduMitra</h2>
              <p>If the website includes an AI chatbot or FAQ assistant such as EduMitra, it is provided for general guidance only.</p>
              <p>The chatbot may answer questions about courses, admission, certificates, and contact details. However, chatbot answers may not always reflect the latest updates.</p>
              <p>For final confirmation, contact Edusource HRD Centre directly.</p>
              <p>The chatbot must not be treated as legal, financial, career, visa, admission, or employment guarantee advice.</p>

              <h2 className="text-2xl mt-12 mb-6">10. Third-Party Services</h2>
              <p>Our website may use third-party services such as hosting providers, analytics tools, forms, maps, communication tools, or embedded media.</p>
              <p>We are not responsible for errors, downtime, policies, or actions of third-party services.</p>

              <h2 className="text-2xl mt-12 mb-6">11. Limitation of Liability</h2>
              <p>Edusource HRD Centre is not liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website downtime</li>
                <li>Technical errors</li>
                <li>Inaccurate third-party information</li>
                <li>User misunderstanding of course details</li>
                <li>Career outcome differences</li>
                <li>Admission rejection by third-party institutions</li>
                <li>Visa or foreign admission outcomes</li>
                <li>Losses caused by misuse of website content</li>
              </ul>
              <p>Users should verify important details directly with the institute.</p>

              <h2 className="text-2xl mt-12 mb-6">12. Student Responsibility</h2>
              <p>Students are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing accurate information</li>
                <li>Reading course details carefully</li>
                <li>Confirming fees, batch timing, and certificate details before admission</li>
                <li>Attending classes regularly</li>
                <li>Completing assignments or training requirements</li>
                <li>Following institute rules and guidelines</li>
              </ul>

              <h2 className="text-2xl mt-12 mb-6">13. Changes to Terms</h2>
              <p>We may update these Terms of Service from time to time. Updated terms will be posted on this page with the latest update date.</p>

              <h2 className="text-2xl mt-12 mb-6">14. Contact Us</h2>
              <p>For questions about these terms, contact:</p>
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
