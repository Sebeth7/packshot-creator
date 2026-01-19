import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'gold' | 'turquoise' | 'green' | 'purple' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  gold: 'bg-accent-gold text-white',
  turquoise: 'bg-secondary-orbitvu text-white',
  green: 'bg-green-600 text-white',
  purple: 'bg-purple-600 text-white',
  default: 'bg-neutral-medium text-white',
};

export function Badge({
  variant = 'default',
  icon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'font-heading font-semibold text-sm px-4 py-2 rounded-full inline-flex items-center gap-2',
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;

// Export pre-configured badges
export function BadgeDistributor({ children }: { children: ReactNode }) {
  return (
    <Badge
      variant="gold"
      icon={
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      }
    >
      {children}
    </Badge>
  );
}

export function BadgeIAReady({ children }: { children: ReactNode }) {
  return (
    <Badge
      variant="purple"
      icon={
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      }
    >
      {children}
    </Badge>
  );
}

export function BadgeQualiopi({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Badge
      variant="green"
      className={className}
      icon={
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
    >
      {children}
    </Badge>
  );
}
