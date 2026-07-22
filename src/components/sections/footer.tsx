"use client";

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube, ExternalLink } from 'lucide-react';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/">
              <Image
                src="/edusource-logo.png"
                alt="EduSource HRD Centre"
                width={220}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-500 leading-relaxed text-[15px] max-w-xs">
              Kollam's leading government-approved skill training centre. Empowering students with industry-ready professional certifications.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/edusourcehrd" },
                { Icon: Facebook, href: "https://www.facebook.com/edusourcehrdcentre" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/edusourcehrd" },
                { Icon: Youtube, href: "https://www.youtube.com/@edusourcehrdcentre" }
              ].map(({ Icon, href }, idx) => (
                <a 
                  key={idx} 
                  href={href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-[#0f172a]">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About EduSource', href: '/#about' },
                { label: 'All Courses', href: '/courses' },
                { label: 'Latest Blogs', href: '/blog' },
                { label: 'Certification', href: '/#certification' },
                { label: 'Contact Us', href: '/#contact' }
              ].map((link) => (
                <Link key={link.label} href={link.href} className="text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all text-[15px] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-[#0f172a]">Popular Programs</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Hospital Administration', slug: 'hospital-administration' },
                { label: 'German Language', slug: 'german-language-training' },
                { label: 'HR Management', slug: 'hr-management' },
                { label: 'Medical Coding', slug: 'medical-coding' },
                { label: 'Logistics & Shipping', slug: 'logistics-shipping-management' }
              ].map((link) => (
                <Link key={link.label} href={`/courses/${link.slug}`} className="text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all text-[15px] flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-[#0f172a]">Contact Us</h4>
            <div className="flex flex-col gap-5">
              <a href="tel:+919895953159" className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Us</span>
                  <span className="text-[15px] font-bold text-slate-700">+91 9895953159</span>
                </div>
              </a>
              <a href="hrdcentrekollam@gmail.com" className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</span>
                  <span className="text-[15px] font-bold text-slate-700">hrdcentrekollam@gmail.com</span>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</span>
                  <span className="text-[14px] font-medium text-slate-600 leading-snug">
                    Minerva Complex, Madannada, Kollam, Kerala 691010
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-sm">
            © {currentYear} EduSource HRD Centre. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-8">
            <Link href="/privacy-policy" className="text-slate-400 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-slate-400 hover:text-blue-600 text-sm transition-colors">Terms of Service</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
