import { useState } from "react";

export default function Home() {
  const [sessionId, setSessionId] = useState(null);

  const generateSession = async () => {
    const res = await fetch("/api/generate");
    const data = await res.json();
    setSessionId(data.sessionId);
  };

  const downloadFile = async () => {
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.js";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🕷️ Spider-Net Session Generator</h1>
      <button onClick={generateSession}>Générer une Session ID</button>

      {sessionId && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Session ID :</strong> {sessionId}</p>
          <button onClick={downloadFile}>📥 Télécharger index.js</button>
        </div>
      )}
    </div>
  );
}
