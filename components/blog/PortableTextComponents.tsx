import { PortableTextComponents } from '@portabletext/react';
import { Callout } from './Callout';
import { ComparisonTable } from './ComparisonTable';

export const portableTextComponents: PortableTextComponents = {
  types: {
    // Callout custom
    callout: ({ value }) => {
      // Convertir le contenu Portable Text en texte simple pour les enfants
      const renderContent = () => {
        if (!value.content || !Array.isArray(value.content)) return null;

        return value.content.map((block: any, idx: number) => {
          if (block._type !== 'block') return null;

          return (
            <p key={idx} className="mb-2 last:mb-0">
              {block.children?.map((child: any, childIdx: number) => {
                if (child.marks?.includes('strong')) {
                  return <strong key={childIdx}>{child.text}</strong>;
                }
                if (child.marks?.includes('em')) {
                  return <em key={childIdx}>{child.text}</em>;
                }
                return <span key={childIdx}>{child.text}</span>;
              })}
            </p>
          );
        });
      };

      return (
        <Callout type={value.type} title={value.title}>
          {renderContent()}
        </Callout>
      );
    },

    // ComparisonTable custom
    comparisonTable: ({ value }) => (
      <ComparisonTable
        headers={value.headers || []}
        rows={value.rows || []}
      />
    ),

    // Code block
    code: ({ value }) => (
      <pre className="bg-neutral-dark text-white p-4 rounded-lg overflow-x-auto my-6">
        <code className={`language-${value.language || 'text'}`}>
          {value.code}
        </code>
      </pre>
    )
  },

  block: {
    h1: ({ children }) => (
      <h1 className="font-heading text-4xl font-bold text-neutral-dark mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-xl font-bold text-neutral-dark mb-2 mt-4">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-future-dusk-500 pl-4 italic my-6 text-neutral-medium">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-neutral-dark">
        {children}
      </p>
    )
  },

  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-neutral-light px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-future-dusk-500 hover:text-future-dusk-700 underline transition-colors"
        >
          {children}
        </a>
      );
    }
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">
        {children}
      </ol>
    )
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-neutral-dark">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-neutral-dark">{children}</li>
    )
  }
};
