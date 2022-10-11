import { Response, Request } from "express";
import { ReportCommissionService } from "../../services/report/ReportCommissionService";

class ReportCommissionController {
    async handle(req: Request, res: Response) {
        const report = new ReportCommissionService()
        const { garcom, dataInicial, dataFinal } = req.body;

        const comm = await report.execute({
            garcom,
            dataInicial,
            dataFinal
        })
        return res.json(comm)
    }
}

export { ReportCommissionController }