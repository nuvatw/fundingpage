# 結帳 API

## POST /api/checkout/submit

建立新訂單。

---

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "planId": "accompany",
  "quantity": 2,
  "buyer": {
    "name": "王小明",
    "email": "example@email.com",
    "phone": "0912345678",
    "invoiceType": "personal",
    "companyName": "",
    "taxId": ""
  },
  "students": [
    {
      "name": "學員一",
      "email": "student1@email.com",
      "phone": "0923456789"
    },
    {
      "name": "學員二",
      "email": "student2@email.com",
      "phone": "0934567890"
    }
  ],
  "paymentMethod": "credit_card",
  "creditCard": {
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvc": "123",
    "cardholderName": "WANG XIAO MING"
  },
  "agreedToTerms": true
}
```

---

### 欄位說明

| 欄位 | 型別 | 必填 | 說明 |
|------|------|------|------|
| `planId` | string | ✅ | 方案 ID |
| `quantity` | number | ✅ | 數量 (1-50) |
| `buyer.name` | string | ✅ | 訂購人姓名 |
| `buyer.email` | string | ✅ | 訂購人 Email |
| `buyer.phone` | string | ✅ | 手機號碼 |
| `buyer.invoiceType` | string | ✅ | `personal` 或 `company` |
| `buyer.companyName` | string | 條件 | 公司名稱 |
| `buyer.taxId` | string | 條件 | 統編 (8 碼) |
| `students` | array | ✅ | 學員陣列 |
| `paymentMethod` | string | ✅ | `credit_card` 或 `atm` |
| `creditCard` | object | 條件 | 信用卡資訊 |
| `agreedToTerms` | boolean | ✅ | 必須為 `true` |

### 有效的 planId

餐飲版: `basic`, `accompany`, `founder`

通用版: `starter`, `explorer`, `master`

---

### Response

**成功 (200):**
```json
{
  "success": true,
  "message": "訂單建立成功",
  "orderId": "ORD-ABC123-XYZ789",
  "paymentMethod": "credit_card",
  "atmDeadline": null,
  "order": {
    "id": "ORD-ABC123-XYZ789",
    "planTitle": "陪跑",
    "quantity": 2,
    "totalPrice": 116000,
    "status": "pending"
  }
}
```

**ATM 付款 (200):**
```json
{
  "success": true,
  "message": "訂單建立成功",
  "orderId": "ORD-ABC123-XYZ789",
  "paymentMethod": "atm",
  "atmDeadline": "2026年1月22日",
  "order": { ... }
}
```

**驗證失敗 (400):**
```json
{
  "success": false,
  "message": "表單資料驗證失敗",
  "errors": {
    "buyer.phone": ["請輸入有效的手機號碼（09 開頭，共 10 碼）"]
  }
}
```

---

### cURL 範例

```bash
curl -X POST http://localhost:3000/api/checkout/submit \
  -H "Content-Type: application/json" \
  -d '{
    "planId": "accompany",
    "quantity": 1,
    "buyer": {
      "name": "王小明",
      "email": "test@example.com",
      "phone": "0912345678",
      "invoiceType": "personal"
    },
    "students": [
      {
        "name": "王小明",
        "email": "test@example.com",
        "phone": "0912345678"
      }
    ],
    "paymentMethod": "atm",
    "agreedToTerms": true
  }'
```
