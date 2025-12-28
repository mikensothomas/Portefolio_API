import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.DATABASE_URL || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectWithDB() {
  try {
    await client.connect();

    console.log("🚀DB connected successfully!");
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error);
  }
}