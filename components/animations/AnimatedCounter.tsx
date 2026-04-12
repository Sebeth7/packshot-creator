'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  // Always start at `end` so SSR and initial render show the real value
  const [count, setCount] = useState(end);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || hasAnimated.current) return;
    if (!isInView) return;

    hasAnimated.current = true;

    // If element was already in viewport on first paint, skip animation
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const wasAboveFold = rect.top < window.innerHeight && rect.bottom > 0;
      if (wasAboveFold) {
        setCount(end);
        return;
      }
    }

    // Animate from 0 to end
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Brief reset to 0 then animate — only for below-fold elements
    setCount(0);
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
