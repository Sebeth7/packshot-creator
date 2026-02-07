"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInViewProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export default function FadeInView({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  once = true,
  amount = 0.2,
}: FadeInViewProps) {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const offset = offsets[direction];

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + pre-mount: render visible plain div (no opacity:0 inline styles)
  if (shouldReduce || !mounted) {
    return <div className={className}>{children}</div>;
  }

  // After mount: motion.div with whileInView (manages its own IntersectionObserver)
  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
