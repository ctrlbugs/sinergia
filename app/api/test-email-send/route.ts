import { NextResponse } from 'next/server';
import { sendEmailAdvanced } from '@/app/lib/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, testEmail = 'signup@tradepat.com' } = body;

    const recipientEmail = to || testEmail;

    console.log('🧪 TEST EMAIL SEND:', {
      to: recipientEmail,
      timestamp: new Date().toISOString(),
    });

    // Send a simple test email
    const emailResult = await sendEmailAdvanced({
      to: recipientEmail,
      subject: 'Test Email from TradePAT',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Test Email</h1>
          <p>This is a test email from TradePAT email service.</p>
          <p>If you receive this, the email system is working correctly.</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
      from: process.env.SMTP_USER || 'signup@tradepat.com',
      priority: 'normal',
    });

    console.log('📧 TEST EMAIL RESULT:', {
      success: emailResult.success,
      messageId: emailResult.messageId,
      error: emailResult.error,
      retryCount: emailResult.retryCount,
    });

    return NextResponse.json({
      success: emailResult.success,
      message: emailResult.success 
        ? 'Test email sent successfully! Check your inbox.' 
        : 'Failed to send test email',
      messageId: emailResult.messageId,
      error: emailResult.error,
      details: {
        to: recipientEmail,
        from: process.env.SMTP_USER || 'signup@tradepat.com',
        timestamp: new Date().toISOString(),
      },
    }, { status: emailResult.success ? 200 : 500 });
  } catch (error: any) {
    console.error('❌ TEST EMAIL ERROR:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to send test email',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 });
  }
}

