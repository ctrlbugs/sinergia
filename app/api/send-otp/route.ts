import { NextResponse } from 'next/server';
import { sendEmailAdvanced } from '@/app/lib/emailService';
import { getOTPEmailTemplate } from '@/app/lib/emailTemplates';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otpCode } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!otpCode || otpCode.length !== 6) {
      return NextResponse.json(
        { error: 'Invalid OTP code. Must be 6 digits' },
        { status: 400 }
      );
    }

    // Send OTP email from no-reply@sinergianegotium.com with high priority
    const emailResult = await sendEmailAdvanced({
      to: email,
      subject: 'Your Sinergia Negotium Verification Code',
      html: getOTPEmailTemplate(email, otpCode),
      from: 'no-reply@sinergianegotium.com', // Use no-reply account for OTP
      priority: 'high', // High priority for OTP codes
      tags: ['otp', 'verification', 'security'],
    });

    if (!emailResult.success) {
      console.error(`Failed to send OTP email:`, emailResult.error);
      return NextResponse.json(
        { 
          error: 'Failed to send OTP email',
          details: emailResult.error,
        },
        { status: 500 }
      );
    }

    console.log(`✅ OTP email sent to: ${email}`, {
      messageId: emailResult.messageId,
      retryCount: emailResult.retryCount,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'OTP code sent successfully',
        email: email
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in send-otp route:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP code' },
      { status: 500 }
    );
  }
}

