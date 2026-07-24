"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ScrollReveal from '@/components/scroll-reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts as localBlogPosts } from '@/lib/blog-data';
import { sanityClient } from '@/lib/sanity';
import { 
  ArrowRight, 
  Search, 
  Calendar, 
  User, 
  Tag,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  featuredImageUrl: string;
  featuredImageAlt?: string;
  isSanity?: boolean;
}

export default function BlogClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSanityPosts = async () => {
      try {
        const query = `*[_type == "post" && published == true] | order(publishedAt desc) {
          _id,
          title,
          "slug": slug.current,
          "excerpt": coalesce(excerpt, ""),
          "category": coalesce(category->title, "Education"),
          "publishedAt": coalesce(publishedAt, _createdAt),
          "author": coalesce(author->name, "Edusource HRD Centre"),
          "featuredImageUrl": featuredImage.asset->url
        }`;
        const sanityPosts = await sanityClient.fetch(query);

        const formattedSanityPosts = (sanityPosts || []).map((post: any) => ({
          ...post,
          id: post._id,
          date: post.publishedAt,
          isSanity: true
        }));
        
        const sanitySlugs = new Set(formattedSanityPosts.map((p: any) => p.slug));
        const filteredLocalPosts = localBlogPosts.map(p => ({
          ...p,
          featuredImageUrl: p.image,
          featuredImageAlt: p.title
        })).filter(p => !sanitySlugs.has(p.slug));
        
        setAllPosts([...formattedSanityPosts, ...filteredLocalPosts]);
      } catch (error) {
        console.error("Error fetching Sanity posts:", error);
        setAllPosts(localBlogPosts.map(p => ({
          ...p,
          featuredImageUrl: p.image,
          featuredImageAlt: p.title
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSanityPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(allPosts.map(p => typeof p.category === 'string' ? p.category : "Education")))];

  const filteredPosts = allPosts.filter(post => {
    const title = post.title || "";
    const excerpt = post.excerpt || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0] || allPosts[0];

  const getImageUrl = (post: Post) => {
    if (!post) return '/edusource-logo.webp';
    return post.featuredImageUrl || '/edusource-logo.webp';
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 mb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto bg-[#0F172A] rounded-[32px] sm:rounded-[60px] p-8 sm:p-16 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-60" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-3xl">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                  <Tag className="text-blue-400 w-4 h-4" />
                  <span className="text-white text-xs font-black uppercase tracking-widest">Articles & Insights</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                  Knowledge Hub & <br />
                  <span className="text-blue-400">Career Guidance</span>
                </h1>
                <p className="text-white/70 text-lg sm:text-xl leading-relaxed">
                  Stay updated with the latest trends in healthcare, management, languages, and professional development.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {!isLoading && featuredPost && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
            <ScrollReveal>
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="group bg-white rounded-[40px] border border-slate-100 p-6 sm:p-10 shadow-soft hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer">
                  <div className="lg:col-span-7 aspect-[16/9] lg:aspect-[16/10] rounded-[28px] overflow-hidden bg-slate-100 relative">
                    <Image src={getImageUrl(featuredPost)} alt={featuredPost.featuredImageAlt || featuredPost.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" priority />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md">
                        Featured Article
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        {featuredPost.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-blue-600" />
                        {featuredPost.author}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                      Read Full Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </section>
        )}

        {/* Filter & Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                      selectedCategory === category 
                      ? 'bg-[#0F172A] text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-full py-3 pl-10 pr-6 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="h-full bg-white rounded-[32px] p-6 border border-slate-100 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer">
                        {/* Image Container */}
                        <div className="aspect-[16/10] rounded-[24px] overflow-hidden bg-slate-100 mb-6 relative">
                          <Image src={getImageUrl(post)} alt={post.featuredImageAlt || post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold shadow-sm">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow flex flex-col">
                          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {post.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {post.author}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>

                          <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600">
                            <span>Read More</span>
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[32px] border border-slate-100">
              <p className="text-slate-500 text-base mb-4">No articles found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="text-blue-600 font-bold hover:underline text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
