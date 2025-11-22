#!/bin/bash
# Script to enable GitHub Pages via GitHub API
# This requires a GitHub Personal Access Token with repo and admin:repo_hook permissions

set -e

REPO_OWNER="doctororganic"
REPO_NAME="Khaled-K-E"
REPO_FULL="${REPO_OWNER}/${REPO_NAME}"

echo "🔧 Attempting to enable GitHub Pages for ${REPO_FULL}..."

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found, using it..."
    
    # Check if authenticated
    if gh auth status &> /dev/null; then
        echo "✅ GitHub CLI authenticated"
        
        # Enable Pages via GitHub CLI
        echo "📝 Enabling GitHub Pages..."
        gh api repos/${REPO_FULL}/pages \
            -X POST \
            -f source='{"branch":"main","path":"/root"}' \
            --jq '.' || {
            
            # If that fails, try setting source to GitHub Actions
            echo "⚠️  Direct Pages API not available, trying alternative method..."
            echo "📝 Please enable GitHub Pages manually:"
            echo "   1. Go to: https://github.com/${REPO_FULL}/settings/pages"
            echo "   2. Under 'Source', select 'GitHub Actions'"
            echo "   3. Click 'Save'"
        }
    else
        echo "❌ GitHub CLI not authenticated"
        echo "   Run: gh auth login"
        exit 1
    fi
else
    echo "⚠️  GitHub CLI not found"
    echo ""
    echo "📝 To enable GitHub Pages manually:"
    echo "   1. Go to: https://github.com/${REPO_FULL}/settings/pages"
    echo "   2. Under 'Source', select 'GitHub Actions'"
    echo "   3. Click 'Save'"
    echo ""
    echo "💡 Or install GitHub CLI:"
    echo "   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg"
    echo "   echo \"deb [arch=\$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main\" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null"
    echo "   sudo apt update && sudo apt install gh"
    echo "   gh auth login"
fi
