import type { Request, Response } from "express"
import messagesModel from "../../models/messages.model"

class DeleteMessagesController {
    async deleteMessage(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        try {
            const message = await messagesModel.findByIdAndDelete(id)

            if (!message) {
                return res.status(404).json({ message: "Mensagem não encontrado" })
            }

            return res.status(200).json({ message: "Mensagem deletada com sucesso" })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar a mensagem: ", error })
        }
    }
}

export const deleteMessagesController = new DeleteMessagesController()