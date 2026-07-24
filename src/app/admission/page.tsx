import type { Metadata } from "next";
import CourseSelection from "@/components/admission/CourseSelection";
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "Online Admission 2026-27 | Edusource HRD Centre Kollam",
  description:
    "Apply online for government-approved diploma courses and German Language training at Edusource HRD Centre, Kollam.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/admission`,
  },
  openGraph: {
    title: "Online Admission 2026-27 | Edusource HRD Centre Kollam",
    description:
      "Apply online for government-approved diploma courses and German Language training at Edusource HRD Centre, Kollam.",
    url: `${SITE_CONFIG.url}/admission`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Edusource HRD Online Admission Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Admission 2026-27 | Edusource HRD Centre Kollam",
    description:
      "Apply online for government-approved diploma courses and German Language training at Edusource HRD Centre, Kollam.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function AdmissionPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Admission", item: "/admission" },
  ]);

  return (
    <>
      <JsonLdScript data={breadcrumbSchema} />
      <CourseSelection />
    </>
  );
}
