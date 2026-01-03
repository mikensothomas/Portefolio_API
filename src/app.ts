import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./config/conectDatabase";
import app from ".";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
  });
}

startServer();