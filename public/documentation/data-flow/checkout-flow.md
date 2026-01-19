# 結帳流程

本文件說明 5 步驟結帳流程的實作。

---

## 流程概覽

```
Step 1: 確認方案 → Step 2: 訂購人資訊 → Step 3: 付款方式
                                            ↓
Step 5: 確認送出 ← Step 4: 學員資料 ←──────┘
```

---

## 步驟詳解

### Step 1: 確認方案

**元件**: `StepConfirmPlan.tsx`

**功能**:
- 顯示選擇的方案資訊
- 數量選擇器 (1-50, founder 最多 15)
- 計算金額預覽

**驗證**:
- `planId` 必須是有效的方案 ID
- `quantity` 必須在允許範圍內

---

### Step 2: 訂購人資訊

**元件**: `StepBuyerInfo.tsx`

**欄位**:
- 姓名（至少 2 字）
- Email
- 手機（09 開頭，共 10 碼）
- 發票類型（個人/公司）
- 公司名稱（公司發票時）
- 統一編號（公司發票時，8 碼）

**條件驗證**:
```typescript
// 公司發票需要額外欄位
if (invoiceType === 'company') {
  // companyName 和 taxId 必填
}
```

---

### Step 3: 付款方式

**元件**: `StepPayment.tsx`

**選項**:
1. **信用卡**: 即時付款
2. **ATM 轉帳**: 3 天內完成付款

**信用卡欄位** (僅信用卡時顯示):
- 卡號 (16-19 碼)
- 到期日 (MM/YY)
- CVC (3-4 碼)
- 持卡人姓名

---

### Step 4: 學員資料

**元件**: `StepStudentData.tsx`

**功能**:
- 動態學員陣列 (根據 quantity)
- 每位學員需填：姓名、Email、電話
- 數量減少時的確認對話框

**動態陣列**:
```typescript
const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'students',
});

// 同步學員數量
useEffect(() => {
  syncStudentsWithQuantity(students, quantity, append, remove);
}, [quantity]);
```

---

### Step 5: 確認送出

**元件**: `StepReview.tsx`

**功能**:
- 訂單摘要預覽
- 所有資料展示
- 編輯連結（返回特定步驟）
- 服務條款同意 checkbox
- 送出按鈕

---

## 狀態管理

### CheckoutContainer

主要狀態：

```typescript
const [currentStep, setCurrentStep] = useState(1);
const [completedSteps, setCompletedSteps] = useState<number[]>([]);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
```

### 步驟導航

```typescript
const goToStep = async (step: number) => {
  // 只能前往已完成或當前的下一步
  if (step <= Math.max(...completedSteps, currentStep) + 1) {
    // 驗證當前步驟
    const isValid = await validateCurrentStep();
    if (isValid || step < currentStep) {
      setCurrentStep(step);
    }
  }
};
```

### 完成步驟

```typescript
const validateCurrentStep = async () => {
  const fields = getStepFields(currentStep);
  const result = await form.trigger(fields);

  if (result) {
    setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
  }

  return result;
};
```

---

## 動畫

使用 Motion (Framer Motion) 實現步驟切換動畫：

```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={currentStep}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {renderStep()}
  </motion.div>
</AnimatePresence>
```

---

## 送出流程

```typescript
const handleSubmit = async (data: CheckoutFormData) => {
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const response = await fetch('/api/checkout/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // 導向成功頁面
      router.push(`/checkout/success?orderId=${result.orderId}`);
    } else {
      setSubmitError(result.message);
    }
  } catch (error) {
    setSubmitError('網路錯誤，請稍後再試');
  } finally {
    setIsSubmitting(false);
  }
};
```
