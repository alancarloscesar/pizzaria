import { Request, Response } from "express";
import { ListOrderForTableService } from "../../services/order/ListOrderForTableService";

class ListOrderForTableController {
    async handle(req: Request, res: Response) {
        const listOrderService = new ListOrderForTableService()
        const table = Number(req.query.table) as number

        const listOrder = await listOrderService.execute({ table });

        return res.json(listOrder)
    }
}

export { ListOrderForTableController }