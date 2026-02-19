@echo off
echo.
echo ========================================
echo 🚀 TradePAT Next.js Landing Page
echo ========================================
echo.

cd /d "%~dp0"

REM Check if this is the Next.js project
findstr /C:"next dev" package.json >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: This is not the Next.js project!
    echo.
    echo You are in the wrong directory.
    echo Please navigate to: landing-page-nextjs
    echo.
    echo Current directory: %CD%
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

echo Available on:
echo   http://localhost:3002
echo.
echo Starting Next.js server...
echo Press Ctrl+C to stop the server
echo.
start "" "http://localhost:3002"
call npm run dev

pause

