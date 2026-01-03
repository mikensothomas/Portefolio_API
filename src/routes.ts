import { Router } from "express";
import { registerProjects } from "./controllers/registerProjetoController";
import { listProjects } from "./controllers/listProjectControllers";
import { registerMessages } from "./controllers/mensage";
import uploadCloudinary from "./middleware/uploads/uploadCloudinary";

const routes = Router();

routes.get("/", (_, res) => {
  res.json({
    status: "API funcionando 🚀",
    message: "Backend online no Render",
  });
});

routes.post(
  "/registerProjects",
  uploadCloudinary.fields([
    { name: "imagem_capa", maxCount: 1 },
    { name: "imagens", maxCount: 10 },
  ]),
  registerProjects
);

routes.get("/listProjects", listProjects);
routes.post("/registerMessage", registerMessages);

export default routes;