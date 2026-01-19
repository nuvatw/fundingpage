import { NextRequest, NextResponse } from 'next/server';
import { createAdminSessionResponse } from '@/lib/auth/session';

interface LoginRequest {
  password: string;
}

interface LoginResponse {
  success: boolean;
  error?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginRequest = await request.json();
    const { password } = body;

    // 開發環境若未設定密碼，使用預設值
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: '密碼錯誤' },
        { status: 401 }
      );
    }

    return createAdminSessionResponse({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: '登入失敗' },
      { status: 500 }
    );
  }
}
