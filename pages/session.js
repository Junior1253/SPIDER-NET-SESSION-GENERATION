// pages/session.js
import Sidebar from "../components/Sidebar";

export default function Session() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          Générer une Session 🔑
        </h1>
        <p className="text-gray-600 mb-4">
          Scannez le code QR ou utilisez le code OTP pour générer une session
          sécurisée.
        </p>
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-center text-gray-500">
            👉 Ici s’affichera le QR Code et l’OTP (connecté avec ton API).
          </p>
        </div>
      </main>
    </div>
  );
}
