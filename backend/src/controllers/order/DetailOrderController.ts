import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController{
    async handle(req:Request, res:Response){
        const order_id = req.query.order_id as string

        const detailOrderservice = new DetailOrderService();

        const orders = await detailOrderservice.execute({
            order_id
        })
        return res.json(orders)
    }
}

export {DetailOrderController}