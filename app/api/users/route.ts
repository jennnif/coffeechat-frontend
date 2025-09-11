/**
 * User Service 프록시 API 라우트
 * GET, POST /api/users
 */

import { NextRequest, NextResponse } from 'next/server';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:8081';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/users`, {
      method: 'GET',
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
    console.error('User Service 연결 오류:', error);
    return NextResponse.json(
      { error: 'User Service에 연결할 수 없습니다' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${USER_SERVICE_URL}/users`, {
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
    console.error('User Service 연결 오류:', error);
    return NextResponse.json(
      { error: 'User Service에 연결할 수 없습니다' },
      { status: 500 }
    );
  }
}
