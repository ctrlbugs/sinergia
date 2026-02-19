import { NextResponse } from 'next/server';
import { sendEmailAdvanced } from '@/app/lib/emailService';
import { getSignupEmailTemplate, getNewsletterEmailTemplate } from '@/app/lib/emailTemplates';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, type = 'signup' } = body; // type: 'signup' or 'newsletter'

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Determine email template and recipient based on type
    const recipientEmail = 'signup@tradepat.com';
    let emailSubject = '';
    let emailHtml = '';
    
    // IMPORTANT: "from" must match SMTP_USER in .env.local
    // The email service will use the authenticated SMTP user as "from"
    // So ensure SMTP_USER in .env.local matches the account you want to send from
    const fromEmail = process.env.SMTP_USER || 'signup@tradepat.com';

    if (type === 'signup') {
      emailSubject = 'New Signup Request - TradePAT Landing Page';
      emailHtml = getSignupEmailTemplate(email);
    } else if (type === 'newsletter') {
      emailSubject = 'Newsletter Subscription - TradePAT Landing Page';
      emailHtml = getNewsletterEmailTemplate(email);
    } else {
      return NextResponse.json(
        { error: 'Invalid email type. Must be "signup" or "newsletter"' },
        { status: 400 }
      );
    }

    console.log(`📧 Sending ${type} email:`, {
      from: fromEmail,
      to: recipientEmail,
      subject: emailSubject,
    });

    // Send email using enhanced SMTP service
    // Note: The "from" address will be automatically set to match SMTP_USER
    // to ensure SMTP server accepts the email
    const emailResult = await sendEmailAdvanced({
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
      from: fromEmail, // This should match SMTP_USER in .env.local
      replyTo: email, // Reply to the user's email
      priority: 'normal',
      tags: [type, 'landing-page'],
    });

    if (!emailResult.success) {
      console.error(`❌ Failed to send ${type} email:`, {
        error: emailResult.error,
        retryCount: emailResult.retryCount,
      });
      
      // Return error details in development, generic message in production
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to send email. Please try again later.',
          error: process.env.NODE_ENV === 'development' ? emailResult.error : undefined,
          email: email,
          type: type
        },
        { status: 500 }
      );
    }

    console.log(`✅ Email ${type} request processed successfully:`, {
      email: email,
      recipient: recipientEmail,
      messageId: emailResult.messageId,
      retryCount: emailResult.retryCount,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email submitted successfully',
        email: email,
        type: type,
        messageId: emailResult.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in subscribe route:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

