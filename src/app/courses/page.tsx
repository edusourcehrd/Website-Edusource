import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "Professional Diploma Courses & Skill Training | Edusource HRD Kollam",
  description:
    "Explore government-approved diploma courses at Edusource HRD Centre, Kollam: Hospital Administration, German Language, HR Management, Medical Coding, Logistics & Medical Transcription.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/courses`,
  },
  openGraph: {
    title: "Professional Diploma Courses & Skill Training | Edusource HRD Kollam",
    description:
      "Explore government-approved diploma courses at Edusource HRD Centre, Kollam: Hospital Administration, German Language, HR Management, Medical Coding, Logistics & Medical Transcription.",
    url: `${SITE_CONFIG.url}/courses`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Edusource HRD Professional Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Diploma Courses & Skill Training | Edusource HRD Kollam",
    description:
      "Explore government-approved diploma courses at Edusource HRD Centre, Kollam.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function CoursesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Courses", item: "/courses" },
  ]);

  return (
    <>
      <JsonLdScript data={breadcrumbSchema} />
      <CoursesClient />
    </>
  );
}
