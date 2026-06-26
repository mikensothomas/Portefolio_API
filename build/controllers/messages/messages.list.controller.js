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
exports.messagesListControllers = void 0;
const messages_model_1 = __importDefault(require("../../models/messages.model"));
class MessagesListControllers {
    listMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield messages_model_1.default.find().sort({ createdAt: -1 }).lean();
                return res.status(200).json(messages);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao listar as menssagens", error });
            }
        });
    }
}
exports.messagesListControllers = new MessagesListControllers();
