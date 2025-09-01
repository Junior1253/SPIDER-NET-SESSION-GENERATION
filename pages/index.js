import { useState } from "react";

export default function Home() {
  const [qrCode, setQrCode] = useState(null);
  const [status, setStatus] = useState("");

  const generateSession = async () => {
    setStatus("⏳ Génération du QR Code...");
    setQrCode(null);

    try {
      const res = await fetch("/api/generate");
      const data = await res.json();

      if (data.qrCode) {
        setQrCode(data.qrCode);
        setStatus("📲 Scanne le QR Code avec WhatsApp !");
      } else if (data.message) {
        setStatus(data.message);
      } else {
        setStatus("⚠️ Erreur de génération.");
      }
    } catch (err) {
      setStatus("⚠️ Erreur serveur.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>SPIDER-NET Secure-Bot</h1>
      <button onClick={generateSession}>Générer une Session</button>
      <p>{status}</p>
      {qrCode && <img src={qrCode} alt="QR Code WhatsApp" />}
    </div>
  );
}
