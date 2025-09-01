// pages/deploy.js
import Sidebar from "../components/Sidebar";
import CodeBlock from "../components/CodeBlock";

export default function DeployPage() {
  const exampleCode = `
  {
    "SESSION_ID": "VOTRE_SESSION_ID_ICI",
    "BOT_NAME": "SpiderNet-Bot",
    "PREFIX": "!"
  }`;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">🚀 Déployer votre Bot</h1>
        <p className="mb-4">
          Copiez le code ci-dessous et collez-le dans votre hébergeur (par ex. Bot Hosting).  
          Remplacez <strong>VOTRE_SESSION_ID_ICI</strong> par la Session ID envoyée en privé par le bot.
        </p>
        <CodeBlock code={exampleCode} />
      </div>
    </div>
  );
}
