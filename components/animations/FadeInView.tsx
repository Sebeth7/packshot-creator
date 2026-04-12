"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);

  useEffect(() => {
    if (!ref.current) { setShouldAnimate(false); return; }
    const rect = ref.current.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    // Elements already visible from SSR: no animation. Below fold: animate.
    setShouldAnimate(!inViewport);
  }, []);

  const offset = offsets[direction];

  // SSR + pre-mount + reduced motion: visible plain div
  if (shouldReduce || shouldAnimate === null) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  // Already in viewport at mount: render visible, no animation
  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  // Below fold: animate on scroll into view
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
