'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { IndustrySelectModal } from './IndustrySelectModal';

export function BrandHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-white">
              nuva
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Language Switcher */}
              <div className="hidden sm:flex items-center gap-3 text-sm text-white/60">
                <button className="hover:text-white transition-colors">EN</button>
                <span className="text-white/30">|</span>
                <button className="text-white font-medium">中文</button>
              </div>

              {/* CTA */}
              <button
                onClick={() => setShowModal(true)}
                className="px-4 sm:px-5 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                立即加入 nuvaClub
              </button>
            </div>
          </div>
        </div>
      </header>

      <IndustrySelectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
