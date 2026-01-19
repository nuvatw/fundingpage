import type { PlanV2 } from '@/lib/types';
import type { PriceBreakdown, StudentInfo } from './types';
import { PLAN_PRICES, GROUP_DISCOUNTS, QUANTITY_LIMITS } from './constants';

/**
 * Parse price string to number
 * e.g., "NT$58,000" -> 58000
 */
export function parsePriceString(priceStr: string): number {
  const numStr = priceStr.replace(/[^\d]/g, '');
  return parseInt(numStr, 10) || 0;
}

/**
 * Format number to price string
 * e.g., 58000 -> "NT$58,000"
 */
export function formatPrice(amount: number): string {
  return `NT$${amount.toLocaleString('zh-TW')}`;
}

/**
 * Calculate group discount based on quantity
 */
export function calculateGroupDiscount(
  quantity: number,
  unitPrice: number
): number {
  // Find the highest applicable discount tier
  const applicableTier = GROUP_DISCOUNTS.filter(
    (tier) => quantity >= tier.minQty
  ).sort((a, b) => b.minQty - a.minQty)[0];

  if (!applicableTier) return 0;

  const subtotal = unitPrice * quantity;
  return Math.floor((subtotal * applicableTier.discountPercent) / 100);
}

/**
 * Calculate total price breakdown
 */
export function calculateTotal(
  plan: PlanV2,
  quantity: number
): PriceBreakdown {
  const unitPrice = PLAN_PRICES[plan.id] ?? parsePriceString(plan.price);
  const subtotal = unitPrice * quantity;
  const discount = calculateGroupDiscount(quantity, unitPrice);
  const total = subtotal - discount;

  return {
    unitPrice,
    quantity,
    subtotal,
    discount,
    total,
  };
}

/**
 * Get max quantity for a plan
 */
export function getMaxQuantity(planId: string): number {
  if (planId === 'founder') {
    return QUANTITY_LIMITS.founderMax;
  }
  return QUANTITY_LIMITS.max;
}

/**
 * Validate quantity for a plan
 */
export function isValidQuantity(planId: string, quantity: number): boolean {
  const max = getMaxQuantity(planId);
  return quantity >= QUANTITY_LIMITS.min && quantity <= max;
}

/**
 * Generate order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

/**
 * Mask credit card number (for display)
 * e.g., "4242424242424242" -> "**** **** **** 4242"
 */
export function maskCardNumber(cardNumber: string): string {
  const last4 = cardNumber.slice(-4);
  return `**** **** **** ${last4}`;
}

/**
 * Sync students array with quantity
 * - Add empty students if quantity increased
 * - Remove students if quantity decreased
 */
export function syncStudentsWithQuantity(
  students: StudentInfo[],
  newQuantity: number
): StudentInfo[] {
  const currentLength = students.length;

  if (newQuantity > currentLength) {
    // Add empty students
    const newStudents = [...students];
    for (let i = currentLength; i < newQuantity; i++) {
      newStudents.push({ name: '', email: '', phone: '' });
    }
    return newStudents;
  } else if (newQuantity < currentLength) {
    // Remove excess students
    return students.slice(0, newQuantity);
  }

  return students;
}

/**
 * Check if student has any data filled
 */
export function hasStudentData(student: StudentInfo): boolean {
  return !!(student.name || student.email || student.phone);
}

/**
 * Get count of students with data that would be removed
 */
export function getStudentsToRemoveCount(
  students: StudentInfo[],
  newQuantity: number
): number {
  if (newQuantity >= students.length) return 0;

  const studentsToRemove = students.slice(newQuantity);
  return studentsToRemove.filter(hasStudentData).length;
}

/**
 * Format phone number for display
 * e.g., "0912345678" -> "0912-345-678"
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone || phone.length !== 10) return phone;
  return `${phone.slice(0, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
