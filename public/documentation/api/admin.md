# Admin API

需要授權的管理員 API。

---

## POST /api/admin/login

管理員登入。

### Request

```json
{
  "password": "your-admin-password"
}
```

### Response

**成功 (200):**
```json
{
  "success": true
}
```

會設定 HttpOnly cookie。

**失敗 (401):**
```json
{
  "success": false,
  "message": "密碼錯誤"
}
```

---

## GET /api/admin/check

驗證管理員 session。

### Response

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

## POST /api/admin/logout

管理員登出。

### Response

```json
{
  "success": true
}
```

---

## GET /api/admin/orders

取得訂單列表。

### Query Parameters

| 參數 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `page` | number | 1 | 頁碼 |
| `limit` | number | 20 | 每頁筆數 |
| `status` | string | - | 篩選狀態 |
| `planId` | string | - | 篩選方案 |
| `source` | string | - | 篩選來源 |
| `search` | string | - | 搜尋 |

### Response

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
      "totalPrice": 116000,
      "buyer": { ... },
      "students": [ ... ],
      "paymentMethod": "credit_card",
      "status": "pending",
      "source": "restaurant",
      "createdAt": "2026-01-19T10:00:00.000Z"
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

## PATCH /api/admin/orders

更新訂單。

### Request

```json
{
  "orderId": "ORD-ABC123-XYZ789",
  "status": "paid",
  "notes": "已確認收到款項"
}
```

### Response

```json
{
  "success": true,
  "order": { ... }
}
```

---

## GET /api/admin/contacts

取得聯絡表單列表。

### Query Parameters

| 參數 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `page` | number | 1 | 頁碼 |
| `limit` | number | 20 | 每頁筆數 |
| `status` | string | - | 篩選狀態 |
| `source` | string | - | 來源 |

### Response

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

## cURL 範例

```bash
# 登入
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password": "your-password"}' \
  -c cookies.txt

# 取得訂單 (使用 cookie)
curl http://localhost:3000/api/admin/orders \
  -b cookies.txt

# 更新訂單
curl -X PATCH http://localhost:3000/api/admin/orders \
  -H "Content-Type: application/json" \
  -d '{"orderId": "ORD-ABC123", "status": "paid"}' \
  -b cookies.txt
```
