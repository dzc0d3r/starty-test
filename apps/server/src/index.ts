import express from "express";
import { prisma } from "db"
const app = express();
const port = process.env.PORT || 8080;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "api" });
});
app.get('/api/v1/companies', async (req, res) => {
  try {
    const companies = await prisma.managementCompany.findMany();

    res.json(companies);
  } catch (error) {
    console.error('Failed to fetch companies:', error);
    res.status(500).json({ error: 'Unable to fetch management companies.' });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
