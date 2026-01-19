import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Order } from '@/lib/db/models';
import { verifyAdminSession, unauthorizedResponse } from '@/lib/auth/session';
import type { OrderQueryFilter, OrderUpdateData, OrderStatus } from '@/lib/types';
import { isValidOrderStatus } from '@/lib/types';

// GET - List orders with pagination and filters
export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminSession(request)) {
      return unauthorizedResponse();
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const planId = searchParams.get('planId');
    const source = searchParams.get('source');

    // Build query with proper typing
    const query: OrderQueryFilter = {};
    if (status && isValidOrderStatus(status)) query.status = status;
    if (planId) query.planId = planId;
    if (source === 'restaurant' || source === 'general') query.source = source;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(query),
    ]);

    // Calculate stats
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalPrice' },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        stats: stats.reduce(
          (acc, s) => {
            acc[s._id as OrderStatus] = { count: s.count, totalAmount: s.totalAmount };
            return acc;
          },
          {} as Record<OrderStatus, { count: number; totalAmount: number }>
        ),
      },
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { success: false, error: '取得訂單失敗' },
      { status: 500 }
    );
  }
}

// PATCH - Update order status
export async function PATCH(request: NextRequest) {
  try {
    if (!verifyAdminSession(request)) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { orderId, status, notes } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: '缺少訂單 ID' },
        { status: 400 }
      );
    }

    if (status && !isValidOrderStatus(status)) {
      return NextResponse.json(
        { success: false, error: '無效的訂單狀態' },
        { status: 400 }
      );
    }

    await dbConnect();

    const updateData: OrderUpdateData = {};
    if (status && isValidOrderStatus(status)) {
      updateData.status = status;
      if (status === 'paid') {
        updateData.paidAt = new Date();
      }
    }
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      updateData,
      { new: true }
    ).lean();

    if (!order) {
      return NextResponse.json(
        { success: false, error: '找不到訂單' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json(
      { success: false, error: '更新訂單失敗' },
      { status: 500 }
    );
  }
}
