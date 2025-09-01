export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID manquant" });
    }

    const content = `
      // Exemple de fichier index.js pour Bot Hosting
      module.exports = {
        sessionId: "${sessionId}", // Remplace par ton Session ID
        botName: "Spider-Net-Bot"
      };
    `;

    res.setHeader("Content-Disposition", "attachment; filename=index.js");
    res.setHeader("Content-Type", "application/javascript");
    res.status(200).send(content);
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
