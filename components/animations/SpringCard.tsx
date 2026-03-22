'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SpringCardProps {
  children: ReactNode;
  className?: string;
  hoverY?: number;
  hoverScale?: number;
}

export default function SpringCard({
  children,
  className = '',
  hoverY = -4,
  hoverScale = 1.01,
}: SpringCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        y: hoverY,
        scale: hoverScale,
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
