# GitHub Pages Setup Guide

## Step-by-Step Guide to Host Your Portfolio on GitHub Pages

### Prerequisites
- Git installed on your computer
- GitHub account
- Your portfolio files ready

---

## Option 1: Quick Setup (Using the Deployment Script)

1. **Run the deployment script**:
```bash
cd /Users/goutham.vignesh@iqvia.com/Workspace/GouthamVicky
./deploy.sh
```

2. **Follow the prompts** to commit and push your changes

3. **Enable GitHub Pages** (see steps below)

---

## Option 2: Manual Setup

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the `+` icon in the top right corner
3. Select "New repository"
4. Repository settings:
   - **Name**: `GouthamVicky` (or `portfolio` or `your-username.github.io`)
   - **Description**: "My personal portfolio website"
   - **Visibility**: Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 2: Initialize Git and Push to GitHub

Open Terminal and run these commands:

```bash
# Navigate to your portfolio directory
cd /Users/goutham.vignesh@iqvia.com/Workspace/GouthamVicky

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Portfolio website"

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/GouthamVicky.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on the **"Settings"** tab
3. In the left sidebar, scroll down and click **"Pages"**
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` and `/ (root)`
   - Click **"Save"**

5. Wait a few minutes for GitHub to build your site

6. Your site will be live at: `https://YOUR_USERNAME.github.io/GouthamVicky/`

---

## Option 3: Use GitHub Desktop (GUI Method)

If you prefer a graphical interface:

1. **Download and install** [GitHub Desktop](https://desktop.github.com/)

2. **Add your repository**:
   - Open GitHub Desktop
   - File → Add Local Repository
   - Choose your portfolio folder

3. **Create repository on GitHub**:
   - Repository → Push to GitHub
   - Fill in repository name and description
   - Choose "Public"
   - Click "Publish repository"

4. **Enable GitHub Pages** (follow Step 3 from Option 2)

---

## Verification

After enabling GitHub Pages:

1. **Check deployment status**:
   - Go to your repository
   - Click on "Actions" tab
   - You should see a workflow running (pages-build-deployment)

2. **Access your site**:
   - Once the workflow completes (green checkmark)
   - Visit: `https://YOUR_USERNAME.github.io/GouthamVicky/`

3. **If the page doesn't load**:
   - Wait 5-10 minutes
   - Clear your browser cache
   - Check that GitHub Pages is enabled in Settings

---

## Updating Your Portfolio

After making changes to your portfolio:

### Using the Script:
```bash
./deploy.sh
```

### Manually:
```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub Pages will automatically rebuild and deploy within a few minutes.

---

## Custom Domain (Optional)

To use a custom domain (e.g., gouthamvignesh.com):

1. **Buy a domain** from a domain registrar (GoDaddy, Namecheap, etc.)

2. **Add CNAME file** to your repository:
```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

3. **Configure DNS** at your domain registrar:
   - Add a CNAME record: `www` → `YOUR_USERNAME.github.io`
   - Add A records for apex domain:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

4. **Update GitHub Pages settings**:
   - Go to Settings → Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

---

## Troubleshooting

### Issue: "Repository not found" error
**Solution**: Make sure the repository exists on GitHub and the remote URL is correct:
```bash
git remote -v  # Check remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/GouthamVicky.git
```

### Issue: Changes not appearing on the site
**Solution**:
1. Wait 5-10 minutes for GitHub Pages to rebuild
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Check the Actions tab for deployment status

### Issue: 404 error when visiting site
**Solution**:
1. Verify GitHub Pages is enabled in Settings
2. Check that `index.html` is in the root directory
3. Ensure the repository is public

### Issue: Styles/scripts not loading
**Solution**:
- Check that all file paths in `index.html` are relative (not absolute)
- Verify CSS and JS files are committed and pushed

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

---

## Support

If you encounter any issues:
1. Check the GitHub Pages documentation
2. Review the Actions tab for error messages
3. Ensure all prerequisites are met
4. Try the deployment script for automated setup

**Need help?** Open an issue in the repository or contact via email: gouthamvigneshs@gmail.com

---

**Happy deploying! 🚀**


