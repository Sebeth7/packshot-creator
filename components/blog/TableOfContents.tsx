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
    // Extraire tous les H2 et H3 de l'article
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = article.querySelectorAll('h2, h3');
    const headingData: Heading[] = Array.from(headingElements).map((heading) => ({
      id: heading.id || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1)),
    }));

    // Observer pour suivre le heading actif pendant le scroll
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

    // Mise à jour de l'état après configuration de l'observer
    queueMicrotask(() => setHeadings(headingData));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className={`border-l-2 border-neutral-light pl-4 ${className}`}>
      <h2 className="text-sm font-bold text-neutral-dark mb-4 uppercase tracking-wide">
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
              className={`text-sm transition-colors hover:text-secondary-orbitvu ${
                activeId === heading.id
                  ? 'text-secondary-orbitvu font-medium'
                  : 'text-neutral-medium'
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
