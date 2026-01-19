# 程式碼規範

本文件說明專案的程式碼風格規範。

---

## TypeScript

### 型別定義

```typescript
// ✅ Good - 使用 interface
interface UserProps {
  name: string;
  email: string;
}

// ✅ Good - 使用 type 於 union types
type Status = 'pending' | 'paid' | 'failed';

// ❌ Bad - 避免 any
function getUser(id: any): any { ... }

// ✅ Good - 明確型別
function getUser(id: string): Promise<User> { ... }
```

### 避免 any

```typescript
// ❌ Bad
const data: any = await response.json();

// ✅ Good
interface ApiResponse {
  success: boolean;
  data: Order;
}
const data: ApiResponse = await response.json();
```

---

## React 元件

### 函式元件

```typescript
// ✅ Good
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

### 元件命名

- 元件檔案: PascalCase (`Button.tsx`, `UserCard.tsx`)
- 元件函式: PascalCase (`function Button()`)
- 使用 named exports

---

## Tailwind CSS

### 使用 cn() 工具

```typescript
import { cn } from '@/lib/utils';

// ✅ Good - 使用 cn 合併類名
<div className={cn(
  'flex items-center gap-4',
  'p-4 rounded-lg bg-white',
  isActive && 'ring-2 ring-primary-500'
)}>
```

### 避免過長類名

```typescript
// ❌ Bad - 太長
<div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200">

// ✅ Good - 拆分
<div className={cn(
  'flex items-center gap-4',
  'p-4 rounded-lg',
  'bg-white shadow-md hover:shadow-lg',
  'transition-all duration-200',
  'border border-gray-200'
)}>
```

---

## 檔案命名

| 類型 | 命名方式 | 範例 |
|------|----------|------|
| 元件 | PascalCase | `Button.tsx` |
| 工具函式 | camelCase | `formatPrice.ts` |
| 常數 | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| 型別 | PascalCase | `UserInfo` |
| Hook | camelCase + use 前綴 | `useAuth.ts` |

---

## Import 順序

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. 第三方套件
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';

// 3. 專案內部
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { UserInfo } from '@/lib/types';

// 4. 相對路徑
import { FormInput } from './FormInput';
```

---

## ESLint

專案使用 Next.js 預設的 ESLint 設定：

```bash
npm run lint
```

---

## 最佳實踐

1. **單一職責**: 每個函式/元件只做一件事
2. **避免巢狀**: 減少 callback hell
3. **早期返回**: 減少縮排
4. **命名清晰**: 變數名應自我說明
5. **註解適量**: 只在必要時加註解
