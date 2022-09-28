import {Request, Response} from 'express'
import { CreateOrderService } from '../../services/order/CreateOrderService'

class CreateOrderController{
    async handle(req:Request, res:Response){
        const  {name, table,garcom, user_id} = req.body;

        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({
            name,
            table,
            garcom,
            user_id
        })
        return res.json(order)
    }
}

export {CreateOrderController}