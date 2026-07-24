"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Courses', href: '/courses' },
    { label: 'Certification', href: '/#certification' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Support', href: '/#support' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-300 py-3 px-3 sm:py-4 sm:px-6">
      <motion.nav
        initial={isMobile ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: isMobile ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-7xl liquid-glass rounded-[20px] sm:rounded-full border border-white/40 transition-all duration-500 ${
          scrolled ? 'py-2 px-5 sm:px-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)]' : 'py-2.5 px-6 sm:px-8'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Image
                src="/edusource-logo.webp"
                alt="EduSource HRD Centre Logo"
                width={160}
                height={48}
                className="h-7 sm:h-9 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Menu Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setActiveLink(link.label)}
                className={`relative px-5 py-2 text-[14px] font-semibold transition-all duration-300 rounded-full ${
                  activeLink === link.label ? 'text-[#0056E0]' : 'text-[#0F172A] hover:text-[#0056E0]'
                }`}
              >
                {activeLink === link.label && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/80 shadow-sm rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/admission" 
              className="bg-[#0056E0] text-white px-5 sm:px-7 py-2.5 rounded-full text-[14px] font-bold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
            >
              Admission
            </motion.a>
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 text-[#0F172A] rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setIsOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full transition-transform origin-center" 
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-current rounded-full transition-opacity" 
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full transition-transform origin-center" 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10 lg:hidden"
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-3 text-[15px] font-bold text-[#0F172A] hover:text-[#0056E0] hover:bg-white/40 rounded-2xl transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
