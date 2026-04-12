"use client";

import type { ReactNode } from "react";

interface StaggerItemProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function StaggerItem({ children, className }: StaggerItemProps) {
  return <div className={className}>{children}</div>;
}
