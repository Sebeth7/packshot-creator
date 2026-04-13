'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';

const ARTICLES_PER_PAGE = 9;

interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate?: string;
  image?: string;
  category?: string;
}

interface BlogGridProps {
  articles: BlogArticle[];
  categories: string[];
  lang: string;
  translations: {
    all: string;
    readArticle: string;
    showMore: string;
  };
}

export function BlogGrid({ articles, categories, lang, translations }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const validArticles = articles.filter((a) => a.slug);
  const filtered = activeCategory
    ? validArticles.filter((a) => a.category === activeCategory)
    : validArticles;

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visible.length < filtered.length;
  const isFr = lang === 'fr';

  return (
    <>
      {/* Category filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => { setActiveCategory(null); setVisibleCount(ARTICLES_PER_PAGE); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? 'bg-very-peri-500 text-white'
                : 'bg-neutral-100 text-future-dusk-600 hover:bg-neutral-200'
            }`}
          >
            {translations.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(ARTICLES_PER_PAGE); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-very-peri-500 text-white'
                  : 'bg-neutral-100 text-future-dusk-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-lg hover:border-very-peri-200 transition-all duration-300 block"
          >
            <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-very-peri-50 to-future-dusk-100">
                  <BookOpen className="h-12 w-12 text-very-peri-300" />
                </div>
              )}
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                {post.category && (
                  <span className="px-3 py-1 rounded-full bg-very-peri-100 text-very-peri-700 font-medium text-xs uppercase tracking-wide">
                    {post.category}
                  </span>
                )}
                <span className="text-future-dusk-400">
                  {post.formattedDate || post.date}
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-future-dusk-500 text-sm line-clamp-3">
                {post.description}
              </p>
              <div className="pt-2">
                <span className="text-very-peri-600 font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  {translations.readArticle}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)}
            className="px-8 py-3 rounded-xl bg-very-peri-500 text-white hover:bg-very-peri-600 font-medium transition-colors"
          >
            {translations.showMore}
          </button>
        </div>
      )}
    </>
  );
}
