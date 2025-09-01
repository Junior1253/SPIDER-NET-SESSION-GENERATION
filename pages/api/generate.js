import { makeWASocket } from "@whiskeysockets/baileys";
import qrcode from "qrcode";

let sessionData = {}; // stockage en mémoire (perd après restart)

export default async function handler(req, res) {
  try {
    const sock = makeWASocket({
      auth: sessionData,
      printQRInTerminal: false,
    });

    sock.ev.on("creds.update", (creds) => {
      sessionData = creds; // mise à jour en mémoire
    });

    let responded = false;

    sock.ev.on("connection.update", async (update) => {
      const { qr, connection } = update;

      if (qr && !responded) {
        responded = true;
        const qrCodeData = await qrcode.toDataURL(qr);
        return res.status(200).json({ qrCode: qrCodeData });
      }

      if (connection === "open" && !responded) {
        responded = true;
        return res.status(200).json({ message: "✅ WhatsApp connecté !" });
      }
    });
  } catch (error) {
    console.error("Erreur génération session:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}
