import { 
  UserCheck, 
  Globe, 
  Briefcase, 
  FileText, 
  Truck, 
  Clock, 
  Brain,
  Stethoscope,
  Plane,
  Box,
  Layout,
  Mic,
  Users,
  Search,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  category: string;
  certification: string;
  careerFocus: string;
  learningMode: string;
  icon: LucideIcon;
  color: string;
  visualTheme: {
    primaryColor: string;
    accentColor: string;
    gradient: string;
    secondaryGradient: string;
  };
  overview: string[];
  whoIsItFor: string[];
  learningOutcomes: string[];
  modules: CourseModule[];
  careerOpportunities: string[];
  faqs: FAQItem[];
  video?: string;
}

export const courses: Course[] = [
  {
    id: 'hospital-admin',
    slug: 'hospital-administration',
    title: 'Diploma in Hospital Administration',
    shortDescription: 'Master healthcare operations and administration in modern hospitals.',
    fullDescription: 'Comprehensive training in managing hospital operations, healthcare systems, and patient care services with professional administrative excellence.',
    duration: '1 Year',
    category: 'Healthcare',
    certification: 'Government Approved Diploma',
    careerFocus: 'Hospital Administrator, Patient Service Manager, Healthcare Coordinator',
    learningMode: 'Online / Offline / Hybrid',
    icon: UserCheck,
    color: 'blue',
    video: '/2d-game/hospital-administration.mp4',
    visualTheme: {
      primaryColor: '#0056E0',
      accentColor: '#48BB78',
      gradient: 'from-blue-600 to-indigo-700',
      secondaryGradient: 'from-blue-50 to-white'
    },
    overview: [
      'Understanding modern hospital organizational structure',
      'Management of healthcare services and patient relations',
      'Healthcare laws, ethics, and quality standards',
      'Inventory and financial management in healthcare'
    ],
    whoIsItFor: [
      'Graduates looking for careers in healthcare management',
      'Healthcare professionals seeking administrative roles',
      'Individuals interested in hospital operations'
    ],
    learningOutcomes: [
      'Expertise in hospital workflow management',
      'Proficiency in patient record systems',
      'Strong understanding of healthcare regulatory compliance',
      'Professional communication in medical environments'
    ],
    modules: [
      {
        title: 'Introduction to Healthcare Systems',
        topics: ['Healthcare Industry Overview', 'Hospital Types and Functions', 'Patient Care Services']
      },
      {
        title: 'Hospital Operations Management',
        topics: ['Front Office Operations', 'Outpatient & Inpatient Services', 'Support Services Management']
      },
      {
        title: 'Healthcare Laws & Ethics',
        topics: ['Medical Jurisprudence', 'Patient Rights', 'Quality Assurance in Hospitals']
      }
    ],
    careerOpportunities: [
      'Hospital Manager',
      'Patient Relation Officer',
      'Health Records Manager',
      'Medical Superintendent Assistant'
    ],
    faqs: [
      {
        question: 'What is the eligibility for this course?',
        answer: 'Any graduate or individuals with 10+2 qualification interested in healthcare can apply.'
      },
      {
        question: 'Is this certificate government recognized?',
        answer: 'Yes, Edusource provides government-approved certifications for this program.'
      }
    ]
  },
  {
    id: 'german-language',
    slug: 'german-language-training',
    title: 'German Language Training (A1-B2)',
    shortDescription: 'Learn German from experts for international study and career opportunities.',
    fullDescription: 'Master the German language from basics to advanced levels with a focus on Goethe/ÖSD exam preparation and cultural integration.',
    duration: '180 Days',
    category: 'Languages',
    certification: 'A1, A2, B1, B2 Levels',
    careerFocus: 'International Careers, Higher Studies in Germany, Translation',
    learningMode: 'Online / Offline',
    icon: Globe,
    color: 'emerald',
    video: '/2d-game/german.mp4',
    visualTheme: {
      primaryColor: '#10B981',
      accentColor: '#F59E0B',
      gradient: 'from-emerald-600 to-teal-700',
      secondaryGradient: 'from-emerald-50 to-white'
    },
    overview: [
      'Intensive training for A1, A2, B1, and B2 levels',
      'Focus on speaking, listening, reading, and writing',
      'Exam-oriented preparation for Goethe and ÖSD',
      'Cultural orientation for living and working in Germany'
    ],
    whoIsItFor: [
      'Students planning to study in Germany',
      'Nurses and healthcare workers aiming for jobs in Germany',
      'Professionals seeking international career growth'
    ],
    learningOutcomes: [
      'Fluency in German conversation',
      'Ability to write professional emails and documents in German',
      'Strong grasp of German grammar and vocabulary',
      'Readiness for official language proficiency exams'
    ],
    modules: [
      {
        title: 'A1 - Beginner Level',
        topics: ['Basic Vocabulary', 'Greetings & Introduction', 'Present Tense Grammar']
      },
      {
        title: 'A2 - Elementary Level',
        topics: ['Past Tense', 'Daily Life Situations', 'Complex Sentence Structures']
      },
      {
        title: 'B1 - Intermediate Level',
        topics: ['Professional Communication', 'German Culture & History', 'Essay Writing']
      },
      {
        title: 'B2 - Upper Intermediate Level',
        topics: ['Advanced Grammar', 'Academic Reading', 'Persuasive Speaking']
      }
    ],
    careerOpportunities: [
      'Healthcare professional in Germany',
      'International Sales Executive',
      'Language Translator',
      'Customer Support for German clients'
    ],
    faqs: [
      {
        question: 'Do you provide job assistance in Germany?',
        answer: 'We provide complete language training and exam support which are the primary requirements for German job seeking.'
      },
      {
        question: 'Can I attend online classes?',
        answer: 'Yes, we offer flexible online batches for all language levels.'
      }
    ]
  },
  {
    id: 'logistics-shipping',
    slug: 'logistics-shipping-management',
    title: 'Logistics & Shipping Management',
    shortDescription: 'Navigate the global supply chain with expert logistics training.',
    fullDescription: 'Comprehensive training in supply chain management, shipping operations, warehouse management, and international trade.',
    duration: '6 Months',
    category: 'Logistics',
    certification: 'Diploma in Logistics',
    careerFocus: 'Supply Chain Executive, Logistics Coordinator, Port Operations',
    learningMode: 'Online / Offline',
    icon: Truck,
    color: 'amber',
    video: '/2d-game/logistics-shipping.mp4',
    visualTheme: {
      primaryColor: '#D97706',
      accentColor: '#3B82F6',
      gradient: 'from-amber-600 to-orange-700',
      secondaryGradient: 'from-amber-50 to-white'
    },
    overview: [
      'Fundamentals of supply chain and logistics',
      'Shipping and port management operations',
      'Warehouse and inventory management',
      'International trade and documentation'
    ],
    whoIsItFor: [
      'Individuals looking to enter the global trade industry',
      'Supply chain professionals seeking certification',
      'Business graduates interested in operations'
    ],
    learningOutcomes: [
      'Understanding of global shipping routes and methods',
      'Proficiency in logistics documentation',
      'Knowledge of warehouse optimization techniques',
      'Strategic thinking in supply chain management'
    ],
    modules: [
      {
        title: 'Supply Chain Fundamentals',
        topics: ['Introduction to Logistics', 'Global Trade Patterns', 'Supply Chain Strategy']
      },
      {
        title: 'Shipping Operations',
        topics: ['Ocean Freight Management', 'Port & Terminal Operations', 'Containerization']
      },
      {
        title: 'Warehouse & Inventory',
        topics: ['Inventory Control Systems', 'Warehouse Design', 'Distribution Management']
      }
    ],
    careerOpportunities: [
      'Logistics Coordinator',
      'Supply Chain Analyst',
      'Warehouse Operations Manager',
      'Shipping Executive'
    ],
    faqs: [
      {
        question: 'Are there career opportunities abroad?',
        answer: 'Logistics is a global industry with huge demand in GCC countries and Europe.'
      }
    ]
  },
  {
    id: 'medical-coding',
    slug: 'medical-coding',
    title: 'Medical Coding',
    shortDescription: 'Start a career in healthcare IT with professional medical coding.',
    fullDescription: 'Learn to translate medical procedures and diagnoses into universal alphanumeric codes for insurance and healthcare data management.',
    duration: '3 Months',
    category: 'Healthcare IT',
    certification: 'Professional Coding Certification',
    careerFocus: 'Medical Coder, Billing Specialist, Healthcare Data Analyst',
    learningMode: 'Online / Offline',
    icon: FileText,
    color: 'sky',
    video: '/2d-game/medical-coding.mp4',
    visualTheme: {
      primaryColor: '#0EA5E9',
      accentColor: '#818CF8',
      gradient: 'from-sky-600 to-blue-700',
      secondaryGradient: 'from-sky-50 to-white'
    },
    overview: [
      'Anatomy, physiology, and medical terminology',
      'ICD-10-CM, CPT, and HCPCS Level II coding',
      'Compliance and HIPAA regulations',
      'Healthcare reimbursement methodologies'
    ],
    whoIsItFor: [
      'Life science graduates',
      'Nurses and paramedical staff',
      'Individuals seeking remote healthcare jobs'
    ],
    learningOutcomes: [
      'Accurate coding of medical records',
      'In-depth knowledge of medical classification systems',
      'Understanding of insurance claim processes',
      'Proficiency in healthcare billing software'
    ],
    modules: [
      {
        title: 'Medical Foundations',
        topics: ['Human Anatomy', 'Physiology', 'Medical Terminology']
      },
      {
        title: 'Classification Systems',
        topics: ['ICD-10-CM Guidelines', 'CPT Coding', 'HCPCS Level II']
      },
      {
        title: 'Regulatory Environment',
        topics: ['HIPAA Compliance', 'Healthcare Reimbursement', 'Fraud and Abuse']
      }
    ],
    careerOpportunities: [
      'Certified Medical Coder',
      'Medical Billing Specialist',
      'Coding Auditor',
      'Health Information Manager'
    ],
    faqs: [
      {
        question: 'Do I need a medical background?',
        answer: 'While a life science background is helpful, our course covers the necessary medical foundations for everyone.'
      }
    ]
  },
  {
    id: 'medical-transcription',
    slug: 'medical-transcription',
    title: 'Medical Transcription',
    shortDescription: 'Convert medical dictations into professional healthcare records.',
    fullDescription: 'Develop skills in listening to and transcribing doctor dictations into accurate medical documents and patient records.',
    duration: '4 Months',
    category: 'Healthcare Support',
    certification: 'Diploma in Medical Transcription',
    careerFocus: 'Medical Transcriptionist, Healthcare Editor, Scribe',
    learningMode: 'Online / Offline',
    icon: Clock,
    color: 'rose',
    video: '/2d-game/medical-transcription.mp4',
    visualTheme: {
      primaryColor: '#E11D48',
      accentColor: '#FB7185',
      gradient: 'from-rose-600 to-red-700',
      secondaryGradient: 'from-rose-50 to-white'
    },
    overview: [
      'Medical language and terminology proficiency',
      'Transcribing medical reports and summaries',
      'Editing and proofreading for medical accuracy',
      'Voice-to-text technology and tools'
    ],
    whoIsItFor: [
      'Individuals with good listening and typing skills',
      'Home-based job seekers',
      'Healthcare administrative aspirants'
    ],
    learningOutcomes: [
      'Speed and accuracy in medical typing',
      'Understanding of various medical specialties',
      'Proficiency in transcription software',
      'High standards of medical document quality'
    ],
    modules: [
      {
        title: 'Language of Medicine',
        topics: ['Advanced Medical Terminology', 'Pharmacology Basics', 'Surgical Procedures']
      },
      {
        title: 'Transcription Skills',
        topics: ['Listening Practice', 'Typing Drills', 'Transcription Tools']
      },
      {
        title: 'Report Types',
        topics: ['Consultation Reports', 'Discharge Summaries', 'Operative Notes']
      }
    ],
    careerOpportunities: [
      'Medical Transcriptionist',
      'Medical Editor',
      'Quality Assurance Specialist',
      'Healthcare Virtual Assistant'
    ],
    faqs: [
      {
        question: 'Can I work from home after this course?',
        answer: 'Yes, medical transcription is one of the most popular work-from-home options in the healthcare support sector.'
      }
    ]
  },
  {
    id: 'hr-management',
    slug: 'hr-management',
    title: 'Advanced Diploma in HR Management',
    shortDescription: 'Strategic human resource management for modern organizations.',
    fullDescription: 'Comprehensive training in recruitment, employee relations, payroll management, and strategic HR leadership.',
    duration: '6 Months',
    category: 'Management',
    certification: 'Advanced Diploma in HRM',
    careerFocus: 'HR Executive, Recruiter, Training & Development Manager',
    learningMode: 'Online / Offline / Hybrid',
    icon: Users,
    color: 'violet',
    video: '/2d-game/hr-management.mp4',
    visualTheme: {
      primaryColor: '#7C3AED',
      accentColor: '#A78BFA',
      gradient: 'from-violet-600 to-purple-700',
      secondaryGradient: 'from-violet-50 to-white'
    },
    overview: [
      'Strategic HR planning and recruitment',
      'Employee engagement and relations',
      'Payroll administration and labour laws',
      'Performance management systems'
    ],
    whoIsItFor: [
      'Graduates aspiring for HR careers',
      'Working professionals seeking transition to HR',
      'Entrepreneurs and team leaders'
    ],
    learningOutcomes: [
      'Ability to design recruitment strategies',
      'Proficiency in payroll management software',
      'Strong understanding of labour laws',
      'Leadership and conflict resolution skills'
    ],
    modules: [
      {
        title: 'Core HR Functions',
        topics: ['Job Analysis & Design', 'Recruitment & Selection', 'Onboarding Process']
      },
      {
        title: 'Compensation & Benefits',
        topics: ['Payroll Management', 'Incentives & Rewards', 'Labour Laws']
      },
      {
        title: 'Strategic HRM',
        topics: ['Performance Appraisal', 'Training & Development', 'Organizational Culture']
      }
    ],
    careerOpportunities: [
      'HR Executive',
      'Recruitment Specialist',
      'Payroll Administrator',
      'Employee Relations Manager'
    ],
    faqs: [
      {
        question: 'Do you cover payroll software?',
        answer: 'Yes, we provide practical training on popular payroll management tools and Excel for HR.'
      }
    ]
  },
  {
    id: 'digital-marketing',
    slug: 'ai-digital-marketing',
    title: 'AI Integrated Digital Marketing',
    shortDescription: 'Next-gen marketing with AI tools and digital strategies.',
    fullDescription: 'Modern digital marketing course enhanced with AI tools for content creation, SEO, social media, and data-driven marketing.',
    duration: '3 Months',
    category: 'Marketing',
    certification: 'Professional Certification in Digital Marketing',
    careerFocus: 'Digital Marketer, SEO Specialist, Content Strategist',
    learningMode: 'Online / Offline',
    icon: Brain,
    color: 'orange',
    video: '/2d-game/digital-marketing.mp4',
    visualTheme: {
      primaryColor: '#EA580C',
      accentColor: '#FDBA74',
      gradient: 'from-orange-600 to-red-700',
      secondaryGradient: 'from-orange-50 to-white'
    },
    overview: [
      'Search Engine Optimization (SEO) & SEM',
      'Social Media Marketing (SMM) strategies',
      'AI tools for automated content & marketing',
      'Analytics and performance tracking'
    ],
    whoIsItFor: [
      'Business owners and entrepreneurs',
      'Students looking for creative careers',
      'Marketing professionals updating skills'
    ],
    learningOutcomes: [
      'Ability to run successful ad campaigns',
      'Mastery of SEO techniques',
      'Proficiency in AI marketing tools',
      'Strategic brand positioning skills'
    ],
    modules: [
      {
        title: 'Search Marketing',
        topics: ['Keyword Research', 'On-page & Off-page SEO', 'Google Ads']
      },
      {
        title: 'Social & Content',
        topics: ['Social Media Strategy', 'Content Marketing', 'Video Marketing']
      },
      {
        title: 'AI in Marketing',
        topics: ['AI for Copywriting', 'Automated Graphic Design', 'Data Analysis with AI']
      }
    ],
    careerOpportunities: [
      'Digital Marketing Executive',
      'SEO/SEM Specialist',
      'Social Media Manager',
      'Content Marketing Manager'
    ],
    faqs: [
      {
        question: 'Will I get practical experience?',
        answer: 'Yes, the course is 80% practical with live projects and tool-based training.'
      }
    ]
  }
];
