import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl =
  process.env.DATABASE_URL || "mongodb://localhost:27017/portfolio";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(mongoUrl);
    console.log("🚀 MongoDB conectado com sucesso (Mongoose)");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
}
