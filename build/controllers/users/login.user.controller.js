"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.LoginUserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUserController {
    loginUser(req, res) {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: "5h" });
        return res.json({ token, user: { email } });
    }
}
exports.LoginUserController = LoginUserController;
exports.loginUserController = new LoginUserController();
