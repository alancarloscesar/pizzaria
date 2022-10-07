import { Request, Response } from "express";
import { FindAccountTableService } from "../../services/orderAccount/FindAccountTableService";

class FindAccountTableController {

    async handle(req: Request, res: Response) {
        const order_id = req.query.order_id as string

        const findAcc = new FindAccountTableService();

        const orders = await findAcc.execute({
            order_id
        })
        return res.json(orders)
    }
}

export { FindAccountTableController }