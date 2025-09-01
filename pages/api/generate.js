import { makeWASocket, useSingleFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode";

export default async function handler(req, res) {
  try {
    // Utiliser un seul fichier JSON pour stocker la session
    const { state, saveState } = useSingleFileAuthState("./auth_info.json");

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    });

    sock.ev.on("creds.update", saveState);

    let responded = false; // éviter plusieurs réponses

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
