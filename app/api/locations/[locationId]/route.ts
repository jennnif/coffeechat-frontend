/**
 * Location Service 개별 위치 프록시 API 라우트
 * GET, DELETE /api/locations/[locationId]
 */

import { NextRequest, NextResponse } from 'next/server';

const LOCATION_SERVICE_URL = process.env.LOCATION_SERVICE_URL || 'http://localhost:8083';

export async function GET(
  request: NextRequest,
  { params }: { params: { locationId: string } }
) {
  try {
    const { locationId } = params;
    
    const response = await fetch(`${LOCATION_SERVICE_URL}/locations/${encodeURIComponent(locationId)}`, {
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { locationId: string } }
) {
  try {
    const { locationId } = params;
    
    const response = await fetch(`${LOCATION_SERVICE_URL}/locations/${encodeURIComponent(locationId)}`, {
      method: 'DELETE',
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Location Service 연결 오류:', error);
    return NextResponse.json(
      { error: 'Location Service에 연결할 수 없습니다' },
      { status: 500 }
    );
  }
}
