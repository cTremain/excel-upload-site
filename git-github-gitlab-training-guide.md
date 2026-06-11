# Git, GitHub, and GitLab Training Guide

## Purpose

This guide is for training incoming interns on how to use Git, GitHub, and GitLab in a practical software project workflow.

By the end, interns should understand:

- What Git does
- What GitHub and GitLab do
- How to clone, commit, push, and pull code
- How to create branches
- How to open pull requests or merge requests
- How to avoid common mistakes

## Key Concepts

### Git

Git is a version control tool installed on your computer. It tracks changes to files over time.

Git answers questions like:

- What changed?
- Who changed it?
- When was it changed?
- Can we go back to an older version?

### GitHub

GitHub is an online platform that stores Git repositories in the cloud.

Teams use GitHub to:

- Share code
- Review changes
- Track issues
- Manage branches
- Collaborate through pull requests

### GitLab

GitLab is similar to GitHub. It also stores Git repositories online and supports collaboration.

Teams use GitLab to:

- Share code
- Review changes
- Track issues
- Run CI/CD pipelines
- Collaborate through merge requests

### Repository

A repository, or repo, is a project folder tracked by Git.

Example:

```text
excel-upload-site/
├── README.md
├── server.py
├── public/
└── requirement.md
```

### Commit

A commit is a saved snapshot of your changes.

Good commit message:

```text
Add upload validation for Excel files
```

Poor commit message:

```text
stuff
```

### Branch

A branch is a separate line of work. Branches let you make changes without immediately affecting the main version of the project.

Common branch names:

```text
main
feature/upload-history
fix/download-error
docs/update-readme
```

### Pull Request

On GitHub, a pull request is a request to merge your branch into another branch, usually `main`.

### Merge Request

On GitLab, a merge request is the same idea as a GitHub pull request.

## Basic Git Setup

Install Git from:

```text
https://git-scm.com/downloads
```

Check that Git is installed:

```powershell
git --version
```

Set your name:

```powershell
git config --global user.name "Your Name"
```

Set your email:

```powershell
git config --global user.email "your.email@example.com"
```

Check your settings:

```powershell
git config --global --list
```

## Daily Git Workflow

### 1. Get The Latest Code

Before starting work:

```powershell
git pull
```

This downloads the latest changes from GitHub or GitLab.

### 2. Check Current Status

```powershell
git status
```

This shows:

- Changed files
- New files
- Deleted files
- Current branch

### 3. Create A Branch

Use a branch for every task.

```powershell
git checkout -b feature/my-change
```

Example:

```powershell
git checkout -b feature/upload-history
```

### 4. Make Changes

Edit the project files.

### 5. Review Changes

```powershell
git status
```

See detailed changes:

```powershell
git diff
```

### 6. Stage Files

Stage all changes:

```powershell
git add .
```

Stage one file:

```powershell
git add README.md
```

### 7. Commit Changes

```powershell
git commit -m "Describe the change"
```

Example:

```powershell
git commit -m "Add download success message"
```

### 8. Push Branch

```powershell
git push -u origin feature/my-change
```

After the first push, later pushes can usually be:

```powershell
git push
```

### 9. Open A Pull Request Or Merge Request

On GitHub:

- Go to the repository
- Click **Pull requests**
- Click **New pull request**
- Choose your branch
- Add a description
- Request review

On GitLab:

- Go to the repository
- Click **Merge requests**
- Click **New merge request**
- Choose your branch
- Add a description
- Request review

## Common Commands

Check Git version:

```powershell
git --version
```

Clone a repo:

```powershell
git clone https://github.com/USERNAME/REPO.git
```

Go into a repo:

```powershell
cd repo-name
```

Check status:

```powershell
git status
```

Get latest changes:

```powershell
git pull
```

Create and switch to a branch:

```powershell
git checkout -b branch-name
```

Switch branches:

```powershell
git checkout branch-name
```

See branches:

```powershell
git branch
```

Stage changes:

```powershell
git add .
```

Commit changes:

```powershell
git commit -m "Message"
```

Push changes:

```powershell
git push
```

See commit history:

```powershell
git log --oneline
```

## GitHub Workflow

Use GitHub when the project is hosted on GitHub.

