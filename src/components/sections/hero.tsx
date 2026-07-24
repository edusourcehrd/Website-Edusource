"use client";

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { GraduationCap, BookOpen, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for cinematic depth - simplified on mobile
  const yBackground1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 50 : 150]);
  const yBackground2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -150]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 20 : 60]); 
  const scaleHero = useTransform(scrollYProgress, [0, 0.4], [1, 0.98]);

  // Animation variants for Awwwards-style staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.1,
        delayChildren: isMobile ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const visualVariants: Variants = {
    hidden: { opacity: isMobile ? 1 : 0, x: isMobile ? 0 : 40, scale: isMobile ? 1 : 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.4 : 1.4,
        ease: [0.22, 1, 0.36, 1],
        delay: isMobile ? 0 : 0.4,
      },
    },
  };

  return (
    <section id="hero" ref={containerRef} className="relative px-3 sm:px-6 pt-28 sm:pt-32 md:pt-36 lg:pt-20 pb-16 sm:pb-0 sm:overflow-hidden bg-white">
      {/* Primary Blue Hero Container */}
      <motion.div 
        style={{ scale: isMobile ? 1 : scaleHero }}
        className="max-w-[1440px] mx-auto bg-gradient-to-br from-[#0056E0] via-[#0047C1] to-[#0037A3] rounded-[24px] sm:rounded-[40px] md:rounded-[60px] relative overflow-hidden min-h-[580px] sm:min-h-[750px] md:min-h-[800px] lg:min-h-[700px] xl:min-h-[780px] flex flex-col items-center justify-center shadow-[0_20px_60px_rgba(0,86,224,0.2)] sm:shadow-[0_32px_96px_rgba(0,86,224,0.25)] mt-4 sm:mt-6 md:mt-8 lg:mt-0 mobile-optimized"
      >
        
        {/* Background Layers - Lowest Z-Index */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <motion.div 
              style={{ y: yBackground1 }}
              animate={isMobile ? { opacity: 0.1 } : { 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-white/20 blur-[40px] sm:blur-[120px] rounded-full"
            />
            <motion.div 
              style={{ y: yBackground2 }}
              animate={isMobile ? { opacity: 0.05 } : { 
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#48BB78]/20 blur-[50px] sm:blur-[100px] rounded-full"
            />
          </div>

          {/* Subtle Grid Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] sm:opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Content Layout - Fixed Visual Size & Grounded Positioning */}
        <div className="container relative z-10 w-full h-full flex flex-col justify-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-8 px-6 sm:px-12 lg:px-16 xl:px-20"
          >
            
            {/* Text Content - Vertically Centered */}
            <div className="w-full lg:w-[45%] text-center lg:text-left z-20 lg:self-center lg:pb-16">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 sm:backdrop-blur-md border border-white/20 mb-6 sm:mb-8"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#48BB78] sm:animate-pulse" />
                <span className="text-white/90 text-[10px] sm:text-xs font-black tracking-widest uppercase">Government Recognised Institute</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] sm:leading-[1.1] tracking-tight mb-6 sm:mb-8"
              >
                Your Career Starts with <span className="text-white relative inline-block">Edusource<motion.span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-1.5 bg-[#48BB78] rounded-full" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: isMobile ? 0.3 : 1.2, duration: 0.8 }} /></span> HRD Centre
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-white/80 text-sm sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-12"
              >
                Master industry-ready skills with Kollam&apos;s trusted education centre. Offering government-approved diplomas in Hospital Admin, HR, Logistics, and Medical Transcription.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 items-center"
              >
                <motion.a 
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/admission" 
                  className="group relative w-full sm:w-auto flex items-center justify-center bg-white text-[#0056E0] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg shadow-xl sm:shadow-2xl transition-all duration-300"
                >
                  Start Admission
                  {!isMobile && <motion.span className="absolute -inset-1 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />}
                </motion.a>

                <Link 
                  href="/courses"
                  className="group w-full sm:w-auto flex items-center justify-center px-8 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg text-white border-2 border-white/20 hover:bg-white/10 transition-all sm:backdrop-blur-sm gap-2"
                >
                  View Programs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Hero Visual - Maximized & Grounded to Bottom */}
            <motion.div
              variants={visualVariants}
              style={{ y: yVisual }}
              className="w-full lg:w-[55%] relative flex justify-center lg:justify-end items-end h-full"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[760px] xl:max-w-[850px] flex items-end justify-center">
                {/* Floating Elements - Hidden on very small screens to reduce lag */}
                {!isMobile && (
                  <>
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-12 left-0 sm:-left-4 z-30 bg-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl hidden sm:block"
                    >
                      <div className="bg-[#48BB78] p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                        <ShieldCheck className="text-white w-5 h-5 sm:w-8 sm:h-8" />
                      </div>
                    </motion.div>

                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute bottom-20 right-0 sm:-right-4 z-30 bg-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl hidden sm:block"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-[#f1c40f] p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                          <Star className="text-white w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />
                        </div>
                        <span className="text-white text-xs sm:text-base font-black tracking-widest uppercase">Industry Leader</span>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Hand/Mobile Visual - Grounded on Bottom */}
                <motion.div
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  className="relative z-20 w-full flex items-end justify-center pt-8"
                >
                  {/* Desktop/Tablet Media */}
                  <Image
                    src="/hero2.webp"
                    alt="EduSource Hero Animation"
                    width={780}
                    height={600}
                    priority
                    className="hidden md:block w-full max-w-[620px] lg:max-w-[720px] xl:max-w-[780px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_80px_rgba(0,0,0,0.2)]"
                    draggable={false}
                  />
                  {/* Mobile Media */}
                  <Image
                    src="/hero.webp"
                    alt="EduSource Mobile Hero Animation"
                    width={340}
                    height={400}
                    priority
                    className="block md:hidden w-full max-w-[320px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
                    draggable={false}
                  />
                </motion.div>
                
                {/* Grounded Depth Glow - Reduced opacity on mobile */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#0056E0]/40 to-transparent rounded-full blur-[100px] -z-10 scale-125 ${isMobile ? 'opacity-40' : 'opacity-70'}`} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust Stats Bar */}
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto py-10 sm:py-12 md:py-16 px-4 sm:px-6 relative z-20"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
          {[
            { 
              icon: <ShieldCheck className="text-white w-4 h-4 sm:w-6 sm:h-6" />, 
              title: "Govt. Approved", 
              desc: "Official certification for credibility.",
              color: "bg-[#0056E0]" 
            },
            { 
              icon: <BookOpen className="text-white w-4 h-4 sm:w-6 sm:h-6" />, 
              title: "6+ Programs", 
              desc: "Healthcare, HR, and Logistics.",
              color: "bg-[#48BB78]" 
            },
            { 
              icon: <GraduationCap className="text-white w-4 h-4 sm:w-6 sm:h-6" />, 
              title: "Mentorship", 
              desc: "Personalised career support.",
              color: "bg-[#0f172a]" 
            },
            { 
              icon: <Star className="text-white w-4 h-4 sm:w-6 sm:h-6 fill-current" />, 
              title: "Flexible", 
              desc: "Online and offline classes.",
              color: "bg-[#f1c40f]" 
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={isMobile ? {} : { y: -8, scale: 1.02 }}
              className="group p-5 sm:p-6 md:p-8 rounded-3xl sm:rounded-[32px] bg-white border border-slate-100 shadow-lg sm:shadow-soft hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${item.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h4 className="text-sm sm:text-base md:text-xl font-bold text-[#0f172a] mb-1.5 sm:mb-3">{item.title}</h4>
              <p className="text-slate-500 text-[11px] sm:text-xs md:text-sm leading-relaxed line-clamp-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
