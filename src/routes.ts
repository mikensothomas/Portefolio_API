import { Router } from "express";
import { registerProjects } from "./controllers/projects/register.projeto.controller";
import { listProjects } from "./controllers/projects/list.project.controller";
import { editProjectsController } from "./controllers/projects/edit.projects.controller";
import { deleteProjetoController } from "./controllers/projects/delete.projeto.controller";
import uploadCloudinary from "./middleware/uploads/uploadCloudinary";
import { registerMessages } from "./controllers/projects/mensage.register.controller";
import { loginUserController } from "./controllers/users/login.user.controller";
import { ensureAuthenticated } from "./middleware/authUser/authUsers.adm";
import { GetProjectByIdController } from "./controllers/projects/get.project.ById.controller";

const getProjectByIdController = new GetProjectByIdController();

const routes = Router();

routes.get("/", (_, res) => {
  res.json({
    status: "API funcionando 🚀",
    message: "Backend online no Render",
  });
});

routes.post("/login", loginUserController.loginUser);

routes.post(
  "/registerProjects",
  ensureAuthenticated,
  uploadCloudinary.fields([
    { name: "imagem_capa", maxCount: 1 },
    { name: "imagens", maxCount: 10 },
  ]),
  registerProjects
);

routes.get(
  "/projects/:id",
  getProjectByIdController.handle.bind(getProjectByIdController)
);

routes.put(
  "/projects/:id", ensureAuthenticated,
  uploadCloudinary.fields([
    { name: "imagem_capa", maxCount: 1 },
    { name: "imagens", maxCount: 10 },
  ]),
  editProjectsController.editProject
);

routes.get("/listProjects", listProjects);
routes.post("/registerMessage", registerMessages);
routes.delete("/deleteProject/:id", ensureAuthenticated, deleteProjetoController.deleteProject);

export default routes;