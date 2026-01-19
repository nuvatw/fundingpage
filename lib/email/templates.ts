// Email templates for order confirmations

import type { OrderData } from '@/lib/checkout/types';

interface EmailTemplateData {
  order: OrderData;
  atmDeadline?: string;
}

// Format price with NT$
function formatPrice(price: number): string {
  return `NT$ ${price.toLocaleString()}`;
}

// Format date to Chinese format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Generate order confirmation email HTML
export function generateOrderConfirmationEmail({
  order,
  atmDeadline,
}: EmailTemplateData): string {
  const isATM = order.paymentMethod === 'atm';

  const atmBankInfo = `
    <div style="background-color: #FEF3C7; border: 1px solid #FCD34D; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <h3 style="margin: 0 0 12px 0; color: #92400E; font-size: 16px; font-weight: 600;">
        匯款帳戶資訊
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #78716C; width: 35%;">銀行名稱</td>
          <td style="padding: 8px 0; color: #1C1917; font-weight: 500;">台灣銀行（004）</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #78716C;">分行</td>
          <td style="padding: 8px 0; color: #1C1917; font-weight: 500;">龍潭分行（2260）</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #78716C;">金融機構代碼</td>
          <td style="padding: 8px 0; color: #1C1917; font-weight: 500; font-family: monospace;">0042260</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #78716C;">戶名</td>
          <td style="padding: 8px 0; color: #1C1917; font-weight: 500;">努法有限公司</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #78716C;">匯款帳號</td>
          <td style="padding: 8px 0; color: #1C1917; font-weight: 600; font-family: monospace; letter-spacing: 1px;">22600 1009 861</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #78716C;">匯款金額</td>
          <td style="padding: 8px 0; color: #2563EB; font-weight: 700; font-size: 16px;">${formatPrice(order.totalPrice)}</td>
        </tr>
      </table>
      ${
        atmDeadline
          ? `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #FCD34D;">
          <p style="margin: 0; color: #B45309; font-size: 14px;">
            <strong>請於 ${atmDeadline} 前完成轉帳</strong>，逾期訂單將自動取消。
          </p>
        </div>
      `
          : ''
      }
    </div>
  `;

  const studentsTable = order.students
    .map(
      (student, index) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #E5E7EB; color: #6B7280;">學員 ${index + 1}</td>
        <td style="padding: 12px; border-bottom: 1px solid #E5E7EB; color: #1F2937;">${student.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #E5E7EB; color: #1F2937;">${student.email}</td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>訂單確認 - Nuva AI</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F3F4F6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 700;">
                Nuva AI 課程
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Success Message -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="width: 64px; height: 64px; background-color: #D1FAE5; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">✓</span>
                </div>
                <h2 style="margin: 0 0 8px 0; color: #1F2937; font-size: 24px; font-weight: 700;">
                  ${isATM ? '訂單已建立' : '訂購成功！'}
                </h2>
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  訂單編號：<strong>${order.id}</strong>
                </p>
                <p style="margin: 4px 0 0 0; color: #9CA3AF; font-size: 12px;">
                  ${formatDate(order.createdAt)}
                </p>
              </div>

              ${isATM ? atmBankInfo : ''}

              <!-- Order Summary -->
              <div style="background-color: #F9FAFB; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #1F2937; font-size: 16px; font-weight: 600;">
                  訂單摘要
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #6B7280;">方案名稱</td>
                    <td style="padding: 8px 0; color: #1F2937; text-align: right; font-weight: 500;">${order.planTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6B7280;">人數</td>
                    <td style="padding: 8px 0; color: #1F2937; text-align: right;">${order.quantity} 人</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6B7280;">單價</td>
                    <td style="padding: 8px 0; color: #1F2937; text-align: right;">${formatPrice(order.unitPrice)}</td>
                  </tr>
                  <tr style="border-top: 1px solid #E5E7EB;">
                    <td style="padding: 12px 0 0 0; color: #1F2937; font-weight: 600;">總金額</td>
                    <td style="padding: 12px 0 0 0; color: #2563EB; text-align: right; font-size: 18px; font-weight: 700;">${formatPrice(order.totalPrice)}</td>
                  </tr>
                </table>
              </div>

              <!-- Buyer Info -->
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #1F2937; font-size: 16px; font-weight: 600;">
                  訂購人資訊
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #6B7280; width: 30%;">姓名</td>
                    <td style="padding: 8px 0; color: #1F2937;">${order.buyer.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6B7280;">Email</td>
                    <td style="padding: 8px 0; color: #1F2937;">${order.buyer.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6B7280;">電話</td>
                    <td style="padding: 8px 0; color: #1F2937;">${order.buyer.phone}</td>
                  </tr>
                  ${
                    order.buyer.invoiceType === 'company'
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6B7280;">公司名稱</td>
                    <td style="padding: 8px 0; color: #1F2937;">${order.buyer.companyName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6B7280;">統一編號</td>
                    <td style="padding: 8px 0; color: #1F2937;">${order.buyer.taxId}</td>
                  </tr>
                  `
                      : ''
                  }
                </table>
              </div>

              <!-- Students Info -->
              <div style="margin-bottom: 32px;">
                <h3 style="margin: 0 0 12px 0; color: #1F2937; font-size: 16px; font-weight: 600;">
                  學員資訊
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <thead>
                    <tr style="background-color: #F3F4F6;">
                      <th style="padding: 12px; text-align: left; color: #6B7280; font-weight: 500;"></th>
                      <th style="padding: 12px; text-align: left; color: #6B7280; font-weight: 500;">姓名</th>
                      <th style="padding: 12px; text-align: left; color: #6B7280; font-weight: 500;">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${studentsTable}
                  </tbody>
                </table>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #EFF6FF; border-radius: 12px; padding: 20px;">
                <h3 style="margin: 0 0 16px 0; color: #1E40AF; font-size: 16px; font-weight: 600;">
                  接下來...
                </h3>
                <ol style="margin: 0; padding-left: 20px; color: #1E40AF; font-size: 14px; line-height: 1.8;">
                  ${
                    isATM
                      ? `
                    <li>請依據上方匯款資訊完成 ATM 轉帳</li>
                    <li>匯款完成後系統將自動確認（約 1-2 個工作天）</li>
                    <li>確認收款後，您將收到課程開始通知</li>
                  `
                      : `
                    <li>付款已完成</li>
                    <li>等待課程開始通知</li>
                  `
                  }
                </ol>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 24px 40px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 14px;">
                有任何問題嗎？請聯絡我們
              </p>
              <a href="mailto:support@nuva.ai" style="color: #2563EB; text-decoration: none; font-size: 14px;">
                support@nuva.ai
              </a>
              <p style="margin: 16px 0 0 0; color: #9CA3AF; font-size: 12px;">
                © ${new Date().getFullYear()} Nuva AI. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Generate plain text version
export function generateOrderConfirmationText({
  order,
  atmDeadline,
}: EmailTemplateData): string {
  const isATM = order.paymentMethod === 'atm';

  let text = `
Nuva AI 課程 - 訂單確認

${isATM ? '訂單已建立' : '訂購成功！'}

訂單編號：${order.id}
訂購時間：${formatDate(order.createdAt)}

`;

  if (isATM) {
    text += `
=== 匯款帳戶資訊 ===
銀行名稱：台灣銀行（004）
分行：龍潭分行（2260）
金融機構代碼：0042260
戶名：努法有限公司
匯款帳號：22600 1009 861
匯款金額：${formatPrice(order.totalPrice)}
${atmDeadline ? `\n請於 ${atmDeadline} 前完成轉帳，逾期訂單將自動取消。\n` : ''}
`;
  }

  text += `
=== 訂單摘要 ===
方案名稱：${order.planTitle}
人數：${order.quantity} 人
單價：${formatPrice(order.unitPrice)}
總金額：${formatPrice(order.totalPrice)}

=== 訂購人資訊 ===
姓名：${order.buyer.name}
Email：${order.buyer.email}
電話：${order.buyer.phone}
`;

  if (order.buyer.invoiceType === 'company') {
    text += `公司名稱：${order.buyer.companyName}
統一編號：${order.buyer.taxId}
`;
  }

  text += `
=== 學員資訊 ===
`;

  order.students.forEach((student, index) => {
    text += `學員 ${index + 1}：${student.name} (${student.email})
`;
  });

  text += `
=== 接下來 ===
`;

  if (isATM) {
    text += `1. 請依據上方匯款資訊完成 ATM 轉帳
2. 匯款完成後系統將自動確認（約 1-2 個工作天）
3. 確認收款後，您將收到課程開始通知
`;
  } else {
    text += `1. 付款已完成
2. 等待課程開始通知
`;
  }

  text += `
---
有任何問題嗎？請聯絡我們：support@nuva.ai
© ${new Date().getFullYear()} Nuva AI. All rights reserved.
`;

  return text.trim();
}
