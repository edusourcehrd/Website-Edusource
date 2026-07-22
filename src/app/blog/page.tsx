import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "Blog & Career Guidance Insights | Edusource HRD Kollam",
  description:
    "Read the latest articles, career tips, and insights on Hospital Administration, Medical Coding, HR Management, German Language, and Logistics from Edusource HRD Centre, Kollam.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: "Blog & Career Guidance Insights | Edusource HRD Kollam",
    description:
      "Read the latest articles, career tips, and insights on Hospital Administration, Medical Coding, HR Management, German Language, and Logistics.",
    url: `${SITE_CONFIG.url}/blog`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Edusource HRD Centre Knowledge Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Career Guidance Insights | Edusource HRD Kollam",
    description:
      "Read the latest articles and career guidance from Edusource HRD Centre, Kollam.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function BlogPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
  ]);

  return (
    <>
      <JsonLdScript data={breadcrumbSchema} />
      <BlogClient />
    </>
  );
}
