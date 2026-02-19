# Email Setup Guide - Namecheap SMTP

This guide will help you configure email sending using Namecheap Private Email SMTP.

## Required Information

To set up email functionality, you'll need the following from your Namecheap Private Email account:

### 1. SMTP Server Details
- **SMTP Host**: `mail.privateemail.com` (default for Namecheap)
- **SMTP Port**: `465` (for SSL) or `587` (for TLS)
- **SMTP Security**: `true` for SSL (port 465) or `false` for TLS (port 587)

### 2. Email Account Credentials
- **SMTP Username**: Your full email address (e.g., `signup@tradepat.com`)
- **SMTP Password**: Your email account password
- **From Address**: Can be `no-reply@tradepat.com` or your main email

## How to Get Your Namecheap SMTP Settings

1. **Log in to Namecheap**
   - Go to https://www.namecheap.com/
   - Log in to your account

2. **Access Email Settings**
   - Navigate to "Domain List" → Select your domain (`tradepat.com`)
   - Click on "Manage" next to "Private Email"
   - Or go directly to: https://privateemail.com/

3. **Find SMTP Settings**
   - Log in to your Private Email account
   - Go to "Email Accounts" → Select your email account
   - Look for "Mail Client Settings" or "SMTP Settings"
   - You'll see:
     - **Incoming Mail Server**: `mail.privateemail.com`
     - **Outgoing Mail Server (SMTP)**: `mail.privateemail.com`
     - **Port**: `465` (SSL) or `587` (TLS)
     - **Username**: Your full email address
     - **Password**: Your email password

## Environment Variables Setup

1. **Create `.env.local` file** in the `landing-page-nextjs` folder:

```env
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=signup@tradepat.com
SMTP_PASSWORD=your-actual-password-here
SMTP_FROM=no-reply@tradepat.com
NODE_ENV=development
```

2. **For Production**, create `.env.production`:

```env
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=signup@tradepat.com
SMTP_PASSWORD=your-actual-password-here
SMTP_FROM=no-reply@tradepat.com
NODE_ENV=production
```

## Email Types

### 1. Signup Emails
- **From**: Hero section input field
- **To**: `signup@tradepat.com`
- **Template**: Signup email template (purple gradient header)
- **API**: `/api/subscribe` with `type: 'signup'`

### 2. Newsletter Emails
- **From**: Newsletter input field (CTA section)
- **To**: `signup@tradepat.com`
- **Template**: Newsletter email template (dark header)
- **API**: `/api/subscribe` with `type: 'newsletter'`

### 3. OTP Emails
- **From**: `no-reply@tradepat.com`
- **To**: User's email address
- **Template**: OTP verification template (with code display)
- **API**: `/api/send-otp` with `email` and `otpCode`

## Testing

After setting up your environment variables:

1. **Test Signup Email**:
   ```bash
   curl -X POST http://localhost:3002/api/subscribe \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","type":"signup"}'
   ```

2. **Test Newsletter Email**:
   ```bash
   curl -X POST http://localhost:3002/api/subscribe \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","type":"newsletter"}'
   ```

3. **Test OTP Email**:
   ```bash
   curl -X POST http://localhost:3002/api/send-otp \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","otpCode":"123456"}'
   ```

## Troubleshooting

### Email Not Sending?
1. Check that `.env.local` file exists and has correct values
2. Verify SMTP credentials are correct
3. Check if port 465/587 is blocked by firewall
4. Ensure email account is active in Namecheap
5. Check server logs for error messages

### Common Errors
- **"Invalid login"**: Check SMTP_USER and SMTP_PASSWORD
- **"Connection timeout"**: Check SMTP_HOST and SMTP_PORT
- **"Authentication failed"**: Verify email account is active

## Security Notes

⚠️ **Important**: Never commit `.env.local` or `.env.production` files to git!

- Add `.env.local` and `.env.production` to `.gitignore`
- Use environment variables in production hosting (Vercel, Netlify, etc.)
- Keep your SMTP password secure

## Next Steps

1. Get your Namecheap SMTP credentials
2. Create `.env.local` file with your credentials
3. Install dependencies: `npm install`
4. Test email sending
5. Deploy with production environment variables

