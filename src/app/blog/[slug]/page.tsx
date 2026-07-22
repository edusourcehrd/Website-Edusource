"use client";

import React, { use, useState, useEffect } from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ScrollReveal from '@/components/scroll-reveal';
import { motion } from 'framer-motion';
import { blogPosts as localBlogPosts } from '@/lib/blog-data';
import { sanityClient } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Clock,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostDetail {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  featuredImageUrl: string;
  featuredImageAlt?: string;
  body: any;
  isSanity?: boolean;
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Try to fetch from Sanity first
        const query = `*[_type == "post" && slug.current == $slug && published == true][0] {
          _id,
          title,
          "slug": slug.current,
          "excerpt": coalesce(excerpt, ""),
          "category": coalesce(category->title, "Education"),
          "publishedAt": coalesce(publishedAt, _createdAt),
          "author": coalesce(author->name, "Edusource HRD Centre"),
          "featuredImageUrl": featuredImage.asset->url,
          body,
          seoTitle,
          seoDescription
        }`;
        const sanityPost = await sanityClient.fetch(query, { slug });

        if (sanityPost) {
          setPost({ 
            ...sanityPost, 
            id: sanityPost._id,
            date: sanityPost.publishedAt,
            isSanity: true 
          });
        } else {
          // Fallback to local data
          const localPost = localBlogPosts.find(p => p.slug === slug);
          if (localPost) {
            setPost({ 
              ...localPost, 
              featuredImageUrl: localPost.image, 
              featuredImageAlt: localPost.title,
              body: null 
            }); 
          }
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
        const localPost = localBlogPosts.find(p => p.slug === slug);
        if (localPost) {
          setPost({ 
            ...localPost, 
            featuredImageUrl: localPost.image, 
            featuredImageAlt: localPost.title,
            body: null 
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      const related = localBlogPosts
        .filter(p => p.slug !== post.slug)
        .slice(0, 2)
        .map(p => ({
          ...p,
          featuredImageUrl: p.image,
          featuredImageAlt: p.title
        }));
      setRelatedPosts(related);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-28">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const getImageUrl = (url: string) => {
    return url || "/Edusource-all-notice.png";
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
        <article>
          {/* Article Header */}
          <section className="px-4 sm:px-6 mb-12">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-8 font-bold text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider border border-blue-100">
                    {post.category || "Education"}
                  </span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    {post.isSanity ? formatDate(post.date) : post.date}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] mb-8 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center justify-between py-8 border-y border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100" />
                    <div>
                      <p className="text-sm font-black text-[#0F172A]">{post.author || "Edusource HRD Centre"}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Industry Expert</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 hidden sm:block">Share:</span>
                    <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Featured Image */}
          <section className="px-4 sm:px-6 mb-16">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal delay={0.2}>
                <div className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl">
                  <img 
                    src={getImageUrl(post.featuredImageUrl)} 
                    alt={post.featuredImageAlt || post.title || "Blog post"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Article Content */}
          <section className="px-4 sm:px-6 mb-20">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal delay={0.3}>
                <div className="prose prose-lg prose-slate max-w-none">
                  {post.excerpt && (
                    <p className="text-xl text-slate-600 leading-relaxed font-medium mb-10 italic border-l-4 border-blue-600 pl-6">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="text-slate-700 leading-loose space-y-8 text-lg">
                    {post.isSanity && post.body ? (
                      <div className="sanity-content">
                        <PortableText value={post.body} />
                      </div>
                    ) : (
                      <>
                        <p>
                          The healthcare and professional training landscape is shifting rapidly as we move further into 2026. Edusource HRD Centre remains at the forefront of this transformation, providing students with the skills they need to excel in a competitive global market.
                        </p>
                        
                        <h2 className="text-3xl font-bold text-[#0F172A] pt-4">Understanding the Current Trends</h2>
                        <p>
                          Industry-oriented training is no longer just an option; it is a necessity. Our latest research shows that government-approved certifications in fields like Hospital Administration and Logistics are seeing a 40% increase in demand compared to traditional degrees.
                        </p>
                        
                        <ul className="space-y-4 py-4">
                          <li className="flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                            <span className="font-medium text-[#0F172A]">Digital Integration:</span> How AI is simplifying healthcare data management.
                          </li>
                          <li className="flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                            <span className="font-medium text-[#0F172A]">Global Opportunities:</span> The rising need for German-speaking professionals in Europe.
                          </li>
                          <li className="flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                            <span className="font-medium text-[#0F172A]">Skills over Theory:</span> Why hands-on practical training wins in 2026.
                          </li>
                        </ul>

                        <p>
                          At Edusource, we ensure that every module is updated to reflect these changes. Whether you are transcribing medical reports or managing a supply chain, the tools you use today are more advanced than ever before.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </article>

        {/* Related Posts */}
        <section className="py-24 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h3 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">Related Articles</h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedPosts.map((rPost, index) => (
                <ScrollReveal key={rPost.slug} delay={index * 0.1}>
                  <Link href={`/blog/${rPost.slug}`}>
                    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer h-full border border-slate-200/50">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={rPost.featuredImageUrl || "/Edusource-all-notice.png"} 
                          alt={rPost.featuredImageAlt || "Related article"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-8">
                        <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 block">
                          {rPost.category || "Education"}
                        </span>

                        <h4 className="text-xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors mb-4 line-clamp-2">
                          {rPost.title}
                        </h4>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          {rPost.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Blog CTA */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="bg-[#0F172A] rounded-[40px] p-8 sm:p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Want to learn more?</h2>
                <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                  Explore our comprehensive courses and take the first step towards a successful professional career.
                </p>
                <Link 
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl"
                >
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
