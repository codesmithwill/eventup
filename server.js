import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "..", "dbUsers.json");

const app = express();
const PORT = 5173;

app.use(express.json());
app.use(express.static("."));

app.post("/api/saveUsers", (req, res) => {
  try {
    const users = req.body;

    fs.writeFileSync(dbPath, JSON.stringify({ users }, null, 2), "utf-8");

    res.json({ success: true, message: "Usuários salvos com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar usuários:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
