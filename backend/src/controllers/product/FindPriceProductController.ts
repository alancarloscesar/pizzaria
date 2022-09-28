import { Request, Response } from "express";
import { FindPriceProductService } from "../../services/product/FindPriceProductService";

class FindPriceProductController{
    async handle(req:Request, res:Response){
        const find = new FindPriceProductService();
        
        const name = req.query.name as string;
        const tamanho = req.query.tamanho as string;

        const findPrice = await find.execute({name, tamanho});

        return res.json(findPrice)

    }
}
export{FindPriceProductController}