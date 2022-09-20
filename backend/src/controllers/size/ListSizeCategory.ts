import { Request, Response } from "express";
import { ListSizeCategoryService } from "../../services/size/ListSizeCategoryService";

class ListSizeCategoryController{
    async handle(req:Request, res:Response){
        const listSize = new ListSizeCategoryService();
        const category_id = req.query.category_id as string

        const size = await listSize.execute({category_id})

        return res.json(size)
    }
}

export{ListSizeCategoryController}