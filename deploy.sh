#!/bin/bash

# Portfolio Deployment Script
# This script helps deploy your portfolio to GitHub Pages

echo "🚀 Portfolio Deployment Script"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
    echo ""
fi

# Check for changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Changes detected. Staging files..."
    git add .
    
    # Get commit message
    echo ""
    read -p "Enter commit message (or press Enter for default): " commit_msg
    
    if [ -z "$commit_msg" ]; then
        commit_msg="Update portfolio website"
    fi
    
    echo ""
    echo "💾 Committing changes..."
    git commit -m "$commit_msg"
    echo "✅ Changes committed"
    echo ""
else
    echo "✅ No changes to commit"
    echo ""
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo "🔗 No remote repository found."
    echo ""
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/GouthamVicky.git): " repo_url
    
    if [ ! -z "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "✅ Remote repository added"
        echo ""
    else
        echo "❌ No repository URL provided. Skipping push."
        exit 1
    fi
fi

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "🔄 Switching to main branch..."
    git branch -M main
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
if git push -u origin main; then
    echo ""
    echo "✅ Successfully deployed to GitHub!"
    echo ""
    echo "🌐 Your portfolio will be available at:"
    
    # Extract username from remote URL
    remote_url=$(git config --get remote.origin.url)
    if [[ $remote_url =~ github\.com[:/]([^/]+)/ ]]; then
        username="${BASH_REMATCH[1]}"
        echo "   https://$username.github.io/GouthamVicky/"
    else
        echo "   https://YOUR_USERNAME.github.io/GouthamVicky/"
    fi
    
    echo ""
    echo "📌 Next steps:"
    echo "   1. Go to your GitHub repository"
    echo "   2. Navigate to Settings > Pages"
    echo "   3. Select 'main' branch as source"
    echo "   4. Click 'Save'"
    echo "   5. Wait a few minutes for deployment"
    echo ""
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo "💡 Make sure you have:"
    echo "   - Created the repository on GitHub"
    echo "   - Set up authentication (SSH or Personal Access Token)"
    echo "   - Have push access to the repository"
    echo ""
fi

echo "================================"
echo "🎉 Deployment script completed!"


