'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CheckoutHeaderProps {
  returnUrl: string;
}

export function CheckoutHeader({ returnUrl }: CheckoutHeaderProps) {
  const [showExitWarning, setShowExitWarning] = useState(false);

  const handleExit = () => {
    setShowExitWarning(true);
  };

  const confirmExit = () => {
    window.location.href = returnUrl;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleExit}
            className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            nuva
          </button>

          {/* Title (center) */}
          <h1 className="text-base font-semibold text-neutral-900">結帳</h1>

          {/* Close button */}
          <button
            onClick={handleExit}
            className="p-2 -mr-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="關閉結帳"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Exit Warning Modal */}
      <AnimatePresence>
        {showExitWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
            onClick={() => setShowExitWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">
                確定要離開嗎？
              </h2>
              <p className="text-neutral-600 mb-6">
                您填寫的資料將不會被保留。
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitWarning(false)}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg font-medium',
                    'bg-neutral-100 text-neutral-700',
                    'hover:bg-neutral-200 transition-colors'
                  )}
                >
                  繼續結帳
                </button>
                <button
                  onClick={confirmExit}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg font-medium',
                    'bg-neutral-900 text-white',
                    'hover:bg-neutral-800 transition-colors'
                  )}
                >
                  離開
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
