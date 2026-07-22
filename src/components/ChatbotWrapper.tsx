"use client";

import dynamic from "next/dynamic";

const EduMitraChatbot = dynamic(() => import("@/components/EduMitraChatbot"), {
  ssr: false,
});

export default function ChatbotWrapper() {
  return <EduMitraChatbot />;
}
