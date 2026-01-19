'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons';
import { PlanIcon } from './PlanIcons';
import type {
  PlanV2,
  FeatureCategoryInfo,
  PlanFeatureDefinition,
} from '@/lib/types';

interface PlanComparisonMobileProps {
  plans: PlanV2[];
  categories: FeatureCategoryInfo[];
  features: PlanFeatureDefinition[];
  locked?: boolean; // 是否鎖定購買（用於未開放的情況）
}

// 包含：藍色實心勾
function CheckIcon() {
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-500"
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

// 不包含：淡灰色橫線
function DashIcon() {
  return (
    <span className="text-neutral-300 text-base" aria-label="不包含">
      —
    </span>
  );
}

export function PlanComparisonMobile({
  plans,
  categories,
  features,
  locked = false,
}: PlanComparisonMobileProps) {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(
    // 預設選中推薦方案
    plans.findIndex((p) => p.isRecommended) ?? 0
  );

  const selectedPlan = plans[selectedPlanIndex];

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );

  const isLocked = locked;

  const handleCTA = () => {
    if (isLocked && selectedPlan.id !== 'free' && selectedPlan.id !== 'group') {
      // 尚未開放，不執行任何動作
      return;
    }
    // 外部連結（免費體驗、團體報名）用新視窗開啟
    if (selectedPlan.id === 'free' || selectedPlan.id === 'group') {
      window.open(selectedPlan.ctaLink, '_blank', 'noopener,noreferrer');
    } else {
      const checkoutUrl = `/checkout?planId=${selectedPlan.id}&qty=1&returnUrl=${encodeURIComponent(window.location.href)}`;
      window.open(checkoutUrl, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      {/* Plan Tabs - Segmented Control */}
      <div className="flex bg-neutral-100 rounded-lg p-1 gap-1">
        {plans.map((plan, index) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlanIndex(index)}
            className={cn(
              'flex-1 py-2 px-2 text-xs font-medium rounded-md transition-all',
              selectedPlanIndex === index
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            <span className="block truncate">{plan.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Plan Card */}
      <div
        className={cn(
          'rounded-xl border bg-white p-5',
          selectedPlan.isRecommended
            ? 'border-primary-300 ring-1 ring-primary-100'
            : 'border-neutral-200'
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">{selectedPlan.title}</h3>
            <p className="text-sm text-neutral-500 mt-0.5">{selectedPlan.subtitle}</p>
          </div>
          {selectedPlan.isRecommended && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary-600 text-white rounded-full">
              推薦
            </span>
          )}
          {selectedPlan.badge && !selectedPlan.isRecommended && (
            <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              {selectedPlan.badge}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-neutral-900">{selectedPlan.price}</span>
            {selectedPlan.priceNote && (
              <span className="text-sm text-neutral-500">{selectedPlan.priceNote}</span>
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-1">{selectedPlan.suitableFor}</p>
        </div>

        {/* CTA */}
        <Button
          variant={selectedPlan.isRecommended ? 'primary' : 'secondary'}
          size="md"
          onClick={handleCTA}
          className={cn(
            'w-full mb-5',
            isLocked && selectedPlan.id !== 'free' && selectedPlan.id !== 'group' && 'opacity-60 cursor-not-allowed'
          )}
          disabled={isLocked && selectedPlan.id !== 'free' && selectedPlan.id !== 'group'}
        >
          {isLocked && selectedPlan.id !== 'free' && selectedPlan.id !== 'group' ? '尚未開放' : (selectedPlan.ctaText || '加入計劃')}
        </Button>

        {/* Features List */}
        <div className="border-t border-neutral-100 pt-4 space-y-4">
          {sortedCategories.map((category) => {
            const categoryFeatures = features.filter((f) => f.categoryId === category.id);

            return (
              <div key={category.id}>
                {/* Category Label */}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                  {category.label}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {categoryFeatures.map((feature) => {
                    const cellValue = selectedPlan.featureMatrix[feature.id] || {
                      type: 'boolean' as const,
                      enabled: false,
                    };
                    const isEnabled =
                      cellValue.type === 'boolean' ? cellValue.enabled : true;

                    return (
                      <div
                        key={feature.id}
                        className={cn(
                          'flex items-center gap-3 py-1.5',
                          !isEnabled && 'opacity-50'
                        )}
                      >
                        {/* Icon */}
                        <div className="w-5 flex justify-center shrink-0">
                          {cellValue.type === 'boolean' ? (
                            cellValue.enabled ? (
                              <CheckIcon />
                            ) : (
                              <DashIcon />
                            )
                          ) : (
                            <CheckIcon />
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-neutral-700">{feature.text}</span>
                          {cellValue.type === 'value' && (
                            <span className="ml-2 text-sm font-medium text-neutral-900">
                              ({cellValue.text})
                            </span>
                          )}
                          {cellValue.type === 'callout' && (
                            <span className="ml-2 text-sm font-semibold text-primary-600">
                              ({cellValue.text})
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swipe Hint */}
      <p className="text-xs text-neutral-400 text-center">
        點擊上方標籤切換方案
      </p>
    </div>
  );
}
