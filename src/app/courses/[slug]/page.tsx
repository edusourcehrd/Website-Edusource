"use client";

import React, { use, useState, useEffect } from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ScrollReveal from '@/components/scroll-reveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { courses as localCourses } from '@/lib/courses-data';
import { sanityClient, SINGLE_COURSE_QUERY } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Target,
  ChevronDown,
  Info,
  BookmarkCheck
} from 'lucide-react';
import { notFound } from 'next/navigation';

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const sanityCourse = await sanityClient.fetch(SINGLE_COURSE_QUERY, { slug });

        if (sanityCourse) {
          setCourse({
            ...sanityCourse,
            isSanity: true,
            icon: GraduationCap,
            // Provide visual theme fallbacks for Sanity courses
            visualTheme: {
              gradient: "from-blue-600 to-indigo-700",
              secondaryGradient: "from-blue-50 to-white"
            }
          });
        } else {
          // Fallback to local
          const localCourse = localCourses.find(c => c.slug === slug);
          if (localCourse) {
            setCourse(localCourse);
          }
        }
      } catch (error) {
        console.error("Error fetching course detail:", error);
        const localCourse = localCourses.find(c => c.slug === slug);
        if (localCourse) {
          setCourse(localCourse);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-28">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  const courseIcon = course.isSanity ? GraduationCap : course.icon;

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* Cinematic Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            className={`absolute inset-0 bg-gradient-to-br ${course.visualTheme.gradient} z-0`}
          />
          {/* Decorative Elements */}
          <div className="absolute inset-0 z-[1] opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] z-[1]" />

          <div className="container relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                {React.createElement(courseIcon, { className: "text-white w-4 h-4" })}
                <span className="text-white text-xs font-black uppercase tracking-widest">{course.category || "Education"}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                {course.title}
              </h1>
              <p className="text-white/80 text-lg sm:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
                {course.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3 text-white font-bold bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-3 text-white font-bold bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20">
                  <GraduationCap className="w-5 h-5 text-blue-300" />
                  {course.certification || "Professional Diploma"}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* Course Overview & Who It's For */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <ScrollReveal>
                <div className="p-8 sm:p-12 rounded-[40px] bg-slate-50 border border-slate-100">
                  <div className="inline-flex items-center gap-2 text-blue-600 mb-6">
                    <Info className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">Course Overview</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-8">What is this program about?</h2>
                  <div className="text-slate-600 text-lg leading-relaxed mb-8">
                    {course.isSanity && course.fullDescription ? (
                      <PortableText value={course.fullDescription} />
                    ) : (
                      <p>{course.fullDescription}</p>
                    )}
                  </div>

                  {course.overview && (
                    <ul className="space-y-4">
                      {course.overview.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {course.isSanity && course.eligibility && (
                    <div className="mt-10 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm">
                      <h4 className="font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                        <BookmarkCheck className="w-5 h-5 text-blue-600" />
                        Eligibility
                      </h4>
                      <p className="text-slate-600">{course.eligibility}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="p-8 sm:p-12 rounded-[40px] border border-slate-100 shadow-soft">
                  <div className="inline-flex items-center gap-2 text-indigo-600 mb-6">
                    <Target className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">Why Join Us?</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-8">Course Highlights</h2>
                  <div className="space-y-6">
                    {(course.features || course.whoIsItFor || []).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <p className="text-slate-700 font-bold">{typeof item === 'string' ? item : item.title || "Key Feature"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Modules/Syllabus Section */}
        {(course.syllabus || course.modules) && (
          <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[#0F172A] text-white">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-white">Syllabus</span>
                  </div>
                  <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-white">Course Modules</h2>
                  <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    A structured learning path designed by industry experts to take you from basics to advanced levels.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {course.isSanity ? (
                  // If Sanity syllabus is just a list of strings
                  (course.syllabus || []).map((item: string, i: number) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                      <div className="p-8 sm:p-10 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group h-full">
                        <span className="text-blue-400 text-sm font-black mb-4 block">Module 0{i+1}</span>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{item}</h3>
                        <p className="text-white/50 text-sm">Comprehensive training module focused on industry-ready practical skills.</p>
                      </div>
                    </ScrollReveal>
                  ))
                ) : (
                  course.modules.map((module: any, i: number) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                      <div className="p-8 sm:p-10 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group h-full">
                        <span className="text-blue-400 text-sm font-black mb-4 block">Module 0{i+1}</span>
                        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white group-hover:text-blue-400 transition-colors">{module.title}</h3>
                        <ul className="space-y-3">
                          {module.topics.map((topic: string, j: number) => (
                            <li key={j} className="flex items-center gap-2 text-white/70 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollReveal>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* Career Section */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 text-emerald-600 mb-6">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">Career Opportunities</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-8 leading-tight">
                    Where can this course <br /> take you?
                  </h2>
                  <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                    Upon successful completion of the {course.title}, you'll be eligible for various roles in the industry. Our career support team helps you prepare for these opportunities.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(course.careerOpportunities || ['Industry Expert', 'Specialist', 'Coordinator', 'Manager']).map((job: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-emerald-200 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                          <Target className="w-4 h-4" />
                        </div>
                        <span className="text-slate-800 font-bold">{job}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
              <div className="flex-1 w-full max-w-lg">
                <ScrollReveal delay={0.3}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-[40px] rotate-3 opacity-10" />
                    <div className="relative bg-white p-8 sm:p-12 rounded-[40px] border border-slate-100 shadow-2xl">
                      <h4 className="text-2xl font-bold text-[#0F172A] mb-6">Key Career Focus</h4>
                      <p className="text-blue-600 font-black text-xl mb-8 leading-relaxed">
                        "{course.careerFocus || course.mode || "Global Employability"}"
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400 font-bold">Certification</span>
                          <span className="text-slate-900 font-bold">Industry Recognised</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400 font-bold">Admissions / Support</span>
                          <span className="text-blue-600 font-bold">{course.contactNumber || "+91 96334 92021"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {course.faqs && (
          <section className="py-24 sm:py-32 px-4 sm:px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Frequently Asked Questions</h2>
                  <p className="text-slate-500">Everything you need to know about the {course.title}.</p>
                </div>
              </ScrollReveal>

              <div className="space-y-4">
                {course.faqs.map((faq: any, i: number) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <details className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                      <summary className="flex items-center justify-between p-6 sm:p-8 cursor-pointer list-none">
                        <span className="text-lg font-bold text-[#0F172A] pr-4">{faq.question}</span>
                        <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="px-6 sm:px-8 pb-8 text-slate-600 leading-relaxed border-t border-slate-50 pt-6">
                        {faq.answer}
                      </div>
                    </details>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className={`rounded-[40px] sm:rounded-[60px] bg-gradient-to-br ${course.visualTheme.gradient} p-8 sm:p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20`}>
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-8 relative z-10">Ready to transform <br className="hidden sm:block" /> your future?</h2>
                <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto relative z-10">
                  Join hundreds of successful students who have built their careers with Edusource HRD Centre. Admissions are now open!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/admission" 
                    className="bg-white text-[#0056E0] px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto text-center"
                  >
                    Apply Now
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/919633492021" 
                    target="_blank"
                    className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all w-full sm:w-auto"
                  >
                    Enquire Now
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
