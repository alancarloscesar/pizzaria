import { Response, Request } from "express";
import { UpdateQtdProductEqualsService } from "../../services/order/UpdateQtdProductEqualsService";

class UpdateQtdProductEqualsController {
    async handle(req: Request, res: Response) {
        const updateS = new UpdateQtdProductEqualsService();

        const { order_id, product_id, amount, price } = req.body;

        const up = await updateS.execute({
            order_id,
            product_id,
            amount,
            price
        })

        return res.json(up)
    }
}

export { UpdateQtdProductEqualsController }