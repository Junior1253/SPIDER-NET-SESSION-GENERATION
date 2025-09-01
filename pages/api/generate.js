import { makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { mode, key, phone } = req.body;
    const { state, saveCreds } = await useMultiFileAuthState("session");

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    });

    sock.ev.on("creds.update", saveCreds);

    // --- Mode QR ---
    if (mode === "qr") {
      sock.ev.on("connection.update", async (update) => {
        const { qr, connection } = update;

        if (qr) {
          qrcode.toDataURL(qr, (err, url) => {
            if (err) return res.status(500).json({ error: "QR Code error" });
            res.status(200).json({ qrCode: url });
          });
        }

        if (connection === "open") {
          // Envoie la session ID à l'utilisateur WhatsApp
          await sock.sendMessage(phone + "@s.whatsapp.net", {
            text: "✅ Connexion réussie ! Voici ta Session ID :\n\n" +
                  JSON.stringify(state.creds, null, 2)
          });
        }
      });
    }

    // --- Mode clé ---
    if (mode === "key") {
      if (!key || key !== "SPIDERNET123") {
        return res.status(400).json({ error: "Clé invalide !" });
      }

      // Simule une connexion réussie
      await sock.sendMessage(phone + "@s.whatsapp.net", {
        text: "🔑 Connexion via clé réussie ! Voici ta Session ID :\n\n" +
              JSON.stringify(state.creds, null, 2)
      });

      return res.status(200).json({ message: "Connexion via clé réussie ✅" });
    }
  } catch (error) {
    console.error("Erreur génération session:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
