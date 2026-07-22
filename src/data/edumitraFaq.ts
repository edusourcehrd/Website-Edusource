export interface FAQItem {
  id: string;
  keywords: string[];
  answer: string;
  relatedQuestions?: string[];
}

export const EDUSOURCE_CONTACT = {
  phone1: "+91 96334 92021",
  phone2: "+91 98959 53159",
  location: "Madannada, Kollam, Kerala"
};

const FALLBACK_ANSWER = `I’m not fully sure about that. Please contact Edusource directly at ${EDUSOURCE_CONTACT.phone1} or ${EDUSOURCE_CONTACT.phone2} for the latest accurate details.`;

export const edumitraFaq: FAQItem[] = [
  // General & Contact
  {
    id: 'about',
    keywords: ['what is edusource', 'about edusource', 'hrd centre'],
    answer: "Edusource HRD Centre is a premier skill training institute in Kollam, specializing in job-oriented courses like Hospital Administration, Logistics, German Language, and more. We focus on providing quality education and professional guidance for students.",
    relatedQuestions: ['Courses Available', 'Location', 'Contact Details']
  },
  {
    id: 'location',
    keywords: ['location', 'where is', 'address', 'place', 'kollam', 'madannada'],
    answer: `Edusource is located at Madannada, Kollam, Kerala. You are welcome to visit our centre directly for admission enquiries and career guidance.`,
    relatedQuestions: ['Contact Details', 'Courses Available']
  },
  {
    id: 'contact',
    keywords: ['contact', 'phone', 'call', 'number', 'mobile', 'whatsapp', 'reach'],
    answer: `You can contact Edusource HRD Centre at ${EDUSOURCE_CONTACT.phone1} or ${EDUSOURCE_CONTACT.phone2}. Our team is ready to help you with any questions.`,
    relatedQuestions: ['Location', 'Admission Process']
  },
  {
    id: 'courses',
    keywords: ['course', 'courses', 'available', 'study', 'list', 'what can i learn'],
    answer: "Available courses at Edusource: 1. Diploma in Hospital Administration (6 months) 2. Logistics & Shipping Management (6 months) 3. German Language Training (A1 to B2) 4. Medical Coding 5. Medical Transcription 6. HR Management.",
    relatedQuestions: ['Hospital Administration', 'German Language', 'Logistics Course']
  },
  {
    id: 'learning-mode',
    keywords: ['online', 'offline', 'hybrid', 'mode', 'class'],
    answer: "We offer flexible learning modes including offline classes at our Kollam centre and online/hybrid options for selected courses. Please contact us to check the availability for your chosen course.",
    relatedQuestions: ['Class Timing', 'Contact Details']
  },
  {
    id: 'admission',
    keywords: ['admission', 'apply', 'join', 'process', 'enroll', 'registration'],
    answer: "The admission process is simple. You can visit our centre at Madannada, Kollam with your documents or contact us at +91 96334 92021 to start the process.",
    relatedQuestions: ['Who can join', 'Contact Details']
  },
  {
    id: 'eligibility',
    keywords: ['who can join', 'plus two', 'degree', 'professional', 'qualification', 'eligibility', 'after 12th'],
    answer: "Many of our courses can be joined after Plus Two (12th). We also have advanced programs for degree students and working professionals. Classes are beginner-friendly and focus on practical skills.",
    relatedQuestions: ['Plus Two courses', 'Degree courses']
  },
  {
    id: 'timing',
    keywords: ['timing', 'batch', 'time', 'weekend', 'morning', 'evening'],
    answer: "We have various batches including morning and evening sessions. For specific batch timings and weekend class availability, please contact Edusource directly at +91 96334 92021.",
    relatedQuestions: ['Contact Details', 'Duration']
  },

  // Hospital Administration
  {
    id: 'hospital-admin',
    keywords: ['hospital administration', 'dha', 'hospital course', 'healthcare management'],
    answer: "Our Diploma in Hospital Administration (DHA) is a 6-month government-approved course. It is ideal for students (especially after Plus Two) interested in healthcare administration and hospital management.",
    relatedQuestions: ['DHA Duration', 'DHA Career', 'DHA Certificate']
  },
  {
    id: 'hospital-admin-details',
    keywords: ['hospital administration duration', 'how long hospital', 'dha months'],
    answer: "The Diploma in Hospital Administration is a 6-month course. It covers hospital organization, patient care management, and administrative basics.",
    relatedQuestions: ['Hospital Administration jobs', 'DHA Eligibility']
  },
  {
    id: 'hospital-admin-career',
    keywords: ['hospital administration career', 'hospital jobs', 'hospital administration good'],
    answer: "Hospital Administration is an excellent career choice with opportunities in hospitals, clinics, and healthcare facilities. It is very suitable for students after Plus Two who want to enter the healthcare field.",
    relatedQuestions: ['Medical or non-medical', 'Science background']
  },
  {
    id: 'hospital-admin-science',
    keywords: ['science background', 'non-medical', 'hospital medical'],
    answer: "The Hospital Administration course is administrative in nature. While it's in the healthcare sector, a science background is not strictly mandatory for the diploma program.",
    relatedQuestions: ['Who can join', 'Hospital Administration']
  },

  // Logistics
  {
    id: 'logistics',
    keywords: ['logistics', 'shipping', 'supply chain', 'port', 'warehouse'],
    answer: "The Logistics & Shipping Management course is a 6-month program focusing on supply chain, port operations, and international trade. It is a great choice for those seeking careers in global logistics.",
    relatedQuestions: ['Logistics Duration', 'Logistics Career', 'Logistics in Kerala']
  },
  {
    id: 'logistics-details',
    keywords: ['logistics duration', 'how long logistics', 'logistics months'],
    answer: "Our Logistics & Shipping Management course has a duration of 6 months. It provides a solid foundation in the logistics and shipping industry.",
    relatedQuestions: ['Logistics after Plus Two', 'Logistics Career']
  },

  // German
  {
    id: 'german',
    keywords: ['german', 'language', 'deutsch', 'a1', 'a2', 'b1', 'b2'],
    answer: "We provide German Language Training from A1 to B2 levels. Our training includes intensive preparation for Goethe and ÖSD exams, focusing on all four language skills: speaking, listening, reading, and writing.",
    relatedQuestions: ['Goethe preparation', 'German for Germany', 'German online']
  },
  {
    id: 'german-purpose',
    keywords: ['germany', 'ausbildung', 'study in germany', 'german useful'],
    answer: "German language skills are essential for students planning higher studies, Ausbildung, or job opportunities in Germany. We help you achieve the required proficiency levels (A1 to B2).",
    relatedQuestions: ['German levels', 'German duration']
  },
  {
    id: 'german-beginner',
    keywords: ['german beginner', 'german hard', 'german start'],
    answer: "Beginners are very welcome! We start from A1 level. While learning a new language takes effort, our expert trainers make German easy and interactive with plenty of speaking practice.",
    relatedQuestions: ['German A1', 'German online']
  },

  // Medical Coding & Transcription
  {
    id: 'medical-coding',
    keywords: ['medical coding', 'coding course', 'healthcare documentation'],
    answer: "Medical Coding is a specialized course for those interested in healthcare documentation and coding career paths. It is highly valued in the healthcare IT and billing sectors.",
    relatedQuestions: ['Medical Coding career', 'Medical Transcription']
  },
  {
    id: 'medical-transcription',
    keywords: ['medical transcription', 'transcription course', 'typing'],
    answer: "Medical Transcription focuses on healthcare documentation and transcription basics. It involves converting voice reports into written format. Good typing skills and attention to detail are helpful.",
    relatedQuestions: ['Medical Coding', 'Medical Transcription career']
  },

  // HR Management
  {
    id: 'hr-management',
    keywords: ['hr management', 'human resource', 'hrm', 'recruitment'],
    answer: "Our HR Management course covers HR basics, recruitment, employee management, and workplace administration. It's designed for those looking to build a career in management.",
    relatedQuestions: ['HR Career', 'HR Certificate']
  },

  // Policies & Specifics (Safety)
  {
    id: 'placement',
    keywords: ['placement', 'job guarantee', 'guaranteed job', 'work'],
    answer: "Edusource may provide training guidance and support, but job placement should not be considered guaranteed. Please contact the institute for current placement support details.",
    relatedQuestions: ['Courses Available', 'Contact Details']
  },
  {
    id: 'fees',
    keywords: ['fee', 'fees', 'cost', 'price', 'how much'],
    answer: "Fees may change depending on course, batch, and offers. Please contact Edusource directly at +91 96334 92021 or +91 98959 53159 for the latest fee details.",
    relatedQuestions: ['Contact Details', 'Admission Process']
  },
  {
    id: 'certificate',
    keywords: ['certificate', 'certification', 'government approved', 'diploma'],
    answer: "Selected Edusource courses mention government approved certification. Please contact the institute to confirm the latest certificate details for your chosen course.",
    relatedQuestions: ['Hospital Administration', 'Logistics Course']
  },
  {
    id: 'no-links',
    keywords: ['link', 'website', 'click here', 'open page', 'send link'],
    answer: "I can’t open or provide clickable links here. Please visit the Edusource website manually or contact Edusource directly for help.",
    relatedQuestions: ['Contact Details']
  },

  // Student Guidance
  {
    id: 'guidance-plus-two',
    keywords: ['best course after plus two', 'after 12th', 'plus two choice'],
    answer: "After Plus Two, Hospital Administration and Logistics are very popular choices for a fast career start. German language is also great if you are planning to go abroad.",
    relatedQuestions: ['Hospital Administration', 'Logistics Course', 'German Language']
  },
  {
    id: 'guidance-healthcare',
    keywords: ['best course for healthcare', 'medical field'],
    answer: "For the healthcare field, Diploma in Hospital Administration and Medical Coding are excellent choices.",
    relatedQuestions: ['Hospital Administration', 'Medical Coding']
  },
  {
    id: 'guidance-abroad',
    keywords: ['best course for abroad', 'going abroad', 'foreign'],
    answer: "German Language training is best for those looking for opportunities in Germany. Logistics and Hospital Administration also have global relevance.",
    relatedQuestions: ['German Language', 'Logistics Course']
  },
  {
    id: 'visit',
    keywords: ['visit', 'can i come', 'parents'],
    answer: "Yes, you and your parents are welcome to visit Edusource HRD Centre at Madannada, Kollam. Direct interaction helps in choosing the right course for your future.",
    relatedQuestions: ['Location', 'Contact Details']
  }
];

