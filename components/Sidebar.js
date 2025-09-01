// components/Sidebar.js
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-blue-900 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-blue-700">
        🔐 SecureBot
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <Link href="/" className="block hover:bg-blue-700 p-2 rounded">
          Accueil
        </Link>
        <Link href="/session" className="block hover:bg-blue-700 p-2 rounded">
          Session
        </Link>
        <Link href="/deploy" className="block hover:bg-blue-700 p-2 rounded">
          Déployer
        </Link>
      </nav>
      <div className="p-4 text-xs text-blue-300 border-t border-blue-700">
        ©️ 2025 SecureBot
      </div>
    </div>
  );
}
