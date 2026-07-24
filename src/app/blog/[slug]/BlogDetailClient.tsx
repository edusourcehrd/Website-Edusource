"use client";

import React, { useState, useEffect } from 'react';
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
import Image from 'next/image';
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
  body: unknown;
  isSanity?: boolean;
}

interface BlogDetailClientProps {
  slug: string;
  initialPost?: PostDetail | null;
}

export default function BlogDetailClient({ slug, initialPost }: BlogDetailClientProps) {
  const [post, setPost] = useState<PostDetail | null>(initialPost || null);
  const [isLoading, setIsLoading] = useState(!initialPost);
  const [relatedPosts, setRelatedPosts] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
      setIsLoading(false);
    } else {
      const fetchPost = async () => {
        try {
          const query = `*[_type == "post" && slug.current == $slug && published == true][0] {
            _id,
            title,
            "slug": slug.current,
            "excerpt": coalesce(excerpt, ""),
            "category": coalesce(category->title, "Education"),
            "publishedAt": coalesce(publishedAt, _createdAt),
            "author": coalesce(author->name, "Edusource HRD Centre"),
            "featuredImageUrl": featuredImage.asset->url,
            body
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
    }
  }, [slug, initialPost]);

  useEffect(() => {
    if (!post) return;
    const filteredLocal = localBlogPosts
      .filter(p => p.slug !== slug)
      .map(p => ({ ...p, featuredImageUrl: p.image }))
      .slice(0, 3);
    setRelatedPosts(filteredLocal);
  }, [post, slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-28">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Knowledge Hub
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                {post.category || "Education"}
              </span>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-blue-600" />
                  {post.author}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-[32px] overflow-hidden bg-slate-100 mb-12 shadow-md">
            <img 
              src={post.featuredImageUrl || '/edusource-logo.webp'} 
              alt={post.featuredImageAlt || post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-slate-100 shadow-soft mb-16">
            <div className="prose prose-lg max-w-none prose-slate prose-headings:text-[#0F172A] prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:underline">
              {post.isSanity && post.body ? (
                <PortableText value={post.body} />
              ) : (
                <div>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    {post.excerpt}
                  </p>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    At Edusource HRD Centre, we focus on providing high-quality skill development and professional training to prepare students for rewarding careers in healthcare, management, language proficiency, and global industries.
                  </p>
                  <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">
                    Key Highlights & Industry Relevance
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    Our curriculum is designed according to industry standards, featuring practical sessions, expert guidance, and job-oriented training modules.
                  </p>
                </div>
              )}
            </div>

            {/* Social Share Footer */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-bold text-slate-500">Share this article:</span>
              <div className="flex items-center gap-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://edusourcehrd.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=https://edusourcehrd.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-blue-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://edusourcehrd.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-blue-700 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-4">
                        <img 
                          src={relatedPost.featuredImageUrl || '/edusource-logo.webp'} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-bold text-[#0F172A] text-base group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                        Read Article <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
