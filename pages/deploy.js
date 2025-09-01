// pages/deploy.js
import Sidebar from "../components/Sidebar";
import CodeBlock from "../components/CodeBlock";

export default function Deploy() {
  const deployCommand = `
# Copiez ce code et collez-le sur Bot Hosting
# Remplacez <SESSION_ID> par celui généré dans la section Session

npm install
SESSION_ID=<SESSION_ID> node bot.js
  `;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          Déployer votre Bot 🚀
        </h1>
        <p className="text-gray-600 mb-4">
          Copiez et collez le texte ci-dessous dans Bot Hosting, puis modifiez
          uniquement la partie <strong>SESSION_ID</strong>.
        </p>
        <CodeBlock code={deployCommand} />
      </main>
    </div>
  );
}
