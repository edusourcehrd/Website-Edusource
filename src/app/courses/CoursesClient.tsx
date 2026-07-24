"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ScrollReveal from '@/components/scroll-reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { courses as localCourses } from '@/lib/courses-data';
import { sanityClient, COURSES_QUERY } from '@/lib/sanity';
import { 
  ArrowRight, 
  Search, 
  Clock, 
  GraduationCap, 
  Target,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CoursesClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allCourses, setAllCourses] = useState<Array<Record<string, unknown>>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const sanityCourses = await sanityClient.fetch(COURSES_QUERY);
        
        const formattedSanityCourses = (sanityCourses || []).map((course: Record<string, unknown>) => ({
          ...course,
          id: course._id,
          isSanity: true,
          category: course.category || "Education",
          icon: GraduationCap 
        }));

        const sanitySlugs = new Set(formattedSanityCourses.map((c: Record<string, unknown>) => c.slug));
        const filteredLocalCourses = localCourses.filter(c => !sanitySlugs.has(c.slug));
        
        setAllCourses([...formattedSanityCourses, ...filteredLocalCourses]);
      } catch (error) {
        console.error("Error fetching Sanity courses:", error);
        setAllCourses(localCourses);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = ['All', ...Array.from(new Set(allCourses.map(c => c.category)))];

  const filteredCourses = allCourses.filter(course => {
    const title = course.title || "";
    const shortDesc = course.shortDescription || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Cinematic Hero Section */}
        <section className="relative px-4 sm:px-6 mb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto bg-[#0056E0] rounded-[32px] sm:rounded-[60px] p-8 sm:p-16 md:p-24 relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-60" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-3xl">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                  <GraduationCap className="text-white w-4 h-4" />
                  <span className="text-white text-xs font-black uppercase tracking-widest">Premium Programs</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
                  Future-Ready <br />
                  <span className="text-emerald-400">Professional</span> Careers
                </h1>
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10">
                  Explore our government-approved diploma courses designed to bridge the gap between education and industry demands.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Filter & Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                <div className="flex items-center gap-2 mr-2 text-slate-400">
                  <Filter className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Filter:</span>
                </div>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      selectedCategory === category 
                      ? 'bg-[#0056E0] text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for a course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-full py-4 pl-12 pr-6 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Courses Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode='popLayout'>
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <Link href={`/courses/${course.slug}`}>
                      <div className="h-full bg-white rounded-[40px] p-8 sm:p-10 border border-slate-100 shadow-soft hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden cursor-pointer">
                        {/* Hover effect background */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rounded-bl-full`} />
                        
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                          {course.isSanity ? (
                            <GraduationCap className="w-7 h-7 text-white" />
                          ) : (
                            <course.icon className="w-7 h-7 text-white" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider border border-blue-100">
                              {course.category}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                              <Clock className="w-3 h-3" />
                              {course.duration}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-[#0F172A] mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                            {course.shortDescription}
                          </p>
                        </div>

                        {/* Preview Media */}
                        {course.isSanity ? (
                          course.courseImageUrl && (
                            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm aspect-video">
                              <Image
                                src={course.courseImageUrl}
                                alt={course.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                          )
                        ) : (
                          course.video && (
                            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                              <video
                                src={course.video}
                                className="h-28 w-full object-cover md:h-32"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="none"
                              />
                            </div>
                          )
                        )}

                        {/* Career Focus */}
                        <div className="mt-8 pt-6 border-t border-slate-50">
                          <div className="flex items-center gap-2 text-slate-400 mb-3">
                            <Target className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Career Focus</span>
                          </div>
                          <p className="text-xs font-bold text-[#0F172A] line-clamp-1 opacity-80">
                            {course.careerFocus || course.mode}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex items-center justify-between">
                          <span className="text-sm font-bold text-blue-600 flex items-center gap-2">
                            View Program <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#0056E0] group-hover:text-white transition-all shadow-inner">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No courses found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
