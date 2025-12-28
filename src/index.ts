import express from "express";
import dotenv from "dotenv";
import { connectWithDB } from "./config/conectDatabase";
import { router } from "./routes";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cors());
app.use("/api", router)

app.listen(port, () => {
  console.log(`🌐 Servidor rodando em http://localhost:${port}`);
  connectWithDB()
});