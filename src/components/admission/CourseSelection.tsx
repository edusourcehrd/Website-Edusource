"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Languages, ArrowRight, ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import StickyBanner from "@/components/sections/sticky-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CourseSelection() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fbff]">
      <Navbar />
      <main className="flex-grow pt-36 md:pt-44 pb-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
              <Lock size={12} className="text-blue-500" />
              Official Online Admission Portal
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-950 mb-4 tracking-tight">
              ഓൺലൈൻ അഡ്മിഷൻ <span className="text-blue-600 block sm:inline">/ Admission Portal</span>
            </h1>
            
            <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto mt-2">
              Select your desired course program to proceed with the online application form.
            </p>
          </div>

          {/* Secure Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: ShieldCheck, text: "Government Recognized Centre" },
              { icon: Lock, text: "Direct Admission & Verification" },
              { icon: CheckCircle2, text: "Edusource HRD Centre, Kollam" }
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <badge.icon className="size-4 text-emerald-500" />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Course Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* General & Hospital Administration Card */}
            <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="size-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <GraduationCap size={32} />
                  </div>
                  
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                    Main Programs
                  </span>

                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    General & Hospital Admin Courses
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Hospital Administration, HR Management, Medical Coding, Logistics & Shipping Diploma programs.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button asChild className="w-full py-6 text-base font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-100 group/btn">
                    <Link href="/admission/general">
                      Apply General Admission
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* German Language Training Card */}
            <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="size-16 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Languages size={32} />
                  </div>
                  
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                    Language Program
                  </span>

                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    German Language Training Program
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Comprehensive German language coaching (A1, A2, B1, B2) for healthcare professionals & students.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button asChild className="w-full py-6 text-base font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 group/btn">
                    <Link href="/admission/german">
                      Apply German Admission
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
