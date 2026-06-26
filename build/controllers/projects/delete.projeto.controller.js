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
exports.deleteProjetoController = void 0;
const portfolio_model_1 = __importDefault(require("../../models/portfolio.model"));
class DeleteProjetoController {
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield portfolio_model_1.default.findByIdAndDelete(id);
                if (!project) {
                    return res.status(404).json({ error: "Projeto não encontrado" });
                }
                return res.json({ message: "Projeto deletado com sucesso" });
            }
            catch (error) {
                console.log("Erro ao deletar o projeto", error);
                return res.status(500).json({ error: "Erro ao deletar o projeto", details: error });
            }
        });
    }
}
exports.deleteProjetoController = new DeleteProjetoController();
