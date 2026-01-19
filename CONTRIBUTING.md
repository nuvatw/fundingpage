<![CDATA[# 貢獻指南 (Contributing Guide)

感謝您有興趣為 Nuva General Funding Page 做出貢獻！本文件將指導您如何設定開發環境、遵循程式碼規範，以及提交變更。

---

## 目錄

- [開發環境設定](#開發環境設定)
- [專案結構](#專案結構)
- [程式碼風格](#程式碼風格)
- [Git 工作流程](#git-工作流程)
- [Commit 規範](#commit-規範)
- [Pull Request 規範](#pull-request-規範)
- [測試](#測試)
- [常見問題](#常見問題)

---

## 開發環境設定

### 環境需求

- **Node.js**: 20.0.0 或更高版本
- **套件管理器**: npm / pnpm / yarn
- **編輯器**: 推薦 VSCode
- **資料庫**: MongoDB Atlas 帳號或本地 MongoDB

### 安裝步驟

```bash
# 1. Fork 並克隆專案
git clone https://github.com/YOUR_USERNAME/nuva-general-funding-page.git
cd nuva-general-funding-page

# 2. 安裝依賴
npm install

# 3. 複製環境變數範例
cp .env.local.example .env.local

# 4. 編輯 .env.local 填入必要值
# MONGODB_URI=...
# ADMIN_PASSWORD=...
# SESSION_SECRET=...

# 5. 啟動開發伺服器
npm run dev
```

### 推薦 VSCode 擴充套件

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## 專案結構

```
├── app/                # Next.js App Router
├── components/         # React 元件
├── lib/               # 工具與商業邏輯
├── public/            # 靜態資源
└── docs/              # 文件
```

詳細結構請參考 [ARCHITECTURE.md](docs/ARCHITECTURE.md)。

---

## 程式碼風格

### TypeScript

- 使用 TypeScript 撰寫所有程式碼
- 避免使用 `any` 型別
- 為函式參數和回傳值定義型別
- 使用 `interface` 而非 `type` (除非需要 union types)

```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad
function getUser(id: any): any {
  // ...
}
```

### React 元件

- 使用函式元件 (Function Components)
- 使用 named exports
- 元件檔案使用 PascalCase 命名
- 將型別定義放在元件上方

```typescript
// ✅ Good - components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button className={cn('btn', `btn-${variant}`)} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Tailwind CSS

- 使用 `cn()` utility 合併 class names
- 遵循 mobile-first 原則
- 避免過長的 className，必要時提取為元件

```typescript
// ✅ Good
<div className={cn(
  'flex items-center gap-4',
  'p-4 rounded-lg bg-white',
  isActive && 'ring-2 ring-primary-500'
)}>

// ❌ Bad - 太長且難以閱讀
<div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200">
```

### 檔案命名

| 類型 | 命名方式 | 範例 |
|------|----------|------|
| 元件 | PascalCase | `Button.tsx`, `UserCard.tsx` |
| 工具函式 | camelCase | `formatPrice.ts`, `calculateTotal.ts` |
| 常數 | SCREAMING_SNAKE_CASE | `API_BASE_URL`, `MAX_QUANTITY` |
| 型別 | PascalCase | `UserInfo`, `OrderData` |
| Hook | camelCase + use 前綴 | `useAuth.ts`, `useFundraising.ts` |

### Import 順序

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. 第三方套件
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';

// 3. 專案內部 (使用 @ alias)
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { UserInfo } from '@/lib/types';

// 4. 相對路徑 (同層或子層)
import { FormInput } from './FormInput';
```

---

## Git 工作流程

### 分支策略

```
main (production)
├── develop (staging)
│   ├── feature/xxx
│   ├── fix/xxx
│   └── refactor/xxx
```

| 分支類型 | 命名 | 說明 |
|----------|------|------|
| feature | `feature/add-payment-method` | 新功能 |
| fix | `fix/checkout-validation` | Bug 修復 |
| refactor | `refactor/checkout-module` | 重構 |
| docs | `docs/update-readme` | 文件更新 |

### 工作流程

```bash
# 1. 建立新分支
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. 開發並 commit
git add .
git commit -m "feat: add new feature"

# 3. Push 並建立 PR
git push origin feature/my-feature
# 在 GitHub 建立 Pull Request
```

---

## Commit 規範

使用 [Conventional Commits](https://www.conventionalcommits.org/) 規範。

### 格式

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type

| Type | 說明 | 範例 |
|------|------|------|
| `feat` | 新功能 | `feat(checkout): add ATM payment method` |
| `fix` | Bug 修復 | `fix(form): validate phone number format` |
| `docs` | 文件更新 | `docs: update API reference` |
| `style` | 程式碼格式 (不影響功能) | `style: format with prettier` |
| `refactor` | 重構 | `refactor(checkout): extract form validation` |
| `perf` | 效能優化 | `perf: lazy load heavy components` |
| `test` | 測試 | `test: add checkout validation tests` |
| `chore` | 建構/工具 | `chore: update dependencies` |

### Scope (選填)

常用 scope:

- `checkout` - 結帳流程
- `admin` - 管理後台
- `ui` - UI 元件
- `api` - API 路由
- `db` - 資料庫
- `auth` - 驗證

### 範例

```bash
# 新功能
git commit -m "feat(checkout): add group discount calculation"

# Bug 修復
git commit -m "fix(form): prevent double submission on slow network"

# 重構
git commit -m "refactor(checkout): split payment form into components"

# 文件
git commit -m "docs: add API endpoint documentation"
```

---

## Pull Request 規範

### PR 標題

遵循 Commit 規範格式：

```
feat(checkout): add multi-step form navigation
```

### PR 描述模板

```markdown
## 變更說明

簡述此 PR 的目的和變更內容。

## 變更類型

- [ ] 新功能 (feat)
- [ ] Bug 修復 (fix)
- [ ] 重構 (refactor)
- [ ] 文件 (docs)
- [ ] 其他

## 影響範圍

- [ ] 結帳流程
- [ ] 管理後台
- [ ] API
- [ ] UI 元件
- [ ] 其他

## 測試

描述如何測試這些變更。

## 截圖 (如適用)

附上 UI 變更的截圖。

## Checklist

- [ ] 程式碼符合專案風格規範
- [ ] 已自我 review 程式碼
- [ ] 已新增必要的文件
- [ ] 相關測試已通過
```

### Review 流程

1. 至少需要 1 位 reviewer approve
2. 所有 CI checks 必須通過
3. 解決所有 review comments
4. Squash merge 到 develop

---

## 測試

### 執行測試

```bash
# 執行所有測試
npm test

# 監聽模式
npm test -- --watch

# 覆蓋率報告
npm test -- --coverage
```

### 測試規範

- 測試檔案放在 `__tests__` 目錄或使用 `.test.ts` 後綴
- 每個元件/函式應有對應的測試
- 使用 describe/it 組織測試

```typescript
// Example: lib/checkout/__tests__/utils.test.ts
describe('calculateTotal', () => {
  it('should calculate total without discount', () => {
    const result = calculateTotal(plan, 1);
    expect(result.total).toBe(58000);
  });

  it('should apply group discount for 5+ quantity', () => {
    const result = calculateTotal(plan, 5);
    expect(result.discount).toBe(0.05);
  });
});
```

---

## 常見問題

### Q: MongoDB 連線錯誤

確認 `.env.local` 中的 `MONGODB_URI` 正確，且 IP 已加入 MongoDB Atlas 白名單。

### Q: TypeScript 型別錯誤

```bash
# 重新生成型別
npm run build
```

### Q: Tailwind 樣式沒有生效

確認：
1. 檔案路徑在 `tailwind.config.ts` 的 content 設定中
2. 類名拼寫正確
3. 重啟開發伺服器

### Q: Hot reload 不正常

```bash
# 清除快取
rm -rf .next
npm run dev
```

---

## 聯絡方式

如有任何問題，請透過以下方式聯繫：

- GitHub Issues
- Email: dev@nuva.ai

感謝您的貢獻！
]]>