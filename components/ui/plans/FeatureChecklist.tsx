'use client';

import { cn } from '@/lib/utils';

export interface FeatureChecklistProps {
  title?: string;
  features: string[];
  columns?: 2 | 3;
  className?: string;
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-primary-500 shrink-0 mt-0.5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FeatureChecklist({
  title,
  features,
  columns = 2,
  className,
}: FeatureChecklistProps) {
  return (
    <div className={cn('', className)}>
      {title && (
        <p className="text-sm font-medium text-neutral-600 mb-4 text-center">
          {title}
        </p>
      )}
      <div
        className={cn(
          'grid gap-x-8 gap-y-2',
          columns === 2 && 'grid-cols-1 sm:grid-cols-2',
          columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        )}
      >
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <CheckIcon />
            <span className="text-sm text-neutral-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
