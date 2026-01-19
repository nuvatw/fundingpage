import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Order } from '@/lib/db/models';
import { checkoutSchema } from '@/lib/checkout/schemas';
import { generateOrderId, calculateTotal } from '@/lib/checkout';
import { isGeneralPlan } from '@/lib/checkout/constants';
import { PLANS_V2, GENERAL_PLANS_V2 } from '@/lib/data';
import type { OrderData } from '@/lib/checkout/types';
import { sendOrderConfirmationEmail } from '@/lib/email';

// Helper to detect order source based on plan
function detectSource(planId: string): 'restaurant' | 'general' {
  return isGeneralPlan(planId) ? 'general' : 'restaurant';
}

// Helper to find plan from both plan arrays
function findPlan(planId: string) {
  // Check restaurant plans first
  const restaurantPlan = PLANS_V2.find((p) => p.id === planId);
  if (restaurantPlan) return restaurantPlan;

  // Check general plans
  const generalPlan = GENERAL_PLANS_V2.find((p) => p.id === planId);
  return generalPlan;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body with Zod
    const result = checkoutSchema.safeParse(body);
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

    const data = result.data;

    // Validate plan exists
    const plan = findPlan(data.planId);
    if (!plan || plan.id === 'free') {
      return NextResponse.json(
        { success: false, message: '我知道你很急\n但是你先別急（還沒開始Ｒ）' },
        { status: 400 }
      );
    }

    // Calculate total
    const { unitPrice, total, discount } = calculateTotal(plan, data.quantity);

    // Generate order ID
    const orderId = generateOrderId();

    // Connect to database
    await dbConnect();

    // Calculate ATM payment deadline (order date + 3 days)
    let atmDeadline: Date | undefined;
    let atmDeadlineStr: string | undefined;
    if (data.paymentMethod === 'atm') {
      atmDeadline = new Date();
      atmDeadline.setDate(atmDeadline.getDate() + 3);
      atmDeadlineStr = atmDeadline.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    // Create order in MongoDB
    const mongoOrder = await Order.create({
      orderId,
      planId: data.planId,
      planTitle: plan.title,
      quantity: data.quantity,
      unitPrice,
      totalPrice: total,
      discountAmount: discount || 0,
      buyer: data.buyer,
      students: data.students,
      paymentMethod: data.paymentMethod,
      status: 'pending',
      atmDeadline,
      source: detectSource(data.planId),
    });

    // Prepare order data for email (matching existing interface)
    const orderDataForEmail: OrderData = {
      id: orderId,
      planId: data.planId,
      planTitle: plan.title,
      quantity: data.quantity,
      unitPrice,
      totalPrice: total,
      buyer: data.buyer,
      students: data.students,
      paymentMethod: data.paymentMethod,
      status: 'pending',
      createdAt: mongoOrder.createdAt.toISOString(),
      updatedAt: mongoOrder.updatedAt.toISOString(),
    };

    // Send confirmation email
    try {
      const emailResult = await sendOrderConfirmationEmail({
        order: orderDataForEmail,
        atmDeadline: atmDeadlineStr,
      });
      if (!emailResult.success) {
        console.error('Failed to send confirmation email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the order if email fails
    }

    return NextResponse.json({
      success: true,
      message: '訂單建立成功',
      orderId,
      paymentMethod: data.paymentMethod,
      atmDeadline: atmDeadlineStr,
      order: {
        id: orderId,
        planTitle: plan.title,
        quantity: data.quantity,
        totalPrice: total,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '系統錯誤，請稍後再試',
      },
      { status: 500 }
    );
  }
}
