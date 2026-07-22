"use client";

import React from "react";
import Image from "next/image";

type PhoneMockupProps = {
  frameSrc: string;
  frameAlt: string;
  videoSrc: string;
  className?: string;
};

/**
 * Single responsive phone mock:
 * - Frame + screen + video live under the same relative wrapper
 * - Screen bounds use percentage-based insets to stay aligned across breakpoints
 * - Animate/scale the wrapper to move everything as one unit
 */
export function PhoneMockup({
  frameSrc,
  frameAlt,
  videoSrc,
  className,
}: PhoneMockupProps) {
  return (
    <div
      className={[
        "relative isolate",
        // Keep the same overall proportions as the original asset (560x1000)
        "aspect-[560/1000]",
        className ?? "",
      ].join(" ")}
    >
      {/* Screen mask (clipped area) */}
      <div
        className="absolute z-10 overflow-hidden bg-white"
        style={{
          // These are measured from the existing layout but expressed as percentages
          top: "7.4%",
          left: "20.4%",
          width: "59.4%",
          height: "54%",
          // Radius should scale with the phone size (avoid fixed pixel magic numbers)
          borderRadius: "clamp(16px, 4.2vw, 28px)",
        }}
      >
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover bg-white"
        />
      </div>

      {/* Frame image (top layer) */}
      <Image
        src={frameSrc}
        alt={frameAlt}
        fill
        priority
        sizes="(min-width: 1024px) 560px, (min-width: 768px) 480px, (min-width: 640px) 360px, 300px"
        className="z-20 object-contain"
      />
    </div>
  );
}

