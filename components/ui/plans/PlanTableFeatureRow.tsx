'use client';

import { cn } from '@/lib/utils';
import { PlanTableCell } from './PlanTableCell';
import { PlanIcon } from './PlanIcons';
import type { PlanFeatureDefinition, PlanV2 } from '@/lib/types';

interface PlanTableFeatureRowProps {
  feature: PlanFeatureDefinition;
  plans: PlanV2[];
  isOdd?: boolean;
}

export function PlanTableFeatureRow({
  feature,
  plans,
  isOdd,
}: PlanTableFeatureRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[minmax(180px,240px)_repeat(4,minmax(100px,1fr))]',
        'border-b border-neutral-100',
        isOdd && 'bg-neutral-50/50'
      )}
    >
      {/* Feature Name */}
      <div className="p-3 lg:p-4 flex items-center gap-2">
        <PlanIcon
          name={feature.icon}
          className="w-4 h-4 text-neutral-400 flex-shrink-0"
        />
        <span className="text-sm text-neutral-700 leading-tight">
          {feature.text}
        </span>
      </div>

      {/* Plan Cells */}
      {plans.map((plan) => {
        const cellValue = plan.featureMatrix[feature.id];
        // 如果沒有定義，預設為 disabled
        const value = cellValue || { type: 'boolean' as const, enabled: false };

        return (
          <PlanTableCell
            key={plan.id}
            value={value}
            isRecommended={plan.isRecommended}
          />
        );
      })}
    </div>
  );
}
