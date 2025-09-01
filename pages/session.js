// pages/session.js
import Sidebar from "../components/Sidebar";

export default function SessionPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">🔑 Connexion Session</h1>
        <p className="mb-4">Choisissez une méthode pour connecter votre bot :</p>

        <div className="space-y-6">
          {/* Option 1 : QR Code */}
          <div className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">📷 Scanner un QR Code</h2>
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Générer un QR
            </button>
          </div>

          {/* Option 2 : OTP */}
          <div className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">📱 Connexion via OTP</h2>
            <input
              type="text"
              placeholder="Entrez votre numéro WhatsApp"
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Recevoir OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
