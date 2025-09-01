// components/Sidebar.js
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-blue-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">SpiderNet</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:text-blue-300">🏠 Accueil</Link>
        <Link href="/session" className="hover:text-blue-300">🔑 Session</Link>
        <Link href="/deploy" className="hover:text-blue-300">🚀 Déployer</Link>
      </nav>
    </div>
  );
}
