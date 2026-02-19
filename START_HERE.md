# 🚀 How to Start the Landing Page

## ⚡ Quick Start (Easiest Method)

**Option 1: Double-click the startup script**
- **Windows**: Double-click `start-server.bat`
- **PowerShell**: Right-click `start-server.ps1` → "Run with PowerShell"

**Option 2: Manual Start**

1. **Open Terminal/PowerShell** in the `landing-page-nextjs` folder

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start on **port 3002** by default (to avoid conflicts with user-dashboard on 3000 and admin on 3001).

4. **Open your browser** and go to:
   ```
   http://localhost:3002
   ```

## 🔧 Port Configuration

**Default Port: 3002**
- Landing Page: `http://localhost:3002` (default)
- User Dashboard: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3001`

If you need to use port 3000 instead:
```bash
npm run dev:3000
```
Then open: `http://localhost:3002`

## Troubleshooting

### Port Already in Use?
If you see "Port 3002 is already in use":
- Use a different port: `npm run dev:3000` (but this may conflict with user-dashboard)
- Or kill the process using port 3002

### Clear Cache and Restart
```bash
# Remove .next folder
Remove-Item -Recurse -Force .next

# Restart dev server
npm run dev
```

### Check if Server Started Successfully
After running `npm run dev`, you should see:
```
✓ Ready in X seconds
○ Local: http://localhost:3002
```

If you see this, the server is running correctly!

## Production Build

To build and run in production mode:
```bash
npm run build
npm start
```

Then open: `http://localhost:3002`

