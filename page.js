module.exports = (req, res) => {
  res.send(`
    <html>
      <head>
        <title>SPIDER-NET SESSION HUB</title>
      </head>
      <body style="font-family: sans-serif; text-align: center; padding: 40px;">
        <h1>🕷️ SPIDER-NET SECURE-BOT</h1>
        <p>1. Scannez le QR pour générer votre Session ID</p>
        <p>2. Cliquez sur "Télécharger index.js" pour BotHosting</p>

        <form action="/api/generate" method="get">
          <button type="submit">📲 Générer Session ID</button>
        </form>

        <form action="/api/download" method="get">
          <input type="text" name="sessionId" placeholder="Entrez votre Session ID" required />
          <button type="submit">⬇️ Télécharger index.js</button>
        </form>
      </body>
    </html>
  `);
};
