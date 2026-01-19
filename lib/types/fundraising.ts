import { z } from 'zod';

// Zod schema for validation
export const FundraisingConfigSchema = z.object({
  targetDisplay: z.string().min(1, '請輸入目標金額顯示文字'),
  targetAmount: z.number().positive('目標金額必須大於 0'),
  currentAmount: z.number().nonnegative('目前金額不能為負數'),
  supporters: z.number().int().nonnegative('支持人數不能為負數'),
  deadline: z.string().min(1, '請輸入截止時間'),
  updatedAt: z.string().optional(),
});

// TypeScript type derived from schema
export type FundraisingConfig = z.infer<typeof FundraisingConfigSchema>;

// API response type
export interface FundraisingResponse {
  success: boolean;
  data?: FundraisingConfig;
  error?: string;
}

// Calculated display values for frontend
export interface FundraisingDisplay {
  targetDisplay: string;
  currentAmount: number;
  supporters: number;
  deadline: Date;
  percentage: number;
  daysRemaining: number;
  isExpired: boolean;
}

// Default/fallback values
export const DEFAULT_FUNDRAISING_CONFIG: FundraisingConfig = {
  targetDisplay: '100 萬',
  targetAmount: 1000000,
  currentAmount: 1520000,
  supporters: 62,
  deadline: '2026-02-01T23:59:59',
};
