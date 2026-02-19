# Quick Email Debugging

## 🚨 Immediate Steps

### 1. Check Console Logs

When you test the signup form, **watch your Next.js server console** for these messages:

**✅ Good Signs:**
```
🔧 Initializing SMTP transporter: { host: 'server319.web-hosting.com', ... }
✅ SMTP transporter created successfully
📧 Sending email: { from: 'signup@tradepat.com', ... }
📤 Attempting to send email via SMTP...
✅ Email sent successfully! { messageId: '...', response: '250 OK', ... }
```

**❌ Bad Signs:**
```
❌ SMTP credentials not configured
❌ Email transporter not available
❌ Email send failed
```

### 2. Test with Test Endpoint

Open browser console and run:

```javascript
fetch('/api/test-email-send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ to: 'signup@tradepat.com' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Test email sent successfully! Check your inbox.",
  "messageId": "...",
  "details": { ... }
}
```

### 3. Verify .env.local File

**File Location:** `landing-page-nextjs/.env.local`

**Required Content:**
```env
SMTP_HOST=server319.web-hosting.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=signup@tradepat.com
SMTP_PASSWORD=Newrussia001
SMTP_FROM=signup@tradepat.com
```

**Check:**
- [ ] File exists in `landing-page-nextjs` folder
- [ ] No `.local` extension missing (should be `.env.local` not `.env.local.txt`)
- [ ] No extra spaces before/after `=`
- [ ] No quotes around values
- [ ] Password is exactly: `Newrussia001`

### 4. Restart Server

**After creating/editing `.env.local`:**
1. Stop the Next.js server (Ctrl+C)
2. Start it again: `npm run dev`
3. Environment variables are loaded on startup

---

## 🔍 What to Share

If emails still don't work, share:

1. **Full console output** from Next.js server when testing
2. **Response from test endpoint** (`/api/test-email-send`)
3. **Browser Network tab** - Check the `/api/subscribe` request/response
4. **.env.local file** (mask password: `SMTP_PASSWORD=***`)

---

## ⚡ Quick Fixes

### Fix 1: Environment Variables Not Loading

**Symptom:** Console shows "SMTP credentials not configured"

**Solution:**
1. Verify `.env.local` file exists
2. Restart Next.js server
3. Check file is named exactly `.env.local` (not `.env.local.txt`)

### Fix 2: Connection Issues

**Symptom:** "SMTP connection failed" or timeout

**Solution:**
1. Verify host: `server319.web-hosting.com`
2. Verify port: `465`
3. Check firewall allows port 465
4. Try port 587 with `SMTP_SECURE=false`

### Fix 3: Authentication Failed

**Symptom:** "Invalid login" or "Authentication failed"

**Solution:**
1. Verify password: `Newrussia001`
2. Verify username: `signup@tradepat.com`
3. Check account is active in cPanel
4. Try logging into webmail to verify credentials

---

## 📧 Check These Places

1. **signup@tradepat.com inbox** (primary)
2. **Spam/Junk folder** (common)
3. **Server console logs** (for errors)
4. **Browser Network tab** (for API response)

---

## 🎯 Most Likely Issues

1. **.env.local file not created** - Create it with correct values
2. **Server not restarted** - Restart after creating .env.local
3. **Wrong password** - Verify: `Newrussia001`
4. **Email in spam** - Check spam folder
5. **"From" address mismatch** - Should match `SMTP_USER`

---

**Run the test endpoint and share the console output!**

