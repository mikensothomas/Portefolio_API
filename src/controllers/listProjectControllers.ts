import { Request, Response } from "express";
import prisma from "../config/prisma";

export const listProjects = async (req: Request, res: Response) => {
    try {
        const response = await prisma.portfolio.findMany()
        return res.status(200).json(response);
    } catch (error) {
        console.error("Erro ao listar projetos:", error);
        return res.status(500).json({ error: "Erro ao listar projetos" });
    }
}