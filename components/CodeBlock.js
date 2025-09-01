// components/CodeBlock.js
import { useState } from "react";

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg relative">
      <pre className="whitespace-pre-wrap text-sm">{code}</pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-blue-600 px-3 py-1 rounded text-white text-xs"
      >
        {copied ? "✅ Copié !" : "📋 Copier"}
      </button>
    </div>
  );
}
