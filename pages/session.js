import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Session() {
  const [qrCode, setQrCode] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const generateSession = async () => {
    const res = await fetch("/api/session");
    const data = await res.json();

    if (data.qrCode) {
      setQrCode(data.qrCode);
    }
    if (data.sessionId) {
      setSessionId(data.sessionId);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 p-8 w-full">
        <h1 className="text-2xl font-bold mb-6">🔑 Générer une Session</h1>
        <button
          onClick={generateSession}
          className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          Générer QR Code
        </button>

        {qrCode && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">📲 Scanne ce QR Code :</h2>
            <img src={qrCode} alt="QR Code" className="mt-4 w-60 border-2 border-gray-300 rounded-lg" />
          </div>
        )}

        {sessionId && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">✅ Session ID générée :</h2>
            <code className="text-sm break-all">{sessionId}</code>
          </div>
        )}
      </main>
    </div>
  );
}
