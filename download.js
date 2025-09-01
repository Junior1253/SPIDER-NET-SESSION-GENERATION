module.exports = (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).send("Session ID manquant");
  }

  const code = `
const { spawn, execSync } = require("child_process");

// 🔑 Session ID fournie par le générateur
process.env.SESSION_ID = "${sessionId}";

// Repo du bot SPIDER-NET
const gitRepo = "https://github.com/Junior1253/PROJET-SPIDER-NET-BOZ.git";

// Télécharger le bot
execSync(\`git clone \${gitRepo} bot && cd bot && npm install\`, { stdio: "inherit" });

// Démarrer le bot
require("./bot/index.js");
  `;

  res.setHeader("Content-disposition", "attachment; filename=index.js");
  res.setHeader("Content-Type", "application/javascript");
  res.send(code);
};
