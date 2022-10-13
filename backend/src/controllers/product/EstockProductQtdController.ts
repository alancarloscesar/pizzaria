import { Request, Response } from "express";
import { EstockProductQtdService } from "../../services/product/EstockProductQtdService";

class EstockProductQtdController{
    async handle(req: Request, res: Response){
        const estock = new EstockProductQtdService()

        const {name, tamanho, quantidade} = req.body;

        const updateEstoque = await estock.execute({
            name,
            tamanho,
            quantidade
        })

        return res.json(updateEstoque)
    }

}

export {EstockProductQtdController}