import { Request, Response } from "express";
import { OrderAccountService } from "../../services/orderAccount/OrderAccountService";

class OrderAccountController {
    async handle(req: Request, res: Response) {
        const { valor_conta, conta_comissao, valor_comissao, garcom, order_id, user_id } = req.body
        const orderA = new OrderAccountService();

        const orderF = await orderA.execute({
            valor_conta,
            conta_comissao,
            valor_comissao,
            garcom,
            order_id,
            user_id
        })

        return res.json(orderF)
    }
}

export { OrderAccountController }