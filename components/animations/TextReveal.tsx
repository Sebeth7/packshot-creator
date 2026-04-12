'use client';

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
}: TextRevealProps) {
  return <Tag className={className}>{children}</Tag>;
}
