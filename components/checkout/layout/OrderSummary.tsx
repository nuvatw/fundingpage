'use client';

import { useMemo } from 'react';
import type { PlanV2 } from '@/lib/types';
import type { CheckoutFormData } from '@/lib/checkout/schemas';
import { calculateTotal, formatPrice } from '@/lib/checkout/utils';
import { cn } from '@/lib/utils';

interface OrderSummaryProps {
  plan: PlanV2;
  formData: Partial<CheckoutFormData>;
}

export function OrderSummary({ plan, formData }: OrderSummaryProps) {
  const quantity = formData.quantity || 1;

  const { unitPrice, subtotal, discount, total } = useMemo(
    () => calculateTotal(plan, quantity),
    [plan, quantity]
  );

  return (
    <div className="sticky top-20 bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-neutral-100">
        <h3 className="text-lg font-semibold text-neutral-900">訂單摘要</h3>
      </div>

      {/* Plan Info */}
      <div className="p-6 border-b border-neutral-100">
        <div className="flex items-start gap-4">
          {/* Plan Icon */}
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
              plan.isRecommended ? 'bg-primary-100' : 'bg-neutral-100'
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
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-neutral-900">{plan.title}</h4>
            <p className="text-sm text-neutral-500 mt-0.5 line-clamp-2">
              {plan.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">單價</span>
          <span className="text-neutral-900">{formatPrice(unitPrice)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">數量</span>
          <span className="text-neutral-900">x {quantity}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>團報優惠</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-neutral-200">
          <div className="flex justify-between items-baseline">
            <span className="text-neutral-700 font-medium">總計</span>
            <span className="text-2xl font-bold text-neutral-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 pb-6">
        <div className="bg-primary-50 rounded-lg p-3">
          <p className="text-sm text-primary-700">
            付款完成後，確認信將寄送至您的信箱
          </p>
        </div>
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
