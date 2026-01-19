# 安裝指南

本頁面將指導你如何設定開發環境並啟動專案。

---

## 環境需求

在開始之前，請確保你的系統已安裝：

- **Node.js** 20.0.0 或更高版本
- **npm** / **pnpm** / **yarn** (套件管理器)
- **Git** (版本控制)

你還需要：

- **MongoDB Atlas** 帳號 (或本地 MongoDB)
- **Resend** API Key (可選，用於郵件服務)

---

## 安裝步驟

### 1. 克隆專案

```bash
git clone <repo-url>
cd nuva-general-funding-page
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 設定環境變數

複製環境變數範例檔案：

```bash
cp .env.local.example .env.local
```

編輯 `.env.local`，填入必要的值：

```bash
# 必要
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=your-random-session-secret-at-least-32-characters

# 可選
RESEND_API_KEY=re_xxx
```

> **注意**: 詳細的環境變數說明請查看 [環境變數文件](environment.md)。

### 4. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

---

## 開發指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 (Turbopack) |
| `npm run build` | 建構生產版本 |
| `npm start` | 啟動生產伺服器 |
| `npm run lint` | 執行 ESLint 檢查 |

---

## 常見問題

### MongoDB 連線失敗

1. 確認 `MONGODB_URI` 格式正確
2. 確認 MongoDB Atlas 已將你的 IP 加入白名單
3. 確認資料庫使用者有正確的權限

### Port 3000 被佔用

```bash
# 使用其他 port
npm run dev -- -p 3001
```

### 依賴安裝失敗

```bash
# 清除快取後重新安裝
rm -rf node_modules package-lock.json
npm install
```

---

## 下一步

- [了解系統架構](architecture/overview.md)
- [查看環境變數設定](environment.md)
- [開始開發](guides/code-style.md)
