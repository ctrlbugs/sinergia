import { NextResponse } from 'next/server';
import { sendEmailAdvanced } from '@/app/lib/emailService';
import { getContactEmailTemplate, type ContactFormData } from '@/app/lib/emailTemplates';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      orgName,
      industrySector,
      orgType,
      country,
      fullName,
      jobTitle,
      email,
      phone,
      contactMethod,
      procurementCategory,
      description,
      supportType,
    } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    if (!orgName || !fullName) {
      return NextResponse.json(
        { error: 'Organization name and full name are required' },
        { status: 400 }
      );
    }

    const contactData: ContactFormData = {
      orgName: orgName || '',
      industrySector: industrySector || '',
      orgType: orgType || '',
      country: country || '',
      fullName: fullName || '',
      jobTitle: jobTitle || '',
      email: email || '',
      phone: phone || '',
      contactMethod: contactMethod || '',
      procurementCategory: procurementCategory || '',
      description: description || '',
      supportType: supportType || '',
    };

    const recipientEmail = 'signup@sinergianegotium.com';
    const fromEmail = process.env.SMTP_USER || 'signup@sinergianegotium.com';
    const emailSubject = 'Procurement Consultation Request - Sinergia Negotium';
    const emailHtml = getContactEmailTemplate(contactData);

    const emailResult = await sendEmailAdvanced({
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
      from: fromEmail,
      replyTo: email,
      priority: 'high',
      tags: ['contact', 'procurement-consultation'],
    });

    if (!emailResult.success) {
      console.error('Failed to send contact form email:', emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send your request. Please try again later.',
          error: process.env.NODE_ENV === 'development' ? emailResult.error : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your request has been submitted successfully. We will respond within 24–48 business hours.',
        messageId: emailResult.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in contact route:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
