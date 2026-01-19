'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

interface IndustrySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IndustrySelectModal({ isOpen, onClose }: IndustrySelectModalProps) {
  const router = useRouter();

  const handleSelect = (isFnB: boolean) => {
    onClose();
    if (isFnB) {
      router.push('/restaurant');
    } else {
      router.push('/general');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 sm:p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                歡迎加入 nuva！
              </h2>
              <p className="text-neutral-600">
                請問你是哪個領域的朋友呢？
              </p>
            </div>

            {/* Options */}
            <div className="px-6 sm:px-8 pb-8 space-y-4">
              {/* F&B Industry Option */}
              <button
                onClick={() => handleSelect(true)}
                className="w-full p-5 rounded-2xl border-2 border-neutral-200 hover:border-primary-500 hover:bg-primary-50 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-lg group-hover:text-primary-600 transition-colors">
                      我是餐飲業相關人士
                    </h3>
                    <p className="text-neutral-500 text-sm mt-1">
                      餐廳老闆、主廚、餐飲從業人員、想開店的人
                    </p>
                  </div>
                </div>
              </button>

              {/* General Option */}
              <button
                onClick={() => handleSelect(false)}
                className="w-full p-5 rounded-2xl border-2 border-neutral-200 hover:border-primary-500 hover:bg-primary-50 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-lg group-hover:text-primary-600 transition-colors">
                      我想學習 AI 技能
                    </h3>
                    <p className="text-neutral-500 text-sm mt-1">
                      學生、上班族、創業者、對 AI 有興趣的任何人
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 pb-6 text-center">
              <button
                onClick={onClose}
                className="text-neutral-400 text-sm hover:text-neutral-600 transition-colors"
              >
                稍後再說
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
