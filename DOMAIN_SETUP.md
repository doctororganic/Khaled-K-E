# 🌐 Domain Setup: English.hero1.onlne

## Quick Setup Checklist

- [x] CNAME file created with your domain
- [x] vite.config.ts configured for custom domain (base: '/')
- [x] GitHub Actions workflow ready
- [ ] DNS configured at domain provider
- [ ] Custom domain enabled in GitHub Pages settings
- [ ] HTTPS enforced (after DNS propagates)

## Step-by-Step Instructions

### 1. Configure DNS (At Your Domain Provider)

Go to your domain provider's DNS management panel (where you manage hero1.onlne):

**Option A: CNAME Record (Recommended)**
```
Type: CNAME
Name/Host: English
Value/Target: doctororganic.github.io
TTL: 3600 (or default)
```

**Option B: A Records (Alternative)**
```
Type: A
Name/Host: English
Value: 185.199.108.153
TTL: 3600

Type: A
Name/Host: English
Value: 185.199.109.153
TTL: 3600

Type: A
Name/Host: English
Value: 185.199.110.153
TTL: 3600

Type: A
Name/Host: English
Value: 185.199.111.153
TTL: 3600
```

### 2. Enable Custom Domain in GitHub

1. Go to: https://github.com/doctororganic/Khaled-K-E/settings/pages
2. Under **Custom domain**, enter: `English.hero1.onlne`
3. Click **Save**
4. Wait 5-30 minutes for DNS to propagate
5. Return to the same page and check **Enforce HTTPS** (checkbox will appear when DNS is ready)

### 3. Deploy Your Code

```bash
# Make sure all changes are committed
git add .
git commit -m "Configure for custom domain English.hero1.onlne"
git push origin main
```

The GitHub Actions workflow will automatically deploy your site.

### 4. Verify Everything Works

1. **Check DNS propagation:**
   ```bash
   nslookup English.hero1.onlne
   # Should return GitHub Pages IPs
   ```

2. **Test your site:**
   - Visit: `https://English.hero1.onlne`
   - Should load your app
   - Check browser console for any errors

3. **Verify HTTPS:**
   - After DNS propagates, HTTPS should work automatically
   - If not, wait a bit longer and check "Enforce HTTPS" in GitHub Pages settings

## Troubleshooting

### DNS Not Working
- Wait 30-60 minutes (DNS can take time to propagate)
- Double-check DNS records at your domain provider
- Verify CNAME points to `doctororganic.github.io` (no trailing slash)

### HTTPS Not Available
- DNS must propagate first (can take up to 24 hours, usually 5-30 minutes)
- Make sure "Enforce HTTPS" is checked in GitHub Pages settings
- Clear browser cache and try again

### Site Shows GitHub 404
- Verify the CNAME file is in the `public/` folder
- Check that `vite.config.ts` has `base: '/'`
- Ensure GitHub Actions workflow completed successfully
- Check GitHub Pages settings show your custom domain

### Assets Not Loading
- Verify `vite.config.ts` has `base: '/'` (not '/Khaled-K-E/')
- Clear browser cache
- Check browser console for 404 errors

## Current Configuration

- **Domain:** English.hero1.onlne
- **CNAME File:** `public/CNAME` ✅
- **Base Path:** `/` (configured in vite.config.ts) ✅
- **GitHub Repository:** doctororganic/Khaled-K-E
- **GitHub Pages URL:** https://doctororganic.github.io/Khaled-K-E/

## Need Help?

If you encounter issues:
1. Check GitHub Actions logs (Actions tab)
2. Verify DNS records are correct
3. Wait for DNS propagation (can take time)
4. Check GitHub Pages settings
