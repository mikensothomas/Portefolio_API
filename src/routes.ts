// import { Router } from "express";
// import { uploadAvatar } from "./middleware/upload/avatar";
// import { registerProjects } from "./controllers/registerProjetoController";
// import multer from "multer";
// import { registerMessages } from "./controllers/mensage";
// import { listProjects } from "./controllers/listProjectControllers";

// const upload = multer(uploadAvatar.getConfig);
// export const router = Router()

// router.get("/", (_, res) => {
//   res.json({
//     status: "API funcionando 🚀",
//     message: "Backend online no Render"
//   });
// });

// router.post("/registerProjects", upload.fields([
//     { name: "imagem_capa", maxCount: 1 },
//     { name: "imagens", maxCount: 1000 },
// ]), registerProjects)

// router.get("/listProjects", listProjects)
// router.post("/registerMessage", registerMessages)

import { Router } from "express";
import { uploadAvatar } from "./middleware/upload/avatar";
import { registerProjects } from "./controllers/registerProjetoController";
import multer from "multer";
import { registerMessages } from "./controllers/mensage";
import { listProjects } from "./controllers/listProjectControllers";

const upload = multer(uploadAvatar.getConfig);

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