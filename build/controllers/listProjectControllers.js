"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const listProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.portfolio.findMany();
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Erro ao listar projetos:", error);
        return res.status(500).json({ error: "Erro ao listar projetos" });
    }
});
exports.listProjects = listProjects;
