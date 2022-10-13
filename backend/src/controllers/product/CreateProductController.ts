import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, category_id, tamanho, estoque, quantidade } = req.body
        const createProductService = new CreateProductService();

        if (!req.file) {//se não vier nada de img 

            const product = await createProductService.execute({
                name,
                price,
                banner: 'empty',
                category_id,
                tamanho,
                estoque,
                quantidade
            });

            return res.json(product)
        } else {
            const { originalname, filename: banner } = req.file;

            const product = await createProductService.execute({
                name,
                price,
                banner,
                category_id,
                tamanho,
                estoque,
                quantidade
            });

            return res.json(product)
        }



    }
}
export { CreateProductController }