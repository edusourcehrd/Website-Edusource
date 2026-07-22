"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  /** Adds a subtle premium entrance effect */
  premium?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.8,
  premium = true,
}: ScrollRevealProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileDistance = distance * 0.5;
  const mobileDuration = duration * 0.6;

  const directionMap = {
    up: { y: isMobile ? mobileDistance : distance, x: 0 },
    down: { y: isMobile ? -mobileDistance : -distance, x: 0 },
    left: { x: isMobile ? mobileDistance : distance, y: 0 },
    right: { x: isMobile ? -mobileDistance : -distance, y: 0 },
  };

  const initial = {
    opacity: 0,
    ...directionMap[direction],
    scale: isMobile ? 1 : (premium ? 0.98 : 1),
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1,
      }}
      viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
      transition={{
        duration: isMobile ? mobileDuration : duration,
        delay: isMobile ? 0 : delay, // Kill delay on mobile for instant feel
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
