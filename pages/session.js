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

    sock.ev.on("connection.update", async (update) => {
      const { qr, connection } = update;

      // ✅ Si un QR est généré
      if (qr) {
        const qrImage = await qrcode.toDataURL(qr);
        return res.status(200).json({ mode: "qr", qrCode: qrImage });
      }

      // ✅ Quand connexion réussie
      if (connection === "open") {
        // On encode les credentials en Base64 (comme Levanter)
        const sessionData = Buffer.from(
          JSON.stringify(state.creds),
          "utf-8"
        ).toString("base64");

        return res.status(200).json({
          mode: "session",
          session: sessionData,
          message: "✅ Connexion réussie, voici ta SESSION_ID",
        });
      }
    });
  } catch (error) {
    console.error("Erreur session:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
