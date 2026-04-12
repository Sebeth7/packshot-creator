"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";

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
  const [mounted, setMounted] = useState(false);
  const shouldReduce = useReducedMotion();
  const offset = offsets[direction];

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + pre-mount + reduced motion: render visible plain div
  if (!mounted || shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0, 0, 0.2, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
