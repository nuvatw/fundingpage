// ==========================================
// Admin API 型別定義
// ==========================================

// 訂單狀態
export const ORDER_STATUSES = [
  'pending',
  'paid',
  'failed',
  'cancelled',
  'refunded',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

// 聯絡狀態
export const CONTACT_STATUSES = ['new', 'read', 'replied', 'archived'] as const;

export type ContactStatus = (typeof CONTACT_STATUSES)[number];

// 訂單來源
export const ORDER_SOURCES = ['restaurant', 'general'] as const;

export type OrderSource = (typeof ORDER_SOURCES)[number];

// 聯絡來源
export const CONTACT_SOURCES = ['restaurant', 'general', 'brand'] as const;

export type ContactSource = (typeof CONTACT_SOURCES)[number];

// ==========================================
// 查詢型別
// ==========================================

/** 訂單查詢篩選條件 */
export interface OrderQueryFilter {
  status?: OrderStatus;
  planId?: string;
  source?: OrderSource;
}

/** 聯絡查詢篩選條件 */
export interface ContactQueryFilter {
  status?: ContactStatus;
  source?: ContactSource;
}

// ==========================================
// 更新型別
// ==========================================

/** 訂單更新資料 */
export interface OrderUpdateData {
  status?: OrderStatus;
  paidAt?: Date;
  notes?: string;
}

/** 聯絡更新資料 */
export interface ContactUpdateData {
  status?: ContactStatus;
  repliedAt?: Date;
  repliedBy?: string;
  notes?: string;
}

// ==========================================
// 型別守衛
// ==========================================

/** 驗證訂單狀態是否有效 */
export function isValidOrderStatus(status: string): status is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(status);
}

/** 驗證聯絡狀態是否有效 */
export function isValidContactStatus(status: string): status is ContactStatus {
  return (CONTACT_STATUSES as readonly string[]).includes(status);
}
