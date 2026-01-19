<![CDATA[# 架構詳解 (ARCHITECTURE)

本文件詳細說明 Nuva General Funding Page 的系統架構、模組設計、資料流程與技術決策。

---

## 目錄

- [1. 系統概覽](#1-系統概覽)
- [2. 目錄結構詳解](#2-目錄結構詳解)
- [3. Route Groups 策略](#3-route-groups-策略)
- [4. 核心模組分析](#4-核心模組分析)
- [5. 資料流程](#5-資料流程)
- [6. 資料模型](#6-資料模型)
- [7. 結帳流程架構](#7-結帳流程架構)
- [8. 驗證系統](#8-驗證系統)
- [9. 技術決策記錄 (ADR)](#9-技術決策記錄-adr)
- [10. 模組依賴圖](#10-模組依賴圖)
- [11. 效能優化](#11-效能優化)

---

## 1. 系統概覽

### 高階架構圖

```
┌───────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐  │
│  │   (brand)   │ │   (main)    │ │  checkout   │ │       admin         │  │
│  │   品牌首頁   │ │  餐飲/通用   │ │  結帳流程   │ │      管理後台       │  │
│  │   /         │ │ /restaurant │ │  /checkout  │ │      /admin         │  │
│  │             │ │ /general    │ │             │ │                     │  │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘  │
├───────────────────────────────────────────────────────────────────────────┤
│                            COMPONENTS LAYER                                │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐   │
│  │ sections/ │ │ general/  │ │ checkout/ │ │    ui/    │ │  layout/  │   │
│  │ 著陸頁區塊 │ │ 通用頁面  │ │ 結帳元件  │ │ UI 元件   │ │ 版面元件  │   │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘   │
├───────────────────────────────────────────────────────────────────────────┤
│                              LIB LAYER                                     │
│  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │  data/  │ │ checkout/ │ │   db/  │ │  email/ │ │  hooks/ │ │ types/│  │
│  │ 靜態資料 │ │ 結帳邏輯  │ │ 資料庫 │ │ 郵件   │ │  Hooks  │ │ 型別  │  │
│  └─────────┘ └───────────┘ └────────┘ └─────────┘ └─────────┘ └───────┘  │
├───────────────────────────────────────────────────────────────────────────┤
│                             API LAYER                                      │
│  ┌─────────────────────┐ ┌─────────────────┐ ┌───────────────────────┐    │
│  │ /api/checkout/submit│ │  /api/admin/*   │ │    /api/contact       │    │
│  │    訂單提交         │ │  Admin CRUD     │ │     聯絡表單          │    │
│  └─────────────────────┘ └─────────────────┘ └───────────────────────┘    │
├───────────────────────────────────────────────────────────────────────────┤
│                          INFRASTRUCTURE                                    │
│  ┌─────────────────────────────┐ ┌───────────────────────────────────┐    │
│  │      MongoDB Atlas          │ │         Resend Email              │    │
│  │   (Mongoose ODM 9.1.4)      │ │         (API 6.7.0)               │    │
│  └─────────────────────────────┘ └───────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────────────────┘
```

### 技術棧摘要

| 層級 | 技術 | 說明 |
|------|------|------|
| Framework | Next.js 16.1.2 | App Router, Server Components, API Routes |
| UI | React 19.2.3 | 最新版 React with auto-batching |
| Styling | Tailwind CSS 4.1.18 | Utility-first CSS |
| Animation | Motion 12.26.2 | Framer Motion for React 19 |
| Form | react-hook-form 7.71.1 + Zod 4.3.5 | 表單狀態 + Schema 驗證 |
| Database | MongoDB + Mongoose 9.1.4 | Document-based 資料庫 |
| Email | Resend 6.7.0 | 交易郵件服務 |
| Build | Turbopack + React Compiler | 快速建構 + 自動 memoization |

---

## 2. 目錄結構詳解

```
nuva-general-funding-page/
│
├── app/                              # Next.js App Router
│   │
│   ├── layout.tsx                    # 根 Layout (RootLayout)
│   │                                 # - 設定 HTML lang="zh-TW"
│   │                                 # - 載入 Noto Sans TC 字型
│   │                                 # - 引入 globals.css
│   │
│   ├── globals.css                   # 全域樣式 (Tailwind 指令)
│   │
│   ├── (brand)/                      # Route Group: 品牌首頁
│   │   ├── layout.tsx                # 品牌專屬 Layout
│   │   └── page.tsx                  # 首頁 (HeroSection, ServicesSection, etc.)
│   │
│   ├── (main)/                       # Route Group: 產品頁面
│   │   ├── layout.tsx                # 共用 Layout (Header + Footer + MusicPlayer)
│   │   ├── restaurant/
│   │   │   └── page.tsx              # 餐飲 AI 方案頁 (10 個 sections)
│   │   └── general/
│   │       └── page.tsx              # 通用 AI 方案頁
│   │
│   ├── checkout/                     # 結帳流程
│   │   ├── layout.tsx                # 結帳專屬 Layout
│   │   ├── page.tsx                  # 結帳頁 (Server Component)
│   │   │                             # - 驗證 URL params (planId, qty)
│   │   │                             # - 載入方案資料
│   │   │                             # - 傳給 CheckoutContainer
│   │   └── success/
│   │       └── page.tsx              # 成功頁面
│   │
│   ├── admin/                        # 管理後台
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Admin Dashboard (密碼保護)
│   │
│   ├── legal/                        # 法律頁面
│   │   └── page.tsx                  # 服務條款、隱私權政策
│   │
│   ├── document/                     # 文件頁面
│   │   └── page.tsx
│   │
│   └── api/                          # API Routes (Server-side)
│       │
│       ├── checkout/
│       │   └── submit/
│       │       └── route.ts          # POST: 訂單提交
│       │
│       ├── admin/
│       │   ├── login/route.ts        # POST: 登入
│       │   ├── check/route.ts        # GET: 驗證 session
│       │   ├── logout/route.ts       # POST: 登出
│       │   ├── orders/route.ts       # GET/PATCH: 訂單 CRUD
│       │   └── contacts/route.ts     # GET: 聯絡表單列表
│       │
│       ├── contact/
│       │   └── route.ts              # POST: 聯絡表單提交
│       │
│       └── fundraising/
│           └── route.ts              # GET/PUT: 募資設定
│
├── components/                       # React 元件
│   │
│   ├── sections/                     # Landing Page 區塊 (餐飲版)
│   │   ├── index.ts                  # Barrel export
│   │   ├── 01_HeroSection.tsx        # Hero + CTA
│   │   ├── 02_TrustLogos.tsx         # 合作品牌 Logo
│   │   ├── 03_ComparisonSection.tsx  # AI 導入前後對比
│   │   ├── 04_CourseCurriculum.tsx   # 課程大綱 (Accordion)
│   │   ├── 05_TestimonialsSection.tsx# 學員見證
│   │   ├── 06_TeacherSection.tsx     # 講師介紹
│   │   ├── 07_InstructorExperience.tsx # 講師經歷
│   │   ├── 08_MediaCoverage.tsx      # 媒體報導
│   │   ├── 09_PlansSection.tsx       # 方案比較 (SimplePlanCard)
│   │   └── 10_FAQSection.tsx         # FAQ (Accordion)
│   │
│   ├── general/                      # 通用 AI 頁面元件
│   │   ├── index.ts
│   │   ├── GeneralHeroSection.tsx
│   │   ├── GeneralFeaturesSection.tsx
│   │   ├── GeneralPlansSection.tsx
│   │   └── GeneralComparisonSection.tsx
│   │
│   ├── checkout/                     # 結帳流程元件
│   │   ├── index.ts
│   │   ├── CheckoutContainer.tsx     # 主控制器 (狀態機)
│   │   │
│   │   ├── steps/                    # 5 個步驟元件
│   │   │   ├── index.ts
│   │   │   ├── StepConfirmPlan.tsx   # Step 1: 確認方案
│   │   │   ├── StepBuyerInfo.tsx     # Step 2: 訂購人資訊
│   │   │   ├── StepPayment.tsx       # Step 3: 付款資料
│   │   │   ├── StepStudentData.tsx   # Step 4: 學員資料
│   │   │   └── StepReview.tsx        # Step 5: 確認送出
│   │   │
│   │   ├── forms/                    # 表單元件
│   │   │   ├── FormInput.tsx         # 通用輸入欄位
│   │   │   └── StudentCard.tsx       # 學員卡片
│   │   │
│   │   └── layout/                   # 結帳版面元件
│   │       ├── CheckoutHeader.tsx    # 結帳頁 Header
│   │       ├── StepIndicator.tsx     # 步驟指示器
│   │       ├── OrderSummary.tsx      # 訂單摘要 (Sticky)
│   │       └── MobileCta.tsx         # 手機版 CTA
│   │
│   ├── ui/                           # 可重用 UI 元件
│   │   ├── index.ts
│   │   │
│   │   ├── plans/                    # 方案相關元件
│   │   │   ├── SimplePlanCard.tsx    # 方案卡片
│   │   │   ├── GeneralPlanCard.tsx   # 通用版方案卡片
│   │   │   ├── PlanComparisonTable.tsx # 方案比較表 (Desktop)
│   │   │   ├── PlanComparisonMobile.tsx # 方案比較 (Mobile)
│   │   │   ├── FeatureChecklist.tsx  # 功能清單
│   │   │   ├── PlanTableHeader.tsx   # 表格標題
│   │   │   ├── PlanTableCell.tsx     # 表格儲存格
│   │   │   ├── PlanStickyFooter.tsx  # 方案 Sticky Footer
│   │   │   └── PlanIcons.tsx         # 方案圖示
│   │   │
│   │   ├── buttons/
│   │   │   └── Button.tsx            # 通用按鈕
│   │   │
│   │   ├── navigation/
│   │   │   ├── SegmentedControl.tsx  # 分段控制器
│   │   │   └── UnderlineNav.tsx      # 底線導航
│   │   │
│   │   ├── media/
│   │   │   └── VideoPlayer.tsx       # 影片播放器
│   │   │
│   │   ├── social/
│   │   │   └── SocialContactIcons.tsx # 社群聯絡圖示
│   │   │
│   │   ├── MusicPlayer.tsx           # 背景音樂播放器
│   │   └── CountdownTimer.tsx        # 倒數計時器
│   │
│   ├── layout/                       # 版面元件
│   │   ├── index.ts
│   │   ├── Header/
│   │   │   ├── index.tsx             # 響應式 Header
│   │   │   ├── LaptopHeader.tsx      # 桌面版
│   │   │   └── PhoneHeader.tsx       # 手機版
│   │   └── Footer/
│   │       ├── index.tsx             # 響應式 Footer
│   │       ├── LaptopFooter.tsx      # 桌面版
│   │       └── PhoneFooter.tsx       # 手機版
│   │
│   └── home/                         # 品牌首頁元件
│       ├── index.ts
│       ├── HeroSection.tsx           # Hero 區塊
│       ├── BrandHeader.tsx           # 品牌 Header
│       ├── BrandFooter.tsx           # 品牌 Footer
│       ├── ServicesSection.tsx       # 服務區塊
│       ├── MediaSection.tsx          # 媒體報導
│       ├── PartnersSection.tsx       # 合作夥伴
│       ├── CTASection.tsx            # CTA 區塊
│       └── IndustrySelectModal.tsx   # 產業選擇 Modal
│
├── lib/                              # 工具與商業邏輯
│   │
│   ├── utils.ts                      # 全域工具函式
│   │                                 # - cn(): Tailwind class merge
│   │
│   ├── animations.ts                 # 動畫設定
│   │                                 # - Motion variants
│   │                                 # - Spring 參數
│   │
│   ├── data/                         # 靜態資料
│   │   ├── index.ts                  # Barrel export
│   │   ├── plans.ts                  # 方案定義
│   │   │                             # - PLANS (餐飲版 legacy)
│   │   │                             # - PLANS_V2 (餐飲版 Feature Matrix)
│   │   │                             # - GENERAL_PLANS_V2 (通用版)
│   │   │                             # - FEATURE_CATEGORIES
│   │   │                             # - PLAN_FEATURES
│   │   ├── curriculum.ts             # 課程大綱
│   │   ├── faq.ts                    # FAQ 內容
│   │   ├── legal.ts                  # 法律文件
│   │   └── constants.ts              # 全域常數
│   │                                 # - NAV_ITEMS
│   │                                 # - COURSE_CONFIG
│   │
│   ├── checkout/                     # 結帳邏輯
│   │   ├── index.ts                  # Barrel export
│   │   ├── types.ts                  # 型別定義
│   │   │                             # - PaymentMethod
│   │   │                             # - BuyerInfo
│   │   │                             # - StudentInfo
│   │   │                             # - OrderData
│   │   │                             # - CheckoutState
│   │   ├── schemas.ts                # Zod 驗證 Schema
│   │   │                             # - buyerSchema
│   │   │                             # - studentSchema
│   │   │                             # - paymentSchema
│   │   │                             # - checkoutSchema
│   │   ├── constants.ts              # 結帳常數
│   │   │                             # - CHECKOUT_STEPS
│   │   │                             # - PAYMENT_METHODS
│   │   │                             # - PLAN_PRICES
│   │   │                             # - QUANTITY_LIMITS
│   │   │                             # - GROUP_DISCOUNTS
│   │   └── utils.ts                  # 結帳工具函式
│   │                                 # - calculateTotal()
│   │                                 # - syncStudentsWithQuantity()
│   │                                 # - formatPrice()
│   │                                 # - generateOrderId()
│   │
│   ├── db/                           # 資料庫
│   │   ├── index.ts
│   │   ├── connection.ts             # MongoDB 連線管理
│   │   │                             # - dbConnect()
│   │   │                             # - 連線池快取 (Serverless 優化)
│   │   └── models/
│   │       ├── index.ts
│   │       ├── Order.ts              # 訂單 Schema
│   │       ├── Student.ts            # 學員 Schema
│   │       ├── Contact.ts            # 聯絡表單 Schema
│   │       └── FundraisingConfig.ts  # 募資設定 Schema
│   │
│   ├── email/                        # 郵件服務
│   │   ├── index.ts                  # Resend client
│   │   │                             # - sendOrderConfirmationEmail()
│   │   └── templates.ts              # Email 模板
│   │                                 # - HTML template
│   │                                 # - Plain text template
│   │
│   ├── auth/                         # 驗證
│   │   └── session.ts                # Session 管理
│   │                                 # - createAdminSessionResponse()
│   │                                 # - verifyAdminSession()
│   │
│   ├── hooks/                        # 自訂 React Hooks
│   │   ├── useMediaQuery.ts          # 響應式偵測
│   │   ├── useFundraising.ts         # 募資資料 Hook
│   │   ├── useSmoothScroll.ts        # 平滑滾動
│   │   └── useActiveSection.ts       # Active section 偵測
│   │
│   ├── types/                        # TypeScript 型別
│   │   ├── index.ts                  # 核心型別
│   │   │                             # - PlanV2
│   │   │                             # - FeatureCellValue
│   │   │                             # - DifficultyLevel
│   │   └── fundraising.ts            # 募資型別
│   │
│   └── utils/                        # 額外工具函式
│       └── planUtils.ts              # 方案相關工具
│
├── public/                           # 靜態資源
│   ├── images/                       # 圖片
│   └── audio/                        # 音訊
│
├── docs/                             # 文件
│   ├── ARCHITECTURE.md               # 本文件
│   └── API_REFERENCE.md              # API 文件
│
├── CONTRIBUTING.md                   # 貢獻指南
├── README.md                         # 專案說明
│
└── Configuration Files
    ├── package.json                  # 依賴與腳本
    ├── tsconfig.json                 # TypeScript 設定
    ├── next.config.ts                # Next.js 設定
    ├── tailwind.config.ts            # Tailwind 設定
    ├── postcss.config.js             # PostCSS 設定
    └── .env.local.example            # 環境變數範例
```

---

## 3. Route Groups 策略

### 為什麼使用 Route Groups?

Next.js 的 Route Groups (`(folder)`) 允許在不影響 URL 結構的情況下組織程式碼。本專案使用 Route Groups 達成：

1. **Layout 隔離** - 不同頁面使用不同的 Header/Footer
2. **程式碼組織** - 相關頁面放在一起
3. **效能優化** - 各組的 Layout 獨立載入

### 本專案的 Route Groups

```
app/
├── (brand)/          # 品牌首頁
│   ├── layout.tsx    → BrandHeader + BrandFooter
│   └── page.tsx      → /
│
├── (main)/           # 產品頁面
│   ├── layout.tsx    → Header + Footer + MusicPlayer
│   ├── restaurant/   → /restaurant
│   └── general/      → /general
│
├── checkout/         # 結帳流程 (不使用 Group，獨立 Layout)
│   └── layout.tsx    → 簡化版 Header
│
└── admin/            # 管理後台 (不使用 Group)
    └── layout.tsx    → 無 Header/Footer
```

### Layout 繼承關係

```
RootLayout (app/layout.tsx)
│
├── BrandLayout (app/(brand)/layout.tsx)
│   └── HomePage
│
├── MainLayout (app/(main)/layout.tsx)
│   ├── RestaurantPage
│   └── GeneralPage
│
├── CheckoutLayout (app/checkout/layout.tsx)
│   ├── CheckoutPage
│   └── SuccessPage
│
└── AdminLayout (app/admin/layout.tsx)
    └── AdminPage
```

---

## 4. 核心模組分析

### 4.1 方案資料模組 (`lib/data/plans.ts`)

**職責:** 定義所有方案的資料結構和功能矩陣。

**關鍵資料結構:**

```typescript
// 餐飲版方案 (PLANS_V2)
interface PlanV2 {
  id: string;           // 'basic' | 'accompany' | 'founder'
  title: string;        // 方案名稱
  subtitle: string;     // 副標題
  price: string;        // 價格 (NT$2,400)
  badge?: string;       // 徽章 (推薦)
  suitableFor: string;  // 適合對象
  featureMatrix: Record<string, FeatureCellValue>;  // 功能矩陣
  ctaLink: string;      // CTA 連結
  isRecommended?: boolean;
}

// 功能矩陣值
type FeatureCellValue =
  | boolean                     // true/false
  | { type: 'value'; value: string }   // "1 次/週"
  | { type: 'callout'; text: string }; // 特殊標註
```

**Feature Matrix Pattern:**

```typescript
// 功能定義
PLAN_FEATURES = [
  { id: 'video-access', category: 'content', label: '課程影片觀看' },
  { id: 'live-qa', category: 'community', label: 'Live Q&A' },
  // ...
];

// 方案功能矩陣
featureMatrix: {
  'video-access': true,
  'live-qa': { type: 'value', value: '1 次/週' },
  'founder-support': false,
}
```

**設計決策:** 使用 Feature Matrix 而非硬編碼功能列表，提供：
- 動態產生比較表
- 靈活的功能開關
- 統一的資料來源

### 4.2 結帳模組 (`lib/checkout/`)

**架構:**

```
lib/checkout/
├── index.ts        # Barrel export
├── types.ts        # TypeScript 型別
├── schemas.ts      # Zod 驗證 Schema
├── constants.ts    # 常數與設定
└── utils.ts        # 工具函式
```

**Schema 設計:**

```typescript
// 分層驗證
const buyerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^09\d{8}$/),
  invoiceType: z.enum(['personal', 'company']),
  // 條件驗證
}).refine((data) => {
  if (data.invoiceType === 'company') {
    return data.companyName?.length >= 2;
  }
  return true;
});

// 步驟驗證 Schema
const stepSchemas = {
  1: planSelectionSchema,
  2: z.object({ buyer: buyerSchema }),
  3: paymentSchema,
  4: z.object({ students: studentsArraySchema }),
  5: termsSchema,
};
```

### 4.3 資料庫模組 (`lib/db/`)

**連線管理:**

```typescript
// lib/db/connection.ts
// Serverless 環境下的連線池管理

let cached = global.mongoose;

export async function dbConnect() {
  if (cached?.conn) return cached.conn;

  if (!cached?.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```

**設計考量:**
- 全域快取避免重複連線
- Hot reload 時保持連線
- Vercel Serverless 最佳化

### 4.4 郵件模組 (`lib/email/`)

**架構:**

```typescript
// Lazy initialization 避免建構時錯誤
let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

// 發送訂單確認信
export async function sendOrderConfirmationEmail(order: IOrder) {
  const client = getResendClient();

  await client.emails.send({
    from: 'Nuva <noreply@nuva.ai>',
    to: order.buyer.email,
    subject: `訂單確認 - ${order.orderId}`,
    html: getOrderConfirmationHtml(order),
    text: getOrderConfirmationText(order),
  });
}
```

---

## 5. 資料流程

### 5.1 結帳資料流

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CHECKOUT DATA FLOW                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐             │
│  │   URL Params │ --> │ Server Check │ --> │ Client Form  │             │
│  │ ?planId=xxx  │     │  (page.tsx)  │     │  (Container) │             │
│  └──────────────┘     └──────────────┘     └──────────────┘             │
│                              │                    │                      │
│                              ▼                    ▼                      │
│                       Invalid: Redirect    ┌──────────────┐             │
│                       to home page         │ react-hook-  │             │
│                                            │    form      │             │
│                                            └──────┬───────┘             │
│                                                   │                      │
│                                                   ▼                      │
│                                            ┌──────────────┐             │
│                                            │     Zod      │             │
│                                            │  Validation  │             │
│                                            └──────┬───────┘             │
│                                                   │                      │
│                                           Valid   │   Invalid            │
│                                      ┌────────────┴────────────┐        │
│                                      ▼                         ▼        │
│                               ┌──────────────┐         ┌──────────────┐ │
│                               │  Next Step   │         │ Show Errors  │ │
│                               └──────┬───────┘         └──────────────┘ │
│                                      │                                   │
│                                      │ (Step 5 Submit)                  │
│                                      ▼                                   │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐             │
│  │   MongoDB    │ <-- │   API Route  │ <-- │  Form Data   │             │
│  │    Order     │     │   /submit    │     │              │             │
│  └──────────────┘     └──────┬───────┘     └──────────────┘             │
│                              │                                           │
│                              ▼                                           │
│                       ┌──────────────┐                                   │
│                       │    Resend    │                                   │
│                       │ Email Notify │                                   │
│                       └──────┬───────┘                                   │
│                              │                                           │
│                              ▼                                           │
│                       ┌──────────────┐                                   │
│                       │   Success    │                                   │
│                       │    Page      │                                   │
│                       └──────────────┘                                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 表單狀態管理

**使用 react-hook-form + Zod:**

```typescript
// CheckoutContainer.tsx
const form = useForm<CheckoutFormData>({
  resolver: zodResolver(checkoutSchema),
  defaultValues: DEFAULT_FORM_VALUES,
  mode: 'onChange',  // 即時驗證
});

// 動態學員陣列
const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'students',
});

// 監聽數量變化，同步學員陣列
useEffect(() => {
  syncStudentsWithQuantity(students, quantity, append, remove);
}, [quantity]);
```

---

## 6. 資料模型

### 6.1 訂單 Schema (Order)

```typescript
interface IOrder {
  // 訂單識別
  orderId: string;           // "ORD-ABC123-XYZ"

  // 方案資訊
  planId: string;            // 'basic' | 'accompany' | 'founder' | ...
  planTitle: string;         // "陪跑方案"
  quantity: number;          // 1-50

  // 價格
  unitPrice: number;         // 58000
  totalPrice: number;        // 58000 * quantity - discount
  discountAmount: number;    // 團購折扣金額

  // 訂購人
  buyer: {
    name: string;
    email: string;
    phone: string;           // 09xxxxxxxx
    invoiceType: 'personal' | 'company';
    companyName?: string;
    taxId?: string;          // 8 碼
  };

  // 學員
  students: Array<{
    name: string;
    email: string;
    phone: string;
  }>;

  // 付款
  paymentMethod: 'credit_card' | 'atm';
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
  paymentId?: string;
  paidAt?: Date;
  atmDeadline?: Date;        // ATM +3 天

  // 元資料
  source: 'restaurant' | 'general';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**索引:**

```typescript
// 常用查詢優化
OrderSchema.index({ 'buyer.email': 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ planId: 1, status: 1 });
```

### 6.2 方案價格與折扣

```typescript
// 方案價格
const PLAN_PRICES = {
  free: 0,
  basic: 2400,
  accompany: 58000,
  founder: 210000,
};

// 團購折扣
const GROUP_DISCOUNTS = [
  { minQty: 5,  discountPercent: 5 },   // 5 人以上 5% off
  { minQty: 10, discountPercent: 10 },  // 10 人以上 10% off
  { minQty: 20, discountPercent: 15 },  // 20 人以上 15% off
];

// 數量限制
const QUANTITY_LIMITS = {
  min: 1,
  max: 50,
  founderMax: 15,  // 領航方案限量 15 位
};
```

---

## 7. 結帳流程架構

### 7.1 五步驟結帳

```
Step 1: 確認方案 (StepConfirmPlan)
├── 顯示選擇的方案
├── 數量選擇器
└── 計算金額預覽

Step 2: 訂購人資訊 (StepBuyerInfo)
├── 姓名、Email、電話
├── 發票類型 (個人/公司)
└── 公司名稱、統編 (條件顯示)

Step 3: 付款方式 (StepPayment)
├── 信用卡 / ATM 選擇
└── 信用卡資訊 (條件顯示)
    ├── 卡號 (16-19 碼)
    ├── 到期日 (MM/YY)
    ├── CVC (3-4 碼)
    └── 持卡人姓名

Step 4: 學員資料 (StepStudentData)
├── 動態學員陣列 (根據數量)
├── 每位學員: 姓名、Email、電話
└── 數量減少時的確認對話框

Step 5: 確認送出 (StepReview)
├── 訂單摘要
├── 所有資料預覽
├── 服務條款同意
└── 送出按鈕
```

### 7.2 CheckoutContainer 狀態機

```typescript
// 狀態
const [currentStep, setCurrentStep] = useState(1);
const [completedSteps, setCompletedSteps] = useState<number[]>([]);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);

// 步驟導航
const goToStep = async (step: number) => {
  // 只能前往已完成或當前的下一步
  if (step <= Math.max(...completedSteps, currentStep) + 1) {
    // 驗證當前步驟
    const isValid = await validateCurrentStep();
    if (isValid || step < currentStep) {
      setCurrentStep(step);
    }
  }
};

// 步驟驗證
const validateCurrentStep = async () => {
  const fields = getStepFields(currentStep);
  const result = await form.trigger(fields);
  if (result) {
    setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
  }
  return result;
};
```

---

## 8. 驗證系統

### 8.1 表單驗證 (Zod)

**驗證規則:**

| 欄位 | 規則 | 錯誤訊息 |
|------|------|----------|
| 姓名 | min(2) | 請輸入姓名（至少 2 字） |
| Email | email() | 請輸入有效的 Email |
| 電話 | /^09\d{8}$/ | 請輸入有效的手機號碼（09 開頭，共 10 碼） |
| 統編 | /^\d{8}$/ | 統編須為 8 碼數字 |
| 卡號 | min(16).max(19) | 請輸入 16 碼卡號 |
| 到期日 | /^(0[1-9]|1[0-2])\/\d{2}$/ | 請輸入有效的到期日 (MM/YY) |
| CVC | min(3).max(4) | 請輸入 3-4 碼安全碼 |

### 8.2 Admin 驗證

**Session-based 驗證流程:**

```
1. POST /api/admin/login
   ├── 驗證密碼 (ADMIN_PASSWORD)
   ├── 產生 session token
   └── 設定 HttpOnly cookie

2. GET /api/admin/check
   ├── 讀取 cookie
   └── 驗證 session

3. POST /api/admin/logout
   └── 清除 cookie
```

**實作:**

```typescript
// lib/auth/session.ts
export function createAdminSessionResponse() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day
  });
  return response;
}

export function verifyAdminSession(request: Request): boolean {
  const cookie = request.headers.get('cookie');
  return cookie?.includes(`admin_session=${SESSION_SECRET}`) ?? false;
}
```

---

## 9. 技術決策記錄 (ADR)

### ADR-001: 使用 Next.js App Router

**狀態:** 採用

**背景:** 專案需要 SEO 友善的頁面 + 豐富的互動體驗。

**決策:** 採用 Next.js 16 App Router。

**理由:**
- Server Components 減少 Client JS bundle
- 更好的 SEO (Server-side rendering)
- Route Groups 支援複雜的 Layout 需求
- 內建 API Routes

### ADR-002: 表單驗證使用 Zod + react-hook-form

**狀態:** 採用

**背景:** 結帳流程需要複雜的條件驗證。

**決策:** react-hook-form + Zod + @hookform/resolvers

**理由:**
- Zod 提供 TypeScript-first schema 定義
- 從 schema 自動推導型別
- 支援 refine() 條件驗證
- react-hook-form 效能優異

### ADR-003: MongoDB 作為資料庫

**狀態:** 採用

**背景:** 訂單結構靈活，需要支援嵌套文件。

**決策:** MongoDB Atlas + Mongoose ODM

**理由:**
- Document-based 結構適合訂單資料
- Mongoose 提供 schema validation
- MongoDB Atlas 提供 Serverless 友善的連線
- 免費額度足夠初期使用

### ADR-004: 使用 React Compiler

**狀態:** 採用

**背景:** React 19 的新編譯器可自動 memoization。

**決策:** 啟用 `experimental.reactCompiler`

**理由:**
- 自動優化，減少手動 useMemo/useCallback
- 效能提升
- 向後兼容

---

## 10. 模組依賴圖

### 10.1 核心依賴關係

```
                            ┌───────────────────┐
                            │   app/checkout    │
                            │     page.tsx      │
                            └─────────┬─────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
        ┌───────────────────┐ ┌───────────────┐ ┌───────────────┐
        │   lib/data/plans  │ │  components/  │ │ lib/checkout/ │
        │                   │ │   checkout/   │ │   schemas     │
        └───────────────────┘ │  Container    │ └───────┬───────┘
                              └───────┬───────┘         │
                                      │                 │
                    ┌─────────────────┼─────────────────┤
                    │                 │                 │
                    ▼                 ▼                 ▼
        ┌───────────────────┐ ┌───────────────┐ ┌───────────────┐
        │   components/     │ │ lib/checkout/ │ │ lib/checkout/ │
        │ checkout/steps/*  │ │   constants   │ │    types      │
        └───────────────────┘ └───────────────┘ └───────────────┘
```

### 10.2 引用次數統計

| 模組 | 被引用次數 | 說明 |
|------|------------|------|
| `@/lib/utils` (cn) | 32+ | 最常用的 utility |
| `@/lib/checkout/schemas` | 8 | 結帳驗證核心 |
| `@/lib/checkout/constants` | 6 | 結帳常數 |
| `@/lib/types` | 9 | 型別定義 |
| `motion/react` | 15+ | 動畫庫 |

---

## 11. 效能優化

### 11.1 Next.js 配置優化

```typescript
// next.config.ts
const nextConfig = {
  // React Compiler 自動 memoization
  experimental: {
    reactCompiler: true,
  },

  // Mongoose 移到 server bundle 避免問題
  serverExternalPackages: ['mongoose'],

  // Turbopack 快速開發
  turbopack: {},

  // 圖片優化
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};
```

### 11.2 Serverless 優化

```typescript
// MongoDB 連線池
// 使用全域快取避免每次請求重新連線
let cached = global.mongoose;

// Resend 延遲初始化
// 避免 build time 讀取環境變數失敗
let resendClient: Resend | null = null;
```

### 11.3 Bundle 優化

- 使用 dynamic import 延遲載入大型元件
- Tree-shaking 移除未使用程式碼
- CSSnano 壓縮 CSS

---

## 結語

本架構設計著重於：

1. **模組化** - 清晰的職責分離
2. **型別安全** - TypeScript + Zod 全面覆蓋
3. **可維護性** - 統一的資料來源和設計模式
4. **效能** - Serverless 優化和自動 memoization
5. **擴展性** - Feature Matrix 模式支援靈活的功能配置

如有架構相關問題，請參考 [CONTRIBUTING.md](../CONTRIBUTING.md) 或聯繫開發團隊。
]]>