# Environment Variables Setup - Landing Page

## 🔐 Create .env.local File

**IMPORTANT:** `.env.local` files are NOT committed to Git for security reasons.

### Step 1: Create the File

Create a new file named `.env.local` in the `landing-page-nextjs` directory.

### Step 2: Add the Following Content

```env
# SMTP Configuration for Email Service
# Server: server319.web-hosting.com
# Port: 465 (SSL) or 587 (TLS)

SMTP_HOST=server319.web-hosting.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=signup@sinergianegotium.com
SMTP_PASSWORD=Newrussia001
SMTP_FROM=signup@sinergianegotium.com

# Email Limits
EMAIL_DAILY_LIMIT=500
EMAIL_RATE_LIMIT_DELAY=100

# Environment
NODE_ENV=development

# API Keys (if needed)
# NEWS_API_KEY=your_news_api_key_here
# COINGECKO_API_KEY=your_coingecko_api_key_here
```

### Step 3: Verify

After creating the file:
1. Restart your Next.js dev server
2. The email service should now work correctly

---

## ✅ Security Checklist

- [ ] `.env.local` file created
- [ ] File is NOT committed to Git (check with `git status`)
- [ ] Actual password is set (not placeholder)
- [ ] File is in `.gitignore` (already done)

---

## 🚨 Never Commit This File!

The `.env.local` file contains sensitive credentials and should NEVER be committed to Git.

