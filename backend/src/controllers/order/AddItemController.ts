import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController{
    async handle(req:Request, res:Response){
        const {order_id, product_id, amount, price, name} = req.body;

        const addItemService = new AddItemService();

        const item = await addItemService.execute({
            order_id, 
            product_id, 
            amount,
            price,
            name
        })

        return res.json(item)
    }
}

export {AddItemController}