import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController{
    async handle(req:Request, res:Response){
        const listByCategoryService = new ListByCategoryService();
        
        const category_id = req.query.category_id as string;
        const tamanho = req.query.tamanho as string;

        const product = await listByCategoryService.execute({category_id, tamanho});

        return res.json(product)
    }
    
}

export{ListByCategoryController}