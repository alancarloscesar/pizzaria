import { Request, Response } from "express";
import { CreateProdService } from "../../services/product/CreateProdService";

class CreateProdController{
    async handle(req:Request, res:Response){
        const creatProd = new CreateProdService();
        const {name, price, description, category_id, tamanho} = req.body
    }
}

export {CreateProdController}