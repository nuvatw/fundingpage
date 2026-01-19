'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { IndustrySelectModal } from './IndustrySelectModal';

export function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.3)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(168,85,247,0.2)_0%,_transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-white tracking-tight">
              nuva
            </h1>
          </motion.div>

          {/* Cover Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <div className="w-full max-w-2xl mx-auto aspect-video rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              <span className="text-white/40 text-lg">nuva Cover</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-4 bg-white text-neutral-900 rounded-full font-semibold text-lg hover:bg-neutral-100 transition-colors"
            >
              開始學習
            </button>
            <Link
              href="#contact"
              className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              聯繫我們
            </Link>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            nuva，一個「有趣、好玩、以作品為核心」的全球 AI 學習社群品牌。
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </section>

      {/* Industry Select Modal */}
      <IndustrySelectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
