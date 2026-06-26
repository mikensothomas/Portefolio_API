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
exports.countProjrctsController = void 0;
const portfolio_model_1 = __importDefault(require("../../models/portfolio.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class CountProjrctsController {
    getCountProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectNumber = yield portfolio_model_1.default.countDocuments();
                return res.status(200).json({ total: projectNumber });
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao buscar a quantidade de projeto cadastrado" });
            }
        });
    }
    getCountSlides(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id } = req.params;
            try {
                const result = yield portfolio_model_1.default.aggregate([
                    { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
                    {
                        $project: {
                            total: { $size: "$imagens" }
                        }
                    }
                ]);
                return res.status(200).json({
                    total: ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) || 0
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Erro ao buscar a quantidade de imagem"
                });
            }
        });
    }
}
exports.countProjrctsController = new CountProjrctsController();
