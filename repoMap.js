require("dotenv").config();

const getRepoMap = () => {
  const map = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith("REPO_")) {
      const repoName = key
        .replace("REPO_", "")
        .toLowerCase()
        .replace(/_/g, "-");
      map[repoName] = value;
    }
  }
  return map;
};

module.exports = getRepoMap();
