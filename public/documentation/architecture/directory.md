# 目錄結構詳解

本文件詳細說明專案的目錄結構與各檔案的職責。

---

## 完整目錄樹

```
nuva-general-funding-page/
│
├── app/                              # Next.js App Router
│   │
│   ├── layout.tsx                    # 根 Layout
│   ├── globals.css                   # 全域樣式
│   │
│   ├── (brand)/                      # Route Group: 品牌首頁
│   │   ├── layout.tsx                # 品牌專屬 Layout
│   │   └── page.tsx                  # 首頁
│   │
│   ├── (main)/                       # Route Group: 產品頁面
│   │   ├── layout.tsx                # 共用 Layout (Header + Footer)
│   │   ├── restaurant/
│   │   │   └── page.tsx              # 餐飲 AI 方案頁
│   │   └── general/
│   │       └── page.tsx              # 通用 AI 方案頁
│   │
│   ├── checkout/                     # 結帳流程
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # 結帳頁 (Server Component)
│   │   └── success/
│   │       └── page.tsx              # 成功頁面
│   │
│   ├── admin/                        # 管理後台
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Admin Dashboard
│   │
│   └── api/                          # API Routes
│       ├── checkout/submit/route.ts  # 訂單提交
│       ├── admin/                    # Admin API
│       │   ├── login/route.ts
│       │   ├── check/route.ts
│       │   ├── logout/route.ts
│       │   ├── orders/route.ts
│       │   └── contacts/route.ts
│       ├── contact/route.ts          # 聯絡表單
│       └── fundraising/route.ts      # 募資設定
│
├── components/                       # React 元件
│   │
│   ├── sections/                     # Landing Page 區塊
│   │   ├── 01_HeroSection.tsx
│   │   ├── 02_TrustLogos.tsx
│   │   ├── 03_ComparisonSection.tsx
│   │   ├── 04_CourseCurriculum.tsx
│   │   ├── 05_TestimonialsSection.tsx
│   │   ├── 06_TeacherSection.tsx
│   │   ├── 07_InstructorExperience.tsx
│   │   ├── 08_MediaCoverage.tsx
│   │   ├── 09_PlansSection.tsx
│   │   └── 10_FAQSection.tsx
│   │
│   ├── general/                      # 通用 AI 頁面元件
│   │   ├── GeneralHeroSection.tsx
│   │   ├── GeneralFeaturesSection.tsx
│   │   ├── GeneralPlansSection.tsx
│   │   └── GeneralComparisonSection.tsx
│   │
│   ├── checkout/                     # 結帳流程元件
│   │   ├── CheckoutContainer.tsx     # 主控制器
│   │   ├── steps/                    # 5 個步驟元件
│   │   ├── forms/                    # 表單元件
│   │   └── layout/                   # 版面元件
│   │
│   ├── ui/                           # 可重用 UI 元件
│   │   ├── plans/                    # 方案元件
│   │   ├── buttons/
│   │   ├── navigation/
│   │   └── media/
│   │
│   ├── layout/                       # Header / Footer
│   │   ├── Header/
│   │   └── Footer/
│   │
│   └── home/                         # 品牌首頁元件
│
├── lib/                              # 工具與商業邏輯
│   │
│   ├── utils.ts                      # 全域工具 (cn)
│   ├── animations.ts                 # 動畫設定
│   │
│   ├── data/                         # 靜態資料
│   │   ├── plans.ts                  # 方案定義
│   │   ├── curriculum.ts             # 課程大綱
│   │   ├── faq.ts                    # FAQ
│   │   └── constants.ts              # 全域常數
│   │
│   ├── checkout/                     # 結帳邏輯
│   │   ├── types.ts                  # 型別定義
│   │   ├── schemas.ts                # Zod 驗證
│   │   ├── constants.ts              # 結帳常數
│   │   └── utils.ts                  # 工具函式
│   │
│   ├── db/                           # 資料庫
│   │   ├── connection.ts             # MongoDB 連線
│   │   └── models/                   # Mongoose 模型
│   │       ├── Order.ts
│   │       ├── Contact.ts
│   │       └── FundraisingConfig.ts
│   │
│   ├── email/                        # 郵件服務
│   │   ├── index.ts                  # Resend client
│   │   └── templates.ts              # Email 模板
│   │
│   ├── auth/                         # 驗證
│   │   └── session.ts                # Session 管理
│   │
│   ├── hooks/                        # 自訂 Hooks
│   │   ├── useMediaQuery.ts
│   │   ├── useFundraising.ts
│   │   └── useSmoothScroll.ts
│   │
│   └── types/                        # TypeScript 型別
│       └── index.ts
│
├── public/                           # 靜態資源
│   ├── images/
│   └── audio/
│
└── Configuration Files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    └── .env.local.example
```

---

## 關鍵檔案說明

### App 層

| 檔案 | 職責 |
|------|------|
| `app/layout.tsx` | 根 Layout，設定 HTML 和字型 |
| `app/checkout/page.tsx` | 結帳頁 (Server Component)，驗證 URL 參數 |
| `app/admin/page.tsx` | Admin Dashboard，密碼保護 |
| `app/api/checkout/submit/route.ts` | 訂單提交 API |

### Components 層

| 目錄 | 職責 |
|------|------|
| `components/sections/` | 餐飲版 10 個行銷區塊 |
| `components/checkout/` | 結帳流程 UI 系統 |
| `components/ui/plans/` | 方案卡片、比較表 |
| `components/layout/` | 響應式 Header/Footer |

### Lib 層

| 目錄 | 職責 |
|------|------|
| `lib/data/` | 方案、課綱、FAQ 等靜態資料 |
| `lib/checkout/` | 結帳驗證、常數、型別 |
| `lib/db/` | MongoDB 連線與模型 |
| `lib/email/` | Resend 郵件服務 |
