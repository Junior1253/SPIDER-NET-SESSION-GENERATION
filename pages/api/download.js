export default function handler(req, res) {
  const { sessionId } = req.query;

  const fileContent = `
    module.exports = {
      sessionId: "${sessionId}"
    };
  `;

  res.setHeader("Content-Disposition", "attachment; filename=index.js");
  res.setHeader("Content-Type", "application/javascript");
  res.send(fileContent);
}
