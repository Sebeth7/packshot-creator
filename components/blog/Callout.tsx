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
    bg: 'bg-very-peri-50',
    border: 'border-l-4 border-future-dusk-500',
    text: 'text-future-dusk-700',
    icon: 'ℹ️',
  },
  warning: {
    bg: 'bg-accent-yellow/10',
    border: 'border-l-4 border-accent-yellow',
    text: 'text-accent-orange',
    icon: '⚠️',
  },
  success: {
    bg: 'bg-accent-green/10',
    border: 'border-l-4 border-accent-green',
    text: 'text-accent-green',
    icon: '✅',
  },
  alert: {
    bg: 'bg-accent-alert/10',
    border: 'border-l-4 border-accent-alert',
    text: 'text-accent-alert',
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
