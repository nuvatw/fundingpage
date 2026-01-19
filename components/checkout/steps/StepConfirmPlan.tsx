'use client';

import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import type { PlanV2 } from '@/lib/types';
import type { CheckoutFormData } from '@/lib/checkout/schemas';
import { calculateTotal, formatPrice, getMaxQuantity } from '@/lib/checkout/utils';
import { Button } from '@/components/ui/buttons/Button';
import { cn } from '@/lib/utils';

interface StepConfirmPlanProps {
  form: UseFormReturn<CheckoutFormData>;
  plan: PlanV2;
  onNext: () => void;
  onBack: () => void;
  onQuantityChange: (qty: number) => void;
  returnUrl: string;
}

export function StepConfirmPlan({
  form,
  plan,
  onNext,
  onQuantityChange,
  returnUrl,
}: StepConfirmPlanProps) {
  const quantity = form.watch('quantity');
  const maxQuantity = getMaxQuantity(plan.id);

  const { unitPrice, total } = useMemo(
    () => calculateTotal(plan, quantity),
    [plan, quantity]
  );

  const handleModifyPlan = () => {
    window.location.href = `${returnUrl}#plans`;
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          1・確認方案
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          確認您選擇的方案與人數
        </p>
      </div>

      {/* Plan Info */}
      <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* Plan Icon */}
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                plan.isRecommended ? 'bg-primary-100' : 'bg-neutral-200'
              )}
            >
              <PlanIconComponent
                name={plan.icon || 'Play'}
                className={cn(
                  'w-6 h-6',
                  plan.isRecommended ? 'text-primary-600' : 'text-neutral-600'
                )}
              />
            </div>

            {/* Plan Details */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-neutral-900">{plan.title}</h3>
                {plan.isRecommended && (
                  <span className="px-2 py-0.5 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                    推薦
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-500 mt-0.5">{plan.subtitle}</p>
              <p className="text-lg font-semibold text-neutral-900 mt-2">
                {plan.price}
                {plan.priceNote && (
                  <span className="text-sm font-normal text-neutral-500 ml-1">
                    {plan.priceNote}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Modify Plan Button */}
          <button
            type="button"
            onClick={handleModifyPlan}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium shrink-0"
          >
            修改方案
          </button>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-neutral-900">人數</h4>
            <p className="text-sm text-neutral-500 mt-0.5">
              選擇報名人數
              {plan.id === 'founder' && ' (領航方案限 15 位)'}
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                'border border-neutral-300 bg-white',
                'text-neutral-700 transition-colors',
                'hover:bg-neutral-50 active:bg-neutral-100',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="減少人數"
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
                  d="M20 12H4"
                />
              </svg>
            </button>

            <span className="w-12 text-center text-xl font-semibold text-neutral-900">
              {quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={quantity >= maxQuantity}
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                'border border-neutral-300 bg-white',
                'text-neutral-700 transition-colors',
                'hover:bg-neutral-50 active:bg-neutral-100',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="增加人數"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="p-4 rounded-xl border border-primary-200 bg-primary-50">
        <div className="flex items-center justify-between">
          <span className="text-neutral-700">
            {formatPrice(unitPrice)} × {quantity} 人
          </span>
          <span className="text-xl font-bold text-primary-700">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* CTA - Desktop only, mobile uses sticky footer */}
      <div className="hidden lg:block pt-4">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full">
          繼續
        </Button>
      </div>
    </div>
  );
}

// Simple plan icon component
function PlanIconComponent({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const icons: Record<string, React.ReactNode> = {
    Play: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    Users: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    Crown: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3l3.5 4L12 3l3.5 4L19 3v12a2 2 0 01-2 2H7a2 2 0 01-2-2V3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 19h14"
        />
      </svg>
    ),
  };

  return icons[name] || icons.Play;
}
