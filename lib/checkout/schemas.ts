import { z } from 'zod';
import { PURCHASABLE_PLAN_IDS } from './constants';

// Taiwan phone regex (09xxxxxxxx format)
const twPhoneRegex = /^09\d{8}$/;

// Taiwan tax ID regex (8 digits)
const taxIdRegex = /^\d{8}$/;

// Buyer schema (Step 2)
export const buyerSchema = z
  .object({
    name: z.string().min(2, '請輸入姓名（至少 2 字）'),
    email: z.string().email('請輸入有效的 Email'),
    phone: z
      .string()
      .regex(twPhoneRegex, '請輸入有效的手機號碼（09 開頭，共 10 碼）'),
    invoiceType: z.enum(['personal', 'company']),
    companyName: z.string().optional(),
    taxId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.invoiceType === 'company') {
        return data.companyName && data.companyName.length >= 2;
      }
      return true;
    },
    {
      message: '請輸入公司名稱',
      path: ['companyName'],
    }
  )
  .refine(
    (data) => {
      if (data.invoiceType === 'company') {
        return data.taxId && taxIdRegex.test(data.taxId);
      }
      return true;
    },
    {
      message: '統編須為 8 碼數字',
      path: ['taxId'],
    }
  );

// Student schema (Step 3)
export const studentSchema = z.object({
  name: z.string().min(2, '請輸入學員姓名（至少 2 字）'),
  email: z.string().email('請輸入有效的 Email'),
  phone: z
    .string()
    .regex(twPhoneRegex, '請輸入有效的手機號碼（09 開頭，共 10 碼）'),
});

// Students array schema
export const studentsArraySchema = z
  .array(studentSchema)
  .min(1, '至少需要一位學員');

// Credit card schema
export const creditCardSchema = z.object({
  cardNumber: z.string().min(16, '請輸入 16 碼卡號').max(19, '卡號最多 19 碼'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, '請輸入有效的到期日 (MM/YY)'),
  cvc: z.string().min(3, '請輸入 3-4 碼安全碼').max(4, '安全碼最多 4 碼'),
  cardholderName: z.string().min(2, '請輸入持卡人姓名'),
});

// Payment schema (Step 3)
export const paymentSchema = z
  .object({
    paymentMethod: z.enum(['credit_card', 'atm']),
    creditCard: creditCardSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === 'credit_card') {
        return data.creditCard !== undefined;
      }
      return true;
    },
    {
      message: '請填寫信用卡資訊',
      path: ['creditCard'],
    }
  );

// Terms agreement schema (Step 5)
export const termsSchema = z.object({
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: '請同意服務條款與隱私權政策',
  }),
});

// Plan selection schema (Step 1)
// Uses PURCHASABLE_PLAN_IDS from constants for single source of truth
export const planSelectionSchema = z.object({
  planId: z.enum(PURCHASABLE_PLAN_IDS, {
    message: '請選擇方案',
  }),
  quantity: z
    .number()
    .int('數量必須為整數')
    .min(1, '至少需要 1 人')
    .max(50, '單次最多 50 人'),
});

// Complete checkout schema
export const checkoutSchema = z
  .object({
    planId: planSelectionSchema.shape.planId,
    quantity: planSelectionSchema.shape.quantity,
    buyer: buyerSchema,
    students: studentsArraySchema,
    paymentMethod: z.enum(['credit_card', 'atm']),
    creditCard: creditCardSchema.optional(),
    agreedToTerms: termsSchema.shape.agreedToTerms,
  })
  .refine(
    (data) => {
      if (data.paymentMethod === 'credit_card') {
        return data.creditCard !== undefined;
      }
      return true;
    },
    {
      message: '請填寫信用卡資訊',
      path: ['creditCard'],
    }
  );

// Type inference
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type BuyerFormData = z.infer<typeof buyerSchema>;
export type StudentFormData = z.infer<typeof studentSchema>;
export type CreditCardData = z.infer<typeof creditCardSchema>;

// Step-specific schemas for partial validation
export const stepSchemas = {
  1: planSelectionSchema,
  2: z.object({ buyer: buyerSchema }),
  3: z.object({
    paymentMethod: z.enum(['credit_card', 'atm']),
    creditCard: creditCardSchema.optional(),
  }),
  4: z.object({ students: studentsArraySchema }),
  5: termsSchema,
} as const;

// Helper to get fields for each step
export function getStepFields(step: number): string[] {
  switch (step) {
    case 1:
      return ['planId', 'quantity'];
    case 2:
      return ['buyer'];
    case 3:
      return ['paymentMethod', 'creditCard'];
    case 4:
      return ['students'];
    case 5:
      return ['agreedToTerms'];
    default:
      return [];
  }
}
