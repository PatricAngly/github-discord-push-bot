# GitHub to Discord Push Bot

A Node.js application that listens for GitHub push events and posts messages to specific Discord channels based on the repository.

## 🔧 Setup Instructions

### 1. Create Discord Webhooks

For each Discord channel you want to receive push messages in:

- Go to the Discord server → channel settings → Integrations → Webhooks
- Click "New Webhook", name it, choose the channel, and **copy the webhook URL**

### 2. Add Webhooks to GitHub Repositories

For each GitHub repository you want to track:

- Go to the repo → `Settings` → `Webhooks` → `Add webhook`
- Set the **Payload URL** to your bot’s URL (e.g. `https://yourapp.up.railway.app/github-webhook`)
- Set **Content type** to `application/json`
- Choose **Just the push event**
- Click "Add webhook"

### 3. Configure the Bot

In `index.js`, update the `repoMap` object with your GitHub repo names and the corresponding Discord webhook URLs:

```bash
node index.js
```
