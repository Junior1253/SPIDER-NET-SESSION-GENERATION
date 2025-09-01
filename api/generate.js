import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";

export default async function handler(req, res) {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    });

    sock.ev.on("connection.update", (update) => {
      const { connection, qr } = update;

      if (qr) {
        // Renvoie le QR pour que l’utilisateur le scanne
        res.status(200).json({ qr });
      }

      if (connection === "open") {
        res.status(200).json({ sessionId: JSON.stringify(state.creds) });
      }
    });

    sock.ev.on("creds.update", saveCreds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la génération de la session" });
  }
}
