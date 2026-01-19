# PRD：課程內容 Accordion 展開滾動優化

## 問題描述

### 現況
使用者在「課程內容」區塊（`04_CourseCurriculum.tsx`）點擊課程卡片展開時，展開的內容會「往上」延伸，導致卡片的上半部（包含標題、等級徽章）被 fixed header 遮擋，使用者無法看到完整內容。

### 根本原因分析
1. **Fixed Header 遮擋**：頁面有固定在頂部的 Header（Desktop: 72px / Mobile: 64px）
2. **缺少自動滾動**：點擊展開後，頁面沒有自動調整滾動位置
3. **視覺錯覺**：當卡片位於視窗下半部時，點擊展開 → 內容向下延伸 → 整體卡片高度增加 → 卡片的 header 部分被推出視窗頂部或被 fixed header 遮擋

### 用戶期望行為
點擊展開後，整張卡片（包含標題列）應該完整顯示在視窗可見區域內，不被任何元素遮擋。

---

## 解決方案

### 方案 A：展開後自動滾動（推薦）

**實作邏輯：**
1. 當用戶點擊展開某個課程卡片時
2. 等待展開動畫完成（約 250ms）
3. 使用 `scrollIntoView` 將該卡片滾動到視窗中
4. 滾動時考慮 fixed header 的高度偏移（80px buffer）

**修改檔案：**
- `components/sections/04_CourseCurriculum.tsx`

**核心邏輯：**
```tsx
// 在 CurriculumCard 組件中
const cardRef = useRef<HTMLDivElement>(null);

const handleToggle = () => {
  onToggle();

  // 如果是展開動作，等動畫完成後滾動
  if (!isOpen) {
    setTimeout(() => {
      cardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // 將卡片頂部對齊視窗頂部
      });
    }, 280); // 略大於動畫時間 250ms
  }
};
```

**配合 CSS scroll-margin：**
```tsx
// 在卡片的外層 div 加上 scroll-margin-top
<motion.div
  ref={cardRef}
  className="scroll-mt-24" // 96px，大於 header 高度
  // ...其餘 props
>
```

---

### 方案 B：CSS scroll-margin-top 配合 focus

**說明：**
僅使用 CSS `scroll-margin-top` 屬性，當元素進入視窗時自動保留頂部間距。

**優點：** 純 CSS，無需 JS 介入
**缺點：** 需要搭配其他觸發機制（如 focus），不如方案 A 直觀

---

### 方案 C：調整展開動畫方向（不推薦）

**說明：**
嘗試讓內容「往上展開」變成「往下展開」。

**問題：**
- 目前動畫已經是往下展開（height: 0 → auto）
- 問題不在動畫方向，而在於沒有自動滾動

---

## 推薦方案

採用 **方案 A**，原因：
1. 直接解決問題核心：確保展開後用戶能看到完整卡片
2. 保持現有動畫效果不變
3. 實作簡單，影響範圍小
4. 用戶體驗符合預期

---

## 技術規格

### 修改範圍
| 檔案 | 修改類型 | 說明 |
|------|---------|------|
| `components/sections/04_CourseCurriculum.tsx` | 修改 | 新增 scrollIntoView 邏輯 + scroll-margin CSS |

### 實作細節

#### 1. 新增 useRef
```tsx
import { useState, useRef } from 'react';
```

#### 2. 修改 CurriculumCard 組件
```tsx
function CurriculumCard({ item, isOpen, onToggle, index }: CurriculumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = levelColors[item.level];

  const handleClick = () => {
    const wasOpen = isOpen;
    onToggle();

    // 展開時，等動畫結束後滾動
    if (!wasOpen) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 280);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`scroll-mt-24 border rounded-lg overflow-hidden transition-all duration-200 ${...}`}
    >
      <button onClick={handleClick} ...>
```

#### 3. scroll-mt-24 說明
- Tailwind `scroll-mt-24` = 96px
- 這樣滾動後卡片頂部會距離視窗頂部 96px
- 留出足夠空間給 fixed header（72px）+ 額外 buffer（24px）

---

## 驗收標準

### 功能驗收
- [ ] 點擊展開任一課程卡片後，該卡片的標題列完整顯示於視窗可見區域
- [ ] Fixed header 不遮擋展開卡片的任何部分
- [ ] 滾動動畫平滑，無跳躍感

### 裝置測試
- [ ] Desktop（>= 768px）：header 72px，卡片不被遮擋
- [ ] Mobile（< 768px）：header 64px，卡片不被遮擋

### 邊界情況
- [ ] 點擊已展開的卡片收合時，不應觸發滾動
- [ ] 快速連點不同卡片時，行為正常
- [ ] 第一個卡片（預設展開）頁面載入時正常顯示

---

## 預估影響

| 項目 | 說明 |
|------|------|
| 修改範圍 | 1 個檔案，約 10 行程式碼 |
| 風險等級 | 低 |
| 對現有功能的影響 | 無破壞性變更 |
| 需要測試的功能 | 課程 Accordion 展開/收合 |

---

## 附錄：相關檔案結構

```
components/
├── sections/
│   └── 04_CourseCurriculum.tsx    ← 主要修改
├── layout/
│   └── Header/
│       ├── LaptopHeader.tsx       ← fixed, h-[72px]
│       └── PhoneHeader.tsx        ← fixed, h-16 (64px)
lib/
├── hooks/
│   └── useSmoothScroll.ts         ← 參考：offset = 80
```
