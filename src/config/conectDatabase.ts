import mongoose from "mongoose";

const mongoUrl = process.env.DATABASE_URL as string;

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(mongoUrl);
    console.log("🚀 MongoDB conectado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
}