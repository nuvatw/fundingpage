'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS, FAQ_CATEGORIES } from '@/lib/data';
import { SegmentedControl } from '@/components/ui/navigation';
import { SocialContactIcons } from '@/components/ui/social';
import { expandEase } from '@/lib/animations';
import type { FAQCategory } from '@/lib/types';

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('about');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter FAQs by active category
  const filteredFAQs = useMemo(
    () => FAQ_ITEMS.filter((faq) => faq.category === activeCategory),
    [activeCategory]
  );

  // Reset open index when category changes
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId as FAQCategory);
    setOpenIndex(null); // Close all when switching category
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-3">
            常見問題
          </h2>
          <p className="text-base text-neutral-600">
            還有疑問？這裡整理了最常被問的問題。
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex justify-center mb-8">
          <SegmentedControl
            items={FAQ_CATEGORIES.map((cat) => ({
              id: cat.id,
              label: cat.label,
            }))}
            activeId={activeCategory}
            onSelect={handleCategoryChange}
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-3 min-h-75">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="space-y-3"
            >
              {filteredFAQs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.id}
                    className={`border rounded-lg overflow-hidden transition-colors duration-200 ${
                      isOpen
                        ? 'border-primary-200 bg-primary-50'
                        : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-neutral-50/50 transition-colors"
                    >
                      <span className="font-medium text-neutral-900 pr-4 text-[15px]">
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 ${
                          isOpen
                            ? 'bg-primary-600 text-white rotate-180'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.2, ease: expandEase },
                            opacity: { duration: 0.15, delay: 0.03 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1">
                            <p className="text-neutral-600 text-[15px] leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <div className="mt-10">
          <p className="text-center text-sm text-neutral-500 mb-4">
            還有其他問題？
          </p>
          <SocialContactIcons showLabels className="justify-center" />
        </div>
      </div>
    </section>
  );
}
