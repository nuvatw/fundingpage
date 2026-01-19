# 環境變數

本文件說明專案所需的所有環境變數。

---

## 設定方式

在專案根目錄建立 `.env.local` 檔案：

```bash
cp .env.local.example .env.local
```

---

## 必要變數

### MONGODB_URI

MongoDB 連線字串。

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

**取得方式:**
1. 登入 [MongoDB Atlas](https://cloud.mongodb.com)
2. 建立 Cluster
3. 點擊 "Connect" → "Connect your application"
4. 複製連線字串

---

### ADMIN_PASSWORD

管理後台的登入密碼。

```bash
ADMIN_PASSWORD=your-secure-password
```

> **安全提醒**: 請使用強密碼，建議至少 16 個字元，包含大小寫字母、數字和特殊字元。

---

### SESSION_SECRET

用於加密 session 的密鑰。

```bash
SESSION_SECRET=your-random-session-secret-at-least-32-characters
```

**產生方式:**

```bash
# 使用 Node.js 產生隨機字串
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 可選變數

### RESEND_API_KEY

Resend 郵件服務的 API Key。如果不設定，郵件功能將被停用。

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**取得方式:**
1. 登入 [Resend](https://resend.com)
2. 進入 Dashboard → API Keys
3. 建立新的 API Key

---

## 完整範例

```bash
# .env.local

# ========== 必要 ==========

# MongoDB 連線字串
MONGODB_URI=mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/nuva_funding?retryWrites=true&w=majority

# Admin 後台密碼
ADMIN_PASSWORD=MySecurePassword123!

# Session 密鑰 (至少 32 字元)
SESSION_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0

# ========== 可選 ==========

# Resend 郵件服務 API Key
RESEND_API_KEY=re_abc123xyz456
```

---

## Vercel 部署

在 Vercel 上部署時，請在專案設定中加入這些環境變數：

1. 進入 Vercel Dashboard → 你的專案
2. Settings → Environment Variables
3. 加入上述所有變數

> **注意**: 不同環境 (Production/Preview/Development) 可以設定不同的值。

---

## 環境變數檢查

專案啟動時會檢查必要的環境變數。如果缺少必要變數，會在 console 顯示錯誤訊息。
