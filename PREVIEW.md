# 🖥️ Local Preview Guide

## Browser Preview

Since I cannot directly open a browser in this environment, here's how to preview your app:

### Option 1: Development Server (Recommended)

The dev server is already running! Access it at:

**🌐 http://localhost:3000**

If you need to restart it:
```bash
npm run dev
```

### Option 2: Production Preview

Build and preview the production version:

```bash
npm run build
npm run preview
```

This will start a preview server (usually on port 4173).

### Option 3: VS Code Live Preview

If you're using VS Code:
1. Install the "Live Preview" extension
2. Right-click on `index.html`
3. Select "Show Preview"

### Option 4: Browser Extension

Use a local server extension:
- **Live Server** (VS Code extension)
- **http-server** (npm package): `npx http-server dist -p 8080`

## 🔍 Testing Features

When previewing, test:
- ✅ Grade selection (10, 11, 12)
- ✅ Unit navigation
- ✅ Question/Answer reveal
- ✅ Translation toggle
- ✅ Text-to-Speech (speaker icon)
- ✅ Mark as learned
- ✅ Writing topics
- ✅ Responsive design (mobile/tablet)

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

**Changes not reflecting:**
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Restart dev server
