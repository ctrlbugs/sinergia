import { NextResponse } from 'next/server';
import { getEmailStats } from '@/app/lib/emailService';

export async function GET(request: Request) {
  try {
    const stats = getEmailStats();

    return NextResponse.json(
      {
        success: true,
        stats: stats,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error getting email stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to get email statistics',
      },
      { status: 500 }
    );
  }
}

