import type { StepDefinition, PaymentMethodOption } from './types';

// ==========================================
// 方案 ID 常數 - 單一來源
// ==========================================

/** 餐飲版方案 ID */
export const RESTAURANT_PLAN_IDS = ['basic', 'accompany', 'founder'] as const;

/** 通用版方案 ID */
export const GENERAL_PLAN_IDS = ['starter', 'explorer', 'master', 'group'] as const;

/** 所有可購買的方案 ID（不含免費方案） */
export const PURCHASABLE_PLAN_IDS = [
  ...RESTAURANT_PLAN_IDS,
  ...GENERAL_PLAN_IDS.filter((id) => id !== 'group'),
] as const;

/** 所有有效的方案 ID */
export const ALL_PLAN_IDS = ['free', ...RESTAURANT_PLAN_IDS, ...GENERAL_PLAN_IDS] as const;

/** 方案 ID 型別 */
export type PlanId = (typeof ALL_PLAN_IDS)[number];
export type PurchasablePlanId = (typeof PURCHASABLE_PLAN_IDS)[number];
export type RestaurantPlanId = (typeof RESTAURANT_PLAN_IDS)[number];
export type GeneralPlanId = (typeof GENERAL_PLAN_IDS)[number];

/** 判斷是否為通用版方案 */
export function isGeneralPlan(planId: string): planId is GeneralPlanId {
  return (GENERAL_PLAN_IDS as readonly string[]).includes(planId);
}

/** 判斷是否為餐飲版方案 */
export function isRestaurantPlan(planId: string): planId is RestaurantPlanId {
  return (RESTAURANT_PLAN_IDS as readonly string[]).includes(planId);
}

// Step definitions
export const CHECKOUT_STEPS: StepDefinition[] = [
  { id: 1, name: 'confirm', label: '確認方案', shortLabel: '方案' },
  { id: 2, name: 'buyer', label: '訂購人資訊', shortLabel: '訂購人' },
  { id: 3, name: 'payment', label: '付款資料', shortLabel: '付款' },
  { id: 4, name: 'students', label: '學員資料', shortLabel: '學員' },
  { id: 5, name: 'review', label: '資料確認', shortLabel: '確認' },
];

// Payment methods (mock for now)
export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'credit_card',
    label: '信用卡或簽帳卡',
    description: '即時付款',
    icon: 'CreditCard',
  },
  {
    id: 'atm',
    label: 'ATM 轉帳',
    description: '3 天內完成付款',
    icon: 'Bank',
  },
];

// Plan prices (parsed from PLANS_V2)
export const PLAN_PRICES: Record<string, number> = {
  free: 0,
  basic: 2400,
  accompany: 58000,
  founder: 210000,
};

// Quantity limits
export const QUANTITY_LIMITS = {
  min: 1,
  max: 50,
  founderMax: 15, // Special limit for founder plan
};

// Group discount tiers (example - can be configured)
export const GROUP_DISCOUNTS = [
  { minQty: 5, discountPercent: 5 },
  { minQty: 10, discountPercent: 10 },
  { minQty: 20, discountPercent: 15 },
];

// Error messages
export const ERROR_MESSAGES = {
  INVALID_PLAN: '我知道你很急\n但是你先別急（還沒開始Ｒ）',
  INVALID_QUANTITY: '無效的數量',
  FORM_INCOMPLETE: '請完成所有必填欄位',
  PAYMENT_FAILED: '付款失敗，請確認卡片資訊或改用其他方式',
  SUBMIT_FAILED: '送出失敗，請稍後再試',
  NETWORK_ERROR: '網路連線異常，請確認網路後重試',
};

// Success messages
export const SUCCESS_MESSAGES = {
  ORDER_CREATED: '訂單建立成功！',
  PAYMENT_SUCCESS: '付款成功！',
  CONFIRMATION_SENT: '確認信已寄送至您的信箱',
};

// Invoice types
export const INVOICE_TYPES = [
  { id: 'personal', label: '個人（二聯式）' },
  { id: 'company', label: '公司統一編號（三聯式）' },
] as const;

// Default credit card values
export const DEFAULT_CREDIT_CARD = {
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  cardholderName: '',
};

// Default form values
export const DEFAULT_FORM_VALUES = {
  planId: '',
  quantity: 1,
  buyer: {
    name: '',
    email: '',
    phone: '',
    invoiceType: 'personal' as const,
    companyName: '',
    taxId: '',
  },
  students: [{ name: '', email: '', phone: '' }],
  paymentMethod: 'credit_card' as const,
  creditCard: DEFAULT_CREDIT_CARD,
  agreedToTerms: false,
};
