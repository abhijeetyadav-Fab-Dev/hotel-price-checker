@echo off
title Hotel Price Checker Server
color 0A

echo ============================================================
echo  Hotel Price Checker - Local Server
echo ============================================================
echo.

cd /d "%~dp0"

:: Try to find node in common locations if not in PATH
where node >nul 2>&1
if %errorlevel% neq 0 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "PATH=C:\Program Files\nodejs;%PATH%"
    ) else if exist "%APPDATA%\fnm\node-versions" (
        for /f "delims=" %%i in ('dir /b /ad "%APPDATA%\fnm\node-versions"') do (
            set "PATH=%APPDATA%\fnm\node-versions\%%i\installation;%PATH%"
        )
    ) else if exist "%USERPROFILE%\.nvm" (
        for /f "delims=" %%i in ('dir /b /ad "%USERPROFILE%\.nvm"') do (
            set "PATH=%USERPROFILE%\.nvm\%%i;%PATH%"
        )
    )
)

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Install from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found:
node --version

echo.
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
)

echo.
echo ============================================================
echo  Server starting at http://localhost:3000
echo  Press Ctrl+C to stop
echo ============================================================
echo.

node server.js

echo.
echo Server stopped.
pause