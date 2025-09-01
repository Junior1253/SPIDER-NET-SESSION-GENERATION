import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import qrcode from "qrcode";

export default async function handler(req, res) {
  try {
    const { method } = req;

    // --- QR CODE LOGIN ---
    if (method === "GET") {
      const { state, saveCreds } = await useMultiFileAuthState("session");
      const { version } = await fetchLatestBaileysVersion();

      const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
      });

      sock.ev.on("creds.update", saveCreds);

      sock.ev.on("connection.update", async (update) => {
        const { qr, connection } = update;

        if (qr) {
          const qrImage = await qrcode.toDataURL(qr);
          return res.status(200).json({ mode: "qr", qrCode: qrImage });
        }

        if (connection === "open") {
          const sessionData = Buffer.from(
            JSON.stringify(state.creds),
            "utf-8"
          ).toString("base64");

          return res.status(200).json({
            mode: "session",
            session: sessionData,
            message: "✅ Connexion réussie via QR",
          });
        }
      });
    }

    // --- OTP LOGIN ---
    if (method === "POST") {
      const { phoneNumber, otp } = req.body;

      if (!phoneNumber) {
        return res.status(400).json({ error: "Numéro de téléphone requis" });
      }

      // ⚠️ Ici normalement tu appelles l’API WhatsApp officielle pour OTP
      // Comme dans Levanter. Pour l’instant on simule :
      if (otp === "123456") {
        const fakeSession = Buffer.from(`FAKE_SESSION_${phoneNumber}`, "utf-8").toString("base64");
        return res.status(200).json({
          mode: "session",
          session: fakeSession,
          message: "✅ Connexion réussie via OTP",
        });
      } else {
        return res.status(400).json({ error: "OTP invalide (exemple attendu: 123456)" });
      }
    }
  } catch (error) {
    console.error("Erreur session:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
