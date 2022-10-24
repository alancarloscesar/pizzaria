import { Request, Response } from "express";
import { InvoicingDateService } from "../../services/invoicing/invoicingDateService";

class invoicingDateController {
    async handle(req: Request, res: Response) {
        const invoicingS = new InvoicingDateService();
        const { dataInicial, dataFinal } = req.body;

        const response = await invoicingS.execute({
            dataInicial,
            dataFinal
        })

        return res.json(response)
    }
}

export { invoicingDateController }