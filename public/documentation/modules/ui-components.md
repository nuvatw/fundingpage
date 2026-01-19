# UI 元件庫

本文件說明專案中可重用的 UI 元件。

**檔案位置**: `components/ui/`

---

## 模組結構

```
components/ui/
├── plans/                 # 方案相關元件
│   ├── SimplePlanCard.tsx
│   ├── PlanComparisonTable.tsx
│   └── PlanFeatureCell.tsx
├── buttons/               # 按鈕元件
│   ├── PrimaryButton.tsx
│   └── SecondaryButton.tsx
├── navigation/            # 導航元件
│   ├── Stepper.tsx
│   └── Breadcrumb.tsx
├── media/                 # 媒體元件
│   └── MusicPlayer.tsx
└── forms/                 # 表單元件
    ├── FormInput.tsx
    └── FormSelect.tsx
```

---

## 方案元件

### SimplePlanCard

方案卡片元件，用於展示單一方案資訊。

**Props:**

```typescript
interface SimplePlanCardProps {
  plan: PlanV2;
  isRecommended?: boolean;
  onSelect?: (planId: string) => void;
}
```

**使用範例:**

```tsx
import { SimplePlanCard } from '@/components/ui/plans';
import { PLANS_V2 } from '@/lib/data';

const plan = PLANS_V2.find(p => p.id === 'accompany');

<SimplePlanCard
  plan={plan}
  isRecommended={true}
  onSelect={(id) => router.push(`/checkout?plan=${id}`)}
/>
```

**功能特點:**

- 顯示方案標題、價格、副標題
- 推薦標籤 (badge)
- 功能清單
- CTA 按鈕

---

### PlanComparisonTable

方案比較表元件，動態產生功能對比表格。

**Props:**

```typescript
interface PlanComparisonTableProps {
  plans: PlanV2[];
  features: PlanFeature[];
  categories: FeatureCategory[];
}
```

**使用範例:**

```tsx
import { PlanComparisonTable } from '@/components/ui/plans';
import { PLANS_V2, PLAN_FEATURES, FEATURE_CATEGORIES } from '@/lib/data';

<PlanComparisonTable
  plans={PLANS_V2}
  features={PLAN_FEATURES}
  categories={FEATURE_CATEGORIES}
/>
```

**功能特點:**

- 依分類群組功能
- 動態從 featureMatrix 讀取值
- 支援 boolean、value、callout 三種顯示模式
- 響應式設計（行動版可橫向捲動）

---

### PlanFeatureCell

功能值顯示元件，處理不同類型的值。

**Props:**

```typescript
interface PlanFeatureCellProps {
  value: FeatureCellValue;
}
```

**顯示邏輯:**

```typescript
// boolean: 顯示勾選或叉叉圖示
// value: 顯示自訂文字
// callout: 顯示特殊標註樣式

if (value === true) return <CheckIcon />;
if (value === false) return <XIcon />;
if (value.type === 'value') return <span>{value.value}</span>;
if (value.type === 'callout') return <Callout>{value.text}</Callout>;
```

---

## 按鈕元件

### PrimaryButton

主要行動按鈕。

**Props:**

```typescript
interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

**使用範例:**

```tsx
<PrimaryButton
  onClick={handleSubmit}
  loading={isSubmitting}
  fullWidth
>
  送出訂單
</PrimaryButton>
```

**樣式:**

```css
/* 主要按鈕樣式 */
.primary-button {
  @apply bg-primary-600 hover:bg-primary-700;
  @apply text-white font-medium;
  @apply px-6 py-3 rounded-lg;
  @apply transition-colors duration-200;
}
```

---

### SecondaryButton

次要行動按鈕。

**使用範例:**

```tsx
<SecondaryButton onClick={handleCancel}>
  取消
</SecondaryButton>
```

**樣式:**

```css
/* 次要按鈕樣式 */
.secondary-button {
  @apply bg-gray-100 hover:bg-gray-200;
  @apply text-gray-700 font-medium;
  @apply px-6 py-3 rounded-lg;
  @apply border border-gray-300;
}
```

---

## 導航元件

### Stepper

步驟指示器，用於多步驟流程。

**Props:**

```typescript
interface StepperProps {
  steps: { id: number; name: string; label: string }[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}
```

**使用範例:**

```tsx
import { Stepper } from '@/components/ui/navigation';
import { CHECKOUT_STEPS } from '@/lib/checkout/constants';

<Stepper
  steps={CHECKOUT_STEPS}
  currentStep={2}
  completedSteps={[1]}
  onStepClick={goToStep}
/>
```

**功能特點:**

- 顯示當前步驟、已完成步驟、待完成步驟
- 可點擊已完成的步驟返回
- 響應式設計（行動版簡化顯示）
- 動畫效果

---

## 媒體元件

### MusicPlayer

背景音樂播放器。

**Props:**

```typescript
interface MusicPlayerProps {
  src: string;
  autoPlay?: boolean;
}
```

**使用範例:**

```tsx
<MusicPlayer
  src="/audio/background.mp3"
  autoPlay={false}
/>
```

**功能特點:**

- 播放/暫停控制
- 音量調整
- 自動播放（需使用者互動後啟動）
- 最小化懸浮按鈕

---

## 表單元件

### FormInput

表單輸入欄位，整合 react-hook-form。

**Props:**

```typescript
interface FormInputProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  required?: boolean;
  error?: string;
  register: UseFormRegister<any>;
}
```

**使用範例:**

```tsx
<FormInput
  name="buyer.name"
  label="姓名"
  placeholder="請輸入您的姓名"
  required
  error={errors.buyer?.name?.message}
  register={register}
/>
```

**功能特點:**

- Label 和錯誤訊息
- 必填星號標示
- 錯誤狀態樣式
- 支援各種 input type

---

### FormSelect

下拉選單元件。

**Props:**

```typescript
interface FormSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  register: UseFormRegister<any>;
}
```

**使用範例:**

```tsx
<FormSelect
  name="buyer.invoiceType"
  label="發票類型"
  options={[
    { value: 'personal', label: '個人發票' },
    { value: 'company', label: '公司發票' },
  ]}
  error={errors.buyer?.invoiceType?.message}
  register={register}
/>
```

---

## 共用工具

### cn() 函式

合併 Tailwind 類名的工具函式。

**檔案位置:** `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**使用範例:**

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  'flex items-center gap-4',
  'p-4 rounded-lg',
  isActive && 'bg-primary-100',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>
```

---

## 設計原則

### 1. 單一職責

每個元件只負責一個功能。

### 2. Props 型別定義

所有元件都有明確的 TypeScript 介面。

### 3. 可組合性

小元件可以組合成大元件。

### 4. 響應式設計

所有元件都支援不同螢幕尺寸。

### 5. 無障礙

遵循 WCAG 規範，支援鍵盤操作和 screen reader。

---

## 樣式系統

### 色彩

```css
/* Primary */
--primary-500: #6366f1;  /* 主色 */
--primary-600: #4f46e5;  /* Hover */
--primary-700: #4338ca;  /* Active */

/* Gray */
--gray-100: #f3f4f6;
--gray-500: #6b7280;
--gray-900: #111827;

/* Status */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
```

### 間距

```css
/* Spacing scale */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

### 圓角

```css
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
```

---

## 延伸閱讀

- [Tailwind CSS 配置](../architecture/decisions.md)
- [程式碼規範](../guides/code-style.md)
- [方案資料結構](./plans.md)
