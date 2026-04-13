'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface TooltipHelperProps {
  content: string;
}

export default function TooltipHelper({ content }: TooltipHelperProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="text-future-dusk-500 hover:text-very-peri-600 ml-2" aria-label="Aide">
            <HelpCircle className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
