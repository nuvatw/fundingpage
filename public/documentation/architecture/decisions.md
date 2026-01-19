# 技術決策記錄 (ADR)

本文件記錄專案中的重要技術決策及其理由。

---

## ADR-001: 使用 Next.js App Router

**狀態**: ✅ 採用

**背景**:
專案需要 SEO 友善的頁面 + 豐富的互動體驗。

**決策**:
採用 Next.js 16 App Router。

**理由**:
- Server Components 減少 Client JS bundle
- 更好的 SEO (Server-side rendering)
- Route Groups 支援複雜的 Layout 需求
- 內建 API Routes，無需額外後端

**影響**:
- 需要學習 Server/Client Components 的概念
- 某些 npm 套件可能不支援 Server Components

---

## ADR-002: 表單驗證使用 Zod + react-hook-form

**狀態**: ✅ 採用

**背景**:
結帳流程需要複雜的條件驗證（例如：公司發票需要統編）。

**決策**:
使用 react-hook-form + Zod + @hookform/resolvers

**理由**:
- Zod 提供 TypeScript-first schema 定義
- 從 schema 自動推導型別
- 支援 `.refine()` 條件驗證
- react-hook-form 效能優異（非受控元件）

**替代方案**:
- Formik + Yup: 效能較差，較冗長
- 原生 useState: 難以管理複雜表單

---

## ADR-003: MongoDB 作為資料庫

**狀態**: ✅ 採用

**背景**:
訂單結構靈活，包含嵌套的學員資料。

**決策**:
MongoDB Atlas + Mongoose ODM

**理由**:
- Document-based 結構適合訂單資料
- Mongoose 提供 schema validation
- MongoDB Atlas 提供 Serverless 友善的連線
- 免費額度足夠初期使用

**替代方案**:
- PostgreSQL + Prisma: 需要更多關聯表設計
- Supabase: 功能過多，增加複雜度

---

## ADR-004: 使用 React Compiler

**狀態**: ✅ 採用

**背景**:
React 19 的新編譯器可自動 memoization。

**決策**:
啟用 `experimental.reactCompiler`

**理由**:
- 自動優化，減少手動 useMemo/useCallback
- 效能提升
- 向後兼容現有程式碼

**風險**:
- 仍為實驗性功能，可能有 bug
- 若遇問題可輕易關閉

---

## ADR-005: 使用 Resend 而非 Nodemailer

**狀態**: ✅ 採用

**背景**:
需要發送訂單確認信。

**決策**:
使用 Resend API 而非 Nodemailer + SMTP

**理由**:
- API-based，無需管理 SMTP 連線
- 更好的 deliverability
- 內建分析功能
- Vercel Serverless 友善

**替代方案**:
- Nodemailer + Gmail SMTP: 可能被封鎖
- SendGrid: 功能較複雜

---

## ADR-006: Feature Matrix 模式

**狀態**: ✅ 採用

**背景**:
方案比較表需要動態顯示功能對比。

**決策**:
使用 Feature Matrix 資料結構：

```typescript
featureMatrix: {
  'video-access': true,
  'live-qa': { type: 'value', value: '1 次/週' },
}
```

**理由**:
- 功能定義與方案分離
- 易於動態產生比較表
- 易於新增/修改功能
- 型別安全

**替代方案**:
- 硬編碼功能列表: 難以維護
- 純 JSON 設定: 缺少型別檢查

---

## ADR-007: 不使用全域狀態管理

**狀態**: ✅ 採用

**背景**:
評估是否需要 Redux/Zustand 等全域狀態管理。

**決策**:
不使用全域狀態管理，僅用 React 內建工具。

**理由**:
- 結帳表單使用 react-hook-form 管理
- 其他狀態較簡單，useState 足夠
- 減少 bundle size
- 減少學習曲線

**何時重新評估**:
- 如需跨頁面共享複雜狀態
- 如需時間旅行除錯功能

---

## 決策索引

| ADR | 主題 | 狀態 |
|-----|------|------|
| 001 | Next.js App Router | ✅ 採用 |
| 002 | Zod + react-hook-form | ✅ 採用 |
| 003 | MongoDB | ✅ 採用 |
| 004 | React Compiler | ✅ 採用 |
| 005 | Resend Email | ✅ 採用 |
| 006 | Feature Matrix | ✅ 採用 |
| 007 | 無全域狀態管理 | ✅ 採用 |
