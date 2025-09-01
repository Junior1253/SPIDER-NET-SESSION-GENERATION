import { useState } from "react";

export default function Home() {
  const [sessionId, setSessionId] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const generateSession = async () => {
    try {
      const res = await fetch("/api/generate");
      const data = await res.json();
      if (data.sessionId) {
        setSessionId(data.sessionId);
        setDownloadUrl(`/api/download?sessionId=${data.sessionId}`);
      }
    } catch (err) {
      console.error("Erreur lors de la génération :", err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>SPIDER-NET Secure-Bot</h1>
      <button onClick={generateSession}>
        Générer une Session ID
      </button>

      {sessionId && (
        <div style={{ marginTop: "20px" }}>
          <p><b>Session ID générée :</b> {sessionId}</p>
          <a href={downloadUrl} download="index.js">
            <button>Télécharger index.js</button>
          </a>
        </div>
      )}
    </div>
  );
}
