# 貢獻指南

感謝您有興趣為專案做出貢獻！本指南將幫助您了解如何參與開發。

---

## 前置要求

在開始之前，請確保您已具備：

- **Node.js** 20.0.0 或更高版本
- **Git** 版本控制基礎知識
- **MongoDB Atlas** 帳號（或本地 MongoDB）
- **TypeScript** 和 **React** 基礎知識
- **Next.js App Router** 概念理解

---

## 開發環境設定

### 1. Fork 專案

在 GitHub 上 fork 專案到你的帳號，這將建立一份專案的副本。

### 2. 克隆你的 Fork

```bash
git clone https://github.com/YOUR_USERNAME/nuva-general-funding-page.git
cd nuva-general-funding-page
```

### 3. 設定上游遠端

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/nuva-general-funding-page.git
git fetch upstream
```

### 4. 安裝依賴

```bash
npm install
```

### 5. 設定環境變數

```bash
cp .env.local.example .env.local
```

編輯 `.env.local` 填入必要的值：

```bash
MONGODB_URI=mongodb+srv://...
ADMIN_PASSWORD=your-dev-password
SESSION_SECRET=your-session-secret-at-least-32-chars
```

### 6. 啟動開發伺服器

```bash
npm run dev
```

開啟 http://localhost:3000 確認專案正常運作。

---

## 同步上游更新

在開始新功能前，請先同步最新的程式碼：

```bash
git fetch upstream
git checkout develop
git merge upstream/develop
```

---

## 開發流程

### 1. 從 develop 建立功能分支

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/my-feature
```

### 2. 進行開發

遵循 [程式碼規範](code-style.md)，確保：

- 使用 TypeScript 型別
- 遵循 ESLint 規則
- 保持程式碼簡潔易讀
- 避免使用 `any` 型別

### 3. 執行檢查

```bash
# ESLint 檢查
npm run lint

# TypeScript 型別檢查
npx tsc --noEmit

# 建構測試
npm run build
```

### 4. Commit 你的變更

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

```bash
# 新功能
git commit -m "feat(checkout): add group discount calculation"

# Bug 修復
git commit -m "fix(form): prevent double submission"

# 重構
git commit -m "refactor(api): simplify error handling"

# 文件
git commit -m "docs: update API documentation"
```

### 5. Push 到你的 Fork

```bash
git push origin feature/my-feature
```

### 6. 建立 Pull Request

1. 前往你的 GitHub Fork 頁面
2. 點擊 "Compare & pull request"
3. 選擇 base: `develop` ← compare: `feature/my-feature`
4. 填寫 PR 描述（見下方模板）
5. 提交 PR

---

## PR 描述模板

```markdown
## 變更說明

簡述此 PR 的目的和變更內容。

## 變更類型

- [ ] 新功能 (feat)
- [ ] Bug 修復 (fix)
- [ ] 重構 (refactor)
- [ ] 樣式調整 (style)
- [ ] 文件更新 (docs)
- [ ] 效能優化 (perf)

## 相關 Issue

Closes #123

## 測試方式

說明如何測試這些變更。

## 截圖（如適用）

UI 變更請附上截圖。

## Checklist

- [ ] 程式碼符合專案風格規範
- [ ] 已自我 review 程式碼
- [ ] 已更新相關文件
- [ ] 建構成功 (`npm run build`)
- [ ] ESLint 通過 (`npm run lint`)
```

---

## Code Review 流程

### 提交 PR 後

1. 自動執行 CI 檢查
2. 等待至少 1 位 reviewer 審核
3. 回應並解決所有 review comments
4. 所有檢查通過後，maintainer 會 merge

### Review 重點

Reviewer 會檢查：

- 程式碼品質和可讀性
- 是否符合專案架構
- 安全性考量
- 效能影響
- 測試覆蓋

### 修改後重新 Push

```bash
# 修改後
git add .
git commit -m "fix: address review feedback"
git push origin feature/my-feature
```

---

## 分支策略

| 分支 | 說明 |
|------|------|
| `main` | 正式環境，穩定版本 |
| `develop` | 開發環境，整合新功能 |
| `feature/*` | 新功能開發 |
| `fix/*` | Bug 修復 |
| `refactor/*` | 程式碼重構 |

---

## 開發注意事項

### Server Components vs Client Components

```typescript
// Server Component (預設)
// - 可以直接存取資料庫
// - 不能使用 hooks 或瀏覽器 API
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component
// - 需要 'use client' 指令
// - 可以使用 hooks 和互動性
'use client';
export function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState(...)}>...</button>;
}
```

### 表單開發

使用 react-hook-form + Zod：

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mySchema } from '@/lib/schemas';

const form = useForm({
  resolver: zodResolver(mySchema),
  defaultValues: { ... },
});
```

### 樣式開發

使用 Tailwind CSS + cn() 工具：

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'flex items-center gap-4',
  'p-4 rounded-lg',
  isActive && 'bg-primary-500'
)}>
```

---

## 回報問題

### Bug 回報

請提供：

1. **問題描述** - 清楚說明問題是什麼
2. **重現步驟** - 逐步說明如何重現問題
3. **預期行為** - 預期應該發生什麼
4. **實際行為** - 實際發生了什麼
5. **環境資訊** - 瀏覽器、Node.js 版本等
6. **截圖或錯誤訊息** - 如果有的話

### 功能建議

請說明：

1. **功能描述** - 想要什麼功能
2. **使用情境** - 為什麼需要這個功能
3. **建議的解決方案** - 你認為可以怎麼實作
4. **替代方案** - 有考慮過其他方式嗎

---

## 常見問題

### MongoDB 連線失敗

1. 確認 `MONGODB_URI` 格式正確
2. 確認 IP 已加入 MongoDB Atlas 白名單
3. 確認帳號密碼正確

### ESLint 錯誤

```bash
# 自動修復可修復的問題
npm run lint -- --fix
```

### 建構失敗

```bash
# 清除快取重試
rm -rf .next
npm run build
```

---

## 聯絡方式

- **GitHub Issues** - 問題回報和功能建議
- **Email** - dev@nuva.ai

---

## 致謝

感謝所有貢獻者的付出！每一個 PR 都讓專案變得更好。
