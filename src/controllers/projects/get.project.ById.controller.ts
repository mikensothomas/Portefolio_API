import { Request, Response } from "express";
import Portfolio from "../../models/portfolio.model";

export class GetProjectByIdController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const project = await Portfolio.findById(id);

      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }

      return res.json(project);
    } catch (error) {
      console.error("Erro ao buscar projeto:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}