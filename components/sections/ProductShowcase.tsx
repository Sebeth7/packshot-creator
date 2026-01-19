import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ProductShowcaseProps {
  brandKey: string;
  headingKey: string;
  descriptionKey: string;
  featuresKeys: string[];
  ctaKey: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  bgColor?: 'white' | 'light-gray' | 'warm-white';
}

export default function ProductShowcase({
  brandKey,
  headingKey,
  descriptionKey,
  featuresKeys,
  ctaKey,
  ctaHref,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  bgColor = 'light-gray'
}: ProductShowcaseProps) {
  const t = useTranslations('home');

  const bgClasses = {
    'white': 'bg-white',
    'light-gray': 'bg-bg-light-gray',
    'warm-white': 'bg-bg-warm-white'
  };

  const isImageLeft = imagePosition === 'left';

  return (
    <section className={`${bgClasses[bgColor]} py-20 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isImageLeft ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Image */}
          <div className={`relative h-[400px] lg:h-[500px] ${!isImageLeft ? 'lg:col-start-2' : ''}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
            />
          </div>

          {/* Contenu */}
          <div className={`space-y-6 ${!isImageLeft ? 'lg:col-start-1' : ''}`}>
            {/* Brand badge */}
            <div className="inline-block">
              <span className="text-sm font-heading font-bold text-neutral-dark uppercase tracking-wider">
                {t(brandKey)}
              </span>
            </div>

            {/* Heading avec underline */}
            <div>
              <h2 className="font-heading text-4xl lg:text-5xl text-neutral-dark mb-4 leading-tight">
                {t(headingKey)}
              </h2>
              <div className="w-16 h-1 bg-secondary-orbitvu"></div>
            </div>

            {/* CTA */}
            <div>
              <Button
                asChild
                variant="outline"
                className="border-2 border-secondary-orbitvu text-secondary-orbitvu hover:bg-secondary-orbitvu hover:text-white px-8 py-4"
              >
                <a href={ctaHref}>
                  {t(ctaKey)}
                </a>
              </Button>
            </div>

            {/* Description */}
            <p className="text-lg text-neutral-medium leading-relaxed">
              {t(descriptionKey)}
            </p>

            {/* Features liste */}
            <div className="pt-4 space-y-3">
              {featuresKeys.map((featureKey, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-orbitvu rounded-full mt-2 flex-shrink-0" />
                  <p className="text-base text-neutral-medium font-medium">
                    {t(featureKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
