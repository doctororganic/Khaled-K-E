<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# The Expert - English Study Companion

An interactive study aid for Grades 10, 11, and 12 including Set Book questions and Writing Topics with TTS and translation features.

View your app in AI Studio: https://ai.studio/apps/drive/1JMu1jnWH_BlIT7CaKqX4pO6frCk2CjAU

## 🚀 Quick Start

### Run Locally

**Prerequisites:** Node.js 18+ 

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## 📦 Deployment

### GitHub Pages (Automatic)

1. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Select **Source**: **GitHub Actions**
   - Save

2. **Merge to main branch:**
   ```bash
   git checkout main
   git merge your-feature-branch
   git push origin main
   ```

3. **Your site will be live at:**
   - `https://doctororganic.github.io/Khaled-K-E/`

### Custom Domain

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on:
- Setting up custom domains
- Server deployment (Nginx/Apache)
- Environment variables
- Troubleshooting

## 🛠️ Development

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Lucide React

## 📚 Features

- ✅ Set Book Questions (Grades 10-12)
- ✅ Writing Topics with planning guides
- ✅ Text-to-Speech (TTS) pronunciation
- ✅ English/Arabic translations
- ✅ Mark questions as learned
- ✅ Responsive design

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [GitHub Actions Workflow](./.github/workflows/deploy.yml) - Auto-deployment configuration
