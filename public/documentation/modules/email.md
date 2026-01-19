# 郵件服務模組

本文件說明郵件服務的架構與使用方式。

**檔案位置**: `lib/email/`

---

## 模組結構

```
lib/email/
├── index.ts        # Resend client + 發送函式
└── templates.ts    # Email 模板
```

---

## Resend 設定

### 初始化

使用 lazy initialization 避免建構時錯誤：

```typescript
let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}
```

### 環境變數

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

---

## 發送函式

### sendOrderConfirmationEmail

發送訂單確認信：

```typescript
interface SendEmailParams {
  order: OrderData;
  atmDeadline?: string;  // ATM 付款期限
}

export async function sendOrderConfirmationEmail({
  order,
  atmDeadline,
}: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  const client = getResendClient();

  if (!client) {
    return { success: false, error: 'Email service not configured' };
  }

  try {
    await client.emails.send({
      from: 'Nuva <noreply@nuva.ai>',
      to: order.buyer.email,
      subject: `【Nuva】訂單確認 - ${order.id}`,
      html: getOrderConfirmationHtml(order, atmDeadline),
      text: getOrderConfirmationText(order, atmDeadline),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
```

---

## Email 模板

### HTML 模板

```typescript
function getOrderConfirmationHtml(order: OrderData, atmDeadline?: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        /* 內嵌樣式 */
      </style>
    </head>
    <body>
      <h1>感謝您的訂購！</h1>

      <h2>訂單資訊</h2>
      <p>訂單編號：${order.id}</p>
      <p>方案：${order.planTitle}</p>
      <p>數量：${order.quantity} 人</p>
      <p>總金額：NT$${order.totalPrice.toLocaleString()}</p>

      ${atmDeadline ? `
        <h2>ATM 付款資訊</h2>
        <p>請於 ${atmDeadline} 前完成付款</p>
      ` : ''}

      <h2>學員名單</h2>
      <ul>
        ${order.students.map(s => `<li>${s.name} (${s.email})</li>`).join('')}
      </ul>
    </body>
    </html>
  `;
}
```

### 純文字模板

```typescript
function getOrderConfirmationText(order: OrderData, atmDeadline?: string) {
  return `
感謝您的訂購！

訂單資訊
--------
訂單編號：${order.id}
方案：${order.planTitle}
數量：${order.quantity} 人
總金額：NT$${order.totalPrice.toLocaleString()}

${atmDeadline ? `
ATM 付款資訊
-----------
請於 ${atmDeadline} 前完成付款
` : ''}

學員名單
--------
${order.students.map(s => `- ${s.name} (${s.email})`).join('\n')}
  `;
}
```

---

## 使用範例

### 在 API Route 中發送郵件

```typescript
import { sendOrderConfirmationEmail } from '@/lib/email';

// 建立訂單後發送確認信
const emailResult = await sendOrderConfirmationEmail({
  order: orderData,
  atmDeadline: atmDeadlineStr,
});

if (!emailResult.success) {
  console.error('Failed to send email:', emailResult.error);
  // 郵件失敗不影響訂單建立
}
```

---

## 錯誤處理

郵件發送失敗不應影響訂單建立：

```typescript
try {
  await sendOrderConfirmationEmail({ order });
} catch (error) {
  console.error('Email sending failed:', error);
  // 繼續處理，不拋出錯誤
}
```

---

## 注意事項

1. **Lazy Initialization**: 避免在 build time 讀取環境變數
2. **Graceful Degradation**: 郵件失敗不影響主要功能
3. **雙格式**: 同時提供 HTML 和純文字版本
4. **內嵌樣式**: HTML 郵件需使用內嵌樣式
