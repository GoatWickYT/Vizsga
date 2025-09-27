@echo off
setlocal enabledelayedexpansion

echo ============================
echo Installing dependencies...
echo ============================
call npm install
if errorlevel 1 (
    echo.
    echo ❌ Failed to install dependencies. Exiting...
    pause
    exit /b %errorlevel%
)

echo.
echo ============================
echo Starting development server...
echo ============================
:: Start the dev server
start cmd /k "npm run dev"

:: Give the server a few seconds to boot (adjust as needed)
timeout /t 5 >nul

echo.
echo ============================
echo Opening browser at http://localhost:3000/api-docs/#/
echo ============================
start http://localhost:3000/api-docs/#/

pause
