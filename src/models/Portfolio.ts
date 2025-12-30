import mongoose, { Schema, Document } from "mongoose";
import { StatusProjeto, CategoryProjects } from "../enums/enums";

interface Imagem {
  titulo: string;
  descricao: string;
  arquivo: string;
}

export interface PortfolioDocument extends Document {
  titulo: string;
  descricao: string;
  tecnologias: string[];
  link_github?: string;
  categoria: CategoryProjects;
  imagem_capa?: string;
  status: StatusProjeto;
  repositorio_privado: boolean;
  tags: string[];
  video_demo?: string;
  imagens: Imagem[];
  createdAt: Date;
  updatedAt: Date;
}

const ImagemSchema = new Schema<Imagem>(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    arquivo: { type: String, required: true },
  },
  { _id: false }
);

const PortfolioSchema = new Schema<PortfolioDocument>(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    tecnologias: [{ type: String }],
    link_github: { type: String },
    categoria: {
      type: String,
      enum: Object.values(CategoryProjects),
      required: true,
    },
    imagem_capa: { type: String },
    status: {
      type: String,
      enum: Object.values(StatusProjeto),
      required: true,
    },
    repositorio_privado: { type: Boolean, required: true },
    tags: [{ type: String }],
    video_demo: { type: String },
    imagens: [ImagemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<PortfolioDocument>(
  "Portfolio",
  PortfolioSchema
);
