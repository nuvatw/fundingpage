import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Contact } from '@/lib/db/models';
import { verifyAdminSession, unauthorizedResponse } from '@/lib/auth/session';
import type { ContactQueryFilter, ContactUpdateData, ContactStatus } from '@/lib/types';
import { isValidContactStatus } from '@/lib/types';

// GET - List contacts with pagination and filters
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
    const source = searchParams.get('source');

    // Build query with proper typing
    const query: ContactQueryFilter = {};
    if (status && isValidContactStatus(status)) query.status = status;
    if (source === 'restaurant' || source === 'general' || source === 'brand') {
      query.source = source;
    }

    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments(query),
    ]);

    // Get counts by status
    const statusCounts = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        statusCounts: statusCounts.reduce(
          (acc, s) => {
            acc[s._id as ContactStatus] = s.count;
            return acc;
          },
          {} as Record<ContactStatus, number>
        ),
      },
    });
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return NextResponse.json(
      { success: false, error: '取得聯繫表單失敗' },
      { status: 500 }
    );
  }
}

// PATCH - Update contact status
export async function PATCH(request: NextRequest) {
  try {
    if (!verifyAdminSession(request)) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { contactId, status, notes, repliedBy } = body;

    if (!contactId) {
      return NextResponse.json(
        { success: false, error: '缺少聯繫 ID' },
        { status: 400 }
      );
    }

    if (status && !isValidContactStatus(status)) {
      return NextResponse.json(
        { success: false, error: '無效的狀態' },
        { status: 400 }
      );
    }

    await dbConnect();

    const updateData: ContactUpdateData = {};
    if (status && isValidContactStatus(status)) {
      updateData.status = status;
      if (status === 'replied') {
        updateData.repliedAt = new Date();
        if (repliedBy) {
          updateData.repliedBy = repliedBy;
        }
      }
    }
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const contact = await Contact.findByIdAndUpdate(contactId, updateData, {
      new: true,
    }).lean();

    if (!contact) {
      return NextResponse.json(
        { success: false, error: '找不到聯繫記錄' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Failed to update contact:', error);
    return NextResponse.json(
      { success: false, error: '更新聯繫記錄失敗' },
      { status: 500 }
    );
  }
}

// DELETE - Delete contact
export async function DELETE(request: NextRequest) {
  try {
    if (!verifyAdminSession(request)) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('id');

    if (!contactId) {
      return NextResponse.json(
        { success: false, error: '缺少聯繫 ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return NextResponse.json(
        { success: false, error: '找不到聯繫記錄' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '已刪除聯繫記錄',
    });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return NextResponse.json(
      { success: false, error: '刪除聯繫記錄失敗' },
      { status: 500 }
    );
  }
}
