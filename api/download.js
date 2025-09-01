export default async function handler(req, res) {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID manquant" });
  }

  const indexFile = `
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");
  const sock = makeWASocket({
    auth: state,
  });

  sock.ev.on("messages.upsert", (m) => {
    console.log("Nouveau message", m);
  });

  sock.ev.on("creds.update", saveCreds);
}

startBot();
  `;

  res.setHeader("Content-disposition", "attachment; filename=index.js");
  res.setHeader("Content-Type", "text/javascript");
  res.send(indexFile);
}
