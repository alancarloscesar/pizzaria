import prismaClient from "../../prisma";

interface reportReques {
    dataInicial: string;
    dataFinal: string;
    garcom: string;
}

class ReportCommissionService {
    async execute({ dataInicial, dataFinal, garcom }: reportReques) {

        const comissao = await prismaClient.orderAccount.findMany({
            where: {
                created_at:{
                    gte: new Date(dataInicial)
                },
                AND:{
                    created_at:{
                        lte: new Date(dataFinal)
                    },
                    garcom:{
                        equals: garcom
                    }
                }
                
                
            },
            orderBy:{
                created_at: 'desc'
            }
        })
        return comissao;
    }
}

export { ReportCommissionService }