@echo off
cls
color 0B
echo.
echo ████████████████████████████████████████████████████████████
echo █                                                          █
echo █    🔗 BIZZY - GET YOUR SHAREABLE LINKS! 🔗              █
echo █                                                          █
echo ████████████████████████████████████████████████████████████
echo.
echo 🚀 DEPLOY OPTIONS FOR SHAREABLE LINKS:
echo.
echo 1️⃣  RAILWAY (RECOMMENDED - 30 seconds)
echo    → Go to: https://railway.app
echo    → Connect GitHub and deploy
echo    → Get link: https://your-bizzy-app.railway.app
echo.
echo 2️⃣  HEROKU (Classic - 2 minutes)
echo    → heroku create your-bizzy-app
echo    → Get link: https://your-bizzy-app.herokuapp.com
echo.
echo 3️⃣  VERCEL (Fast - 1 minute)
echo    → vercel --prod
echo    → Get link: https://your-bizzy-app.vercel.app
echo.
echo 📱 ONCE DEPLOYED, SHARE THESE LINKS:
echo    🌐 Main app: [your-deployed-url]
echo    📄 Landing page: [your-deployed-url]
echo    💰 Pricing: [your-deployed-url]/payments
echo    🔐 Sign up: [your-deployed-url]/signup
echo.
echo 📢 SOCIAL MEDIA READY:
echo    ✅ Marketing kit created: MARKETING-KIT.md
echo    ✅ Branding guide ready: BRANDING-GUIDE.md
echo    ✅ Professional meta tags added
echo    ✅ Social preview images configured
echo.
echo 💡 NEXT STEPS:
echo    1. Deploy to get your link
echo    2. Create logo using BRANDING-GUIDE.md
echo    3. Use MARKETING-KIT.md for social posts
echo    4. Share and start making money!
echo.
pause
echo.
echo Starting local version for testing...
start http://localhost:8080
npm start