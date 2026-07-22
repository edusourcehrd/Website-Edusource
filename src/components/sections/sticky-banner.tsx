"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function StickyBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const marqueeText = "Government-approved skill training at EduSource Academy, Kollam. Mastering industry-ready skills with trusted education.  ";

  return (
    <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[850px] px-6">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="liquid-glass flex items-center justify-between rounded-full border border-white/50 p-2 pl-6 pr-2 shadow-2xl backdrop-blur-2xl overflow-hidden"
        style={{
          background: "linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 245, 255, 0.85) 100%)",
        }}
      >
        <div className="flex items-center gap-4 flex-1 overflow-hidden">
          {/* Status Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            <span className="text-sm font-black uppercase tracking-widest text-[#0056E0] whitespace-nowrap">Admissions Open</span>
          </div>

          <div className="h-4 w-px bg-slate-200 shrink-0" />

          {/* Smooth Marquee Area */}
          <div className="flex-1 relative overflow-hidden h-6 flex items-center group">
            {/* Fade Gradients for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex whitespace-nowrap gap-4"
              initial={{ x: 0 }}
              animate={isHovered ? {} : { x: "-50%" }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="text-sm font-medium text-slate-600">
                {marqueeText}
              </span>
              <span className="text-sm font-medium text-slate-600">
                {marqueeText}
              </span>
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="/admission" 
          className="bg-[#0056E0] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap ml-4 shrink-0"
        >
          Apply Now
        </a>
      </motion.div>
    </div>
  );
}
