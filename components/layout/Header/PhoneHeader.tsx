'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';
import { NAV_ITEMS } from '@/lib/data';
import { cn } from '@/lib/utils';

export function PhoneHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS);
  const { scrollToSection, scrollToTop } = useSmoothScroll();

  // Scroll lock when overlay is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const handlePlanClick = () => {
    scrollToSection('plans');
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0"
            >
              <Image
                src="/images/logo.png"
                alt="nuva"
                width={80}
                height={28}
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </Link>

            {/* Right: Hamburger Button */}
            <button
              className="p-2 -mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={cn(
                    'w-full h-0.5 bg-neutral-600 rounded transition-transform duration-200 origin-center',
                    isMenuOpen && 'rotate-45 translate-y-[9px]'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 bg-neutral-600 rounded transition-opacity duration-200',
                    isMenuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 bg-neutral-600 rounded transition-transform duration-200 origin-center',
                    isMenuOpen && '-rotate-45 -translate-y-[9px]'
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-100">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center shrink-0"
                onClick={() => setIsMenuOpen(false)}
              >
                <Image
                  src="/images/logo.png"
                  alt="nuva"
                  width={80}
                  height={28}
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                />
              </Link>

              {/* Close Button (X) */}
              <button
                className="p-2 -mr-2"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <div className="w-6 h-5 flex flex-col justify-center relative">
                  <span className="absolute w-full h-0.5 bg-neutral-600 rounded rotate-45" />
                  <span className="absolute w-full h-0.5 bg-neutral-600 rounded -rotate-45" />
                </div>
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="px-6 py-8">
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                          'flex items-center gap-3 w-full px-4 py-4 text-left text-lg rounded-lg transition-colors',
                          isActive
                            ? 'font-semibold text-neutral-900 bg-neutral-50'
                            : 'font-normal text-neutral-600 hover:bg-neutral-50'
                        )}
                      >
                        {/* Active indicator dot */}
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full bg-primary-600 transition-opacity',
                            isActive ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* CTA Button */}
              <div className="mt-8 pt-8 border-t border-neutral-100">
                <button
                  onClick={handlePlanClick}
                  className="w-full px-6 py-4 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  選擇方案
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
