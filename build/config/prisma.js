"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messages_model_1 = __importDefault(require("../models/messages.model"));
const portfolio_model_1 = __importDefault(require("../models/portfolio.model"));
const mongoUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/portfolio";
mongoose_1.default.connect(mongoUrl).catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
});
const prismaLike = {
    portfolio: {
        findMany: (filter = {}) => portfolio_model_1.default.find(filter).lean(),
        create: (args) => portfolio_model_1.default.create(args.data),
    },
    messages: {
        create: (args) => messages_model_1.default.create(args.data),
    },
};
exports.default = prismaLike;
