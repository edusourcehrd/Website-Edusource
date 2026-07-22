import { SITE_CONFIG } from "./site-config";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "Organization", "LocalBusiness"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    alternateName: SITE_CONFIG.shortName,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: SITE_CONFIG.logo,
      width: 220,
      height: 60,
    },
    image: SITE_CONFIG.ogImage,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.contact.phoneRaw,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.locality,
      addressRegion: SITE_CONFIG.contact.address.region,
      postalCode: SITE_CONFIG.contact.address.postalCode,
      addressCountry: SITE_CONFIG.contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.contact.geo.latitude,
      longitude: SITE_CONFIG.contact.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.youtube,
    ],
    priceRange: "₹₹",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Government Approved Diploma",
    },
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((element, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: element.name,
      item: element.item.startsWith("http")
        ? element.item
        : `${SITE_CONFIG.url}${element.item}`,
    })),
  };
}

export function getCourseSchema(course: {
  title: string;
  description: string;
  slug: string;
  duration?: string;
  category?: string;
  certification?: string;
  careerFocus?: string;
  learningMode?: string;
  courseImageUrl?: string;
}) {
  const courseUrl = `${SITE_CONFIG.url}/courses/${course.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${courseUrl}/#course`,
      name: course.title,
      description: course.description,
      url: courseUrl,
      image: course.courseImageUrl || SITE_CONFIG.ogImage,
      provider: {
        "@type": "EducationalOrganization",
        name: SITE_CONFIG.name,
        sameAs: SITE_CONFIG.url,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: course.learningMode || "Blended",
        duration: course.duration || "P1Y",
        instructor: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
        },
      },
      educationalCredentialAwarded: course.certification || "Government Approved Diploma",
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      "@id": `${courseUrl}/#program`,
      name: course.title,
      description: course.description,
      url: courseUrl,
      provider: {
        "@type": "EducationalOrganization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      occupationalCategory: course.careerFocus || course.category || "Professional Training",
      educationalCredentialAwarded: course.certification || "Diploma",
      programPrerequisites: "Higher Secondary Education or Degree",
    },
  ];
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
}) {
  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const dateObj = new Date(post.date);
  const isoDate = !isNaN(dateObj.getTime())
    ? dateObj.toISOString()
    : new Date().toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    image: post.image || SITE_CONFIG.ogImage,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Person",
      name: post.author || SITE_CONFIG.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: SITE_CONFIG.logo,
      },
    },
  };
}

export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_CONFIG.url}/#contact-page`,
    url: `${SITE_CONFIG.url}/#contact`,
    name: "Contact Edusource HRD Centre",
    description: "Contact Edusource HRD Centre in Kollam for admission enquiries, course information, and student support.",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.contact.phoneRaw,
      email: SITE_CONFIG.contact.email,
      address: SITE_CONFIG.contact.address.fullAddress,
    },
  };
}
