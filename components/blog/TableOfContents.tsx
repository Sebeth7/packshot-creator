'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import type { HeadingData } from '@/lib/blog-utils';

interface TableOfContentsProps {
  headings: HeadingData[];
  title?: string;
  collapsible?: boolean;
  className?: string;
}

export function TableOfContents({
  headings,
  title = 'Sommaire',
  collapsible = false,
  className = '',
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const list = (
    <ul className="space-y-2">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
          <button
            onClick={() => handleClick(heading.id)}
            className={`text-sm text-left w-full transition-colors hover:text-very-peri-600 ${
              activeId === heading.id
                ? 'text-very-peri-600 font-medium'
                : 'text-future-dusk-500'
            }`}
          >
            {heading.text}
          </button>
        </li>
      ))}
    </ul>
  );

  if (collapsible) {
    return (
      <div className={className}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-future-dusk-900"
        >
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
            <List className="h-4 w-4" />
            {title}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <div className="mt-2 p-4 rounded-xl border border-neutral-200 bg-white">
            {list}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav className={className}>
      <h2 className="text-sm font-bold text-future-dusk-900 mb-4 uppercase tracking-wide flex items-center gap-2">
        <List className="h-4 w-4" />
        {title}
      </h2>
      <div className="border-l-2 border-neutral-200 pl-4">
        {list}
      </div>
    </nav>
  );
}
