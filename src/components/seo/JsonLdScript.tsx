import React from "react";

interface JsonLdScriptProps {
  data: Record<string, unknown> | Array<Record<string, unknown>> | null;
}

export default function JsonLdScript({ data }: JsonLdScriptProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
