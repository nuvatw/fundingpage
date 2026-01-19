# 結帳系統模組

本文件說明結帳系統的架構與實作。

**檔案位置**: `lib/checkout/`

---

## 模組結構

```
lib/checkout/
├── index.ts        # Barrel export
├── types.ts        # TypeScript 型別
├── schemas.ts      # Zod 驗證 Schema
├── constants.ts    # 常數與設定
└── utils.ts        # 工具函式
```

---

## 型別定義 (types.ts)

### PaymentMethod

```typescript
type PaymentMethod = 'credit_card' | 'atm';
```

### BuyerInfo

```typescript
interface BuyerInfo {
  name: string;
  email: string;
  phone: string;
  invoiceType: 'personal' | 'company';
  companyName?: string;
  taxId?: string;
}
```

### StudentInfo

```typescript
interface StudentInfo {
  name: string;
  email: string;
  phone: string;
}
```

### OrderData

```typescript
interface OrderData {
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
```

---

## 驗證 Schema (schemas.ts)

### 驗證規則

| 欄位 | 規則 | 錯誤訊息 |
|------|------|----------|
| 姓名 | min(2) | 請輸入姓名（至少 2 字） |
| Email | email() | 請輸入有效的 Email |
| 電話 | `/^09\d{8}$/` | 請輸入有效的手機號碼 |
| 統編 | `/^\d{8}$/` | 統編須為 8 碼數字 |
| 卡號 | min(16).max(19) | 請輸入 16 碼卡號 |
| 到期日 | `/^(0[1-9]|1[0-2])\/\d{2}$/` | 請輸入有效的到期日 |
| CVC | min(3).max(4) | 請輸入 3-4 碼安全碼 |

### 步驟驗證

每個步驟有獨立的 Schema：

```typescript
const stepSchemas = {
  1: planSelectionSchema,  // 方案選擇
  2: buyerSchema,          // 訂購人資訊
  3: paymentSchema,        // 付款方式
  4: studentsArraySchema,  // 學員資料
  5: termsSchema,          // 條款同意
};
```

### 條件驗證

使用 `.refine()` 實作條件驗證：

```typescript
// 公司發票需要統編
buyerSchema.refine((data) => {
  if (data.invoiceType === 'company') {
    return data.taxId && /^\d{8}$/.test(data.taxId);
  }
  return true;
});
```

---

## 常數設定 (constants.ts)

### 方案價格

```typescript
const PLAN_PRICES = {
  free: 0,
  basic: 2400,
  accompany: 58000,
  founder: 210000,
};
```

### 數量限制

```typescript
const QUANTITY_LIMITS = {
  min: 1,
  max: 50,
  founderMax: 15,  // 領航方案限量 15 位
};
```

### 團購折扣

```typescript
const GROUP_DISCOUNTS = [
  { minQty: 5,  discountPercent: 5 },   // 5 人以上 5% off
  { minQty: 10, discountPercent: 10 },  // 10 人以上 10% off
  { minQty: 20, discountPercent: 15 },  // 20 人以上 15% off
];
```

### 步驟定義

```typescript
const CHECKOUT_STEPS = [
  { id: 1, name: 'confirm', label: '確認方案' },
  { id: 2, name: 'buyer', label: '訂購人資訊' },
  { id: 3, name: 'payment', label: '付款資料' },
  { id: 4, name: 'students', label: '學員資料' },
  { id: 5, name: 'review', label: '資料確認' },
];
```

---

## 工具函式 (utils.ts)

### calculateTotal

計算訂單總價（含折扣）：

```typescript
const { unitPrice, total, discount } = calculateTotal(plan, quantity);
```

### generateOrderId

產生唯一訂單編號：

```typescript
const orderId = generateOrderId();
// => "ORD-ABC123-XYZ789"
```

### formatPrice

格式化價格顯示：

```typescript
formatPrice(58000);
// => "NT$58,000"
```

### syncStudentsWithQuantity

同步學員陣列與數量：

```typescript
syncStudentsWithQuantity(students, quantity, append, remove);
```

---

## 使用範例

### 表單驗證

```typescript
import { checkoutSchema } from '@/lib/checkout/schemas';

const result = checkoutSchema.safeParse(formData);
if (!result.success) {
  console.log(result.error.flatten().fieldErrors);
}
```

### 價格計算

```typescript
import { calculateTotal } from '@/lib/checkout';
import { PLANS_V2 } from '@/lib/data';

const plan = PLANS_V2.find(p => p.id === 'accompany');
const { unitPrice, total, discount } = calculateTotal(plan, 5);
// discount = 5% (團購折扣)
```
