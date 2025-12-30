import mongoose from "mongoose";
import Messages from "../models/Messages";
import Portfolio from "../models/Portfolio";

const mongoUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/portfolio";

mongoose.connect(mongoUrl).catch((err) => {
	console.error("Erro ao conectar ao MongoDB:", err);
});

const prismaLike = {
	portfolio: {
		findMany: (filter = {}) => Portfolio.find(filter).lean(),
		create: (args: { data: any }) => Portfolio.create(args.data),
	},
	messages: {
		create: (args: { data: any }) => Messages.create(args.data),
	},
};

export default prismaLike;