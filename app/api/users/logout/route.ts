/**
 * User Service 로그아웃 프록시 API 라우트
 * POST /api/users/logout
 */

import { NextRequest, NextResponse } from 'next/server';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:8081';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'userId가 필요합니다' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${USER_SERVICE_URL}/users/logout?userId=${encodeURIComponent(userId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `User Service Error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('User Service 로그아웃 연결 오류:', error);
    return NextResponse.json(
      { error: 'User Service에 연결할 수 없습니다' },
      { status: 500 }
    );
  }
}
