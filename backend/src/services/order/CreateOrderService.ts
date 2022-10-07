import prismaClient from "../../prisma";

interface OrderRequest {
    table: number
    user_id: string
    garcom: string
}

class CreateOrderService {
    async execute({ table, garcom, user_id }: OrderRequest) {

        const verifyDraft = await prismaClient.order.findFirst({
            where: {
                table: table,
                draft: true
            }
        })

        if (verifyDraft) {
            throw new Error("Esta mesa está sendo utilizada no momento!!")
        }
        const order = await prismaClient.order.create({
            data: {
                table: table,
                garcom: garcom,
                user_id: user_id
            }
        })
        return order;
    }
}

export { CreateOrderService }