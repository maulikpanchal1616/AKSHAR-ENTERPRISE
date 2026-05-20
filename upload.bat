@echo off
echo ===================================================
echo   AXAR ENTERPRISE - AUTOMATED GITHUB UPLOADER
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/5] Initializing Git...
git init

echo [2/5] Staging files...
git add .

echo [3/5] Creating commit...
git commit -m "feat: complete premium industrial UI modernization, responsive platforms, and chatbot scrolling polish"

echo [4/5] Setting branch to main...
git branch -M main

echo [5/5] Connecting to remote origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/maulikpanchal1616/AKSHAR-ENTERPRISE.git

echo.
echo [FINAL] Pushing to GitHub (main branch)...
git push -u origin main

echo.
echo ===================================================
echo   UPLOAD COMPLETE! Press any key to exit.
echo ===================================================
pause
