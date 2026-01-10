@echo off
cls
color 0E
echo.
echo ████████████████████████████████████████████████████████████
echo █                                                          █
echo █    📡 CONNECT BIZZY TO GITHUB & DEPLOY! 📡              █
echo █                                                          █
echo ████████████████████████████████████████████████████████████
echo.
echo 🚀 STEP-BY-STEP GITHUB DEPLOYMENT:
echo.
echo 1️⃣  CREATE GITHUB REPOSITORY:
echo    → Go to: https://github.com/new
echo    → Repository name: bizzy-invoicing
echo    → Make it Public
echo    → Click "Create repository"
echo.
echo 2️⃣  CONNECT YOUR CODE TO GITHUB:
echo    → Copy the commands GitHub shows you
echo    → Run them in this folder
echo.
echo 3️⃣  DEPLOY TO RAILWAY (EASIEST):
echo    → Go to: https://railway.app
echo    → Click "Deploy from GitHub repo"
echo    → Select your bizzy-invoicing repo
echo    → Add environment variables:
echo      * STRIPE_SECRET_KEY=your_stripe_key
echo      * STRIPE_PUBLISHABLE_KEY=your_publishable_key  
echo      * JWT_SECRET=bizzy_production_2024
echo    → Click Deploy!
echo.
echo 🔗 YOU'LL GET A LIVE LINK LIKE:
echo    https://bizzy-invoicing-production.railway.app
echo.
echo 📱 SHARE THIS LINK EVERYWHERE:
echo    ✅ Social media posts
echo    ✅ Email signatures  
echo    ✅ Business cards
echo    ✅ LinkedIn profile
echo.
echo Press any key to open GitHub...
pause
start https://github.com/new
echo.
echo After creating repo, run these commands:
echo.
echo git init
echo git add .
echo git commit -m "Launch BIZZY invoicing app"
echo git branch -M main
echo git remote add origin https://github.com/YOUR_USERNAME/bizzy-invoicing.git
echo git push -u origin main
echo.
echo Then deploy on Railway.app!
pause