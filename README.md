# GitHub to Discord Push Bot

A Node.js application that listens for GitHub push events and posts messages to specific Discord channels using Discord webhooks, with secure validation via HMAC signatures.

## 🔧 Setup Instructions

### 1. Create Discord Webhooks

For each Discord channel you want to receive push messages in:

- Go to your Discord server → Channel settings → Integrations → Webhooks
- Click **"New Webhook"**, name it, choose the channel, and **copy the webhook URL**

### 2. Add Webhooks to GitHub Repositories

For each GitHub repository you want to track:

- Go to the repository → **Settings** → **Webhooks** → **Add webhook**
- Set the **Payload URL** to your bot’s endpoint (e.g. `https://yourapp.up.railway.app/github-webhook`)
- Set **Content type** to `application/json`
- Add a **secret** (you choose this value and store it in `.env` as `GITHUB_SECRET`)
- Choose **Just the push event**
- Click **"Add webhook"**

### 3. Configure the Bot

Update the `.env` file with your GitHub secret and webhook URLs:

GITHUB_SECRET=yourgithubsecret
REPO_WEBHOOKS={"repo-name-1":"https://discord.com/api/webhooks/...","repo-name-2":"https://discord.com/api/webhooks/..."}

> Note: `REPO_WEBHOOKS` should be a valid JSON string.

### 4. Start the Server

Run the server locally:

```bash
node index.js
```
