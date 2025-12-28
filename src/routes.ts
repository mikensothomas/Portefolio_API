import { Router } from "express";
import { uploadAvatar } from "./middleware/upload/avatar";
import { registerProjects } from "./controllers/registerProjetoController";
import { listProjects } from "./controllers/listProjectControllers";
import multer from "multer";
import { registerMessages } from "./controllers/mensage";

const upload = multer(uploadAvatar.getConfig);
export const router = Router()

router.post("/registerProjects", upload.fields([
    { name: "imagem_capa", maxCount: 1 },
    { name: "imagens", maxCount: 1000 },
]), registerProjects)

router.get("/listProjects", listProjects)
router.post("/registerMessage", registerMessages)