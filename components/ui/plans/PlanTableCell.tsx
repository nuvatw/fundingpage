'use client';

import { cn } from '@/lib/utils';
import type { FeatureCellValue } from '@/lib/types';

interface PlanTableCellProps {
  value: FeatureCellValue;
  isRecommended?: boolean;
}

// Enabled: 藍色實心圓 + 白色勾勾
function CheckFilledIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-500',
        className
      )}
      role="img"
      aria-label="包含"
    >
      <svg
        className="w-3 h-3 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

// Disabled: 灰色空心圓
function CircleOutlineIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-neutral-300',
        className
      )}
      role="img"
      aria-label="不包含"
    />
  );
}

export function PlanTableCell({ value, isRecommended }: PlanTableCellProps) {
  const baseClasses = cn(
    'p-3 lg:p-4 text-center border-l border-neutral-100',
    'flex items-center justify-center min-h-[52px]',
    isRecommended && 'bg-primary-50/50'
  );

  switch (value.type) {
    case 'boolean':
      return (
        <div className={baseClasses}>
          {value.enabled ? <CheckFilledIcon /> : <CircleOutlineIcon />}
        </div>
      );

    case 'value':
      return (
        <div className={baseClasses}>
          <span className="text-sm font-medium text-neutral-900">
            {value.text}
          </span>
        </div>
      );

    case 'callout':
      return (
        <div className={baseClasses}>
          <span className="text-sm font-medium text-primary-600">
            {value.text}
          </span>
        </div>
      );
  }
}
