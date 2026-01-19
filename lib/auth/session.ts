import { NextRequest, NextResponse } from 'next/server';

// Session 配置
const SESSION_SECRET =
  process.env.SESSION_SECRET || 'dev-fallback-secret-change-in-production';
const COOKIE_NAME = 'admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * 驗證請求是否已通過管理員身份驗證
 */
export function verifyAdminSession(request: NextRequest): boolean {
  const authCookie = request.cookies.get(COOKIE_NAME);
  return authCookie?.value === SESSION_SECRET;
}

/**
 * 建立管理員 Session Cookie 並附加到回應
 */
export function createAdminSessionResponse<T>(data: T): NextResponse<T> {
  const response = NextResponse.json(data);

  response.cookies.set(COOKIE_NAME, SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}

/**
 * 回傳未授權錯誤回應
 */
export function unauthorizedResponse(): NextResponse<{ success: false; error: string }> {
  return NextResponse.json({ success: false, error: '未授權' }, { status: 401 });
}
