# Deploy to Vercel

## Quick deploy (CLI)

1. **Install Vercel CLI** (if not already):
   ```bash
   npm i -g vercel
   ```

2. **Deploy** from the `landing-page` folder:
   ```bash
   cd c:\Synergia\landing-page
   vercel
   ```
   Follow the prompts (login, link to project or create new).

3. **Production deploy**:
   ```bash
   vercel --prod
   ```

---

## Deploy via GitHub

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** → **Project**.
3. Import your Git repository.
4. **Root Directory**: If your repo root is `Synergia` and the Next.js app is in `landing-page`, set **Root Directory** to `landing-page`. Otherwise leave as `.` if the repo root is the landing page.
5. Vercel will auto-detect Next.js. Click **Deploy**.

---

## Environment variables

Add these in **Vercel Dashboard** → **Project** → **Settings** → **Environment Variables**:

| Variable | Required | Description |
|----------|----------|-------------|
| `SMTP_HOST` | Yes (for email) | SMTP server host |
| `SMTP_PORT` | Yes | SMTP port (e.g. 465) |
| `SMTP_USER` | Yes | SMTP username |
| `SMTP_PASSWORD` | Yes | SMTP password |
| `SMTP_FROM` | Yes | From email address |
| `NEXT_PUBLIC_BASE_URL` | No | Site URL for emails (e.g. `https://your-app.vercel.app`) |
| `BACKEND_API_URL` | No | Backend API (defaults to `https://dashboard.tradepat.com`) |

**Important:** Never commit `.env.local` or real credentials. Add them only in the Vercel dashboard.

---

## After deploy

- Each push to `master` will trigger a new deployment.
- Preview deployments are created for pull requests.
- Custom domain: **Settings** → **Domains** in the Vercel dashboard.
