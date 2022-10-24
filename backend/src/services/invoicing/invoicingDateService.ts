import prismaClient from "../../prisma";

interface requestIvoicing {
    dataInicial: string;
    dataFinal: string;
}

class InvoicingDateService {
    async execute({ dataInicial, dataFinal }: requestIvoicing) {
        const invo = await prismaClient.orderAccount.findMany({
            where: {
                created_at: {
                    gte: new Date(dataInicial),
                    lte: new Date(dataFinal)
                }
            }
        })

        return invo
    }
}

export { InvoicingDateService }

//liste todas as orderAccount onde a data for da data inicial até a date final