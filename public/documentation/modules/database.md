# 資料庫模組

本文件說明 MongoDB 資料庫的架構與使用方式。

**檔案位置**: `lib/db/`

---

## 模組結構

```
lib/db/
├── index.ts          # Barrel export
├── connection.ts     # MongoDB 連線管理
└── models/
    ├── index.ts
    ├── Order.ts      # 訂單 Schema
    ├── Contact.ts    # 聯絡表單 Schema
    └── FundraisingConfig.ts
```

---

## 連線管理 (connection.ts)

### Serverless 優化

Vercel Serverless 環境下，每次請求可能在新的執行環境中執行。為避免重複建立連線，使用全域快取：

```typescript
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

### 使用方式

```typescript
import dbConnect from '@/lib/db/connection';

export async function POST(request: Request) {
  await dbConnect();
  // 執行資料庫操作...
}
```

---

## Order Schema

### 欄位定義

```typescript
interface IOrder {
  // 訂單識別
  orderId: string;           // "ORD-ABC123-XYZ"

  // 方案資訊
  planId: string;
  planTitle: string;
  quantity: number;

  // 價格
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;

  // 訂購人
  buyer: {
    name: string;
    email: string;
    phone: string;
    invoiceType: 'personal' | 'company';
    companyName?: string;
    taxId?: string;
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
  atmDeadline?: Date;

  // 元資料
  source: 'restaurant' | 'general';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 索引

```typescript
OrderSchema.index({ orderId: 1 }, { unique: true });
OrderSchema.index({ 'buyer.email': 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ planId: 1, status: 1 });
```

### Pre-save Hook

ATM 付款自動計算付款期限：

```typescript
OrderSchema.pre('save', function () {
  if (this.isNew && this.paymentMethod === 'atm') {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    this.atmDeadline = deadline;
  }
});
```

---

## Contact Schema

### 欄位定義

```typescript
interface IContact {
  name: string;
  email: string;
  question: string;
  source: 'restaurant' | 'general' | 'brand';
  status: 'new' | 'replied' | 'closed';
  createdAt: Date;
}
```

---

## 使用範例

### 建立訂單

```typescript
import { Order } from '@/lib/db/models';

const order = await Order.create({
  orderId: 'ORD-ABC123-XYZ',
  planId: 'accompany',
  planTitle: '陪跑',
  quantity: 2,
  unitPrice: 58000,
  totalPrice: 116000,
  buyer: { ... },
  students: [ ... ],
  paymentMethod: 'credit_card',
  status: 'pending',
  source: 'restaurant',
});
```

### 查詢訂單

```typescript
// 依訂單 ID 查詢
const order = await Order.findOne({ orderId: 'ORD-ABC123-XYZ' });

// 依 Email 查詢
const orders = await Order.find({ 'buyer.email': 'test@example.com' });

// 分頁查詢
const orders = await Order.find({ status: 'pending' })
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(20);
```

### 更新訂單狀態

```typescript
await Order.findOneAndUpdate(
  { orderId: 'ORD-ABC123-XYZ' },
  { status: 'paid', paidAt: new Date() }
);
```

---

## Hot Reload 處理

為避免開發時 hot reload 導致 model 重複註冊：

```typescript
export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
```
