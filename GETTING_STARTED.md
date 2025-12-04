x# Getting Started with Your Portfolio Website

## 🎉 Welcome!

Your portfolio website has been successfully created! This modern, futuristic website showcases your work as a Machine Learning Engineer.

---

## 📁 What's Been Created

Your portfolio includes the following files:

```
GouthamVicky/
├── index.html                 # Main website file
├── styles.css                 # All styling and animations
├── script.js                  # Interactive features and effects
├── GouthamVigneshCV.pdf      # Your resume (already present)
├── .nojekyll                 # GitHub Pages configuration
├── README.md                 # Your GitHub profile README
├── PORTFOLIO_README.md       # Portfolio documentation
├── GITHUB_PAGES_SETUP.md    # Detailed GitHub Pages setup guide
├── GETTING_STARTED.md       # This file
├── deploy.sh                # Automated deployment script
└── serve.sh                 # Local testing server script
```

---

## 🚀 Quick Start Guide

### Step 1: Test Your Website Locally

Before deploying, test your website on your local machine:

```bash
# Navigate to your portfolio directory
cd /Users/goutham.vignesh@iqvia.com/Workspace/GouthamVicky

# Start the local server
./serve.sh
```

Then open your browser and visit: **http://localhost:8080**

Press `Ctrl+C` in the terminal to stop the server when you're done.

---

### Step 2: Deploy to GitHub Pages

#### Option A: Using the Deployment Script (Easiest)

```bash
# Navigate to your portfolio directory
cd /Users/goutham.vignesh@iqvia.com/Workspace/GouthamVicky

# Run the deployment script
./deploy.sh
```

Follow the prompts to commit and push your changes.

#### Option B: Manual Deployment

1. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `GouthamVicky`
   - Keep it public and don't initialize with any files

2. **Push your code**:
```bash
cd /Users/goutham.vignesh@iqvia.com/Workspace/GouthamVicky
git init
git add .
git commit -m "Initial commit: Portfolio website"
git remote add origin https://github.com/YOUR_USERNAME/GouthamVicky.git
git branch -M main
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch
   - Click "Save"

4. **Access your live site**:
   - Your site will be live at: `https://YOUR_USERNAME.github.io/GouthamVicky/`
   - Wait 2-5 minutes for initial deployment

For detailed instructions, see: `GITHUB_PAGES_SETUP.md`

---

## 🎨 Customization Guide

### Update Personal Information

1. **Open `index.html`** in your preferred editor
2. **Find and update**:
   - Your name and title
   - About section content
   - Contact links (LinkedIn, email, GitHub)
   - Experience and education details
   - Projects and achievements

### Change Colors and Theme

1. **Open `styles.css`**
2. **Modify the `:root` section** at the top:

```css
:root {
    --accent-cyan: #38bdf8;      /* Primary accent color */
    --accent-green: #22c55e;     /* Success/status color */
    --accent-purple: #a78bfa;    /* Secondary accent */
    --accent-yellow: #fbbf24;    /* Highlight color */
}
```

Try these color schemes:
- **Purple/Pink**: `#a78bfa` and `#ec4899`
- **Green/Blue**: `#10b981` and `#3b82f6`
- **Orange/Red**: `#f97316` and `#ef4444`

### Add Your Own Projects

1. **Open `index.html`**
2. **Find the Projects section** (`id="projects"`)
3. **Copy a project card** and modify:

```html
<div class="project-card">
    <div class="project-header">
        <span class="project-badge">ML</span>
        <span class="project-status">Production</span>
    </div>
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-description">Your project description...</p>
    <div class="project-tech">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">TensorFlow</span>
    </div>
</div>
```

---

## 🔧 Maintenance

### Update Your Portfolio

After making changes:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

Or simply run:
```bash
./deploy.sh
```

Changes will appear on your live site within 2-5 minutes.

### Update Your Resume

Replace `GouthamVigneshCV.pdf` with your new resume, keeping the same filename, or update the filename in `index.html`:

```html
<a href="YOUR_NEW_RESUME.pdf" target="_blank" class="btn btn-secondary">
```

---

## ✨ Features

Your portfolio includes:

- **Matrix Rain Animation**: Animated background with falling characters
- **Smooth Scrolling**: Seamless navigation between sections
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Interactive Elements**: 
  - Animated stat counters
  - Hover effects on cards
  - Particle effects on buttons
  - Terminal-style typing effects
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Fast Loading**: Optimized for performance

---

## 📱 Testing Checklist

Before deploying, test these features:

- [ ] Navigation links scroll to correct sections
- [ ] All external links (LinkedIn, GitHub) work correctly
- [ ] Resume PDF downloads when clicked
- [ ] Website is responsive (test on mobile view)
- [ ] All animations work smoothly
- [ ] Contact section appears correctly
- [ ] No console errors in browser DevTools

---

## 🐛 Troubleshooting

### Website looks broken locally
- Make sure you're using `./serve.sh` to run a local server
- Don't open `index.html` directly in browser (file:// URLs won't work correctly)

### Changes not showing on GitHub Pages
- Wait 5-10 minutes for GitHub to rebuild
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check the "Actions" tab in your repository for deployment status

### Fonts not loading
- Check your internet connection (fonts load from Google Fonts)
- Wait for the page to fully load

### Animations not working
- Make sure JavaScript is enabled in your browser
- Check browser console for errors (F12 → Console tab)

---

## 📚 Additional Resources

- **Detailed Setup**: See `GITHUB_PAGES_SETUP.md`
- **Portfolio Documentation**: See `PORTFOLIO_README.md`
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **HTML/CSS Reference**: https://developer.mozilla.org/

---

## 🎯 Next Steps

1. ✅ Test your website locally (`./serve.sh`)
2. ✅ Customize content in `index.html`
3. ✅ Update colors/theme if desired
4. ✅ Replace sample projects with your own
5. ✅ Deploy to GitHub Pages (`./deploy.sh`)
6. ✅ Share your portfolio URL on LinkedIn!

---

## 📧 Need Help?

If you encounter any issues:
- Check the troubleshooting section above
- Review the documentation files
- Open an issue on GitHub
- Email: gouthamvigneshs@gmail.com

---

## 🎉 Congratulations!

You now have a professional, modern portfolio website. Share it with potential employers, colleagues, and on your social media profiles!

**Your Portfolio URL**: `https://YOUR_USERNAME.github.io/GouthamVicky/`

---

**Built with 💙 by Goutham Vignesh**

*Last Updated: November 2025*


