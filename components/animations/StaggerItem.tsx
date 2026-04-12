"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface StaggerItemProps {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export default function StaggerItem({
  children,
  direction = "up",
  className,
}: StaggerItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);
  const shouldReduce = useReducedMotion();
  const offset = offsets[direction];

  useEffect(() => {
    if (!ref.current) { setShouldAnimate(false); return; }
    const rect = ref.current.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    setShouldAnimate(!inViewport);
  }, []);

  // SSR + pre-mount + reduced motion + in viewport: visible plain div
  if (shouldAnimate === null || shouldReduce || !shouldAnimate) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  // Below fold: animate on scroll
  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
