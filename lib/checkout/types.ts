// Checkout form data types

export type PaymentMethod = 'credit_card' | 'atm';

export type InvoiceType = 'personal' | 'company';

export interface BuyerInfo {
  name: string;
  email: string;
  phone: string;
  invoiceType: InvoiceType;
  companyName?: string;
  taxId?: string;
}

export interface StudentInfo {
  name: string;
  email: string;
  phone: string;
}

// Note: CheckoutFormData is inferred from Zod schema in schemas.ts

// Step navigation state
export interface CheckoutState {
  currentStep: number;
  completedSteps: number[];
  isSubmitting: boolean;
  error: string | null;
}

// Step definitions
export interface StepDefinition {
  id: number;
  name: string;
  label: string;
  shortLabel: string;
}

// Payment method option
export interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: string;
}

// Order data for submission
export interface OrderData {
  id: string;
  planId: string;
  planTitle: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  buyer: BuyerInfo;
  students: StudentInfo[];
  paymentMethod: PaymentMethod;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Price calculation result
export interface PriceBreakdown {
  unitPrice: number;
  quantity: number;
  subtotal: number;
  discount: number;
  total: number;
}
