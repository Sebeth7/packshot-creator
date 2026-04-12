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
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(end);
  const wasInViewport = useRef(false);

  useEffect(() => {
    setMounted(true);
    // Only reset to 0 if element is below the fold (will animate later)
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      wasInViewport.current = inViewport;
      if (!inViewport) {
        setCount(0);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    if (!isInView) return;

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

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mounted, isInView, end, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
