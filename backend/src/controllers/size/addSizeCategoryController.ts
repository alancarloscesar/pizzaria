import { Request,Response } from "express";
import { AddSizeCategoryService } from "../../services/size/addSizeCategoryService";

class AddSizeCategoryController{
    async handle(req: Request, res:Response){
        const addSize = new AddSizeCategoryService();

        const {name, category_id} = req.body;

        const size = await addSize.execute({
            name, category_id
        })

        return res.json(size);

    }
}

export {AddSizeCategoryController}