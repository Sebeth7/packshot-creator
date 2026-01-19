import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { BadgeIAReady } from './Badge';

export interface Product {
  slug: string;
  name: string;
  description?: string;
  price?: string;
  image: string;
  imageAlt: string;
  isIAReady?: boolean;
}

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  showPrice?: boolean;
  ctaText?: string;
}

export default function ProductGrid({
  products,
  columns = 3,
  showPrice = true,
  ctaText = 'En savoir plus',
}: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {products.map((product) => (
        <div
          key={product.slug}
          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
        >
          {/* Image */}
          <div className="relative h-64 bg-neutral-lighter overflow-hidden">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
            {product.isIAReady && (
              <div className="absolute top-4 right-4">
                <BadgeIAReady>IA Ready</BadgeIAReady>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-heading font-bold text-neutral-dark">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-neutral-medium text-sm line-clamp-2">
                {product.description}
              </p>
            )}

            {showPrice && product.price && (
              <p className="text-lg font-heading font-semibold text-secondary-orbitvu">
                {product.price}
              </p>
            )}

            <Button
              asChild
              variant="outline"
              className="w-full border-secondary-orbitvu text-secondary-orbitvu hover:bg-secondary-orbitvu hover:text-white"
            >
              <Link href={`/studio-photo/${product.slug}`}>
                {ctaText}
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
