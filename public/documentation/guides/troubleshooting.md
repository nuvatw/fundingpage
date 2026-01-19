# 疑難排解

本文件收集常見問題及其解決方案。

---

## 開發環境問題

### Node.js 版本不符

**問題**: 專案需要 Node.js 20.0.0 或更高版本。

**解決方案**:

```bash
# 檢查目前版本
node -v

# 使用 nvm 切換版本
nvm install 20
nvm use 20
```

---

### Port 3000 被佔用

**問題**: 啟動開發伺服器時顯示 port 已被使用。

**解決方案**:

```bash
# 方法一：使用其他 port
npm run dev -- -p 3001

# 方法二：找出並終止佔用程序
lsof -i :3000
kill -9 <PID>
```

---

### 依賴安裝失敗

**問題**: `npm install` 執行失敗。

**解決方案**:

```bash
# 清除快取
rm -rf node_modules
rm package-lock.json
npm cache clean --force

# 重新安裝
npm install
```

---

## 資料庫問題

### MongoDB 連線失敗

**問題**: 應用程式無法連線到 MongoDB。

**可能原因與解決方案**:

1. **連線字串格式錯誤**

   確認 `MONGODB_URI` 格式正確：

   ```bash
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

2. **IP 白名單問題**

   - 登入 MongoDB Atlas
   - 進入 Network Access
   - 新增你的 IP 或設定 `0.0.0.0/0` (允許所有 IP，僅開發用)

3. **帳號密碼錯誤**

   - 確認 Database User 的帳號密碼
   - 注意密碼中的特殊字元需要 URL 編碼

4. **Cluster 暫停**

   - 免費 M0 cluster 閒置過久會暫停
   - 登入 Atlas 手動啟動

---

### 資料查詢緩慢

**問題**: 訂單查詢速度很慢。

**解決方案**:

確認索引已建立：

```javascript
// 在 MongoDB Compass 或 Atlas 中檢查索引
db.orders.getIndexes()

// 預期應有的索引
{ orderId: 1 }  // unique
{ 'buyer.email': 1 }
{ createdAt: -1 }
{ status: 1, createdAt: -1 }
```

---

## API 問題

### 401 Unauthorized

**問題**: Admin API 回傳 401 錯誤。

**解決方案**:

1. 確認已登入

   ```typescript
   // 登入
   await fetch('/api/admin/login', {
     method: 'POST',
     credentials: 'include',  // 重要！
     body: JSON.stringify({ password }),
   });
   ```

2. 確認請求帶有 credentials

   ```typescript
   await fetch('/api/admin/orders', {
     credentials: 'include',  // 必須
   });
   ```

3. 確認 Session 未過期

   ```typescript
   const res = await fetch('/api/admin/check', {
     credentials: 'include',
   });
   const { authenticated } = await res.json();
   ```

---

### 400 驗證錯誤

**問題**: 結帳 API 回傳驗證錯誤。

**解決方案**:

檢查回應中的 errors 物件：

```json
{
  "success": false,
  "message": "表單資料驗證失敗",
  "errors": {
    "buyer.phone": ["請輸入有效的手機號碼（09 開頭，共 10 碼）"],
    "students.0.email": ["請輸入有效的 Email"]
  }
}
```

常見驗證規則：

| 欄位 | 規則 |
|------|------|
| 姓名 | 至少 2 個字元 |
| Email | 有效的 email 格式 |
| 電話 | 09 開頭，共 10 碼 |
| 統編 | 8 碼數字 |
| 卡號 | 16-19 碼 |

---

## 郵件問題

### 郵件未發送

**問題**: 訂單建立成功但沒有收到確認信。

**解決方案**:

1. **檢查環境變數**

   ```bash
   # 確認已設定 Resend API Key
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

2. **檢查 console log**

   郵件發送失敗會在 console 輸出錯誤，但不會影響訂單建立。

3. **確認 Email 格式**

   檢查收件者 email 是否正確。

4. **檢查 Resend Dashboard**

   登入 Resend 查看發送記錄和錯誤。

---

### 郵件進入垃圾信箱

**問題**: 郵件被標記為垃圾信。

**解決方案**:

1. 設定 Domain 驗證（Resend Dashboard）
2. 新增 SPF 和 DKIM 記錄
3. 使用自訂 domain 而非 resend.dev

---

## 建構問題

### Build 失敗

**問題**: `npm run build` 失敗。

**常見原因與解決方案**:

1. **TypeScript 型別錯誤**

   ```bash
   # 檢查型別
   npx tsc --noEmit
   ```

2. **ESLint 錯誤**

   ```bash
   # 檢查 lint
   npm run lint

   # 自動修復
   npm run lint -- --fix
   ```

3. **Missing 環境變數**

   Build 時需要某些環境變數。確認 `.env.local` 存在。

4. **快取問題**

   ```bash
   # 清除 Next.js 快取
   rm -rf .next
   npm run build
   ```

---

### Hydration Mismatch

**問題**: React hydration error，server 和 client 不一致。

**解決方案**:

1. **日期/時間相關**

   使用 `useEffect` 處理會因時區而異的日期：

   ```typescript
   const [date, setDate] = useState('');

   useEffect(() => {
     setDate(new Date().toLocaleDateString());
   }, []);
   ```

2. **隨機值**

   避免在初始 render 使用隨機值：

   ```typescript
   // ❌ Bad
   const [id] = useState(Math.random());

   // ✅ Good
   const [id, setId] = useState('');
   useEffect(() => {
     setId(crypto.randomUUID());
   }, []);
   ```

3. **瀏覽器 API**

   使用 `typeof window !== 'undefined'` 檢查：

   ```typescript
   const [width, setWidth] = useState(0);

   useEffect(() => {
     setWidth(window.innerWidth);
   }, []);
   ```

---

## 樣式問題

### Tailwind 樣式未生效

**問題**: 新增的 Tailwind class 沒有效果。

**解決方案**:

1. **確認 content 路徑**

   檢查 `tailwind.config.ts`：

   ```typescript
   content: [
     './app/**/*.{js,ts,jsx,tsx,mdx}',
     './components/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   ```

2. **動態 class 問題**

   ```typescript
   // ❌ Bad - Tailwind 無法偵測動態 class
   <div className={`bg-${color}-500`}>

   // ✅ Good - 使用完整 class name
   <div className={color === 'red' ? 'bg-red-500' : 'bg-blue-500'}>
   ```

3. **重新啟動開發伺服器**

   ```bash
   # 停止後重新啟動
   npm run dev
   ```

---

## 效能問題

### 頁面載入緩慢

**問題**: 頁面首次載入很慢。

**解決方案**:

1. **檢查 bundle size**

   ```bash
   # 使用 Next.js 分析工具
   ANALYZE=true npm run build
   ```

2. **使用動態 import**

   ```typescript
   // 延遲載入大型元件
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Loading />,
   });
   ```

3. **圖片優化**

   使用 Next.js Image 元件：

   ```tsx
   import Image from 'next/image';

   <Image
     src="/images/hero.jpg"
     width={1200}
     height={600}
     alt="Hero"
     priority  // 關鍵圖片
   />
   ```

---

## 取得更多幫助

如果以上方案無法解決你的問題：

1. **搜尋 GitHub Issues** - 查看是否有類似問題
2. **建立新 Issue** - 提供詳細的重現步驟和錯誤訊息
3. **聯絡團隊** - dev@nuva.ai

---

## 相關連結

- [安裝指南](../getting-started.md)
- [環境變數](../environment.md)
- [貢獻指南](contributing.md)
