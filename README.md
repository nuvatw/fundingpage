<![CDATA[<p align="center">
  <img src="public/images/nuva-logo.png" width="180" alt="Nuva Logo" />
</p>

<h1 align="center">Nuva General Funding Page</h1>

<p align="center">
  <strong>AI 學習社群募資平台</strong><br/>
  餐飲 AI 訓練 × 通用 AI 學習
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.2-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-9.1.4-47A248?logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1.18-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
</p>

---

## 目錄

- [專案簡介](#專案簡介)
- [技術棧](#技術棧)
- [快速開始](#快速開始)
- [專案架構](#專案架構)
- [文件導覽](#文件導覽)
- [開發指令](#開發指令)
- [環境變數](#環境變數)
- [部署](#部署)

---

## 專案簡介

**Nuva General Funding Page** 是一個全端 Next.js 電商平台，專為 Nuva AI 學習社群的課程銷售而設計。平台支援兩條產品線：

| 產品線 | 說明 | 路徑 |
|--------|------|------|
| **餐飲 AI 訓練** | 90 天 AI 整合計畫，針對餐飲業 | `/restaurant` |
| **通用 AI 學習** | 彈性自學方案，面向一般學習者 | `/general` |

### 核心功能

- **Landing Page** - 10 個行銷區塊，包含方案比較、課程大綱、講師介紹
- **多步驟結帳流程** - 5 步驟表單，支援信用卡和 ATM 付款
- **訂單管理後台** - 密碼保護的 Admin Dashboard
- **郵件通知** - 訂單確認信自動發送
- **響應式設計** - 完整支援桌面與行動裝置

---

## 技術棧

### 前端
| 技術 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 16.1.2 | App Router 全端框架 |
| **React** | 19.2.3 | UI 函式庫 |
| **TypeScript** | 5.9.3 | 型別安全 |
| **Tailwind CSS** | 4.1.18 | Utility-first 樣式 |
| **Motion** | 12.26.2 | 動畫庫 (Framer Motion for React 19) |
| **react-hook-form** | 7.71.1 | 表單狀態管理 |
| **Zod** | 4.3.5 | Schema 驗證 |

### 後端
| 技術 | 版本 | 用途 |
|------|------|------|
| **MongoDB** | Atlas | 資料庫 |
| **Mongoose** | 9.1.4 | ODM |
| **Resend** | 6.7.0 | 郵件服務 |

### 建構工具
| 技術 | 用途 |
|------|------|
| **Turbopack** | 快速開發建構 |
| **React Compiler** | 自動 memoization 優化 |
| **PostCSS** | CSS 處理 |
| **CSSnano** | CSS 壓縮 |

---

## 快速開始

### 環境需求

- Node.js 20.0.0+
- npm / pnpm / yarn
- MongoDB Atlas 帳號 (或本地 MongoDB)
- Resend API Key (可選，用於郵件服務)

### 安裝步驟

```bash
# 1. 克隆專案
git clone <repo-url>
cd nuva-general-funding-page

# 2. 安裝依賴
npm install

# 3. 設定環境變數
cp .env.local.example .env.local
# 編輯 .env.local 填入實際值 (詳見「環境變數」章節)

# 4. 啟動開發伺服器
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

---

## 專案架構

```
nuva-general-funding-page/
├── app/                          # Next.js App Router
│   ├── (brand)/                  # 品牌首頁 (Route Group)
│   ├── (main)/                   # 產品頁面 (Route Group)
│   │   ├── restaurant/           # 餐飲 AI 方案
│   │   └── general/              # 通用 AI 方案
│   ├── checkout/                 # 結帳流程
│   ├── admin/                    # 管理後台
│   └── api/                      # API Routes
│       ├── checkout/submit/      # 訂單提交
│       ├── admin/                # Admin CRUD
│       └── contact/              # 聯絡表單
│
├── components/                   # React 元件
│   ├── sections/                 # Landing Page 區塊 (01-10)
│   ├── general/                  # 通用 AI 頁面元件
│   ├── checkout/                 # 結帳流程元件
│   │   ├── steps/                # 5 個步驟元件
│   │   ├── forms/                # 表單元件
│   │   └── layout/               # 結帳版面
│   ├── ui/                       # 可重用 UI 元件
│   │   ├── plans/                # 方案卡片、比較表
│   │   ├── buttons/              # 按鈕元件
│   │   └── navigation/           # 導航元件
│   ├── layout/                   # Header / Footer
│   └── home/                     # 品牌首頁元件
│
├── lib/                          # 工具與商業邏輯
│   ├── data/                     # 靜態資料 (方案、FAQ、課綱)
│   ├── checkout/                 # 結帳邏輯 (schemas, constants, utils)
│   ├── db/                       # MongoDB 連線與 Models
│   ├── email/                    # Resend 郵件服務
│   ├── auth/                     # Admin 驗證
│   ├── hooks/                    # 自訂 React Hooks
│   └── types/                    # TypeScript 型別定義
│
├── public/                       # 靜態資源
│   ├── images/                   # 圖片
│   └── audio/                    # 音訊
│
└── docs/                         # 詳細文件
    ├── ARCHITECTURE.md           # 架構詳解
    └── API_REFERENCE.md          # API 文件
```

### 架構概覽

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
├──────────────┬──────────────┬──────────────┬────────────────┤
│   (brand)    │    (main)    │   checkout   │     admin      │
│   品牌首頁    │  餐飲/通用    │   結帳流程    │    管理後台    │
├──────────────┴──────────────┴──────────────┴────────────────┤
│                     COMPONENTS                               │
│  sections/ │ general/ │ checkout/ │ ui/ │ layout/           │
├─────────────────────────────────────────────────────────────┤
│                        LIB                                   │
│  data/ │ checkout/ │ db/ │ email/ │ hooks/ │ types/         │
├─────────────────────────────────────────────────────────────┤
│                      API ROUTES                              │
│  /api/checkout/submit │ /api/admin/* │ /api/contact         │
├─────────────────────────────────────────────────────────────┤
│                     INFRASTRUCTURE                           │
│         MongoDB Atlas         │       Resend Email           │
└─────────────────────────────────────────────────────────────┘
```

---

## 文件導覽

| 文件 | 說明 |
|------|------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | 完整架構詳解、模組依賴圖、技術決策說明 |
| [docs/API_REFERENCE.md](docs/API_REFERENCE.md) | API 端點文件、請求/回應格式、錯誤處理 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 貢獻指南、程式碼風格、PR 規範 |

---

## 開發指令

```bash
# 開發伺服器 (Turbopack)
npm run dev

# 生產建構
npm run build

# 啟動生產伺服器
npm start

# 程式碼檢查
npm run lint
```

---

## 環境變數

在 `.env.local` 中設定以下變數：

```bash
# ========== 必要 ==========

# MongoDB 連線字串
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Admin 後台密碼
ADMIN_PASSWORD=your-secure-password

# Session 密鑰 (至少 32 字元)
SESSION_SECRET=your-random-session-secret-at-least-32-characters

# ========== 可選 ==========

# Resend 郵件服務 API Key
RESEND_API_KEY=re_xxx
```

---

## 部署

### Vercel (推薦)

1. 將專案推送到 GitHub
2. 在 [Vercel](https://vercel.com) 匯入專案
3. 設定環境變數
4. 部署

專案已針對 Vercel 優化：
- Mongoose 設為 `serverExternalPackages` 避免 bundle 問題
- MongoDB 連線池管理，適應 Serverless 架構
- 圖片優化配置 (AVIF/WebP)

---

## 授權

Private - 僅限內部使用

---

## 相關連結

- [Nuva 官網](https://nuva.ai)
- [Next.js 文件](https://nextjs.org/docs)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)
]]>