import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { FundraisingConfig } from '@/lib/db/models';
import {
  FundraisingConfigSchema,
  DEFAULT_FUNDRAISING_CONFIG,
} from '@/lib/types/fundraising';
import type { FundraisingResponse } from '@/lib/types/fundraising';
import { verifyAdminSession, unauthorizedResponse } from '@/lib/auth/session';

// GET - Public endpoint to fetch fundraising config
export async function GET(): Promise<NextResponse<FundraisingResponse>> {
  try {
    await dbConnect();

    const config = await FundraisingConfig.findOne({ configId: 'main' }).lean();

    if (!config) {
      // Return default config if none exists
      return NextResponse.json({
        success: true,
        data: DEFAULT_FUNDRAISING_CONFIG,
      });
    }

    // Transform to match existing API response format
    return NextResponse.json({
      success: true,
      data: {
        targetDisplay: config.targetDisplay,
        targetAmount: config.targetAmount,
        currentAmount: config.currentAmount,
        supporters: config.supporters,
        deadline: config.deadline.toISOString(),
        updatedAt: config.updatedAt?.toISOString(),
      },
    });
  } catch (error) {
    console.error('Failed to fetch fundraising config:', error);
    // Return default config on error for graceful degradation
    return NextResponse.json({
      success: true,
      data: DEFAULT_FUNDRAISING_CONFIG,
    });
  }
}

// PUT - Protected endpoint to update fundraising config
export async function PUT(
  request: NextRequest
): Promise<NextResponse<FundraisingResponse>> {
  try {
    if (!verifyAdminSession(request)) {
      return unauthorizedResponse();
    }

    const body = await request.json();

    const validationResult = FundraisingConfigSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: validationResult.error.issues.map((e) => e.message).join(', '),
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const config = await FundraisingConfig.findOneAndUpdate(
      { configId: 'main' },
      {
        configId: 'main',
        targetDisplay: validationResult.data.targetDisplay,
        targetAmount: validationResult.data.targetAmount,
        currentAmount: validationResult.data.currentAmount,
        supporters: validationResult.data.supporters,
        deadline: new Date(validationResult.data.deadline),
        isActive: true,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    return NextResponse.json({
      success: true,
      data: {
        targetDisplay: config!.targetDisplay,
        targetAmount: config!.targetAmount,
        currentAmount: config!.currentAmount,
        supporters: config!.supporters,
        deadline: config!.deadline.toISOString(),
        updatedAt: config!.updatedAt?.toISOString(),
      },
    });
  } catch (error) {
    console.error('Failed to update fundraising config:', error);
    return NextResponse.json(
      { success: false, error: '更新失敗，請稍後再試' },
      { status: 500 }
    );
  }
}
