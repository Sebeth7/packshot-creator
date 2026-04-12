"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInViewProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function FadeInView({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  once = true,
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const el = ref.current;
    if (!el) return;

    // If already in viewport at mount, show immediately (no animation)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    // Below fold: observe for scroll-triggered animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const transforms: Record<Direction, string> = {
    up: "translateY(24px)",
    down: "translateY(-24px)",
    left: "translateX(24px)",
    right: "translateX(-24px)",
    none: "none",
  };

  // SSR: visible, no animation styles
  const style: React.CSSProperties = isMounted
    ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transforms[direction],
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      }
    : {};

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
