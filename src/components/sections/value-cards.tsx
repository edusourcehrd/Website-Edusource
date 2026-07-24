"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/scroll-reveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Shield, Users, Monitor, MessageCircle, Sparkles, Award, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * EDITABLE FEATURE CARDS DATA
 */
const carouselFeatures = [
  {
    id: 1,
    title: "Government-Approved Certificates",
    description: "Study job-oriented practical courses with recognised certificates, updated modules, and skill-focused training designed to enhance employability.",
    icon: <Shield className="w-8 h-8 text-white" />,
    bgImage: "/hrdteam.webp?q=80&w=2070&auto=format&fit=crop",
    basis: "basis-full md:basis-[80%] lg:basis-[65%]",
    hasAvatar: true
  },
  {
    id: 2,
    title: "Experienced Trainers",
    description: "Learn from trainers with 2+ years of expertise across healthcare, HR, logistics, and medical documentation.",
    icon: <Users className="w-8 h-8 text-blue-400" />,
    bgImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    basis: "basis-full md:basis-[60%] lg:basis-[45%]",
    hasSpin: true
  },
  {
    id: 3,
    title: "Flexible Learning",
    description: "Choose affordable learning options with updated course modules and flexible offline and online classes designed for you.",
    icon: <Monitor className="w-8 h-8 text-white" />,
    bgImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop",
    basis: "basis-full md:basis-[60%] lg:basis-[45%]",
    hasModules: true
  },
  {
    id: 4,
    title: "Expert Mentorship",
    description: "Get mentor guidance, clear batch schedules, learning support, and admissions help to choose the right program with confidence.",
    icon: <MessageCircle className="w-8 h-8 text-white" />,
    bgImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
    basis: "basis-full md:basis-[80%] lg:basis-[65%]",
    hasChat: true
  }
];

