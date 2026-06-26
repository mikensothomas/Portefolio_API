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
exports.deleteMessagesController = void 0;
const messages_model_1 = __importDefault(require("../../models/messages.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class DeleteMessagesController {
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const message = yield messages_model_1.default.findByIdAndDelete(id);
                if (!mongoose_1.default.Types.ObjectId.isValid) {
                    return res.status(400).json({ message: "ID inválido" });
                }
                if (!message) {
                    return res.status(404).json({ message: "Mensagem não encontrado" });
                }
                return res.status(200).json({ message: "Mensagem deletada com sucesso" });
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao deletar a mensagem: ", error });
            }
        });
    }
}
exports.deleteMessagesController = new DeleteMessagesController();
