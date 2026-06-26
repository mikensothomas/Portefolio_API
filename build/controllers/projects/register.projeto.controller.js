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
exports.registerProjects = void 0;
const portfolio_model_1 = __importDefault(require("../../models/portfolio.model"));
// import Portfolio from "../models/Portfolio";
const registerProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { titulo, descricao, tecnologias, link_github, categoria, status, repositorio_privado, tags, video_demo, imagens_meta, } = req.body;
        const tecnologiasArray = tecnologias ? JSON.parse(tecnologias) : [];
        const tagsArray = tags ? JSON.parse(tags) : [];
        const repositorioPrivado = repositorio_privado === "true" || repositorio_privado === true;
        const files = req.files;
        const imagemCapaFile = (_a = files === null || files === void 0 ? void 0 : files.imagem_capa) === null || _a === void 0 ? void 0 : _a[0];
        const imagensFiles = (files === null || files === void 0 ? void 0 : files.imagens) || [];
        const imagensMetaParsed = imagens_meta
            ? JSON.parse(imagens_meta)
            : [];
        const imagensData = imagensFiles.map((file, index) => {
            var _a, _b;
            return ({
                titulo: ((_a = imagensMetaParsed[index]) === null || _a === void 0 ? void 0 : _a.titulo) || file.originalname,
                descricao: ((_b = imagensMetaParsed[index]) === null || _b === void 0 ? void 0 : _b.descricao) || "",
                arquivo: file.path,
            });
        });
        const newProject = yield portfolio_model_1.default.create({
            titulo,
            descricao,
            tecnologias: tecnologiasArray,
            link_github: link_github || undefined,
            categoria,
            status,
            repositorio_privado: repositorioPrivado,
            tags: tagsArray,
            video_demo: video_demo || undefined,
            imagem_capa: imagemCapaFile === null || imagemCapaFile === void 0 ? void 0 : imagemCapaFile.path,
            imagens: imagensData,
        });
        return res.status(201).json(newProject);
    }
    catch (error) {
        console.error("Erro ao registrar projeto:", error);
        return res.status(500).json({
            error: "Erro ao registrar o projeto",
        });
    }
});
exports.registerProjects = registerProjects;