Typical workflow:

```text
Pull latest main
Create branch
Make changes
Commit changes
Push branch
Open pull request
Review
Merge
Delete branch
```

Recommended pull request description:

```text
## Summary
- Added a visible download link after Excel export
- Updated status text after download

## Testing
- Uploaded a sample .xlsx file
- Edited a cell
- Downloaded the edited workbook
- Confirmed the edit opened in Excel
```

## GitLab Workflow

Use GitLab when the project is hosted on GitLab.

Typical workflow:

```text
Pull latest main
Create branch
Make changes
Commit changes
Push branch
Open merge request
Review
Merge
Delete branch
```

Recommended merge request description:

```text
## Summary
- Added upload validation
- Improved download error message

## Testing
- Tested valid .xlsx upload
- Tested invalid file type
- Tested edited workbook download
```

## Good Commit Messages

Use short, clear commit messages.

Good examples:

```text
Add Excel upload endpoint
Fix download status message
Update README run instructions
Ignore local log files
```

Avoid:

```text
update
fix
changes
asdf
work stuff
```

## What Not To Commit

Do not commit:

- Passwords
- API keys
- `.env` files
- Uploaded user files
- Local logs
- Temporary test files
- Large generated files
- Personal data

Use `.gitignore` to keep these files out of Git.

Example `.gitignore`:

```text
uploads/
*.log
__pycache__/
*.pyc
*.xlsx
.env
```

## Common Problems

### Problem: `git` Is Not Recognized

Meaning:

Git is not installed or not on PATH.

Fix:

Install Git, close PowerShell, reopen PowerShell, then run:

```powershell
git --version
```

### Problem: Nothing Added To Commit

Example:

```text
nothing added to commit but untracked files present
```

Meaning:

Git sees files, but they have not been staged.

Fix:

```powershell
git add .
git commit -m "Add project files"
```

### Problem: Push Rejected

Example:

```text
Updates were rejected because the remote contains work that you do not have locally
```

Meaning:

GitHub or GitLab has commits that your local repo does not have.

Fix for normal team work:

```powershell
git pull
```

Then resolve any conflicts, commit, and push again.

Only use force push if a lead developer tells you to.

### Problem: Merge Conflict

Meaning:

Two people changed the same part of the same file.

Fix:

1. Open the conflicted file.
2. Look for conflict markers:

```text
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```

3. Edit the file so it contains the correct final version.
4. Save the file.
5. Run:

```powershell
git add .
git commit -m "Resolve merge conflict"
git push
```

## Recommended Rules For Interns

1. Always run `git status` before starting work.
2. Always pull the latest `main` before creating a branch.
3. Never work directly on `main` unless told to.
4. Use clear branch names.
5. Make small commits.
6. Write clear commit messages.
7. Never commit secrets or private files.
8. Open a pull request or merge request for review.
9. Ask before force pushing.
10. Ask before deleting branches or files.

## Hands-On Exercise

Use this exercise to train interns.

### Exercise Goal

Make a small documentation change, commit it, push it, and open a review request.

### Steps

1. Clone the repository:

```powershell
git clone https://github.com/USERNAME/REPO.git
```

2. Enter the project:

```powershell
cd REPO
```

3. Check status:

```powershell
git status
```

4. Create a branch:

```powershell
git checkout -b docs/intern-practice
```

5. Edit `README.md`.

6. Check status:

```powershell
git status
```

7. Stage the file:

```powershell
git add README.md
```

8. Commit:

```powershell
git commit -m "Update README practice note"
```

9. Push:

```powershell
git push -u origin docs/intern-practice
```

10. Open a pull request on GitHub or a merge request on GitLab.

11. Request review.

12. After approval, merge the request.

## Quick Reference

Most common commands:

```powershell
git status
git pull
git checkout -b feature/name
git add .
git commit -m "Message"
git push -u origin feature/name
```

Clean working tree message:

```text
nothing to commit, working tree clean
```

That means everything is committed.

## Final Notes

Git is safest when used in small steps:

1. Check status.
2. Make one focused change.
3. Review the change.
4. Commit it.
5. Push it.
6. Ask for review.

When in doubt, run:

```powershell
git status
```

Then ask for help before running commands you do not understand.
