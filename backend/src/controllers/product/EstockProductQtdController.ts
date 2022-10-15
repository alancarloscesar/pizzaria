import { Request, Response } from "express";
import { EstockProductQtdService } from "../../services/product/EstockProductQtdService";

class EstockProductQtdController{
    async handle(req: Request, res: Response){
        const estock = new EstockProductQtdService()

        const {name, tamanho, price} = req.body;

        const updateEstoque = await estock.execute({
            name,
            tamanho,
            price
        })

        return res.json(updateEstoque)
    }

}

export {EstockProductQtdController}