import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "api" });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
