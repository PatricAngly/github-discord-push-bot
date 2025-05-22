require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;
const repoMap = require("./repoMap");

const rawBodySaver = (req, res, buf) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString("utf8");
  }
};

app.use(
  express.json({
    verify: rawBodySaver,
  })
);

app.post("/github-webhook", async (req, res) => {
  const secret = process.env.GITHUB_SECRET;
  const signature = req.headers["x-hub-signature-256"];
  const expectedSignature =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(req.rawBody).digest("hex");

  if (signature !== expectedSignature) {
    console.warn("❌ Invalid signature");
    return res.status(401).send("Invalid signature");
  }

  const repoName = req.body.repository?.name;
  const pusher = req.body.pusher?.name || "unknown";
  const commits = req.body.commits || [];

  const webhookUrl = repoMap[repoName];
  if (!webhookUrl) {
    console.warn("❌ Unauthorized repo:", repoName);
    return res.status(403).send("Unauthorized repository");
  }

  const branch = req.body.ref?.split("/").pop() || "unknown";

  const commitList = commits
    .map((c) => `• [${c.message}](${c.url})`)
    .join("\n")
    .slice(0, 1024);

  const embed = {
    title: `📦 New push to ${repoName}`,
    description: `**${pusher}** pushed ${commits.length} commit(s) to \`${branch}\``,
    fields: [
      {
        name: "Commits",
        value: commitList || "*No commit messages*",
      },
    ],
    color: 0x00b0f4,
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    res.status(200).send("Posted to Discord");
  } catch (err) {
    console.error("❌ Failed to send to Discord:", err);
    res.status(500).send("Discord error");
  }
});
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
