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

export default function BlogPage() {
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
        console.log("Sanity posts:", sanityPosts);
        console.log("First image URL:", sanityPosts[0]?.featuredImageUrl);

        const formattedSanityPosts = sanityPosts.map((post: any) => ({
          ...post,
          id: post._id,
          date: post.publishedAt,
          isSanity: true
        }));
        
        // Merge with local posts, avoiding duplicates by slug
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
    return post.featuredImageUrl || "/Edusource-all-notice.png";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently Published";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        {/* Blog Hero */}
        <section className="px-4 sm:px-6 mb-20">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-6xl font-bold text-[#0F172A] mb-6 tracking-tight">
                  Insights & <span className="text-blue-600">Education</span> Updates
                </h1>
                <h2 className="sr-only">Our Blog</h2>
                <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto">
                  Stay updated with the latest trends in healthcare, logistics, and professional skill development.
                </p>
              </div>
            </ScrollReveal>

            {/* Featured Post */}
            {!isLoading && allPosts.length > 0 && !searchTerm && selectedCategory === 'All' && featuredPost && (
              <ScrollReveal delay={0.2}>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <div className="group relative bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-soft hover:shadow-2xl transition-all duration-700 cursor-pointer mb-20">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/2 relative h-[300px] lg:h-[500px] overflow-hidden">
                        <img 
                          src={getImageUrl(featuredPost)} 
                          alt={featuredPost.title || "Blog post"}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
                        <div className="absolute top-8 left-8">
                          <span className="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg">
                            Featured Post
                          </span>
                        </div>
                      </div>
                      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                          <span className="text-blue-600">{featuredPost.category || "Education"}</span>
                          <span>•</span>
                          <span>{featuredPost.isSanity ? formatDate(featuredPost.date) : featuredPost.date}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed mb-10">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-200/60">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200" />
                            <span className="text-sm font-bold text-[#0F172A]">{featuredPost.author || "Edusource HRD Centre"}</span>
                          </div>
                          <span className="text-blue-600 font-bold flex items-center gap-2">
                            Read Article <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* Filter & Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between border-b border-slate-100 pb-10">
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 text-sm font-bold transition-all ${
                    selectedCategory === category 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
              </div>
            ) : (
              <AnimatePresence mode='popLayout'>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="h-full bg-white rounded-3xl overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={getImageUrl(post)} 
                            alt={post.title || "Blog post"}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-6 left-6">
                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0F172A] text-[10px] font-black uppercase tracking-wider shadow-sm">
                              {post.category || "Education"}
                            </span>
                          </div>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <span>{post.isSanity ? formatDate(post.date) : post.date}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>5 min read</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-[#0F172A] mb-4 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                            <span className="text-xs font-bold text-[#0F172A] opacity-60">By {post.author || "Edusource HRD Centre"}</span>
                            <span className="text-blue-600 font-bold text-xs flex items-center gap-1">
                              Read More <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            {!isLoading && filteredPosts.length === 0 && (
              <div className="col-span-full text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">No articles found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
