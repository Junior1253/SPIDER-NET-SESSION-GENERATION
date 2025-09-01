export default function handler(req, res) {
  if (req.method === 'GET') {
    // Simule la génération d'une Session ID
    const sessionId = "SESSION_" + Math.random().toString(36).substr(2, 10);
    res.status(200).json({ sessionId });
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
