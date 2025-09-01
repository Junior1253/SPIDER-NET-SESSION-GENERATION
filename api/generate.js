export default function handler(req, res) {
  // Simule une génération de sessionId (à remplacer plus tard par vrai login WhatsApp)
  const fakeSessionId = "SESSION_" + Math.random().toString(36).substr(2, 12);

  res.status(200).json({ sessionId: fakeSessionId });
}
