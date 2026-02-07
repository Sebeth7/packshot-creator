"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function StaggerContainer({
  children,
  stagger = 0.1,
  delay = 0,
  className,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

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
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
