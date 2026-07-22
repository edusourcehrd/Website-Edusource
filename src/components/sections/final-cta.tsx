"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/scroll-reveal';
import { ArrowRight, Sparkles } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section 
      className="w-full py-24 md:py-32 px-4 sm:px-6 flex flex-col items-center justify-center bg-white relative overflow-hidden"
      id="final-cta"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-50 rounded-full blur-[60px] sm:blur-[100px] opacity-60" />
      </div>

      <div className="max-w-5xl w-full flex flex-col items-center text-center relative z-10">
        <ScrollReveal>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-blue-50 text-blue-600 rounded-full border border-blue-100 font-bold text-xs uppercase tracking-widest shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Join the Academy
          </motion.div>
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-[#0f172a] mb-8"
          >
            Build Your Future with <br /> <span className="text-blue-600">Edusource HRD Centre</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p 
            className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-12 leading-relaxed"
          >
            Start your journey toward a successful career with government-approved, skill-based training in Kollam. Admissions are now open!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.a 
              href="/admission" 
              className="group relative inline-flex items-center justify-center bg-[#0056E0] text-white font-bold text-xl px-12 py-6 rounded-full transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Apply for Admission
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.a>
            <a 
              href="tel:+919895953159"
              className="px-10 py-6 rounded-full font-bold text-xl text-[#0f172a] border-2 border-slate-100 hover:bg-slate-50 transition-all"
            >
              Call Admissions
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTA;
