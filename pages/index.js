import { useState } from "react";

export default function Home() {
  const [qr, setQr] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const generateSessionQR = async () => {
    setLoading(true);
    setQr(null);
    setSession(null);

    try {
      const res = await fetch("/api/session");
      const data = await res.json();

      if (data.mode === "qr") setQr(data.qrCode);
      if (data.mode === "session") setSession(data.session);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const generateSessionOTP = async () => {
    setLoading(true);
    setSession(null);

    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      const data = await res.json();

      if (data.mode === "session") setSession(data.session);
      if (data.error) alert(data.error);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Mini Levanter - Connexion</h1>

      {/* QR CODE */}
      <button
        onClick={generateSessionQR}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg mb-4"
      >
        {loading ? "⏳ En cours..." : "Connexion via QR"}
      </button>

      {qr && (
        <div className="mt-4">
          <h2 className="text-lg mb-2">📱 Scanne ce QR avec WhatsApp</h2>
          <img src={qr} alt="QR Code" className="rounded-lg shadow-lg" />
        </div>
      )}

      {/* OTP */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg w-96">
        <h2 className="text-lg mb-2">📩 Connexion via OTP</h2>
        <input
          type="text"
          placeholder="Numéro WhatsApp"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-900 text-white"
        />
        <input
          type="text"
          placeholder="Code OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-900 text-white"
        />
        <button
          onClick={generateSessionOTP}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
        >
          {loading ? "⏳ Vérification..." : "Valider OTP"}
        </button>
      </div>

      {/* Session */}
      {session && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg w-96 break-words">
          <h2 className="text-lg mb-2">✅ Session ID générée</h2>
          <textarea
            readOnly
            className="w-full h-40 bg-gray-900 text-green-400 p-2 rounded"
            value={session}
          />
        </div>
      )}
    </div>
  );
}
