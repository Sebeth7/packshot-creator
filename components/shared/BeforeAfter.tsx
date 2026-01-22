import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface BeforeAfterCase {
  before: {
    src: string;
    alt: string;
  };
  after: {
    src: string;
    alt: string;
  };
  title: string;
  description?: string;
  sector?: string;
}

interface BeforeAfterProps {
  case: BeforeAfterCase;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export default function BeforeAfter({
  case: caseData,
  layout = 'horizontal',
  className,
}: BeforeAfterProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <div className={cn('bg-white rounded-xl shadow-lg overflow-hidden', className)}>
      {/* Images */}
      <div
        className={cn(
          'grid gap-1',
          isHorizontal ? 'grid-cols-2' : 'grid-cols-1'
        )}
      >
        {/* Before */}
        <div className="relative h-64 md:h-80 bg-neutral-lighter overflow-hidden group">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-neutral-dark text-white text-xs font-heading font-semibold px-3 py-1 rounded-full">
              Avant
            </span>
          </div>
          <Image
            src={caseData.before.src}
            alt={caseData.before.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* After */}
        <div className="relative h-64 md:h-80 bg-neutral-lighter overflow-hidden group">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary-orbitvu text-white text-xs font-heading font-semibold px-3 py-1 rounded-full">
              Après BlendAI
            </span>
          </div>
          <Image
            src={caseData.after.src}
            alt={caseData.after.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        {caseData.sector && (
          <span className="text-xs font-heading font-semibold text-secondary-orbitvu uppercase tracking-wide">
            {caseData.sector}
          </span>
        )}

        <h3 className="text-lg font-heading font-bold text-neutral-dark">
          {caseData.title}
        </h3>

        {caseData.description && (
          <p className="text-sm text-neutral-medium">
            {caseData.description}
          </p>
        )}
      </div>
    </div>
  );
}

// Grid component for multiple cases
interface BeforeAfterGridProps {
  cases: BeforeAfterCase[];
  columns?: 2 | 3;
  className?: string;
}

export function BeforeAfterGrid({
  cases,
  columns = 2,
  className,
}: BeforeAfterGridProps) {
  const gridCols = {
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-8`, className)}>
      {cases.map((caseData, idx) => (
        <BeforeAfter key={idx} case={caseData} />
      ))}
    </div>
  );
}
