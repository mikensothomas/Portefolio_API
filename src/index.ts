import express from "express";
import { connectDatabase } from "./config/conectDatabase";

const app = express();
app.use(express.json());

connectDatabase();

app.get("/", (_, res) => {
  res.json({ status: "API Portfolio ativa 🚀" });
});

export default app;
