'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, User, Wand2, Paintbrush, Layers } from 'lucide-react';

interface Feature {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
}

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

      {/* Right: Video/Visual + Description */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* Video placeholder */}
            <div className="w-full aspect-video bg-neutral-100 rounded-2xl border border-neutral-200 flex items-center justify-center mb-6 overflow-hidden">
              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-2xl ${active.activeColor} flex items-center justify-center mx-auto mb-3`}
                >
                  {active.icon}
                </div>
                <p className="text-sm text-neutral-400 font-medium">
                  Video demo — {active.label}
                </p>
                <p className="text-xs text-neutral-300 mt-1">MP4 placeholder — 1080p, 10-20s</p>
              </div>
            </div>

            <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">
              {active.label}
            </h3>
            <p className="text-lg text-future-dusk-500 leading-relaxed">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
