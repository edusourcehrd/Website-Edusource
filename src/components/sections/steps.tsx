"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/scroll-reveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  ExternalLink,
  ChevronRight,
  Verified,
  Building2,
  BookmarkCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StepsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);

  return (
    <section id="certification" ref={sectionRef} className="relative w-full py-24 md:py-32 px-6 bg-slate-50/50 overflow-hidden">
      {/* Background radial glow with Parallax */}
      <motion.div 
        style={{ scale: isMobile ? 1 : glowScale, opacity: isMobile ? 0.3 : glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] pointer-events-none radial-glow z-0"
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-24">
            <motion.div 
              whileHover={isMobile ? {} : { scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-500/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase">
                Official Recognition & Trust
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#0f172a] mb-6 tracking-tight">
              Certification That <span className="text-blue-600">Adds Credibility</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              Our programs are backed by recognized government institutions to ensure high-quality standards and professional industry alignment.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Grid - REDESIGNED PREMIUM CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* MSME Certification Card */}
          <ScrollReveal delay={0.1}>
            <motion.div 
              whileHover={isMobile ? {} : { y: -10 }}
              className="group relative h-full bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500"
            >
              {/* Premium Background Elements */}
              {!isMobile && (
                <>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors duration-700" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-40 -ml-16 -mb-16" />
                </>
              )}
              
              <div className="relative z-10">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-10">
                  <div className="px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full border border-blue-100 tracking-wider flex items-center gap-2">
                    <Building2 size={12} />
                    GOVERNMENT RECOGNISED
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 text-[10px] font-black tracking-wider">
                    <Verified size={12} />
                    VERIFIED
                  </div>
                </div>

                {/* Card Title & Content */}
                <h3 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-6">MSME Certification</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-10">
                  Formally recognized skill development training backed by the MSME Technology Development Centre, Government of India.
                </p>

                {/* Visual Recognition Panel */}
                <div className="relative mb-12">
                  {!isMobile && <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/5 to-emerald-600/5 rounded-[32px] blur-xl" />}
                  <div className="relative bg-[#0f172a] rounded-[32px] p-8 sm:p-10 flex flex-col items-center text-center gap-6 shadow-3xl border border-white/10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
                    
                    <div className={`w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 ${!isMobile ? 'group-hover:scale-110 transition-transform duration-500' : ''}`}>
                      <Award className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-white text-xl font-bold block leading-tight">Government of India</span>
                      <span className="text-blue-400 text-sm font-black uppercase tracking-[0.2em]">Certified Program</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 w-full flex items-center justify-center gap-3">
                      <FileCheck className="text-emerald-400 w-5 h-5" />
                      <span className="text-white/90 text-sm font-bold">Skill Development Certification</span>
                    </div>

                    <div className={`absolute -bottom-6 -right-6 w-20 h-20 bg-white rounded-full p-4 shadow-2xl flex items-center justify-center rotate-12 ${!isMobile ? 'group-hover:rotate-0 transition-transform duration-500' : ''}`}>
                      <Image 
                        src="/edusource-mini-icon.png"
                        alt="Official Seal"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Highlight Chips */}
                <div className="flex flex-wrap gap-3">
                  {['Formal Recognition', 'Skill Development', 'Career Credibility'].map((chip) => (
                    <span key={chip} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-600 uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-colors duration-300">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* State & National Recognition Card */}
          <ScrollReveal delay={0.2}>
            <motion.div 
              whileHover={isMobile ? {} : { y: -10 }}
              className="group relative h-full bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500"
            >
              {/* Premium Background Elements */}
              {!isMobile && (
                <>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:bg-emerald-100 transition-colors duration-700" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-40 -ml-16 -mb-16" />
                </>
              )}

              <div className="relative z-10">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-10">
                  <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-100 tracking-wider flex items-center gap-2">
                    <BookmarkCheck size={12} />
                    INDUSTRY RECOGNISED
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 text-[10px] font-black tracking-wider">
                    <Verified size={12} />
                    VERIFIED
                  </div>
                </div>

                {/* Card Title & Content */}
                <h3 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-6">State & National Recognition</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-10">
                  Multiple recognition pathways through leading bodies ensuring your credentials carry weight across state and national levels.
                </p>

                {/* Recognition List Panel */}
                <div className="relative mb-12">
                  {!isMobile && <div className="absolute -inset-4 bg-gradient-to-br from-emerald-600/5 to-blue-600/5 rounded-[32px] blur-xl" />}
                  <div className="relative bg-slate-50/80 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-xl space-y-4 overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] font-black text-blue-600 uppercase tracking-[0.15em]">Valid Credentials</span>
                      <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    
                    {[
                      { name: 'Rutronics Certification', label: 'Kerala Govt Partner' },
                      { name: 'National Youth Programme (NYP)', label: 'Employability Certified' },
                      { name: 'Government of Kerala Recognized', label: 'State Standards' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between group/item hover:border-emerald-200 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-sm font-bold text-slate-700">{item.name}</span>
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">
                          {item.label}
                        </span>
                      </div>
                    ))}
                    
                    {!isMobile && <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />}
                  </div>
                </div>

                {/* Bottom Highlight Chips */}
                <div className="flex flex-wrap gap-3">
                  {['National Relevance', 'Employability Focused', 'Verified Credentials'].map((chip) => (
                    <span key={chip} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-600 uppercase tracking-wider group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-100 transition-colors duration-300">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

        </div>

        {/* NSDC Bottom Bar - OPTIMIZED FOR MAX CREDIBILITY */}
        <ScrollReveal delay={0.3}>
          <div className="relative group p-10 md:p-16 rounded-[40px] bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white shadow-3xl overflow-hidden border border-white/5">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
            {!isMobile && (
              <>
                <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[120px] opacity-10" />
              </>
            )}
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 sm:animate-pulse" />
                  Global Industry Standards
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-white">NSDC-Aligned Training & <br className="hidden md:block" /> Certification Pathway</h3>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
                  Enhance your global employability with training standards that meet international industry requirements and national skill qualification frameworks.
                </p>
              </div>
              
              <div className="shrink-0 w-full lg:w-auto">
                <motion.a 
                  whileHover={isMobile ? {} : { scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/919633492021" 
                  className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-blue-700 shadow-2xl shadow-blue-600/30 transition-all gap-3 border border-white/10"
                >
                  Apply with Confidence
                  <ChevronRight className="w-6 h-6" />
                </motion.a>
                <p className="text-[10px] text-slate-500 text-center mt-4 uppercase font-black tracking-widest opacity-60">
                  Admissions Open for 2026 Batches
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
