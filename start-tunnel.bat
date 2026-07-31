@echo off
cd /d "%~dp0"
echo ========================================
echo  Boom Cafe - Tunnel Launcher
echo ========================================
echo.
echo Step 1: Starting Vite dev server...
start "Vite" cmd /c "npx vite --host --port 5173"
echo.
echo Waiting 8 seconds for Vite to start...
ping 127.0.0.1 -n 8 >nul
echo.
echo Step 2: Checking if Vite is running...
curl -s http://localhost:5173 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Vite might not be ready yet. Waiting 5 more seconds...
    ping 127.0.0.1 -n 5 >nul
)
echo.
echo Step 3: Starting localtunnel...
echo Your public URL will appear below:
echo.
npx --yes localtunnel --port 5173
echo.
pause