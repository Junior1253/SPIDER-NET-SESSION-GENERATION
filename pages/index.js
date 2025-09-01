import { useState } from "react";

export default function Home() {
  const [qrCode, setQrCode] = useState(null);
  const [key, setKey] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // --- Générer une session via QR ---
  const generateSession = async () => {
    setMessage("⏳ Génération du QR...");
    setQrCode(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "qr", phone }),
      });

      const data = await res.json();

      if (data.qrCode) {
        setQrCode(data.qrCode);
        setMessage("📷 Scannez ce QR Code avec WhatsApp !");
      } else if (data.error) {
        setMessage("❌ Erreur : " + data.error);
      } else {
        setMessage("✅ " + data.message);
      }
    } catch (err) {
      setMessage("⚠️ Erreur serveur.");
    }
  };

  // --- Connexion via clé ---
  const connectWithKey = async () => {
    setMessage("⏳ Vérification de la clé...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "key", key, phone }),
      });

      const data = await res.json();

      if (data.error) {
        setMessage("❌ Erreur : " + data.error);
      } else {
        setMessage("✅ " + data.message);
      }
    } catch (err) {
      setMessage("⚠️ Erreur serveur.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>SPIDER-NET Secure-Bot</h1>
      <p>Choisissez une méthode de connexion :</p>

      {/* Numéro WhatsApp */}
      <input
        type="text"
        placeholder="Votre numéro WhatsApp (ex: 226XXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ margin: "10px", padding: "5px", width: "250px" }}
      />
      <br />

      {/* Bouton QR */}
      <button onClick={generateSession} style={{ margin: "10px", padding: "10px" }}>
        📷 Générer via QR
      </button>

      {/* Bouton Clé */}
      <br />
      <input
        type="text"
        placeholder="Entrez votre clé de connexion"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ margin: "10px", padding: "5px", width: "250px" }}
      />
      <br />
      <button onClick={connectWithKey} style={{ margin: "10px", padding: "10px" }}>
        🔑 Connexion via clé
      </button>

      {/* Message */}
      <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>

      {/* QR Code */}
      {qrCode && <img src={qrCode} alt="QR Code" style={{ marginTop: "20px" }} />}
    </div>
  );
}
