'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = article.querySelectorAll('h2, h3');
    const headingData: Heading[] = Array.from(headingElements).map((heading) => ({
      id: heading.id || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1)),
    }));

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

    headingElements.forEach((heading) => observer.observe(heading));

    queueMicrotask(() => setHeadings(headingData));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className={`border-l-2 border-neutral-200 pl-4 ${className}`}>
      <h2 className="text-sm font-bold text-future-dusk-900 mb-4 uppercase tracking-wide">
        Table des matières
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'ml-4' : ''}
          >
            <a
              href={`#${heading.id}`}
              className={`text-sm transition-colors hover:text-very-peri-600 ${
                activeId === heading.id
                  ? 'text-very-peri-600 font-medium'
                  : 'text-future-dusk-500'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
