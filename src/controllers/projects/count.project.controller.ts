import type { Request, Response } from "express";
import Portfolio from "../../models/portfolio.model";
import mongoose from "mongoose";

class CountProjrctsController {
    async getCountProject(req: Request, res: Response): Promise<Response> {
        try {
            const projectNumber = await Portfolio.countDocuments()
            return res.status(200).json({ total: projectNumber })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar a quantidade de projeto cadastrado" })
        }
    }


    async getCountSlides(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await Portfolio.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $project: {
                        total: { $size: "$imagens" }
                    }
                }
            ]);

            return res.status(200).json({
                total: result[0]?.total || 0
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar a quantidade de imagem"
            });
        }
    }


}

export const countProjrctsController = new CountProjrctsController()