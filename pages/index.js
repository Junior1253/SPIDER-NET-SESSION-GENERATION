import { useState } from "react";

export default function Home() {
  const [qr, setQr] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const generateSession = async () => {
    const res = await fetch("/api/generate");
    const data = await res.json();

    if (data.qr) {
      setQr(data.qr);
    }
    if (data.sessionId) {
      setSessionId(data.sessionId);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>SpiderNet Session Generator</h1>
      <button onClick={generateSession}>Générer ma Session</button>

      {qr && (
        <div>
          <p>Scanne ce QR avec WhatsApp</p>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${qr}`} />
        </div>
      )}

      {sessionId && (
        <div>
          <p>✅ Session générée avec succès !</p>
          <a href={`/api/download?sessionId=${encodeURIComponent(sessionId)}`}>
            Télécharger index.js
          </a>
        </div>
      )}
    </div>
  );
}
