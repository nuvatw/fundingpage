'use client';

import { UseFormReturn, Controller } from 'react-hook-form';
import { AnimatePresence, motion } from 'motion/react';
import type { CheckoutFormData } from '@/lib/checkout/schemas';
import { PAYMENT_METHODS } from '@/lib/checkout/constants';
import { FormInput } from '../forms/FormInput';
import { Button } from '@/components/ui/buttons/Button';
import { cn } from '@/lib/utils';

interface StepPaymentProps {
  form: UseFormReturn<CheckoutFormData>;
  onNext: () => void;
  onBack: () => void;
}

// ============================================
// Format Helpers
// ============================================

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 2) {
    return digits.slice(0, 2) + '/' + digits.slice(2);
  }
  return digits;
}

function formatCvc(value: string): string {
  return value.replace(/\D/g, '').slice(0, 4);
}

// ============================================
// Sub-components
// ============================================

// 付款方式選擇器
function PaymentMethodSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      {PAYMENT_METHODS.map((method) => (
        <label
          key={method.id}
          className={cn(
            'flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150',
            value === method.id
              ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
              : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
          )}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={value === method.id}
            onChange={() => onChange(method.id)}
            className="w-5 h-5 mt-0.5 text-primary-600 border-neutral-300 focus:ring-primary-500"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <PaymentIcon name={method.icon} className="w-5 h-5 text-neutral-600" />
              <span className="font-medium text-neutral-900">{method.label}</span>
            </div>
            <p className="text-sm text-neutral-500 mt-1">{method.description}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

// 信用卡表單
function CreditCardForm({ form }: { form: UseFormReturn<CheckoutFormData> }) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  return (
    <motion.div
      key="credit_card"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="space-y-6 pt-2">
        <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-4">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <CreditCardIcon className="w-5 h-5 text-neutral-600" />
            卡片資訊
          </h3>

          {/* 持卡人姓名 */}
          <FormInput
            label="持卡人姓名"
            placeholder="與卡片上姓名相同"
            required
            {...register('creditCard.cardholderName')}
            error={errors.creditCard?.cardholderName?.message}
          />

          {/* 卡號 */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-700">
              卡號 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Controller
                name="creditCard.cardNumber"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                    onBlur={field.onBlur}
                    maxLength={19}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border pr-20',
                      'text-neutral-900 placeholder:text-neutral-400',
                      'transition-colors duration-150',
                      'focus:outline-none focus:ring-2 focus:ring-offset-0',
                      errors.creditCard?.cardNumber
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200'
                    )}
                  />
                )}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <VisaIcon className="w-8 h-5" />
                <MastercardIcon className="w-8 h-5" />
              </div>
            </div>
            {errors.creditCard?.cardNumber && (
              <p className="text-sm text-red-600">{errors.creditCard.cardNumber.message}</p>
            )}
          </div>

          {/* 到期日 & CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">
                到期日 <span className="text-red-500">*</span>
              </label>
              <Controller
                name="creditCard.expiryDate"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(formatExpiryDate(e.target.value))}
                    onBlur={field.onBlur}
                    maxLength={5}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border',
                      'text-neutral-900 placeholder:text-neutral-400',
                      'transition-colors duration-150',
                      'focus:outline-none focus:ring-2 focus:ring-offset-0',
                      errors.creditCard?.expiryDate
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200'
                    )}
                  />
                )}
              />
              {errors.creditCard?.expiryDate && (
                <p className="text-sm text-red-600">{errors.creditCard.expiryDate.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">
                安全碼 (CVC) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Controller
                  name="creditCard.cvc"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      value={field.value || ''}
                      onChange={(e) => field.onChange(formatCvc(e.target.value))}
                      onBlur={field.onBlur}
                      maxLength={4}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border pr-10',
                        'text-neutral-900 placeholder:text-neutral-400',
                        'transition-colors duration-150',
                        'focus:outline-none focus:ring-2 focus:ring-offset-0',
                        errors.creditCard?.cvc
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200'
                      )}
                    />
                  )}
                />
                <CvcIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-4 text-neutral-400" />
              </div>
              {errors.creditCard?.cvc && (
                <p className="text-sm text-red-600">{errors.creditCard.cvc.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* 發票提示 */}
        <div className="p-4 rounded-lg bg-neutral-100 border border-neutral-200">
          <div className="flex items-start gap-3">
            <MailIcon className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
            <p className="text-sm text-neutral-600">電子發票將於付款成功後寄送至訂購人信箱</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ATM 銀行資訊
function ATMInfo() {
  return (
    <motion.div
      key="atm"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="space-y-4 pt-2">
        {/* 銀行資訊卡片 */}
        <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-4">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <BankIcon className="w-5 h-5 text-neutral-600" />
            匯款帳戶資訊
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-neutral-200">
              <span className="text-neutral-500">銀行名稱</span>
              <span className="font-medium text-neutral-900">台灣銀行（004）</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-200">
              <span className="text-neutral-500">分行</span>
              <span className="font-medium text-neutral-900">龍潭分行（2260）</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-200">
              <span className="text-neutral-500">金融機構代碼</span>
              <span className="font-mono font-medium text-neutral-900">0042260</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-200">
              <span className="text-neutral-500">戶名</span>
              <span className="font-medium text-neutral-900">努法有限公司</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-neutral-500">匯款帳號</span>
              <span className="font-mono font-medium text-neutral-900 tracking-wider">
                22600 1009 861
              </span>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-3">
            <WarningIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">匯款注意事項</p>
              <ul className="text-sm text-amber-700 mt-1 space-y-1 list-disc list-inside">
                <li>
                  請於訂單送出後 <span className="font-semibold">72 小時內</span>{' '}
                  完成匯款，逾期訂單將自動取消
                </li>
                <li>建議先截圖保存以上帳戶資訊</li>
                <li>送出訂單後，匯款資訊也會寄到您的信箱</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Main Component
// ============================================

export function StepPayment({ form, onNext, onBack }: StepPaymentProps) {
  const { control, setValue, getValues } = form;

  const handleNext = () => {
    const paymentMethod = getValues('paymentMethod');
    if (paymentMethod === 'atm') {
      setValue('creditCard', undefined);
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">3・付款資料</h2>
        <p className="text-sm text-neutral-500 mt-1">選擇您的付款方式並填寫資料</p>
      </div>

      {/* Payment Method Selector - 使用 Controller 確保狀態同步 */}
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <PaymentMethodSelector value={field.value} onChange={field.onChange} />
        )}
      />

      {/* Payment Details - 根據 Controller 的 field.value 渲染 */}
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <AnimatePresence mode="wait">
            {field.value === 'credit_card' && <CreditCardForm form={form} />}
            {field.value === 'atm' && <ATMInfo />}
          </AnimatePresence>
        )}
      />

      {/* Navigation - Desktop only */}
      <div className="hidden lg:flex gap-3 pt-4">
        <Button variant="ghost" onClick={onBack}>
          上一步
        </Button>
        <Button variant="primary" size="lg" onClick={handleNext} className="flex-1">
          繼續
        </Button>
      </div>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function PaymentIcon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    CreditCard: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    Bank: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  };
  return icons[name] || icons.CreditCard;
}

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

function BankIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CvcIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="currentColor">
      <rect x="0" y="0" width="24" height="16" rx="2" fill="#e5e5e5" />
      <rect x="0" y="3" width="24" height="4" fill="#333" />
      <rect x="14" y="10" width="8" height="3" rx="0.5" fill="#fff" />
    </svg>
  );
}

function VisaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 20" fill="none">
      <rect width="32" height="20" rx="2" fill="#1A1F71" />
      <text x="4" y="14" fill="white" fontSize="8" fontWeight="bold" fontStyle="italic">
        VISA
      </text>
    </svg>
  );
}

function MastercardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 20" fill="none">
      <rect width="32" height="20" rx="2" fill="#f5f5f5" />
      <circle cx="12" cy="10" r="6" fill="#EB001B" />
      <circle cx="20" cy="10" r="6" fill="#F79E1B" />
      <path d="M16 5.5a6 6 0 010 9" fill="#FF5F00" />
    </svg>
  );
}
