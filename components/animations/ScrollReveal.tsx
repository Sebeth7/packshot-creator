'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  offset?: number;
  scale?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  offset = 60,
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current) { setShouldAnimate(false); return; }
    const rect = ref.current.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    setShouldAnimate(!inViewport);
  }, []);

  // SSR + pre-mount + reduced motion: render visible plain div
  if (shouldAnimate === null || shouldReduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  // Already in viewport at mount: no animation
  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  // Below fold: fade+slide on scroll into view
  return (
    <motion.div
      initial={{ opacity: 0, y: offset, ...(scale ? { scale: 0.96 } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
