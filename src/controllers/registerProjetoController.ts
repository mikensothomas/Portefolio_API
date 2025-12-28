import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerProjects = async (req: Request, res: Response) => {
  try {
    const {
      titulo,
      descricao,
      tecnologias,
      link_github,
      categoria,
      status,
      repositorio_privado,
      tags,
      video_demo,
      imagens_meta,
    } = req.body;

    const tecnologiasArray = tecnologias ? JSON.parse(tecnologias) : [];
    const tagsArray = tags ? JSON.parse(tags) : [];
    const repositorioPrivado = repositorio_privado === "true" || repositorio_privado === true;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const imagemCapaFile = files?.imagem_capa?.[0] || null;
    const imagensFiles = files?.imagens || [];

    const imagensMetaParsed = imagens_meta ? JSON.parse(imagens_meta) : [];

    const imagensData = imagensFiles.map((file, index) => ({
      titulo: imagensMetaParsed[index]?.titulo || file.originalname,
      descricao: imagensMetaParsed[index]?.descricao || "",
      arquivo: `/uploads/${file.filename}`,
    }));

    const newProject = await prisma.portfolio.create({
      data: {
        titulo,
        descricao,
        tecnologias: tecnologiasArray,
        link_github,
        categoria,
        imagem_capa: imagemCapaFile ? `/uploads/${imagemCapaFile.filename}` : null,
        status,
        repositorio_privado: repositorioPrivado,
        tags: tagsArray,
        video_demo: video_demo || null,
        imagens: imagensData,
      },
    });

    res.status(200).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar o projeto" });
  }
};