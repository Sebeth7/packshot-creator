'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

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
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: React.CSSProperties = isMounted
    ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : `translateY(${offset}px)`,
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }
    : {};

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
