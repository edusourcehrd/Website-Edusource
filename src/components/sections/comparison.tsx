"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/scroll-reveal';
import { 
  ArrowRight, 
  Clock, 
  GraduationCap, 
  Globe, 
  Briefcase, 
  Truck, 
  FileText, 
  UserCheck,
  Sparkles
} from 'lucide-react';

import Link from 'next/link';
import { sanityClient, COURSES_QUERY } from '@/lib/sanity';

const localPrograms = [
  {
    title: "Diploma in Hospital Administration",
    slug: "hospital-administration",
    duration: "1 Year",
    focus: "Healthcare administration and hospital operations",
    icon: <UserCheck className="w-6 h-6 text-white" />,
    color: "from-blue-600 to-indigo-700",
    theme: "theme-hospital",
    video: "/2d-game/hospital-administration.mp4"
  },
  {
    title: "German Language Training (A1-B2)",
    slug: "german-language-training",
    duration: "180 Days",
    focus: "International study and career opportunities",
    icon: <Globe className="w-6 h-6 text-white" />,
    color: "from-emerald-600 to-teal-700",
    theme: "theme-german",
    video: "/2d-game/german.mp4"
  },
  {
    title: "Advanced Diploma in HR Management",
    slug: "hr-management",
    duration: "6 Months",
    focus: "Human resources and people operations",
    icon: <Briefcase className="w-6 h-6 text-white" />,
    color: "from-violet-600 to-purple-700",
    theme: "theme-hr",
    video: "/2d-game/hr-management.mp4"
  },
  {
    title: "Medical Coding",
    slug: "medical-coding",
    duration: "3 Months",
    focus: "Professional medical coding industry entry",
    icon: <FileText className="w-6 h-6 text-white" />,
    color: "from-sky-600 to-blue-700",
    theme: "theme-coding",
    video: "/2d-game/medical-coding.mp4"
  },
  {
    title: "Diploma in Logistics & Shipping",
    slug: "logistics-shipping-management",
    duration: "6 Months",
    focus: "Logistics, warehouse, shipping, and supply chain",
    icon: <Truck className="w-6 h-6 text-white" />,
    color: "from-amber-600 to-orange-700",
    theme: "theme-logistics",
    video: "/2d-game/logistics-shipping.mp4"
  },
  {
    title: "Medical Transcription",
    slug: "medical-transcription",
    duration: "4 Months",
    focus: "Medical documentation and transcription careers",
    icon: <Clock className="w-6 h-6 text-white" />,
    color: "from-rose-600 to-red-700",
    theme: "theme-transcription",
    video: "/2d-game/medical-transcription.mp4"
  },
  {
    title: "AI Integrated Digital Marketing",
    slug: "ai-digital-marketing",
    duration: "6 Months",
    focus: "SEO, SEM, social media, and AI-driven marketing automation",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    color: "from-blue-600 to-cyan-500",
    theme: "theme-ai",
    video: "/2d-game/digital-marketing.mp4"
  },
];

function CourseVideo({ src, title }: { src: string; title: string }) {
  return (
    <div className="mt-6 mb-8 overflow-hidden rounded-2xl border border-white/70 shadow-lg shadow-blue-100/40 bg-white/40">
      <video
        src={src}
        title={title}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-28 w-full object-cover md:h-32"
      />
    </div>
  );
}

const ComparisonSection = () => {
  const [sanityCourses, setSanityCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await sanityClient.fetch(COURSES_QUERY);
        setSanityCourses(data || []);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const featuredPrograms = (sanityCourses || []).filter(c => c.featured);
  const displayPrograms = featuredPrograms.length > 0 
    ? featuredPrograms 
    : (sanityCourses.length > 0 ? sanityCourses : localPrograms);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-slate-50 relative overflow-hidden" id="programs">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[800px] sm:h-[800px] bg-blue-100/50 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <GraduationCap className="w-4 h-4" />
              Our Popular Programs
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] leading-tight mb-6">
              Empower Your Future with <br className="hidden md:block" /> Professional Certifications
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Accelerate your career with government-approved diploma programs tailored to meet industry demands.
            </p>
          </div>
        </ScrollReveal>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {displayPrograms.map((program, index) => (
            <ScrollReveal key={program.slug || index} delay={index * 0.1}>
              <Link href={`/courses/${program.slug}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -12 }}
                  className={`premium-fluid-card ${program.theme || 'theme-hospital'} h-full rounded-[24px] sm:rounded-[40px] shadow-soft border border-slate-100 overflow-hidden cursor-pointer min-h-[420px] sm:min-h-[460px] flex flex-col`}
                >
                  <div className="fluid-bg"></div>
                  <div className="fluid-orb orb-one"></div>
                  <div className="fluid-orb orb-two"></div>
                  <div className="shine-layer"></div>

                  <div className="course-card-content p-8 sm:p-10 flex flex-col h-full">
                    {/* Icon & Category */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${program.color || 'from-blue-600 to-indigo-700'} flex items-center justify-center shadow-lg shadow-blue-500/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        {program.icon ? (
                          typeof program.icon === 'object' ? program.icon : <program.icon className="w-7 h-7 text-white" />
                        ) : (
                          <GraduationCap className="w-7 h-7 text-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 text-slate-600 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        {program.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500 mb-2 leading-relaxed">
                      {program.focus || program.shortDescription}
                    </p>

                    {/* Preview Media */}
                    {(program.video || program.courseImageUrl) && (
                      <div className="mt-6 mb-8 overflow-hidden rounded-2xl border border-white/70 shadow-lg shadow-blue-100/40 bg-white/40 aspect-video">
                        {program.courseImageUrl ? (
                          <img src={program.courseImageUrl} alt={program.title} className="w-full h-full object-cover" />
                        ) : (
                          <video
                            src={program.video}
                            title={`${program.title} preview`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    )}

                    {/* Footer / CTA */}
                    <div className="mt-auto pt-6 border-t border-slate-200/50 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 p-6 md:p-8 bg-[#0f172a] rounded-[24px] sm:rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <p className="text-lg font-medium text-white/90">Not sure which program is right for you?</p>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/919633492021" 
                  target="_blank"
                  className="bg-white text-[#0f172a] px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl"
                >
                  Talk to a Counsellor
                </motion.a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ComparisonSection;
