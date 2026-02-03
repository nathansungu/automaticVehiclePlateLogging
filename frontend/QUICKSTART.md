# ⚡ Quick Start Guide

Get the MUT Vehicle Check-In React frontend running in 5 minutes!

## 📋 Prerequisites

Make sure you have installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

Check your versions:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

## 🚀 Installation Steps

### 1. Extract and Navigate
```bash
cd react-frontend
```

### 2. Install Dependencies
```bash
npm install
```
This will take 1-2 minutes...

### 3. Setup Environment
```bash
cp .env.example .env
```

Open `.env` and verify:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
Navigate to: **http://localhost:3000**

## 🎉 You're Done!

You should see the login page. Click **"Continue with Demo Account"** to explore the dashboard without a backend.

## 🔌 Connecting to Backend

If you have the backend API running:

1. Make sure backend is running on port 5000
2. The frontend will automatically connect
3. Use real login credentials

## 📱 What You'll See

- **Login Page** - Modern authentication interface
- **Dashboard** - Real-time stats and check-ins
- **Sidebar Navigation** - Access all features
- **Responsive Design** - Works on all devices

## 🛠️ Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

## ❓ Troubleshooting

### Port 3000 Already in Use?
Edit `vite.config.js` and change the port:
```javascript
server: {
  port: 3001  // or any available port
}
```

### Can't Install Dependencies?
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Page Won't Load?
- Check if dev server is running
- Try clearing browser cache
- Check browser console for errors

## 📚 Next Steps

1. Explore the dashboard and features
2. Check out `README.md` for detailed documentation
3. Review the code structure in `src/`
4. Start customizing for your needs!

## 💡 Tips

- Use **React DevTools** browser extension for debugging
- Hot reload is enabled - changes appear instantly
- Check `src/components/` for reusable components
- API services are in `src/services/api.js`
- State management is in `src/store/index.js`

## 🆘 Need Help?

- Read the full `README.md`
- Check the code comments
- Contact IT Support: support@mut.ac.ke

---

**Happy Coding! 🚀**
