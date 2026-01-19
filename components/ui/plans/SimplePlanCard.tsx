'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons';

export interface SimplePlanCardProps {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceMeta?: string; // e.g., "月均 $960 · 省 40%"
  badge?: string;
  isRecommended?: boolean;
  ctaText?: string;
  ctaLink?: string;
  locked?: boolean;
  onCTAClick?: () => void;
}

export function SimplePlanCard({
  id,
  title,
  subtitle,
  price,
  priceMeta,
  badge,
  isRecommended = false,
  ctaText = '選擇方案',
  locked = false,
  onCTAClick,
}: SimplePlanCardProps) {
  const handleClick = () => {
    if (locked) return;
    onCTAClick?.();
  };

  return (
    <div
      className={cn(
        // Base card styles - unified tokens
        'relative flex flex-col rounded-card bg-white border transition-all duration-200',
        'p-6 sm:p-8',
        // Default state
        'border-neutral-200 shadow-card',
        // Hover state (non-recommended)
        !isRecommended && 'hover:shadow-card-elevated hover:border-neutral-300',
        // Recommended state - subtle elevation, not shouting
        isRecommended && [
          'border-primary-200',
          'shadow-card-recommended',
          'scale-[1.02]', // Slightly larger
          'z-10',
        ]
      )}
    >
      {/* Single badge - positioned consistently */}
      {(badge || isRecommended) && (
        <div className="absolute -top-3 left-6">
          <span
            className={cn(
              'inline-flex px-3 py-1 text-xs font-medium rounded-full',
              isRecommended
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-700 text-white'
            )}
          >
            {isRecommended ? '推薦' : badge}
          </span>
        </div>
      )}

      {/* Header section */}
      <div className={cn('mb-6', (badge || isRecommended) && 'mt-2')}>
        <h3 className="text-lg font-semibold text-neutral-900 mb-1">
          {title}
        </h3>
        <p className="text-sm text-neutral-500">
          {subtitle}
        </p>
      </div>

      {/* Price section - single focal point */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-neutral-900 tracking-tight">
            {price}
          </span>
        </div>
        {priceMeta && (
          <p className="text-sm text-neutral-500 mt-1">
            {priceMeta}
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
