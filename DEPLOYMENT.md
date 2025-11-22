# Deployment Guide

This guide covers deploying "The Expert - English Study Companion" to GitHub Pages and custom domains.

## 🚀 Quick Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push to main branch:**
   ```bash
   git checkout main
   git merge cursor/review-and-fix-repository-errors-composer-1-09d2
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to **Actions** tab in your repository
   - Watch the workflow run
   - Once complete, your site will be live at:
     - `https://English.hero1.onlne` (after DNS setup)
     - `https://doctororganic.github.io/Khaled-K-E/` (temporary, before custom domain)

### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# The dist folder contains your production build
# You can upload the contents of dist/ to any static hosting service
```

## 🌐 Custom Domain Setup

### For GitHub Pages with Custom Domain: English.hero1.onlne

✅ **Already configured!** The CNAME file and vite.config.ts are set up.

**Next steps:**

1. **Configure DNS** (at your domain provider - hero1.onlne):
   - **Option A (Recommended):** Create a **CNAME record**:
     - **Name/Host:** `English` (or `@` if it's the root domain)
     - **Value/Target:** `doctororganic.github.io`
     - **TTL:** 3600 (or default)
   
   - **Option B:** Create **A records**:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

2. **Enable custom domain in GitHub:**
   - Go to repository **Settings** → **Pages**
   - Under **Custom domain**, enter: `English.hero1.onlne`
   - Click **Save**
   - Wait a few minutes, then check **Enforce HTTPS** (will be available after DNS propagates)

3. **Verify DNS propagation:**
   ```bash
   # Check if DNS is working (wait 5-30 minutes after setup)
   nslookup English.hero1.onlne
   # Should return GitHub Pages IP addresses
   ```

4. **Your site will be live at:**
   - `https://English.hero1.onlne` (after DNS propagates, usually 5-30 minutes)

### For Your Own Server:

#### Option A: Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/the-expert/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Option B: Apache Configuration

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/the-expert/dist
    
    <Directory /var/www/the-expert/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Handle React Router
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</VirtualHost>
```

#### Deployment Steps:

```bash
# 1. Build the project
npm run build

# 2. Upload dist/ folder to your server
scp -r dist/* user@your-server:/var/www/the-expert/dist/

# Or use rsync
rsync -avz --delete dist/ user@your-server:/var/www/the-expert/dist/
```

## 🔧 Environment Variables

If you need environment variables (like API keys):

1. **For GitHub Pages:** Use GitHub Secrets
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Add your secrets there
   - Update the workflow to use them

2. **For your server:** Create `.env.production` file
   ```bash
   GEMINI_API_KEY=your_key_here
   ```

## 📝 Production Checklist

- [ ] Update `base` path in `vite.config.ts` for your deployment
- [ ] Test the build locally: `npm run build && npm run preview`
- [ ] Verify all assets load correctly
- [ ] Check mobile responsiveness
- [ ] Test all features (speech synthesis, translations, etc.)
- [ ] Set up custom domain (if applicable)
- [ ] Enable HTTPS/SSL certificate
- [ ] Set up analytics (optional)

## 🐛 Troubleshooting

### Assets not loading (404 errors)
- Check the `base` path in `vite.config.ts` matches your deployment path
- For GitHub Pages: use `/repository-name/`
- For custom domain: use `/`

### Routing issues
- Ensure your server is configured to serve `index.html` for all routes
- Check the rewrite rules in your server config

### Build fails
- Check Node.js version (requires Node 18+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
