import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes";
import cors from "cors";
import { connectDatabase } from "./config/conectDatabase";
import path from "path";

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }))

app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "..", "uploads"))
);

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🔥 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

startServer();

export default app;