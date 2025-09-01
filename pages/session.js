export default function handler(req, res) {
  if (req.method === 'POST') {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Numéro requis' });
    }

    // ⚡ Simulation OTP (dans Levanter ça fait vraiment WhatsApp Web)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    return res.status(200).json({
      success: true,
      message: 'OTP généré avec succès',
      otp,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
