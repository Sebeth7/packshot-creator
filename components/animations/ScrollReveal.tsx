'use client';

import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  offset?: number;
  scale?: boolean;
}

export default function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
