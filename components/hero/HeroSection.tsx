import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations';
import HeroBackground from './HeroBackground';
import type { HeroSectionProps } from './types';

const DEFAULT_GRADIENT =
  'bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800';

export default function HeroSection({
  layout = 'centered',
  align = 'center',
  compact = false,
  badge,
  title,
  subtitle,
  ctas,
  media,
  backgroundImage,
  backgroundVideo,
  gradient = DEFAULT_GRADIENT,
  children,
  className = '',
}: HeroSectionProps) {
  const isSplit = layout === 'split';
  const padding = compact ? 'py-16' : 'py-20 lg:py-28';

  return (
    <section
      className={`relative overflow-hidden text-white ${gradient} ${className}`}
    >
      {backgroundImage && <HeroBackground src={backgroundImage} />}
      {backgroundVideo}

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${padding}`}>
        {isSplit ? (
          <SplitLayout
            badge={badge}
            title={title}
            subtitle={subtitle}
            ctas={ctas}
            media={media}
          >
            {children}
          </SplitLayout>
        ) : (
          <CenteredLayout
            badge={badge}
            title={title}
            subtitle={subtitle}
            ctas={ctas}
            align={align}
          >
            {children}
          </CenteredLayout>
        )}
      </div>
    </section>
  );
}

/* ────────────────────── Split layout (2 columns) ────────────────────── */

function SplitLayout({
  badge,
  title,
  subtitle,
  ctas,
  media,
  children,
}: Pick<
  HeroSectionProps,
  'badge' | 'title' | 'subtitle' | 'ctas' | 'media' | 'children'
>) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <FadeInView direction="left" className="order-2 lg:order-1">
        <BadgePill badge={badge} />

        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-heading font-bold text-white leading-[1.1] tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <div className="mt-6 text-lg lg:text-xl text-future-dusk-200 max-w-xl leading-relaxed">
            {subtitle}
          </div>
        )}

        {children}

        <CTAButtons ctas={ctas} />
      </FadeInView>

      {media && (
        <FadeInView
          direction="right"
          delay={0.2}
          className="order-1 lg:order-2 relative"
        >
          {media}
        </FadeInView>
      )}
    </div>
  );
}

/* ────────────────────── Centered layout ────────────────────── */

function CenteredLayout({
  badge,
  title,
  subtitle,
  ctas,
  children,
  align = 'center',
}: Pick<
  HeroSectionProps,
  'badge' | 'title' | 'subtitle' | 'ctas' | 'children' | 'align'
>) {
  const isLeft = align === 'left';
  const wrapperClass = isLeft ? 'max-w-4xl' : 'max-w-4xl mx-auto text-center';

  return (
    <FadeInView className={wrapperClass}>
      <BadgePill badge={badge} centered={!isLeft} />

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
        {title}
      </h1>

      {subtitle && (
        <div className={`text-lg sm:text-xl text-future-dusk-200 leading-relaxed mb-8 ${isLeft ? '' : 'max-w-2xl mx-auto'}`}>
          {subtitle}
        </div>
      )}

      {children}

      <CTAButtons ctas={ctas} centered={!isLeft} />
    </FadeInView>
  );
}

/* ────────────────────── Shared sub-components ────────────────────── */

function BadgePill({
  badge,
  centered = false,
}: {
  badge?: HeroSectionProps['badge'];
  centered?: boolean;
}) {
  if (!badge) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full ${
        badge.colorClass || 'bg-white/10 text-white'
      } ${centered ? 'mb-6' : ''}`}
    >
      {badge.icon}
      {badge.label}
    </span>
  );
}

function CTAButtons({
  ctas,
  centered = false,
}: {
  ctas?: HeroSectionProps['ctas'];
  centered?: boolean;
}) {
  if (!ctas || ctas.length === 0) return null;

  return (
    <div
      className={`mt-10 flex flex-col sm:flex-row gap-4 ${
        centered ? 'justify-center' : ''
      }`}
    >
      {ctas.map((cta) =>
        cta.variant === 'primary' ? (
          <Button
            key={cta.href}
            asChild
            size="lg"
            className="bg-very-peri-500 hover:bg-very-peri-600 text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg shadow-very-peri-500/25"
          >
            <Link href={cta.href as '/'}>{cta.label}</Link>
          </Button>
        ) : (
          <Button
            key={cta.href}
            asChild
            size="lg"
            className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 px-8 h-12 text-base rounded-lg"
          >
            <Link href={cta.href as '/'}>{cta.label}</Link>
          </Button>
        ),
      )}
    </div>
  );
}
