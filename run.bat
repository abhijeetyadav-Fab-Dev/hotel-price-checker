@echo off
title Hotel Price Checker - MMT API Bulk Fetcher
color 0A

echo ============================================================
echo  Hotel Price Checker - Bulk MMT API Fetcher
echo ============================================================
echo.

cd /d "%~dp0"

echo [DEBUG] Current directory: %CD%
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js version:
node --version

echo.
echo [2/4] Checking npm...
echo [DEBUG] Running: npm --version
npm --version >nul 2>&1
echo [DEBUG] npm --version errorlevel: %errorlevel%
if %errorlevel% neq 0 (
    echo ERROR: npm not found (errorlevel=%errorlevel%)
    echo Trying alternative check...
    npm --version
    pause
    exit /b 1
)
echo npm version:
npm --version

echo.
echo [3/4] Installing dependencies (if needed)...
if exist node_modules (
    echo Dependencies already installed. Skipping...
) else (
    echo Running: npm install
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
    echo Dependencies installed successfully.
)

echo.
echo [4/4] Starting server on http://localhost:3000 ...
echo.
echo ============================================================
echo  Press Ctrl+C to stop the server
echo  Open http://localhost:3000 in your browser
echo ============================================================
echo.

npm start

pause