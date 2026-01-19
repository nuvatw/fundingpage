# 表單驗證

本文件說明表單驗證的架構與實作。

---

## 驗證架構

### 技術棧

- **react-hook-form**: 表單狀態管理
- **Zod**: Schema 驗證
- **@hookform/resolvers**: 整合層

### 驗證流程

```
使用者輸入
    ↓
react-hook-form (onChange mode)
    ↓
Zod Schema 驗證
    ↓
    ├── 通過 → 更新表單狀態
    └── 失敗 → 顯示錯誤訊息
```

---

## Zod Schema

### 基礎驗證

```typescript
const buyerSchema = z.object({
  name: z.string().min(2, '請輸入姓名（至少 2 字）'),
  email: z.string().email('請輸入有效的 Email'),
  phone: z.string().regex(/^09\d{8}$/, '請輸入有效的手機號碼'),
  invoiceType: z.enum(['personal', 'company']),
});
```

### 條件驗證

使用 `.refine()` 實作：

```typescript
const buyerSchema = z.object({
  invoiceType: z.enum(['personal', 'company']),
  companyName: z.string().optional(),
  taxId: z.string().optional(),
}).refine(
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
);
```

### 步驟驗證

每個步驟有獨立的 Schema：

```typescript
const stepSchemas = {
  1: planSelectionSchema,
  2: z.object({ buyer: buyerSchema }),
  3: paymentSchema,
  4: z.object({ students: studentsArraySchema }),
  5: termsSchema,
};
```

---

## react-hook-form 整合

### 初始化

```typescript
const form = useForm<CheckoutFormData>({
  resolver: zodResolver(checkoutSchema),
  defaultValues: DEFAULT_FORM_VALUES,
  mode: 'onChange',  // 即時驗證
});
```

### 取得錯誤

```typescript
const { errors } = form.formState;

// 顯示錯誤
{errors.buyer?.name && (
  <span className="text-red-500">{errors.buyer.name.message}</span>
)}
```

### 步驟驗證

```typescript
const validateCurrentStep = async () => {
  const fields = getStepFields(currentStep);
  const result = await form.trigger(fields);
  return result;
};
```

---

## 驗證規則總覽

| 欄位 | 規則 | 錯誤訊息 |
|------|------|----------|
| 姓名 | min(2) | 請輸入姓名（至少 2 字） |
| Email | email() | 請輸入有效的 Email |
| 電話 | `/^09\d{8}$/` | 請輸入有效的手機號碼（09 開頭，共 10 碼） |
| 統編 | `/^\d{8}$/` | 統編須為 8 碼數字 |
| 卡號 | min(16).max(19) | 請輸入 16 碼卡號 |
| 到期日 | `/^(0[1-9]\|1[0-2])\/\d{2}$/` | 請輸入有效的到期日 (MM/YY) |
| CVC | min(3).max(4) | 請輸入 3-4 碼安全碼 |

---

## 型別推導

Zod 可自動推導 TypeScript 型別：

```typescript
import { z } from 'zod';

const buyerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

// 自動推導型別
type BuyerFormData = z.infer<typeof buyerSchema>;
// => { name: string; email: string }
```
