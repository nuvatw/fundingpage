'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { IndustrySelectModal } from './IndustrySelectModal';

export function CTASection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="py-20 sm:py-28 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                對話仍在持續。
                <br />
                <span className="text-primary-400">
                  我們想做的，是 AI 教育界的天空花園。
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="https://instagram.com/meetnuva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                >
                  追蹤 Instagram
                  <span>→</span>
                </Link>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-colors"
                >
                  加入 nuvaClub
                  <span>→</span>
                </button>
              </div>
            </motion.div>

            {/* Right Content - Instagram Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="aspect-[9/16] max-w-xs mx-auto rounded-3xl bg-neutral-800 border border-neutral-700 overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 mb-4" />
                  <p className="text-white/60 text-sm mb-4">Instagram Reel Preview</p>
                  <Link
                    href="https://instagram.com/meetnuva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 text-sm hover:underline"
                  >
                    View on Instagram →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <IndustrySelectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
