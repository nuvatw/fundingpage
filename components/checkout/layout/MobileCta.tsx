'use client';

import { useMemo } from 'react';
import type { PlanV2 } from '@/lib/types';
import type { CheckoutFormData } from '@/lib/checkout/schemas';
import { calculateTotal, formatPrice } from '@/lib/checkout/utils';
import { Button } from '@/components/ui/buttons/Button';
import { cn } from '@/lib/utils';

interface MobileCtaProps {
  plan: PlanV2;
  formData: Partial<CheckoutFormData>;
  currentStep: number;
  isLastStep: boolean;
  onNext: () => void;
  isSubmitting: boolean;
}

export function MobileCta({
  plan,
  formData,
  currentStep,
  isLastStep,
  onNext,
  isSubmitting,
}: MobileCtaProps) {
  const quantity = formData.quantity || 1;

  const { total } = useMemo(
    () => calculateTotal(plan, quantity),
    [plan, quantity]
  );

  const buttonText = isLastStep ? '送出訂單' : '繼續';

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'bg-white border-t border-neutral-200',
        'px-4 py-3 pb-safe'
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Price Summary */}
        <div className="min-w-0">
          <p className="text-xs text-neutral-500">總計</p>
          <p className="text-lg font-bold text-neutral-900">
            {formatPrice(total)}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          isLoading={isSubmitting}
          className="shrink-0 min-w-[140px]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
