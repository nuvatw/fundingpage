'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons';

export interface GeneralPlanCardProps {
  id: string;
  title: string;
  /** e.g., "買 1 送 1，共 2 個月" */
  duration: string;
  /** e.g., "NT$2,400" */
  price: string;
  /** e.g., "5折" - discount percentage, shows as overlay badge */
  discount?: string;
  /** e.g., "月均 $1,200 · 省 $2,400" */
  priceMeta?: string;
  isRecommended?: boolean;
  ctaText?: string;
  locked?: boolean;
  onCTAClick?: () => void;
}

export function GeneralPlanCard({
  title,
  duration,
  price,
  discount,
  priceMeta,
  isRecommended = false,
  ctaText = '選擇此方案',
  locked = false,
  onCTAClick,
}: GeneralPlanCardProps) {
  const handleClick = () => {
    if (locked) return;
    onCTAClick?.();
  };

  return (
    <div
      className={cn(
        // Base card styles - unified tokens
        'relative flex flex-col rounded-card bg-white border transition-all duration-200',
        'p-6',
        // Full height for equal card heights in grid
        'h-full',
        // Default state
        'border-neutral-200 shadow-card',
        // Hover state (non-recommended)
        !isRecommended && 'hover:shadow-card-elevated hover:border-neutral-300',
        // Recommended state - subtle elevation, not shouting
        isRecommended && [
          'border-primary-200',
          'shadow-card-recommended',
          'scale-[1.02]',
          'z-10',
        ]
      )}
    >
      {/* Discount badge - centered, overlapping top edge */}
      {discount && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className={cn(
              'inline-flex px-4 py-1.5 text-sm font-bold rounded-full shadow-md',
              isRecommended
                ? 'bg-primary-600 text-white'
                : 'bg-primary-500 text-white'
            )}
          >
            {discount}
          </span>
        </div>
      )}

      {/* Header section */}
      <div className={cn('mb-4', discount && 'mt-3')}>
        <h3 className="text-lg font-semibold text-neutral-900 mb-1">
          {title}
        </h3>
        <p className="text-sm text-neutral-500">{duration}</p>
      </div>

      {/* Price section */}
      <div className="mb-4">
        <span className="text-3xl font-bold text-neutral-900 tracking-tight">
          {price}
        </span>
        {priceMeta && (
          <p className="text-sm mt-2">
            {priceMeta.split('·').map((part, i) => {
              const trimmed = part.trim();
              const isSavings = trimmed.startsWith('省');
              return (
                <span key={i}>
                  {i > 0 && <span className="text-neutral-400"> · </span>}
                  <span
                    className={
                      isSavings
                        ? 'font-bold text-primary-600'
                        : 'text-neutral-500'
                    }
                  >
                    {trimmed}
                  </span>
                </span>
              );
            })}
          </p>
        )}
      </div>

      {/* CTA - primary only for recommended */}
      <div className="mt-auto">
        <Button
          variant={isRecommended ? 'primary' : 'secondary'}
          size="md"
          onClick={handleClick}
          disabled={locked}
          className={cn(
            'w-full justify-center',
            locked && 'opacity-60 cursor-not-allowed'
          )}
        >
          {locked ? '尚未開放' : ctaText}
        </Button>
      </div>
    </div>
  );
}

// Group plan card variant - for team/enterprise pricing
export interface GroupPlanCardProps {
  ctaLink?: string;
  onCTAClick?: () => void;
}

export function GroupPlanCard({ onCTAClick }: GroupPlanCardProps) {
  return (
    <div
      className={cn(
        // Base card styles - unified tokens
        'relative flex flex-col rounded-card bg-neutral-50 border transition-all duration-200',
        'p-6',
        // Full height for equal card heights in grid
        'h-full',
        'border-neutral-200 shadow-card',
        'hover:shadow-card-elevated hover:border-neutral-300'
      )}
    >
      {/* Badge */}
      <div className="absolute -top-3 left-6">
        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-neutral-700 text-white">
          團體優惠
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col mt-2">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1">
          團體報名
        </h3>
        <p className="text-sm text-neutral-500 mb-4">
          3 人以上享專屬優惠
        </p>

        <div className="mb-4">
          <span className="text-3xl font-bold text-neutral-900 tracking-tight">
            專屬報價
          </span>
          <p className="text-sm text-neutral-500 mt-2">
            公司團報、讀書會、社群揪團
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Button
          variant="secondary"
          size="md"
          onClick={onCTAClick}
          className="w-full justify-center"
        >
          LINE 諮詢
        </Button>
      </div>
    </div>
  );
}
