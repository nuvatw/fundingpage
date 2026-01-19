# API 概述

本文件說明 API 的通用規範和使用方式。

---

## Base URL

| 環境 | URL |
|------|-----|
| 開發 | `http://localhost:3000/api` |
| 生產 | `https://your-domain.com/api` |

---

## 通用格式

### 成功回應

```json
{
  "success": true,
  "message": "操作描述",
  "data": { ... }
}
```

### 錯誤回應

```json
{
  "success": false,
  "message": "錯誤描述",
  "errors": {
    "field": ["錯誤訊息"]
  }
}
```

---

## HTTP 狀態碼

| 狀態碼 | 說明 |
|--------|------|
| 200 | 成功 |
| 400 | 請求錯誤 (驗證失敗、參數錯誤) |
| 401 | 未授權 (需要登入) |
| 404 | 資源不存在 |
| 500 | 伺服器錯誤 |

---

## API 端點列表

### 公開 API

| 方法 | 路徑 | 說明 |
|------|------|------|
| POST | `/api/checkout/submit` | 建立訂單 |
| POST | `/api/contact` | 提交聯絡表單 |
| GET | `/api/fundraising` | 取得募資設定 |

### Admin API (需授權)

| 方法 | 路徑 | 說明 |
|------|------|------|
| POST | `/api/admin/login` | 管理員登入 |
| GET | `/api/admin/check` | 驗證 session |
| POST | `/api/admin/logout` | 管理員登出 |
| GET | `/api/admin/orders` | 取得訂單列表 |
| PATCH | `/api/admin/orders` | 更新訂單 |
| GET | `/api/admin/contacts` | 取得聯絡表單列表 |
| PUT | `/api/fundraising` | 更新募資設定 |

---

## 授權方式

Admin API 使用 Cookie-based session：

1. 呼叫 `POST /api/admin/login` 取得 session
2. 後續請求會自動帶上 cookie
3. 呼叫 `POST /api/admin/logout` 清除 session

```typescript
// 登入
const res = await fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password }),
  credentials: 'include',  // 重要！
});

// 後續請求
const res = await fetch('/api/admin/orders', {
  credentials: 'include',
});
```

---

## 驗證錯誤格式

當 Zod 驗證失敗時：

```json
{
  "success": false,
  "message": "表單資料驗證失敗",
  "errors": {
    "buyer.name": ["請輸入姓名（至少 2 字）"],
    "buyer.email": ["請輸入有效的 Email"],
    "students": ["至少需要一位學員"]
  }
}
```

---

## 延伸閱讀

- [結帳 API](checkout.md)
- [Admin API](admin.md)
- [其他 API](others.md)
