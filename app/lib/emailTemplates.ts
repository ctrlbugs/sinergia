// Email templates for different purposes

export function getSignupEmailTemplate(email: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://tradepat.com';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Signup Request - TradePAT</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(59, 48, 252, 0.15); overflow: hidden;">
          <!-- Logo Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #3b30fc 0%, #8b5cf6 100%);">
              <img src="${baseUrl}/images/securepat-icon.png" alt="TradePAT Logo" style="width: 60px; height: 60px; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Signup Request</h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">TradePAT Landing Page</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6; font-weight: 400;">
                Hello Admin,
              </p>
              
              <p style="margin: 0 0 24px; color: #333333; font-size: 16px; line-height: 1.6;">
                You have received a new signup request from the <strong style="color: #3b30fc;">TradePAT</strong> landing page.
              </p>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #3b30fc; padding: 24px; margin: 32px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(59, 48, 252, 0.1);">
                <p style="margin: 0 0 12px; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  📧 Email Address
                </p>
                <p style="margin: 0; color: #3b30fc; font-size: 20px; font-weight: 700; word-break: break-all;">
                  ${email}
                </p>
              </div>
              
              <div style="background-color: #e0f2fe; border-left: 4px solid #0ea5e9; padding: 16px 20px; margin: 24px 0; border-radius: 8px;">
                <p style="margin: 0; color: #0c4a6e; font-size: 14px; line-height: 1.6;">
                  <strong>ℹ️ Note:</strong> This user has submitted their email address through the hero section signup form on the landing page. Please follow up with them to complete their registration.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 8px; color: #666666; font-size: 13px; font-weight: 600;">
                TradePAT
              </p>
              <p style="margin: 0 0 12px; color: #999999; font-size: 12px; line-height: 1.5;">
                Protection. Access. Trust.
              </p>
              <p style="margin: 16px 0 0; color: #999999; font-size: 11px; line-height: 1.5;">
                This is an automated email from <strong style="color: #3b30fc;">TradePAT Landing Page</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getNewsletterEmailTemplate(email: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://tradepat.com';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription - TradePAT</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(59, 48, 252, 0.15); overflow: hidden;">
          <!-- Logo Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #3b30fc 0%, #8b5cf6 100%);">
              <img src="${baseUrl}/images/securepat-icon.png" alt="TradePAT Logo" style="width: 60px; height: 60px; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Newsletter Subscription</h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">TradePAT Landing Page</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6; font-weight: 400;">
                Hello Admin,
              </p>
              
              <p style="margin: 0 0 24px; color: #333333; font-size: 16px; line-height: 1.6;">
                A new user has subscribed to the <strong style="color: #3b30fc;">TradePAT</strong> newsletter.
              </p>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #3b30fc; padding: 24px; margin: 32px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(59, 48, 252, 0.1);">
                <p style="margin: 0 0 12px; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  📧 Subscriber Email
                </p>
                <p style="margin: 0; color: #3b30fc; font-size: 20px; font-weight: 700; word-break: break-all;">
                  ${email}
                </p>
              </div>
              
              <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 16px 20px; margin: 24px 0; border-radius: 8px;">
                <p style="margin: 0; color: #065f46; font-size: 14px; line-height: 1.6;">
                  <strong>✅ Action Required:</strong> This user has subscribed through the newsletter form on the landing page. They should be added to your newsletter mailing list.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 8px; color: #666666; font-size: 13px; font-weight: 600;">
                TradePAT
              </p>
              <p style="margin: 0 0 12px; color: #999999; font-size: 12px; line-height: 1.5;">
                Protection. Access. Trust.
              </p>
              <p style="margin: 16px 0 0; color: #999999; font-size: 11px; line-height: 1.5;">
                This is an automated email from <strong style="color: #3b30fc;">TradePAT Landing Page</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getOTPEmailTemplate(email: string, otpCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://tradepat.com';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code - TradePAT</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(59, 48, 252, 0.15); overflow: hidden;">
          <!-- Logo Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #3b30fc 0%, #8b5cf6 100%);">
              <img src="${baseUrl}/images/securepat-icon.png" alt="TradePAT Logo" style="width: 60px; height: 60px; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Your Verification Code</h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">TradePAT Account Verification</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6; font-weight: 400;">
                Hello,
              </p>
              
              <p style="margin: 0 0 32px; color: #333333; font-size: 16px; line-height: 1.6;">
                You have requested a verification code for your <strong style="color: #3b30fc;">TradePAT</strong> account. Use the code below to complete your verification:
              </p>
              
              <!-- OTP Code Box -->
              <table role="presentation" style="width: 100%; margin: 32px 0;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #3b30fc 0%, #8b5cf6 100%); padding: 36px 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(59, 48, 252, 0.3);">
                    <p style="margin: 0 0 12px; color: rgba(255, 255, 255, 0.9); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">
                      Your Verification Code
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 52px; font-weight: 700; letter-spacing: 12px; font-family: 'Courier New', 'Monaco', monospace; line-height: 1.2;">
                      ${otpCode}
                    </p>
                  </td>
                </tr>
              </table>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; margin: 32px 0; border-radius: 8px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>⏰ Important:</strong> This code will expire in <strong>10 minutes</strong>. Do not share this code with anyone.
                </p>
              </div>
              
              <p style="margin: 24px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                If you didn't request this code, please ignore this email or contact our support team if you have concerns.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 8px; color: #666666; font-size: 13px; font-weight: 600;">
                TradePAT
              </p>
              <p style="margin: 0 0 12px; color: #999999; font-size: 12px; line-height: 1.5;">
                Protection. Access. Trust.
              </p>
              <p style="margin: 16px 0 0; color: #999999; font-size: 11px; line-height: 1.5;">
                This email was sent from <strong style="color: #3b30fc;">no-reply@tradepat.com</strong><br/>
                If you have any questions, please contact our support team.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

