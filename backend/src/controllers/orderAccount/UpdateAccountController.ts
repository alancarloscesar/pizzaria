import { Request, Response } from "express";
import { UpdateAccountService } from "../../services/orderAccount/UpdateAccountService";

class UpdateAccountController {
    async handle(req: Request, res: Response) {
        const update = new UpdateAccountService()
        const { valor_conta, conta_comissao, valor_comissao, order_id } = req.body;
      //  const order_idd = req.query.order_id as string

        const updateAcc = await update.execute({
            valor_conta,
            conta_comissao,
            valor_comissao,
            order_id
        })

        return res.json(updateAcc)
    }
}

export { UpdateAccountController }