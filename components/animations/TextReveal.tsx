'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  staggerSpeed?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  staggerSpeed = 0.04,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current) { setShouldAnimate(false); return; }
    const rect = ref.current.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    setShouldAnimate(!inViewport);
  }, []);

  // SSR + pre-mount + reduced motion + already in viewport: visible plain tag
  if (shouldAnimate === null || shouldReduce || !shouldAnimate) {
    return <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>{children}</Tag>;
  }

  // Below fold: word-by-word reveal on scroll
  const words = children.split(' ');

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: delay + i * staggerSpeed,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}
