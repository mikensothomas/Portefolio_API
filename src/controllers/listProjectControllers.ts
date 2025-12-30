import { Request, Response } from "express";
import Portfolio from "../models/Portfolio";

export const listProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const projects = await Portfolio.find().lean();
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Erro ao listar projetos:", error);
    return res.status(500).json({ error: "Erro ao listar projetos" });
  }
};
