import { Request, Response } from 'express'
import { OrderExistentService } from '../../services/order/OrderExistentService';

class OrderExistentController {
    async handle(req: Request, res: Response) {

        const orderExist = new OrderExistentService()
        const order_id = req.query.order_id as string
        const { table } = req.body;

        const orderEx = await orderExist.execute({ order_id, table })

        return res.json(orderEx)

    }
}

export { OrderExistentController }