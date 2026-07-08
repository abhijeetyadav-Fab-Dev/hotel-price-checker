# Hotel Price Checker - MMT API Bulk Fetcher (PowerShell Launcher)
# Right-click this file → "Run with PowerShell" or run: .\run.ps1

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Hotel Price Checker - Bulk MMT API Fetcher" -ForegroundColor Cyan
Write-Host "============================================================"
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir
Write-Host "[DEBUG] Current directory: $PWD"
Write-Host ""

# [1/4] Check Node.js
Write-Host "[1/4] Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -ne 0) { throw "Node.js not found" }
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# [2/4] Check npm
Write-Host "[2/4] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($LASTEXITCODE -ne 0) { throw "npm not found" }
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: npm not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# [3/4] Install dependencies
Write-Host "[3/4] Installing dependencies (if needed)..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "Dependencies already installed. Skipping..." -ForegroundColor Green
} else {
    Write-Host "Running: npm install" -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: npm install failed" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "Dependencies installed successfully." -ForegroundColor Green
}
Write-Host ""

# [4/4] Start server
Write-Host "[4/4] Starting server on http://localhost:3000 ..." -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Press Ctrl+C to stop the server" -ForegroundColor Cyan
Write-Host "  Open http://localhost:3000 in your browser" -ForegroundColor Cyan
Write-Host "============================================================"
Write-Host ""

try {
    npm start
} catch {
    Write-Host "Server stopped." -ForegroundColor Yellow
}

Read-Host "Press Enter to close this window"