'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons';
import type { PlanV2 } from '@/lib/types';

interface PlanTableHeaderProps {
  plans: PlanV2[];
}

export function PlanTableHeader({ plans }: PlanTableHeaderProps) {
  return (
    <div className="grid grid-cols-[minmax(180px,240px)_repeat(4,minmax(100px,1fr))] border-b border-neutral-200 bg-white sticky top-0 z-10">
      {/* Feature Label Column */}
      <div className="p-4 bg-neutral-50 flex items-end">
        <span className="text-sm font-medium text-neutral-600">方案比較</span>
      </div>

      {/* Plan Columns */}
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            'p-4 text-center border-l border-neutral-200',
            'flex flex-col items-center justify-center gap-2',
            plan.isRecommended && 'bg-primary-50'
          )}
        >
          {/* Recommended Badge */}
          {plan.isRecommended && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
              推薦
            </span>
          )}

          {/* Plan Badge (限量等) */}
          {plan.badge && !plan.isRecommended && (
            <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              {plan.badge}
            </span>
          )}

          {/* Plan Title */}
          <h3 className="text-base lg:text-lg font-bold text-neutral-900">
            {plan.title}
          </h3>

          {/* Price */}
          <div className="flex flex-col items-center">
            <span className="text-xl lg:text-2xl font-bold text-neutral-900">
              {plan.price}
            </span>
            {plan.priceNote && (
              <span className="text-xs text-neutral-500">{plan.priceNote}</span>
            )}
          </div>

          {/* CTA Button */}
          <Button
            variant={plan.isRecommended ? 'primary' : 'secondary'}
            size="sm"
            className="mt-1 w-full max-w-[120px] text-sm"
            onClick={() => {
              if (plan.id === 'free') {
                // Free plan - go to external link
                window.open(plan.ctaLink, '_blank');
              } else {
                // Paid plans - go to checkout
                const checkoutUrl = `/checkout?planId=${plan.id}&qty=1&returnUrl=${encodeURIComponent(window.location.href)}`;
                window.open(checkoutUrl, '_blank');
              }
            }}
          >
            {plan.ctaText || '加入計劃'}
          </Button>
        </div>
      ))}
    </div>
  );
}
