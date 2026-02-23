# Email Debugging Guide

## 🔍 Step-by-Step Debugging

### Step 1: Check Console Logs

When you test the signup form, check your **Next.js server console** for these logs:

#### Expected Success Logs:
```
🔧 Initializing SMTP transporter: { host: '...', port: 465, ... }
📡 Creating nodemailer transporter...
✅ SMTP server is ready to send emails
📧 Sending email: { from: '...', to: '...', ... }
📤 Attempting to send email via SMTP...
✅ Email sent successfully! { messageId: '...', response: '...', ... }
```

#### Error Logs to Look For:
```
❌ SMTP credentials not configured
❌ SMTP connection verification failed
❌ Email send failed
```

### Step 2: Test Email Endpoint

Use the test endpoint to verify email sending:

**Via Browser/Postman:**
```
POST http://localhost:3002/api/test-email-send
Content-Type: application/json

{
  "to": "signup@sinergianegotium.com"
}
```

**Via cURL:**
```bash
curl -X POST http://localhost:3002/api/test-email-send \
  -H "Content-Type: application/json" \
  -d '{"to":"signup@sinergianegotium.com"}'
```

### Step 3: Check .env.local File

Verify the file exists and has correct values:

**File:** `landing-page-nextjs/.env.local`

```env
SMTP_HOST=server319.web-hosting.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=signup@sinergianegotium.com
SMTP_PASSWORD=Newrussia001
SMTP_FROM=signup@sinergianegotium.com
```

**Important Checks:**
- [ ] File exists
- [ ] No extra spaces
- [ ] No quotes around values
- [ ] Password is correct: `Newrussia001`
- [ ] Username matches: `signup@sinergianegotium.com`

### Step 4: Verify Environment Variables Are Loaded

Add this temporary log in `subscribe/route.ts`:

```typescript
console.log('🔍 Environment Check:', {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  hasPassword: !!process.env.SMTP_PASSWORD,
});
```

### Step 5: Check Email Logs

After sending, check:
1. **Console logs** - Look for error messages
2. **Response from API** - Check if `messageId` is present
3. **Email inbox** - Check `signup@sinergianegotium.com`
4. **Spam folder** - Emails might go to spam initially

---

## 🐛 Common Issues

### Issue 1: "SMTP credentials not configured"

**Solution:**
- Verify `.env.local` file exists
- Check file has correct values
- Restart Next.js server after creating/editing `.env.local`

### Issue 2: "SMTP connection verification failed"

**Possible Causes:**
- Wrong password
- Wrong host/port
- Firewall blocking port 465
- Account suspended in cPanel

**Solution:**
- Verify password: `Newrussia001`
- Check host: `server319.web-hosting.com`
- Check port: `465`
- Verify account is active in cPanel

### Issue 3: "Email send failed" but no error details

**Solution:**
- Check full error object in console
- Look for `errorCode` and `errorResponse`
- Check if "from" address matches authenticated user

### Issue 4: Email sent but not received

**Possible Causes:**
- Email in spam folder
- Wrong recipient email
- Email server delay
- Email rejected by recipient server

**Solution:**
- Check spam folder
- Verify recipient email is correct
- Wait a few minutes (email delivery can be delayed)
- Check email server logs

---

## 📊 What to Share for Debugging

If emails still don't work, share:

1. **Console logs** from Next.js server (full output)
2. **Response from API** (check browser Network tab)
3. **.env.local file** (mask password: `SMTP_PASSWORD=***`)
4. **Test endpoint response** (`/api/test-email-send`)

---

## ✅ Quick Test Checklist

- [ ] `.env.local` file exists
- [ ] Server restarted after creating `.env.local`
- [ ] Console shows "SMTP server is ready"
- [ ] Test endpoint returns success
- [ ] Checked spam folder
- [ ] Verified recipient email is correct
- [ ] Checked console for error messages

---

## 🚀 Next Steps

1. **Check console logs** when testing
2. **Use test endpoint** to verify email sending
3. **Share logs** if still not working
4. **Verify .env.local** has correct values

