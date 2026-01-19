// Email service using Resend

import { Resend } from 'resend';
import type { OrderData } from '@/lib/checkout/types';
import {
  generateOrderConfirmationEmail,
  generateOrderConfirmationText,
} from './templates';

// Lazy-initialize Resend client to avoid build-time errors
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Default sender email (must be verified in Resend dashboard)
// For testing, you can use "onboarding@resend.dev" before verifying your domain
const FROM_EMAIL = process.env.EMAIL_FROM || 'Nuva AI <onboarding@resend.dev>';

interface SendOrderConfirmationOptions {
  order: OrderData;
  atmDeadline?: string;
}

export async function sendOrderConfirmationEmail({
  order,
  atmDeadline,
}: SendOrderConfirmationOptions): Promise<{ success: boolean; error?: string }> {
  try {
    const htmlContent = generateOrderConfirmationEmail({ order, atmDeadline });
    const textContent = generateOrderConfirmationText({ order, atmDeadline });

    const isATM = order.paymentMethod === 'atm';
    const subject = isATM
      ? `【Nuva AI】訂單確認 - 請完成匯款 #${order.id}`
      : `【Nuva AI】訂購成功 #${order.id}`;

    const { data, error } = await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: order.buyer.email,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Send email to all students (optional, for course notification)
export async function sendStudentNotificationEmails({
  order,
}: {
  order: OrderData;
}): Promise<{ success: boolean; errors?: string[] }> {
  const errors: string[] = [];

  for (const student of order.students) {
    try {
      await getResendClient().emails.send({
        from: FROM_EMAIL,
        to: student.email,
        subject: `【Nuva AI】歡迎加入 ${order.planTitle}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563EB;">歡迎加入 Nuva AI 課程！</h1>
            <p>親愛的 ${student.name}，</p>
            <p>您已被 ${order.buyer.name} 加入 <strong>${order.planTitle}</strong> 課程。</p>
            <p>課程開始時，我們會再發送通知給您。</p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
            <p style="color: #6B7280; font-size: 12px;">
              此信件為自動發送，如有問題請聯絡 support@nuva.ai
            </p>
          </div>
        `,
        text: `
歡迎加入 Nuva AI 課程！

親愛的 ${student.name}，

您已被 ${order.buyer.name} 加入 ${order.planTitle} 課程。

課程開始時，我們會再發送通知給您。

---
此信件為自動發送，如有問題請聯絡 support@nuva.ai
        `.trim(),
      });
    } catch (error) {
      console.error(`Failed to send email to student ${student.email}:`, error);
      errors.push(student.email);
    }
  }

  return {
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
