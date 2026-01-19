'use client';

import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface QuestionWrapperProps {
  label: string;
  sublabel?: string;
  tooltip?: string;
  error?: string;
  children: ReactNode;
}

export default function QuestionWrapper({
  label,
  sublabel,
  tooltip,
  error,
  children,
}: QuestionWrapperProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Label className="text-base font-medium text-neutral-dark">
            {label}
          </Label>
          {sublabel && (
            <p className="text-sm text-neutral-medium mt-1">{sublabel}</p>
          )}
        </div>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-neutral-medium hover:text-secondary-orbitvu">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {children}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
