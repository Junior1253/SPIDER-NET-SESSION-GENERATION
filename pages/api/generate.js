import { makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode";

export default async function handler(req, res) {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("session");

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    });

    sock.ev.on("creds.update", saveCreds);

    let qrCodeData = null;

    sock.ev.on("connection.update", (update) => {
      const { qr, connection } = update;

      if (qr) {
        qrcode.toDataURL(qr, (err, url) => {
          if (err) {
            return res.status(500).json({ error: "QR Code error" });
          }
          qrCodeData = url;
          res.status(200).json({ qrCode: qrCodeData });
        });
      }

      if (connection === "open") {
        res.status(200).json({ message: "✅ WhatsApp connecté !" });
      }
    });
  } catch (error) {
    console.error("Erreur génération session:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
