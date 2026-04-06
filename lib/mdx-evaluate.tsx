import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { Callout } from '@/components/blog/Callout';
import { ComparisonTable } from '@/components/blog/ComparisonTable';
import { slugify } from '@/lib/blog-utils';

const mdxComponents = {
  h1: (props: any) => (
    <h1 className="font-heading text-4xl font-bold text-future-dusk-900 mb-6 mt-8" {...props} />
  ),
  h2: (props: any) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = slugify(text);
    return <h2 id={id} className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24" {...props} />;
  },
  h3: (props: any) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = slugify(text);
    return <h3 id={id} className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24" {...props} />;
  },
  h4: (props: any) => (
    <h4 className="font-heading text-lg font-bold text-future-dusk-900 mb-2 mt-4" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-relaxed text-future-dusk-600" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-future-dusk-600" {...props} />,
  strong: (props: any) => <strong className="font-bold" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  a: (props: any) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        className="text-very-peri-600 hover:text-very-peri-700 underline transition-colors"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-very-peri-500 pl-4 italic my-6 text-future-dusk-500" {...props} />
  ),
  code: (props: any) => {
    if (!props.className) {
      return <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
    }
    return <code {...props} />;
  },
  pre: (props: any) => (
    <pre className="bg-future-dusk-900 text-white p-4 rounded-lg overflow-x-auto my-6" {...props} />
  ),
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg shadow-sm my-8 max-w-full" alt={props.alt || ''} {...props} />
  ),
  hr: () => <hr className="my-8 border-neutral-200" />,
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-neutral-200 rounded-lg" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="bg-future-dusk-50 px-4 py-3 text-left text-sm font-semibold text-future-dusk-900 border-b border-neutral-200" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-3 text-sm text-future-dusk-600 border-b border-neutral-100" {...props} />
  ),
  Callout,
  ComparisonTable,
};

/**
 * Evaluate MDX source and return rendered React element.
 * Uses @mdx-js/mdx evaluate() which properly handles JS expressions in JSX props.
 */
export async function renderMdx(source: string): Promise<React.ReactNode> {
  const { default: MdxContent } = await evaluate(source, {
    ...runtime,
    useMDXComponents: () => mdxComponents,
  } as any);

  return <MdxContent components={mdxComponents} />;
}
