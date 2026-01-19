'use client';

import { UseFormReturn } from 'react-hook-form';
import type { CheckoutFormData } from '@/lib/checkout/schemas';
import { FormInput } from './FormInput';
import { cn } from '@/lib/utils';

interface StudentCardProps {
  index: number;
  form: UseFormReturn<CheckoutFormData>;
  onCopyFromBuyer?: () => void;
  showCopyOption?: boolean;
}

export function StudentCard({
  index,
  form,
  onCopyFromBuyer,
  showCopyOption = false,
}: StudentCardProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const studentErrors = errors.students?.[index];

  return (
    <div
      className={cn(
        'p-5 rounded-xl border border-neutral-200',
        'bg-neutral-50/50'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-neutral-900">
          學員 {index + 1}
        </h4>

        {showCopyOption && onCopyFromBuyer && (
          <button
            type="button"
            onClick={onCopyFromBuyer}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            套用訂購人資料
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <FormInput
          label="中文姓名"
          placeholder="請輸入學員姓名"
          required
          {...register(`students.${index}.name`)}
          error={studentErrors?.name?.message}
        />

        <FormInput
          label="聯絡信箱"
          type="email"
          placeholder="student@example.com"
          required
          {...register(`students.${index}.email`)}
          error={studentErrors?.email?.message}
        />

        <FormInput
          label="手機電話"
          type="tel"
          placeholder="0912345678"
          required
          {...register(`students.${index}.phone`)}
          error={studentErrors?.phone?.message}
        />
      </div>
    </div>
  );
}
