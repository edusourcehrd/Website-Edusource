"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/scroll-reveal';
import { X } from 'lucide-react';

interface PartnerLogo {
  name: string;
  src: string;
  description: string;
  label?: string;
}

/**
 * LOGO DATA
 * 1. File array location: src/components/sections/logo-slideshow.tsx
 * 3. Edit logo descriptions here in this array.
 */
const partnerLogos: PartnerLogo[] = [
  { 
    name: 'Kerala Computer Saksharatha Mission', 
    src: '/logos/kcsm.png',
    description: "Kerala Computer Saksharatha Mission is an IT education and computer training organisation focused on skill-based digital learning and training support.",
    label: "IT Education & Training"
  },
  { 
    name: 'National Youth Programme', 
    src: '/logos/Youth.png',
    description: "National Youth Programme is connected with youth employability and vocational skill training pathways.",
    label: "Youth Skill Development"
  },
  { 
    name: 'MyGov', 
    src: '/logos/my gov.png',
    description: "MyGov is the Government of India’s citizen engagement platform for digital participation, public awareness, and governance initiatives.",
    label: "Government Citizen Engagement Platform"
  },
  { 
    name: 'ISO 9001:2015', 
    src: '/logos/iso.png',
    description: "ISO 9001:2015 is an international quality management standard used to show process quality, consistency, and institutional credibility.",
    label: "Quality Management Standard"
  },
  { 
    name: 'Skill India', 
    src: '/logos/sill inida.png',
    description: "Skill India is a Government of India initiative focused on improving practical skills, employability, and workforce development.",
    label: "Skill Development Initiative"
  },
  { 
    name: 'National Skill Development Corporation', 
    src: '/logos/nsdc.png',
    description: "National Skill Development Corporation supports India’s skill development ecosystem through training partnerships, sector skill councils, and employability-focused initiatives.",
    label: "Skill Development Ecosystem"
  },
  { 
    name: 'Digital India', 
    src: '/logos/digital india.png',
    description: "Digital India is a Government of India programme focused on digital infrastructure, digital services, and digital empowerment.",
    label: "Digital Empowerment Initiative"
  },
  { 
    name: 'Kerala State RUTRONIX', 
    src: '/logos/rutronix.png',
    description: "Kerala State RUTRONIX was set up by the Government of Kerala and is associated with professional computer courses, software training, computer training, and authorised training centres.",
    label: "Kerala Skill & Computer Training"
  },
  { 
    name: 'Kerala State RUTRONIX FLARE', 
    src: '/logos/flare.png',
    description: "Kerala State RUTRONIX FLARE is connected with language training and skill development programmes under the Kerala State RUTRONIX ecosystem.",
    label: "Language & Skill Training"
  },
];

// Duplicate for infinite scroll effect
const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

const LogoSlideshow = () => {
  const [selectedLogo, setSelectedLogo] = useState<PartnerLogo | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
              Trusted Certification & Training Partners
            </h2>
            <div className="w-20 h-1 bg-blue-600/20 mx-auto rounded-full" />
          </div>
        </ScrollReveal>
      </div>

      <div className="relative">
        {/* Gradient Fades for Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Scrolling Container */}
        <motion.div 
          className="flex gap-8 md:gap-12 items-center"
          animate={{
            x: [0, -2400], 
          }}
          transition={{
            duration: isMobile ? 80 : 50, // Slow down on mobile
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={isMobile ? {} : { transition: { duration: 100 } }} 
        >
          {duplicatedLogos.map((logo, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0"
              onClick={() => setSelectedLogo(logo)}
            >
              {/* Card Container with Hover Scaling */}
              <motion.div 
                whileHover={isMobile ? {} : { 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group w-32 h-20 md:w-48 md:h-28 bg-white border border-slate-100 rounded-2xl p-4 md:p-6 flex items-center justify-center shadow-soft hover:border-blue-100 transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <motion.div
                    whileHover={isMobile ? {} : { scale: 1.04 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain transition-all duration-500"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Detail Popup Modal */}
      <AnimatePresence>
        {selectedLogo && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLogo(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[32px] p-8 md:p-10 shadow-2xl z-[101] border border-slate-100"
            >
              <button 
                onClick={() => setSelectedLogo(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-20 md:w-40 md:h-24 mb-8">
                  <Image
                    src={selectedLogo.src}
                    alt={selectedLogo.name}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {selectedLogo.label && (
                  <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
                    {selectedLogo.label}
                  </span>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {selectedLogo.name}
                </h3>
                
                <p className="text-slate-500 leading-relaxed text-lg">
                  {selectedLogo.description}
                </p>
                
                <button 
                  onClick={() => setSelectedLogo(null)}
                  className="mt-10 w-full py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LogoSlideshow;
