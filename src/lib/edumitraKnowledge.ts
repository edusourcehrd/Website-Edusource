export interface LocalResponse {
  answer: string;
  related: string[];
}

const INTENTS = [
  // --- RECOMMENDATION & REASONING ---
  {
    id: "course_recommendation_plus_two",
    keywords: ["after plus two", "plus two kazhinj", "plustwo", "12th", "plus 2", "plus-two"],
    answer: "If you like healthcare, Hospital Administration is a strong option. If you like shipping/business operations, Logistics is suitable. If you are planning Germany, German A1-B2 is useful. If you like online marketing/content, AI Digital Marketing is a good choice. For exact guidance, contact Edusource directly.",
    related: ["Hospital Administration", "Logistics", "German", "Contact"]
  },
  {
    id: "course_recommendation_healthcare_not_nursing",
    keywords: ["healthcare but not nursing", "not nursing", "health care non clinical", "without becoming doctor", "non-medical", "non medical", "without science"],
    answer: "Hospital Administration, Medical Coding, and Medical Transcription are suitable non-clinical healthcare-related options. Hospital Administration is more management/admin focused, while Medical Coding and Transcription are more documentation focused.",
    related: ["Hospital Administration", "Medical Coding", "Medical Transcription"]
  },
  {
    id: "course_recommendation_germany",
    keywords: ["go germany", "germany pokan", "abroad", "ausbildung", "germany study", "german useful"],
    answer: "German Language Training from A1 to B2 can help you build a strong language foundation for your career in Germany. Edusource provides focused training for Goethe and OSD exams. For details on visa and Ausbildung pathways, please contact our counselors.",
    related: ["German", "Fees", "Contact"]
  },
  {
    id: "salary_query",
    keywords: ["salary", "how much earn", "earn money", "income", "shambalam"],
    answer: "Salary depends on skills, location, company, experience, and the specific job role you secure after the course. Choose a field based on your interest and long-term career fit for the best growth.",
    related: ["Placement", "Contact"]
  },
  {
    id: "business_owner",
    keywords: ["business owner", "own business", "freelancer", "freelance"],
    answer: "For business owners and freelancers, AI Integrated Digital Marketing is highly recommended. It covers SEO, SEM, social media, and AI tools to help you grow your brand or offer services.",
    related: ["Digital Marketing", "Fees", "Contact"]
  },
  {
    id: "confused_student",
    keywords: ["confused", "help me choose", "confusion", "dont know what to study"],
    answer: "It's normal to be confused! \n- Like healthcare? Try Hospital Admin or Medical Coding.\n- Like management/shipping? Try Logistics or HR.\n- Want to go abroad? Try German.\n- Like computers/creative work? Try AI Digital Marketing.\nCall our counselor at +91 96334 92021 for free guidance.",
    related: ["Contact", "Hospital Administration", "Logistics"]
  },

  // --- PLACEMENT / JOB SUPPORT (ONLY TRIGGERED BY SPECIFIC JOB KEYWORDS) ---
  {
    id: "hospital_admin_placement",
    keywords: [
      "hospital administration placement", "hospital administration job", "hospital job",
      "hospital admin placement", "hospital admin job", "hospital internship"
    ],
    answer: "Edusource does not promise 100% guaranteed jobs. However, Hospital Administration students get hospital internship support, career guidance, and job alerts/referrals from hospitals when opportunities are available. The internship helps students gain practical hospital exposure, which is important for career growth.",
    related: ["Hospital Administration", "Contact", "Admission"]
  },
  {
    id: "logistics_placement",
    keywords: [
      "logistics placement", "logistics job", "shipping placement", "shipping job",
      "logistics and shipping placement", "logistics job guarantee"
    ],
    answer: "Edusource does not promise 100% guaranteed jobs. For Logistics & Shipping, students may receive job alerts and referral information from logistics/shipping companies when opportunities are available. The course focuses on practical logistics, shipping, documentation, and industry-ready knowledge.",
    related: ["Logistics", "Contact", "Admission"]
  },
  {
    id: "general_placement",
    keywords: [
      "placement", "job guarantee", "job after course", "internship", "job support", 
      "company job", "career after course", "job kittumo", "job offers", 
      "campus interview", "recruitment", "placement guarantee"
    ],
    answer: "Edusource does not promise 100% guaranteed jobs. Students may receive career guidance and job alert information when suitable opportunities are available. We focus on providing high-quality training and practical skills to make you industry-ready.",
    related: ["Certificate", "Contact", "Courses available"]
  },

  // --- POLICIES ---
  {
    id: "fees",
    keywords: ["fee", "cost", "how much to pay", "fees ethra aanu", "cash", "payment"],
    answer: "For the latest fee details, please contact Edusource directly because fees can change based on the course and batch. Call/WhatsApp +91 96334 92021 or +91 98959 53159.",
    related: ["Contact", "Admission", "Courses available"]
  },
  {
    id: "certificate",
    keywords: ["certificate", "government approved", "govt approved", "certification", "is certificate available", "certificate kittumo"],
    answer: "Selected courses mention government-approved or recognised certification pathways (like MSME, Rutronix, NSDC, NYP). Please contact Edusource directly to confirm the latest certificate details for your chosen course.",
    related: ["Placement", "Contact"]
  },

  // --- SPECIFIC COURSES ---
  {
    id: "hospital_admin",
    keywords: ["hospital administration", "hospital admin", "front office", "patient coordination", "billing"],
    answer: "Diploma in Hospital Administration is a practical healthcare administration course designed for students who want to work in hospital operations, front office, billing, patient coordination, insurance desk, medical records, and healthcare support roles. At Edusource HRD Centre, students get structured training, career guidance, and hospital internship support for practical exposure. For admission details, call/WhatsApp +91 96334 92021 or +91 98959 53159.",
    related: ["Fees", "Contact", "Medical Coding"]
  },
  {
    id: "logistics",
    keywords: ["logistics", "shipping management", "supply chain", "cargo", "port operations", "gulf job"],
    answer: "**Logistics & Shipping Management**\n- **Duration:** 6 months\n- **Focus:** Supply chain, warehouse, inventory, cargo, port operations, and documentation.\n- **Best for:** Students interested in business operations, logistics, and port/Gulf-related industries. Edusource provides practical industry-focused training to help you start your career in this sector.",
    related: ["HR Management", "Fees", "Contact"]
  },
  {
    id: "german",
    keywords: ["german", "a1", "a2", "b1", "b2", "language training", "goethe", "osd"],
    answer: "**German Language Training (A1-B2)**\n- **Focus:** Speaking, listening, reading, writing, and intensive exam preparation (Goethe/OSD).\n- **Best for:** Students planning for Higher Studies in Germany, Ausbildung, or professional work opportunities. We provide a solid foundation in the language and help you prepare for international certifications.",
    related: ["Fees", "Contact", "Duration"]
  },
  {
    id: "medical_coding",
    keywords: ["medical coding", "coding workflow", "medical terminology", "work from home"],
    answer: "**Medical Coding**\n- **Focus:** Healthcare documentation, medical terminology, coding workflow, and international coding standards.\n- **Best for:** Students interested in healthcare documentation and data management. This course prepares you for roles in medical records and healthcare IT sectors.",
    related: ["Medical Transcription", "Hospital Administration", "Fees"]
  },
  {
    id: "medical_transcription",
    keywords: ["medical transcription", "transcription", "typing"],
    answer: "**Medical Transcription**\n- **Focus:** Healthcare documentation, listening skills, medical terminology, and high-speed typing.\n- **Best for:** Students interested in healthcare records management. It is a detail-oriented course that builds essential skills for the healthcare documentation industry.",
    related: ["Medical Coding", "Hospital Administration", "Fees"]
  },
  {
    id: "hr_management",
    keywords: ["hr management", "human resource", "recruitment", "employee management"],
    answer: "**Human Resource Management**\n- **Focus:** Recruitment processes, employee management, workplace administration, and business communication.\n- **Best for:** Students interested in corporate management, office administration, and people-oriented roles.",
    related: ["Logistics", "Fees", "Contact"]
  },
  {
    id: "digital_marketing",
    keywords: ["digital marketing", "seo", "social media", "google ads", "ai tools", "content creators"],
    answer: "**AI Integrated Digital Marketing**\n- **Focus:** SEO, SEM, social media marketing, content strategy, AI tools, and data analytics.\n- **Best for:** Students, freelancers, business owners, and content creators looking to master the latest digital growth strategies.",
    related: ["Fees", "Contact", "Admission"]
  },

  // --- GENERAL ---
  {
    id: "course_list",
    keywords: ["course ethokke", "what courses", "courses available", "list of courses", "programs"],
    answer: "Edusource HRD Centre offers practical career-focused programs including Diploma in Hospital Administration, German Language Training A1–B2, Logistics & Shipping Management, Medical Coding, Medical Transcription, HR Management, and AI Integrated Digital Marketing.",
    related: ["Hospital Administration", "German A1-B2", "Logistics", "Fees"]
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "number", "email", "address", "where is", "evide aanu", "call", "whatsapp"],
    answer: "**Edusource HRD Centre**\n- **Location:** Minerva Complex, Madannada, Kollam, Kerala 691010\n- **Phone/WhatsApp:** +91 96334 92021, +91 98959 53159\n- **Email:** hrdcentrekollam@gmail.com\nYou can call or visit us for any course details or admission help.",
    related: ["Admission", "Courses available"]
  },
  {
    id: "enquiry_process",
    keywords: [
      "how to enquire", "how can i enquire", "how can i inquire", "how to inquire",
      "enquiry", "inquiry", "enquire", "inquire", "admission enquiry",
      "course enquiry", "how to contact", "how can i contact", "contact edusource",
      "admission help", "join cheyyan", "enquiry cheyyan", "engane enquire cheyyam",
      "engane contact cheyyam", "admission engane aanu", "course details ariyan", "details venam",
      "admission details", "need admission"
    ],
    answer: "You can enquire directly through Edusource HRD Centre. Call or WhatsApp: +91 96334 92021 or +91 98959 53159. You can also visit the centre at Minerva Complex, Madannada, Kollam, Kerala 691010. Tell them which course you are interested in, and they will guide you with details, schedule, fees, and admission steps.",
    related: ["Courses available", "Fees", "Contact"]
  },
  {
    id: "admission_process",
    keywords: ["admission", "apply", "how to join", "join cheyyamo", "enroll"],
    answer: "You can join by contacting our counselors directly at +91 96334 92021 or +91 98959 53159. You can also visit our centre at Madannada, Kollam. Tell us your interested course and we will guide you through the enrollment process.",
    related: ["Contact", "Fees", "Courses available"]
  },
  {
    id: "changing_info",
    keywords: ["exact fees", "current fees", "batch timing", "today's batch", "seat availability", "admission deadline", "last date"],
    answer: "Please contact Edusource directly for the latest accurate details regarding fees, batch timings, and seat availability. Call/WhatsApp +91 96334 92021 or +91 98959 53159.",
    related: ["Contact", "Admission"]
  },
  {
    id: "online_offline",
    keywords: ["online class", "offline class", "hybrid", "online mode"],
    answer: "We offer flexible offline and online classes for selected programs. Please contact us to check the available modes for your preferred course.",
    related: ["Contact", "Courses available"]
  },
  {
    id: "duration",
    keywords: ["duration", "how long", "time", "months", "days", "class timings"],
    answer: "Most of our diploma courses like Hospital Admin and Logistics are 6 months long. German language duration depends on the level (A1, A2, B1, B2). Contact us for exact batch timings.",
    related: ["Fees", "Contact"]
  },
  {
    id: "parents",
    keywords: ["parent", "father", "mother", "guardian"],
    answer: "Yes, parents and guardians are welcome to contact us or visit our centre at Madannada, Kollam for detailed course counselling.",
    related: ["Contact", "Location"]
  },
  {
    id: "what_is_edusource",
    keywords: ["what is edusource", "about edusource", "who are you"],
    answer: "Edusource HRD Centre is a leading skill training institute in Kollam, Kerala, offering job-oriented courses in healthcare, management, and languages with government-approved certification pathways.",
    related: ["Courses available", "Contact", "Certificate"]
  }
];

// Fallback response
const FALLBACK: LocalResponse = {
  answer: "I'm not fully sure about that. Please contact Edusource HRD Centre directly at +91 96334 92021 or +91 98959 53159 for the latest accurate details. They will be happy to help you!",
  related: ["Contact", "Courses available", "Fees"]
};

export function getLocalResponse(query: string): LocalResponse {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return FALLBACK;

  let bestMatch: { intent: any; score: number } = { intent: null, score: 0 };

  for (const intent of INTENTS) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (lowerQuery.includes(keyword)) {
        // Boost score for more specific placement-related matches if applicable
        let multiplier = 1;
        if (intent.id.includes('placement') && lowerQuery.includes('placement')) {
           multiplier = 2;
        }
        score += keyword.length * multiplier; 
      }
    }
    if (score > bestMatch.score) {
      bestMatch = { intent, score };
    }
  }

  // Final check: If it's a placement query but matched a general course intent, 
  // we might want to override if score is close, but the current scoring handles it 
  // if keywords are well-defined.

  if (bestMatch.score > 0 && bestMatch.intent) {
    return {
      answer: bestMatch.intent.answer,
      related: bestMatch.intent.related,
    };
  }

  return FALLBACK;
}
