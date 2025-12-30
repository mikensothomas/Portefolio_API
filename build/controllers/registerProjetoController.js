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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { titulo, descricao, tecnologias, link_github, categoria, status, repositorio_privado, tags, video_demo, imagens_meta, } = req.body;
        const tecnologiasArray = tecnologias ? JSON.parse(tecnologias) : [];
        const tagsArray = tags ? JSON.parse(tags) : [];
        const repositorioPrivado = repositorio_privado === "true" || repositorio_privado === true;
        const files = req.files;
        const imagemCapaFile = ((_a = files === null || files === void 0 ? void 0 : files.imagem_capa) === null || _a === void 0 ? void 0 : _a[0]) || null;
        const imagensFiles = (files === null || files === void 0 ? void 0 : files.imagens) || [];
        const imagensMetaParsed = imagens_meta ? JSON.parse(imagens_meta) : [];
        const imagensData = imagensFiles.map((file, index) => {
            var _a, _b;
            return ({
                titulo: ((_a = imagensMetaParsed[index]) === null || _a === void 0 ? void 0 : _a.titulo) || file.originalname,
                descricao: ((_b = imagensMetaParsed[index]) === null || _b === void 0 ? void 0 : _b.descricao) || "",
                arquivo: `/uploads/${file.filename}`,
            });
        });
        const newProject = yield prisma.portfolio.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar o projeto" });
    }
});
exports.registerProjects = registerProjects;
