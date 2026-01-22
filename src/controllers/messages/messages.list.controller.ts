import type { Request, Response } from "express"
import messagesModel from "../../models/messages.model"

class MessagesListControllers {
    async listMessages(req: Request, res: Response): Promise<Response> {
        try {
            const messages = await messagesModel.find().sort({ createdAt: -1 }).lean()
            return res.status(200).json(messages)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar as menssagens", error })
        }
    }
}

export const messagesListControllers = new MessagesListControllers()