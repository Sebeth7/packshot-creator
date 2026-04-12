"use client";

import type { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function StaggerContainer({
  children,
  className,
}: StaggerContainerProps) {
  return <div className={className}>{children}</div>;
}
