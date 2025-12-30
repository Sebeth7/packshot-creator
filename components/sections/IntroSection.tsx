import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface IntroSectionProps {
  headingKey: string;
  text1Key: string;
  text2Key: string;
  ctaKey?: string;
  ctaHref?: string;
  showCTA?: boolean;
  bgColor?: 'white' | 'light-gray' | 'warm-white';
}

export default function IntroSection({
  headingKey,
  text1Key,
  text2Key,
  ctaKey = 'cta',
  ctaHref = '/contact',
  showCTA = true,
  bgColor = 'white'
}: IntroSectionProps) {
  const t = useTranslations('home');

  const bgClasses = {
    'white': 'bg-white',
    'light-gray': 'bg-bg-light-gray',
    'warm-white': 'bg-bg-warm-white'
  };

  return (
    <section className={`${bgClasses[bgColor]} py-20 px-4`}>
      <div className="max-w-5xl mx-auto">
        {/* Heading avec underline turquoise */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl lg:text-5xl text-neutral-dark mb-4">
            {t(headingKey)}
          </h2>
          <div className="w-24 h-1 bg-primary-turquoise mx-auto"></div>
        </div>

        {/* Textes en 2 colonnes */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <p className="text-lg text-neutral-medium leading-relaxed">
            {t(text1Key)}
          </p>
          <p className="text-lg text-neutral-medium leading-relaxed">
            {t(text2Key)}
          </p>
        </div>

        {/* CTA centré */}
        {showCTA && (
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-2 border-primary-turquoise text-primary-turquoise hover:bg-primary-turquoise hover:text-white px-8 py-6 text-lg"
            >
              <a href={ctaHref}>
                {t(ctaKey)}
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
