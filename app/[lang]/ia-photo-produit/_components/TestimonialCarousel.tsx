'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  const testimonial = testimonials[current];

  return (
    <div className="relative">
      <div className="max-w-3xl mx-auto text-center min-h-[220px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg lg:text-xl text-future-dusk-200 italic leading-relaxed mb-6">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Attribution */}
            <p className="text-base font-semibold text-white">{testimonial.name}</p>
            <p className="text-sm text-future-dusk-400">
              {testimonial.title} — {testimonial.company}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={prev}
          className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'w-6 bg-very-peri-400' : 'w-2 bg-white/20'
              }`}
              aria-label={`Témoignage ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors"
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
}
