import type { Request, Response } from "express";
import Portfolio from "../../models/portfolio.model";

class EditProjectsController {
  public async editProject(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const updateData: any = { ...req.body };

      if (req.files && !Array.isArray(req.files)) {

        if (req.files.imagem_capa?.length) {
          updateData.imagem_capa = req.files.imagem_capa[0].path;
        }

        if (req.files.imagens?.length) {
          updateData.imagens = req.files.imagens.map(
            (file) => file.path
          );
        }
      }

      const project = await Portfolio.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!project) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }

      return res.json(project);

    } catch (error) {
        console.log("Erro ao editar o projeto", error);
      return res.status(500).json({ error: "Erro ao editar o projeto", details: error });
    }
  }
}

export const editProjectsController = new EditProjectsController();