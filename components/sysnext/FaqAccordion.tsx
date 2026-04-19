'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Accordéon FAQ dédié Sysnext Industrial Solutions.
 *
 * Le schema JSON-LD FAQPage est injecté par la page parente (pas ici)
 * via SchemaOrg + faqSchema() pour permettre l'enrichissement GEO.
 *
 * Source : config/cohabitation-marques.md § GEO, voix-editoriale.md §règle 8.
 * Draft matière brute — Seb rédige le copy final des questions/réponses commerciales.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  titleId?: string;
}

export default function FaqAccordion({ items, titleId }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className="divide-y divide-graphite-200 rounded-xl border border-graphite-200 bg-white overflow-hidden"
      aria-labelledby={titleId}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="bg-white">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-sysnext-50"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${idx}`}
            >
              <span className="font-sysnext-sans font-semibold text-sysnext-900 text-base">
                {item.question}
              </span>
              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-sysnext-700 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-answer-${idx}`}
              className={`grid overflow-hidden transition-all duration-200 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0">
                <div className="px-5 pb-5 text-sm leading-relaxed text-graphite-700">
                  {item.answer.split('\n').map((p, i) => (
                    <p key={i} className={i > 0 ? 'mt-3' : ''}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
