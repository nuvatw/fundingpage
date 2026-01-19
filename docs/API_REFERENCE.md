<![CDATA[# API 參考文件 (API Reference)

本文件詳細說明 Nuva General Funding Page 的所有 API 端點。

---

## 目錄

- [概述](#概述)
- [結帳 API](#結帳-api)
- [Admin API](#admin-api)
- [聯絡表單 API](#聯絡表單-api)
- [募資設定 API](#募資設定-api)
- [錯誤處理](#錯誤處理)
- [型別定義](#型別定義)

---

## 概述

### Base URL

```
開發環境: http://localhost:3000/api
生產環境: https://your-domain.com/api
```

### 通用回應格式

**成功回應:**
```json
{
  "success": true,
  "message": "操作描述",
  "data": { ... }
}
```

**錯誤回應:**
```json
{
  "success": false,
  "message": "錯誤描述",
  "errors": { ... }  // 選填，欄位層級錯誤
}
```

### HTTP 狀態碼

| 狀態碼 | 說明 |
|--------|------|
| 200 | 成功 |
| 400 | 請求錯誤 (驗證失敗、參數錯誤) |
| 401 | 未授權 (需要登入) |
| 404 | 資源不存在 |
| 500 | 伺服器錯誤 |

---

## 結帳 API

### POST /api/checkout/submit

建立新訂單。

#### Request

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

**欄位說明:**

| 欄位 | 型別 | 必填 | 說明 |
|------|------|------|------|
| `planId` | string | ✅ | 方案 ID: `basic`, `accompany`, `founder`, `starter`, `explorer`, `master` |
| `quantity` | number | ✅ | 數量 (1-50, founder 最多 15) |
| `buyer.name` | string | ✅ | 訂購人姓名 (至少 2 字) |
| `buyer.email` | string | ✅ | 訂購人 Email |
| `buyer.phone` | string | ✅ | 手機號碼 (09 開頭，共 10 碼) |
| `buyer.invoiceType` | string | ✅ | `personal` 或 `company` |
| `buyer.companyName` | string | 條件 | 公司名稱 (invoiceType=company 時必填) |
| `buyer.taxId` | string | 條件 | 統一編號 (8 碼, invoiceType=company 時必填) |
| `students` | array | ✅ | 學員陣列 (數量需與 quantity 相符) |
| `students[].name` | string | ✅ | 學員姓名 |
| `students[].email` | string | ✅ | 學員 Email |
| `students[].phone` | string | ✅ | 學員手機 |
| `paymentMethod` | string | ✅ | `credit_card` 或 `atm` |
| `creditCard` | object | 條件 | paymentMethod=credit_card 時必填 |
| `agreedToTerms` | boolean | ✅ | 必須為 `true` |

#### Response

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
    "buyer.phone": ["請輸入有效的手機號碼（09 開頭，共 10 碼）"],
    "students": ["至少需要一位學員"]
  }
}
```

**方案不存在 (400):**
```json
{
  "success": false,
  "message": "我知道你很急\n但是你先別急（還沒開始Ｒ）"
}
```

#### cURL 範例

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

---

## Admin API

### POST /api/admin/login

管理員登入。

#### Request

**Body:**
```json
{
  "password": "your-admin-password"
}
```

#### Response

**成功 (200):**
```json
{
  "success": true
}
```

**回應會設定 HttpOnly cookie:**
```
Set-Cookie: admin_session=<token>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

**失敗 (401):**
```json
{
  "success": false,
  "message": "密碼錯誤"
}
```

---

### GET /api/admin/check

驗證管理員 session。

#### Request

需要帶上 `admin_session` cookie。

#### Response

**已登入 (200):**
```json
{
  "authenticated": true
}
```

**未登入 (401):**
```json
{
  "authenticated": false
}
```

---

### POST /api/admin/logout

管理員登出。

#### Response

**成功 (200):**
```json
{
  "success": true
}
```

清除 `admin_session` cookie。

---

### GET /api/admin/orders

取得訂單列表。

#### Request

**Headers:**
需要帶上 `admin_session` cookie。

**Query Parameters:**

| 參數 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `page` | number | 1 | 頁碼 |
| `limit` | number | 20 | 每頁筆數 |
| `status` | string | - | 篩選狀態: `pending`, `paid`, `failed`, `cancelled`, `refunded` |
| `planId` | string | - | 篩選方案 |
| `source` | string | - | 篩選來源: `restaurant`, `general` |
| `search` | string | - | 搜尋 (訂單 ID、Email) |

#### Response

**成功 (200):**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "...",
      "orderId": "ORD-ABC123-XYZ789",
      "planId": "accompany",
      "planTitle": "陪跑",
      "quantity": 2,
      "unitPrice": 58000,
      "totalPrice": 116000,
      "discountAmount": 0,
      "buyer": {
        "name": "王小明",
        "email": "test@example.com",
        "phone": "0912345678",
        "invoiceType": "personal"
      },
      "students": [...],
      "paymentMethod": "credit_card",
      "status": "pending",
      "source": "restaurant",
      "createdAt": "2026-01-19T10:00:00.000Z",
      "updatedAt": "2026-01-19T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

### PATCH /api/admin/orders

更新訂單狀態。

#### Request

**Body:**
```json
{
  "orderId": "ORD-ABC123-XYZ789",
  "status": "paid",
  "notes": "已確認收到款項"
}
```

| 欄位 | 型別 | 必填 | 說明 |
|------|------|------|------|
| `orderId` | string | ✅ | 訂單 ID |
| `status` | string | 條件 | 新狀態 |
| `notes` | string | - | 備註 |

#### Response

**成功 (200):**
```json
{
  "success": true,
  "order": { ... }
}
```

---

### GET /api/admin/contacts

取得聯絡表單列表。

#### Request

需要 `admin_session` cookie。

**Query Parameters:**

| 參數 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `page` | number | 1 | 頁碼 |
| `limit` | number | 20 | 每頁筆數 |
| `status` | string | - | 篩選狀態: `new`, `replied`, `closed` |
| `source` | string | - | 來源: `restaurant`, `general`, `brand` |

#### Response

**成功 (200):**
```json
{
  "success": true,
  "contacts": [
    {
      "_id": "...",
      "name": "李小華",
      "email": "contact@example.com",
      "question": "請問課程內容...",
      "source": "restaurant",
      "status": "new",
      "createdAt": "2026-01-19T10:00:00.000Z"
    }
  ],
  "pagination": { ... }
}
```

---

## 聯絡表單 API

### POST /api/contact

提交聯絡表單。

#### Request

**Body:**
```json
{
  "name": "李小華",
  "email": "contact@example.com",
  "question": "請問課程內容是什麼？",
  "source": "restaurant"
}
```

| 欄位 | 型別 | 必填 | 說明 |
|------|------|------|------|
| `name` | string | ✅ | 姓名 |
| `email` | string | ✅ | Email |
| `question` | string | ✅ | 問題內容 |
| `source` | string | - | 來源頁面 |

#### Response

**成功 (200):**
```json
{
  "success": true,
  "message": "感謝您的留言，我們會盡快回覆！"
}
```

---

## 募資設定 API

### GET /api/fundraising

取得募資設定。

#### Response

**成功 (200):**
```json
{
  "success": true,
  "config": {
    "targetDisplay": "100 人",
    "targetAmount": 100,
    "currentAmount": 45,
    "supporters": 45,
    "deadline": "2026-03-31T23:59:59.000Z"
  }
}
```

---

### PUT /api/fundraising

更新募資設定 (需要 Admin 權限)。

#### Request

需要 `admin_session` cookie。

**Body:**
```json
{
  "targetDisplay": "150 人",
  "targetAmount": 150,
  "currentAmount": 60,
  "supporters": 60,
  "deadline": "2026-04-30T23:59:59.000Z"
}
```

#### Response

**成功 (200):**
```json
{
  "success": true,
  "config": { ... }
}
```

---

## 錯誤處理

### 驗證錯誤格式

當表單驗證失敗時，`errors` 物件會包含每個欄位的錯誤訊息陣列：

```json
{
  "success": false,
  "message": "表單資料驗證失敗",
  "errors": {
    "buyer.name": ["請輸入姓名（至少 2 字）"],
    "buyer.email": ["請輸入有效的 Email"],
    "buyer.phone": ["請輸入有效的手機號碼（09 開頭，共 10 碼）"],
    "students": ["至少需要一位學員"]
  }
}
```

### 常見錯誤碼

| 錯誤 | 狀態碼 | 處理建議 |
|------|--------|----------|
| 驗證失敗 | 400 | 顯示欄位錯誤訊息 |
| 未授權 | 401 | 導向登入頁面 |
| 資源不存在 | 404 | 顯示 404 頁面 |
| 伺服器錯誤 | 500 | 顯示通用錯誤訊息，建議重試 |

---

## 型別定義

### PaymentMethod

```typescript
type PaymentMethod = 'credit_card' | 'atm';
```

### InvoiceType

```typescript
type InvoiceType = 'personal' | 'company';
```

### OrderStatus

```typescript
type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
```

### OrderSource

```typescript
type OrderSource = 'restaurant' | 'general';
```

### BuyerInfo

```typescript
interface BuyerInfo {
  name: string;
  email: string;
  phone: string;
  invoiceType: InvoiceType;
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

### CreditCardData

```typescript
interface CreditCardData {
  cardNumber: string;
  expiryDate: string;  // MM/YY
  cvc: string;
  cardholderName: string;
}
```

### CheckoutFormData

```typescript
interface CheckoutFormData {
  planId: string;
  quantity: number;
  buyer: BuyerInfo;
  students: StudentInfo[];
  paymentMethod: PaymentMethod;
  creditCard?: CreditCardData;
  agreedToTerms: boolean;
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
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
```

---

## 附錄：方案 ID 對照表

| 方案 ID | 名稱 | 價格 | 類別 |
|---------|------|------|------|
| `free` | 免費 | NT$0 | 餐飲 (不可購買) |
| `basic` | 基礎 | NT$2,400/月 | 餐飲 |
| `accompany` | 陪跑 | NT$58,000 | 餐飲 |
| `founder` | 領航 | NT$210,000 | 餐飲 |
| `starter` | 入門 | NT$2,400 | 通用 |
| `explorer` | 探索 | NT$4,800 | 通用 |
| `master` | 大師 | NT$9,600 | 通用 |
| `group` | 團隊 | 客製報價 | 通用 (不可線上購買) |
]]>