import Sidebar from "../components/Sidebar";
import CodeBlock from "../components/CodeBlock";

export default function Deploy() {
  const codeExample = `
# Exemple de déploiement (Bot Hosting / Render / VPS)
git clone https://github.com/ton-user/mini-levanter.git
cd mini-levanter
npm install
SESSION_ID="ta-session-id" npm start
`;

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 p-8 w-full">
        <h1 className="text-2xl font-bold mb-6">🚀 Déployer ton Bot</h1>
        <p className="mb-4">
          Copie le code ci-dessous et colle-le sur ton hébergeur (par ex. Bot Hosting ou Render).  
          N’oublie pas de remplacer <b>ta-session-id</b> par ta vraie clé de session !
        </p>
        <CodeBlock code={codeExample} />
      </main>
    </div>
  );
}
