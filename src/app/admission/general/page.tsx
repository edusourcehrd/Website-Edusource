import type { Metadata } from "next";
import AdmissionClient from "../AdmissionClient";
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "General & Hospital Admin Admission 2026-27 | Edusource HRD Centre Kollam",
  description:
    "Apply online for government-approved Hospital Administration and Diploma courses at Edusource HRD Centre, Kollam.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/admission/general`,
  },
  openGraph: {
    title: "General & Hospital Admin Admission 2026-27 | Edusource HRD Centre Kollam",
    description:
      "Apply online for government-approved Hospital Administration and Diploma courses at Edusource HRD Centre, Kollam.",
    url: `${SITE_CONFIG.url}/admission/general`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Edusource HRD General Online Admission Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "General & Hospital Admin Admission 2026-27 | Edusource HRD Centre Kollam",
    description:
      "Apply online for government-approved Hospital Administration and Diploma courses at Edusource HRD Centre, Kollam.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function GeneralAdmissionPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Admission", item: "/admission" },
    { name: "General Admission", item: "/admission/general" },
  ]);

  return (
    <>
      <JsonLdScript data={breadcrumbSchema} />
      <AdmissionClient />
    </>
  );
}
