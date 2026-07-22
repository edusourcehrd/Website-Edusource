"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/scroll-reveal';
import { MessageSquare, Zap, TrendingUp, Sparkles, User } from 'lucide-react';

export default function TrustStats() {
  const metaBadgeIcon = "/ICON-IMG.webp";
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

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <section 
      id="support" 
      ref={sectionRef}
      className="w-full bg-slate-50 py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />
      
      {/* Subtle depth glow */}
      <motion.div 
        style={{ scale: isMobile ? 1 : glowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-20 text-center">
            <motion.div 
              whileHover={isMobile ? {} : { scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-blue-600 font-bold text-xs uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Student-First Approach
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 tracking-tight">Support That <span className="text-blue-600">Drives Results</span></h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feature Card */}
          <ScrollReveal>
            <motion.div 
              whileHover={isMobile ? {} : { y: -8, scale: 1.01 }}
              className="lg:col-span-1 h-full flex flex-col justify-between p-8 sm:p-10 rounded-[24px] sm:rounded-[40px] bg-white border border-slate-100 shadow-soft hover:shadow-2xl transition-all duration-500 relative overflow-hidden group min-h-[400px]"
            >
              <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-colors" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mb-6 sm:mb-8 shadow-md rounded-2xl overflow-hidden">
                  <Image 
                    src="/girl.jpeg" 
                    alt="Student Support" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-4">Student Support</h3>
                <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                  Edusource Academy supports students with mentor-led guidance, structured learning, and a smooth admissions experience.
                </p>
              </div>

              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-50 relative z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex -space-x-2 sm:-space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm">
                        <User className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">500+ Students Mentored</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Stats Grid Right */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Mentor Guidance",
                desc: "Clear learning roadmap, batch guidance, and personal progress support.",
                color: "bg-amber-50 text-amber-600"
              },
              {
                icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Admissions Help",
                desc: "Quick help for programme details, schedules, and enrolment process.",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Career Focus",
                desc: "Practical modules with guidance that builds real industry confidence.",
                color: "bg-emerald-50 text-emerald-600"
              },
              {
                icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Smooth Experience",
                desc: "Every step from enquiry to certification is handled with professionalism.",
                color: "bg-violet-50 text-violet-600"
              }
            ].map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={isMobile ? {} : { y: -8, scale: 1.02 }}
                  className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-white border border-slate-100 shadow-soft hover:shadow-xl transition-all duration-300 h-full min-h-[220px] flex flex-col justify-center"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4 sm:mb-6 shadow-sm`}>
                    {stat.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#0f172a] mb-2 sm:mb-3">{stat.title}</h4>
                  <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{stat.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
