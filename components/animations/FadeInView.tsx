"use client";

import type { ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function FadeInView({ children, className }: FadeInViewProps) {
  return <div className={className}>{children}</div>;
}
