import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Toaster } from "@/components/ui/sonner";
import ChatbotWrapper from "@/components/ChatbotWrapper";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans-next",
  subsets: ["latin"],
});

const fontDisplay = Fraunces({
  variable: "--font-display-next",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono-next",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edusource HRD Centre, Kollam | Government-Approved Skill Training Institute",
  description: "Edusource HRD Centre in Kollam offers government-approved, job-oriented training in Hospital Administration, HR Management, Logistics, Medical Coding, Medical Transcription, and German language.",
  icons: {
    icon: "/edusource-mini-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
