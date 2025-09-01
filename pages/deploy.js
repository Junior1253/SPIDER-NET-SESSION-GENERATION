import { useState } from "react";

export default function Deploy() {
  const [sessionId, setSessionId] = useState("");
  const [copied, setCopied] = useState(false);

  // Le modèle index.js que l'utilisateur doit coller sur Bot Hosting
  const generateCode = () => {
    return `
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection } = update;
    if (connection === "open") {
      console.log("✅ Bot connecté avec succès !");
    }
  });
}

// Remplacer par la Session ID générée
const SESSION_ID = "${sessionId || "VOTRE_SESSION_ID_ICI"}";

startBot();
    `;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#2563eb" }}>🚀 Déployer votre Bot</h1>
      <p>Collez votre <strong>Session ID</strong> ci-dessous :</p>

      <input
        type="text"
        placeholder="Entrez votre Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          width: "100%",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={copyToClipboard}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {copied ? "✅ Copié !" : "📋 Copier le code"}
      </button>

      <h2 style={{ marginTop: "20px" }}>📄 Code à coller sur Bot Hosting</h2>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "15px",
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        {generateCode()}
      </pre>
    </div>
  );
}
