import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerMessages = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            telefone,
            message
        } = req.body;

        const newMessage = await prisma.messages.create({
            data: {
                name,
                email,
                telefone,
                message
            },
        });

        res.status(200).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar a mensagem" });
    }
};