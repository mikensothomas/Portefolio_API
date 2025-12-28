import multer, { StorageEngine, Options, FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

class UploadAvatar {
    private uploadPath: string;

    constructor() {
        this.uploadPath = path.join(process.cwd(), "uploads");

        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
    }

    private storage(): StorageEngine {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                console.log("📁 Salvando em:", this.uploadPath);
                cb(null, this.uploadPath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = path.extname(file.originalname);
                const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                cb(null, filename);
            },
        });
    }

    private fileFilter(
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) {
        const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de arquivo não suportado."));
        }
    }

    get getConfig(): Options {
        return {
            storage: this.storage(),
            fileFilter: this.fileFilter,
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
        };
    }
}

export const uploadAvatar = new UploadAvatar();