# Git 工作流程

本文件說明專案的 Git 分支策略和工作流程。

---

## 分支策略

```
main (production)
├── develop (staging)
│   ├── feature/xxx
│   ├── fix/xxx
│   └── refactor/xxx
```

### 分支類型

| 分支類型 | 命名 | 說明 |
|----------|------|------|
| feature | `feature/add-payment-method` | 新功能 |
| fix | `fix/checkout-validation` | Bug 修復 |
| refactor | `refactor/checkout-module` | 重構 |
| docs | `docs/update-readme` | 文件更新 |

---

## 工作流程

### 1. 建立分支

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

### 2. 開發

```bash
# 開發中...
git add .
git commit -m "feat: add new feature"
```

### 3. Push

```bash
git push origin feature/my-feature
```

### 4. 建立 PR

在 GitHub 建立 Pull Request，目標分支為 `develop`。

### 5. Review

等待 code review 通過後 merge。

---

## Commit 規範

使用 [Conventional Commits](https://www.conventionalcommits.org/) 規範。

### 格式

```
<type>(<scope>): <description>

[optional body]
```

### Type

| Type | 說明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修復 |
| `docs` | 文件更新 |
| `style` | 程式碼格式 |
| `refactor` | 重構 |
| `perf` | 效能優化 |
| `test` | 測試 |
| `chore` | 建構/工具 |

### Scope

常用 scope: `checkout`, `admin`, `ui`, `api`, `db`, `auth`

### 範例

```bash
# 新功能
git commit -m "feat(checkout): add group discount calculation"

# Bug 修復
git commit -m "fix(form): prevent double submission"

# 重構
git commit -m "refactor(checkout): split payment form"

# 文件
git commit -m "docs: add API documentation"
```

---

## PR 規範

### 標題

遵循 Commit 規範格式：

```
feat(checkout): add multi-step form navigation
```

### 描述

```markdown
## 變更說明

簡述此 PR 的目的和變更內容。

## 變更類型

- [ ] 新功能 (feat)
- [ ] Bug 修復 (fix)
- [ ] 重構 (refactor)

## Checklist

- [ ] 程式碼符合規範
- [ ] 已自我 review
- [ ] 測試通過
```

### Review 流程

1. 至少 1 位 reviewer approve
2. 所有 CI checks 通過
3. 解決所有 comments
4. Squash merge 到 develop
