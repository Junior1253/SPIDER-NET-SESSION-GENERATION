import React from "react";

export default function CodeBlock({ code }) {
  return (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto shadow-md">
      <code>{code}</code>
    </pre>
  );
}
