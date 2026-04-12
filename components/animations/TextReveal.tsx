'use client';

import { useRef, useState, useEffect } from 'react';

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
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
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
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const style: React.CSSProperties = isMounted
    ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }
    : {};

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={style}>
      {children}
    </Tag>
  );
}
