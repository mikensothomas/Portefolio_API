import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class LoginUserController {
    public loginUser(req: Request, res: Response) {
        const { email, password } = req.body;

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET as string,
            { expiresIn: "5h" }
        );

        return res.json({ token, user: { email } });
    }
}

export const loginUserController = new LoginUserController();