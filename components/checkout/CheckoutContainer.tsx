'use client';

import { useState, useCallback, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import type { PlanV2 } from '@/lib/types';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import {
  checkoutSchema,
  getStepFields,
  type CheckoutFormData,
} from '@/lib/checkout/schemas';
import {
  CHECKOUT_STEPS,
  DEFAULT_FORM_VALUES,
  DEFAULT_CREDIT_CARD,
} from '@/lib/checkout/constants';
import { syncStudentsWithQuantity, getStudentsToRemoveCount } from '@/lib/checkout/utils';
import { CheckoutHeader } from './layout/CheckoutHeader';
import { StepIndicator } from './layout/StepIndicator';
import { OrderSummary } from './layout/OrderSummary';
import { MobileCta } from './layout/MobileCta';
import { StepConfirmPlan } from './steps/StepConfirmPlan';
import { StepBuyerInfo } from './steps/StepBuyerInfo';
import { StepStudentData } from './steps/StepStudentData';
import { StepPayment } from './steps/StepPayment';
import { StepReview } from './steps/StepReview';

interface CheckoutContainerProps {
  plan: PlanV2;
  initialQuantity: number;
  returnUrl: string;
}

export function CheckoutContainer({
  plan,
  initialQuantity,
  returnUrl,
}: CheckoutContainerProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Initialize form with react-hook-form
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ...DEFAULT_FORM_VALUES,
      planId: plan.id as CheckoutFormData['planId'],
      quantity: initialQuantity,
      students: Array(initialQuantity)
        .fill(null)
        .map(() => ({ name: '', email: '', phone: '' })),
    },
    mode: 'onChange',
  });

  // Field array for students
  const studentsField = useFieldArray({
    control: form.control,
    name: 'students',
  });

  // Watch form values
  const quantity = form.watch('quantity');
  const formData = form.watch();

  // Sync students array when quantity changes
  useEffect(() => {
    const currentStudents = form.getValues('students');
    if (quantity !== currentStudents.length) {
      const newStudents = syncStudentsWithQuantity(currentStudents, quantity);
      form.setValue('students', newStudents);
    }
  }, [quantity, form]);

  // Validate current step
  const validateStep = useCallback(
    async (step: number): Promise<boolean> => {
      const fields = getStepFields(step);
      const result = await form.trigger(fields as (keyof CheckoutFormData)[]);
      return result;
    },
    [form]
  );

  // Go to next step
  const nextStep = useCallback(async () => {
    // Special handling for Step 3 (Payment) - set creditCard based on payment method
    if (currentStep === 3) {
      const paymentMethod = form.getValues('paymentMethod');
      if (paymentMethod === 'atm') {
        // ATM: clear creditCard to pass validation
        form.setValue('creditCard', undefined);
      } else if (paymentMethod === 'credit_card') {
        // Credit card: ensure creditCard object exists
        const currentCard = form.getValues('creditCard');
        if (!currentCard) {
          form.setValue('creditCard', DEFAULT_CREDIT_CARD);
        }
      }
    }

    const isValid = await validateStep(currentStep);
    if (isValid) {
      setDirection(1);
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      setCurrentStep((prev) => Math.min(prev + 1, CHECKOUT_STEPS.length));
    }
  }, [currentStep, validateStep, form]);

  // Go to previous step
  const prevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Go to specific step
  const goToStep = useCallback(
    (step: number) => {
      // Can only go to completed steps or current step + 1
      if (step <= currentStep || completedSteps.includes(step - 1)) {
        setDirection(step > currentStep ? 1 : -1);
        setCurrentStep(step);
      }
    },
    [currentStep, completedSteps]
  );

  // Handle quantity change with confirmation
  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      const currentStudents = form.getValues('students');
      const studentsToRemove = getStudentsToRemoveCount(
        currentStudents,
        newQuantity
      );

      if (studentsToRemove > 0) {
        const confirmed = window.confirm(
          `你將移除第 ${newQuantity + 1}~${currentStudents.length} 位學員資料，是否繼續？`
        );
        if (!confirmed) return;
      }

      form.setValue('quantity', newQuantity);
      // Reset Step 4 (students) completion if quantity changed
      if (newQuantity !== currentStudents.length) {
        setCompletedSteps((prev) => prev.filter((s) => s !== 4));
      }
    },
    [form]
  );

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const isValid = await form.trigger();
      if (!isValid) {
        setSubmitError('請確認所有欄位都已正確填寫');
        setIsSubmitting(false);
        return;
      }

      const data = form.getValues();

      // Submit to API
      const response = await fetch('/api/checkout/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '送出失敗');
      }

      const result = await response.json();

      // Build success page URL with payment info
      const successParams = new URLSearchParams({
        orderId: result.orderId,
        payment: result.paymentMethod,
      });
      if (result.atmDeadline) {
        successParams.set('deadline', result.atmDeadline);
      }

      // Redirect to success page
      window.location.href = `/checkout/success?${successParams.toString()}`;
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : '送出失敗，請稍後再試'
      );
      setIsSubmitting(false);
    }
  }, [form]);

  // Render current step
  const renderStep = () => {
    const commonProps = {
      form,
      onNext: nextStep,
      onBack: prevStep,
    };

    switch (currentStep) {
      case 1:
        return (
          <StepConfirmPlan
            {...commonProps}
            plan={plan}
            onQuantityChange={handleQuantityChange}
            returnUrl={returnUrl}
          />
        );
      case 2:
        return <StepBuyerInfo {...commonProps} />;
      case 3:
        return <StepPayment {...commonProps} />;
      case 4:
        return (
          <StepStudentData
            {...commonProps}
            studentsField={studentsField}
          />
        );
      case 5:
        return (
          <StepReview
            {...commonProps}
            plan={plan}
            onGoToStep={goToStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={submitError}
          />
        );
      default:
        return null;
    }
  };

  // Step transition variants
  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CheckoutHeader returnUrl={returnUrl} />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
          {/* Step Indicator */}
          <StepIndicator
            steps={CHECKOUT_STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={goToStep}
            isDesktop={isDesktop}
          />

          {/* Main Content */}
          <div className="mt-6 lg:mt-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
            {/* Step Content */}
            <div className="min-w-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="bg-white rounded-xl border border-neutral-200 p-6 lg:p-8">
                    {renderStep()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Order Summary (Desktop) */}
            {isDesktop && (
              <div className="hidden lg:block">
                <OrderSummary plan={plan} formData={formData} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile CTA Footer */}
      {!isDesktop && (
        <MobileCta
          plan={plan}
          formData={formData}
          currentStep={currentStep}
          isLastStep={currentStep === CHECKOUT_STEPS.length}
          onNext={currentStep === CHECKOUT_STEPS.length ? handleSubmit : nextStep}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
