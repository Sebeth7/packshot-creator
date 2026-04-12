'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

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
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.4], [offset, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.4], [0.96, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + pre-mount + reduced motion: render visible plain div
  if (!mounted || shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        ...(scale ? { scale: scaleValue } : {}),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
