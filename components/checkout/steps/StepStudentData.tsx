'use client';

import { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import type { CheckoutFormData } from '@/lib/checkout/schemas';
import { StudentCard } from '../forms/StudentCard';
import { Button } from '@/components/ui/buttons/Button';

interface StepStudentDataProps {
  form: UseFormReturn<CheckoutFormData>;
  studentsField: UseFieldArrayReturn<CheckoutFormData, 'students'>;
  onNext: () => void;
  onBack: () => void;
}

export function StepStudentData({
  form,
  studentsField,
  onNext,
  onBack,
}: StepStudentDataProps) {
  const { fields } = studentsField;
  const quantity = form.watch('quantity');

  const handleCopyFromBuyer = (index: number) => {
    const buyer = form.getValues('buyer');
    form.setValue(`students.${index}.name`, buyer.name);
    form.setValue(`students.${index}.email`, buyer.email);
    form.setValue(`students.${index}.phone`, buyer.phone);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          4・學員資料
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          請填寫 {quantity} 位學員的基本資料
        </p>
      </div>

      {/* Student Cards */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <StudentCard
                index={index}
                form={form}
                showCopyOption={index === 0}
                onCopyFromBuyer={() => handleCopyFromBuyer(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
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
