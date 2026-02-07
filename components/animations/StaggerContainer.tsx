"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
