import type { Request, Response } from "express";
import Portfolio from "../../models/portfolio.model";
class EditProjectsController {
  public async editProject(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const {
        titulo,
        descricao,
        categoria,
        link_github,
        status,
        repositorio_privado,
        video_demo,
        tecnologias,
        tags,
        existing_images,
        imagens_meta,
      } = req.body;

      const project = await Portfolio.findById(id);

      if (!project) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }

      if (titulo !== undefined) project.titulo = titulo;
      if (descricao !== undefined) project.descricao = descricao;
      if (categoria !== undefined) project.categoria = categoria;
      if (link_github !== undefined) project.link_github = link_github;
      if (status !== undefined) project.status = status;
      if (video_demo !== undefined) project.video_demo = video_demo;

      if (repositorio_privado !== undefined) {
        project.repositorio_privado = JSON.parse(repositorio_privado);
      }

      if (tecnologias) {
        project.tecnologias = JSON.parse(tecnologias);
      }

      if (tags) {
        project.tags = JSON.parse(tags);
      }

      if (req.files && !Array.isArray(req.files)) {
        if (req.files.imagem_capa?.length) {
          project.imagem_capa = req.files.imagem_capa[0].path;
        }
      }

      if (existing_images) {
        const parsedExisting: {
          id: string;
          titulo: string;
          descricao: string;
        }[] = JSON.parse(existing_images);

        parsedExisting.forEach((img) => {
          const index = parseInt(img.id);
          if (project.imagens[index]) {
            project.imagens[index].titulo = img.titulo;
            project.imagens[index].descricao = img.descricao;
          }
        });
      }


      if (
        req.files &&
        !Array.isArray(req.files) &&
        req.files.imagens?.length
      ) {
        const metas = imagens_meta ? JSON.parse(imagens_meta) : [];

        req.files.imagens.forEach((file, index) => {
          project.imagens.push({
            arquivo: file.path,
            titulo: metas[index]?.titulo || "",
            descricao: metas[index]?.descricao || "",
          });
        });
      }

      await project.save();

      return res.json(project);
    } catch (error) {
      console.error("Erro ao editar o projeto:", error);
      return res.status(500).json({
        error: "Erro ao editar o projeto",
        details: error,
      });
    }
  }
}

export const editProjectsController = new EditProjectsController();