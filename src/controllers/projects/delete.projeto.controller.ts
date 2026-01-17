import type { Request, Response } from "express";
import Portfolio from "../../models/portfolio.model";

class DeleteProjetoController {
  public async deleteProject(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
        const project = await Portfolio.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ error: "Projeto não encontrado" });
        }
        return res.json({ message: "Projeto deletado com sucesso" });
    } catch (error) {
        console.log("Erro ao deletar o projeto", error);
      return res.status(500).json({ error: "Erro ao deletar o projeto", details: error });
    }
    }
}

export const deleteProjetoController = new DeleteProjetoController();