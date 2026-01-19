'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons';
import { PlanIcon } from './PlanIcons';
import type {
  PlanV2,
  FeatureCategoryInfo,
  PlanFeatureDefinition,
  FeatureCellValue,
} from '@/lib/types';

interface PlanComparisonTableProps {
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
    <span className="text-neutral-300 text-lg font-medium" aria-label="不包含">
      —
    </span>
  );
}

// 表格 Cell
function TableCell({
  value,
  isRecommended,
}: {
  value: FeatureCellValue;
  isRecommended?: boolean;
}) {
  const baseClasses = cn(
    'px-3 py-3 text-center border-l border-neutral-100',
    isRecommended && 'bg-primary-50/30'
  );

  switch (value.type) {
    case 'boolean':
      return (
        <td className={baseClasses}>
          {value.enabled ? <CheckIcon /> : <DashIcon />}
        </td>
      );
    case 'value':
      return (
        <td className={baseClasses}>
          <span className="text-sm font-medium text-neutral-700">{value.text}</span>
        </td>
      );
    case 'callout':
      return (
        <td className={baseClasses}>
          <span className="text-sm font-semibold text-primary-600">{value.text}</span>
        </td>
      );
  }
}

export function PlanComparisonTable({
  plans,
  categories,
  features,
  locked = false,
}: PlanComparisonTableProps) {
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );

  const isLocked = locked;

  const handleCTA = (plan: PlanV2) => {
    if (isLocked && plan.id !== 'free' && plan.id !== 'group') {
      // 尚未開放，不執行任何動作
      return;
    }
    // 外部連結（免費體驗、團體報名）用新視窗開啟
    if (plan.id === 'free' || plan.id === 'group') {
      window.open(plan.ctaLink, '_blank', 'noopener,noreferrer');
    } else {
      const checkoutUrl = `/checkout?planId=${plan.id}&qty=1&returnUrl=${encodeURIComponent(window.location.href)}`;
      window.open(checkoutUrl, '_blank');
    }
  };

  // 檢查是否有任何 badge 需要凸出
  const hasBadge = plans.some((p) => p.isRecommended || p.badge);

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-72" />
          {plans.map((plan) => (
            <col key={plan.id} />
          ))}
        </colgroup>

        {/* Header: 方案卡片區 */}
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-neutral-200 bg-white">
            {/* 左上角 - 標題區 */}
            <th className="p-5 text-left align-middle bg-neutral-50 sticky left-0 z-10 border-r border-neutral-100">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-neutral-900">功能比較</p>
                <p className="text-xs text-neutral-500">往下滑動查看所有功能</p>
              </div>
            </th>

            {/* 各方案 Header - 等高設計 */}
            {plans.map((plan, index) => {
              const showBadge = plan.isRecommended || plan.badge;

              return (
                <th
                  key={plan.id}
                  className={cn(
                    'p-0 text-center align-top relative',
                    index > 0 && 'border-l border-neutral-200',
                    plan.isRecommended && 'bg-primary-50/50'
                  )}
                >
                  {/* Badge 凸出區域 */}
                  <div
                    className={cn(
                      'flex justify-center',
                      hasBadge ? 'h-8 pt-2' : 'h-0'
                    )}
                  >
                    {showBadge && (
                      <span
                        className={cn(
                          'px-3 py-1 text-xs font-medium rounded-full',
                          plan.isRecommended
                            ? 'bg-primary-600 text-white'
                            : 'bg-amber-500 text-white'
                        )}
                      >
                        {plan.isRecommended ? '推薦' : plan.badge}
                      </span>
                    )}
                  </div>

                  {/* 推薦方案頂部強調線 */}
                  {plan.isRecommended && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary-500" />
                  )}

                  {/* 內容區 - 固定高度確保等高 */}
                  <div className="flex flex-col items-center px-3 pb-4 h-40 justify-between">
                    {/* 上半部：Title + Subtitle */}
                    <div className="text-center">
                      <h3 className="text-base font-bold text-neutral-900 leading-tight">
                        {plan.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 leading-snug">
                        {plan.subtitle}
                      </p>
                    </div>

                    {/* 下半部：Price + CTA */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className="text-xl font-bold text-neutral-900">{plan.price}</span>
                        {plan.priceNote && (
                          <span className="text-xs text-neutral-500">{plan.priceNote}</span>
                        )}
                      </div>
                      <Button
                        variant={plan.isRecommended ? 'primary' : 'secondary'}
                        size="sm"
                        className={cn(
                          'mt-3 text-sm',
                          isLocked && plan.id !== 'free' && plan.id !== 'group' && 'opacity-60 cursor-not-allowed'
                        )}
                        onClick={() => handleCTA(plan)}
                        disabled={isLocked && plan.id !== 'free' && plan.id !== 'group'}
                      >
                        {isLocked && plan.id !== 'free' && plan.id !== 'group' ? '尚未開放' : (plan.ctaText || '加入')}
                      </Button>
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sortedCategories.map((category) => {
            const categoryFeatures = features.filter((f) => f.categoryId === category.id);

            return (
              <React.Fragment key={category.id}>
                {/* Category Header Row */}
                <tr>
                  <td
                    colSpan={plans.length + 1}
                    className="px-4 py-2.5 bg-neutral-100/80 border-b border-neutral-200"
                  >
                    <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                      {category.label}
                    </span>
                  </td>
                </tr>

                {/* Feature Rows */}
                {categoryFeatures.map((feature, idx) => (
                  <tr
                    key={feature.id}
                    className={cn(
                      'border-b border-neutral-100',
                      idx % 2 === 1 && 'bg-neutral-50/40'
                    )}
                  >
                    {/* 功能名稱 */}
                    <td className="px-4 py-3 sticky left-0 bg-white border-r border-neutral-100 z-5">
                      <div className="flex items-center gap-2.5">
                        <PlanIcon
                          name={feature.icon}
                          className="w-4 h-4 text-neutral-400 shrink-0"
                        />
                        <span className="text-sm text-neutral-700 leading-snug">
                          {feature.text}
                        </span>
                      </div>
                    </td>

                    {/* 各方案 Cell */}
                    {plans.map((plan) => {
                      const cellValue = plan.featureMatrix[feature.id] || {
                        type: 'boolean' as const,
                        enabled: false,
                      };
                      return (
                        <TableCell
                          key={plan.id}
                          value={cellValue}
                          isRecommended={plan.isRecommended}
                        />
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
