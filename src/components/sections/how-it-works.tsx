"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/scroll-reveal';
import { motion } from 'framer-motion';
import { Target, Eye, Award } from 'lucide-react';

const features = [
  {
    id: 'about-edusource',
    badge: 'Kollam\'s Trusted Academy',
    title: 'Pioneering Skill Development',
    description: 'Edusource Academy is a trusted skill development centre located in Madannada, Kollam. We deliver practical, employment-driven training through modern teaching methods, experienced trainers, and industry-relevant certification.',
    image: '/courses-edusource.webp',
    alt: 'Students learning at Edusource',
    reversed: false,
    cta: 'View Programs',
    icon: <Award className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: 'mission',
    badge: 'Our Mission',
    title: 'Quality Education for Industry Challenges',
    description: 'Our mission is to provide quality education and government-certified skill training that prepares students for real industry challenges and global opportunities.',
    image: '/all notice edusource.webp',
    alt: 'Edusource mission focused skill training',
    reversed: true,
    cta: 'Apply Now',
    icon: <Target className="w-5 h-5" />,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100"
  },
  {
    id: 'vision',
    badge: 'Our Vision',
    title: "Kerala's Top Skill Development Centre",
    description: "Our vision is to become Kerala's most trusted skill development centre, helping young learners build successful and sustainable careers through practical training and recognised credentials.",
    image: '/all notice hrd.webp',
    alt: 'Edusource vision for career growth',
    reversed: false,
    cta: 'Contact Us',
    icon: <Eye className="w-5 h-5" />,
    color: "bg-violet-50 text-violet-600 border-violet-100"
  },
];

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="bg-grid-pattern w-full h-[800px] absolute top-[-400px] opacity-[0.05]" />
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[500px] sm:h-[500px] bg-blue-50 rounded-full blur-[40px] sm:blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] sm:w-[500px] sm:h-[500px] bg-emerald-50 rounded-full blur-[40px] sm:blur-[120px] opacity-60" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center mb-28 text-center">
            <motion.div 
              whileHover={isMobile ? {} : { scale: 1.05 }}
              className="inline-flex liquid-glass px-6 py-2.5 mb-8 border border-white/60 rounded-full shadow-soft"
            >
              <h5 className="text-sm font-bold tracking-widest uppercase text-blue-600">About Edusource</h5>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-8 leading-[1.15] max-w-4xl tracking-tight">
              Practical Training, Recognised <span className="text-blue-600">Certification</span>, Career Growth
            </h2>
            <p className="max-w-2xl text-lg md:text-xl text-slate-500 leading-relaxed">
              We operate under Youth Employability Skill Training Co-operative Educational Society, Kerala computer saksharatha mission, Kerala State Rutronix, and National Skill Development Corporation.
            </p>
          </div>
        </ScrollReveal>

        {/* Features Content */}
        <div className="space-y-32 md:space-y-48">
          {features.map((feature, idx) => (
            <div 
              key={feature.id} 
              className={`flex flex-col md:flex-row items-center gap-16 lg:gap-24 ${feature.reversed ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <ScrollReveal className="w-full md:w-1/2" direction={feature.reversed ? "right" : "left"} delay={0.1}>
                <motion.div 
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  className="relative group cursor-pointer"
                >
                  {!isMobile && <div className={`absolute -inset-4 bg-gradient-to-tr from-blue-100 to-transparent rounded-[40px] blur-2xl opacity-0 group-hover:opacity-60 transition duration-700`} />}
                  <div className="relative overflow-hidden rounded-[40px] border border-slate-100 bg-white shadow-2xl transition-all duration-500">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      width={1138}
                      height={1160}
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                      priority={feature.id === 'about-edusource'}
                    />
                    {!isMobile && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Text Side */}
              <ScrollReveal className="w-full md:w-1/2" delay={0.2}>
                <div className="max-w-xl">
                  {feature.badge && (
                    <motion.div 
                      whileHover={isMobile ? {} : { x: 5 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 mb-8 ${feature.color} rounded-2xl border font-bold text-sm shadow-sm transition-all`}
                    >
                      {feature.icon}
                      <span className="leading-none">{feature.badge}</span>
                    </motion.div>
                  )}
                  
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0f172a] mb-8 leading-[1.2] tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
                    {feature.description}
                  </p>

                  <a
                    href="#programs"
                    className="group relative inline-flex items-center justify-center bg-[#0056E0] text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {feature.cta}
                      <motion.span animate={isMobile ? {} : { x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        →
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
