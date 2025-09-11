import { NextRequest, NextResponse } from 'next/server';

const BASE = process.env.NOTIFICATION_BASE_URL!;

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; guestId: string } }
) {
  try {
    const notificationId = params.id;
    const guestId = params.guestId;
    const body = await request.json();
    
    const response = await fetch(
      `${BASE}/notifications/${notificationId}/guests/${guestId}/guest_status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update guest status' },
      { status: 500 }
    );
  }
}
