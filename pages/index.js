import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const generateSession = async () => {
    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (data.success) {
      setOtp(data.otp);
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#2563eb" }}>🔒 Générer une Session</h1>
      <input
        type="text"
        placeholder="Entrez votre numéro"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: "10px", width: "250px", border: "1px solid #2563eb", borderRadius: "8px" }}
      />
      <br /><br />
      <button
        onClick={generateSession}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Générer OTP
      </button>

      {otp && (
        <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}>
          ✅ Votre OTP est : <span style={{ color: "green" }}>{otp}</span>
        </div>
      )}
    </div>
  );
}
