interface ImagePlaceholderProps {
  type: 'blog' | 'og' | 'lifestyle' | 'hero' | 'illustration';
  alt: string;
  className?: string;
  category?: string;
}

const configs = {
  blog: { width: 1200, height: 675, gradient: 'from-very-peri-50 to-future-dusk-50' },
  og: { width: 1200, height: 630, gradient: 'from-very-peri-50 to-future-dusk-50' },
  lifestyle: { width: 800, height: 800, gradient: 'from-very-peri-50 to-accent-lime/10' },
  hero: { width: 1920, height: 1080, gradient: 'from-very-peri-100 to-future-dusk-50' },
  illustration: { width: 600, height: 600, gradient: 'from-very-peri-50 to-white' },
};

export default function ImagePlaceholder({ type, alt, className = '', category }: ImagePlaceholderProps) {
  const config = configs[type];

  return (
    <div
      className={`relative bg-gradient-to-br ${config.gradient} overflow-hidden ${className}`}
      style={{ aspectRatio: `${config.width}/${config.height}` }}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center opacity-40">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-very-peri-200 flex items-center justify-center">
            <svg className="w-6 h-6 text-very-peri-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
          {category && (
            <p className="text-xs font-medium text-very-peri-500 tracking-wide uppercase">{category}</p>
          )}
        </div>
      </div>
    </div>
  );
}
