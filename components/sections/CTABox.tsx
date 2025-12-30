import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface CTABoxProps {
  headingKey: string;
  descriptionKey: string;
  ctaKey: string;
  ctaHref: string;
  bgColor?: 'coral' | 'teal' | 'light-gray';
}

export default function CTABox({
  headingKey,
  descriptionKey,
  ctaKey,
  ctaHref,
  bgColor = 'light-gray'
}: CTABoxProps) {
  const t = useTranslations('home');

  const bgClasses = {
    'coral': 'bg-primary-coral text-white',
    'teal': 'bg-secondary-teal text-white',
    'light-gray': 'bg-bg-light-gray text-heading-dark'
  };

  const buttonClasses = {
    'coral': 'bg-white text-primary-coral hover:bg-white/90',
    'teal': 'bg-white text-secondary-teal hover:bg-white/90',
    'light-gray': 'bg-primary-coral text-white hover:bg-primary-coral/90'
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
