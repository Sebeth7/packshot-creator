'use client';

import { cn } from '@/lib/utils';

export type EmbedType = 'tally' | 'typeform' | 'iframe';

interface EmbedFrameProps {
  type: EmbedType;
  src: string;
  title: string;
  height?: string | number;
  className?: string;
  onLoad?: () => void;
}

export default function EmbedFrame({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  src,
  title,
  height = '600px',
  className,
  onLoad,
}: EmbedFrameProps) {
  const heightValue = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={cn('w-full overflow-hidden rounded-xl shadow-lg', className)}>
      <iframe
        src={src}
        title={title}
        width="100%"
        height={heightValue}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        className="w-full"
        onLoad={onLoad}
        allow="geolocation; microphone; camera"
        style={{
          minHeight: heightValue,
          border: 'none',
        }}
      />
    </div>
  );
}

// Export pre-configured embeds
interface ROICalculatorProps {
  className?: string;
  onLoad?: () => void;
}

export function ROICalculator({ className, onLoad }: ROICalculatorProps) {
  // TODO: Remplacer par l'URL Tally réelle
  const tallyURL = 'https://tally.so/embed/YOUR_TALLY_FORM_ID';

  return (
    <EmbedFrame
      type="tally"
      src={tallyURL}
      title="Calculateur ROI Studio Photo"
      height="700px"
      className={className}
      onLoad={onLoad}
    />
  );
}

interface MachineSelectionToolProps {
  className?: string;
  onLoad?: () => void;
}

export function MachineSelectionTool({ className, onLoad }: MachineSelectionToolProps) {
  // TODO: Remplacer par l'URL Typeform réelle
  const typeformURL = 'https://form.typeform.com/to/YOUR_TYPEFORM_ID';

  return (
    <EmbedFrame
      type="typeform"
      src={typeformURL}
      title="Outil de Sélection de Machine"
      height="650px"
      className={className}
      onLoad={onLoad}
    />
  );
}
