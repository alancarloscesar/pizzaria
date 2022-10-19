import { Response, Request } from "express";
import { ListItemService } from "../../services/order/ListItemsService";

class ListItemController {
    async handle(req: Request, res: Response) {
        const list = new ListItemService();

        const order_id = req.query.order_id as string;
        const product_id = req.query.product_id as string;

        const response = await list.execute({
            order_id,
            product_id
        })
        return res.json(response)
    }
}

export { ListItemController }