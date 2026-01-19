'use client';

import { cn } from '@/lib/utils';
import type { StepDefinition } from '@/lib/checkout/types';

interface StepIndicatorProps {
  steps: StepDefinition[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
  isDesktop: boolean;
}

export function StepIndicator({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  isDesktop,
}: StepIndicatorProps) {
  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const canClickStep = (stepId: number) => {
    return stepId <= currentStep || completedSteps.includes(stepId - 1);
  };

  // Mobile: Compact dot indicators
  if (!isDesktop) {
    return (
      <div className="flex items-center justify-center gap-2">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          return (
            <button
              key={step.id}
              onClick={() => canClickStep(step.id) && onStepClick(step.id)}
              disabled={!canClickStep(step.id)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-200',
                status === 'completed' && 'bg-primary-600',
                status === 'current' && 'bg-primary-600 w-6',
                status === 'pending' && 'bg-neutral-300',
                !canClickStep(step.id) && 'cursor-not-allowed'
              )}
              aria-label={`${step.label} - ${
                status === 'completed'
                  ? '已完成'
                  : status === 'current'
                    ? '進行中'
                    : '未開始'
              }`}
            />
          );
        })}
      </div>
    );
  }

  // Desktop: Horizontal numbered steps with labels
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id);
        const isLast = index === steps.length - 1;
        const clickable = canClickStep(step.id);

        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle and label */}
            <button
              onClick={() => clickable && onStepClick(step.id)}
              disabled={!clickable}
              className={cn(
                'flex items-center gap-3 group',
                clickable ? 'cursor-pointer' : 'cursor-not-allowed'
              )}
            >
              {/* Circle */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  'text-sm font-semibold transition-all duration-200',
                  status === 'completed' &&
                    'bg-primary-600 text-white',
                  status === 'current' &&
                    'bg-primary-600 text-white ring-4 ring-primary-100',
                  status === 'pending' &&
                    'bg-neutral-200 text-neutral-500',
                  clickable &&
                    status !== 'current' &&
                    'group-hover:ring-2 group-hover:ring-primary-200'
                )}
              >
                {status === 'completed' ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-sm font-medium transition-colors',
                  status === 'current' && 'text-primary-600',
                  status === 'completed' && 'text-neutral-700',
                  status === 'pending' && 'text-neutral-400'
                )}
              >
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {!isLast && (
              <div
                className={cn(
                  'w-12 h-0.5 mx-4',
                  completedSteps.includes(step.id)
                    ? 'bg-primary-600'
                    : 'bg-neutral-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
