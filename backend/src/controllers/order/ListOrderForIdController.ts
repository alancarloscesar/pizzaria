import { Request, Response } from "express";
import { ListOrderForIdService } from "../../services/order/ListOrderForIdService";

class ListOrderForIdController {
    async handle(req: Request, res: Response) {
        const listOrderService = new ListOrderForIdService();
        const order_id = req.query.order_id as string
        const table = Number(req.query.table) as number

        const listOrder = await listOrderService.execute({ order_id, table });

        return res.json(listOrder)
    }
}

export { ListOrderForIdController }