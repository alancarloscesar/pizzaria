import { Request, Response } from "express";
import { FindPriceProductService } from "../../services/product/FindPriceProductService";

class FindPriceProductController {
    async handle(req: Request, res: Response) {
        const find = new FindPriceProductService();

        const order_id = req.query.order_id as string;

        const findPrice = await find.execute({ order_id });

        return res.json(findPrice)
    }
}
export { FindPriceProductController }