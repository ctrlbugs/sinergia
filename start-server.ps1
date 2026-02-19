# PowerShell script to start the Next.js development server
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 TradePAT Next.js Landing Page" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the landing-page-nextjs folder" -ForegroundColor Yellow
    exit 1
}

# Check if this is the Next.js project (not the old HTML version)
$packageContent = Get-Content "package.json" -Raw
if ($packageContent -notmatch "next dev") {
    Write-Host "❌ ERROR: This is not the Next.js project!" -ForegroundColor Red
    Write-Host ""
    Write-Host "You are in the wrong directory." -ForegroundColor Yellow
    Write-Host "Please navigate to: landing-page-nextjs" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Current directory: $PWD" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

Write-Host "Available on:" -ForegroundColor Yellow
Write-Host "  http://localhost:3002" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting Next.js server..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
# Open browser after a short delay
Start-Job -ScriptBlock { Start-Sleep -Seconds 3; Start-Process "http://localhost:3002" } | Out-Null
npm run dev

