import type { Metadata } from "next";
import GermanAdmissionForm from "@/components/admission/GermanAdmissionForm";
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "German Language Training Online Admission 2026-27 | Edusource HRD Centre Kollam",
  description:
    "Apply online for German Language Training (A1, A2, B1, B2) at Edusource HRD Centre, Kollam. Government-recognized skill institute.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/admission/german`,
  },
  openGraph: {
    title: "German Language Training Online Admission 2026-27 | Edusource HRD Centre Kollam",
    description:
      "Apply online for German Language Training (A1, A2, B1, B2) at Edusource HRD Centre, Kollam.",
    url: `${SITE_CONFIG.url}/admission/german`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Edusource HRD German Language Training Admission Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "German Language Training Online Admission 2026-27 | Edusource HRD Centre Kollam",
    description:
      "Apply online for German Language Training (A1, A2, B1, B2) at Edusource HRD Centre, Kollam.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function GermanAdmissionPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Admission", item: "/admission" },
    { name: "German Admission", item: "/admission/german" },
  ]);

  return (
    <>
      <JsonLdScript data={breadcrumbSchema} />
      <GermanAdmissionForm />
    </>
  );
}
