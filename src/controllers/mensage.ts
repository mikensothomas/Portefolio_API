import { Request, Response } from "express";
import Messages from "../models/Messages";

export const registerMessages = async (req: Request, res: Response) => {
  try {
    const { name, email, telefone, message } = req.body;

    const newMessage = await Messages.create({
      name,
      email,
      telefone,
      message,
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Erro ao registrar mensagem:", error);
    return res
      .status(500)
      .json({ error: "Erro ao registrar a mensagem" });
  }
};