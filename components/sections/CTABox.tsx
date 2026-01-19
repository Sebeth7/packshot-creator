import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface CTABoxProps {
  headingKey: string;
  descriptionKey: string;
  ctaKey: string;
  ctaHref: string;
  bgColor?: 'coral' | 'teal' | 'light-gray' | 'white';
  namespace?: string;
}

export default function CTABox({
  headingKey,
  descriptionKey,
  ctaKey,
  ctaHref,
  bgColor = 'light-gray',
  namespace = 'home'
}: CTABoxProps) {
  const t = useTranslations(namespace);

  const bgClasses = {
    'coral': 'bg-secondary-orbitvu text-white',
    'teal': 'bg-secondary-orbitvu text-white',
    'light-gray': 'bg-neutral-light text-neutral-dark',
    'white': 'bg-white text-neutral-dark'
  };

  const buttonClasses = {
    'coral': 'bg-white text-secondary-orbitvu hover:bg-white/90',
    'teal': 'bg-white text-secondary-orbitvu hover:bg-white/90',
    'light-gray': 'bg-secondary-orbitvu text-white hover:bg-primary-orbitvu',
    'white': 'bg-secondary-orbitvu text-white hover:bg-primary-orbitvu'
  };

  return (
    <section className={`${bgClasses[bgColor]} py-20 px-4`}>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="font-heading text-3xl lg:text-4xl leading-tight">
          {t(headingKey)}
        </h2>

        <p className="text-lg lg:text-xl leading-relaxed opacity-90">
          {t(descriptionKey)}
        </p>

        <div className="pt-4">
          <Button
            asChild
            className={`${buttonClasses[bgColor]} px-8 py-6 text-lg`}
          >
            <a href={ctaHref}>
              {t(ctaKey)}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
