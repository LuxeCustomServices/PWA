@echo off
cls
echo 🔧 FIXING GITHUB CONNECTION...
echo.
echo Run these commands one by one:
echo.
echo 1. Remove existing origin:
echo git remote remove origin
echo.
echo 2. Add correct origin (replace YOUR_USERNAME):
echo git remote add origin https://github.com/Luxecustomshop24/bizzy-invoicing.git
echo.
echo 3. Push to GitHub:
echo git push -u origin main
echo.
echo ⚠️  MAKE SURE:
echo - Repository exists at: https://github.com/Luxecustomshop24/bizzy-invoicing
echo - Repository name is exactly: bizzy-invoicing
echo - Repository is public
echo.
echo If repo doesn't exist, create it at: https://github.com/new
echo.
pause