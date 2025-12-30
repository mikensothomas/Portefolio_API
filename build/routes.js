"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const avatar_1 = require("./middleware/upload/avatar");
const registerProjetoController_1 = require("./controllers/registerProjetoController");
const listProjectControllers_1 = require("./controllers/listProjectControllers");
const multer_1 = __importDefault(require("multer"));
const mensage_1 = require("./controllers/mensage");
const upload = (0, multer_1.default)(avatar_1.uploadAvatar.getConfig);
exports.router = (0, express_1.Router)();
exports.router.post("/registerProjects", upload.fields([
    { name: "imagem_capa", maxCount: 1 },
    { name: "imagens", maxCount: 1000 },
]), registerProjetoController_1.registerProjects);
exports.router.get("/listProjects", listProjectControllers_1.listProjects);
exports.router.post("/registerMessage", mensage_1.registerMessages);
