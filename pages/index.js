import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Bienvenue 👋</h1>
        <p className="text-lg">
          Ceci est la version mini de <b>Levanter</b>.  
          Utilise le menu à gauche pour générer une session ou déployer ton bot.
        </p>
      </main>
    </div>
  );
}
