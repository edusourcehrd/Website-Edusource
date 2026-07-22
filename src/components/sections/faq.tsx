"use client";

import React, { useState } from "react";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/scroll-reveal";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#E2E8F0] last:border-0">
      <button
        className="flex w-full items-center justify-between py-6 text-left transition-all hover:bg-[#F8FAFC] px-4 rounded-xl"
        onClick={onClick}
      >
        <span className={cn(
          "text-[16px] sm:text-[18px] font-semibold transition-colors",
          isOpen ? "text-[#0056E0]" : "text-black"
        )}>
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#94A3B8] transition-transform duration-300",
            isOpen && "rotate-180 text-[#0056E0]"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out px-4",
          isOpen ? "max-h-[300px] pb-6 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#4A5568]">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What courses do you offer?",
      answer: "We offer government-approved diploma programs in Hospital Administration, HR Management, Logistics & Shipping, Medical Coding, Medical Transcription, and German Language Training.",
    },
    {
      question: "Are the certificates government-recognised?",
      answer: "Yes. Our certifications are backed by recognised institutions including MSME, Kerala State Rutronix, and National Skill Development Corporation (NSDC) pathways.",
    },
    {
      question: "Do you offer online classes?",
      answer: "Yes, we provide flexible offline and online learning options for selected programs to suit the schedules of working professionals and students.",
    },
    {
      question: "Where is Edusource Academy located?",
      answer: "Our centre is located at Minerva Complex, Madannada, Kollam, Kerala. We are a trusted name in skill development in the Kollam region.",
    },
    {
      question: "How can I apply for admission?",
      answer: "You can apply through our online admission form, visit our centre in Kollam, or call our admissions counsellor at +91 96334 92021 for guidance.",
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#F8FAFC] overflow-hidden" id="contact">
      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* Header Section */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-[36px] md:text-[48px] font-bold text-black mb-4">Common Questions</h2>
            <p className="text-[18px] text-[#4A5568] max-w-xl mx-auto">
              Find quick answers about our programs, certification process, and student support services.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion Container */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E2E8F0] p-4 md:p-6 mb-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <p className="text-[18px] text-[#4A5568]">
              Still have questions? Reach out to our advisors at{" "}
              <a 
                href="mailto:hrdcentrekollam@gmail.com" 
                className="text-black font-semibold hover:underline transition-all"
              >
                hrdcentrekollam@gmail.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
