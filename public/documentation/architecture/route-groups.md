# Route Groups 策略

本文件說明專案使用 Next.js Route Groups 的策略與設計考量。

---

## 什麼是 Route Groups?

Next.js 的 Route Groups 使用 `(folder)` 語法，允許在**不影響 URL 結構**的情況下組織程式碼。

```
app/
├── (brand)/        # Route Group - 不會出現在 URL
│   └── page.tsx    # 對應 URL: /
├── (main)/
│   └── restaurant/
│       └── page.tsx  # 對應 URL: /restaurant
```

---

## 本專案的 Route Groups

### 結構

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
├── checkout/         # 結帳流程 (不使用 Group)
│   └── layout.tsx    → 簡化版 Header
│
└── admin/            # 管理後台 (不使用 Group)
    └── layout.tsx    → 無 Header/Footer
```

### 使用原因

| Route Group | 使用原因 |
|-------------|----------|
| `(brand)` | 品牌首頁需要獨特的 Header/Footer 設計 |
| `(main)` | 餐飲和通用頁面共用相同的 Layout |
| checkout | 結帳流程需要簡化的 UI，專注於轉換 |
| admin | 管理後台完全獨立，不需要行銷 UI |

---

## Layout 繼承關係

```
RootLayout (app/layout.tsx)
│  - HTML lang="zh-TW"
│  - Noto Sans TC 字型
│  - globals.css
│
├── BrandLayout (app/(brand)/layout.tsx)
│   │  - BrandHeader
│   │  - BrandFooter
│   └── HomePage
│
├── MainLayout (app/(main)/layout.tsx)
│   │  - Header
│   │  - Footer
│   │  - MusicPlayer
│   ├── RestaurantPage
│   └── GeneralPage
│
├── CheckoutLayout (app/checkout/layout.tsx)
│   │  - 簡化 Header (只有 Logo)
│   ├── CheckoutPage
│   └── SuccessPage
│
└── AdminLayout (app/admin/layout.tsx)
    │  - 無 Header/Footer
    └── AdminPage
```

---

## 設計考量

### 1. Layout 隔離

不同頁面需要不同的 Layout：

- **品牌首頁**: 大型 Hero、品牌色彩強烈
- **產品頁面**: 標準 Header/Footer + 背景音樂
- **結帳頁面**: 簡化 UI，減少干擾
- **管理後台**: 純功能性，無行銷元素

### 2. 程式碼組織

相關頁面放在一起，提高可維護性：

```
(main)/
├── layout.tsx       # 共用 Layout
├── restaurant/      # 餐飲相關
└── general/         # 通用相關
```

### 3. 效能優化

各 Group 的 Layout 獨立載入，減少不必要的 JS bundle。

---

## 何時不使用 Route Groups

以下情況不使用 Route Groups：

1. **checkout/** - 需要獨特的 URL (`/checkout`)
2. **admin/** - 完全獨立的功能區域
3. **api/** - API Routes 不需要 Layout

---

## 相關連結

- [Next.js Route Groups 文件](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
