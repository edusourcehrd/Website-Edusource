'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Loader2,
  ShieldCheck,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getLocalResponse } from '@/lib/edumitraKnowledge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const SUGGESTED_CHIPS = [
  "Courses available",
  "How to enquire?",
  "Hospital Administration",
  "German A1-B2",
  "Logistics placement",
  "Does Hospital Administration have placement?",
  "Fees",
  "Contact"
];

export default function EduMitraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          text: "Hi, I'm EduMitra 👋 Ask about courses, admission, certificates, and contact details. How can I help you today?",
          sender: 'bot',
          timestamp: new Date(),
          suggestions: ["Courses available", "How to enquire?", "Hospital Administration"]
        },
      ]);
    }
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the window is open before scrolling
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate safe local processing delay
    setTimeout(() => {
      const { answer, related } = getLocalResponse(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: related
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "pointer-events-auto flex flex-col overflow-hidden bg-white shadow-2xl border border-slate-200/60 transition-all",
              // Desktop: Floating window
              "sm:mb-4 sm:w-[400px] sm:h-[600px] sm:max-h-[70vh] sm:rounded-3xl",
              // Mobile: Bottom sheet / Panel
              "fixed inset-x-3 bottom-20 max-h-[75vh] w-[calc(100vw-24px)] rounded-2xl sm:relative sm:inset-auto"
            )}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-blue-700 p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0 overflow-hidden shadow-inner">
                  <Image 
                    src="/edumitra.gif" 
                    alt="EduMitra" 
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base tracking-tight">EduMitra</h3>
                    <div className="bg-emerald-400 w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  </div>
                  <p className="text-[10px] text-teal-50/80 font-medium">Safe AI Course Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Disclaimer Bar */}
            <div className="bg-amber-50/80 border-b border-amber-100/50 px-4 py-1.5 flex items-center gap-2 shrink-0">
              <ShieldCheck size={12} className="text-amber-600" />
              <p className="text-[10px] text-amber-800 font-medium leading-none">
                For latest admission details, contact Edusource directly.
              </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/40 p-4 space-y-4 scroll-smooth no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col max-w-[88%]",
                      msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-2.5 text-sm leading-relaxed shadow-sm space-y-1.5",
                        msg.sender === 'user' 
                          ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm" 
                          : "bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-sm"
                      )}
                    >
                      {msg.sender === 'bot' ? (
                        msg.text.split('\n').map((line, idx) => {
                          if (!line.trim()) return <div key={idx} className="h-1" />;
                          const isBullet = line.trim().startsWith('-');
                          const content = isBullet ? line.trim().substring(1).trim() : line;
                          const parts = content.split(/(\*\*.*?\*\*)/g);
                          const formattedContent = parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={pIdx} className="font-bold">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          });
                          if (isBullet) {
                            return (
                              <div key={idx} className="flex gap-2 pl-1">
                                <span className="text-slate-400 select-none">•</span>
                                <span className="flex-1">{formattedContent}</span>
                              </div>
                            );
                          }
                          return <div key={idx}>{formattedContent}</div>;
                        })
                      ) : (
                        msg.text
                      )}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 uppercase font-semibold tracking-wider px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>

                  {/* Suggestions from Bot */}
                  {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 pl-1">
                      {msg.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(s)}
                          className="text-[11px] bg-white border border-teal-100 hover:border-teal-300 text-teal-700 font-medium px-3 py-1.5 rounded-full transition-all shadow-sm active:scale-95"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Footer */}
            <div className="px-3 py-2 border-t border-slate-100 bg-white shrink-0 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 w-max">
                {SUGGESTED_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="whitespace-nowrap px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-[11px] text-slate-600 font-medium hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-all active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-slate-100/80 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500/50 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white p-3 rounded-xl transition-all active:scale-95 shadow-md shadow-teal-100 disabled:shadow-none shrink-0"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
              <p className="text-[9px] text-center text-slate-400 mt-2 font-medium">
                EduMitra • Edusource HRD Centre Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={isMobile ? {} : { scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "pointer-events-auto flex items-center justify-center shadow-2xl transition-all relative",
          // Desktop: Round button
          "w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-4 ring-white/80",
          isOpen 
            ? "bg-white text-teal-600 border border-teal-100" 
            : "bg-gradient-to-br from-teal-500 to-blue-600 text-white"
        )}
        aria-label={isOpen ? "Close Chat" : "Open EduMitra Chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <ChevronDown size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center overflow-hidden rounded-full"
            >
              <Image 
                src="/edumitra.gif" 
                alt="EduMitra" 
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Unread Indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-sm"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