export default function ValueCards() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  // Constants for timing
  const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-scroll logic
  useEffect(() => {
    if (!api || isPaused) return;

    const intervalId = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Infinite loop back to start
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [api, isPaused]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section id="why-choose" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-white">
      {/* Background Radial Glow Effect with Parallax */}
      <motion.div 
        className="absolute inset-x-0 bottom-[-20%] h-[120%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #E0E7FF 0%, #FFFFFF 100%)',
          scale: glowScale,
          opacity: glowOpacity
        }}
      />

      <div className="container relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
            <div className="text-left max-w-3xl">
              <motion.div 
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100"
              >
                <Sparkles className="w-4 h-4" />
                Why Edusource Academy
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.1]">
                Excellence in <span className="text-blue-600">Skill Development</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
                Premium education crafted for your success with expert mentorship, flexible learning, and recognized certifications.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Feature Cards Carousel */}
        <ScrollReveal>
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-6 py-6">
                
                {carouselFeatures.map((feature, idx) => (
                  <CarouselItem key={feature.id} className={`pl-6 ${feature.basis}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -10 }}
                      className="group relative overflow-hidden rounded-[24px] sm:rounded-[40px] flex flex-col md:flex-row gap-8 md:gap-10 items-center h-full min-h-[480px] md:min-h-[500px] hover:shadow-[0_32px_96px_rgba(0,86,224,0.25)] transition-all duration-700 cursor-pointer border border-white/10"
                    >
                      
                      {/* Background Image Layer */}
                      <div className="absolute inset-0 z-0">
                        <Image 
                          src={feature.bgImage}
                          alt={feature.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Dark Navy Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#0F172A]/80 to-[#0F172A]/40" />
                        <div className="absolute inset-0 bg-[#0F172A]/20 group-hover:bg-transparent transition-colors duration-700" />
                      </div>

                      <div className="flex-1 z-10 w-full p-8 sm:p-10 md:p-14">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-white/20 shadow-xl"
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-[450px] leading-relaxed drop-shadow-sm">
                          {feature.description}
                        </p>
                      </div>

                      <div className="flex-1 w-full relative z-10 flex justify-center lg:justify-end p-8 sm:p-10 md:p-14 md:pl-0">
                        
                        {/* Custom Visual Blocks */}
                        {feature.hasAvatar && (
                          <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square border border-white/10 rounded-[24px] sm:rounded-[40px] p-5 sm:p-6 bg-white/5 backdrop-blur-xl overflow-hidden group-hover:border-white/25 transition-all duration-700 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="flex items-center gap-3 sm:gap-4 bg-[#0F172A]/90 rounded-full px-4 sm:px-5 py-3 sm:py-4 w-fit transform translate-y-4 sm:translate-y-8 translate-x-4 sm:translate-x-8 shadow-2xl border border-white/15 group-hover:-translate-y-4 group-hover:translate-x-4 transition-all duration-700 relative z-20 backdrop-blur-md">
                                <Image
                                  src="/out.webp"
                                  alt="Student avatar"
                                  width={40}
                                  height={40}
                                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/30"
                                />

                                <span className="text-white text-[13px] sm:text-[15px] font-black uppercase tracking-wider">I want to enroll!</span>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px]" />
                          </div>
                        )}

                        {feature.hasSpin && (
                          <div className="mt-auto relative w-full aspect-[2/1] flex items-center justify-center">
                            <div className="absolute w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] border-2 border-blue-500/20 rounded-full flex items-center justify-center animate-[spin_12s_linear_infinite] group-hover:border-blue-500/40 transition-colors duration-700">
                              <div className="w-[160px] h-[160px] border-2 border-blue-400/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite_reverse]">
                                <div className="w-[100px] h-[100px] border-2 border-blue-300/50 rounded-full flex items-center justify-center bg-blue-600/10 backdrop-blur-xl group-hover:bg-blue-600/20 transition-all duration-700">
                                  <Award className="w-10 h-10 text-blue-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {feature.hasModules && (
                          <div className="mt-auto relative w-full flex items-center justify-center">
                            <div className="bg-white/5 border border-white/15 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 w-full group-hover:bg-white/10 transition-all duration-700 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                              <div className="flex items-center justify-between mb-4 md:mb-6">
                                <div className="flex gap-2.5">
                                  <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]" />
                                  <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]" />
                                  <div className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
                                </div>
                              </div>
                              <div className="h-2.5 sm:h-3.5 w-3/4 bg-white/20 rounded-full mb-4 sm:mb-5" />
                              <div className="h-2.5 sm:h-3.5 w-1/2 bg-white/20 rounded-full mb-6 sm:mb-8" />
                              <div className="h-12 sm:h-14 w-full bg-blue-600 rounded-full flex items-center justify-center font-black text-white text-[13px] sm:text-[15px] uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                                Explore Modules
                              </div>
                            </div>
                          </div>
                        )}

                        {feature.hasChat && (
                          <div className="flex-1 w-full max-w-[300px] sm:max-w-[360px] bg-[#efeae2] rounded-[20px] shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-700 relative z-10 border border-slate-300">
                            {/* WhatsApp Pattern Overlay */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://user-images.githubusercontent.com/1507452/94031210-c0352900-fdb6-11ea-8007-98782a2d744b.png')] bg-repeat" />
                            
                            {/* Chat Header */}
                            <div className="bg-[#075e54] p-3 flex items-center gap-2 relative z-10">
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-bold text-[12px] leading-tight">Expert Mentorship</p>
                                <p className="text-white/70 text-[10px]">Online</p>
                              </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="p-4 space-y-3 relative z-10">
                              <div className="flex justify-end transform group-hover:-translate-y-1 transition-transform duration-700">
                                <div className="bg-[#d9fdd3] text-[#111b21] rounded-[10px] rounded-tr-none px-3 py-2 text-[12px] font-medium shadow-sm relative">
                                  How can you help?
                                  <div className="flex items-center justify-end gap-1 mt-1">
                                    <span className="text-[9px] text-[#667781]">10:05 AM</span>
                                    <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-start transform group-hover:translate-y-1 transition-transform duration-700 delay-100">
                                <div className="bg-white text-[#111b21] rounded-[10px] rounded-tl-none px-3 py-2 text-[12px] font-medium shadow-sm relative border border-slate-100">
                                  We guide your success!
                                  <div className="flex items-center justify-end mt-1">
                                    <span className="text-[9px] text-[#667781]">10:06 AM</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Chat Footer Mock */}
                            <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 relative z-10 border-t border-slate-200">
                              <div className="flex-1 bg-white rounded-full h-7 flex items-center px-3">
                                <span className="text-slate-400 text-[10px]">Type a message</span>
                              </div>
                              <div className="w-7 h-7 rounded-full bg-[#075e54] flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}

              </CarouselContent>
              
              <div className="flex flex-col sm:flex-row items-center justify-center mt-16 gap-8">
                {/* Pagination Dots */}
                <div className="flex items-center gap-3 order-2 sm:order-1">
                  {Array.from({ length: count }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={cn(
                        "h-2.5 rounded-full transition-all duration-500",
                        current === index 
                          ? "w-8 bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]" 
                          : "w-2.5 bg-slate-200 hover:bg-slate-300"
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-6 order-1 sm:order-2">
                  <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-16 w-16 rounded-full border-2 border-slate-200 text-slate-700 hover:bg-white hover:text-blue-600 hover:border-blue-600 bg-white hover:scale-110 transition-all shadow-xl" />
                  <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-16 w-16 rounded-full border-2 border-slate-200 text-slate-700 hover:bg-white hover:text-blue-600 hover:border-blue-600 bg-white hover:scale-110 transition-all shadow-xl" />
                </div>
              </div>
            </Carousel>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
