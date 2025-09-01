import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SessionPage() {
  const router = useRouter();
  const { otp } = router.query; // Récupère l’OTP depuis l’URL
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    if (otp) {
      // ⚡ Simulation génération SessionID à partir de l’OTP
      const fakeSession = `SESSION-${otp}-${Date.now()}`;
      setSessionId(fakeSession);
    }
  }, [otp]);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#2563eb" }}>🔐 Session Active</h1>
      {sessionId ? (
        <>
          <p style={{ marginTop: "20px", fontSize: "18px" }}>
            Votre session sécurisée est prête ✅
          </p>
          <div
            style={{
              margin: "20px auto",
              padding: "15px",
              border: "2px dashed #2563eb",
              borderRadius: "12px",
              width: "80%",
              maxWidth: "500px",
              backgroundColor: "#f0f9ff",
              fontFamily: "monospace",
              fontSize: "16px",
              wordBreak: "break-all",
            }}
          >
            {sessionId}
          </div>
          <p style={{ color: "gray", fontSize: "14px" }}>
            Copiez cette Session ID et utilisez-la dans Bot Hosting pour déployer votre bot.
          </p>
        </>
      ) : (
        <p style={{ marginTop: "20px", color: "red" }}>
          ⚠️ Aucun OTP fourni. Retournez à la page d’accueil pour générer un OTP.
        </p>
      )}
    </div>
  );
}
