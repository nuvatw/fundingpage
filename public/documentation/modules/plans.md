# 方案資料模組

本文件說明方案資料的結構與使用方式。

**檔案位置**: `lib/data/plans.ts`

---

## 概述

方案資料模組定義了所有課程方案的資訊，包括：

- 餐飲版方案 (PLANS_V2)
- 通用版方案 (GENERAL_PLANS_V2)
- 功能定義 (PLAN_FEATURES)
- 功能分類 (FEATURE_CATEGORIES)

---

## 資料結構

### PlanV2 (方案定義)

```typescript
interface PlanV2 {
  id: string;           // 方案 ID
  title: string;        // 方案名稱
  subtitle: string;     // 副標題
  price: string;        // 價格顯示文字
  badge?: string;       // 徽章 (如 "推薦")
  suitableFor: string;  // 適合對象
  featureMatrix: Record<string, FeatureCellValue>;
  ctaLink: string;      // CTA 連結
  isRecommended?: boolean;
}
```

### FeatureCellValue (功能值)

```typescript
type FeatureCellValue =
  | boolean                                    // 有/無
  | { type: 'value'; value: string }          // 自訂值
  | { type: 'callout'; text: string };        // 特殊標註
```

---

## 餐飲版方案

| ID | 名稱 | 價格 | 說明 |
|----|------|------|------|
| `free` | 免費 | NT$0 | 免費觀看部分課程 |
| `basic` | 基礎 | NT$2,400/月 | 全平台課程觀看 |
| `accompany` | 陪跑 | NT$58,000 | 90 天助教陪跑 |
| `founder` | 領航 | NT$210,000 | 創辦人親自帶隊 |

---

## 通用版方案

| ID | 名稱 | 價格 | 說明 |
|----|------|------|------|
| `starter` | 入門 | NT$2,400 | 買 1 送 1 |
| `explorer` | 探索 | NT$4,800 | 買 2 送 3 (推薦) |
| `master` | 大師 | NT$9,600 | 買 4 送 8 |
| `group` | 團隊 | 客製報價 | 企業方案 |

---

## Feature Matrix 模式

### 概念

每個方案有一個 `featureMatrix`，記錄該方案擁有哪些功能：

```typescript
// 方案定義
{
  id: 'accompany',
  featureMatrix: {
    'video-access': true,
    'live-qa': { type: 'value', value: '1 次/週' },
    'ta-support': true,
    'founder-support': false,
  }
}
```

### 功能定義

功能統一在 `PLAN_FEATURES` 定義：

```typescript
const PLAN_FEATURES = [
  { id: 'video-access', category: 'content', label: '課程影片觀看' },
  { id: 'live-qa', category: 'community', label: 'Live Q&A' },
  { id: 'ta-support', category: 'accompany', label: '助教支援' },
];
```

### 優點

1. **單一來源**: 功能定義集中管理
2. **動態比較表**: 可自動產生方案比較表
3. **型別安全**: TypeScript 確保正確性
4. **易於擴展**: 新增功能只需修改一處

---

## 使用範例

### 取得方案資料

```typescript
import { PLANS_V2, GENERAL_PLANS_V2 } from '@/lib/data';

// 取得所有餐飲版方案
const restaurantPlans = PLANS_V2;

// 取得特定方案
const accompanyPlan = PLANS_V2.find(p => p.id === 'accompany');
```

### 判斷方案類型

```typescript
import { isGeneralPlan, isRestaurantPlan } from '@/lib/checkout/constants';

if (isGeneralPlan(planId)) {
  // 通用版方案
} else if (isRestaurantPlan(planId)) {
  // 餐飲版方案
}
```

### 產生功能比較

```typescript
import { PLAN_FEATURES, FEATURE_CATEGORIES } from '@/lib/data';

// 取得某分類的所有功能
const contentFeatures = PLAN_FEATURES.filter(
  f => f.category === 'content'
);

// 檢查方案是否有某功能
const hasFeature = plan.featureMatrix['video-access'];
```
