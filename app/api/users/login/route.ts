/**
 * User Service 로그인 프록시 API 라우트
 * POST /api/users/login
 */

import { NextRequest, NextResponse } from 'next/server';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:8081';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${USER_SERVICE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
    console.error('User Service 로그인 연결 오류:', error);
    return NextResponse.json(
      { error: 'User Service에 연결할 수 없습니다' },
      { status: 500 }
    );
  }
}
