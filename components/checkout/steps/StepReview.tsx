'use client';

import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import type { PlanV2 } from '@/lib/types';
import type { CheckoutFormData } from '@/lib/checkout/schemas';
import { calculateTotal, formatPrice, formatPhoneNumber } from '@/lib/checkout/utils';
import { PAYMENT_METHODS } from '@/lib/checkout/constants';
import { Button } from '@/components/ui/buttons/Button';
import { cn } from '@/lib/utils';

// Step numbers for navigation
const STEP_PLAN = 1;
const STEP_BUYER = 2;
const STEP_PAYMENT = 3;
const STEP_STUDENTS = 4;

interface StepReviewProps {
  form: UseFormReturn<CheckoutFormData>;
  plan: PlanV2;
  onNext: () => void;
  onBack: () => void;
  onGoToStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string | null;
}

export function StepReview({
  form,
  plan,
  onGoToStep,
  onSubmit,
  isSubmitting,
  error,
}: StepReviewProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const formData = watch();
  const { quantity, buyer, students, paymentMethod, creditCard, agreedToTerms } = formData;

  const { total } = useMemo(() => calculateTotal(plan, quantity), [plan, quantity]);

  const selectedPaymentMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

  // Mask card number (show last 4 digits)
  const maskedCardNumber = creditCard?.cardNumber
    ? `**** **** **** ${creditCard.cardNumber.replace(/\s/g, '').slice(-4)}`
    : '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          5・資料確認
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          請確認以下資料無誤後送出訂單
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800">送出失敗</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Review Sections */}
      <div className="space-y-4">
        {/* Plan Info */}
        <ReviewSection
          title="購買方案"
          onEdit={() => onGoToStep(STEP_PLAN)}
        >
          <div className="space-y-1">
            <p className="font-medium text-neutral-900">{plan.title}</p>
            <p className="text-sm text-neutral-600">
              {quantity} 人 × {plan.price}
            </p>
            <p className="text-lg font-semibold text-primary-600">
              {formatPrice(total)}
            </p>
          </div>
        </ReviewSection>

        {/* Buyer Info */}
        <ReviewSection
          title="訂購人資料"
          onEdit={() => onGoToStep(STEP_BUYER)}
        >
          <div className="space-y-1 text-sm">
            <p className="text-neutral-900">{buyer.name}</p>
            <p className="text-neutral-600">{buyer.email}</p>
            <p className="text-neutral-600">{formatPhoneNumber(buyer.phone)}</p>
            {buyer.invoiceType === 'company' && (
              <p className="text-neutral-600">
                {buyer.companyName} ({buyer.taxId})
              </p>
            )}
          </div>
        </ReviewSection>

        {/* Payment Method */}
        <ReviewSection
          title="付款方式"
          onEdit={() => onGoToStep(STEP_PAYMENT)}
        >
          <div className="space-y-2">
            <p className="text-neutral-900">{selectedPaymentMethod?.label}</p>
            {paymentMethod === 'credit_card' && creditCard && (
              <div className="text-sm text-neutral-600 space-y-1">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="w-4 h-4" />
                  <span>{maskedCardNumber}</span>
                </div>
                <p>持卡人：{creditCard.cardholderName}</p>
                <p>到期日：{creditCard.expiryDate}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Students */}
        <ReviewSection
          title="學員資料"
          onEdit={() => onGoToStep(STEP_STUDENTS)}
        >
          <div className="space-y-3">
            {students.map((student, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium text-neutral-900">
                  學員 {index + 1}：{student.name}
                </p>
                <p className="text-neutral-600">{student.email}</p>
              </div>
            ))}
          </div>
        </ReviewSection>
      </div>

      {/* Terms Agreement */}
      <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('agreedToTerms')}
            className={cn(
              'w-5 h-5 mt-0.5 rounded border-neutral-300',
              'text-primary-600 focus:ring-primary-500',
              errors.agreedToTerms && 'border-red-500'
            )}
          />
          <span className="text-sm text-neutral-700">
            我已閱讀並同意
            <a
              href="/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              相關條款
            </a>
          </span>
        </label>
        {errors.agreedToTerms && (
          <p className="text-sm text-red-600 mt-2">
            {errors.agreedToTerms.message}
          </p>
        )}
      </div>

      {/* Submit Button - Desktop */}
      <div className="hidden lg:block pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={onSubmit}
          isLoading={isSubmitting}
          disabled={!agreedToTerms || isSubmitting}
          className="w-full"
        >
          送出訂單
        </Button>
      </div>
    </div>
  );
}

// Review Section Component
function ReviewSection({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-neutral-900">{title}</h4>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          變更
        </button>
      </div>
      {children}
    </div>
  );
}

// Credit Card Icon
function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}
