"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_projeto_controller_1 = require("./controllers/projects/register.projeto.controller");
const list_project_controller_1 = require("./controllers/projects/list.project.controller");
const edit_projects_controller_1 = require("./controllers/projects/edit.projects.controller");
const delete_projeto_controller_1 = require("./controllers/projects/delete.projeto.controller");
const uploadCloudinary_1 = __importDefault(require("./middleware/uploads/uploadCloudinary"));
const messages_register_controller_1 = require("./controllers/messages/messages.register.controller");
const login_user_controller_1 = require("./controllers/users/login.user.controller");
const authUsers_adm_1 = require("./middleware/authUser/authUsers.adm");
const get_project_ById_controller_1 = require("./controllers/projects/get.project.ById.controller");
const messages_list_controller_1 = require("./controllers/messages/messages.list.controller");
const delete_messages_controller_1 = require("./controllers/messages/delete.messages.controller");
const count_project_controller_1 = require("./controllers/projects/count.project.controller");
const getProjectByIdController = new get_project_ById_controller_1.GetProjectByIdController();
const routes = (0, express_1.Router)();
routes.get("/", (_, res) => {
    res.json({
        status: "API funcionando 🚀",
        message: "Backend online no Render",
    });
});
routes.post("/login", login_user_controller_1.loginUserController.loginUser);
routes.post("/registerProjects", authUsers_adm_1.ensureAuthenticated, uploadCloudinary_1.default.fields([
    { name: "imagem_capa", maxCount: 1 },
    { name: "imagens", maxCount: 10 },
]), register_projeto_controller_1.registerProjects);
routes.get("/projects/:id", getProjectByIdController.handle.bind(getProjectByIdController));
routes.put("/projects/:id", authUsers_adm_1.ensureAuthenticated, uploadCloudinary_1.default.fields([
    { name: "imagem_capa", maxCount: 1 },
    { name: "imagens", maxCount: 10 },
]), edit_projects_controller_1.editProjectsController.editProject);
routes.get("/listProjects", list_project_controller_1.listProjects);
routes.post("/registerMessage", messages_register_controller_1.registerMessages);
routes.delete("/deleteProject/:id", authUsers_adm_1.ensureAuthenticated, delete_projeto_controller_1.deleteProjetoController.deleteProject);
routes.get("/listMessages", authUsers_adm_1.ensureAuthenticated, messages_list_controller_1.messagesListControllers.listMessages);
routes.delete("/deleteMessage/:id", authUsers_adm_1.ensureAuthenticated, delete_messages_controller_1.deleteMessagesController.deleteMessage);
routes.get("/countProject", count_project_controller_1.countProjrctsController.getCountProject);
routes.get("/getCountSlide/:id", count_project_controller_1.countProjrctsController.getCountSlides);
exports.default = routes;
