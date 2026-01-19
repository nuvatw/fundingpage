# 系統架構概覽

本文件說明 Nuva General Funding Page 的整體系統架構。

---

## 高階架構圖

```
┌───────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐  │
│  │   (brand)   │ │   (main)    │ │  checkout   │ │       admin         │  │
│  │   品牌首頁   │ │  餐飲/通用   │ │   結帳流程  │ │      管理後台        │  │
│  │   /         │ │ /restaurant │ │  /checkout  │ │      /admin         │  │
│  │             │ │ /general    │ │             │ │                     │  │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘  │
├───────────────────────────────────────────────────────────────────────────┤
│                            COMPONENTS LAYER                                │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐   │
│  │ sections/ │ │ general/  │ │ checkout/ │ │    ui/    │ │  layout/  │   │
│  │ 著陸頁區塊│ │ 通用頁面  │ │ 結帳元件  │ │  UI 元件  │ │ 版面元件  │   │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘   │
├───────────────────────────────────────────────────────────────────────────┤
│                              LIB LAYER                                     │
│  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │  data/  │ │ checkout/ │ │   db/  │ │  email/ │ │  hooks/ │ │ types/│  │
│  │ 靜態資料│ │ 結帳邏輯  │ │ 資料庫 │ │   郵件  │ │  Hooks  │ │  型別 │  │
│  └─────────┘ └───────────┘ └────────┘ └─────────┘ └─────────┘ └───────┘  │
├───────────────────────────────────────────────────────────────────────────┤
│                             API LAYER                                      │
│  ┌─────────────────────┐ ┌─────────────────┐ ┌───────────────────────┐    │
│  │ /api/checkout/submit│ │  /api/admin/*   │ │    /api/contact       │    │
│  │    訂單提交         │ │   Admin CRUD    │ │     聯絡表單          │    │
│  └─────────────────────┘ └─────────────────┘ └───────────────────────┘    │
├───────────────────────────────────────────────────────────────────────────┤
│                          INFRASTRUCTURE                                    │
│  ┌─────────────────────────────┐ ┌───────────────────────────────────┐    │
│  │      MongoDB Atlas          │ │         Resend Email              │    │
│  │   (Mongoose ODM 9.1.4)      │ │         (API 6.7.0)               │    │
│  └─────────────────────────────┘ └───────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 分層說明

### Client Layer (客戶端層)

使用 Next.js App Router，透過 Route Groups 組織不同的頁面：

| Route Group | 路徑 | 說明 |
|-------------|------|------|
| `(brand)` | `/` | 品牌首頁，使用獨立的 Header/Footer |
| `(main)` | `/restaurant`, `/general` | 產品頁面，共用 Header/Footer |
| `checkout` | `/checkout/*` | 結帳流程，簡化版 Header |
| `admin` | `/admin` | 管理後台，無 Header/Footer |

### Components Layer (元件層)

React 元件按功能分類：

- **sections/** - 餐飲版 Landing Page 的 10 個區塊
- **general/** - 通用 AI 頁面專屬元件
- **checkout/** - 結帳流程元件 (步驟、表單、版面)
- **ui/** - 可重用的 UI 元件 (按鈕、卡片、導航)
- **layout/** - Header 和 Footer

### Lib Layer (工具層)

商業邏輯和工具函式：

- **data/** - 靜態資料 (方案、FAQ、課綱)
- **checkout/** - 結帳相關 (驗證、常數、型別)
- **db/** - MongoDB 連線與模型
- **email/** - Resend 郵件服務
- **hooks/** - 自訂 React Hooks
- **types/** - TypeScript 型別定義

### API Layer (API 層)

Next.js API Routes：

- `/api/checkout/submit` - 訂單提交
- `/api/admin/*` - Admin CRUD
- `/api/contact` - 聯絡表單
- `/api/fundraising` - 募資設定

### Infrastructure (基礎設施)

- **MongoDB Atlas** - 雲端資料庫
- **Resend** - 郵件發送服務

---

## 技術棧摘要

| 層級 | 技術 | 說明 |
|------|------|------|
| Framework | Next.js 16.1.2 | App Router, Server Components |
| UI | React 19.2.3 | 最新版 React |
| Styling | Tailwind CSS 4.1.18 | Utility-first CSS |
| Animation | Motion 12.26.2 | Framer Motion for React 19 |
| Form | react-hook-form + Zod | 表單狀態 + Schema 驗證 |
| Database | MongoDB + Mongoose | Document-based 資料庫 |
| Email | Resend | 交易郵件服務 |
| Build | Turbopack + React Compiler | 快速建構 + 自動優化 |

---

## 延伸閱讀

- [目錄結構詳解](directory.md)
- [Route Groups 策略](route-groups.md)
- [技術決策記錄](decisions.md)
