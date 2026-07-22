import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Toaster } from "@/components/ui/sonner";
import ChatbotWrapper from "@/components/ChatbotWrapper";
import { SITE_CONFIG } from "@/lib/site-config";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans-next",
  subsets: ["latin"],
  display: "swap",
});

const fontDisplay = Fraunces({
  variable: "--font-display-next",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = Geist_Mono({
  variable: "--font-mono-next",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Edusource HRD Centre, Kollam | Government-Approved Skill Training Institute",
    template: "%s | Edusource HRD Centre",
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "Education",
  applicationName: SITE_CONFIG.shortName,
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Edusource HRD Centre, Kollam | Government-Approved Skill Training Institute",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Edusource HRD Centre, Kollam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edusource HRD Centre, Kollam | Government-Approved Skill Training Institute",
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  icons: {
    icon: SITE_CONFIG.favicon,
    apple: SITE_CONFIG.favicon,
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="en">
      <head>
        <JsonLdScript data={[orgSchema, websiteSchema]} />
      </head>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
        <ChatbotWrapper />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
