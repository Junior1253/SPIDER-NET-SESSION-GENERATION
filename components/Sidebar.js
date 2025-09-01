import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-blue-900 text-white fixed flex flex-col p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-8">Mini Levanter</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:bg-blue-700 p-2 rounded-lg">Accueil</Link>
        <Link href="/session" className="hover:bg-blue-700 p-2 rounded-lg">Session</Link>
        <Link href="/deploy" className="hover:bg-blue-700 p-2 rounded-lg">Déployer</Link>
      </nav>
    </div>
  );
}
