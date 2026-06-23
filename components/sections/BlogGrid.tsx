import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

interface BlogPost {
  titleKey: string;
  categoryKey: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  slug: string;
}

interface BlogGridProps {
  headingKey: string;
  descriptionKey: string;
  posts: BlogPost[];
  ctaKey: string;
  ctaHref: string;
}

export default function BlogGrid({
  headingKey,
  descriptionKey,
  posts,
  ctaKey,
  ctaHref
}: BlogGridProps) {
  const t = useTranslations('home');

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInView className="text-center mb-12">
          <h2 className="font-heading text-4xl lg:text-5xl text-neutral-dark mb-4">
            {t(headingKey)}
          </h2>
          <div className="w-24 h-1 bg-secondary-orbitvu mx-auto mb-6"></div>
          <p className="text-lg text-neutral-medium max-w-3xl mx-auto">
            {t(descriptionKey)}
          </p>
        </FadeInView>

        {/* Grille d'articles */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, idx) => (
            <StaggerItem key={idx}>
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Contenu */}
              <div className="p-6 space-y-3">
                {/* Catégorie + Date */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-secondary-orbitvu font-medium">
                    {t(post.categoryKey)}
                  </span>
                  <span className="text-neutral-medium/60">{post.date}</span>
                </div>

                {/* Titre */}
                <h3 className="font-heading text-xl text-neutral-dark hover:text-secondary-orbitvu transition-colors">
                  <a href={post.slug} className="after:absolute after:inset-0">
                    {t(post.titleKey)}
                  </a>
                </h3>
              </div>
            </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <div className="text-center">
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
      </div>
    </section>
  );
}
