'use client';

import { useWatch, UseFormReturn } from 'react-hook-form';
import type { CheckoutFormData } from '@/lib/checkout/schemas';
import { FormInput } from '../forms/FormInput';
import { Button } from '@/components/ui/buttons/Button';
import { cn } from '@/lib/utils';

interface StepBuyerInfoProps {
  form: UseFormReturn<CheckoutFormData>;
  onNext: () => void;
  onBack: () => void;
}

// Invoice type options
const INVOICE_OPTIONS = [
  {
    id: 'personal',
    label: '個人（二聯式）',
    description: '電子發票將寄送至您的信箱',
  },
  {
    id: 'company',
    label: '公司（三聯式）',
    description: '需填寫統一編號與公司抬頭',
  },
] as const;

export function StepBuyerInfo({ form, onNext, onBack }: StepBuyerInfoProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  // 使用 useWatch 確保正確的狀態訂閱和重新渲染
  const invoiceType = useWatch({
    control,
    name: 'buyer.invoiceType',
    defaultValue: 'personal',
  });

  const buyerErrors = errors.buyer;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          2・訂購人資訊
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          請填寫訂購人的聯絡資料
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <FormInput
          label="中文姓名"
          placeholder="請輸入姓名"
          required
          {...register('buyer.name')}
          error={buyerErrors?.name?.message}
        />

        <FormInput
          label="聯絡信箱"
          type="email"
          placeholder="your@email.com"
          required
          hint="訂單確認信將寄送至此信箱"
          {...register('buyer.email')}
          error={buyerErrors?.email?.message}
        />

        <FormInput
          label="手機電話"
          type="tel"
          placeholder="0912345678"
          required
          {...register('buyer.phone')}
          error={buyerErrors?.phone?.message}
        />

        {/* Invoice Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-700">
            發票類型 <span className="text-red-500">*</span>
          </label>

          <div className="space-y-2">
            {INVOICE_OPTIONS.map((option) => {
              const isSelected = invoiceType === option.id;
              return (
                <label
                  key={option.id}
                  className={cn(
                    'flex items-start gap-3 p-4 rounded-xl border w-full cursor-pointer',
                    'transition-all duration-200',
                    isSelected
                      ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  )}
                >
                  <input
                    type="radio"
                    value={option.id}
                    {...register('buyer.invoiceType')}
                    className="w-5 h-5 mt-0.5 text-primary-600 border-neutral-300 focus:ring-primary-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-neutral-900 block">
                      {option.label}
                    </span>
                    <span className="text-sm text-neutral-500 mt-0.5 block">
                      {option.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Company Invoice Fields */}
        {invoiceType === 'company' && (
          <div className="space-y-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <CompanyIcon className="w-5 h-5 text-neutral-600" />
              <span className="font-medium text-neutral-900">
                公司發票資訊
              </span>
            </div>

            <FormInput
              label="統一編號"
              placeholder="請輸入 8 碼統一編號"
              required
              maxLength={8}
              inputMode="numeric"
              {...register('buyer.taxId')}
              error={buyerErrors?.taxId?.message}
            />

            <FormInput
              label="公司抬頭"
              placeholder="請輸入公司名稱"
              required
              {...register('buyer.companyName')}
              error={buyerErrors?.companyName?.message}
            />
          </div>
        )}
      </div>

      {/* Navigation - Desktop only */}
      <div className="hidden lg:flex gap-3 pt-4">
        <Button variant="ghost" onClick={onBack}>
          上一步
        </Button>
        <Button variant="primary" size="lg" onClick={onNext} className="flex-1">
          繼續
        </Button>
      </div>
    </div>
  );
}

// Company Icon
function CompanyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}
