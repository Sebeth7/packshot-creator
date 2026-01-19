import { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'success' | 'alert';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const calloutStyles: Record<CalloutType, { bg: string; border: string; text: string; icon: string }> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-l-4 border-secondary-orbitvu',
    text: 'text-primary-orbitvu',
    icon: 'ℹ️',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-l-4 border-accent-gold',
    text: 'text-yellow-900',
    icon: '⚠️',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-l-4 border-accent-success',
    text: 'text-green-900',
    icon: '✅',
  },
  alert: {
    bg: 'bg-red-50',
    border: 'border-l-4 border-accent-alert',
    text: 'text-red-900',
    icon: '🔴',
  },
};

export function Callout({ type = 'info', title, children, className = '' }: CalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div className={`${styles.bg} ${styles.border} p-4 rounded-r-lg my-6 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{styles.icon}</span>
          <h4 className={`font-bold ${styles.text} text-base m-0`}>{title}</h4>
        </div>
      )}
      <div className={`${styles.text} prose prose-sm max-w-none`}>
        {children}
      </div>
    </div>
  );
}
