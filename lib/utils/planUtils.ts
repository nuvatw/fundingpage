import type { FeatureCellValue, PlanFeatureMatrix } from '@/lib/types';

/**
 * 從 featureMatrix 取得啟用的功能 ID 列表
 * 用於向後相容現有元件（如 PlanCardMobile, PlanFeatureList）
 */
export function getEnabledFeatureIds(matrix: PlanFeatureMatrix): string[] {
  return Object.entries(matrix)
    .filter(([, value]) => isFeatureEnabled(value))
    .map(([id]) => id);
}

/**
 * 判斷功能是否「啟用」
 * - boolean: true = 啟用
 * - value/callout: 有值就算啟用
 */
export function isFeatureEnabled(value: FeatureCellValue): boolean {
  if (value.type === 'boolean') {
    return value.enabled;
  }
  // value 和 callout 類型都視為「有這個功能」
  return true;
}

/**
 * 取得 Cell 的顯示文字（用於 screen reader 或 tooltip）
 */
export function getCellDisplayText(value: FeatureCellValue): string {
  switch (value.type) {
    case 'boolean':
      return value.enabled ? '包含' : '不包含';
    case 'value':
      return value.text;
    case 'callout':
      return value.text;
  }
}
