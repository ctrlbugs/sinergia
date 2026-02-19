import { NextResponse } from 'next/server';
import { testEmailConnection, getEmailStats } from '@/app/lib/emailService';

export async function GET(request: Request) {
  try {
    // Test SMTP connection
    const connectionTest = await testEmailConnection();
    
    // Get email statistics
    const stats = getEmailStats();

    return NextResponse.json(
      {
        connection: connectionTest,
        stats: stats,
        message: connectionTest.success
          ? 'SMTP connection successful'
          : 'SMTP connection failed',
      },
      { status: connectionTest.success ? 200 : 500 }
    );
  } catch (error: any) {
    console.error('Error testing email connection:', error);
    return NextResponse.json(
      {
        connection: { success: false, error: error.message },
        stats: getEmailStats(),
        message: 'Failed to test email connection',
      },
      { status: 500 }
    );
  }
}

