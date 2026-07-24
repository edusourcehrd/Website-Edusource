"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Video, Phone, CheckCheck, Star, User } from 'lucide-react';
import ScrollReveal from '@/components/scroll-reveal';
import CustomVideoPlayer from '@/components/ui/custom-video-player';
import { sanityClient, TESTIMONIALS_QUERY } from '@/lib/sanity';

const Testimonials = () => {
  const [sanityTestimonials, setSanityTestimonials] = useState<Array<Record<string, unknown>>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await sanityClient.fetch(TESTIMONIALS_QUERY);
        setSanityTestimonials(data || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const featuredTestimonials = (sanityTestimonials || []).filter(t => t.featured);
  const displayTestimonials = featuredTestimonials.length > 0 ? featuredTestimonials : sanityTestimonials;

  const studentExperiences = [
    {
      title: 'Career Counselling',
      content: [
        { text: 'Can you guide me with admissions?', isSender: true, time: '10:05 AM' },
        { text: 'Yes. We help you choose the right program, understand schedules, and complete the admission process smoothly.', isSender: false, time: '10:06 AM' },
        { text: 'That makes it easy to get started.', isSender: true, time: '10:07 AM' },
      ],
    },
    {
      title: 'Program Guidance',
      content: [
        { text: 'Which programs are available at Edusource?', isSender: true, time: '11:20 AM' },
        { text: 'Hospital Administration, HR Management, Logistics and Shipping, Medical Coding, Medical Transcription, and German language training.', isSender: false, time: '11:22 AM' },
        { text: 'Can I choose online or offline classes?', isSender: true, time: '11:23 AM' },
        { text: 'Yes. Flexible offline and online classes are available for selected programs.', isSender: false, time: '11:25 AM' },
        { text: 'Please guide me with admission.', isSender: true, time: '11:26 AM' },
      ],
    },
    {
      title: 'Admissions Support',
      content: [
        { text: 'Welcome to Edusource HRD Centre. How can we help?', isSender: false, time: '02:15 PM' },
        { text: 'I want to know about certification.', isSender: true, time: '02:16 PM' },
        { text: 'Our programs are backed by recognised certification partners including MSME, Rutronics, Kerala, NYP, and NSDC pathways.', isSender: false, time: '02:18 PM' },
        { text: 'That gives me confidence to apply.', isSender: true, time: '02:20 PM' },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 bg-slate-50 overflow-hidden" id="testimonials">
      <div className="container mx-auto max-w-[1280px]">
        {/* Header Section */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-[36px] md:text-[48px] font-bold text-black leading-[1.2] tracking-normal mb-4">
              Student Support for <span className="italic font-normal text-[#4A5568]">Confident Learning</span>
            </h2>
            <p className="text-[20px] text-[#4A5568] max-w-[600px] mx-auto leading-[1.6]">
              Our team supports students with admissions guidance, mentor-led learning, practical modules, and clear certification pathways.
            </p>
          </div>
        </ScrollReveal>

        {/* Masonry-style Grid - RESTORED ORIGINAL MEDIA BLOCKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max items-start">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            <ScrollReveal delay={0.1}>
              {/* WhatsApp Style Chat Card */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-soft border border-slate-200 hover:shadow-2xl transition-all duration-500 cursor-default group">
                <div className="bg-[#075e54] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/20 border border-white/10">
                    <Image src="/edusource-mini-icon.webp" alt="Support" width={40} height={40} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-[15px] leading-tight">Career Counselling</p>
                    <p className="text-white/70 text-[12px]">Online</p>
                  </div>
                  <div className="flex gap-3 text-white/80">
                    <Video className="h-4 w-4" />
                    <Phone className="h-4 w-4" />
                  </div>
                </div>
                <div className="bg-[#efeae2] p-4 relative min-h-[300px] flex flex-col gap-3 overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://user-images.githubusercontent.com/1507452/94031210-c0352900-fdb6-11ea-8007-98782a2d744b.png')] bg-repeat" />
                  {studentExperiences[0].content.map((msg, idx) => (
                    <div key={idx} className={`relative z-10 max-w-[85%] rounded-[10px] p-2.5 px-3 text-[14px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${msg.isSender ? 'bg-[#d9fdd3] self-end rounded-tr-none' : 'bg-white self-start rounded-tl-none'}`}>
                      <p className="text-[#111b21] mb-1">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-[10px] text-[#667781]">{msg.time}</span>
                        {msg.isSender && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-[24px] overflow-hidden bg-black shadow-soft group cursor-pointer relative aspect-[9/16]">
                <CustomVideoPlayer 
                  src="/Hospitaladmin.mp4"
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>

            {/* Render Sanity Testimonials if available, otherwise fallback */}
            {displayTestimonials.length > 0 ? (
              <ScrollReveal delay={0.3}>
                <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex gap-1 mb-4">
                    {[...Array(displayTestimonials[0].rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#48bb78] text-[#48bb78]" />
                    ))}
                  </div>
                  <p className="text-[#4A5568] text-[16px] leading-[1.6] mb-6 line-clamp-6">
                    &quot;{displayTestimonials[0].review}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                      {displayTestimonials[0].studentPhotoUrl ? (
                        <img src={displayTestimonials[0].studentPhotoUrl} alt={displayTestimonials[0].studentName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-black text-[15px] block">{displayTestimonials[0].studentName}</span>
                      <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{displayTestimonials[0].courseTitle} • {displayTestimonials[0].year}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal delay={0.3}>
                <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#48bb78] text-[#48bb78]" />
                    ))}
                  </div>
                  <p className="text-[#4A5568] text-[16px] leading-[1.6] mb-6">
                    &quot;The trainers are amazing. They explain everything from scratch and never get tired of questions. You can tell they genuinely care about the students and our success.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image src="/gmail.webp" alt="Support" width={40} height={40} className="object-cover" />
                    </div>
                    <span className="font-bold text-black text-[16px]">Ejas</span>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
            <ScrollReveal delay={0.15}>
              <div className="rounded-[24px] overflow-hidden bg-black shadow-soft group cursor-pointer relative aspect-[9/16]">
                <CustomVideoPlayer 
                  src="/medicalcoding.mp4"
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              {/* WhatsApp Style Chat Card */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-soft border border-slate-200 hover:shadow-2xl transition-all duration-500 cursor-default group">
                <div className="bg-[#075e54] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/20 border border-white/10">
                    <Image src="/edusource-mini-icon.webp" alt="Support" width={40} height={40} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-[15px] leading-tight">Program Guidance</p>
                    <p className="text-white/70 text-[12px]">Online</p>
                  </div>
                  <div className="flex gap-3 text-white/80">
                    <Video className="h-4 w-4" />
                    <Phone className="h-4 w-4" />
                  </div>
                </div>
                <div className="bg-[#efeae2] p-4 relative min-h-[300px] flex flex-col gap-3 overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://user-images.githubusercontent.com/1507452/94031210-c0352900-fdb6-11ea-8007-98782a2d744b.png')] bg-repeat" />
                  {studentExperiences[1].content.map((msg, idx) => (
                    <div key={idx} className={`relative z-10 max-w-[85%] rounded-[10px] p-2.5 px-3 text-[14px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${msg.isSender ? 'bg-[#d9fdd3] self-end rounded-tr-none' : 'bg-white self-start rounded-tl-none'}`}>
                      <p className="text-[#111b21] mb-1">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-[10px] text-[#667781]">{msg.time}</span>
                        {msg.isSender && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {displayTestimonials.length > 1 ? (
              <ScrollReveal delay={0.35}>
                <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex gap-1 mb-4">
                    {[...Array(displayTestimonials[1].rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#48bb78] text-[#48bb78]" />
                    ))}
                  </div>
                  <p className="text-[#4A5568] text-[16px] leading-[1.6] mb-6 line-clamp-6">
                    &quot;{displayTestimonials[1].review}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                      {displayTestimonials[1].studentPhotoUrl ? (
                        <img src={displayTestimonials[1].studentPhotoUrl} alt={displayTestimonials[1].studentName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-black text-[15px] block">{displayTestimonials[1].studentName}</span>
                      <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{displayTestimonials[1].courseTitle} • {displayTestimonials[1].year}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal delay={0.35}>
                <div className="rounded-[24px] overflow-hidden bg-black shadow-soft group cursor-pointer relative aspect-[9/16]">
                  <CustomVideoPlayer 
                    src="/skill.mp4"
                    autoPlay
                    muted
                    loop
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">
            <ScrollReveal delay={0.2}>
              <div className="rounded-[24px] overflow-hidden bg-black shadow-soft group cursor-pointer relative aspect-[9/16]">
                <CustomVideoPlayer 
                  src="/German.mp4"
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              {/* WhatsApp Style Chat Card */}
              <div className="bg-white rounded-[24px] overflow-hidden shadow-soft border border-slate-200 hover:shadow-2xl transition-all duration-500 cursor-default group">
                <div className="bg-[#075e54] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/20 border border-white/10">
                    <Image src="/edusource-mini-icon.webp" alt="Support" width={40} height={40} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-[15px] leading-tight">Admissions Support</p>
                    <p className="text-white/70 text-[12px]">Online</p>
                  </div>
                  <div className="flex gap-3 text-white/80">
                    <Video className="h-4 w-4" />
                    <Phone className="h-4 w-4" />
                  </div>
                </div>
                <div className="bg-[#efeae2] p-4 relative min-h-[300px] flex flex-col gap-3 overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://user-images.githubusercontent.com/1507452/94031210-c0352900-fdb6-11ea-8007-98782a2d744b.png')] bg-repeat" />
                  {studentExperiences[2].content.map((msg, idx) => (
                    <div key={idx} className={`relative z-10 max-w-[85%] rounded-[10px] p-2.5 px-3 text-[14px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${msg.isSender ? 'bg-[#d9fdd3] self-end rounded-tr-none' : 'bg-white self-start rounded-tl-none'}`}>
                      <p className="text-[#111b21] mb-1">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-[10px] text-[#667781]">{msg.time}</span>
                        {msg.isSender && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {displayTestimonials.length > 2 ? (
              <ScrollReveal delay={0.4}>
                <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex gap-1 mb-4">
                    {[...Array(displayTestimonials[2].rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#48bb78] text-[#48bb78]" />
                    ))}
                  </div>
                  <p className="text-[#4A5568] text-[16px] leading-[1.6] mb-6 line-clamp-6">
                    &quot;{displayTestimonials[2].review}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                      {displayTestimonials[2].studentPhotoUrl ? (
                        <img src={displayTestimonials[2].studentPhotoUrl} alt={displayTestimonials[2].studentName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-black text-[15px] block">{displayTestimonials[2].studentName}</span>
                      <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{displayTestimonials[2].courseTitle} • {displayTestimonials[2].year}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal delay={0.4}>
                <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#48bb78] text-[#48bb78]" />
                    ))}
                  </div>
                  <p className="text-[#4A5568] text-[16px] leading-[1.6] mb-6">
                    &quot;I enjoyed my classes a lot in this college. The teachers taught very well and made learning easy. They cleared all our doubts and gave good notes. The classroom was comfortable . Group work and activities made the class more fun. I felt happy and confident in class every day.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image src="/gmail.webp" alt="Interview" width={40} height={40} className="object-cover" />
                    </div>
                    <span className="font-bold text-black text-[16px]">Vrindhavinod</span>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
