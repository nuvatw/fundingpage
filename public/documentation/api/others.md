# 其他 API

## POST /api/contact

提交聯絡表單。

### Request

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

### Response

**成功 (200):**
```json
{
  "success": true,
  "message": "感謝您的留言，我們會盡快回覆！"
}
```

---

## GET /api/fundraising

取得募資設定。

### Response

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

## PUT /api/fundraising

更新募資設定 (需要 Admin 權限)。

### Request

```json
{
  "targetDisplay": "150 人",
  "targetAmount": 150,
  "currentAmount": 60,
  "supporters": 60,
  "deadline": "2026-04-30T23:59:59.000Z"
}
```

### Response

```json
{
  "success": true,
  "config": { ... }
}
```

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

---

## 方案 ID 對照表

| 方案 ID | 名稱 | 價格 | 類別 |
|---------|------|------|------|
| `free` | 免費 | NT$0 | 餐飲 (不可購買) |
| `basic` | 基礎 | NT$2,400/月 | 餐飲 |
| `accompany` | 陪跑 | NT$58,000 | 餐飲 |
| `founder` | 領航 | NT$210,000 | 餐飲 |
| `starter` | 入門 | NT$2,400 | 通用 |
| `explorer` | 探索 | NT$4,800 | 通用 |
| `master` | 大師 | NT$9,600 | 通用 |
| `group` | 團隊 | 客製報價 | 通用 (不可購買) |
