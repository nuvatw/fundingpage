import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db/connection';
import { Contact } from '@/lib/db/models';

// Validation schema for contact form
const ContactSchema = z.object({
  name: z.string().min(1, '請輸入姓名'),
  email: z.string().email('請輸入有效的信箱'),
  question: z.string().min(1, '請輸入您的問題'),
  source: z.enum(['restaurant', 'general', 'brand']).optional(),
});

// POST - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: '表單資料驗證失敗',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Create contact entry
    const contact = await Contact.create({
      name: result.data.name,
      email: result.data.email,
      question: result.data.question,
      source: result.data.source,
      status: 'new',
    });

    return NextResponse.json({
      success: true,
      message: '已收到您的訊息！',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '系統錯誤，請稍後再試',
      },
      { status: 500 }
    );
  }
}
