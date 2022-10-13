import { Request, Response } from "express";
import { EstockProductQtdPriceService } from "../../services/product/EstockProductQtdPriceService";

class EstockProductQtdPriceController {
    async handle(req: Request, res: Response) {
        const estock = new EstockProductQtdPriceService();

        const { name, tamanho, quantidade, price } = req.body;

        const updateEstoque = await estock.execute({
            name,
            tamanho,
            quantidade,
            price
        })

        return res.json(updateEstoque)
    }

}

export { EstockProductQtdPriceController }