'use client';

import { useState, useMemo, useCallback } from 'react';
import { PLANS_V2 } from '@/lib/data';
import type { PlanV2 } from '@/lib/types';

export function usePlanSelection(defaultPlanId: string = 'accompany') {
  const [selectedPlanId, setSelectedPlanId] = useState(defaultPlanId);

  const selectedPlan = useMemo<PlanV2 | null>(
    () => PLANS_V2.find((p) => p.id === selectedPlanId) ?? null,
    [selectedPlanId]
  );

  const selectPlan = useCallback((planId: string) => {
    setSelectedPlanId(planId);
  }, []);

  return {
    selectedPlanId,
    selectedPlan,
    selectPlan,
  };
}