export const getLocalResponse = (message: string): { answer: string; related?: string[] } => {
  const lowerMsg = message.toLowerCase().trim();
  
  // Specific checks for policies to override general matching if needed
  if (lowerMsg.includes('placement') || lowerMsg.includes('job guarantee')) {
    const item = edumitraFaq.find(i => i.id === 'placement');
    return { answer: item!.answer, related: item!.relatedQuestions };
  }
  if (lowerMsg.includes('fee')) {
    const item = edumitraFaq.find(i => i.id === 'fees');
    return { answer: item!.answer, related: item!.relatedQuestions };
  }
  if (lowerMsg.includes('link') || lowerMsg.includes('click') || lowerMsg.includes('website')) {
    const item = edumitraFaq.find(i => i.id === 'no-links');
    return { answer: item!.answer, related: item!.relatedQuestions };
  }

  // Malayalam/Manglish style matching (simple manual overrides or additions)
  if (lowerMsg.includes('ethra month') || lowerMsg.includes('duration')) {
    if (lowerMsg.includes('hospital')) {
      return { 
        answer: "Hospital Administration course duration 6 months aanu. Latest batch details ariyan Edusource-ne contact cheyyuka: +91 96334 92021.",
        related: ['Hospital Administration', 'Contact Details']
      };
    }
    if (lowerMsg.includes('logistics')) {
      return { 
        answer: "Logistics course duration 6 months aanu. More details inu contact: +91 96334 92021.",
        related: ['Logistics Course', 'Contact Details']
      };
    }
  }

  if (lowerMsg.includes('placement guarantee undo') || lowerMsg.includes('job undo')) {
    return {
      answer: "Job placement guarantee enn parayan pattilla. Training support and guidance details current batch anusarich vary cheyyam. Latest details inu Edusource directly contact cheyyuka.",
      related: ['Contact Details', 'Courses Available']
    };
  }

  if (lowerMsg.includes('fees ethra') || (lowerMsg.includes('fee') && lowerMsg.includes('ethra'))) {
    return {
      answer: "Fees course, batch, offers enna anusarich change aavum. Latest fee details inu +91 96334 92021 or +91 98959 53159 contact cheyyuka.",
      related: ['Contact Details', 'Courses Available']
    };
  }

  // Keyword matching logic
  const words = lowerMsg.replace(/[^\w\s]/g, '').split(/\s+/);
  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of edumitraFaq) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (lowerMsg.includes(keyword.toLowerCase())) {
        score += 5; // Phrase match
      }
      const kwWords = keyword.toLowerCase().split(/\s+/);
      for (const kw of kwWords) {
        if (words.includes(kw)) {
          score += 1;
        }
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 1) {
    return { answer: bestMatch.answer, related: bestMatch.relatedQuestions };
  }

  return {
    answer: FALLBACK_ANSWER,
    related: ['Courses Available', 'Contact Details', 'Hospital Administration', 'German Language']
  };
};
