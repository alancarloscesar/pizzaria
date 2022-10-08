import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string
    table: number
}

class OrderExistentService {
    async execute({ order_id, table }: OrderRequest) {

        const verifyTableDraft = await prismaClient.order.findFirst({//se for uma mesa existente e fechada
            where: {
                table: table,
                draft: false
            }
        })

        if (verifyTableDraft) {
            const upTable = await prismaClient.item.findMany({
                where: {
                    order_id: order_id
                }
            })

            return upTable
        }
    }
}

export { OrderExistentService }