'use client';

import { motion } from 'motion/react';
import type { PlanV2 } from '@/lib/types';
import { Button } from '@/components/ui/buttons';

interface PlanStickyFooterProps {
  selectedPlan: PlanV2 | null;
}

export function PlanStickyFooter({ selectedPlan }: PlanStickyFooterProps) {
  if (!selectedPlan) return null;

  const handleCTA = () => {
    window.open(selectedPlan.ctaLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] safe-area-inset"
      role="region"
      aria-label="已選方案"
    >
      <div className="flex items-center justify-between gap-4 p-4 max-w-lg mx-auto">
        {/* Plan info */}
        <div className="min-w-0">
          <p className="text-sm text-neutral-500">已選</p>
          <p className="font-semibold text-neutral-900 truncate" aria-live="polite">
            {selectedPlan.title}
          </p>
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-neutral-900">{selectedPlan.price}</p>
          {selectedPlan.priceNote && (
            <p className="text-xs text-neutral-500">{selectedPlan.priceNote}</p>
          )}
        </div>

        {/* CTA */}
        <Button
          variant="primary"
          size="md"
          onClick={handleCTA}
          className="shrink-0"
        >
          {selectedPlan.ctaText || '加入計劃'}
        </Button>
      </div>
    </motion.div>
  );
}
