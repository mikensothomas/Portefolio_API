"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProjectsController = void 0;
const portfolio_model_1 = __importDefault(require("../../models/portfolio.model"));
class EditProjectsController {
    editProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { id } = req.params;
                const { titulo, descricao, categoria, link_github, status, repositorio_privado, video_demo, tecnologias, tags, existing_images, imagens_meta, } = req.body;
                const project = yield portfolio_model_1.default.findById(id);
                if (!project) {
                    return res.status(404).json({ error: "Projeto não encontrado" });
                }
                if (titulo !== undefined)
                    project.titulo = titulo;
                if (descricao !== undefined)
                    project.descricao = descricao;
                if (categoria !== undefined)
                    project.categoria = categoria;
                if (link_github !== undefined)
                    project.link_github = link_github;
                if (status !== undefined)
                    project.status = status;
                if (video_demo !== undefined)
                    project.video_demo = video_demo;
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
                    if ((_a = req.files.imagem_capa) === null || _a === void 0 ? void 0 : _a.length) {
                        project.imagem_capa = req.files.imagem_capa[0].path;
                    }
                }
                if (existing_images) {
                    const parsedExisting = JSON.parse(existing_images);
                    parsedExisting.forEach((img) => {
                        const index = parseInt(img.id);
                        if (project.imagens[index]) {
                            project.imagens[index].titulo = img.titulo;
                            project.imagens[index].descricao = img.descricao;
                        }
                    });
                }
                if (req.files &&
                    !Array.isArray(req.files) &&
                    ((_b = req.files.imagens) === null || _b === void 0 ? void 0 : _b.length)) {
                    const metas = imagens_meta ? JSON.parse(imagens_meta) : [];
                    req.files.imagens.forEach((file, index) => {
                        var _a, _b;
                        project.imagens.push({
                            arquivo: file.path,
                            titulo: ((_a = metas[index]) === null || _a === void 0 ? void 0 : _a.titulo) || "",
                            descricao: ((_b = metas[index]) === null || _b === void 0 ? void 0 : _b.descricao) || "",
                        });
                    });
                }
                yield project.save();
                return res.json(project);
            }
            catch (error) {
                console.error("Erro ao editar o projeto:", error);
                return res.status(500).json({
                    error: "Erro ao editar o projeto",
                    details: error,
                });
            }
        });
    }
}
exports.editProjectsController = new EditProjectsController();
