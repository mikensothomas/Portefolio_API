import { Router } from "express";
import { registerProjects } from "./controllers/registerProjetoController";
import { registerMessages } from "./controllers/mensage";
import { listProjects } from "./controllers/listProjectControllers";
import uploadCloudinary from "./middleware/uploads/uploadCloudinary";

const upload = uploadCloudinary;

const routes = Router();

routes.get("/", (_, res) => {
  res.json({
    status: "API funcionando 🚀",
    message: "Backend online no Render",
  });
});

routes.post(
  "/registerProjects",
  upload.fields([
    { name: "imagem_capa", maxCount: 1 },
    { name: "imagens", maxCount: 1000 },
  ]),
  registerProjects
);

routes.get("/listProjects", listProjects);
routes.post("/registerMessage", registerMessages);

export default routes;