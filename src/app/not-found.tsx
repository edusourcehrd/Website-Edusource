import React from "react";
import Link from "next/link";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { ArrowRight, Search, Home, GraduationCap, BookOpen, Phone } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Edusource HRD Centre",
  description: "The page you are looking for does not exist or has been moved. Explore courses, read our blog, or return to the Edusource HRD homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center bg-white rounded-[32px] sm:rounded-[48px] p-8 sm:p-16 border border-slate-100 shadow-soft">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-[#0056E0] font-black text-3xl mb-8 shadow-inner">
            404
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Page Not Found
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Quick Nav Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-10">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 font-bold hover:bg-blue-600 hover:text-white transition-all text-sm group"
            >
              <Home className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
              Homepage
            </Link>

            <Link
              href="/courses"
              className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 font-bold hover:bg-blue-600 hover:text-white transition-all text-sm group"
            >
              <GraduationCap className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
              All Courses
            </Link>

            <Link
              href="/blog"
              className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 font-bold hover:bg-blue-600 hover:text-white transition-all text-sm group"
            >
              <BookOpen className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
              Knowledge Hub
            </Link>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <span className="text-slate-500 font-medium">Need immediate assistance?</span>
            <a
              href="tel:+919895953159"
              className="inline-flex items-center gap-2 text-[#0056E0] font-bold hover:underline"
            >
              <Phone className="w-4 h-4" />
              Call +91 9895953159
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
