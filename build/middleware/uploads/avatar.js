"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class UploadAvatar {
    constructor() {
        this.uploadPath = path_1.default.join(process.cwd(), "uploads");
        if (!fs_1.default.existsSync(this.uploadPath)) {
            fs_1.default.mkdirSync(this.uploadPath, { recursive: true });
        }
    }
    storage() {
        return multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                console.log("📁 Salvando em:", this.uploadPath);
                cb(null, this.uploadPath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = path_1.default.extname(file.originalname);
                const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                cb(null, filename);
            },
        });
    }
    fileFilter(req, file, cb) {
        const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Tipo de arquivo não suportado."));
        }
    }
    get getConfig() {
        return {
            storage: this.storage(),
            fileFilter: this.fileFilter,
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
        };
    }
}
exports.uploadAvatar = new UploadAvatar();
