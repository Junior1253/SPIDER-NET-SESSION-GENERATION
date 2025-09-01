const { Client, LocalAuth } = require("whatsapp-web.js");

module.exports = (req, res) => {
  try {
    const client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true }
    });

    client.on("qr", (qr) => {
      res.json({ qr }); // retourne le QR à scanner
    });

    client.on("ready", () => {
      const sessionId = Buffer.from(Date.now().toString()).toString("base64");
      res.json({ sessionId });
    });

    client.initialize();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
