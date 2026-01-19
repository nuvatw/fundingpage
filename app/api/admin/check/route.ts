import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';

interface CheckResponse {
  authenticated: boolean;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<CheckResponse>> {
  const isAuthenticated = verifyAdminSession(request);
  return NextResponse.json({ authenticated: isAuthenticated });
}
