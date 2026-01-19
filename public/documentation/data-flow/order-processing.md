# 訂單處理

本文件說明訂單從建立到完成的完整流程。

---

## 訂單狀態機

```
        ┌─────────┐
        │ pending │ ← 訂單建立
        └────┬────┘
             │
     ┌───────┴───────┐
     ▼               ▼
┌─────────┐    ┌──────────┐
│  paid   │    │  failed  │
└────┬────┘    └──────────┘
     │
     ├───────────────────┐
     ▼                   ▼
┌───────────┐     ┌──────────┐
│ cancelled │     │ refunded │
└───────────┘     └──────────┘
```

### 狀態說明

| 狀態 | 說明 |
|------|------|
| `pending` | 訂單建立，等待付款 |
| `paid` | 已付款 |
| `failed` | 付款失敗 |
| `cancelled` | 已取消 |
| `refunded` | 已退款 |

---

## 訂單建立流程

### 1. 客戶端提交

```typescript
// CheckoutContainer.tsx
const response = await fetch('/api/checkout/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

### 2. 伺服器驗證

```typescript
// app/api/checkout/submit/route.ts

// 1. Zod 驗證
const result = checkoutSchema.safeParse(body);
if (!result.success) {
  return NextResponse.json({
    success: false,
    errors: result.error.flatten().fieldErrors,
  }, { status: 400 });
}

// 2. 方案驗證
const plan = findPlan(data.planId);
if (!plan || plan.id === 'free') {
  return NextResponse.json({
    success: false,
    message: '無效的方案',
  }, { status: 400 });
}
```

### 3. 計算價格

```typescript
const { unitPrice, total, discount } = calculateTotal(plan, data.quantity);
```

### 4. 產生訂單 ID

```typescript
const orderId = generateOrderId();
// => "ORD-ABC123-XYZ789"
```

### 5. 建立訂單

```typescript
const order = await Order.create({
  orderId,
  planId: data.planId,
  planTitle: plan.title,
  quantity: data.quantity,
  unitPrice,
  totalPrice: total,
  discountAmount: discount || 0,
  buyer: data.buyer,
  students: data.students,
  paymentMethod: data.paymentMethod,
  status: 'pending',
  atmDeadline,  // ATM 付款 +3 天
  source: detectSource(data.planId),
});
```

### 6. 發送確認信

```typescript
try {
  await sendOrderConfirmationEmail({
    order: orderData,
    atmDeadline: atmDeadlineStr,
  });
} catch (error) {
  // 郵件失敗不影響訂單
  console.error('Email failed:', error);
}
```

### 7. 回傳結果

```typescript
return NextResponse.json({
  success: true,
  orderId,
  paymentMethod: data.paymentMethod,
  atmDeadline: atmDeadlineStr,
  order: {
    id: orderId,
    planTitle: plan.title,
    quantity: data.quantity,
    totalPrice: total,
    status: 'pending',
  },
});
```

---

## ATM 付款流程

### 建立時

- 自動計算付款期限 (+3 天)
- 存入 `atmDeadline` 欄位

### 確認付款

管理員在後台手動確認：

```typescript
// PATCH /api/admin/orders
await Order.findOneAndUpdate(
  { orderId },
  {
    status: 'paid',
    paidAt: new Date(),
  }
);
```

---

## 信用卡付款流程

> 目前為 Mock 實作，未串接金流。

未來整合金流時的流程：

1. 前端收集卡號（不傳到後端）
2. 使用金流 SDK 進行 tokenization
3. 將 token 傳到後端
4. 後端呼叫金流 API
5. 更新訂單狀態

---

## 訂單查詢

### 依訂單 ID

```typescript
const order = await Order.findOne({ orderId });
```

### 依 Email

```typescript
const orders = await Order.find({ 'buyer.email': email })
  .sort({ createdAt: -1 });
```

### Admin 分頁查詢

```typescript
const orders = await Order.find(query)
  .sort({ createdAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit);

const total = await Order.countDocuments(query);
```

---

## 錯誤處理

### 驗證錯誤

```json
{
  "success": false,
  "message": "表單資料驗證失敗",
  "errors": {
    "buyer.phone": ["請輸入有效的手機號碼"]
  }
}
```

### 方案錯誤

```json
{
  "success": false,
  "message": "我知道你很急\n但是你先別急（還沒開始Ｒ）"
}
```

### 系統錯誤

```json
{
  "success": false,
  "message": "系統錯誤，請稍後再試"
}
```
