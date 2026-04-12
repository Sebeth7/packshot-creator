"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface StaggerItemProps {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}

const transforms: Record<Direction, string> = {
  up: "translateY(24px)",
  down: "translateY(-24px)",
  left: "translateX(24px)",
  right: "translateX(-24px)",
  none: "none",
};

export default function StaggerItem({
  children,
  direction = "up",
  className,
}: StaggerItemProps) {
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
        transform: isVisible ? "none" : transforms[direction],
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }
    : {};

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
