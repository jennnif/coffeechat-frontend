/**
 * Location Service 프록시 API 라우트
 * GET, POST /api/locations
 */

import { NextRequest, NextResponse } from 'next/server';

const LOCATION_SERVICE_URL = process.env.LOCATION_SERVICE_URL || 'http://localhost:8083';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${LOCATION_SERVICE_URL}/locations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Location Service Error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Location Service 연결 오류:', error);
    return NextResponse.json(
      { error: 'Location Service에 연결할 수 없습니다' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${LOCATION_SERVICE_URL}/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Location Service Error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Location Service 연결 오류:', error);
    return NextResponse.json(
      { error: 'Location Service에 연결할 수 없습니다' },
      { status: 500 }
    );
  }
}
