// pages/index.js
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Bienvenue sur SPIDER-NET SECURE-BOT🚀
        </h1>
        <p className="text-gray-700">
          Générez votre <strong>Session</strong>, puis utilisez la section{" "}
          <strong>Déployer</strong> pour lancer votre bot facilement, comme sur
          Levanter.
        </p>
      </main>
    </div>
  );
}
