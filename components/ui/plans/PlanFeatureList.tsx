'use client';

import { useMemo } from 'react';
import { FEATURE_CATEGORIES, PLAN_FEATURES } from '@/lib/data';
import type { FeatureCategory, PlanFeatureDefinition } from '@/lib/types';
import { PlanIcon } from './PlanIcons';

interface PlanFeatureListProps {
  enabledFeatureIds: string[];
  showDisabled?: boolean;
  variant?: 'desktop' | 'mobile';
}

interface GroupedFeatures {
  categoryId: FeatureCategory;
  categoryLabel: string;
  features: Array<PlanFeatureDefinition & { isEnabled: boolean }>;
}

export function PlanFeatureList({
  enabledFeatureIds,
  showDisabled = true,
  variant = 'desktop',
}: PlanFeatureListProps) {
  const enabledSet = useMemo(() => new Set(enabledFeatureIds), [enabledFeatureIds]);

  const groupedFeatures = useMemo<GroupedFeatures[]>(() => {
    // Sort categories by order
    const sortedCategories = [...FEATURE_CATEGORIES].sort((a, b) => a.order - b.order);

    return sortedCategories
      .map((category) => {
        const categoryFeatures = PLAN_FEATURES.filter(
          (f) => f.categoryId === category.id
        ).map((feature) => ({
          ...feature,
          isEnabled: enabledSet.has(feature.id),
        }));

        // Filter out disabled features if showDisabled is false
        const filteredFeatures = showDisabled
          ? categoryFeatures
          : categoryFeatures.filter((f) => f.isEnabled);

        return {
          categoryId: category.id,
          categoryLabel: category.label,
          features: filteredFeatures,
        };
      })
      .filter((group) => group.features.length > 0); // Only show categories with features
  }, [enabledSet, showDisabled]);

  if (variant === 'mobile') {
    return (
      <div className="space-y-3">
        {groupedFeatures.map((group) => (
          <div key={group.categoryId}>
            <h5 className="text-xs font-medium text-neutral-500 mb-2">
              {group.categoryLabel}
            </h5>
            <ul className="space-y-2">
              {group.features.map((feature) => (
                <li
                  key={feature.id}
                  className={`flex items-start gap-2 text-sm ${
                    feature.isEnabled ? 'text-neutral-700' : 'text-neutral-300'
                  }`}
                >
                  <PlanIcon
                    name={feature.isEnabled ? 'CheckCircle' : 'Circle'}
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      feature.isEnabled ? 'text-primary-500' : 'text-neutral-300'
                    }`}
                  />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="space-y-4">
      {groupedFeatures.map((group, groupIndex) => (
        <div key={group.categoryId}>
          <h5
            className={`text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 ${
              groupIndex > 0 ? 'mt-4' : ''
            }`}
          >
            {group.categoryLabel}
          </h5>
          <ul className="space-y-2">
            {group.features.map((feature) => (
              <li
                key={feature.id}
                className={`flex items-start gap-2 text-sm ${
                  feature.isEnabled ? 'text-neutral-700' : 'text-neutral-300'
                }`}
                aria-disabled={!feature.isEnabled}
              >
                <PlanIcon
                  name={feature.isEnabled ? 'CheckCircle' : 'Circle'}
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    feature.isEnabled ? 'text-primary-500' : 'text-neutral-300'
                  }`}
                />
                <span>
                  {!feature.isEnabled && (
                    <span className="sr-only">不包含：</span>
                  )}
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
