const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const repoMap = {
  "react-portfolio":
    "https://discord.com/api/webhooks/1373748344505106605/gilg3y_yrMpfUtaqDX7M4sgRBseZzHSUg5MXq_N_4hc5O4UXBLifQ42e6XRyUf7jZb9H",
};

app.use(express.json());

app.post("/github-webhook", async (req, res) => {
  const repoName = req.body.repository?.name;
  const pusher = req.body.pusher?.name;
  const commits = req.body.commits || [];

  const webhookUrl = repoMap[repoName];
  if (!webhookUrl) {
    return res.status(400).send("Unknown repository");
  }

  const commitMessages = commits
    .map((c) => `• ${c.message} (${c.url})`)
    .join("\n");
  const content = `📦 **${pusher}** pushade till **${repoName}**:\n${commitMessages}`;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    res.status(200).send("Posted to Discord");
  } catch (err) {
    console.error("Failed to send to Discord:", err);
    res.status(500).send("Discord error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
