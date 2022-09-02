import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController{
    async handle(req:Request, res:Response){
        const {name, price, description, category_id, tamanho} = req.body
        const createProductService = new CreateProductService();

        if(!req.file){//se não vier nada de img 
            throw new Error("Erro ao enviar imagem para banner");
        }else{
            const  {originalname, filename:banner} = req.file;

            const product = await createProductService.execute({
                name, 
                price, 
                description,
                banner, 
                category_id, 
                tamanho
            });
            
            return res.json(product)
        }



    }
}
export {CreateProductController}