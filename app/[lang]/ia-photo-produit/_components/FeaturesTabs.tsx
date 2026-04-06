'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BeforeAfterSlider } from '@/components/media';

interface FeatureBase {
  id: string;
  label: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
}

interface FeatureBeforeAfter extends FeatureBase {
  mode?: 'beforeAfter';
  before: { src: string; alt: string; label: string };
  after: { src: string; alt: string; label: string };
  image?: never;
}

interface FeatureImage extends FeatureBase {
  mode: 'image';
  image: { src: string; alt: string };
  before?: never;
  after?: never;
}

type Feature = FeatureBeforeAfter | FeatureImage;

interface FeaturesTabsProps {
  features: Feature[];
}

export default function FeaturesTabs({ features }: FeaturesTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = features[activeIndex];

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
      {/* Left: Tabs */}
      <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
        {features.map((feat, idx) => (
          <button
            key={feat.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal min-w-[180px] lg:min-w-0 ${
              idx === activeIndex
                ? 'bg-very-peri-50 border-2 border-very-peri-300 shadow-sm'
                : 'bg-neutral-50 border-2 border-transparent hover:bg-neutral-100'
            }`}
          >
            <span
              className={`inline-flex items-center justify-center h-10 w-10 rounded-lg flex-shrink-0 transition-colors ${
                idx === activeIndex ? feat.activeColor : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              {feat.icon}
            </span>
            <div className="min-w-0">
              <p
                className={`text-sm font-semibold transition-colors ${
                  idx === activeIndex ? 'text-future-dusk-900' : 'text-future-dusk-500'
                }`}
              >
                {feat.label}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Right: Visual + Description */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden border border-neutral-200 mb-6">
              {active.mode === 'image' ? (
                <Image
                  src={active.image.src}
                  alt={active.image.alt}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <BeforeAfterSlider
                  before={active.before}
                  after={active.after}
                  width={800}
                  height={500}
                />
              )}
            </div>

            <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">
              {active.label}
            </h3>
            <div className="text-lg text-future-dusk-500 leading-relaxed">{active.description}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
