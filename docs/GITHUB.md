# GitHub Publishing

## Option A: Use GitHub CLI

Install and log in:

```powershell
winget install GitHub.cli
gh auth login
```

Create a public repository and push:

```powershell
gh repo create promo-relay-station --public --source . --remote origin --push
```

## Option B: Use an Existing Remote

Create a repository on GitHub, then run:

```powershell
git remote add origin https://github.com/<owner>/<repo>.git
git branch -M main
git push -u origin main
```

## Before Pushing

Run:

```powershell
git status --short
git ls-files
```

Confirm that generated assets, drafts, reports, screenshots, temporary files,
credentials, cookies, and `.env` files are not staged.
